import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Download, ArrowLeft, FileText, Code, Palette, Type, Ruler } from 'lucide-react'
import { useStyleGuide } from '../hooks/useStyleGuide'

const StyleGuidePreview = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getStyleGuide, exportPDF, exportJSON, exportCSS } = useStyleGuide()
  const [styleGuide, setStyleGuide] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('colors')

  useEffect(() => {
    const fetchStyleGuide = async () => {
      try {
        const guide = await getStyleGuide(id)
        setStyleGuide(guide)
      } catch (error) {
        console.error('Error fetching style guide:', error)
        navigate('/')
      } finally {
        setLoading(false)
      }
    }

    fetchStyleGuide()
  }, [id, navigate])

  const handleExport = async (type) => {
    try {
      if (type === 'pdf') {
        await exportPDF(id)
      } else if (type === 'json') {
        await exportJSON(id)
      } else if (type === 'css') {
        await exportCSS(id)
      }
    } catch (error) {
      console.error('Export failed:', error)
      alert('Export failed. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading style guide...</p>
        </div>
      </div>
    )
  }

  if (!styleGuide) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card text-center">
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">Style Guide Not Found</h2>
          <button onClick={() => navigate('/')} className="btn-primary">
            Go Home
          </button>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'spacing', label: 'Spacing', icon: Ruler }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="btn-outline flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-neutral-800">{styleGuide.name}</h1>
            <p className="text-neutral-600">AI-Generated Style Guide</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleExport('pdf')}
            className="btn-secondary flex items-center space-x-2"
          >
            <FileText className="w-4 h-4" />
            <span>PDF</span>
          </button>
          <button
            onClick={() => handleExport('json')}
            className="btn-secondary flex items-center space-x-2"
          >
            <Code className="w-4 h-4" />
            <span>JSON</span>
          </button>
          <button
            onClick={() => handleExport('css')}
            className="btn-secondary flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>CSS</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-neutral-200 mb-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {/* Colors Tab */}
        {activeTab === 'colors' && (
          <div className="space-y-8">
            {/* Primary Colors */}
            <div className="card">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Primary Colors</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {styleGuide.primary_colors.map((color, index) => (
                  <div key={index} className="text-center">
                    <div
                      className="w-full h-24 rounded-lg border-2 border-neutral-200 mb-2"
                      style={{ backgroundColor: color }}
                    />
                    <p className="text-sm font-mono text-neutral-600">{color}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary Colors */}
            {styleGuide.secondary_colors && styleGuide.secondary_colors.length > 0 && (
              <div className="card">
                <h3 className="text-xl font-semibold text-neutral-800 mb-6">Secondary Colors</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {styleGuide.secondary_colors.map((color, index) => (
                    <div key={index} className="text-center">
                      <div
                        className="w-full h-24 rounded-lg border-2 border-neutral-200 mb-2"
                        style={{ backgroundColor: color }}
                      />
                      <p className="text-sm font-mono text-neutral-600">{color}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Typography Tab */}
        {activeTab === 'typography' && styleGuide.fonts && (
          <div className="space-y-8">
            <div className="card">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">Font Families</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {styleGuide.fonts.primary_font && (
                  <div>
                    <h4 className="font-medium text-neutral-700 mb-2">Primary Font</h4>
                    <p className="text-2xl" style={{ fontFamily: styleGuide.fonts.primary_font.name }}>
                      {styleGuide.fonts.primary_font.name}
                    </p>
                    <p className="text-sm text-neutral-600 mt-1">
                      {styleGuide.fonts.primary_font.fallback}
                    </p>
                  </div>
                )}
                {styleGuide.fonts.secondary_font && (
                  <div>
                    <h4 className="font-medium text-neutral-700 mb-2">Secondary Font</h4>
                    <p className="text-2xl" style={{ fontFamily: styleGuide.fonts.secondary_font.name }}>
                      {styleGuide.fonts.secondary_font.name}
                    </p>
                    <p className="text-sm text-neutral-600 mt-1">
                      {styleGuide.fonts.secondary_font.fallback}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Font Scale */}
            {styleGuide.fonts.scale && (
              <div className="card">
                <h3 className="text-xl font-semibold text-neutral-800 mb-6">Font Scale</h3>
                <div className="space-y-4">
                  {Object.entries(styleGuide.fonts.scale).map(([element, size]) => (
                    <div key={element} className="flex items-center justify-between py-2 border-b border-neutral-100">
                      <span className="font-medium text-neutral-700 capitalize">{element}</span>
                      <span className="text-neutral-600 font-mono">{size}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Spacing Tab */}
        {activeTab === 'spacing' && styleGuide.spacing && (
          <div className="space-y-8">
            {styleGuide.spacing.scale && (
              <div className="card">
                <h3 className="text-xl font-semibold text-neutral-800 mb-6">Spacing Scale</h3>
                <div className="space-y-4">
                  {Object.entries(styleGuide.spacing.scale).map(([size, value]) => (
                    <div key={size} className="flex items-center space-x-4">
                      <div
                        className="bg-primary-500 rounded"
                        style={{ width: value, height: '20px' }}
                      />
                      <span className="font-medium text-neutral-700 capitalize w-16">{size}</span>
                      <span className="text-neutral-600 font-mono">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {styleGuide.spacing.component_spacing && (
              <div className="card">
                <h3 className="text-xl font-semibold text-neutral-800 mb-6">Component Spacing</h3>
                <div className="space-y-4">
                  {Object.entries(styleGuide.spacing.component_spacing).map(([component, spacing]) => (
                    <div key={component} className="flex items-center justify-between py-2 border-b border-neutral-100">
                      <span className="font-medium text-neutral-700 capitalize">{component.replace('_', ' ')}</span>
                      <span className="text-neutral-600 font-mono">{spacing}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default StyleGuidePreview
