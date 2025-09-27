import React, { createContext, useContext, useState } from 'react'
import { styleGuideService } from '../services/styleGuideService'

const StyleGuideContext = createContext()

export const useStyleGuide = () => {
  const context = useContext(StyleGuideContext)
  if (!context) {
    throw new Error('useStyleGuide must be used within a StyleGuideProvider')
  }
  return context
}

export const StyleGuideProvider = ({ children }) => {
  const [styleGuides, setStyleGuides] = useState([])
  const [loading, setLoading] = useState(false)

  const createStyleGuide = async (formData) => {
    setLoading(true)
    try {
      const guide = await styleGuideService.createStyleGuide(formData)
      setStyleGuides(prev => [guide, ...prev])
      return guide
    } finally {
      setLoading(false)
    }
  }

  const getStyleGuide = async (id) => {
    setLoading(true)
    try {
      const guide = await styleGuideService.getStyleGuide(id)
      return guide
    } finally {
      setLoading(false)
    }
  }

  const listStyleGuides = async () => {
    setLoading(true)
    try {
      const guides = await styleGuideService.listStyleGuides()
      setStyleGuides(guides)
      return guides
    } finally {
      setLoading(false)
    }
  }

  const exportPDF = async (id) => {
    try {
      const response = await styleGuideService.exportPDF(id)
      const blob = new Blob([response], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `style-guide-${id}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      throw error
    }
  }

  const exportJSON = async (id) => {
    try {
      const response = await styleGuideService.exportJSON(id)
      const blob = new Blob([JSON.stringify(response, null, 2)], { type: 'application/json' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `style-guide-${id}.json`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      throw error
    }
  }

  const exportCSS = async (id) => {
    try {
      const response = await styleGuideService.exportCSS(id)
      const blob = new Blob([response], { type: 'text/css' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `style-guide-${id}.css`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      throw error
    }
  }

  const value = {
    styleGuides,
    loading,
    createStyleGuide,
    getStyleGuide,
    listStyleGuides,
    exportPDF,
    exportJSON,
    exportCSS
  }

  return (
    <StyleGuideContext.Provider value={value}>
      {children}
    </StyleGuideContext.Provider>
  )
}
