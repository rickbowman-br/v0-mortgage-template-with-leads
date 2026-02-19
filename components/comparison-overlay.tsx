"use client"

import { useState, useRef, useMemo, type MouseEvent } from "react"
import { Info, TrendingDown } from "lucide-react"
import Link from "next/link"

export default function ComparisonOverlay() {
  const [selectedTimeline, setSelectedTimeline] = useState("6 M")
  const [selectedPurpose, setSelectedPurpose] = useState("purchase")
  const [selectedLoanType, setSelectedLoanType] = useState("30-year-fixed")
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const chartRef = useRef<SVGSVGElement>(null)

  const chartData = useMemo(() => {
    const now = new Date() // Use today's date dynamically instead of hardcoded date
    const data: Array<{ date: string; bankrate: number; national: number }> = []

    let dataPoints = 0
    let dayInterval = 1

    switch (selectedTimeline) {
      case "6 M":
        dataPoints = 26 // ~26 weeks
        dayInterval = 7
        break
      case "1 Y":
        dataPoints = 52 // 52 weeks
        dayInterval = 7
        break
      case "5 Y":
        dataPoints = 60 // 60 months
        dayInterval = 30
        break
      case "10 Y":
        dataPoints = 120 // 120 months
        dayInterval = 30
        break
      case "All":
        dataPoints = 240 // 20 years
        dayInterval = 30
        break
    }

    for (let i = 0; i < dataPoints; i++) {
      const date = new Date(now)
      date.setDate(date.getDate() - (dataPoints - i - 1) * dayInterval)

      // Generate realistic rate data with some variation
      const baseRate = 6.5
      const variation = Math.sin(i / 5) * 0.5 + Math.random() * 0.3
      const bankrate = baseRate + variation - 0.5
      const national = bankrate + 0.5 + Math.random() * 0.3

      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      const dateStr = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`

      data.push({
        date: dateStr,
        bankrate: Math.max(5.5, Math.min(7.5, bankrate)),
        national: Math.max(5.5, Math.min(7.5, national)),
      })
    }

    return data
  }, [selectedTimeline, selectedPurpose, selectedLoanType])

  const margin = { top: 20, right: 40, bottom: 50, left: 60 }
  const width = 900
  const height = 400
  const chartWidth = width - margin.left - margin.right
  const chartHeight = height - margin.top - margin.bottom

  const minRate = 5.5
  const maxRate = 7.5
  const yScale = (rate: number) => {
    return margin.top + ((maxRate - rate) / (maxRate - minRate)) * chartHeight
  }

  const xScale = (index: number) => {
    return margin.left + (index / (chartData.length - 1)) * chartWidth
  }

  const yTicks = [7.5, 7.0, 6.5, 6.0, 5.5]

  const getXAxisLabels = () => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640
    const numLabels = isMobile ? 3 : 5
    const step = Math.floor(chartData.length / (numLabels - 1))
    const labels: Array<{ index: number; label: string }> = []

    for (let i = 0; i < numLabels; i++) {
      const index = i === numLabels - 1 ? chartData.length - 1 : i * step
      const date = new Date(chartData[index].date)
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      const label = `${monthNames[date.getMonth()]} ${date.getFullYear()}`
      labels.push({ index, label })
    }

    return labels
  }

  const xAxisLabels = getXAxisLabels()

  const handleMouseMove = (e: MouseEvent<SVGSVGElement>) => {
    if (!chartRef.current) return

    const rect = chartRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const svgX = (x / rect.width) * width

    if (svgX < margin.left || svgX > width - margin.right) {
      setHoveredIndex(null)
      return
    }

    const relativeX = svgX - margin.left
    const index = Math.round((relativeX / chartWidth) * (chartData.length - 1))

    if (index >= 0 && index < chartData.length) {
      setHoveredIndex(index)
    }
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
  }

  const generatePoints = (dataKey: "bankrate" | "national") => {
    return chartData.map((point, i) => `${xScale(i)},${yScale(point[dataKey])}`).join(" ")
  }

  return (
    <div className="bg-gray-50 py-6 sm:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-10">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <p className="text-[#0157FF] text-xs sm:text-sm font-bold tracking-wider mb-2">COMPARE</p>
            <div className="flex items-start gap-2">
              <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 leading-tight">
                Top offers on Bankrate vs. national average interest rates
              </h2>
              <div className="relative group mt-0.5 sm:mt-1 flex-shrink-0">
                <Info className="w-4 h-4 sm:w-5 sm:h-5 text-[rgba(37,99,235,1)] cursor-help" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 mb-2 w-64 sm:w-80 max-w-[90vw] sm:max-w-[320px] bg-white border border-gray-200 shadow-lg rounded-lg py-3 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-normal">
                  <p className="text-sm text-gray-700">APRs not included</p>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 sm:left-auto sm:right-4 sm:translate-x-0 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-gray-200"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6 sm:gap-8 lg:gap-12">
            {/* Left Column - Controls */}
            <div className="space-y-3 sm:space-y-4">
              {/* Historical Timeline */}
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 sm:mb-3">Historical timeline</h3>
                <div className="grid grid-cols-5 gap-0">
                  {["6 M", "1 Y", "5 Y", "10 Y", "All"].map((period, index) => {
                    const isFirst = index === 0
                    const isLast = index === 4
                    return (
                      <button
                        key={period}
                        onClick={() => setSelectedTimeline(period)}
                        className={`px-2 sm:px-4 py-2 sm:py-3 border font-medium text-xs sm:text-sm transition-colors ${
                          isFirst ? "rounded-l" : ""
                        } ${isLast ? "rounded-r" : ""} ${!isFirst ? "border-l-0" : ""} ${
                          selectedTimeline === period
                            ? "bg-blue-100 text-blue-700 border-blue-300"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {period}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Loan Purpose */}
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 sm:mb-3">Loan purpose</h3>
                <div className="grid grid-cols-2 gap-0">
                  <button
                    onClick={() => setSelectedPurpose("purchase")}
                    className={`px-4 sm:px-6 py-2 sm:py-3 border rounded-l font-medium text-sm ${
                      selectedPurpose === "purchase"
                        ? "bg-blue-100 text-blue-700 border-blue-300"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    Purchase
                  </button>
                  <button
                    onClick={() => setSelectedPurpose("refinance")}
                    className={`px-4 sm:px-6 py-2 sm:py-3 border border-l-0 rounded-r font-medium text-sm ${
                      selectedPurpose === "refinance"
                        ? "bg-blue-100 text-blue-700 border-blue-300"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    Refinance
                  </button>
                </div>
              </div>

              {/* Loan Type */}
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 sm:mb-3">Loan type</h3>
                <select
                  value={selectedLoanType}
                  onChange={(e) => setSelectedLoanType(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded text-sm sm:text-base text-gray-900 font-medium focus:border-[#0157FF] focus:outline-none"
                >
                  <option value="30-year-fixed">30-Year Fixed</option>
                  <option value="15-year-fixed">15-Year Fixed</option>
                  <option value="5-1-arm">5/1 ARM</option>
                  <option value="7-1-arm">7/1 ARM</option>
                </select>
              </div>

              {/* How Rates Are Calculated Link */}
              <div>
                <a href="#" className="text-[#0157FF] text-xs sm:text-sm font-medium hover:underline">
                  How our rates are calculated
                </a>
              </div>

              {/* CTA Button */}
              <Link
                href="/rates?type=purchase"
                className="block w-full bg-[#0157FF] text-white px-4 sm:px-6 py-3 sm:py-4 rounded font-bold text-sm sm:text-base text-center hover:bg-blue-700 transition-colors"
              >
                See today's mortgage rates →
              </Link>
            </div>

            {/* Right Column - Chart */}
            <div>
              {/* Legend */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-4 lg:gap-6 mb-4 mr-0 sm:mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#0157FF] flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm text-gray-700">
                    Weekly top offers on Bankrate:{" "}
                    <span className="font-bold text-gray-900">
                      {chartData[chartData.length - 1].bankrate.toFixed(2)}%
                    </span>
                  </span>
                  <button className="text-gray-400 hover:text-gray-600 flex-shrink-0"></button>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#6B9FFF] flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm text-gray-700">
                    Weekly national average:{" "}
                    <span className="font-bold text-gray-900">
                      {chartData[chartData.length - 1].national.toFixed(2)}%
                    </span>
                  </span>
                </div>
              </div>

              <div className="relative border border-gray-200 rounded-lg bg-white p-3 sm:p-4 h-fit sm:h-min">
                <svg
                  ref={chartRef}
                  className="w-full h-fit"
                  viewBox={`0 0 ${width} ${height}`}
                  preserveAspectRatio="xMidYMid meet"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Y-axis */}
                  <line
                    x1={margin.left}
                    y1={margin.top}
                    x2={margin.left}
                    y2={height - margin.bottom}
                    stroke="#d1d5db"
                    strokeWidth="2"
                  />

                  {/* X-axis */}
                  <line
                    x1={margin.left}
                    y1={height - margin.bottom}
                    x2={width - margin.right}
                    y2={height - margin.bottom}
                    stroke="#d1d5db"
                    strokeWidth="2"
                  />

                  {/* Y-axis grid lines and labels */}
                  {yTicks.map((tick) => {
                    const y = yScale(tick)
                    return (
                      <g key={tick}>
                        <line
                          x1={margin.left}
                          y1={y}
                          x2={width - margin.right}
                          y2={y}
                          stroke="#e5e7eb"
                          strokeWidth="1"
                        />
                        <text
                          x={margin.left - 10}
                          y={y + 4}
                          textAnchor="end"
                          className="fill-gray-600 text-base sm:text-lg"
                        >
                          {tick.toFixed(2)}%
                        </text>
                      </g>
                    )
                  })}

                  {/* X-axis labels */}
                  {xAxisLabels.map(({ index, label }) => {
                    const x = xScale(index)
                    return (
                      <text
                        key={index}
                        x={x}
                        y={height - margin.bottom + 20}
                        textAnchor="middle"
                        className="fill-gray-600 text-sm sm:text-base"
                      >
                        {label}
                      </text>
                    )
                  })}

                  {/* National average line (light blue) */}
                  <polyline
                    points={generatePoints("national")}
                    fill="none"
                    stroke="#6B9FFF"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />

                  {/* Bankrate offers line (dark blue) */}
                  <polyline
                    points={generatePoints("bankrate")}
                    fill="none"
                    stroke="#0157FF"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />

                  {/* Hover elements */}
                  {hoveredIndex !== null &&
                    (() => {
                      const hoverX = xScale(hoveredIndex)
                      const bankrateY = yScale(chartData[hoveredIndex].bankrate)
                      const nationalY = yScale(chartData[hoveredIndex].national)

                      return (
                        <>
                          {/* Vertical hover line */}
                          <line
                            x1={hoverX}
                            y1={margin.top}
                            x2={hoverX}
                            y2={height - margin.bottom}
                            stroke="#9CA3AF"
                            strokeWidth="1.5"
                            strokeDasharray="4 4"
                          />

                          {/* Hover circles */}
                          <circle cx={hoverX} cy={nationalY} r="5" fill="#6B9FFF" stroke="white" strokeWidth="2" />
                          <circle cx={hoverX} cy={bankrateY} r="5" fill="#0157FF" stroke="white" strokeWidth="2" />

                          {/* Tooltip */}
                          <foreignObject
                            x={hoverX > width / 2 ? hoverX - 210 : hoverX + 15}
                            y={Math.min(bankrateY, nationalY) - 90}
                            width="200"
                            height="100"
                          >
                            <div className="bg-white border-2 border-gray-200 rounded-lg shadow-xl p-3">
                              <div className="font-bold text-gray-900 mb-2 text-xs">
                                {chartData[hoveredIndex].date.toUpperCase()}
                              </div>
                              <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-[#6B9FFF]"></div>
                                    <span className="text-xs text-gray-600">National avg</span>
                                  </div>
                                  <span className="font-bold text-sm text-gray-900">
                                    {chartData[hoveredIndex].national.toFixed(2)}%
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-[#0157FF]"></div>
                                    <span className="text-xs text-gray-600">Bankrate</span>
                                  </div>
                                  <span className="font-bold text-sm text-gray-900">
                                    {chartData[hoveredIndex].bankrate.toFixed(2)}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          </foreignObject>
                        </>
                      )
                    })()}
                </svg>
              </div>
            </div>
          </div>

          {/* Savings Callout */}
          <div className="mt-6 sm:mt-8 bg-blue-50 rounded-lg p-4 sm:p-6 flex gap-3 sm:gap-4 flex-row">
            <div className="flex-shrink-0 hidden sm:flex">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center">
                <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-[#0157FF]" />
              </div>
            </div>
            <div>
              <p className="text-sm sm:text-base text-gray-900 leading-relaxed">
                For the week of September 28th, top offers on Bankrate are{" "}
                <span className="font-bold">0.75% lower</span> than the national average. On a{" "}
                <span className="font-bold">$340,000 30-year loan</span>, this translates to{" "}
                <span className="font-bold">$1,963 in annual savings</span>.
              </p>
            </div>
          </div>

          {/* Body Text */}
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              For today,{" "}
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "2-digit",
                year: "numeric",
              })}
              , the current average 30-year fixed mortgage interest rate is 6.33%. If you're looking to refinance your
              current mortgage, today's current average 30-year fixed refinance interest rate is 6.59%. Meanwhile,
              today's average 15-year refinance interest rate is 5.91%. Whether you need a mortgage now or plan to get
              one in the next year or two, it's crucial to compare offers. Bankrate can connect you with current offers
              on various types of loans, often well below the national average. We display the lender's interest rate,
              APR (rate plus costs) and estimated monthly payment to help you more easily find the best mortgage for
              your needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
