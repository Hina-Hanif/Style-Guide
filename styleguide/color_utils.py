"""
Color analysis utilities for accessibility and contrast checking
"""
import colorsys
import re
from typing import List, Dict, Tuple


class ColorUtils:
    def __init__(self):
        pass
    
    def hex_to_rgb(self, hex_color: str) -> Tuple[int, int, int]:
        """Convert hex color to RGB tuple"""
        hex_color = hex_color.lstrip('#')
        if len(hex_color) == 3:
            hex_color = ''.join([c*2 for c in hex_color])
        return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))
    
    def rgb_to_hex(self, r: int, g: int, b: int) -> str:
        """Convert RGB to hex color"""
        return f"#{r:02x}{g:02x}{b:02x}"
    
    def get_luminance(self, r: int, g: int, b: int) -> float:
        """Calculate relative luminance of a color"""
        # Convert to sRGB
        def sRGB_to_linear(c):
            c = c / 255.0
            if c <= 0.03928:
                return c / 12.92
            else:
                return ((c + 0.055) / 1.055) ** 2.4
        
        r_linear = sRGB_to_linear(r)
        g_linear = sRGB_to_linear(g)
        b_linear = sRGB_to_linear(b)
        
        # Calculate luminance
        return 0.2126 * r_linear + 0.7152 * g_linear + 0.0722 * b_linear
    
    def get_contrast_ratio(self, color1: str, color2: str) -> float:
        """Calculate contrast ratio between two colors"""
        rgb1 = self.hex_to_rgb(color1)
        rgb2 = self.hex_to_rgb(color2)
        
        lum1 = self.get_luminance(*rgb1)
        lum2 = self.get_luminance(*rgb2)
        
        lighter = max(lum1, lum2)
        darker = min(lum1, lum2)
        
        return (lighter + 0.05) / (darker + 0.05)
    
    def is_wcag_aa_compliant(self, color1: str, color2: str) -> bool:
        """Check if color combination meets WCAG AA standards"""
        contrast_ratio = self.get_contrast_ratio(color1, color2)
        return contrast_ratio >= 4.5
    
    def is_wcag_aaa_compliant(self, color1: str, color2: str) -> bool:
        """Check if color combination meets WCAG AAA standards"""
        contrast_ratio = self.get_contrast_ratio(color1, color2)
        return contrast_ratio >= 7.0
    
    def analyze_color_contrast(self, colors: List[str]) -> Dict:
        """Analyze color combinations for accessibility"""
        results = {
            'colors': colors,
            'contrast_ratios': {},
            'wcag_aa_compliant': [],
            'wcag_aaa_compliant': [],
            'accessibility_score': 0,
            'recommendations': []
        }
        
        total_combinations = 0
        aa_compliant = 0
        aaa_compliant = 0
        
        # Test all color combinations
        for i, color1 in enumerate(colors):
            for j, color2 in enumerate(colors):
                if i != j:
                    contrast_ratio = self.get_contrast_ratio(color1, color2)
                    combination = f"{color1} vs {color2}"
                    results['contrast_ratios'][combination] = round(contrast_ratio, 2)
                    
                    total_combinations += 1
                    
                    if self.is_wcag_aa_compliant(color1, color2):
                        aa_compliant += 1
                        results['wcag_aa_compliant'].append(combination)
                    
                    if self.is_wcag_aaa_compliant(color1, color2):
                        aaa_compliant += 1
                        results['wcag_aaa_compliant'].append(combination)
        
        # Calculate accessibility score
        if total_combinations > 0:
            results['accessibility_score'] = round((aa_compliant / total_combinations) * 100, 1)
        
        # Generate recommendations
        if results['accessibility_score'] < 70:
            results['recommendations'].append("Consider adjusting colors to improve contrast ratios")
        if results['accessibility_score'] < 50:
            results['recommendations'].append("Many color combinations fail WCAG AA standards")
        if len(results['wcag_aaa_compliant']) < len(colors) * 0.5:
            results['recommendations'].append("Consider improving contrast for better accessibility")
        
        return results
    
    def suggest_accessible_colors(self, base_color: str, target_contrast: float = 4.5) -> List[str]:
        """Suggest accessible color variations"""
        base_rgb = self.hex_to_rgb(base_color)
        suggestions = []
        
        # Generate lighter and darker variations
        for factor in [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]:
            # Lighter version
            lighter_rgb = tuple(int(c + (255 - c) * factor) for c in base_rgb)
            lighter_hex = self.rgb_to_hex(*lighter_rgb)
            
            # Darker version  
            darker_rgb = tuple(int(c * (1 - factor)) for c in base_rgb)
            darker_hex = self.rgb_to_hex(*darker_rgb)
            
            suggestions.extend([lighter_hex, darker_hex])
        
        return list(set(suggestions))  # Remove duplicates
    
    def validate_hex_color(self, color: str) -> bool:
        """Validate hex color format"""
        pattern = r'^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$'
        return bool(re.match(pattern, color))
