"use client"

import { X, ArrowRight } from "lucide-react"
import { formatDollarAmount } from "@/data/mortgage-rates/rate-calculation"
import type { RateData } from "@/data/mortgage-rates/types"

interface LenderModalProps {
  lender: RateData | null
  onClose: () => void
  onStartLeadFlow: (lender: RateData) => void
}

export function LenderModal({ lender, onClose, onStartLeadFlow }: LenderModalProps) {
  if (!lender) return null

  const lenderName = lender.lender || "Unknown Lender"
  const lenderInitial = lenderName.charAt(0).toUpperCase()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] md:max-h-[90vh] flex flex-col">
        {/* Sticky Top Section */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b bg-white rounded-t-lg py-3 md:py-4">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold text-base md:text-lg">{lenderInitial}</span>
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">{lenderName}</h2>
          </div>
          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden md:flex gap-6">
              <button className="text-blue-600 font-medium border-b-2 border-blue-600 pb-2">Details</button>
              <button className="text-gray-500 font-medium pb-2">Payment</button>
              <button className="text-gray-500 font-medium pb-2">Reviews</button>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="space-y-4 md:space-y-6">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">Details</h3>

              <div className="md:hidden grid grid-cols-2 gap-4 mb-6 pb-6 border-b">
                <div>
                  <div className="text-xs text-gray-600 mb-1">Rate</div>
                  <div className="text-lg font-bold text-gray-900">{lender.rate || "4.500"}%</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">APR</div>
                  <div className="text-lg font-bold text-gray-900">{lender.apr || "4.792"}%</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Loan amount</div>
                  <div className="text-lg font-bold text-gray-900">
                    ${formatDollarAmount(lender.loanAmount, "400,000")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Monthly payment</div>
                  <div className="text-lg font-bold text-gray-900">
                    ${formatDollarAmount(lender.monthlyPayment, "3,060")}
                  </div>
                  <div className="text-[10px] text-gray-500">180 equal monthly payments</div>
                </div>
              </div>

              <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4 pb-2 border-b">
                Upfront costs for this offer: ${formatDollarAmount(lender.upfrontCosts, "8,950")}
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                The upfront costs shown are charged by the lender for originating the loan. These fees are commonly
                labeled as Origination, Application, Processing, Underwriting, or Administrative fees on the Loan
                Estimate. These fees do not include all costs associated with originating your mortgage. Please visit
                the{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Consumer Financial Protection Bureau's website
                </a>{" "}
                for more information on common costs associated with taking out a mortgage loan.
              </p>
            </div>

            <div className="mb-4 md:mb-6">
              <h4 className="text-sm font-bold text-gray-900 mb-3 md:mb-4 tracking-wide">LENDER ORIGINATION FEES</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-700 text-sm md:text-base">
                    Points {lender.points}
                    <sup>1</sup>
                  </span>
                  <span className="font-medium text-sm md:text-base">
                    ${formatDollarAmount(lender.pointsCost, "1,500")}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-700 text-sm md:text-base">
                    Origination Fee<sup>2</sup>
                  </span>
                  <span className="font-medium text-sm md:text-base">
                    ${formatDollarAmount(lender.originationFee, "1,200")}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-700 text-sm md:text-base">
                    Underwriting Fee<sup>3</sup>
                  </span>
                  <span className="font-medium text-sm md:text-base">
                    ${formatDollarAmount(lender.underwritingFee, "950")}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-700 text-sm md:text-base">
                    Processing<sup>4</sup>
                  </span>
                  <span className="font-medium text-sm md:text-base">
                    ${formatDollarAmount(lender.processingFee, "450")}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-4 md:mb-6">
              <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">8 Year Cost</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm md:text-base">Total cost over 8 years</span>
                  <span className="text-lg md:text-xl font-bold text-gray-900">
                    ${formatDollarAmount(lender.eightYearCost, "85,000")}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-gray-600 mt-2">
                  Includes monthly payments, upfront costs, and estimated interest over 8 years
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Section */}
        <div className="border-t bg-gray-50 p-4 md:p-6 py-3 md:py-4 rounded-md">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 flex-1 md:mr-8">
              <div>
                <div className="text-xs md:text-sm text-gray-600 mb-1">Rate</div>
                <div className="text-lg md:text-2xl font-bold text-gray-900">{lender.rate || "4.500"}%</div>
              </div>
              <div>
                <div className="text-xs md:text-sm text-gray-600 mb-1">APR</div>
                <div className="text-lg md:text-2xl font-bold text-gray-900">{lender.apr || "4.792"}%</div>
              </div>
              <div>
                <div className="text-xs md:text-sm text-gray-600 mb-1">Loan amount</div>
                <div className="text-lg md:text-2xl font-bold text-gray-900">
                  ${formatDollarAmount(lender.loanAmount, "400,000")}
                </div>
              </div>
              <div>
                <div className="text-xs md:text-sm text-gray-600 mb-1">Monthly payment</div>
                <div className="text-lg md:text-2xl font-bold text-gray-900">
                  ${formatDollarAmount(lender.monthlyPayment, "3,060")}
                </div>
                <div className="text-[10px] md:text-xs text-gray-500">180 equal monthly payments</div>
              </div>
            </div>
            <div className="flex-shrink-0 w-full md:w-auto">
              <button 
                onClick={() => {
                  onClose()
                  onStartLeadFlow(lender)
                }}
                className="w-full md:w-auto bg-blue-600 text-white px-6 md:px-8 py-3 rounded font-medium hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                Personalize <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
