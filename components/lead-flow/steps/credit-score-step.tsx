"use client"

import React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import type { StepProps, CreditScore } from "../types"

const CREDIT_SCORES: { value: CreditScore; label: string; description: string }[] = [
  { value: "780+", label: "780+", description: "Excellent" },
  { value: "760-779", label: "760-779", description: "Excellent" },
  { value: "740-759", label: "740-759", description: "Very Good" },
  { value: "720-739", label: "720-739", description: "Very Good" },
  { value: "700-719", label: "700-719", description: "Good" },
  { value: "680-699", label: "680-699", description: "Good" },
  { value: "660-679", label: "660-679", description: "Building" },
  { value: "640-659", label: "640-659", description: "Building" },
  { value: "620-639", label: "620-639", description: "Emerging" },
  { value: "580-619", label: "580-619", description: "Emerging" },
]

// Reverse order for slider (high scores at top)
const SLIDER_SCORES = [...CREDIT_SCORES].reverse()

// Colors based on index in SLIDER_SCORES (0 = 580-619/Emerging at top, 9 = 780+/Excellent at bottom)
function getScoreColor(index: number, total: number): string {
  const position = index / (total - 1)
  if (position <= 0.2) return "bg-orange-400"   // Emerging (top of slider)
  if (position <= 0.4) return "bg-orange-500"   // Building
  if (position <= 0.6) return "bg-yellow-500"   // Good
  if (position <= 0.8) return "bg-teal-500"     // Very Good
  return "bg-teal-600"                           // Excellent (bottom of slider)
}

function getScoreTextColor(index: number, total: number): string {
  const position = index / (total - 1)
  if (position <= 0.2) return "text-orange-500"   // Emerging (top of slider)
  if (position <= 0.4) return "text-orange-600"   // Building
  if (position <= 0.6) return "text-yellow-600"   // Good
  if (position <= 0.8) return "text-teal-600"     // Very Good
  return "text-teal-700"                           // Excellent (bottom of slider)
}

import { CheckCircle2, Shield } from "lucide-react"

interface CreditScoreStepProps extends StepProps {
  isVerified?: boolean
}

