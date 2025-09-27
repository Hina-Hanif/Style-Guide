import React from 'react'
import { Link } from 'react-router-dom'
import { Upload, Palette, Download, Sparkles, CheckCircle, Zap } from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: <Upload className="w-6 h-6" />,
      title: "Upload Logo or Colors",
      description: "Simply upload your logo or enter brand colors to get started"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Suggestions",
      description: "Get intelligent color palettes, typography, and spacing recommendations"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "WCAG Compliant",
      description: "All suggestions meet accessibility standards for better user experience"
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Export & Download",
      description: "Get your style guide as PDF, JSON tokens, or CSS variables"
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-neutral-800 mb-6">
          Create Professional
          <span className="block bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
            Style Guides
          </span>
          in Minutes
        </h1>
        <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto">
          Upload your logo or enter brand colors and let AI generate a complete, 
          accessible design system with colors, typography, and spacing rules.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/generate" className="btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>Start Generating</span>
          </Link>
          <button className="btn-outline text-lg px-8 py-4">
            View Examples
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {features.map((feature, index) => (
          <div key={index} className="card text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center text-primary-500">
                {feature.icon}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-neutral-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-neutral-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
        <h2 className="text-3xl font-bold text-center text-neutral-800 mb-8">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold text-neutral-800 mb-2">
              Upload & Input
            </h3>
            <p className="text-neutral-600">
              Upload your logo or enter your brand colors. Our AI will analyze and extract the key colors.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-accent-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold text-neutral-800 mb-2">
              AI Analysis
            </h3>
            <p className="text-neutral-600">
              Gemini AI analyzes your input and generates a complete color palette, typography system, and spacing rules.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold text-neutral-800 mb-2">
              Export & Use
            </h3>
            <p className="text-neutral-600">
              Download your style guide as PDF, JSON design tokens, or CSS variables and start using it immediately.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Create Your Style Guide?
        </h2>
        <p className="text-xl mb-6 opacity-90">
          Join thousands of designers who trust our AI to create professional, accessible design systems.
        </p>
        <Link to="/generate" className="bg-white text-primary-500 hover:bg-neutral-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center space-x-2">
          <Sparkles className="w-5 h-5" />
          <span>Get Started Now</span>
        </Link>
      </div>
    </div>
  )
}

export default Home
