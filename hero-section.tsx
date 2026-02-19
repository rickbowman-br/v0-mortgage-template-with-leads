"use client"

import { useRef } from "react"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

// Import extracted data and utilities
import { 
  getInitialRateData,
  calculateRates, 
  sortRateData,
} from "@/data/mortgage-rates"
import type { 
  RateData, 
  CreditScoreRange,
  DTIRatio,
  PointsFilter,
  PropertyUse,
} from "@/data/mortgage-rates"
import { LenderModal } from "@/components/mortgage-rates/lender-modal"
import { RateFilterBar } from "@/components/mortgage-rates/rate-filter-bar"
import { RateTableRow } from "@/components/mortgage-rates/rate-table-row"
import { PageHeader } from "@/components/mortgage-rates/page-header"
import { HeroContent } from "@/components/mortgage-rates/hero-content"
import { RateTableHeader } from "@/components/mortgage-rates/rate-table-header"
import { ArticleContent } from "@/components/mortgage-rates/article-content"
import { useFeedbackTrigger } from "@/components/fountain"
import type { FeedbackSurvey } from "@/components/fountain"

const ratePageFeedbackSurvey: FeedbackSurvey = {
  id: "rates-page-thumbs",
  name: "Rates Page Feedback",
  questions: [
    {
      id: "rates-helpful",
      type: "thumbs",
      question: "Are these rate comparisons helpful?",
      subtext: "Let us know if this page is meeting your needs.",
      required: true,
    },
    {
      id: "rates-improvement",
      type: "text",
      question: "How could we improve this experience?",
      subtext: "Optional - share any thoughts.",
      required: false,
    },
  ],
  trigger: { type: "scroll-depth", scrollDepth: 40, showOnce: true, cooldownDays: 7 },
  position: "bottom-right",
  followUp: { enabled: true, message: "Thanks! Your input helps us build better tools for homebuyers." },
}

