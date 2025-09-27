import React from 'react'
import { Link } from 'react-router-dom'
import { Palette, Sparkles } from 'lucide-react'

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-neutral-800">
              AI Style Guide
            </span>
          </Link>
          
          <nav className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-neutral-600 hover:text-primary-500 transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              to="/generate" 
              className="btn-primary flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate Guide</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
