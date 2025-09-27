import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, Palette, Sparkles, ArrowLeft, CheckCircle } from 'lucide-react'
import ColorPicker from './ColorPicker'
import { useStyleGuide } from '../hooks/useStyleGuide'

const StyleGuideGenerator = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    logo: null,
    colors: []
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedGuide, setGeneratedGuide] = useState(null)
  
  const { createStyleGuide } = useStyleGuide()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        logo: file
      }))
    }
  }

  const handleColorAdd = (color) => {
    setFormData(prev => ({
      ...prev,
      colors: [...prev.colors, color]
    }))
  }

  const handleColorRemove = (index) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index)
    }))
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      const guide = await createStyleGuide(formData)
      setGeneratedGuide(guide)
      setStep(3)
    } catch (error) {
      console.error('Error generating style guide:', error)
      alert('Failed to generate style guide. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleViewGuide = () => {
    if (generatedGuide) {
      navigate(`/preview/${generatedGuide.id}`)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((stepNumber) => (
            <React.Fragment key={stepNumber}>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= stepNumber 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-neutral-200 text-neutral-500'
              }`}>
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-16 h-1 ${
                  step > stepNumber ? 'bg-primary-500' : 'bg-neutral-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step 1: Basic Information */}
      {step === 1 && (
        <div className="card">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">
              Let's Create Your Style Guide
            </h2>
            <p className="text-neutral-600">
              Start by giving your style guide a name and uploading your logo or entering brand colors.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Style Guide Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., My Brand Style Guide"
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Upload Logo (Optional)
              </label>
              <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors duration-200">
                <Upload className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <label htmlFor="logo-upload" className="cursor-pointer">
                  <span className="text-primary-500 font-medium">Click to upload</span> or drag and drop
                </label>
                <p className="text-sm text-neutral-500 mt-2">
                  PNG, JPG, SVG up to 10MB
                </p>
              </div>
              {formData.logo && (
                <div className="mt-4 p-4 bg-neutral-50 rounded-lg">
                  <p className="text-sm text-neutral-600">
                    Selected: {formData.logo.name}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                disabled={!formData.name}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Step
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Colors */}
      {step === 2 && (
        <div className="card">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">
              Add Your Brand Colors
            </h2>
            <p className="text-neutral-600">
              Enter your brand colors or let our AI extract them from your logo.
            </p>
          </div>

          <div className="space-y-6">
            <ColorPicker
              colors={formData.colors}
              onColorAdd={handleColorAdd}
              onColorRemove={handleColorRemove}
            />

            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="btn-outline flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="btn-primary flex items-center space-x-2 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Style Guide</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Results */}
      {step === 3 && generatedGuide && (
        <div className="card text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-neutral-800 mb-4">
            Style Guide Generated!
          </h2>
          <p className="text-neutral-600 mb-8">
            Your AI-generated style guide is ready. View the preview and download your files.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleViewGuide}
              className="btn-primary flex items-center space-x-2"
            >
              <Palette className="w-4 h-4" />
              <span>View Style Guide</span>
            </button>
            <button
              onClick={() => {
                setStep(1)
                setFormData({ name: '', logo: null, colors: [] })
                setGeneratedGuide(null)
              }}
              className="btn-outline"
            >
              Create Another
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default StyleGuideGenerator
