# Dynamic AI Style-Guide Generator

A professional web application that generates complete brand style guides using Google Gemini AI. Upload a logo or enter brand colors, and get a comprehensive design system with WCAG-compliant colors, typography, and spacing rules.

## Features

- **AI-Powered Generation**: Uses Google Gemini AI for intelligent design recommendations
- **Logo Analysis**: Upload logos to extract brand colors automatically
- **WCAG Compliance**: All color suggestions meet accessibility standards
- **Multiple Exports**: Download as PDF, JSON design tokens, or CSS variables
- **Live Preview**: Real-time preview of generated style guides
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS

## Technology Stack

- **Backend**: Django 4.2 with Django REST Framework
- **Frontend**: React 18 with Vite and Tailwind CSS
- **AI Engine**: Google Gemini API
- **Database**: PostgreSQL
- **Image Processing**: Pillow and OpenCV
- **Export**: ReportLab for PDF generation
- **Deployment**: Docker with Docker Compose

## Quick Start

### Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL
- Docker (optional)

### Environment Setup

1. Copy the environment file:
```bash
cp env.example .env
```

2. Edit `.env` with your configuration:
```env
SECRET_KEY=your-django-secret-key-here
DEBUG=True
DATABASE_URL=postgresql://username:password@localhost:5432/ai_style_guide
GEMINI_API_KEY=your-google-gemini-api-key-here
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### Installation

#### Option 1: Docker (Recommended)

```bash
# Start all services
docker-compose up -d

# Run migrations
docker-compose exec web python manage.py migrate

# Create superuser
docker-compose exec web python manage.py createsuperuser
```

#### Option 2: Manual Setup

1. **Backend Setup**:
```bash
# Install Python dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start Django server
python manage.py runserver
```

2. **Frontend Setup**:
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api/
- **Admin Panel**: http://localhost:8000/admin/

## API Endpoints

### Style Guides
- `GET /api/style-guides/` - List all style guides
- `POST /api/style-guides/create/` - Create new style guide
- `GET /api/style-guides/{id}/` - Get specific style guide

### Exports
- `GET /api/style-guides/{id}/export/pdf/` - Export as PDF
- `GET /api/style-guides/{id}/export/json/` - Export as JSON
- `GET /api/style-guides/{id}/export/css/` - Export as CSS

### Analysis
- `POST /api/analyze-colors/` - Analyze color accessibility

## Usage

1. **Create Style Guide**:
   - Navigate to the generator page
   - Enter a name for your style guide
   - Upload a logo or enter brand colors
   - Click "Generate Style Guide"

2. **Preview Results**:
   - View generated colors, typography, and spacing
   - Test different combinations
   - See accessibility scores

3. **Export Files**:
   - Download as PDF for documentation
   - Export JSON tokens for design systems
   - Get CSS variables for development

## Project Structure

```
ai-style-guide-generator/
├── ai_style_guide/          # Django project settings
├── styleguide/              # Main Django app
│   ├── models.py           # Database models
│   ├── views.py            # API views
│   ├── ai_service.py       # Gemini AI integration
│   ├── color_utils.py      # Color analysis utilities
│   └── export_utils.py     # Export functionality
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom hooks
│   │   └── services/       # API services
│   └── public/
├── requirements.txt        # Python dependencies
├── package.json           # Node.js dependencies
└── docker-compose.yml     # Docker configuration
```

## Development

### Running Tests
```bash
# Backend tests
python manage.py test

# Frontend tests
cd frontend
npm test
```

### Code Quality
```bash
# Python formatting
black .

# Python linting
flake8 .

# Frontend linting
cd frontend
npm run lint
```

## Deployment

### Production Environment Variables
```env
DEBUG=False
SECRET_KEY=your-production-secret-key
DATABASE_URL=postgresql://user:password@host:port/dbname
GEMINI_API_KEY=your-gemini-api-key
ALLOWED_HOSTS=yourdomain.com
CORS_ALLOWED_ORIGINS=https://yourdomain.com
```

### Docker Production
```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Deploy
docker-compose -f docker-compose.prod.yml up -d
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the API endpoints

## Roadmap

- [ ] User authentication and project saving
- [ ] Advanced color palette generation
- [ ] Font pairing recommendations
- [ ] Component library generation
- [ ] Team collaboration features
- [ ] Integration with design tools