export default function Component({
  initialMortgageType = "purchase",
}: { initialMortgageType?: "purchase" | "refinance" }) {
  const [activeSection, setActiveSection] = useState("national-mortgage-trends")
  const [displayedResults, setDisplayedResults] = useState(10)
  const [totalResults] = useState(25)

  useFeedbackTrigger({ survey: ratePageFeedbackSurvey, enabled: true })

  const [mortgageType, setMortgageType] = useState<"purchase" | "refinance">(initialMortgageType)
  const [zipCode, setZipCode] = useState("28277")
  const [purchasePrice, setPurchasePrice] = useState("$500,000")
  const [downPayment, setDownPayment] = useState("$100,000")
  const [downPaymentPercent, setDownPaymentPercent] = useState("20")
  const [creditScore, setCreditScore] = useState("780+")
  const [loanTerms, setLoanTerms] = useState({
    "30yr": true,
    "20yr": false,
    "15yr": false,
    "10yr": false,
    "3yrARM": false,
    "5yrARM": false,
    "7yrARM": false,
    "10yrARM": false,
  })

  const [showFHA, setShowFHA] = useState<"yes" | "no">("no") // Changed default from "yes" to "no"
  const [showVA, setShowVA] = useState<"yes" | "no">("no") // Changed default from "yes" to "no"

  const [propertyValue, setPropertyValue] = useState("$940,000")
  const [cashOut, setCashOut] = useState<"yes" | "no">("no")
  const [loanBalance, setLoanBalance] = useState("$564,000")


  const [showMoreLoanTerms, setShowMoreLoanTerms] = useState(false)
  const [dtiRatio, setDtiRatio] = useState<"less40" | "40plus">("less40")
  const [pointsFilter, setPointsFilter] = useState<"all" | "0" | "0-1" | "1-2">("all")
  const [propertyType, setPropertyType] = useState("Single-Family Home")
  const [propertyUse, setPropertyUse] = useState<"primary" | "secondary" | "rental">("primary")

  const [isLoadingRates, setIsLoadingRates] = useState(false)
  const [rateData, setRateData] = useState<RateData[]>(getInitialRateData())

  const [sortBy, setSortBy] = useState("Relevance")

  const [selectedLender, setSelectedLender] = useState<RateData | null>(null)
  const [leadFlowLender, setLeadFlowLender] = useState<RateData | null>(null)
  const router = useRouter()
  
  const [isAccordionOpen, setIsAccordionOpen] = useState(false); // Declare isAccordionOpen variable
  const [isFilterExpanded, setIsFilterExpanded] = useState(false); // Declare isFilterExpanded variable
  const [showBackToTop, setShowBackToTop] = useState(false); // Declare setShowBackToTop variable

  // Navigate to lead flow page with lender data
  const startLeadFlow = (lender: any) => {
    const params = new URLSearchParams({
      lender: lender.lender,
      nmls: lender.nmls || "",
      rate: lender.rate || "",
      term: lender.term || "",
      apr: lender.apr || "",
      points: lender.points || "",
      payment: lender.payment || "",
      zipCode: zipCode,
    })
    router.push(`/lead?${params.toString()}`)
  }

  const handlePurchasePriceChange = (value: string) => {
    setPurchasePrice(value)
    // Auto-calculate down payment based on current percentage
    const purchasePriceNum = Number.parseInt(value.replace(/[$,]/g, ""))
    const percentNum = Number.parseInt(downPaymentPercent)
    if (!isNaN(purchasePriceNum) && !isNaN(percentNum)) {
      const calculatedDownPayment = Math.round((purchasePriceNum * percentNum) / 100)
      setDownPayment(`$${calculatedDownPayment.toLocaleString()}`)
    }
  }

  const handleDownPaymentChange = (value: string) => {
    setDownPayment(value)
    // Auto-calculate percentage based on current purchase price
    const downPaymentNum = Number.parseInt(value.replace(/[$,]/g, ""))
    const purchasePriceNum = Number.parseInt(purchasePrice.replace(/[$,]/g, ""))
    if (!isNaN(downPaymentNum) && !isNaN(purchasePriceNum) && purchasePriceNum > 0) {
      const calculatedPercent = Math.round((downPaymentNum / purchasePriceNum) * 100)
      setDownPaymentPercent(calculatedPercent.toString())
    }
  }

  const handleDownPaymentPercentChange = (value: string) => {
    setDownPaymentPercent(value)
    // Auto-calculate down payment amount based on current purchase price
    const purchasePriceNum = Number.parseInt(purchasePrice.replace(/[$,]/g, ""))
    const percentNum = Number.parseInt(value)
    if (!isNaN(purchasePriceNum) && !isNaN(percentNum)) {
      const calculatedDownPayment = Math.round((purchasePriceNum * percentNum) / 100)
      setDownPayment(`$${calculatedDownPayment.toLocaleString()}`)
    }
  }

  const generateFilterSummary = () => {
    const parts = []

    // Property type and use
    const propertyTypeText = propertyType.toLowerCase()
    const propertyUseText = propertyUse === "primary" ? "" : ` ${propertyUse}`
    parts.push(`${propertyTypeText}${propertyUseText}`)

    // Loan terms
    const selectedTerms = Object.entries(loanTerms)
      .filter(([_, selected]) => selected)
      .map(([term]) => {
        switch (term) {
          case "30yr":
            return "30 year fixed"
          case "20yr":
            return "20 year fixed"
          case "15yr":
            return "15 year fixed"
          case "10yr":
            return "10 year fixed"
          case "3yrARM":
            return "3 year ARM"
          case "5yrARM":
            return "5 year ARM"
          case "7yrARM":
            return "7 year ARM"
          case "10yrARM":
            return "10 year ARM"
          default:
            return term
        }
      })

    if (selectedTerms.length > 0) {
      if (selectedTerms.length === 1) {
        parts.push(`${selectedTerms[0]} mortgages`)
      } else if (selectedTerms.length === 2) {
        parts.push(`${selectedTerms[0]} and ${selectedTerms[1]} mortgages`)
      } else {
        const lastTerm = selectedTerms.pop()
        parts.push(`${selectedTerms.join(", ")}, and ${lastTerm} mortgages`)
      }
    }

    // Points filter
    if (pointsFilter !== "all") {
      parts.push(`with ${pointsFilter} points`)
    } else {
      parts.push("with all points options")
    }

    // FHA/VA loans
    const loanTypes = []
    if (showFHA === "yes") loanTypes.push("FHA")
    if (showVA === "yes") loanTypes.push("VA")
    if (loanTypes.length > 0) {
      parts.push(`including ${loanTypes.join(" and ")} loans`)
    }

    // DTI ratio (only show if more filters are expanded)
    if (isFilterExpanded && dtiRatio === "40plus") {
      parts.push("for borrowers with DTI 40% and above")
    }

    return parts.join(", ")
  }

  // Generate rates using imported utility
  const generateRatesBasedOnFilters = useCallback(() => {
    return calculateRates({
      mortgageType,
      loanTerms,
      creditScore: creditScore as CreditScoreRange,
      dtiRatio: dtiRatio as DTIRatio,
      pointsFilter: pointsFilter as PointsFilter,
      propertyUse: propertyUse as PropertyUse,
      purchasePrice,
      downPayment,
      propertyValue,
      loanBalance,
      cashOut,
    })
  }, [
    mortgageType,
    loanTerms,
    creditScore,
    dtiRatio,
    pointsFilter,
    propertyUse,
    purchasePrice,
    downPayment,
    propertyValue,
    loanBalance,
    cashOut,
  ])

  // Sort rate data using imported utility
  const localSortRateData = useCallback((data: RateData[], sortOption: string) => {
    const sortMap: Record<string, string> = {
      "Rate (Low to High)": "Rate: Low to High",
      "Rate (High to Low)": "Rate: High to Low",
      "APR (Low to High)": "Rate: Low to High",
      "APR (High to Low)": "Rate: High to Low",
      "Payment (Low to High)": "8 Year Cost",
      "Payment (High to Low)": "8 Year Cost",
      "Relevance": "Relevance",
    }
    return sortRateData(data, sortMap[sortOption] || "Relevance")
  }, [])

  useEffect(() => {
    setIsLoadingRates(true)
    const timeoutId = setTimeout(() => {
      const newRates = generateRatesBasedOnFilters()
      const sortedRates = localSortRateData(newRates, sortBy)
      setRateData(sortedRates)
      setIsLoadingRates(false)
    }, 1500) // 1.5 second delay

    return () => clearTimeout(timeoutId)
  }, [generateRatesBasedOnFilters, sortBy, localSortRateData])

  useEffect(() => {
    if (sortBy !== "Relevance") {
      const sortedRates = localSortRateData(rateData, sortBy)
      setRateData(sortedRates)
    }
  }, [sortBy, localSortRateData, rateData])

  useEffect(() => {
    // When mortgage type changes, adjust available options
    if (mortgageType === "refinance") {
      // Refinance typically has fewer FHA/VA options
      if (Math.random() > 0.7) {
        setShowFHA("no")
        setShowVA("no")
      }
    }
  }, [mortgageType])

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "best-high-yield-savings-accounts",
        "recent-news",
        "how-to-choose",
        "what-to-know",
        "pros-and-cons",
        "alternatives",
        "faqs",
        "research-methodology",
        "national-mortgage-trends",
        "mortgage-news",
        "compare-rates",
        "rate-factors",
        "refinance-guide",
        "mortgage-faq",
      ]

      const scrollPosition = window.scrollY + 200
      const articleSection = document.querySelector("#article-content-section")

      if (articleSection) {
        const articleTop = articleSection.offsetTop
        setShowBackToTop(scrollPosition > articleTop + 100)
      }

      // Find active section based on scroll position
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i])
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    const articleSection = document.querySelector("#article-content-section")
    if (articleSection) {
      articleSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleLoanTermChange = (term: keyof typeof loanTerms) => {
    setLoanTerms((prev) => ({
      ...prev,
      [term]: !prev[term],
    }))
  }

  const handleShowMoreResults = () => {
    setDisplayedResults((prev) => Math.min(prev + 5, totalResults))
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <PageHeader />
      <HeroContent />

      {/* Rate Cards Section */}
      <section className="bg-white py-8">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar Component */}
          <RateFilterBar
            mortgageType={mortgageType}
            setMortgageType={setMortgageType}
            zipCode={zipCode}
            setZipCode={setZipCode}
            purchasePrice={purchasePrice}
            setPurchasePrice={setPurchasePrice}
            downPayment={downPayment}
            setDownPayment={setDownPayment}
            downPaymentPercent={downPaymentPercent}
            setDownPaymentPercent={setDownPaymentPercent}
            creditScore={creditScore}
            setCreditScore={setCreditScore}
            loanTerms={loanTerms}
            setLoanTerms={setLoanTerms}
            showFHA={showFHA}
            setShowFHA={setShowFHA}
            showVA={showVA}
            setShowVA={setShowVA}
            propertyValue={propertyValue}
            setPropertyValue={setPropertyValue}
            cashOut={cashOut}
            setCashOut={setCashOut}
            loanBalance={loanBalance}
            setLoanBalance={setLoanBalance}
            dtiRatio={dtiRatio}
            setDtiRatio={setDtiRatio}
            pointsFilter={pointsFilter}
            setPointsFilter={setPointsFilter}
            propertyType={propertyType}
            setPropertyType={setPropertyType}
            propertyUse={propertyUse}
            setPropertyUse={setPropertyUse}
            handlePurchasePriceChange={handlePurchasePriceChange}
            handleDownPaymentChange={handleDownPaymentChange}
            handleLoanTermChange={handleLoanTermChange}
          />

          <div className="flex flex-col gap-6">
            {/* Rate Table */}
            <div className="flex-1 min-w-0">
              <RateTableHeader
                filterSummary={generateFilterSummary()}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />

              {/* Rate Rows */}
              <div className="border-gray-200 border-0 relative">
                {isLoadingRates && (
                  <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                    <div className="flex items-center gap-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <span className="text-gray-600">Updating rates...</span>
                    </div>
                  </div>
                )}

                {rateData.slice(0, displayedResults).map((lender, index) => (
                  <RateTableRow
                    key={index}
                    lender={lender}
                    onSelectLender={setSelectedLender}
                    onStartLeadFlow={startLeadFlow}
                    mortgageType={mortgageType}
                    purchasePrice={purchasePrice}
                    downPayment={downPayment}
                    loanBalance={loanBalance}
                  />
                ))}
              </div>

              {/* Table Footer */}
              <div className="border-gray-200 rounded-b-lg px-4 sm:px-6 py-4 sm:py-4 border-0 bg-background">
                <div className="flex flex-col items-center gap-4">
                  {displayedResults < totalResults && (
                    <button
                      onClick={handleShowMoreResults}
                      className="border-2 border-[#0157ff] text-[#0157ff] px-8 py-3 rounded font-medium flex items-center gap-2 hover:bg-[#0157ff] hover:text-white transition-colors"
                    >
                      Show more results
                    </button>
                  )}
                  <p className="text-sm text-gray-600">
                    Showing {Math.min(displayedResults, rateData.length)} of {totalResults} results
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ArticleContent activeSection={activeSection} />

      {/* Lender Modal */}
      {selectedLender && (
        <LenderModal
          lender={selectedLender}
          onClose={() => setSelectedLender(null)}
          onStartLeadFlow={startLeadFlow}
        />
      )}

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-[#0157ff] text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Back to Top
        </button>
      )}
    </div>
  )
}
