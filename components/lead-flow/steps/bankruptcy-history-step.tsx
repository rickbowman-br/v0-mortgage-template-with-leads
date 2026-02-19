"use client"

import type { StepProps } from "../types"

export function BankruptcyHistoryStep({ data, updateData, onNext, onBack }: StepProps) {
  const handleSelect = (value: boolean) => {
    updateData({ bankruptcyHistory: value })
    onNext()
  }

  const options = [
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ]

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8 text-center text-balance">
        Have you filed for bankruptcy or foreclosure in the last four years?
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8">
        {options.map((option) => {
          const isSelected = data.bankruptcyHistory === option.value
          return (
            <button
              key={option.label}
              onClick={() => handleSelect(option.value)}
              className={`flex flex-col items-center justify-center p-6 sm:p-8 border-2 rounded-xl transition-all min-w-[160px] sm:min-w-[200px] ${
                isSelected
                  ? "bg-blue-600 border-blue-600"
                  : "bg-white border-gray-200 hover:border-blue-300"
              }`}
            >
              {/* Circle icon */}
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 flex items-center justify-center mb-4 ${
                  isSelected ? "border-white" : "border-gray-800"
                }`}
              >
                {option.value ? (
                  // Checkmark
                  <svg
                    className={`w-8 h-8 sm:w-10 sm:h-10 ${isSelected ? "text-white" : "text-blue-600"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  // X mark
                  <svg
                    className={`w-8 h-8 sm:w-10 sm:h-10 ${isSelected ? "text-white" : "text-blue-600"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <span
                className={`text-lg sm:text-xl font-semibold ${
                  isSelected ? "text-white" : "text-blue-600"
                }`}
              >
                {option.label}
              </span>
            </button>
          )
        })}
      </div>

      <div className="text-center">
        <button onClick={onBack} className="text-blue-600 hover:text-blue-700 font-medium text-base">
          Back
        </button>
      </div>
    </div>
  )
}
