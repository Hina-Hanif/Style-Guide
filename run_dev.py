#!/usr/bin/env python3
"""
Development server runner
"""
import subprocess
import sys
import os
import time
import threading

def run_django():
    """Run Django development server"""
    print("🚀 Starting Django server...")
    subprocess.run([sys.executable, "manage.py", "runserver"], cwd=os.getcwd())

def run_frontend():
    """Run React development server"""
    print("🚀 Starting React server...")
    os.chdir("frontend")
    subprocess.run(["npm", "run", "dev"])

def main():
    """Run both servers"""
    print("🎨 Starting AI Style Guide Generator Development Servers")
    print("=" * 55)
    
    # Start Django in a separate thread
    django_thread = threading.Thread(target=run_django)
    django_thread.daemon = True
    django_thread.start()
    
    # Wait a moment for Django to start
    time.sleep(3)
    
    # Start React (this will block)
    try:
        run_frontend()
    except KeyboardInterrupt:
        print("\n👋 Shutting down servers...")
        sys.exit(0)

if __name__ == "__main__":
    main()
