from django.contrib import admin
from .models import StyleGuide, ColorAnalysis


@admin.register(StyleGuide)
class StyleGuideAdmin(admin.ModelAdmin):
    list_display = ['name', 'user', 'created_at']
    list_filter = ['created_at', 'user']
    search_fields = ['name']


@admin.register(ColorAnalysis)
class ColorAnalysisAdmin(admin.ModelAdmin):
    list_display = ['style_guide', 'accessibility_score', 'created_at']
    list_filter = ['created_at']
