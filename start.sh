#!/bin/bash
echo "Starting AI Style Guide Generator..."
echo

echo "Starting Django server..."
python manage.py runserver &
DJANGO_PID=$!

sleep 3

echo "Starting React frontend..."
cd frontend
npm run dev &
REACT_PID=$!

echo
echo "Both servers are starting..."
echo "Django: http://localhost:8000"
echo "React: http://localhost:3000"
echo
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait
