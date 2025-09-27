@echo off
echo ========================================
echo AI Style Guide Generator - STARTUP
echo ========================================
echo.

echo Starting Django Backend...
start "Django Server" cmd /k "cd /d C:\Users\PAK\Desktop\first task && python manage.py runserver"

echo Waiting 3 seconds...
timeout /t 3 /nobreak >nul

echo Starting React Frontend...
start "React Server" cmd /k "cd /d C:\Users\PAK\Desktop\first task\frontend && npm run dev -- --port 3000"

echo.
echo ========================================
echo BOTH SERVERS ARE STARTING!
echo ========================================
echo.
echo Django Backend: http://127.0.0.1:8000

echo React Frontend: Check terminal for actual port (default is 3000, but Vite may auto-switch)

echo.
echo Open http://localhost:3000 in your browser!
echo.
echo Press any key to exit...
pause >nul
