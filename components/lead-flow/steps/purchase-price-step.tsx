"use client"

import React from "react"

import type { StepProps } from "../types"
import { X } from "lucide-react"

const MIN_PRICE = 80000
const MAX_PRICE = 2000000

export function PurchasePriceStep({ data, updateData, onNext, onBack }: StepProps) {
  const price = data.purchasePrice ?? 540000

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    updateData({ purchasePrice: value })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove non-numeric characters
    const rawValue = e.target.value.replace(/[^0-9]/g, "")
    const value = rawValue ? parseInt(rawValue, 10) : 0
    updateData({ purchasePrice: Math.min(Math.max(value, 0), MAX_PRICE) })
  }

  const clearPrice = () => {
    updateData({ purchasePrice: MIN_PRICE })
  }

  const formatPrice = (value: number) => {
    return value.toLocaleString("en-US")
  }

  // Calculate slider percentage for the fill
  const sliderPercentage = ((price - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100

  return (
    <div className="w-full max-w-lg mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8 text-center">
        What's the estimated purchase price of the property?
      </h2>

      {/* Price Input */}
      <div className="mb-6">
        <div className="relative flex items-center border-2 border-gray-300 rounded-lg px-4 py-4 focus-within:border-blue-500">
          <span className="text-gray-500 text-lg mr-2">$</span>
          <input
            type="text"
            value={formatPrice(price)}
            onChange={handleInputChange}
            className="flex-1 text-lg font-medium text-gray-900 focus:outline-none"
          />
          <button
            onClick={clearPrice}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Clear price"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Range Slider */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="range"
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={10000}
            value={price}
            onChange={handleSliderChange}
            className="w-full h-2 appearance-none cursor-pointer rounded-full"
            style={{
              background: `linear-gradient(to right, #0157FF 0%, #0157FF ${sliderPercentage}%, #E5E7EB ${sliderPercentage}%, #E5E7EB 100%)`,
            }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>$80K</span>
          <span>$2M+</span>
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={onNext}
        className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
      >
        Continue
      </button>

      {/* Back Button */}
      <div className="text-center mt-6">
        <button onClick={onBack} className="text-blue-600 hover:text-blue-700 font-medium">
          Back
        </button>
      </div>

      {/* Custom slider thumb styles */}
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #0157FF;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #0157FF;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  )
}
