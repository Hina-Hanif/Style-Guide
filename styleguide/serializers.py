from rest_framework import serializers
from .models import StyleGuide, ColorAnalysis


class StyleGuideSerializer(serializers.ModelSerializer):
    class Meta:
        model = StyleGuide
        fields = ['id', 'name', 'logo', 'primary_colors', 'secondary_colors', 
                 'fonts', 'spacing', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class ColorAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = ColorAnalysis
        fields = ['id', 'original_colors', 'wcag_compliant_colors', 
                 'contrast_ratios', 'accessibility_score', 'created_at']
        read_only_fields = ['id', 'created_at']


class StyleGuideCreateSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200)
    logo = serializers.ImageField(required=False)
    colors = serializers.ListField(
        child=serializers.CharField(max_length=7),
        required=False
    )
    
    def validate_colors(self, value):
        """Validate hex color codes"""
        import re
        hex_pattern = r'^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$'
        for color in value:
            if not re.match(hex_pattern, color):
                raise serializers.ValidationError(f"Invalid hex color: {color}")
        return value
