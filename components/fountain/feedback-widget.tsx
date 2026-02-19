"use client"

import { useCallback, useMemo } from "react"
import { X, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react"
import { cn } from "./libs/utils"
import { useFeedback } from "./feedback-context"
import type { FeedbackQuestion, FeedbackPosition } from "./types"
import {
  NPSQuestion,
  CSATQuestion,
  RatingQuestion,
  ThumbsQuestion,
  EmojiQuestion,
  TextQuestion,
  MultiChoiceQuestion,
  ScaleQuestion,
} from "./questions"

const positionClasses: Record<FeedbackPosition, string> = {
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
}

export function FeedbackWidget() {
  const {
    activeSurvey,
    currentStep,
    responses,
    isVisible,
    isSubmitting,
    hideSurvey,
    submitResponse,
    nextStep,
    previousStep,
    completeSurvey,
    resetSurvey,
  } = useFeedback()

  const currentQuestion = activeSurvey?.questions[currentStep]
  const isLastQuestion = activeSurvey
    ? currentStep === activeSurvey.questions.length - 1
    : false
  const isFollowUpStep = activeSurvey
    ? currentStep >= activeSurvey.questions.length
    : false
  const totalQuestions = activeSurvey?.questions.length || 0

  const currentValue = useMemo(() => {
    if (!currentQuestion) return undefined
    const response = responses.find(r => r.questionId === currentQuestion.id)
    return response?.value
  }, [currentQuestion, responses])

  const handleChange = useCallback((value: string | number | string[]) => {
    if (!activeSurvey || !currentQuestion) return
    submitResponse({
      surveyId: activeSurvey.id,
      questionId: currentQuestion.id,
      value,
    })
  }, [activeSurvey, currentQuestion, submitResponse])

  const handleNext = useCallback(() => {
    if (isLastQuestion) {
      completeSurvey()
    } else {
      nextStep()
    }
  }, [isLastQuestion, completeSurvey, nextStep])

  const canProceed = useMemo(() => {
    if (!currentQuestion) return false
    if (!currentQuestion.required) return true
    return currentValue !== undefined && currentValue !== ""
  }, [currentQuestion, currentValue])

  if (!isVisible || !activeSurvey) return null

  const position = activeSurvey.position || "bottom-right"
  const branding = activeSurvey.branding

  if (isFollowUpStep) {
    return (
      <div
        className={cn(
          "fixed z-50 w-full max-w-md animate-in fade-in-0 slide-in-from-bottom-4 duration-300",
          positionClasses[position]
        )}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden"
          style={{
            backgroundColor: branding?.backgroundColor,
            borderRadius: branding?.borderRadius,
          }}
        >
          <div className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal-100 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-teal-500" />
            </div>
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              Thank you for your feedback!
            </h3>
            <p className="text-muted-foreground mb-6">
              {activeSurvey.followUp?.message || "Your response helps us improve."}
            </p>
            {activeSurvey.followUp?.ctaUrl && (
              <a
                href={activeSurvey.followUp.ctaUrl}
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {activeSurvey.followUp.ctaText || "Learn More"}
              </a>
            )}
            <button
              type="button"
              onClick={resetSurvey}
              className="block mx-auto mt-4 text-sm text-muted-foreground hover:text-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "fixed z-50 w-full max-w-md animate-in fade-in-0 slide-in-from-bottom-4 duration-300",
        positionClasses[position]
      )}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden"
        style={{
          backgroundColor: branding?.backgroundColor,
          borderRadius: branding?.borderRadius,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-blue-100 bg-blue-50">
          <div className="flex items-center gap-2">
            {branding?.showLogo && branding.logoUrl && (
              <img src={branding.logoUrl} alt="" className="h-6" />
            )}
            {totalQuestions > 1 && (
              <span className="text-sm text-muted-foreground">
                {currentStep + 1} of {totalQuestions}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={hideSurvey}
            className="p-1 rounded-lg text-muted-foreground hover:text-blue-900 hover:bg-blue-100 transition-colors"
            aria-label="Close feedback"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        {totalQuestions > 1 && (
          <div className="h-1 bg-blue-100">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {currentQuestion && (
            <QuestionRenderer
              question={currentQuestion}
              value={currentValue}
              onChange={handleChange}
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-blue-100 bg-blue-50">
          <div>
            {currentStep > 0 && (
              <button
                type="button"
                onClick={previousStep}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-blue-900 hover:bg-blue-100 rounded-md transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={handleNext}
            disabled={!canProceed || isSubmitting}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:pointer-events-none"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting...
              </span>
            ) : isLastQuestion ? (
              "Submit"
            ) : (
              <>
                Continue
                <ChevronRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

interface QuestionRendererProps {
  question: FeedbackQuestion
  value: unknown
  onChange: (value: string | number | string[]) => void
}

function QuestionRenderer({ question, value, onChange }: QuestionRendererProps) {
  switch (question.type) {
    case "nps": return <NPSQuestion question={question} value={value as number} onChange={onChange} />
    case "csat": return <CSATQuestion question={question} value={value as number} onChange={onChange} />
    case "rating": return <RatingQuestion question={question} value={value as number} onChange={onChange} />
    case "thumbs": return <ThumbsQuestion question={question} value={value as string} onChange={onChange} />
    case "emoji": return <EmojiQuestion question={question} value={value as string} onChange={onChange} />
    case "text": return <TextQuestion question={question} value={value as string} onChange={onChange} />
    case "multi-choice": return <MultiChoiceQuestion question={question} value={value as string[]} onChange={onChange} />
    case "scale": return <ScaleQuestion question={question} value={value as number} onChange={onChange} />
    default: return null
  }
}
