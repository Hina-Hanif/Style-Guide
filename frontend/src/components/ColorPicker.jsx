import React, { useState } from 'react'
import { ChromePicker } from 'react-color'
import { Plus, X, Palette } from 'lucide-react'

const ColorPicker = ({ colors, onColorAdd, onColorRemove }) => {
  const [showPicker, setShowPicker] = useState(false)
  const [currentColor, setCurrentColor] = useState('#4B6EFF')

  const handleColorSelect = (color) => {
    setCurrentColor(color.hex)
  }

  const handleAddColor = () => {
    onColorAdd(currentColor)
    setShowPicker(false)
  }

  const handleManualInput = (e) => {
    const value = e.target.value
    if (value.match(/^#[0-9A-Fa-f]{6}$/)) {
      setCurrentColor(value)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-neutral-800">
          Brand Colors
        </h3>
        <button
          onClick={() => setShowPicker(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Color</span>
        </button>
      </div>

      {/* Color Picker Modal */}
      {showPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">
              Choose a Color
            </h3>
            
            <div className="mb-4">
              <ChromePicker
                color={currentColor}
                onChange={handleColorSelect}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Or enter hex code:
              </label>
              <input
                type="text"
                value={currentColor}
                onChange={handleManualInput}
                placeholder="#4B6EFF"
                className="input-field"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowPicker(false)}
                className="btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={handleAddColor}
                className="btn-primary"
              >
                Add Color
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Selected Colors */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {colors.map((color, index) => (
          <div key={index} className="relative group">
            <div
              className="w-full h-20 rounded-lg border-2 border-neutral-200 hover:border-neutral-300 transition-colors duration-200"
              style={{ backgroundColor: color }}
            >
              <button
                onClick={() => onColorRemove(index)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <p className="text-xs text-neutral-600 mt-1 text-center font-mono">
              {color}
            </p>
          </div>
        ))}
      </div>

      {colors.length === 0 && (
        <div className="text-center py-8 text-neutral-500">
          <Palette className="w-12 h-12 mx-auto mb-4 text-neutral-300" />
          <p>No colors added yet. Click "Add Color" to get started.</p>
        </div>
      )}
    </div>
  )
}

export default ColorPicker
