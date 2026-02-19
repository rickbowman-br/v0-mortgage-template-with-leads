"use client"

import React from "react"

import type { StepProps, PropertyUse } from "../types"

interface PropertyUseOption {
  value: PropertyUse
  label: string
  icon: React.ReactNode
}

const propertyUseOptions: PropertyUseOption[] = [
  {
    value: "primary",
    label: "Primary Residence",
    icon: (
      <svg className="w-12 h-12 sm:w-14 sm:h-14" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        {/* House with roof */}
        <path d="M8 30L32 10L56 30" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 28V52H50V28" strokeLinecap="round" strokeLinejoin="round" />
        {/* Door */}
        <rect x="26" y="36" width="12" height="16" rx="1" />
        {/* Windows */}
        <rect x="18" y="34" width="6" height="6" />
        <rect x="40" y="34" width="6" height="6" />
        {/* Chimney dots */}
        <circle cx="20" cy="20" r="1.5" fill="currentColor" />
        <circle cx="26" cy="24" r="1.5" fill="currentColor" />
        <circle cx="20" cy="28" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    value: "second-home",
    label: "Second Home",
    icon: (
      <svg className="w-12 h-12 sm:w-14 sm:h-14" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Palm tree trunk */}
        <path d="M32 56V32" strokeWidth="3" strokeLinecap="round" />
        {/* Palm fronds */}
        <path d="M32 32C32 32 24 28 18 32C24 30 28 26 32 20C36 26 40 30 46 32C40 28 32 32 32 32Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M32 26C28 22 22 22 18 24" strokeLinecap="round" />
        <path d="M32 26C36 22 42 22 46 24" strokeLinecap="round" />
        <path d="M28 28C24 28 20 30 18 34" strokeLinecap="round" />
        <path d="M36 28C40 28 44 30 46 34" strokeLinecap="round" />
        {/* Ground */}
        <path d="M20 56H44" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: "investment",
    label: "Investment Or Rental",
    icon: (
      <svg className="w-12 h-12 sm:w-14 sm:h-14" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Hand */}
        <path d="M12 44C12 44 16 42 20 42C24 42 26 44 30 44C34 44 36 42 40 42L52 42" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 44L12 52C12 52 20 54 32 54C44 54 52 52 52 52L52 42" strokeLinecap="round" strokeLinejoin="round" />
        {/* Key */}
        <circle cx="42" cy="24" r="8" />
        <circle cx="42" cy="24" r="4" />
        <path d="M36 30L26 40" strokeLinecap="round" />
        <path d="M28 38L30 40" strokeLinecap="round" />
        <path d="M31 35L33 37" strokeLinecap="round" />
      </svg>
    ),
  },
]

export function PropertyUseStep({ data, updateData, onNext, onBack }: StepProps) {
  const handleSelect = (value: PropertyUse) => {
    updateData({ propertyUse: value })
    onNext()
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-10">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8 text-center">
          How will this property be used?
        </h2>

        {/* Property Use Options - 3 columns on desktop, stack on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {propertyUseOptions.map((option) => {
            const isSelected = data.propertyUse === option.value

            return (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`flex flex-col items-center justify-center p-6 sm:p-8 border-2 rounded-xl transition-all min-h-[140px] sm:min-h-[180px] ${
                  isSelected
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white border-gray-200 text-blue-600 hover:border-blue-400 hover:bg-blue-50"
                }`}
              >
                <div className={isSelected ? "text-white" : "text-gray-800"}>
                  {option.icon}
                </div>
                <span className={`text-base sm:text-lg font-semibold mt-4 text-center ${
                  isSelected ? "text-white" : "text-blue-600"
                }`}>
                  {option.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-700 font-medium text-base"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  )
}
