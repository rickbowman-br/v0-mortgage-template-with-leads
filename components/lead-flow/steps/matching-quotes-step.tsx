"use client"

import type { StepProps, AdditionalLender } from "../types"
import { useState } from "react"
import { Star, StarHalf } from "lucide-react"

// Mock additional lenders data
const ADDITIONAL_LENDERS: AdditionalLender[] = [
  {
    id: "tomo",
    name: "Tomo mortgage",
    nmls: "2059741",
    stateLic: "MB.6761674",
    rating: 4.79,
    reviewCount: 195,
  },
  {
    id: "third-federal",
    name: "Third Federal",
    nmls: "449401",
    rating: 4.42,
    reviewCount: 152,
  },
  {
    id: "quicken",
    name: "Quicken Loans",
    nmls: "3030",
    stateLic: "2014-0123",
    rating: 4.65,
    reviewCount: 1250,
  },
  {
    id: "better",
    name: "Better Mortgage",
    nmls: "330511",
    rating: 4.51,
    reviewCount: 890,
  },
]

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0) - (rating % 1 >= 0.75 ? 1 : 0)
  const extraFullStar = rating % 1 >= 0.75

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars + (extraFullStar ? 1 : 0))].map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-yellow-400" />
      ))}
    </div>
  )
}

export function MatchingQuotesStep({ data, updateData, onNext, onBack }: StepProps) {
  const [selectedLenders, setSelectedLenders] = useState<string[]>(data.additionalLenders)
  const [showMore, setShowMore] = useState(false)

  const visibleLenders = showMore ? ADDITIONAL_LENDERS : ADDITIONAL_LENDERS.slice(0, 2)

  const toggleLender = (lenderId: string) => {
    if (selectedLenders.includes(lenderId)) {
      setSelectedLenders(selectedLenders.filter((id) => id !== lenderId))
    } else if (selectedLenders.length < 2) {
      setSelectedLenders([...selectedLenders, lenderId])
    }
  }

  const handleContinueWithQuotes = () => {
    updateData({ additionalLenders: selectedLenders })
    onNext()
  }

  const handleOriginalOnly = () => {
    updateData({ additionalLenders: [] })
    onNext()
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Header */}
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">
        We found other quotes that match your criteria
      </h2>
      <p className="text-gray-600 text-sm sm:text-base mb-8 text-center">
        Select up to 2 additional offers with no impact to your credit score.
      </p>

      {/* Lender Cards */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
        {/* Original Selection */}
        <div className="relative border-2 border-blue-500 rounded-lg p-4 min-w-[180px] bg-white">
          <div className="absolute -top-3 left-4 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded">
            Your Selection
          </div>
          <div className="mt-2">
            {/* Sage Logo placeholder */}
            <div className="h-12 flex items-center mb-3">
              <div className="text-green-700 font-bold text-lg flex items-center gap-1">
                <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
                  <path d="M20 5L5 15V35H15V25H25V35H35V15L20 5Z" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
                <div>
                  <div className="text-lg leading-none">Sage</div>
                  <div className="text-[8px] text-green-600 leading-none">HOME LOANS<br/>CORPORATION</div>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-600">NMLS #3304</p>
            <p className="text-xs text-gray-600 mb-2">State Lic 2014-0143</p>
            <div className="flex items-center gap-1">
              <StarRating rating={4.77} />
              <span className="text-sm font-medium">4.77</span>
              <span className="text-xs text-gray-500">(703)</span>
            </div>
          </div>
        </div>

        {/* Additional Lenders */}
        {visibleLenders.map((lender) => (
          <div
            key={lender.id}
            className={`relative border-2 rounded-lg p-4 min-w-[180px] cursor-pointer transition-colors ${
              selectedLenders.includes(lender.id)
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
            onClick={() => toggleLender(lender.id)}
          >
            {/* Checkbox */}
            <div className="absolute top-3 right-3">
              <div
                className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                  selectedLenders.includes(lender.id)
                    ? "border-blue-600 bg-blue-600"
                    : "border-gray-300"
                }`}
              >
                {selectedLenders.includes(lender.id) && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>

            <div className="mt-2">
              {/* Lender name as logo placeholder */}
              <div className="h-12 flex items-center mb-3">
                <span className="text-lg font-bold text-coral-500">{lender.name}</span>
              </div>
              <p className="text-xs text-gray-600">NMLS #{lender.nmls}</p>
              {lender.stateLic && (
                <p className="text-xs text-gray-600">State Lic {lender.stateLic}</p>
              )}
              <div className="flex items-center gap-1 mt-2">
                <StarRating rating={lender.rating} />
                <span className="text-sm font-medium">{lender.rating.toFixed(2)}</span>
                <span className="text-xs text-gray-500">({lender.reviewCount})</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {!showMore && ADDITIONAL_LENDERS.length > 2 && (
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowMore(true)}
            className="px-8 py-3 border-2 border-gray-300 rounded-lg text-blue-600 font-medium hover:border-gray-400 transition-colors"
          >
            Show more quotes
          </button>
        </div>
      )}

      {/* Legal Disclaimer */}
      <div className="text-xs text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
        By clicking "Continue" I provide an{" "}
        <a href="#" className="text-blue-600 hover:underline">
          electronic signature
        </a>{" "}
        by which I agree to the following: I give my express consent to receive emails,
        notifications and calls which may be auto-dialed, use artificial or pre-recorded
        voices, and/or be text messages about mortgage quotes from the selected lenders,
        their agents, and to the email address and/or telephone number(s), including
        wireless phone number(s), I have provided, even if I am on the do-not-call list.
        I understand that message and data rates may apply, and that I do not have to
        agree to receive these types of calls or text messages as a condition of
        purchasing any goods or services and that I may revoke my consent at any time.
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 max-w-md mx-auto mb-6">
        <button
          onClick={handleContinueWithQuotes}
          className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Continue with top {selectedLenders.length > 0 ? selectedLenders.length + 1 : 1} quote{selectedLenders.length > 0 ? "s" : ""}
        </button>
        <button
          onClick={handleOriginalOnly}
          className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          I only want my original quote
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
