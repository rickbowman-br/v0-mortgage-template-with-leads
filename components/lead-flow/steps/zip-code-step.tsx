"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Check, X } from "lucide-react"
import type { StepProps } from "../types"

export function ZipCodeStep({ data, updateData, onNext }: StepProps) {
  const [isValidZip, setIsValidZip] = useState(false)
  const [isTouched, setIsTouched] = useState(false)

  // Validate ZIP code (5 digits)
  useEffect(() => {
    const zipRegex = /^\d{5}$/
    setIsValidZip(zipRegex.test(data.zipCode))
  }, [data.zipCode])

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 5)
    updateData({ zipCode: value })
    if (!isTouched) setIsTouched(true)
  }

  const clearZip = () => {
    updateData({ zipCode: "" })
    setIsTouched(false)
  }

  const handleGetStarted = () => {
    if (isValidZip) {
      onNext()
    }
  }

  return (
    <div className="w-full max-w-xl text-center">
      {/* Headline */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
        Get your mortgage rate quote
      </h1>
      <p className="text-gray-600 text-sm sm:text-base mb-8 sm:mb-10">
        It only takes about 30 seconds to complete your custom quote!
      </p>

      {/* ZIP Code Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8 max-w-md mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Enter your ZIP code</h2>

        {/* ZIP Code Input */}
        <div className="mb-6">
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider text-left mb-2">
            ZIP Code
          </label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={data.zipCode}
              onChange={handleZipChange}
              placeholder="Enter ZIP"
              className={`w-full px-4 py-4 text-lg border-2 rounded-lg transition-colors focus:outline-none ${
                isTouched && data.zipCode.length > 0
                  ? isValidZip
                    ? "border-green-500 text-green-600 focus:border-green-500"
                    : "border-red-300 focus:border-red-400"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {isTouched && data.zipCode.length > 0 && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {isValidZip && <Check className="w-5 h-5 text-green-500" />}
                <button
                  onClick={clearZip}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Clear ZIP code"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Get Started Button */}
        <button
          onClick={handleGetStarted}
          disabled={!isValidZip}
          className={`w-full py-4 rounded-lg font-bold text-base sm:text-lg transition-colors ${
            isValidZip
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-400 text-white cursor-not-allowed"
          }`}
        >
          Get Started
        </button>

        {/* Disclosures Link */}
        <button className="mt-6 text-gray-500 text-sm hover:text-gray-700 underline">Disclosures</button>
      </div>
    </div>
  )
}
