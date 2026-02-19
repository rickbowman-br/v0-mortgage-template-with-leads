"use client"

import type { StepProps } from "../types"

export function MilitaryStatusStep({ data, updateData, onNext, onBack }: StepProps) {
  const handleSelect = (value: boolean) => {
    updateData({ militaryStatus: value })
    onNext()
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8 text-center text-balance">
        Are you or your spouse an active military member, reserve member or veteran?
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        {/* Yes Option */}
        <button
          onClick={() => handleSelect(true)}
          className={`flex flex-col items-center justify-center p-6 sm:p-8 border-2 rounded-xl transition-all min-w-[180px] ${
            data.militaryStatus === true
              ? "border-blue-600 bg-blue-600"
              : "border-gray-200 hover:border-blue-300"
          }`}
        >
          {/* Checkmark Icon */}
          <svg
            className={`w-12 h-12 sm:w-14 sm:h-14 mb-3 ${
              data.militaryStatus === true ? "text-white" : "text-blue-600"
            }`}
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="24" cy="24" r="18" />
            <path d="M15 24L21 30L33 18" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span
            className={`text-lg font-semibold ${
              data.militaryStatus === true ? "text-white" : "text-blue-600"
            }`}
          >
            Yes
          </span>
        </button>

        {/* No Option */}
        <button
          onClick={() => handleSelect(false)}
          className={`flex flex-col items-center justify-center p-6 sm:p-8 border-2 rounded-xl transition-all min-w-[180px] ${
            data.militaryStatus === false
              ? "border-blue-600 bg-blue-600"
              : "border-gray-200 hover:border-blue-300"
          }`}
        >
          {/* X Icon */}
          <svg
            className={`w-12 h-12 sm:w-14 sm:h-14 mb-3 ${
              data.militaryStatus === false ? "text-white" : "text-blue-600"
            }`}
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="24" cy="24" r="18" />
            <path d="M17 17L31 31M31 17L17 31" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <span
            className={`text-lg font-semibold ${
              data.militaryStatus === false ? "text-white" : "text-blue-600"
            }`}
          >
            No
          </span>
        </button>
      </div>

      {/* Back Button */}
      <div className="text-center">
        <button onClick={onBack} className="text-blue-600 hover:text-blue-700 font-medium">
          Back
        </button>
      </div>
    </div>
  )
}
