// Types for the lead flow multi-step form

export interface LenderInfo {
  lender: string
  nmls: string
  rate: string
  term: string
  apr: string
  points: string
  payment: string
}

export type PropertyType = "single-family" | "townhome" | "condo" | "multi-family" | null
export type PropertyUse = "primary" | "second-home" | "investment" | null
export type BuyingStage = "offer-accepted" | "making-offers" | "open-houses" | "researching" | null
export type DownPayment = "less-than-20" | "20" | "more-than-20" | null
export type CreditScore = "780+" | "760-779" | "740-759" | "720-739" | "700-719" | "680-699" | "660-679" | "640-659" | "620-639" | "580-619" | null
export type EmploymentStatus = "employed" | "not-employed" | "self-employed" | "military" | "retired" | "other" | null

export interface AdditionalLender {
  id: string
  name: string
  logo?: string
  nmls: string
  stateLic?: string
  rating: number
  reviewCount: number
}

export interface LeadFlowData {
  zipCode: string
  loanType: "purchase" | "refinance" | null
  lenderName: string
  propertyType: PropertyType
  propertyUse: PropertyUse
  firstTimeBuyer: boolean | null
  buyingStage: BuyingStage
  purchasePrice: number | null
  downPayment: DownPayment
  creditScore: CreditScore
  militaryStatus: boolean | null
  employmentStatus: EmploymentStatus
  bankruptcyHistory: boolean | null
  annualIncome: number | null
  additionalLenders: string[] // IDs of selected additional lenders
  // Soft credit check / pre-qualification
  softCreditCheckCompleted: boolean | null
  verifiedCreditScore: CreditScore | null
  // Credit report data (from soft pull)
  totalMonthlyDebt: number | null // Monthly debt obligations
  latePayments24Months: number | null // Count of late payments in last 24 months
  oldestAccountAge: number | null // Years
  // Contact info
  firstName: string
  lastName: string
  email: string
  phone: string
  joinWaitlist: boolean
  // Bankrate Insiders - phone protection
  bankrateInsiders: boolean
}

export interface StepProps {
  data: LeadFlowData
  updateData: (updates: Partial<LeadFlowData>) => void
  onNext: () => void
  onBack: () => void
}

export const TOTAL_STEPS = 25

export const initialLeadFlowData: LeadFlowData = {
  // Prefilled for demo purposes
  zipCode: "90210",
  loanType: "purchase",
  lenderName: "Sage",
  propertyType: "single-family",
  propertyUse: "primary",
  firstTimeBuyer: true,
  buyingStage: "making-offers",
  purchasePrice: 540000,
  downPayment: "20",
  creditScore: "740-759",
  militaryStatus: false,
  employmentStatus: "employed",
  bankruptcyHistory: false,
  annualIncome: 125000,
  additionalLenders: [],
  softCreditCheckCompleted: null,
  verifiedCreditScore: null,
  totalMonthlyDebt: null,
  latePayments24Months: null,
  oldestAccountAge: null,
  firstName: "Alex",
  lastName: "Johnson",
  email: "alex.johnson@example.com",
  phone: "(555) 867-5309",
  joinWaitlist: false,
  bankrateInsiders: false,
}
