"use client"

import type { StepProps, EmploymentStatus } from "../types"

const employmentOptions: { value: EmploymentStatus; label: string }[] = [
  { value: "employed", label: "Employed" },
  { value: "not-employed", label: "Not Employed" },
  { value: "self-employed", label: "Self Employed" },
  { value: "military", label: "Military" },
  { value: "retired", label: "Retired" },
  { value: "other", label: "Other" },
]

export function EmploymentStatusStep({ data, updateData, onNext, onBack }: StepProps) {
  const handleSelect = (status: EmploymentStatus) => {
    updateData({ employmentStatus: status })
    onNext()
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8 text-center">
        What's your employment status?
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {employmentOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={`p-4 sm:p-5 border-2 rounded-xl text-center font-semibold text-base sm:text-lg transition-all ${
              data.employmentStatus === option.value
                ? "border-blue-600 bg-blue-50 text-blue-600"
                : "border-gray-200 text-blue-600 hover:border-blue-300 hover:bg-blue-50/50"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

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
