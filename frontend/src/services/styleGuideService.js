import axios from 'axios'

const API_BASE_URL = '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const styleGuideService = {
  async createStyleGuide(formData) {
    const data = new FormData()
    data.append('name', formData.name)
    if (formData.logo) {
      data.append('logo', formData.logo)
    }
    if (formData.colors && formData.colors.length > 0) {
      formData.colors.forEach(color => {
        data.append('colors', color)
      })
    }

    const response = await api.post('/style-guides/create/', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  async getStyleGuide(id) {
    const response = await api.get(`/style-guides/${id}/`)
    return response.data
  },

  async listStyleGuides() {
    const response = await api.get('/style-guides/')
    return response.data
  },

  async analyzeColors(colors) {
    const response = await api.post('/analyze-colors/', { colors })
    return response.data
  },

  async exportPDF(id) {
    const response = await api.get(`/style-guides/${id}/export/pdf/`, {
      responseType: 'blob',
    })
    return response.data
  },

  async exportJSON(id) {
    const response = await api.get(`/style-guides/${id}/export/json/`)
    return response.data
  },

  async exportCSS(id) {
    const response = await api.get(`/style-guides/${id}/export/css/`)
    return response.data
  },
}
