@echo off
echo ========================================
echo AI Style Guide Generator - STARTUP
echo ========================================
echo.

echo Installing Python dependencies...
pip install whitenoise google-generativeai Pillow reportlab

echo.
echo Starting Django Backend...
start "Django Server" cmd /k "cd /d C:\Users\PAK\Desktop\first task && python manage.py runserver"

echo Waiting 5 seconds...
timeout /t 5 /nobreak >nul

echo Starting React Frontend...
start "React Server" cmd /k "cd /d C:\Users\PAK\Desktop\first task\frontend && npm run dev -- --port 3000"

echo.
echo ========================================
echo PROJECT IS STARTING!
echo ========================================
echo.
echo Django Backend: http://127.0.0.1:8000
echo React Frontend: http://localhost:3000
echo.
echo Open http://localhost:3000 in your browser!
echo.
echo Press any key to exit...
pause >nul
