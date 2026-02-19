"use client"

import type { StepProps } from "../types"
import { useState } from "react"
import { Shield, Zap, Target, ChevronRight, Lock, CheckCircle2 } from "lucide-react"

export function SoftCreditCheckStep({ data, updateData, onNext, onBack }: StepProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSSNInput, setShowSSNInput] = useState(false)
  const [ssnLast4, setSSNLast4] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleSoftCheck = () => {
    setShowSSNInput(true)
  }

  const handleSubmitSoftCheck = () => {
    if (ssnLast4.length === 4 && dateOfBirth && agreedToTerms) {
      setIsProcessing(true)
      // Simulate soft credit check processing
      setTimeout(() => {
        // Simulate getting a verified credit score and credit report data from the soft check
        const verifiedScore = "740-759" as const // In reality, this would come from the API
        // Simulated credit report data
        const totalMonthlyDebt = 1850 // Credit cards, auto loan, student loans
        const latePayments24Months = 0 // Clean payment history
        const oldestAccountAge = 8 // 8 years
        
        updateData({ 
          softCreditCheckCompleted: true,
          creditScore: verifiedScore,
          verifiedCreditScore: verifiedScore,
          totalMonthlyDebt,
          latePayments24Months,
          oldestAccountAge,
        })
        setIsProcessing(false)
        onNext() // Go to credit score step to show verified score
      }, 2000)
    }
  }

  const handleSkip = () => {
    updateData({ softCreditCheckCompleted: false })
    onNext() // Go to credit score step for manual entry
  }

  if (isProcessing) {
    return (
      <div className="w-full max-w-xl mx-auto text-center py-12">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-6 relative">
            <div className="absolute inset-0 border-4 border-blue-200 rounded-full" />
            <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin" />
            <Shield className="w-8 h-8 text-blue-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-2">
            Securely verifying your credit
          </h2>
          <p className="text-blue-700">
            This soft check will not affect your credit score
          </p>
        </div>
        <div className="flex justify-center gap-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    )
  }

  if (showSSNInput) {
    return (
      <div className="w-full max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-2">
            Verify your identity
          </h2>
          <p className="text-blue-700">
            We need a few details to perform your free soft credit check
          </p>
        </div>

        <div className="bg-white border border-blue-200 rounded-xl p-6 mb-6">
          {/* SSN Last 4 */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-blue-900 mb-2">
              Last 4 digits of SSN
            </label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={4}
              value={ssnLast4}
              onChange={(e) => setSSNLast4(e.target.value.replace(/\D/g, "").slice(0, 4))}
              placeholder="****"
              className="w-full px-4 py-3 text-lg tracking-widest text-center border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
          </div>

          {/* Date of Birth */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-blue-900 mb-2">
              Date of birth
            </label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
          </div>

          {/* Terms Agreement */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 w-5 h-5 rounded border-blue-300 text-blue-600 focus:ring-blue-600"
            />
            <span className="text-sm text-blue-800">
              I authorize a soft credit inquiry that will not affect my credit score. I agree to the{" "}
              <a href="#" className="text-blue-600 underline hover:text-blue-700">Terms of Service</a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 underline hover:text-blue-700">Privacy Policy</a>.
            </span>
          </label>
        </div>

        {/* Security Note */}
        <div className="flex items-center gap-2 justify-center text-sm text-blue-700 mb-6">
          <Shield className="w-4 h-4" />
          <span>256-bit SSL encryption protects your data</span>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmitSoftCheck}
          disabled={ssnLast4.length !== 4 || !dateOfBirth || !agreedToTerms}
          className={`w-full py-4 rounded-lg font-semibold text-lg transition-all mb-4 ${
            ssnLast4.length === 4 && dateOfBirth && agreedToTerms
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-200 text-blue-400 cursor-not-allowed"
          }`}
        >
          Verify My Credit
        </button>

        {/* Back Button */}
        <div className="text-center">
          <button 
            onClick={() => setShowSSNInput(false)} 
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-2">
          Want a more accurate quote?
        </h2>
        <p className="text-blue-700">
          Use our free soft credit check, or enter your score manually
        </p>
      </div>

      {/* Benefits Card */}
      <div className="bg-gradient-to-br from-blue-50 to-teal-50 border border-blue-200 rounded-2xl p-6 sm:p-8 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-blue-900 text-lg">Free Soft Credit Check</h3>
            <p className="text-teal-600 text-sm font-medium">No impact to your credit score</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-900">More accurate rates</h4>
              <p className="text-sm text-blue-700">Get quotes based on your verified credit, not estimates</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
              <Zap className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-900">Faster approval process</h4>
              <p className="text-sm text-blue-700">Skip steps later when you're ready to apply</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-teal-500" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-900">Know where you stand</h4>
              <p className="text-sm text-blue-700">See your actual credit score and what rates you qualify for</p>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-blue-200">
          <div className="flex items-center gap-1.5 text-xs text-blue-700">
            <Lock className="w-3.5 h-3.5" />
            <span>Bank-level security</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-blue-700">
            <Shield className="w-3.5 h-3.5" />
            <span>No hard inquiry</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-blue-700">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% free</span>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="space-y-3 mb-6">
        <button
          onClick={handleSoftCheck}
          className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          Get Pre-Qualified Now
          <ChevronRight className="w-5 h-5" />
        </button>

        <button
          onClick={handleSkip}
          className="w-full bg-white border-2 border-blue-200 text-blue-600 py-4 rounded-lg font-medium hover:border-blue-300 hover:bg-blue-50 transition-colors"
        >
          Enter my credit score manually
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
