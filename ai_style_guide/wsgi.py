"""
WSGI config for ai_style_guide project.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ai_style_guide.settings')

application = get_wsgi_application()
