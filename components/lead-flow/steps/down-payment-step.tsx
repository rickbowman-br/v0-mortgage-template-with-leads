"use client"

import type { StepProps, DownPayment } from "../types"

const OPTIONS: { value: DownPayment; label: string }[] = [
  { value: "less-than-20", label: "Less than 20%" },
  { value: "20", label: "20%" },
  { value: "more-than-20", label: "More than 20%" },
]

export function DownPaymentStep({ data, updateData, onNext, onBack }: StepProps) {
  const handleSelect = (value: DownPayment) => {
    updateData({ downPayment: value })
    onNext()
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center">
        What is your estimated down payment?
      </h2>
      
      <p className="text-gray-600 text-center mb-8 text-sm sm:text-base">
        Putting at least 20% down will help you avoid private mortgage insurance,
        though some lenders will let you put as little as 3% down.
      </p>

      {/* Options */}
      <div className="flex flex-col gap-4 mb-8">
        {OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={`w-full py-5 px-6 rounded-lg border-2 text-lg font-semibold transition-all ${
              data.downPayment === option.value
                ? "border-blue-600 bg-blue-50 text-blue-600"
                : "border-gray-200 bg-white text-blue-600 hover:border-gray-300"
            }`}
          >
            {option.label}
          </button>
        ))}
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
  )
}
