"use client"

import type { StepProps } from "../types"

export function LoanTypeStep({ data, updateData, onNext, onBack }: StepProps) {
  const handleLoanTypeSelect = (type: "purchase" | "refinance") => {
    updateData({ loanType: type })
    onNext()
  }

  return (
    <div className="w-full max-w-2xl">
      {/* Loan Type Card */}
      <div className="bg-background rounded-xl shadow-lg border border-blue-100 p-6 sm:p-10 mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-8 text-center text-balance">
          What type of loan are you looking for?
        </h2>

        {/* Loan Type Options */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8">
          {/* Home Purchase Option */}
          <button
            type="button"
            onClick={() => handleLoanTypeSelect("purchase")}
            className="flex flex-col items-center justify-center p-6 sm:p-8 border-2 border-blue-200 rounded-xl hover:border-blue-600 hover:bg-blue-50 transition-all min-w-[200px] group focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            <HomePurchaseIcon />
            <span className="text-lg sm:text-xl font-semibold text-blue-600 group-hover:text-blue-700">
              Home Purchase
            </span>
          </button>

          {/* Home Refinance Option */}
          <button
            type="button"
            onClick={() => handleLoanTypeSelect("refinance")}
            className="flex flex-col items-center justify-center p-6 sm:p-8 border-2 border-blue-200 rounded-xl hover:border-blue-600 hover:bg-blue-50 transition-all min-w-[200px] group focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            <HomeRefinanceIcon />
            <span className="text-lg sm:text-xl font-semibold text-blue-600 group-hover:text-blue-700">
              Home Refinance
            </span>
          </button>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <button 
            type="button"
            onClick={onBack} 
            className="text-blue-600 hover:text-blue-700 font-medium text-base transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  )
}

function HomePurchaseIcon() {
  return (
    <svg
      className="w-12 h-12 sm:w-16 sm:h-16 mb-4 text-teal-500 group-hover:text-teal-600 transition-colors"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="12" y="20" width="40" height="36" rx="1" />
      <path d="M8 20L32 4L56 20" />
      <rect x="24" y="28" width="16" height="12" />
      <line x1="32" y1="28" x2="32" y2="40" />
      <line x1="24" y1="34" x2="40" y2="34" />
      <rect x="26" y="44" width="12" height="12" />
    </svg>
  )
}

function HomeRefinanceIcon() {
  return (
    <svg
      className="w-12 h-12 sm:w-16 sm:h-16 mb-4 text-teal-500 group-hover:text-teal-600 transition-colors"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M8 28L32 8L56 28" />
      <path d="M14 26V52H50V26" />
      <circle cx="32" cy="38" r="10" />
      <path d="M32 32V44M29 34C29 33 30 32 32 32C34 32 35 33 35 34.5C35 36 34 36.5 32 37C30 37.5 29 38 29 39.5C29 41 30 42 32 42C34 42 35 41 35 40" />
    </svg>
  )
}
