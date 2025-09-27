"""
URL configuration for styleguide app
"""
from django.urls import path
from . import views

urlpatterns = [
    path('style-guides/', views.list_style_guides, name='list_style_guides'),
    path('style-guides/create/', views.create_style_guide, name='create_style_guide'),
    path('style-guides/<int:guide_id>/', views.get_style_guide, name='get_style_guide'),
    path('analyze-colors/', views.analyze_colors, name='analyze_colors'),
    path('style-guides/<int:guide_id>/export/pdf/', views.export_pdf, name='export_pdf'),
    path('style-guides/<int:guide_id>/export/json/', views.export_json, name='export_json'),
    path('style-guides/<int:guide_id>/export/css/', views.export_css, name='export_css'),
]
