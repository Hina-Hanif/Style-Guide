@echo off
echo Starting AI Style Guide Generator...
echo.

echo Starting Django server...
start "Django Server" cmd /k "python manage.py runserver"

timeout /t 3 /nobreak >nul

echo Starting React frontend...
start "React Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Both servers are starting...
echo Django: http://localhost:8000
echo React: http://localhost:3000
echo.
echo Press any key to exit...
pause >nul
