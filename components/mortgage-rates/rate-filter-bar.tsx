"use client"

import { useState, useRef } from "react"
import { ChevronDown, Info, SlidersHorizontal } from "lucide-react"

interface LoanTermsState {
  "30yr": boolean
  "20yr": boolean
  "15yr": boolean
  "10yr": boolean
  "3yrARM": boolean
  "5yrARM": boolean
  "7yrARM": boolean
  "10yrARM": boolean
}

interface RateFilterBarProps {
  mortgageType: "purchase" | "refinance"
  setMortgageType: (type: "purchase" | "refinance") => void
  zipCode: string
  setZipCode: (zip: string) => void
  purchasePrice: string
  setPurchasePrice: (price: string) => void
  downPayment: string
  setDownPayment: (payment: string) => void
  downPaymentPercent: string
  setDownPaymentPercent: (percent: string) => void
  creditScore: string
  setCreditScore: (score: string) => void
  loanTerms: LoanTermsState
  setLoanTerms: (terms: LoanTermsState) => void
  showFHA: "yes" | "no"
  setShowFHA: (show: "yes" | "no") => void
  showVA: "yes" | "no"
  setShowVA: (show: "yes" | "no") => void
  propertyValue: string
  setPropertyValue: (value: string) => void
  cashOut: "yes" | "no"
  setCashOut: (cashOut: "yes" | "no") => void
  loanBalance: string
  setLoanBalance: (balance: string) => void
  dtiRatio: "less40" | "40plus"
  setDtiRatio: (ratio: "less40" | "40plus") => void
  pointsFilter: "all" | "0" | "0-1" | "1-2"
  setPointsFilter: (filter: "all" | "0" | "0-1" | "1-2") => void
  propertyType: string
  setPropertyType: (type: string) => void
  propertyUse: "primary" | "secondary" | "rental"
  setPropertyUse: (use: "primary" | "secondary" | "rental") => void
  handlePurchasePriceChange: (value: string) => void
  handleDownPaymentChange: (value: string) => void
  handleLoanTermChange: (term: string) => void
}

