"""
AI service for generating style guide recommendations using Google Gemini
"""
import google.generativeai as genai
import json
import os
from typing import Dict, List, Tuple
import colorsys
from collections import Counter
from PIL import Image # Import PIL here for the analyze_logo_colors method


class AIStyleGuideService:
    def __init__(self):
        api_key = os.getenv('GEMINI_API_KEY')
        print(f"--- DEBUG: GEMINI_API_KEY value is: {api_key} ---")
        if not api_key:
            raise ValueError("GEMINI_API_KEY environment variable is required")
        
        genai.configure(api_key=api_key)
        # self.model = genai.GenerativeModel('gemini-pro')
        self.model = genai.GenerativeModel('gemini-2.5-flash')
    
    def _extract_json_from_response(self, response_text: str, fallback_data: Dict, debug_info: str) -> Dict:
        """
        Safely cleans and extracts JSON data from the Gemini response,
        handling Markdown fences and JSONDecodeErrors.
        """
        try:
            clean_text = response_text.strip()
            # 1. Remove Markdown fences (```json, ```)
            if clean_text.startswith('```'):
                # Safely remove the surrounding markdown tags
                clean_text = clean_text.replace('```json', '', 1).replace('```', '', 1).strip()
            
            # 2. Extract content between the first { and last }
            start_idx = clean_text.find('{')
            end_idx = clean_text.rfind('}') + 1
            
            if start_idx != -1 and end_idx != -1:
                json_str = clean_text[start_idx:end_idx]
                return json.loads(json_str)
            else:
                # If JSON markers aren't found, fall back
                print(f"Warning: JSON structure not found in AI response for {debug_info}.")
                return fallback_data
            
        except json.JSONDecodeError as e:
            # Catch the specific error that was crashing your app
            print(f"JSON DECODE ERROR in {debug_info}: {e}")
            print(f"RAW FAILED TEXT: {response_text}")
            return fallback_data
            
        except Exception as e:
            # Catch any other unexpected error during processing
            print(f"Unexpected ERROR during JSON extraction for {debug_info}: {e}")
            return fallback_data

    # ----------------------------------------------------------------------------------
    # GENERATE COLOR PALETTE (CORRECTED)
    # ----------------------------------------------------------------------------------
    def generate_color_palette(self, input_colors: List[str], logo_description: str = None) -> Dict:
        """Generate WCAG-compliant color palette from input colors"""
        prompt = f"""
        As a professional color theory expert, generate a complete, accessible color palette based on these input colors: {', '.join(input_colors)}
        
        Requirements:
        1. Ensure all color combinations meet WCAG AA accessibility standards (4.5:1 contrast ratio)
        2. Provide 3-5 primary colors and 3-5 secondary colors
        3. Include neutral colors (grays, whites, blacks)
        4. Consider color psychology and brand perception
        5. Ensure colors work well together harmoniously
        
        Return a JSON response with this structure:
        {{
            "primary_colors": ["#hex1", "#hex2", "#hex3"],
            "secondary_colors": ["#hex4", "#hex5", "#hex6"],
            "neutral_colors": ["#hex7", "#hex8", "#hex9"],
            "accessibility_notes": "Brief explanation of accessibility considerations",
            "color_harmony": "Explanation of color relationships"
        }}
        """
        
        if logo_description:
            prompt += f"\nLogo context: {logo_description}"
        
        try:
            response = self.model.generate_content(prompt)
            return self._extract_json_from_response(
                response.text,
                self._fallback_color_palette(input_colors),
                "color palette"
            )
        except Exception as e:
            # Catches API key errors, rate limiting, etc.
            print(f"Error during Gemini API call for color palette: {e}")
            return self._fallback_color_palette(input_colors)

    
    def generate_typography(self, brand_personality: str = "professional") -> Dict:
        """Generate typography recommendations"""
        prompt = f"""
        As a typography expert, recommend a complete typography system for a {brand_personality} brand.
        
        Provide:
        1. Primary font (for headings and important text)
        2. Secondary font (for body text and UI elements)
        3. Font sizes for different text levels
        4. Line heights and letter spacing
        5. Font weights and styles
        
        Return JSON with this structure:
        {{
            "primary_font": {{
                "name": "Font Name",
                "fallback": "fallback, fonts",
                "weights": ["400", "600", "700"]
            }},
            "secondary_font": {{
                "name": "Font Name", 
                "fallback": "fallback, fonts",
                "weights": ["400", "500", "600"]
            }},
            "scale": {{
                "h1": "2.5rem",
                "h2": "2rem", 
                "h3": "1.5rem",
                "h4": "1.25rem",
                "body": "1rem",
                "small": "0.875rem"
            }},
            "line_heights": {{
                "tight": "1.2",
                "normal": "1.5",
                "relaxed": "1.75"
            }}
        }}
        """
        
        try:
            response = self.model.generate_content(prompt)
            return self._extract_json_from_response(
                response.text,
                self._fallback_typography(),
                "typography"
            )
        except Exception as e:
            print(f"Error during Gemini API call for typography: {e}")
            return self._fallback_typography()

    
    def generate_spacing_system(self, design_style: str = "modern") -> Dict:
        """Generate spacing and layout recommendations"""
        prompt = f"""
        As a UI/UX design expert, create a comprehensive spacing system for a {design_style} design.
        
        Provide:
        1. Base spacing unit (e.g., 8px, 4px)
        2. Spacing scale (xs, sm, md, lg, xl, etc.)
        3. Component spacing guidelines
        4. Layout grid recommendations
        
        Return JSON:
        {{
            "base_unit": "8px",
            "scale": {{
                "xs": "4px",
                "sm": "8px",
                "md": "16px", 
                "lg": "24px",
                "xl": "32px",
                "2xl": "48px",
                "3xl": "64px"
            }},
            "component_spacing": {{
                "button_padding": "12px 24px",
                "card_padding": "24px",
                "section_margin": "48px"
            }},
            "grid": {{
                "columns": 12,
                "gutter": "24px",
                "max_width": "1200px"
            }}
        }}
        """
        
        try:
            response = self.model.generate_content(prompt)
            return self._extract_json_from_response(
                response.text,
                self._fallback_spacing(),
                "spacing system"
            )
        except Exception as e:
            print(f"Error during Gemini API call for spacing system: {e}")
            return self._fallback_spacing()

    
    def analyze_logo_colors(self, logo_path: str) -> List[str]:
        """Analyze logo and extract dominant colors"""
        try:
            # Dependencies (PIL, numpy, Counter) must be installed for this to work
            import numpy as np
            
            # Load and process image
            img = Image.open(logo_path)
            img = img.convert('RGB')
            
            # Resize for faster processing
            img.thumbnail((200, 200))
            
            # Get color data
            colors = img.getdata()
            
            # Convert to hex and count frequencies
            hex_colors = []
            for r, g, b in colors:
                hex_color = f"#{r:02x}{g:02x}{b:02x}"
                hex_colors.append(hex_color)
            
            # Get most common colors
            color_counts = Counter(hex_colors)
            dominant_colors = [color for color, count in color_counts.most_common(5)]
            
            return dominant_colors
            
        except Exception as e:
            print(f"Error analyzing logo colors: {e}")
            return ["#4B6EFF", "#00C7B7", "#2D2D2D"]

    
    def _fallback_color_palette(self, input_colors: List[str]) -> Dict:
        """Fallback color palette if AI fails"""
        return {
            "primary_colors": input_colors[:3] if input_colors else ["#4B6EFF", "#00C7B7", "#2D2D2D"],
            "secondary_colors": ["#F8F9FA", "#E9ECEF", "#6C757D"],
            "neutral_colors": ["#FFFFFF", "#F8F9FA", "#6C757D", "#343A40", "#000000"],
            "accessibility_notes": "Colors selected for good contrast and readability",
            "color_harmony": "Complementary color scheme for modern appeal"
        }
    
    def _fallback_typography(self) -> Dict:
        """Fallback typography if AI fails"""
        return {
            "primary_font": {
                "name": "Inter",
                "fallback": "system-ui, -apple-system, sans-serif",
                "weights": ["400", "600", "700"]
            },
            "secondary_font": {
                "name": "Inter",
                "fallback": "system-ui, -apple-system, sans-serif", 
                "weights": ["400", "500", "600"]
            },
            "scale": {
                "h1": "2.5rem",
                "h2": "2rem",
                "h3": "1.5rem", 
                "h4": "1.25rem",
                "body": "1rem",
                "small": "0.875rem"
            },
            "line_heights": {
                "tight": "1.2",
                "normal": "1.5",
                "relaxed": "1.75"
            }
        }
    
    def _fallback_spacing(self) -> Dict:
        """Fallback spacing if AI fails"""
        return {
            "base_unit": "8px",
            "scale": {
                "xs": "4px",
                "sm": "8px",
                "md": "16px", 
                "lg": "24px",
                "xl": "32px",
                "2xl": "48px",
                "3xl": "64px"
            },
            "component_spacing": {
                "button_padding": "12px 24px",
                "card_padding": "24px",
                "section_margin": "48px"
            },
            "grid": {
                "columns": 12,
                "gutter": "24px",
                "max_width": "1200px"
            }
        }