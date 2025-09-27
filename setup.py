#!/usr/bin/env python3
"""
Setup script for AI Style Guide Generator
"""
import os
import subprocess
import sys

def run_command(command, description):
    """Run a command and handle errors"""
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed: {e.stderr}")
        return False

def setup_backend():
    """Setup Django backend"""
    print("\n🚀 Setting up Django backend...")
    
    # Install Python dependencies
    if not run_command("pip install -r requirements.txt", "Installing Python dependencies"):
        return False
    
    # Run migrations
    if not run_command("python manage.py migrate", "Running database migrations"):
        return False
    
    # Collect static files
    if not run_command("python manage.py collectstatic --noinput", "Collecting static files"):
        return False
    
    print("✅ Backend setup completed!")
    return True

def setup_frontend():
    """Setup React frontend"""
    print("\n🚀 Setting up React frontend...")
    
    # Change to frontend directory
    os.chdir("frontend")
    
    # Install Node dependencies
    if not run_command("npm install", "Installing Node.js dependencies"):
        return False
    
    # Build frontend
    if not run_command("npm run build", "Building frontend"):
        return False
    
    # Change back to root directory
    os.chdir("..")
    
    print("✅ Frontend setup completed!")
    return True

def create_env_file():
    """Create .env file from template"""
    if not os.path.exists(".env"):
        print("📝 Creating .env file...")
        with open("env.example", "r") as f:
            content = f.read()
        with open(".env", "w") as f:
            f.write(content)
        print("✅ .env file created! Please edit it with your configuration.")
    else:
        print("✅ .env file already exists")

def main():
    """Main setup function"""
    print("🎨 AI Style Guide Generator Setup")
    print("=" * 40)
    
    # Check Python version
    if sys.version_info < (3, 8):
        print("❌ Python 3.8+ is required")
        sys.exit(1)
    
    # Create .env file
    create_env_file()
    
    # Setup backend
    if not setup_backend():
        print("❌ Backend setup failed")
        sys.exit(1)
    
    # Setup frontend
    if not setup_frontend():
        print("❌ Frontend setup failed")
        sys.exit(1)
    
    print("\n🎉 Setup completed successfully!")
    print("\n📋 Next steps:")
    print("1. Edit .env file with your configuration")
    print("2. Set up your GEMINI_API_KEY")
    print("3. Configure your database")
    print("4. Run: python manage.py runserver")
    print("5. Run: cd frontend && npm run dev")
    print("\n🌐 Access the application at:")
    print("- Frontend: http://localhost:3000")
    print("- Backend: http://localhost:8000")

if __name__ == "__main__":
    main()