export function RateFilterBar({
  mortgageType,
  setMortgageType,
  zipCode,
  setZipCode,
  purchasePrice,
  downPayment,
  creditScore,
  setCreditScore,
  loanTerms,
  showFHA,
  setShowFHA,
  showVA,
  setShowVA,
  propertyValue,
  setPropertyValue,
  cashOut,
  setCashOut,
  loanBalance,
  setLoanBalance,
  dtiRatio,
  setDtiRatio,
  pointsFilter,
  setPointsFilter,
  propertyType,
  setPropertyType,
  propertyUse,
  setPropertyUse,
  handlePurchasePriceChange,
  handleDownPaymentChange,
  handleLoanTermChange,
}: RateFilterBarProps) {
  const [isFilterExpanded, setIsFilterExpanded] = useState(false)
  const [showMoreLoanTerms, setShowMoreLoanTerms] = useState(false)
  const [showMoreFilters, setShowMoreFilters] = useState(false)
  const filterBarRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={filterBarRef} className="relative mb-6">
      {/* Compact Filter Bar */}
      <div className="bg-background rounded-xl border border-blue-200 shadow-sm overflow-hidden">
        {/* Main Filter Row - Responsive grid */}
        <div className="p-3 sm:p-4">
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-end gap-3 sm:gap-4">
            {/* Mortgage Type */}
            <div className="col-span-2 sm:flex-shrink-0">
              <label className="block text-xs font-medium text-blue-700 uppercase tracking-wider mb-1.5">
                Mortgage type
              </label>
              <div className="flex">
                <button
                  type="button"
                  onClick={() => setMortgageType("purchase")}
                  className={`flex-1 sm:flex-none px-3 py-2 text-sm border rounded-l-lg font-medium transition-colors ${
                    mortgageType === "purchase"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-background text-blue-900 border-blue-200 hover:bg-blue-50"
                  }`}
                >
                  Purchase
                </button>
                <button
                  type="button"
                  onClick={() => setMortgageType("refinance")}
                  className={`flex-1 sm:flex-none px-3 py-2 text-sm border border-l-0 rounded-r-lg font-medium transition-colors ${
                    mortgageType === "refinance"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-background text-blue-900 border-blue-200 hover:bg-blue-50"
                  }`}
                >
                  Refinance
                </button>
              </div>
            </div>

            {/* ZIP Code */}
            <div className="col-span-1">
              <label className="block text-xs font-medium text-blue-700 uppercase tracking-wider mb-1.5">
                ZIP code
              </label>
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="w-full sm:w-24 px-3 py-2 text-sm border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
              />
            </div>

            {/* Credit Score - On mobile, show next to ZIP */}
            <div className="col-span-1 sm:hidden">
              <label className="block text-xs font-medium text-blue-700 uppercase tracking-wider mb-1.5">
                Credit score
              </label>
              <select
                value={creditScore}
                onChange={(e) => setCreditScore(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors bg-background"
              >
                <option>780+</option>
                <option>740-779</option>
                <option>700-739</option>
                <option>660-699</option>
                <option>620-659</option>
                <option>580-619</option>
              </select>
            </div>

            {/* Purchase Price / Property Value */}
            <div className="col-span-1 hidden sm:block sm:w-32">
              <label className="block text-xs font-medium text-blue-700 uppercase tracking-wider mb-1.5">
                {mortgageType === "purchase" ? "Price" : "Value"}
              </label>
              <input
                type="text"
                value={mortgageType === "purchase" ? purchasePrice : propertyValue}
                onChange={(e) =>
                  mortgageType === "purchase"
                    ? handlePurchasePriceChange(e.target.value)
                    : setPropertyValue(e.target.value)
                }
                className="w-full px-3 py-2 text-sm border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
              />
            </div>

            {/* Down Payment (Purchase) or Loan Balance (Refinance) */}
            <div className="col-span-1 hidden sm:block sm:w-32">
              <label className="block text-xs font-medium text-blue-700 uppercase tracking-wider mb-1.5">
                {mortgageType === "purchase" ? "Down payment" : "Loan balance"}
              </label>
              <input
                type="text"
                value={mortgageType === "purchase" ? downPayment : loanBalance}
                onChange={(e) =>
                  mortgageType === "purchase"
                    ? handleDownPaymentChange(e.target.value)
                    : setLoanBalance(e.target.value)
                }
                className="w-full px-3 py-2 text-sm border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
              />
            </div>

            {/* Credit Score - Desktop */}
            <div className="hidden sm:block sm:w-28">
              <label className="block text-xs font-medium text-blue-700 uppercase tracking-wider mb-1.5">
                Credit score
              </label>
              <select
                value={creditScore}
                onChange={(e) => setCreditScore(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors bg-background"
              >
                <option>780+</option>
                <option>740-779</option>
                <option>700-739</option>
                <option>660-699</option>
                <option>620-659</option>
                <option>580-619</option>
              </select>
            </div>

            {/* All Filters Button */}
            <button
              type="button"
              onClick={() => setIsFilterExpanded(!isFilterExpanded)}
              className={`col-span-2 sm:col-span-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                isFilterExpanded
                  ? "bg-blue-600 text-white"
                  : "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>All Filters</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isFilterExpanded ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        {/* Expanded Filter Panel */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-out ${
            isFilterExpanded ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-blue-100 bg-blue-50/50 p-4 sm:p-6">
            {/* Mobile-only fields: Price and Down Payment */}
            <div className="grid grid-cols-2 gap-3 mb-4 sm:hidden">
              <div>
                <label className="block text-xs font-medium text-blue-700 uppercase tracking-wider mb-1.5">
                  {mortgageType === "purchase" ? "Price" : "Value"}
                </label>
                <input
                  type="text"
                  value={mortgageType === "purchase" ? purchasePrice : propertyValue}
                  onChange={(e) =>
                    mortgageType === "purchase"
                      ? handlePurchasePriceChange(e.target.value)
                      : setPropertyValue(e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors bg-background"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-blue-700 uppercase tracking-wider mb-1.5">
                  {mortgageType === "purchase" ? "Down payment" : "Loan balance"}
                </label>
                <input
                  type="text"
                  value={mortgageType === "purchase" ? downPayment : loanBalance}
                  onChange={(e) =>
                    mortgageType === "purchase"
                      ? handleDownPaymentChange(e.target.value)
                      : setLoanBalance(e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors bg-background"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Loan Term */}
              <div>
                <h3 className="text-sm font-semibold text-blue-900 mb-3">Loan term</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: "30yr", label: "30 yr fixed" },
                    { key: "20yr", label: "20 yr fixed" },
                    { key: "15yr", label: "15 yr fixed" },
                    { key: "10yr", label: "10 yr fixed" },
                  ].map((term) => (
                    <label key={term.key} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={loanTerms[term.key as keyof typeof loanTerms]}
                        onChange={() => handleLoanTermChange(term.key)}
                        className="mr-2 w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-600"
                      />
                      <span className="text-blue-800 text-sm">{term.label}</span>
                    </label>
                  ))}
                  {showMoreLoanTerms && (
                    <>
                      {[
                        { key: "3yrARM", label: "3 yr ARM" },
                        { key: "5yrARM", label: "5 yr ARM" },
                        { key: "7yrARM", label: "7 yr ARM" },
                        { key: "10yrARM", label: "10 yr ARM" },
                      ].map((term) => (
                        <label key={term.key} className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={loanTerms[term.key as keyof typeof loanTerms]}
                            onChange={() => handleLoanTermChange(term.key)}
                            className="mr-2 w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-600"
                          />
                          <span className="text-blue-800 text-sm">{term.label}</span>
                        </label>
                      ))}
                    </>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setShowMoreLoanTerms(!showMoreLoanTerms)}
                  className="text-blue-600 text-xs mt-2 hover:underline font-medium"
                >
                  {showMoreLoanTerms ? "Show less" : "Show ARMs"}
                </button>
              </div>

              {/* Loan Programs */}
              <div>
                <h3 className="text-sm font-semibold text-blue-900 mb-3">Loan programs</h3>
                <div className="flex flex-col gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-sm text-blue-800">FHA loans</span>
                      <Info className="w-3.5 h-3.5 text-blue-500" />
                    </div>
                    <div className="flex">
                      <button
                        type="button"
                        onClick={() => setShowFHA("yes")}
                        className={`flex-1 px-3 py-1.5 text-xs border rounded-l font-medium transition-colors ${
                          showFHA === "yes"
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-background text-blue-900 border-blue-200 hover:bg-blue-50"
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowFHA("no")}
                        className={`flex-1 px-3 py-1.5 text-xs border border-l-0 rounded-r font-medium transition-colors ${
                          showFHA === "no"
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-background text-blue-900 border-blue-200 hover:bg-blue-50"
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-sm text-blue-800">VA loans</span>
                      <Info className="w-3.5 h-3.5 text-blue-500" />
                    </div>
                    <div className="flex">
                      <button
                        type="button"
                        onClick={() => setShowVA("yes")}
                        className={`flex-1 px-3 py-1.5 text-xs border rounded-l font-medium transition-colors ${
                          showVA === "yes"
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-background text-blue-900 border-blue-200 hover:bg-blue-50"
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowVA("no")}
                        className={`flex-1 px-3 py-1.5 text-xs border border-l-0 rounded-r font-medium transition-colors ${
                          showVA === "no"
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-background text-blue-900 border-blue-200 hover:bg-blue-50"
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                  {mortgageType === "refinance" && (
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-sm text-blue-800">Cash out</span>
                        <Info className="w-3.5 h-3.5 text-blue-500" />
                      </div>
                      <div className="flex">
                        <button
                          type="button"
                          onClick={() => setCashOut("yes")}
                          className={`flex-1 px-3 py-1.5 text-xs border rounded-l font-medium transition-colors ${
                            cashOut === "yes"
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-background text-blue-900 border-blue-200 hover:bg-blue-50"
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setCashOut("no")}
                          className={`flex-1 px-3 py-1.5 text-xs border border-l-0 rounded-r font-medium transition-colors ${
                            cashOut === "no"
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-background text-blue-900 border-blue-200 hover:bg-blue-50"
                          }`}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Property Details */}
              <div>
                <h3 className="text-sm font-semibold text-blue-900 mb-3">Property details</h3>
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="block text-xs text-blue-700 mb-1.5">Property type</label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors bg-background"
                    >
                      <option>Single-Family Home</option>
                      <option>Condominium</option>
                      <option>Townhouse</option>
                      <option>Multi-Family</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-blue-700 mb-1.5">Property use</label>
                    <select
                      value={propertyUse}
                      onChange={(e) => setPropertyUse(e.target.value as "primary" | "secondary" | "rental")}
                      className="w-full px-3 py-2 text-sm border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors bg-background"
                    >
                      <option value="primary">Primary residence</option>
                      <option value="secondary">Second home</option>
                      <option value="rental">Investment property</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Advanced */}
              <div>
                <h3 className="text-sm font-semibold text-blue-900 mb-3">Advanced</h3>
                <div className="flex flex-col gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs text-blue-700">Debt-to-income ratio</span>
                      <Info className="w-3.5 h-3.5 text-blue-500" />
                    </div>
                    <div className="flex">
                      <button
                        type="button"
                        onClick={() => setDtiRatio("less40")}
                        className={`flex-1 px-3 py-1.5 text-xs border rounded-l font-medium transition-colors ${
                          dtiRatio === "less40"
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-background text-blue-900 border-blue-200 hover:bg-blue-50"
                        }`}
                      >
                        {"<40%"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setDtiRatio("40plus")}
                        className={`flex-1 px-3 py-1.5 text-xs border border-l-0 rounded-r font-medium transition-colors ${
                          dtiRatio === "40plus"
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-background text-blue-900 border-blue-200 hover:bg-blue-50"
                        }`}
                      >
                        {"40%+"}
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs text-blue-700">Points</span>
                      <Info className="w-3.5 h-3.5 text-blue-500" />
                    </div>
                    <select
                      value={pointsFilter}
                      onChange={(e) => setPointsFilter(e.target.value as "all" | "0" | "0-1" | "1-2")}
                      className="w-full px-3 py-2 text-sm border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors bg-background"
                    >
                      <option value="all">All points</option>
                      <option value="0">0 points</option>
                      <option value="0-1">0-1 points</option>
                      <option value="1-2">1-2 points</option>
                    </select>
                  </div>
                  {!showMoreFilters && (
                    <button
                      type="button"
                      onClick={() => setShowMoreFilters(true)}
                      className="text-blue-600 text-xs hover:underline font-medium text-left"
                    >
                      More options...
                    </button>
                  )}
                  {showMoreFilters && (
                    <>
                      <div>
                        <label className="block text-xs text-blue-700 mb-1.5">First-time homebuyer</label>
                        <div className="flex">
                          <button
                            type="button"
                            className="flex-1 px-3 py-1.5 text-xs border rounded-l font-medium transition-colors bg-blue-600 text-white border-blue-600"
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            className="flex-1 px-3 py-1.5 text-xs border border-l-0 rounded-r font-medium transition-colors bg-background text-blue-900 border-blue-200 hover:bg-blue-50"
                          >
                            No
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowMoreFilters(false)}
                        className="text-blue-600 text-xs hover:underline font-medium text-left"
                      >
                        Show less
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
