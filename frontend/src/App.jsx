import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import StyleGuideGenerator from './components/StyleGuideGenerator'
import StyleGuidePreview from './components/StyleGuidePreview'
import { StyleGuideProvider } from './hooks/useStyleGuide'

function App() {
  return (
    <StyleGuideProvider>
      <Router>
        <div className="min-h-screen bg-neutral-50">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/generate" element={<StyleGuideGenerator />} />
              <Route path="/preview/:id" element={<StyleGuidePreview />} />
            </Routes>
          </main>
        </div>
      </Router>
    </StyleGuideProvider>
  )
}

export default App
