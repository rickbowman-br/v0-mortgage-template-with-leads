"use client"

import React from "react"

import type { StepProps, PropertyType } from "../types"

const propertyOptions: { id: PropertyType; label: string; icon: React.ReactNode }[] = [
  {
    id: "single-family",
    label: "Single Family Home",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12 sm:w-16 sm:h-16">
        {/* Roof */}
        <path d="M8 28L32 8L56 28" strokeLinecap="round" strokeLinejoin="round" />
        {/* House body */}
        <path d="M14 26V52H50V26" strokeLinecap="round" strokeLinejoin="round" />
        {/* Door */}
        <rect x="26" y="36" width="12" height="16" strokeLinecap="round" strokeLinejoin="round" />
        {/* Window left */}
        <rect x="18" y="32" width="6" height="8" strokeLinecap="round" strokeLinejoin="round" />
        {/* Window right */}
        <rect x="40" y="32" width="6" height="8" strokeLinecap="round" strokeLinejoin="round" />
        {/* Chimney */}
        <rect x="40" y="12" width="6" height="10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "townhome",
    label: "Townhome",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12 sm:w-16 sm:h-16">
        {/* Roof */}
        <path d="M8 24L32 8L56 24" strokeLinecap="round" strokeLinejoin="round" />
        {/* House body */}
        <rect x="12" y="24" width="40" height="32" strokeLinecap="round" strokeLinejoin="round" />
        {/* Door */}
        <rect x="26" y="40" width="12" height="16" strokeLinecap="round" strokeLinejoin="round" />
        {/* Upper window */}
        <rect x="26" y="28" width="12" height="8" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="32" y1="28" x2="32" y2="36" strokeLinecap="round" />
        <line x1="26" y1="32" x2="38" y2="32" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "condo",
    label: "Condominium",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12 sm:w-16 sm:h-16">
        {/* Building body */}
        <rect x="12" y="8" width="40" height="48" strokeLinecap="round" strokeLinejoin="round" />
        {/* Windows row 1 */}
        <rect x="18" y="14" width="8" height="6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="38" y="14" width="8" height="6" strokeLinecap="round" strokeLinejoin="round" />
        {/* Windows row 2 */}
        <rect x="18" y="26" width="8" height="6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="38" y="26" width="8" height="6" strokeLinecap="round" strokeLinejoin="round" />
        {/* Windows row 3 */}
        <rect x="18" y="38" width="8" height="6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="38" y="38" width="8" height="6" strokeLinecap="round" strokeLinejoin="round" />
        {/* Door */}
        <rect x="27" y="48" width="10" height="8" strokeLinecap="round" strokeLinejoin="round" />
        {/* Base/entrance */}
        <line x1="8" y1="56" x2="56" y2="56" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "multi-family",
    label: "Multi-Family Home",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12 sm:w-16 sm:h-16">
        {/* Roof */}
        <path d="M8 24L32 8L56 24" strokeLinecap="round" strokeLinejoin="round" />
        {/* House body */}
        <rect x="12" y="24" width="40" height="32" strokeLinecap="round" strokeLinejoin="round" />
        {/* Vertical divider */}
        <line x1="32" y1="24" x2="32" y2="56" strokeLinecap="round" />
        {/* Left unit window */}
        <rect x="17" y="30" width="8" height="6" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="21" y1="30" x2="21" y2="36" strokeLinecap="round" />
        <line x1="17" y1="33" x2="25" y2="33" strokeLinecap="round" />
        {/* Right unit window */}
        <rect x="39" y="30" width="8" height="6" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="43" y1="30" x2="43" y2="36" strokeLinecap="round" />
        <line x1="39" y1="33" x2="47" y2="33" strokeLinecap="round" />
        {/* Left door */}
        <rect x="18" y="44" width="8" height="12" strokeLinecap="round" strokeLinejoin="round" />
        {/* Right door */}
        <rect x="38" y="44" width="8" height="12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export function PropertyTypeStep({ data, updateData, onNext, onBack }: StepProps) {
  const handleSelect = (type: PropertyType) => {
    updateData({ propertyType: type })
    onNext()
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8 text-center">
        What type of property are you purchasing?
      </h2>

      {/* Property Type Grid */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8">
        {propertyOptions.map((option) => {
          const isSelected = data.propertyType === option.id
          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`flex flex-col items-center justify-center p-6 sm:p-8 border-2 rounded-xl transition-all ${
                isSelected
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-white border-gray-200 text-blue-600 hover:border-blue-400 hover:bg-blue-50"
              }`}
            >
              <div className={isSelected ? "text-white" : "text-blue-600"}>{option.icon}</div>
              <span className={`mt-4 text-base sm:text-lg font-semibold text-center ${isSelected ? "text-white" : "text-blue-600"}`}>
                {option.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Back Button */}
      <div className="text-center">
        <button onClick={onBack} className="text-blue-600 hover:text-blue-700 font-medium text-base">
          Back
        </button>
      </div>
    </div>
  )
}