export function CreditScoreStep({ data, updateData, onNext, onBack, isVerified = false }: CreditScoreStepProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(() => {
    if (data.creditScore) {
      const idx = SLIDER_SCORES.findIndex((s) => s.value === data.creditScore)
      return idx >= 0 ? idx : 5
    }
    return 5 // Default to middle-ish (700-719)
  })
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  const handleSelect = (index: number) => {
    setSelectedIndex(index)
    updateData({ creditScore: SLIDER_SCORES[index].value })
  }

  const handleContinue = () => {
    updateData({ creditScore: SLIDER_SCORES[selectedIndex].value })
    onNext()
  }

  const calculateIndexFromY = useCallback((clientY: number) => {
    if (!sliderRef.current) return selectedIndex
    const rect = sliderRef.current.getBoundingClientRect()
    const y = clientY - rect.top
    const percentage = Math.max(0, Math.min(1, y / rect.height))
    const newIndex = Math.round(percentage * (SLIDER_SCORES.length - 1))
    return newIndex
  }, [selectedIndex])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    const newIndex = calculateIndexFromY(e.clientY)
    handleSelect(newIndex)
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return
    const newIndex = calculateIndexFromY(e.clientY)
    setSelectedIndex(newIndex)
  }, [isDragging, calculateIndexFromY])

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false)
      updateData({ creditScore: SLIDER_SCORES[selectedIndex].value })
    }
  }, [isDragging, selectedIndex, updateData])

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    const touch = e.touches[0]
    const newIndex = calculateIndexFromY(touch.clientY)
    handleSelect(newIndex)
  }

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return
    const touch = e.touches[0]
    const newIndex = calculateIndexFromY(touch.clientY)
    setSelectedIndex(newIndex)
  }, [isDragging, calculateIndexFromY])

  const handleTouchEnd = useCallback(() => {
    if (isDragging) {
      setIsDragging(false)
      updateData({ creditScore: SLIDER_SCORES[selectedIndex].value })
    }
  }, [isDragging, selectedIndex, updateData])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
      window.addEventListener("touchmove", handleTouchMove)
      window.addEventListener("touchend", handleTouchEnd)
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd])

  const selectedScore = SLIDER_SCORES[selectedIndex]

  // Verified score view - read-only confirmation
  if (isVerified && data.verifiedCreditScore) {
    const verifiedIndex = SLIDER_SCORES.findIndex((s) => s.value === data.verifiedCreditScore)
    const verifiedScore = SLIDER_SCORES[verifiedIndex >= 0 ? verifiedIndex : 5]
    const scoreIndex = verifiedIndex >= 0 ? verifiedIndex : 5

    return (
      <div className="w-full max-w-xl mx-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 mb-4">
            <Shield className="w-8 h-8 text-teal-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-2">
            Your Credit Score
          </h2>
          <p className="text-blue-600">
            Verified via soft credit check
          </p>
        </div>

        {/* Verified Score Display Card */}
        <div className="bg-white rounded-2xl border-2 border-teal-200 shadow-lg p-6 sm:p-8 mb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-teal-600" />
            <span className="text-sm font-medium text-teal-700 uppercase tracking-wider">Verified Score</span>
          </div>
          
          <div className="text-center">
            <div className={`text-5xl sm:text-6xl font-bold mb-2 ${getScoreTextColor(scoreIndex, SLIDER_SCORES.length)}`}>
              {verifiedScore.label}
            </div>
            <div className={`text-xl font-semibold ${getScoreTextColor(scoreIndex, SLIDER_SCORES.length)}`}>
              {verifiedScore.description}
            </div>
          </div>

          {/* Score Scale Indicator */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>Poor</span>
              <span>Fair</span>
              <span>Good</span>
              <span>Excellent</span>
            </div>
            <div className="h-3 rounded-full bg-gradient-to-r from-red-500 via-yellow-400 to-teal-500 relative">
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-4 border-blue-600 rounded-full shadow-md"
                style={{ left: `${(scoreIndex / (SLIDER_SCORES.length - 1)) * 100}%`, transform: 'translateX(-50%) translateY(-50%)' }}
              />
            </div>
          </div>
        </div>

        {/* Credit Report Insights */}
        {data.totalMonthlyDebt !== null && (
          <div className="bg-white rounded-xl border border-blue-200 p-5 mb-6">
            <h3 className="font-bold text-blue-900 mb-4 text-sm uppercase tracking-wider">
              Credit Report Insights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Debt-to-Income Ratio */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Debt-to-Income</div>
                {(() => {
                  const monthlyIncome = (data.annualIncome || 125000) / 12
                  const dti = data.totalMonthlyDebt ? Math.round((data.totalMonthlyDebt / monthlyIncome) * 100) : 0
                  const isGood = dti < 36
                  const isAcceptable = dti < 43
                  return (
                    <>
                      <div className={`text-2xl font-bold ${isGood ? "text-teal-600" : isAcceptable ? "text-yellow-600" : "text-orange-600"}`}>
                        {dti}%
                      </div>
                      <div className={`text-xs font-medium ${isGood ? "text-teal-600" : isAcceptable ? "text-yellow-600" : "text-orange-600"}`}>
                        {isGood ? "Excellent" : isAcceptable ? "Acceptable" : "High"}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        ${data.totalMonthlyDebt?.toLocaleString()}/mo debt
                      </div>
                    </>
                  )
                })()}
              </div>

              {/* Payment History */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Payment History</div>
                {(() => {
                  const latePayments = data.latePayments24Months || 0
                  const isClean = latePayments === 0
                  const isFair = latePayments <= 2
                  return (
                    <>
                      <div className={`text-2xl font-bold ${isClean ? "text-teal-600" : isFair ? "text-yellow-600" : "text-orange-600"}`}>
                        {isClean ? "Perfect" : `${latePayments} Late`}
                      </div>
                      <div className={`text-xs font-medium ${isClean ? "text-teal-600" : isFair ? "text-yellow-600" : "text-orange-600"}`}>
                        {isClean ? "No late payments" : isFair ? "Minor issues" : "Needs attention"}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Last 24 months
                      </div>
                    </>
                  )
                })()}
              </div>

              {/* Credit History Length */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Credit History</div>
                {(() => {
                  const years = data.oldestAccountAge || 0
                  const isEstablished = years >= 7
                  const isMedium = years >= 3
                  return (
                    <>
                      <div className={`text-2xl font-bold ${isEstablished ? "text-teal-600" : isMedium ? "text-blue-600" : "text-yellow-600"}`}>
                        {years} Years
                      </div>
                      <div className={`text-xs font-medium ${isEstablished ? "text-teal-600" : isMedium ? "text-blue-600" : "text-yellow-600"}`}>
                        {isEstablished ? "Well Established" : isMedium ? "Building" : "New"}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Oldest account
                      </div>
                    </>
                  )
                })()}
              </div>
            </div>
          </div>
        )}

        {/* Continue Button */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={onNext}
            className="w-full sm:w-auto px-12 py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
          >
            Continue
          </button>
          <button onClick={onBack} className="text-blue-600 hover:text-blue-700 font-medium text-base">
            Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">
        What's your estimated credit score?
      </h2>
      <p className="text-gray-500 text-center mb-8">
        Drag the slider or click a range to select your score
      </p>

      {/* Selected Score Display */}
      <div className="text-center mb-6">
        <div className={`text-4xl sm:text-5xl font-bold ${getScoreTextColor(selectedIndex, SLIDER_SCORES.length)}`}>
          {selectedScore.label}
        </div>
        <div className={`text-lg font-medium mt-1 ${getScoreTextColor(selectedIndex, SLIDER_SCORES.length)}`}>
          {selectedScore.description}
        </div>
      </div>

      {/* Vertical Slider */}
      <div className="flex justify-center mb-8">
        <div className="flex items-stretch gap-4">
          {/* Labels on the left */}
          <div className="flex flex-col justify-between py-2 text-right">
            {SLIDER_SCORES.map((score, index) => (
              <button
                key={score.value}
                onClick={() => handleSelect(index)}
                className={`text-sm sm:text-base font-medium transition-all py-1 px-2 rounded-lg hover:bg-gray-100 ${
                  selectedIndex === index
                    ? `${getScoreTextColor(index, SLIDER_SCORES.length)} font-bold`
                    : "text-gray-500"
                }`}
              >
                {score.label}
              </button>
            ))}
          </div>

          {/* Slider Track */}
          <div
            ref={sliderRef}
            className="relative w-12 sm:w-16 h-[360px] sm:h-[400px] cursor-pointer select-none touch-none"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            {/* Background Track with gradient - orange (top/lower scores) to green (bottom/higher scores) */}
            <div className="absolute inset-0 rounded-full overflow-hidden bg-gradient-to-b from-orange-400 via-yellow-400 to-teal-500 opacity-25" />

            {/* Tick marks */}
            <div className="absolute inset-0 flex flex-col justify-between py-2">
              {SLIDER_SCORES.map((_, index) => {
                const isSelected = selectedIndex === index
                return (
                  <div
                    key={index}
                    className="flex items-center justify-center"
                  >
                    <div
                      className={`rounded-full transition-all ${
                        isSelected
                          ? `w-10 sm:w-12 h-3 ${getScoreColor(index, SLIDER_SCORES.length)}`
                          : "w-6 sm:w-8 h-2 bg-gray-300"
                      }`}
                    />
                  </div>
                )
              })}
            </div>

            {/* Slider Thumb */}
            <div
              className="absolute left-1/2 -translate-x-1/2 transition-all duration-150 ease-out pointer-events-none"
              style={{
                top: `calc(${(selectedIndex / (SLIDER_SCORES.length - 1)) * 100}% + 8px - ${selectedIndex === 0 ? 8 : selectedIndex === SLIDER_SCORES.length - 1 ? -8 : 0}px)`,
                transform: "translateX(-50%) translateY(-50%)",
              }}
            >
              <div
                className={`w-14 sm:w-16 h-8 sm:h-10 rounded-full shadow-lg border-4 border-white flex items-center justify-center ${getScoreColor(selectedIndex, SLIDER_SCORES.length)}`}
              >
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </div>
            </div>
          </div>

          {/* Description on the right */}
          <div className="flex flex-col justify-between py-2 text-left">
            {SLIDER_SCORES.map((score, index) => (
              <div
                key={score.value}
                className={`text-xs sm:text-sm py-1 px-2 transition-all ${
                  selectedIndex === index
                    ? `${getScoreTextColor(index, SLIDER_SCORES.length)} font-semibold`
                    : "text-gray-400"
                }`}
              >
                {score.description}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={handleContinue}
          className="w-full sm:w-auto px-12 py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
        >
          Continue
        </button>
        <button onClick={onBack} className="text-blue-600 hover:text-blue-700 font-medium text-base">
          Back
        </button>
      </div>
    </div>
  )
}
