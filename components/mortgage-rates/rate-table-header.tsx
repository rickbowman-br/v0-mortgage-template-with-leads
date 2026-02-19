"use client"

import { Info } from "lucide-react"

interface RateTableHeaderProps {
  filterSummary: string
  sortBy: string
  onSortChange: (value: string) => void
}

export function RateTableHeader({ filterSummary, sortBy, onSortChange }: RateTableHeaderProps) {
  return (
    <>
      {/* Results Summary Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between mb-4 sm:mb-6 gap-4 sm:gap-6">
        <div>
          <p className="text-gray-700 mb-1 text-xs sm:text-sm">
            <span className="font-semibold">Showing results for:</span> {filterSummary}.
          </p>
          <p className="text-xs sm:text-sm text-gray-600">
            The listings that appear on this page are from companies from which this website receives compensation.
          </p>
          <button className="text-blue-600 text-xs sm:text-sm hover:underline mt-1">Key terms explained</button>
        </div>
        {/* Hide sort dropdown on mobile, show on sm and up */}
        <div className="hidden sm:flex flex-col items-start gap-1">
          <span className="font-semibold text-black text-xs sm:text-sm">Sort by</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option>Relevance</option>
            <option>Rate (Low to High)</option>
            <option>Rate (High to Low)</option>
            <option>APR (Low to High)</option>
            <option>APR (High to Low)</option>
            <option>Payment (Low to High)</option>
            <option>Payment (High to Low)</option>
          </select>
        </div>
      </div>

      {/* Table Column Headers */}
      <div className="hidden md:block border-gray-200 rounded-t-lg px-6 py-4 bg-background border border-t-0 border-l-0 border-r-0 border-b">
        <div className="grid grid-cols-12 gap-4 items-center">
          <div className="col-span-3">
            <span className="text-sm font-semibold text-gray-900">Lender</span>
          </div>
          <div className="col-span-2 text-left">
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-gray-900">Rate</span>
              <div className="relative group">
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-white border border-gray-200 shadow-lg rounded py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                  <p className="text-xs text-gray-700">
                    The Rate is the amount you'll pay each year to borrow the money, expressed as a percentage.
                  </p>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-l-transparent border-r-transparent border-t-gray-200" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 text-left">
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-gray-900">APR</span>
              <div className="relative group">
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-white border border-gray-200 shadow-lg rounded py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                  <p className="text-xs text-gray-700">
                    APR takes the interest rate of the loan and adds it to certain fees paid by the borrower at closing,
                    including the upfront costs Bankrate displays on each offer. APR shows which loan is less expensive
                    over the full term of the loan.
                  </p>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-l-transparent border-r-transparent border-t-gray-200" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 text-left">
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-gray-900">Mo. payment</span>
              <div className="relative group">
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-white border border-gray-200 shadow-lg rounded py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                  <p className="text-xs text-gray-700">
                    The monthly payment shown includes both principal and interest payments. If your loan scenario
                    reflects a down payment of less than 20%, the monthly payment below also includes private mortgage
                    insurance (PMI). It does NOT include taxes and insurance.
                  </p>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-l-transparent border-r-transparent border-t-gray-200" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3 text-right">
            <span className="text-xs text-gray-600">
              as of {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
