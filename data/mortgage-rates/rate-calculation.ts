// Rate calculation utilities
import { LENDERS } from "./lenders"
import type {
  RateData,
  RateCalculationParams,
  LoanTermsState,
  CreditScoreRange,
  DTIRatio,
  PointsFilter,
  PropertyUse,
  MortgageType,
  LoanTerm,
} from "./types"

// Credit score adjustments to base rate
export const CREDIT_SCORE_ADJUSTMENTS: Record<CreditScoreRange, number> = {
  "780+": 0,
  "740-779": 0.125,
  "700-739": 0.25,
  "660-699": 0.375,
  "620-659": 0.5,
  "580-619": 0.75,
}

// Loan term configurations
export const LOAN_TERM_CONFIG: Record<LoanTerm, { label: string; years: number; isARM: boolean }> = {
  "30yr": { label: "30 year fixed", years: 30, isARM: false },
  "20yr": { label: "20 year fixed", years: 20, isARM: false },
  "15yr": { label: "15 year fixed", years: 15, isARM: false },
  "10yr": { label: "10 year fixed", years: 10, isARM: false },
  "3yrARM": { label: "3/1 ARM", years: 30, isARM: true },
  "5yrARM": { label: "5/1 ARM", years: 30, isARM: true },
  "7yrARM": { label: "7/1 ARM", years: 30, isARM: true },
  "10yrARM": { label: "10/1 ARM", years: 30, isARM: true },
}

// Parse dollar string to number
export function parseDollarAmount(value: string): number {
  return Number.parseFloat(value.replace(/[$,]/g, "")) || 0
}

// Format number to dollar string
export function formatDollarAmount(value: string | number | undefined, fallback = "0"): string {
  if (!value) return fallback
  const numValue = typeof value === "string" ? Number.parseFloat(value.replace(/[$,]/g, "")) : value
  return isNaN(numValue) ? fallback : numValue.toLocaleString("en-US")
}

// Calculate rates for all eligible lenders
export function calculateRates(params: RateCalculationParams): RateData[] {
  const {
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
  } = params

  // Get selected loan terms
  const selectedTerms = (Object.entries(loanTerms) as [LoanTerm, boolean][])
    .filter(([_, selected]) => selected)
    .map(([term]) => term)

  // Filter lenders by mortgage type and loan terms
  const availableLenders = LENDERS.filter((lender) => {
    const supportsType = lender.mortgageTypes.includes(mortgageType)
    const hasMatchingTerm = selectedTerms.some((term) => lender.specialties.includes(term))
    return supportsType && hasMatchingTerm
  })

  // Calculate base rate with adjustments
  let baseRate = 5.375

  // Credit score impact
  baseRate += CREDIT_SCORE_ADJUSTMENTS[creditScore] || 0

  // DTI impact
  if (dtiRatio === "40plus") {
    baseRate += 0.125
  }

  // Points filter impact
  if (pointsFilter === "0") {
    baseRate += 0.25
  } else if (pointsFilter === "1-2") {
    baseRate -= 0.125
  }

  // Property use impact
  if (propertyUse === "secondary") {
    baseRate += 0.125
  } else if (propertyUse === "rental") {
    baseRate += 0.375
  }

  // Cash out refinance impact
  if (mortgageType === "refinance" && cashOut === "yes") {
    baseRate += 0.25
  }

  // Calculate loan amount
  let loanAmount: number
  if (mortgageType === "purchase") {
    const price = parseDollarAmount(purchasePrice)
    const down = parseDollarAmount(downPayment)
    loanAmount = price - down
  } else {
    loanAmount = parseDollarAmount(loanBalance || "0")
  }

  // Determine the term label based on selected terms
  const primaryTerm = selectedTerms[0] || "30yr"
  const termConfig = LOAN_TERM_CONFIG[primaryTerm]
  const termLabel = termConfig.label
  const numPayments = termConfig.years * 12

  // Generate rates for each lender
  const data: RateData[] = availableLenders.map((lender, index) => {
    // Add slight variation per lender
    const lenderVariation = (index % 5) * 0.05 + (Math.random() * 0.1 - 0.05)
    const finalRate = Math.round((baseRate + lenderVariation) * 1000) / 1000

    // Determine points based on filter
    let points: number
    if (pointsFilter === "0") {
      points = 0
    } else if (pointsFilter === "0-1") {
      points = Math.round((0.5 + Math.random() * 0.5) * 1000) / 1000
    } else if (pointsFilter === "1-2") {
      points = Math.round((1 + Math.random()) * 1000) / 1000
    } else {
      points = Math.round((0.5 + Math.random() * 1.5) * 1000) / 1000
    }

    // Calculate APR (rate + points effect + fees)
    const apr = Math.round((finalRate + 0.15 + points * 0.05) * 1000) / 1000

    // Calculate monthly payment
    const monthlyRate = finalRate / 100 / 12
    const payment = Math.round(
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
    )

    // Calculate costs
    const pointsCost = Math.round(loanAmount * (points / 100))
    const originationFee = Math.round(loanAmount * 0.005 + Math.random() * 500)
    const underwritingFee = Math.round(500 + Math.random() * 400)
    const processingFee = Math.round(300 + Math.random() * 200)
    const totalUpfrontCosts = pointsCost + originationFee + underwritingFee + processingFee
    const upfrontCosts = Math.round(totalUpfrontCosts / 100) * 100

    // Calculate 8-year cost
    const yearCost = Math.round(payment * 96 + upfrontCosts)

    return {
      lender: lender.name,
      logo: lender.name,
      nmls: lender.nmls,
      rate: finalRate.toFixed(3),
      term: termLabel,
      apr: apr.toFixed(3),
      points: points.toFixed(3),
      payment: payment.toLocaleString(),
      upfront: `$ ${upfrontCosts.toLocaleString()}`,
      yearCost: `$${yearCost.toLocaleString()}`,
      rating: lender.rating,
      reviews: lender.reviews,
      phone: lender.phone,
      features: lender.features,
      // Modal specific data
      upfrontCosts: totalUpfrontCosts,
      eightYearCost: yearCost,
      pointsCost,
      originationFee,
      underwritingFee,
      processingFee,
      loanAmount,
      monthlyPayment: payment,
      paymentCount: numPayments,
    }
  })

  return data
}

// Sort rate data by various criteria
export function sortRateData(data: RateData[], sortBy: string): RateData[] {
  const sortedData = [...data]

  switch (sortBy) {
    case "Rate: Low to High":
      sortedData.sort((a, b) => Number.parseFloat(a.rate) - Number.parseFloat(b.rate))
      break
    case "Rate: High to Low":
      sortedData.sort((a, b) => Number.parseFloat(b.rate) - Number.parseFloat(a.rate))
      break
    case "8 Year Cost":
      sortedData.sort((a, b) => {
        const costA = Number.parseFloat(a.yearCost.replace(/[$,]/g, ""))
        const costB = Number.parseFloat(b.yearCost.replace(/[$,]/g, ""))
        return costA - costB
      })
      break
    case "Rating":
      sortedData.sort((a, b) => b.rating - a.rating)
      break
    case "Reviews":
      sortedData.sort((a, b) => b.reviews - a.reviews)
      break
    default:
      // Relevance - keep original order
      break
  }

  return sortedData
}
