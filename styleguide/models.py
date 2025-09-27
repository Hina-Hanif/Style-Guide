from django.db import models
from django.contrib.auth.models import User
import json


class StyleGuide(models.Model):
    """Model to store generated style guides"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=200)
    logo = models.ImageField(upload_to='logos/', null=True, blank=True)
    primary_colors = models.JSONField(default=list)
    secondary_colors = models.JSONField(default=list)
    fonts = models.JSONField(default=dict)
    spacing = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
    def get_color_palette(self):
        """Get all colors as a combined palette"""
        return {
            'primary': self.primary_colors,
            'secondary': self.secondary_colors
        }
    
    def get_style_tokens(self):
        """Get design tokens for export"""
        return {
            'colors': self.get_color_palette(),
            'typography': self.fonts,
            'spacing': self.spacing,
            'name': self.name
        }


class ColorAnalysis(models.Model):
    """Model to store color analysis results"""
    style_guide = models.ForeignKey(StyleGuide, on_delete=models.CASCADE, related_name='color_analyses')
    original_colors = models.JSONField(default=list)
    wcag_compliant_colors = models.JSONField(default=list)
    contrast_ratios = models.JSONField(default=dict)
    accessibility_score = models.FloatField(default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Color Analysis for {self.style_guide.name}"
