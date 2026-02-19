"use client"

import { useState, useEffect } from "react"
import { CheckCircle, TrendingDown, Clock, Shield, ChevronDown, ChevronUp, Phone, Mail, ExternalLink, FileText, Download, ZoomIn, ZoomOut, X, Award } from "lucide-react"
import type { StepProps, LeadFlowData } from "../types"

// Lender data with quote generation logic
const LENDER_DATA: Record<string, { name: string; nmls: string; logo?: string; color: string }> = {
  sage: {
    name: "Sage Home Loans",
    nmls: "3304",
    color: "bg-teal-600",
  },
  tomo: {
    name: "Tomo Mortgage",
    nmls: "2059741",
    color: "bg-coral-500",
  },
  "third-federal": {
    name: "Third Federal",
    nmls: "449401",
    color: "bg-blue-700",
  },
  quicken: {
    name: "Quicken Loans",
    nmls: "3030",
    color: "bg-red-600",
  },
  better: {
    name: "Better Mortgage",
    nmls: "330511",
    color: "bg-green-600",
  },
}

interface Quote {
  lenderId: string
  lenderName: string
  nmls: string
  color: string
  rate: number
  apr: number
  monthlyPayment: number
  points: number
  closingCosts: number
  term: number
  isLowest?: boolean
}

// Generate realistic quotes based on user data
function generateQuotes(data: LeadFlowData): Quote[] {
  const baseRate = 6.125 // Base rate
  const purchasePrice = data.purchasePrice || 540000
  const downPaymentPercent = data.downPayment === "less-than-20" ? 0.1 : data.downPayment === "20" ? 0.2 : 0.25
  const loanAmount = purchasePrice * (1 - downPaymentPercent)
  
  // Credit score adjustment
  let creditAdjustment = 0
  switch (data.creditScore) {
    case "780+": creditAdjustment = -0.25; break
    case "760-779": creditAdjustment = -0.125; break
    case "740-759": creditAdjustment = 0; break
    case "720-739": creditAdjustment = 0.125; break
    case "700-719": creditAdjustment = 0.25; break
    case "680-699": creditAdjustment = 0.375; break
    case "660-679": creditAdjustment = 0.5; break
    case "640-659": creditAdjustment = 0.75; break
    case "620-639": creditAdjustment = 1.0; break
    case "580-619": creditAdjustment = 1.5; break
    default: creditAdjustment = 0.25
  }

  // Generate quotes for selected lenders
  const lenderIds = ["sage", ...data.additionalLenders]
  const quotes: Quote[] = lenderIds.map((lenderId, index) => {
    const lender = LENDER_DATA[lenderId] || LENDER_DATA.sage
    
    // Each lender has slight variation
    const lenderVariation = (Math.random() * 0.25 - 0.125) + (index * 0.05)
    const rate = Math.round((baseRate + creditAdjustment + lenderVariation) * 1000) / 1000
    const points = Math.round((Math.random() * 1.5) * 100) / 100
    const apr = Math.round((rate + 0.15 + points * 0.05) * 1000) / 1000
    
    // Calculate monthly payment (30-year fixed)
    const monthlyRate = rate / 100 / 12
    const numPayments = 360
    const monthlyPayment = Math.round(
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1)
    )
    
    const closingCosts = Math.round(loanAmount * (0.02 + Math.random() * 0.01))

    return {
      lenderId,
      lenderName: lender.name,
      nmls: lender.nmls,
      color: lender.color,
      rate,
      apr,
      monthlyPayment,
      points,
      closingCosts,
      term: 30,
    }
  })

  // Sort by rate and mark lowest
  quotes.sort((a, b) => a.rate - b.rate)
  if (quotes.length > 0) {
    quotes[0].isLowest = true
  }

  return quotes
}

