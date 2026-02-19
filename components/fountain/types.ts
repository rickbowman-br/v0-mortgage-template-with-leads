// Fountain - Feedback System Types

export type FeedbackType =
  | "nps"
  | "csat"
  | "rating"
  | "thumbs"
  | "emoji"
  | "text"
  | "multi-choice"
  | "scale"

export type TriggerType =
  | "manual"
  | "time-delay"
  | "scroll-depth"
  | "exit-intent"
  | "page-view"
  | "element-visible"
  | "click"

export type FeedbackPosition =
  | "bottom-right"
  | "bottom-left"
  | "bottom-center"
  | "top-right"
  | "top-left"
  | "center"

export interface FeedbackQuestion {
  id: string
  type: FeedbackType
  question: string
  subtext?: string
  required?: boolean
  options?: FeedbackOption[]
  minLabel?: string
  maxLabel?: string
  min?: number
  max?: number
}

export interface FeedbackOption {
  id: string
  label: string
  value: string | number
}

export interface FeedbackSurvey {
  id: string
  name: string
  questions: FeedbackQuestion[]
  trigger: TriggerConfig
  position?: FeedbackPosition
  branding?: BrandingConfig
  followUp?: FollowUpConfig
  targeting?: TargetingConfig
}

export interface TriggerConfig {
  type: TriggerType
  delay?: number
  scrollDepth?: number
  selector?: string
  showOnce?: boolean
  cooldownDays?: number
}

export interface BrandingConfig {
  primaryColor?: string
  backgroundColor?: string
  textColor?: string
  borderRadius?: string
  showLogo?: boolean
  logoUrl?: string
}

export interface FollowUpConfig {
  enabled: boolean
  message?: string
  ctaText?: string
  ctaUrl?: string
}

export interface TargetingConfig {
  urlPatterns?: string[]
  segments?: string[]
  devices?: ("desktop" | "tablet" | "mobile")[]
  conditions?: Record<string, unknown>
}

export interface FeedbackResponse {
  surveyId: string
  questionId: string
  value: string | number | string[]
  timestamp: Date
  metadata?: ResponseMetadata
}

export interface ResponseMetadata {
  url?: string
  userAgent?: string
  sessionId?: string
  userId?: string
  customData?: Record<string, unknown>
}

export interface FeedbackSubmission {
  surveyId: string
  responses: FeedbackResponse[]
  completed: boolean
  startedAt: Date
  completedAt?: Date
  metadata?: ResponseMetadata
}

export interface FeedbackContextValue {
  activeSurvey: FeedbackSurvey | null
  currentStep: number
  responses: FeedbackResponse[]
  isVisible: boolean
  isSubmitting: boolean
  showSurvey: (survey: FeedbackSurvey) => void
  hideSurvey: () => void
  submitResponse: (response: Omit<FeedbackResponse, "timestamp">) => void
  nextStep: () => void
  previousStep: () => void
  completeSurvey: () => Promise<void>
  resetSurvey: () => void
}

export interface FeedbackServiceConfig {
  apiEndpoint?: string
  apiKey?: string
  debug?: boolean
  onSubmit?: (submission: FeedbackSubmission) => void | Promise<void>
  onError?: (error: Error) => void
}

export interface UseFeedbackTriggerOptions {
  survey: FeedbackSurvey
  enabled?: boolean
}
