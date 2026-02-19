import type { FeedbackSurvey } from "./types"

export const surveyTemplates: Record<string, FeedbackSurvey> = {
  nps: {
    id: "nps-standard",
    name: "Net Promoter Score",
    questions: [
      { id: "nps-score", type: "nps", question: "How likely are you to recommend us to a friend or colleague?", required: true, minLabel: "Not at all likely", maxLabel: "Extremely likely" },
      { id: "nps-reason", type: "text", question: "What's the primary reason for your score?", subtext: "Your feedback helps us improve.", required: false },
    ],
    trigger: { type: "time-delay", delay: 30000, showOnce: true, cooldownDays: 90 },
    followUp: { enabled: true, message: "Thank you for your feedback! We truly appreciate it." },
  },
  csat: {
    id: "csat-quick",
    name: "Customer Satisfaction",
    questions: [
      { id: "csat-score", type: "csat", question: "How satisfied are you with your experience today?", required: true },
    ],
    trigger: { type: "manual", showOnce: true, cooldownDays: 7 },
    followUp: { enabled: true, message: "Thanks for letting us know!" },
  },
  featureFeedback: {
    id: "feature-feedback",
    name: "Feature Feedback",
    questions: [
      { id: "helpful", type: "thumbs", question: "Was this feature helpful?", required: true },
      { id: "improvement", type: "text", question: "How can we improve this feature?", subtext: "Optional but much appreciated!", required: false },
    ],
    trigger: { type: "manual", showOnce: false, cooldownDays: 1 },
    followUp: { enabled: true, message: "Your feedback shapes our product!" },
  },
  quickMood: {
    id: "quick-mood",
    name: "Quick Mood Check",
    questions: [
      { id: "mood", type: "emoji", question: "How are you feeling about your experience?", required: true },
    ],
    trigger: { type: "scroll-depth", scrollDepth: 75, showOnce: true, cooldownDays: 3 },
    followUp: { enabled: true, message: "Thanks for sharing!" },
  },
  exitIntent: {
    id: "exit-intent",
    name: "Exit Intent Survey",
    questions: [
      { id: "leaving-reason", type: "multi-choice", question: "Before you go, what brought you here today?", required: true, options: [{ id: "research", label: "Researching options", value: "research" }, { id: "compare", label: "Comparing rates", value: "compare" }, { id: "apply", label: "Ready to apply", value: "apply" }, { id: "learn", label: "Just learning", value: "learn" }, { id: "other", label: "Something else", value: "other" }] },
      { id: "found-what-needed", type: "thumbs", question: "Did you find what you were looking for?", required: true },
    ],
    trigger: { type: "exit-intent", showOnce: true, cooldownDays: 7 },
    followUp: { enabled: true, message: "Thank you! We hope to see you again soon." },
  },
  productRating: {
    id: "product-rating",
    name: "Product Rating",
    questions: [
      { id: "overall-rating", type: "rating", question: "How would you rate your overall experience?", required: true, max: 5 },
      { id: "specific-feedback", type: "multi-choice", question: "What did you like most?", subtext: "Select all that apply", required: false, options: [{ id: "ease", label: "Easy to use", value: "ease" }, { id: "speed", label: "Fast and responsive", value: "speed" }, { id: "design", label: "Beautiful design", value: "design" }, { id: "info", label: "Helpful information", value: "info" }, { id: "rates", label: "Great rates", value: "rates" }] },
    ],
    trigger: { type: "time-delay", delay: 60000, showOnce: true, cooldownDays: 30 },
    followUp: { enabled: true, message: "Your feedback helps us serve you better!" },
  },
  effortScore: {
    id: "effort-score",
    name: "Customer Effort Score",
    questions: [
      { id: "effort", type: "scale", question: "How easy was it to complete your task today?", required: true, min: 1, max: 7, minLabel: "Very difficult", maxLabel: "Very easy" },
    ],
    trigger: { type: "manual", showOnce: true, cooldownDays: 14 },
    followUp: { enabled: true, message: "Thanks for your feedback!" },
  },
  mortgageExperience: {
    id: "mortgage-experience",
    name: "Mortgage Experience Survey",
    questions: [
      { id: "info-quality", type: "scale", question: "How helpful was the mortgage information provided?", required: true, min: 1, max: 5, minLabel: "Not helpful", maxLabel: "Very helpful" },
      { id: "next-steps", type: "multi-choice", question: "What are your next steps?", required: true, options: [{ id: "apply", label: "Apply for a mortgage", value: "apply" }, { id: "compare", label: "Compare more lenders", value: "compare" }, { id: "calculate", label: "Use calculators", value: "calculate" }, { id: "read", label: "Read more articles", value: "read" }, { id: "undecided", label: "Still deciding", value: "undecided" }] },
      { id: "missing-info", type: "text", question: "Is there anything we could add to help you better?", required: false },
    ],
    trigger: { type: "scroll-depth", scrollDepth: 20, showOnce: true, cooldownDays: 14 },
    position: "bottom-right",
    followUp: { enabled: true, message: "Thank you! Your feedback helps us improve our mortgage resources.", ctaText: "View Rates", ctaUrl: "/rates" },
  },
}

export function createSurvey(overrides: Partial<FeedbackSurvey> & { id: string; name: string }): FeedbackSurvey {
  return { questions: [], trigger: { type: "manual" }, followUp: { enabled: true }, ...overrides }
}
