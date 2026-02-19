"use client"

import type { StepProps } from "../types"
import type { BuyingStage } from "../types"

const BUYING_STAGES: { value: BuyingStage; label: string }[] = [
  { value: "offer-accepted", label: "Offer Accepted by Seller" },
  { value: "making-offers", label: "Making Offers" },
  { value: "open-houses", label: "Going to Open Houses" },
  { value: "researching", label: "Researching Options" },
]

export function BuyingStageStep({ data, updateData, onNext, onBack }: StepProps) {
  const handleSelect = (stage: BuyingStage) => {
    updateData({ buyingStage: stage })
    onNext()
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8 text-center">
        Where are you in the homebuying process?
      </h2>

      {/* Vertical stacked options */}
      <div className="flex flex-col gap-3 mb-8">
        {BUYING_STAGES.map((stage) => {
          const isSelected = data.buyingStage === stage.value
          return (
            <button
              key={stage.value}
              onClick={() => handleSelect(stage.value)}
              className={`w-full py-4 px-6 rounded-lg border-2 text-center font-semibold text-lg transition-all ${
                isSelected
                  ? "border-blue-600 bg-blue-50 text-blue-600"
                  : "border-gray-200 bg-white text-blue-600 hover:border-blue-300 hover:bg-blue-50/50"
              }`}
            >
              {stage.label}
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
  )
}
