"use client"

import { Star, ArrowRight, MoreVertical } from "lucide-react"
import type { RateData } from "@/data/mortgage-rates"

interface RateTableRowProps {
  lender: RateData
  onSelectLender: (lender: RateData) => void
  onStartLeadFlow: (lender: RateData) => void
  mortgageType: "purchase" | "refinance"
  purchasePrice: string
  downPayment: string
  loanBalance: string
}

export function RateTableRow({
  lender,
  onSelectLender,
  onStartLeadFlow,
  mortgageType,
  purchasePrice,
  downPayment,
  loanBalance,
}: RateTableRowProps) {
  return (
    <div className="md:border-b md:border-gray-200 sm:px-6 sm:py-6 hover:bg-gray-50 px-0 py-0">
      {/* Mobile Layout */}
      <div className="md:hidden space-y-3 py-4">
        {/* Top row: Logo and menu */}
        <div className="flex items-center justify-between">
          {lender.logo && lender.logo.startsWith('http') ? (
            <div className="w-[120px] h-[45px] flex items-center justify-center p-2">
              <img 
                src={lender.logo} 
                alt={`${lender.lender} logo`} 
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-[120px] h-[45px] bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center border border-gray-300 shadow-sm">
              <span className="text-sm text-gray-900 font-bold">{lender.lender}</span>
            </div>
          )}
          <button onClick={() => onSelectLender(lender)} className="text-gray-400 hover:text-gray-600">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* Second row: NMLS, rating, and loan details */}
        <div className="flex items-start justify-between">
          <div className="w-1/2 space-y-2">
            <p className="text-gray-600 text-xs">{lender.nmls}</p>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3 h-3 ${
                    star <= Math.floor(lender.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
              <span className="text-sm font-medium text-gray-900 ml-1">{lender.rating}</span>
              <span className="text-xs text-blue-600">({lender.reviews})</span>
            </div>
          </div>
          <div className="text-right text-xs space-y-0.5">
            <div className="font-semibold text-gray-900">{lender.term}</div>
            <div className="text-gray-600">Points: {lender.points}</div>
            <div className="text-gray-600">8 year cost: {lender.yearCost}</div>
          </div>
        </div>

        {/* Feature badges */}
        {lender.features && lender.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {lender.features.slice(0, 3).map((feature: string) => (
              <span
                key={feature}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-teal-50 text-teal-700 border border-teal-200"
              >
                {feature}
              </span>
            ))}
          </div>
        )}

        {/* Fourth row: 4-column compact grid */}
        <div className="grid grid-cols-4 gap-1.5 py-3 items-end border-t">
          <div>
            <div className="text-[10px] text-gray-600 mb-1 whitespace-nowrap">Rate</div>
            <div className="font-bold text-gray-900 text-sm whitespace-nowrap">{lender.rate}%</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-600 mb-1 whitespace-nowrap">APR</div>
            <div className="font-bold text-gray-900 text-sm whitespace-nowrap">{lender.apr}%</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-600 mb-1 whitespace-nowrap">Upfront costs</div>
            <div className="font-bold text-gray-900 text-sm whitespace-nowrap">{lender.upfront}</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-600 mb-1 whitespace-nowrap">Mo. payment</div>
            <div className="font-bold text-gray-900 text-sm whitespace-nowrap">${lender.payment}</div>
          </div>
        </div>

        {/* Bottom: Full-width button */}
        <button
          onClick={() => onStartLeadFlow(lender)}
          className="w-full bg-blue-600 text-white px-4 py-3 rounded font-medium hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          Personalize <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid grid-cols-12 gap-3 sm:gap-4 items-start">
        {/* Lender Info */}
        <div className="col-span-12 sm:col-span-3">
          <div className="flex items-center gap-3 mb-2">
            {lender.logo && lender.logo.startsWith('http') ? (
              <div className="w-[120px] h-[45px] flex items-center justify-center flex-shrink-0 p-2">
                <img 
                  src={lender.logo} 
                  alt={`${lender.lender} logo`} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ) : (
              <div className="w-[120px] h-[45px] bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center flex-shrink-0 border border-gray-300 shadow-sm">
                <span className="text-sm text-gray-900 font-bold">{lender.lender}</span>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-600 mb-2">{lender.nmls}</p>
          <div className="flex items-center gap-1 mb-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-3 h-3 ${
                  star <= Math.floor(lender.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
            <span className="text-sm font-medium text-gray-900 ml-1">{lender.rating}</span>
            <span className="text-xs text-blue-600">({lender.reviews})</span>
          </div>
          {lender.phone && (
            <p className="text-xs text-gray-600 flex items-center gap-1">
              <span>📞</span> {lender.phone}
            </p>
          )}
          {/* Feature badges */}
          {lender.features && lender.features.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {lender.features.slice(0, 2).map((feature: string) => (
                <span
                  key={feature}
                  className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-teal-50 text-teal-700 border border-teal-200"
                >
                  {feature}
                </span>
              ))}
              {lender.features.length > 2 && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600">
                  +{lender.features.length - 2}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Rate */}
        <div className="col-span-12 sm:col-span-2 text-left">
          <div className="text-xl sm:text-2xl font-bold text-gray-900">{lender.rate}%</div>
          <div className="text-xs text-gray-600 break-words">
            <span className="border-b border-dotted border-gray-400 cursor-help relative group inline-block">
              {lender.term}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-white border border-gray-200 shadow-lg rounded py-2 px-3 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-10">
                <p className="text-xs text-gray-700">
                  {lender.term} mortgage with a consistent interest rate and payment for the entire loan
                  term.
                </p>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-l-transparent border-r-transparent border-t-gray-200"></div>
              </div>
            </span>
          </div>
        </div>

        {/* APR */}
        <div className="col-span-12 sm:col-span-2 text-left">
          <div className="text-xl sm:text-2xl font-bold text-gray-900">{lender.apr}%</div>
          <div className="text-xs text-gray-600 break-words">
            <span
              className="border-b border-dotted border-gray-400 cursor-help relative group inline-block"
              title="Points are fees paid directly to the lender in exchange for a reduced interest rate"
            >
              Points
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-white border border-gray-200 shadow-lg rounded py-2 px-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-10">
                <p className="text-xs text-gray-700">
                  Points are fees paid directly to the lender in exchange for a reduced interest rate. A
                  point is equal to 1 percent of the borrowed funds. By paying more in points upfront, you
                  save money on interest over the life of your loan. This offer has {lender.points} points which
                  adds ${Math.round((Number.parseFloat(lender.points) / 100) * (lender.loanAmount || 400000)).toLocaleString()} to the upfront cost of the loan.
                </p>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-l-transparent border-r-transparent border-t-gray-200"></div>
              </div>
            </span>
            : {lender.points}
          </div>
        </div>

        {/* Monthly Payment */}
        <div className="col-span-12 sm:col-span-3 text-left">
          <div className="text-xl sm:text-2xl font-bold text-gray-900">${lender.payment}</div>
          <div className="text-xs text-gray-600 break-words whitespace-nowrap">
            <span
              className="border-b border-dotted border-gray-400 cursor-help relative group inline-block"
              title="Upfront costs include origination fees, appraisal fees, and other closing costs"
            >
              Upfront costs
              <UpfrontCostsTooltip 
                lender={lender} 
                mortgageType={mortgageType}
                purchasePrice={purchasePrice}
                downPayment={downPayment}
                loanBalance={loanBalance}
              />
            </span>
            : {lender.upfront}
          </div>
          <div className="text-xs text-gray-600 break-words whitespace-nowrap mt-2">
            <span
              className="border-b border-dotted border-gray-400 cursor-help relative group inline-block"
              title="Total cost over 8 years including payments and upfront costs"
            >
              8 year cost
              <div className="absolute bottom-full right-0 mb-2 w-64 bg-white border border-gray-200 shadow-lg rounded-lg py-3 px-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-10 whitespace-normal">
                <p className="text-xs text-gray-700 mb-2">
                  Total cost of homeownership over 8 years, including monthly payments, upfront costs, and
                  estimated interest.
                </p>
                <p className="text-xs text-gray-500">
                  This helps compare loans with different rate/point combinations.
                </p>
                <div className="absolute top-full right-4 w-0 h-0 border-l-2 border-r-2 border-t-2 border-l-transparent border-r-transparent border-t-gray-200"></div>
              </div>
            </span>
            : {lender.yearCost}
          </div>
        </div>

        {/* CTA */}
        <div className="col-span-12 sm:col-span-2 flex flex-col gap-2">
          <button
            onClick={() => onStartLeadFlow(lender)}
            className="w-full bg-blue-600 text-white px-4 py-3 rounded font-medium hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            Personalize <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onSelectLender(lender)}
            className="w-full text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            More details
          </button>
        </div>
      </div>
    </div>
  )
}

function UpfrontCostsTooltip({ 
  lender, 
  mortgageType, 
  purchasePrice, 
  downPayment, 
  loanBalance 
}: { 
  lender: RateData
  mortgageType: "purchase" | "refinance"
  purchasePrice: string
  downPayment: string
  loanBalance: string
}) {
  const loanAmount = mortgageType === "purchase"
    ? Number.parseInt(purchasePrice.replace(/[$,]/g, "")) - Number.parseInt(downPayment.replace(/[$,]/g, ""))
    : Number.parseInt(loanBalance.replace(/[$,]/g, ""))

  return (
    <div className="absolute bottom-full right-0 mb-2 w-80 max-w-[320px] bg-white border border-gray-200 shadow-lg rounded-lg py-4 px-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-10 whitespace-normal">
      <h4 className="text-sm font-semibold text-gray-700 mb-3">
        Lender origination fees breakdown
      </h4>

      <div className="space-y-2 mb-3">
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-600">Points {lender.points}</span>
          <span className="text-gray-900 font-medium">
            ${Math.round((Number.parseFloat(lender.points) / 100) * loanAmount).toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-600">Loan origination fee</span>
          <span className="text-gray-900 font-medium">$0</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-600">Processing fee</span>
          <span className="text-gray-900 font-medium">$499</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-600">Underwriting fee</span>
          <span className="text-gray-900 font-medium">$995</span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-2 mb-3">
        <div className="flex justify-between items-center text-sm font-semibold">
          <span className="text-gray-900">Total upfront costs:</span>
          <span className="text-gray-900">{lender.upfront}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-600">Upfront costs: {lender.upfront}</span>
        <button className="text-xs text-blue-600 hover:underline">More information</button>
      </div>

      <div className="absolute top-full right-4 w-0 h-0 border-l-2 border-r-2 border-t-2 border-l-transparent border-r-transparent border-t-gray-200"></div>
    </div>
  )
}
