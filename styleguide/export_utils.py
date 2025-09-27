"""
Export utilities for generating PDF, JSON, and CSS outputs
"""
from reportlab.lib.pagesizes import letter, A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
import json
from typing import Dict, Any


class ExportUtils:
    def __init__(self):
        self.styles = getSampleStyleSheet()
    
    def generate_pdf(self, style_guide) -> bytes:
        """Generate PDF style guide"""
        from io import BytesIO
        
        buffer = BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=A4, rightMargin=72, leftMargin=72, 
                              topMargin=72, bottomMargin=18)
        
        # Custom styles
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=self.styles['Heading1'],
            fontSize=24,
            spaceAfter=30,
            alignment=TA_CENTER
        )
        
        heading_style = ParagraphStyle(
            'CustomHeading',
            parent=self.styles['Heading2'],
            fontSize=16,
            spaceAfter=12,
            spaceBefore=20
        )
        
        # Build content
        story = []
        
        # Title
        story.append(Paragraph(f"{style_guide.name} Style Guide", title_style))
        story.append(Spacer(1, 20))
        
        # Colors section
        story.append(Paragraph("Color Palette", heading_style))
        
        # Primary colors
        story.append(Paragraph("Primary Colors", self.styles['Heading3']))
        primary_data = [['Color', 'Hex Code']]
        for color in style_guide.primary_colors:
            primary_data.append([f"<font color='{color}'>{color}</font>", color])
        
        primary_table = Table(primary_data)
        primary_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 14),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
            ('GRID', (0, 0), (-1, -1), 1, colors.black)
        ]))
        story.append(primary_table)
        story.append(Spacer(1, 20))
        
        # Secondary colors
        if style_guide.secondary_colors:
            story.append(Paragraph("Secondary Colors", self.styles['Heading3']))
            secondary_data = [['Color', 'Hex Code']]
            for color in style_guide.secondary_colors:
                secondary_data.append([f"<font color='{color}'>{color}</font>", color])
            
            secondary_table = Table(secondary_data)
            secondary_table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
                ('TEXTCOLOR', (0, 0), (-1, -1), colors.whitesmoke),
                ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                ('FONTSIZE', (0, 0), (-1, 0), 14),
                ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
                ('GRID', (0, 0), (-1, -1), 1, colors.black)
            ]))
            story.append(secondary_table)
            story.append(Spacer(1, 20))
        
        # Typography section
        story.append(Paragraph("Typography", heading_style))
        
        if style_guide.fonts:
            fonts = style_guide.fonts
            if 'primary_font' in fonts:
                story.append(Paragraph(f"Primary Font: {fonts['primary_font'].get('name', 'N/A')}", self.styles['Normal']))
            if 'secondary_font' in fonts:
                story.append(Paragraph(f"Secondary Font: {fonts['secondary_font'].get('name', 'N/A')}", self.styles['Normal']))
            
            if 'scale' in fonts:
                story.append(Paragraph("Font Scale:", self.styles['Heading3']))
                scale_data = [['Element', 'Size']]
                for element, size in fonts['scale'].items():
                    scale_data.append([element.upper(), size])
                
                scale_table = Table(scale_data)
                scale_table.setStyle(TableStyle([
                    ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
                    ('TEXTCOLOR', (0, 0), (-1, -1), colors.whitesmoke),
                    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                    ('FONTSIZE', (0, 0), (-1, 0), 14),
                    ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                    ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
                    ('GRID', (0, 0), (-1, -1), 1, colors.black)
                ]))
                story.append(scale_table)
        
        story.append(Spacer(1, 20))
        
        # Spacing section
        story.append(Paragraph("Spacing System", heading_style))
        
        if style_guide.spacing:
            spacing = style_guide.spacing
            if 'scale' in spacing:
                story.append(Paragraph("Spacing Scale:", self.styles['Heading3']))
                spacing_data = [['Size', 'Value']]
                for size, value in spacing['scale'].items():
                    spacing_data.append([size.upper(), value])
                
                spacing_table = Table(spacing_data)
                spacing_table.setStyle(TableStyle([
                    ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
                    ('TEXTCOLOR', (0, 0), (-1, -1), colors.whitesmoke),
                    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                    ('FONTSIZE', (0, 0), (-1, 0), 14),
                    ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                    ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
                    ('GRID', (0, 0), (-1, -1), 1, colors.black)
                ]))
                story.append(spacing_table)
        
        # Build PDF
        doc.build(story)
        buffer.seek(0)
        return buffer.getvalue()
    
    def generate_json_tokens(self, style_guide) -> Dict[str, Any]:
        """Generate JSON design tokens"""
        tokens = {
            "name": style_guide.name,
            "version": "1.0.0",
            "colors": {
                "primary": style_guide.primary_colors,
                "secondary": style_guide.secondary_colors
            },
            "typography": style_guide.fonts,
            "spacing": style_guide.spacing,
            "metadata": {
                "created_at": style_guide.created_at.isoformat(),
                "updated_at": style_guide.updated_at.isoformat()
            }
        }
        return tokens
    
    def generate_css_variables(self, style_guide) -> str:
        """Generate CSS custom properties"""
        css = ":root {\n"
        
        # Colors
        css += "  /* Primary Colors */\n"
        for i, color in enumerate(style_guide.primary_colors):
            css += f"  --color-primary-{i+1}: {color};\n"
        
        css += "\n  /* Secondary Colors */\n"
        for i, color in enumerate(style_guide.secondary_colors):
            css += f"  --color-secondary-{i+1}: {color};\n"
        
        # Typography
        if style_guide.fonts:
            fonts = style_guide.fonts
            if 'primary_font' in fonts:
                font_name = fonts['primary_font'].get('name', 'Inter')
                font_fallback = fonts['primary_font'].get('fallback', 'sans-serif')
                css += f"\n  /* Typography */\n"
                css += f"  --font-primary: '{font_name}', {font_fallback};\n"
            
            if 'secondary_font' in fonts:
                font_name = fonts['secondary_font'].get('name', 'Inter')
                font_fallback = fonts['secondary_font'].get('fallback', 'sans-serif')
                css += f"  --font-secondary: '{font_name}', {font_fallback};\n"
            
            if 'scale' in fonts:
                css += "\n  /* Font Scale */\n"
                for element, size in fonts['scale'].items():
                    css += f"  --font-size-{element}: {size};\n"
        
        # Spacing
        if style_guide.spacing and 'scale' in style_guide.spacing:
            css += "\n  /* Spacing Scale */\n"
            for size, value in style_guide.spacing['scale'].items():
                css += f"  --spacing-{size}: {value};\n"
        
        css += "}\n"
        return css
