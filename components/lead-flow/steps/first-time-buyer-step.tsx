"use client"

import type { StepProps } from "../types"

export function FirstTimeBuyerStep({ data, updateData, onNext, onBack }: StepProps) {
  const handleSelect = (isFirstTime: boolean) => {
    updateData({ firstTimeBuyer: isFirstTime })
    onNext()
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-10 mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8 text-center">
          Is this your first time purchasing property?
        </h2>

        {/* Yes/No Options */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8">
          {/* Yes Option */}
          <button
            onClick={() => handleSelect(true)}
            className={`flex flex-col items-center justify-center p-6 sm:p-8 border-2 rounded-xl transition-all min-w-[180px] sm:min-w-[200px] group ${
              data.firstTimeBuyer === true
                ? "border-blue-600 bg-blue-600"
                : "border-gray-200 hover:border-blue-500 hover:bg-blue-50"
            }`}
          >
            {/* Checkmark Circle Icon */}
            <svg
              className={`w-12 h-12 sm:w-16 sm:h-16 mb-4 ${
                data.firstTimeBuyer === true ? "text-white" : "text-blue-600"
              }`}
              viewBox="0 0 64 64"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="32" cy="32" r="24" />
              <path d="M20 32L28 40L44 24" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span
              className={`text-lg sm:text-xl font-semibold ${
                data.firstTimeBuyer === true ? "text-white" : "text-blue-600"
              }`}
            >
              Yes
            </span>
          </button>

          {/* No Option */}
          <button
            onClick={() => handleSelect(false)}
            className={`flex flex-col items-center justify-center p-6 sm:p-8 border-2 rounded-xl transition-all min-w-[180px] sm:min-w-[200px] group ${
              data.firstTimeBuyer === false
                ? "border-blue-600 bg-blue-600"
                : "border-gray-200 hover:border-blue-500 hover:bg-blue-50"
            }`}
          >
            {/* X Circle Icon */}
            <svg
              className={`w-12 h-12 sm:w-16 sm:h-16 mb-4 ${
                data.firstTimeBuyer === false ? "text-white" : "text-blue-600"
              }`}
              viewBox="0 0 64 64"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="32" cy="32" r="24" />
              <path d="M22 22L42 42M42 22L22 42" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span
              className={`text-lg sm:text-xl font-semibold ${
                data.firstTimeBuyer === false ? "text-white" : "text-blue-600"
              }`}
            >
              No
            </span>
          </button>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <button onClick={onBack} className="text-blue-600 hover:text-blue-700 font-medium text-base">
            Back
          </button>
        </div>
      </div>
    </div>
  )
}
