// Lender data types for mortgage rate calculations

export interface BaseLender {
  name: string
  nmls: string
  logo?: string
  phone: string | null
  rating: number
  reviews: number
  specialties: LoanTerm[]
  mortgageTypes: MortgageType[]
  features: string[]
}

export interface RateData {
  lender: string
  logo: string
  nmls: string
  rate: string
  term: string
  apr: string
  points: string
  payment: string
  upfront: string
  yearCost: string
  rating: number
  reviews: number
  phone: string | null
  features: string[]
  // Modal specific data
  upfrontCosts?: number
  eightYearCost?: number
  pointsCost?: number
  originationFee?: number
  underwritingFee?: number
  processingFee?: number
  loanAmount?: number
  monthlyPayment?: number
  paymentCount?: number
}

export type MortgageType = "purchase" | "refinance"

export type LoanTerm = 
  | "30yr" 
  | "20yr" 
  | "15yr" 
  | "10yr" 
  | "3yrARM" 
  | "5yrARM" 
  | "7yrARM" 
  | "10yrARM"

export type CreditScoreRange = 
  | "780+" 
  | "740-779" 
  | "700-739" 
  | "660-699" 
  | "620-659" 
  | "580-619"

export type DTIRatio = "less40" | "40plus"

export type PointsFilter = "all" | "0" | "0-1" | "1-2"

export type PropertyUse = "primary" | "secondary" | "rental"

export interface LoanTermsState {
  "30yr": boolean
  "20yr": boolean
  "15yr": boolean
  "10yr": boolean
  "3yrARM": boolean
  "5yrARM": boolean
  "7yrARM": boolean
  "10yrARM": boolean
}

export interface RateCalculationParams {
  mortgageType: MortgageType
  loanTerms: LoanTermsState
  creditScore: CreditScoreRange
  dtiRatio: DTIRatio
  pointsFilter: PointsFilter
  propertyUse: PropertyUse
  purchasePrice: string
  downPayment: string
  // Refinance specific
  propertyValue?: string
  loanBalance?: string
  cashOut?: "yes" | "no"
}