function QuoteCard({ quote, isExpanded, onToggle, data }: { quote: Quote; isExpanded: boolean; onToggle: () => void; data: LeadFlowData }) {
  const purchasePrice = data.purchasePrice || 540000
  const downPaymentPercent = data.downPayment === "less-than-20" ? 0.1 : data.downPayment === "20" ? 0.2 : 0.25
  const loanAmount = purchasePrice * (1 - downPaymentPercent)

  return (
    <div className={`bg-white rounded-xl border-2 overflow-hidden transition-all ${quote.isLowest ? "border-teal-500 shadow-lg" : "border-gray-200"}`}>
      {quote.isLowest && (
        <div className="bg-teal-500 text-white text-center py-1.5 text-sm font-medium flex items-center justify-center gap-1.5">
          <TrendingDown className="w-4 h-4" />
          Lowest Rate
        </div>
      )}
      
      <div className="p-4 sm:p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${quote.color} flex items-center justify-center text-white font-bold text-lg`}>
              {quote.lenderName.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-blue-900">{quote.lenderName}</h3>
              <p className="text-xs text-gray-500">NMLS #{quote.nmls}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl sm:text-3xl font-bold text-blue-900">{quote.rate.toFixed(3)}%</div>
            <div className="text-xs text-gray-500">{quote.apr.toFixed(3)}% APR</div>
          </div>
        </div>

        {/* Key Details */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="text-xs text-gray-500 mb-1">Monthly</div>
            <div className="font-bold text-blue-900">${quote.monthlyPayment.toLocaleString()}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="text-xs text-gray-500 mb-1">Points</div>
            <div className="font-bold text-blue-900">{quote.points.toFixed(2)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="text-xs text-gray-500 mb-1">Term</div>
            <div className="font-bold text-blue-900">{quote.term} yr</div>
          </div>
        </div>

        {/* Expandable Details */}
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium py-2"
        >
          {isExpanded ? "Hide details" : "View full details"}
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Loan Amount</span>
              <span className="font-medium text-blue-900">${loanAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Estimated Closing Costs</span>
              <span className="font-medium text-blue-900">${quote.closingCosts.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Points Cost</span>
              <span className="font-medium text-blue-900">${Math.round(loanAmount * quote.points / 100).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Interest (30 yr)</span>
              <span className="font-medium text-blue-900">${((quote.monthlyPayment * 360) - loanAmount).toLocaleString()}</span>
            </div>
            
            {/* Contact Actions */}
            <div className="pt-3 flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                <Phone className="w-4 h-4" />
                Call Lender
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 py-2.5 rounded-lg font-medium hover:bg-blue-50 transition-colors text-sm">
                <ExternalLink className="w-4 h-4" />
                Apply Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Pre-qualification Letter PDF Viewer Component
function PreQualLetterViewer({ 
  data, 
  isOpen, 
  onClose 
}: { 
  data: LeadFlowData
  isOpen: boolean
  onClose: () => void 
}) {
  const [zoom, setZoom] = useState(100)
  
  const purchasePrice = data.purchasePrice || 540000
  const downPaymentPercent = data.downPayment === "less-than-20" ? 0.1 : data.downPayment === "20" ? 0.2 : 0.25
  const loanAmount = purchasePrice * (1 - downPaymentPercent)
  const today = new Date()
  const expiryDate = new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000)
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* PDF Viewer Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-100 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-gray-900">Pre-Qualification Letter.pdf</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setZoom(Math.max(50, zoom - 25))}
              className="p-1.5 rounded hover:bg-gray-200 text-gray-600"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-sm text-gray-600 min-w-[50px] text-center">{zoom}%</span>
            <button 
              onClick={() => setZoom(Math.min(150, zoom + 25))}
              className="p-1.5 rounded hover:bg-gray-200 text-gray-600"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <div className="w-px h-6 bg-gray-300 mx-2" />
            <button 
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 rounded hover:bg-gray-200 text-gray-600 ml-2"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Document Preview */}
        <div className="flex-1 overflow-auto bg-gray-200 p-6">
          <div 
            className="bg-white shadow-lg mx-auto transition-transform origin-top"
            style={{ 
              width: '8.5in', 
              minHeight: '11in', 
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top center'
            }}
          >
            {/* Letter Content */}
            <div className="p-12 font-serif text-gray-800" style={{ fontSize: '11pt', lineHeight: '1.6' }}>
              {/* Letterhead */}
              <div className="flex items-start justify-between mb-8 pb-6 border-b-2 border-blue-600">
                <div>
                  <div className="text-2xl font-bold text-blue-900 tracking-tight" style={{ fontFamily: 'sans-serif' }}>
                    BANKRATE
                  </div>
                  <div className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'sans-serif' }}>
                    NMLS #1427381
                  </div>
                </div>
                <div className="text-right text-xs text-gray-600" style={{ fontFamily: 'sans-serif' }}>
                  <div>1675 Broadway, Suite 800</div>
                  <div>New York, NY 10019</div>
                  <div>www.bankrate.com</div>
                </div>
              </div>

              {/* Date */}
              <div className="mb-8">
                <div className="text-sm text-gray-600">{formatDate(today)}</div>
              </div>

              {/* Recipient */}
              <div className="mb-6">
                <div className="font-semibold">{data.firstName} {data.lastName}</div>
                <div>{data.email}</div>
              </div>

              {/* Subject Line */}
              <div className="mb-6">
                <div className="font-bold text-lg text-blue-900" style={{ fontFamily: 'sans-serif' }}>
                  RE: Mortgage Pre-Qualification Letter
                </div>
              </div>

              {/* Greeting */}
              <p className="mb-4">Dear {data.firstName} {data.lastName},</p>

              {/* Body */}
              <p className="mb-4">
                Congratulations! Based on our review of the information you provided and a soft credit inquiry, 
                we are pleased to inform you that you have been <strong>pre-qualified</strong> for a mortgage 
                loan with the following terms:
              </p>

              {/* Qualification Details Box */}
              <div className="my-6 p-5 bg-blue-50 border border-blue-200 rounded-lg" style={{ fontFamily: 'sans-serif' }}>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600 text-xs uppercase tracking-wider mb-1">Maximum Purchase Price</div>
                    <div className="font-bold text-blue-900 text-lg">${purchasePrice.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 text-xs uppercase tracking-wider mb-1">Pre-Qualified Loan Amount</div>
                    <div className="font-bold text-blue-900 text-lg">${loanAmount.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 text-xs uppercase tracking-wider mb-1">Credit Score Range</div>
                    <div className="font-bold text-teal-700">{data.verifiedCreditScore || data.creditScore}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 text-xs uppercase tracking-wider mb-1">Loan Type</div>
                    <div className="font-bold text-blue-900">30-Year Fixed Conventional</div>
                  </div>
                </div>
              </div>

              <p className="mb-4">
                This pre-qualification is based on the information you provided regarding your income, assets, 
                and credit history. This letter is not a commitment to lend and is subject to verification of 
                all information, property appraisal, and final underwriting approval.
              </p>

              <p className="mb-4">
                <strong>This pre-qualification letter is valid for 90 days</strong> from the date of issuance 
                and will expire on <strong>{formatDate(expiryDate)}</strong>.
              </p>

              <p className="mb-4">
                To proceed with a formal mortgage application, please contact one of our approved lender 
                partners or visit bankrate.com to compare personalized rate offers.
              </p>

              {/* Signature */}
              <div className="mt-10">
                <p className="mb-6">Sincerely,</p>
                <div className="mb-1 italic text-blue-800" style={{ fontFamily: 'cursive', fontSize: '18pt' }}>
                  Bankrate Mortgage Services
                </div>
                <div className="text-sm" style={{ fontFamily: 'sans-serif' }}>
                  <div className="font-semibold">Bankrate Mortgage Services</div>
                  <div className="text-gray-600">Pre-Qualification Department</div>
                </div>
              </div>

              {/* Footer Disclaimer */}
              <div className="mt-12 pt-6 border-t border-gray-300 text-xs text-gray-500" style={{ fontFamily: 'sans-serif' }}>
                <p className="mb-2">
                  <strong>IMPORTANT NOTICE:</strong> This is a pre-qualification letter, not a loan commitment. 
                  Final loan approval is subject to satisfactory completion of the loan application process, 
                  including verification of income, assets, employment, and property appraisal.
                </p>
                <p>
                  Bankrate, LLC NMLS #1427381 | Equal Housing Lender | 
                  &copy; {today.getFullYear()} Bankrate, LLC. All rights reserved.
                </p>
              </div>

              {/* Verification Badge */}
              <div className="mt-6 flex items-center justify-center">
                <div className="flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-200 rounded-lg">
                  <Shield className="w-5 h-5 text-teal-600" />
                  <span className="text-sm font-medium text-teal-800" style={{ fontFamily: 'sans-serif' }}>
                    Verified via Soft Credit Check - No impact to credit score
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Calculation visualization data
const CALCULATION_FACTORS = [
  { label: "Credit Score Impact", icon: "credit" },
  { label: "Loan-to-Value Ratio", icon: "ltv" },
  { label: "Debt-to-Income", icon: "dti" },
  { label: "Property Type Adj.", icon: "property" },
  { label: "Lock Period Options", icon: "lock" },
  { label: "Points vs Rate", icon: "points" },
  { label: "PMI Calculations", icon: "pmi" },
  { label: "Closing Cost Est.", icon: "closing" },
]

const RATE_COMBINATIONS = [
  "5.875% / 0.5 pts",
  "6.000% / 0.25 pts", 
  "6.125% / 0 pts",
  "5.750% / 1.0 pts",
  "6.250% / -0.25 pts",
  "5.625% / 1.5 pts",
  "6.375% / -0.5 pts",
  "5.500% / 2.0 pts",
]

function CalculationVisualizer({ 
  phase, 
  currentFactor, 
  currentRate,
  combinationsAnalyzed,
  lenderName 
}: { 
  phase: number
  currentFactor: number
  currentRate: string
  combinationsAnalyzed: number
  lenderName: string
}) {
  return (
    <div className="bg-blue-900 rounded-xl p-4 sm:p-6 text-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-xs font-medium text-blue-200 uppercase tracking-wider">Live Calculation</span>
        </div>
        <span className="text-xs text-blue-300 font-mono">{combinationsAnalyzed.toLocaleString()} combinations</span>
      </div>

      {/* Current Lender */}
      <div className="text-center mb-4">
        <span className="text-blue-300 text-sm">Analyzing rates from</span>
        <div className="text-lg font-bold text-white">{lenderName}</div>
      </div>

      {/* Rate Display - Slot Machine Style */}
      <div className="bg-blue-950 rounded-lg p-4 mb-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-transparent to-blue-950 z-10 pointer-events-none" />
        <div className="text-center">
          <div className="text-xs text-blue-400 mb-1">Testing Rate Combination</div>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-teal-400 animate-pulse">
            {currentRate}
          </div>
        </div>
      </div>

      {/* Calculation Factors Grid */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {CALCULATION_FACTORS.map((factor, index) => (
          <div 
            key={factor.label}
            className={`rounded-lg p-2 text-center transition-all duration-300 ${
              index < currentFactor 
                ? "bg-teal-500/20 border border-teal-500/50" 
                : index === currentFactor 
                  ? "bg-blue-600 border border-blue-400 animate-pulse" 
                  : "bg-blue-800/50 border border-blue-700/50"
            }`}
          >
            <div className={`text-lg mb-1 ${index <= currentFactor ? "opacity-100" : "opacity-40"}`}>
              {index < currentFactor ? (
                <CheckCircle className="w-4 h-4 mx-auto text-teal-400" />
              ) : index === currentFactor ? (
                <div className="w-4 h-4 mx-auto border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <div className="w-4 h-4 mx-auto rounded-full border border-blue-500" />
              )}
            </div>
            <div className={`text-[9px] sm:text-[10px] leading-tight ${index <= currentFactor ? "text-blue-100" : "text-blue-400"}`}>
              {factor.label}
            </div>
          </div>
        ))}
      </div>

      {/* Data Streams Animation */}
      <div className="relative h-12 overflow-hidden rounded-lg bg-blue-950">
        <div className="absolute inset-0 flex items-center">
          {[...Array(3)].map((_, rowIndex) => (
            <div 
              key={rowIndex}
              className="absolute whitespace-nowrap font-mono text-[10px] text-blue-500/60 animate-marquee"
              style={{ 
                animationDuration: `${8 + rowIndex * 2}s`,
                top: `${rowIndex * 16 + 4}px`,
                animationDelay: `${rowIndex * -2}s`
              }}
            >
              {[...Array(20)].map((_, i) => (
                <span key={i} className="mx-2">
                  {(Math.random() * 2 + 5).toFixed(3)}% | ${Math.floor(Math.random() * 1000 + 2000)} | {Math.floor(Math.random() * 30 + 10)}yr
                </span>
              ))}
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-transparent to-blue-950" />
      </div>
    </div>
  )
}

export function ConfirmationStep({ data, onClose }: StepProps & { onClose: () => void }) {
  const [isLoading, setIsLoading] = useState(true)
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [expandedQuote, setExpandedQuote] = useState<string | null>(null)
  const [loadingPhase, setLoadingPhase] = useState(0) // 0: init, 1: calculating, 2: finalizing
  const [currentFactor, setCurrentFactor] = useState(0)
  const [currentRate, setCurrentRate] = useState(RATE_COMBINATIONS[0])
  const [combinationsAnalyzed, setCombinationsAnalyzed] = useState(0)
  const [currentLenderIndex, setCurrentLenderIndex] = useState(0)
  const [showPreQualLetter, setShowPreQualLetter] = useState(false)
  
  const isPreQualified = data.softCreditCheckCompleted === true

  const lenderIds = ["sage", ...(data.additionalLenders || [])]
  const selectedLenderCount = lenderIds.length

  useEffect(() => {
    // Phase 1: Initial verification (0.5s)
    const phase1Timer = setTimeout(() => setLoadingPhase(1), 500)

    // Cycle through calculation factors
    const factorInterval = setInterval(() => {
      setCurrentFactor((prev) => (prev + 1) % CALCULATION_FACTORS.length)
    }, 400)

    // Cycle through rate combinations rapidly
    const rateInterval = setInterval(() => {
      setCurrentRate(RATE_COMBINATIONS[Math.floor(Math.random() * RATE_COMBINATIONS.length)])
    }, 150)

    // Increment combinations counter
    const combinationsInterval = setInterval(() => {
      setCombinationsAnalyzed((prev) => prev + Math.floor(Math.random() * 50 + 20))
    }, 100)

    // Cycle through lenders
    const lenderInterval = setInterval(() => {
      setCurrentLenderIndex((prev) => (prev + 1) % selectedLenderCount)
    }, 1500)

    // Phase 2: Finalizing (at 4s)
    const phase2Timer = setTimeout(() => setLoadingPhase(2), 4000)

    // Complete loading (at 5s)
    const completeTimer = setTimeout(() => {
      setQuotes(generateQuotes(data))
      setIsLoading(false)
    }, 5000)

    return () => {
      clearTimeout(phase1Timer)
      clearTimeout(phase2Timer)
      clearTimeout(completeTimer)
      clearInterval(factorInterval)
      clearInterval(rateInterval)
      clearInterval(combinationsInterval)
      clearInterval(lenderInterval)
    }
  }, [data, selectedLenderCount])

  const currentLender = LENDER_DATA[lenderIds[currentLenderIndex]] || LENDER_DATA.sage

  if (isLoading) {
    return (
      <div className="w-full max-w-xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
          {/* Header */}
          <div className="p-6 sm:p-8 text-center border-b border-blue-100">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4 relative">
              <Shield className="w-8 h-8 text-blue-600" />
              <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-2">
              {loadingPhase === 0 && "Initializing Quote Engine..."}
              {loadingPhase === 1 && "Crunching the Numbers..."}
              {loadingPhase === 2 && "Finalizing Your Best Rates..."}
            </h2>
            <p className="text-blue-600">
              Analyzing {selectedLenderCount} lender{selectedLenderCount > 1 ? "s" : ""} to find your best rates
            </p>
          </div>

          {/* Calculation Visualizer */}
          <div className="p-4 sm:p-6">
            <CalculationVisualizer 
              phase={loadingPhase}
              currentFactor={currentFactor}
              currentRate={currentRate}
              combinationsAnalyzed={combinationsAnalyzed}
              lenderName={currentLender.name}
            />
          </div>

          {/* Progress Steps */}
          <div className="px-6 sm:px-8 pb-6 sm:pb-8">
            <div className="flex items-center justify-between mb-3">
              {lenderIds.map((id, index) => {
                const lender = LENDER_DATA[id] || LENDER_DATA.sage
                const isComplete = index < currentLenderIndex || loadingPhase === 2
                const isCurrent = index === currentLenderIndex && loadingPhase !== 2
                return (
                  <div key={id} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      isComplete 
                        ? "bg-teal-500 text-white" 
                        : isCurrent 
                          ? `${lender.color} text-white animate-pulse`
                          : "bg-gray-200 text-gray-400"
                    }`}>
                      {isComplete ? <CheckCircle className="w-5 h-5" /> : lender.name.charAt(0)}
                    </div>
                    <span className={`text-[10px] mt-1 text-center max-w-[60px] truncate ${
                      isComplete || isCurrent ? "text-blue-900 font-medium" : "text-gray-400"
                    }`}>
                      {lender.name.split(" ")[0]}
                    </span>
                  </div>
                )
              })}
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-gradient-to-r from-blue-600 to-teal-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${loadingPhase === 2 ? 100 : (currentLenderIndex / selectedLenderCount) * 80 + 10}%` }}
              />
            </div>
          </div>
        </div>

        {/* Add marquee animation style */}
        <style jsx>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee linear infinite;
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Pre-Qualification Letter Viewer Modal */}
      <PreQualLetterViewer 
        data={data} 
        isOpen={showPreQualLetter} 
        onClose={() => setShowPreQualLetter(false)} 
      />

      {/* Success Header - Different for Pre-Qualified Users */}
      <div className="text-center mb-6">
        {isPreQualified ? (
          <>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 mb-4 shadow-lg">
              <Award className="w-10 h-10 text-white" />
            </div>
            <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
              <Shield className="w-4 h-4" />
              Pre-Qualified
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-2">
              Congratulations, {data.firstName}! You're Pre-Qualified!
            </h2>
            <p className="text-blue-700">
              Your verified credit score unlocked exclusive rates from our lender partners
            </p>
          </>
        ) : (
          <>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 mb-4">
              <CheckCircle className="w-10 h-10 text-teal-500" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-2">
              Your Personalized Quotes Are Ready!
            </h2>
            <p className="text-blue-700">
              Based on your profile, here are live rates from your selected lenders
            </p>
          </>
        )}
      </div>

      {/* Pre-Qualification Letter Card - Only for Pre-Qualified Users */}
      {isPreQualified && (
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border-2 border-teal-200 p-5 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-14 bg-white rounded-lg shadow-md border border-gray-200 flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-blue-900 mb-1">Your Pre-Qualification Letter is Ready</h3>
              <p className="text-sm text-blue-700 mb-3">
                Show this letter to sellers and real estate agents to demonstrate your buying power. Valid for 90 days.
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setShowPreQualLetter(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  View Letter
                </button>
                <button
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-blue-300 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loan Summary Banner */}
      <div className="bg-blue-50 rounded-xl p-4 mb-6 flex flex-wrap gap-4 justify-center text-sm">
        <div className="flex items-center gap-2">
          <span className="text-blue-600">Purchase Price:</span>
          <span className="font-bold text-blue-900">${(data.purchasePrice || 540000).toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-600">Credit Score:</span>
          <span className="font-bold text-blue-900">{data.verifiedCreditScore || data.creditScore || "N/A"}</span>
          {data.softCreditCheckCompleted && (
            <span className="bg-teal-100 text-teal-700 text-xs px-2 py-0.5 rounded-full font-medium">Verified</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-600">Down Payment:</span>
          <span className="font-bold text-blue-900">
            {data.downPayment === "less-than-20" ? "<20%" : data.downPayment === "20" ? "20%" : ">20%"}
          </span>
        </div>
      </div>

      {/* Quote Cards */}
      <div className="space-y-4 mb-6">
        {quotes.map((quote) => (
          <QuoteCard
            key={quote.lenderId}
            quote={quote}
            isExpanded={expandedQuote === quote.lenderId}
            onToggle={() => setExpandedQuote(expandedQuote === quote.lenderId ? null : quote.lenderId)}
            data={data}
          />
        ))}
      </div>

      {/* Disclaimer */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6 text-xs text-gray-600">
        <div className="flex items-start gap-2">
          <Clock className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
          <p>
            These rates are personalized estimates based on the information you provided. 
            Final rates may vary based on full application review and market conditions. 
            Rates shown are for a 30-year fixed mortgage. A lender will contact you shortly to confirm your quote.
          </p>
        </div>
      </div>

      {/* What's Next - Different for Pre-Qualified Users */}
      <div className="bg-white rounded-xl border border-blue-100 p-5 mb-6">
        <h3 className="font-bold text-blue-900 mb-3">
          {isPreQualified ? "Your fast track to homeownership" : "What happens next?"}
        </h3>
        <ul className="space-y-2 text-sm text-blue-800">
          {isPreQualified ? (
            <>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-xs">1</span>
                <span><strong>Share your letter</strong> with real estate agents to strengthen your offers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-xs">2</span>
                <span>Lenders will reach out with <strong>priority service</strong> within 24 hours</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-xs">3</span>
                <span>Your pre-qualification <strong>speeds up final approval</strong> by up to 7 days</span>
              </li>
            </>
          ) : (
            <>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-xs">1</span>
                <span>Your selected lenders will reach out within 1 business day</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-xs">2</span>
                <span>Compare final offers and lock in your preferred rate</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-xs">3</span>
                <span>Complete your application with your chosen lender</span>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Contact Confirmation - Different for Pre-Qualified Users */}
      <div className={`rounded-xl p-5 mb-6 ${isPreQualified ? "bg-gradient-to-r from-teal-600 to-blue-600" : "bg-blue-600"} text-white`}>
        <div className="flex items-center gap-3 mb-3">
          <Mail className="w-5 h-5" />
          <span className="font-medium">
            {isPreQualified ? "Documents sent to " : "Confirmation sent to "}{data.email}
          </span>
        </div>
        <p className="text-white/90 text-sm">
          {isPreQualified 
            ? "We've emailed your pre-qualification letter and rate quotes. Your letter is also available to download above."
            : `We've emailed a copy of your quotes to ${data.email}. Save this for your records.`
          }
        </p>
      </div>

      {/* Done Button */}
      <button
        type="button"
        onClick={onClose}
        className="w-full py-4 rounded-lg font-bold text-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
      >
        Done
      </button>
    </div>
  )
}
