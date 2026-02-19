// Fountain - A Fountain of Insight
// Self-contained inline feedback system
// Zero external dependencies beyond React, Tailwind, clsx, tailwind-merge, and lucide-react

// Context & Provider
export { FeedbackProvider, useFeedback } from "./feedback-context"

// Main Widget
export { FeedbackWidget } from "./feedback-widget"

// Hooks
export { useFeedbackTrigger, useShowFeedback } from "./hooks/use-feedback-trigger"

// Service
export { getFeedbackService, FeedbackService } from "./libs/feedback-service"

// Individual Question Components
export {
  NPSQuestion,
  CSATQuestion,
  RatingQuestion,
  ThumbsQuestion,
  EmojiQuestion,
  TextQuestion,
  MultiChoiceQuestion,
  ScaleQuestion,
} from "./questions"

// Pre-built survey templates
export { surveyTemplates } from "./templates"

// Types
export type {
  FeedbackType,
  TriggerType,
  FeedbackPosition,
  FeedbackQuestion,
  FeedbackOption,
  FeedbackSurvey,
  TriggerConfig,
  BrandingConfig,
  FollowUpConfig,
  TargetingConfig,
  FeedbackResponse,
  ResponseMetadata,
  FeedbackSubmission,
  FeedbackContextValue,
  FeedbackServiceConfig,
  UseFeedbackTriggerOptions,
} from "./types"
