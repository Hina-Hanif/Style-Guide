"""
ASGI config for ai_style_guide project.
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ai_style_guide.settings')

application = get_asgi_application()
