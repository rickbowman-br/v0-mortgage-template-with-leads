"use client"

import React, { createContext, useContext, useState, useCallback, useMemo } from "react"
import type { FeedbackContextValue, FeedbackSurvey, FeedbackResponse, FeedbackSubmission, FeedbackServiceConfig } from "./types"
import { getFeedbackService } from "./libs/feedback-service"

const FeedbackContext = createContext<FeedbackContextValue | null>(null)

interface FeedbackProviderProps {
  children: React.ReactNode
  config?: FeedbackServiceConfig
}

export function FeedbackProvider({ children, config }: FeedbackProviderProps) {
  const [activeSurvey, setActiveSurvey] = useState<FeedbackSurvey | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState<FeedbackResponse[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [startedAt, setStartedAt] = useState<Date | null>(null)

  const service = useMemo(() => getFeedbackService(config), [config])

  const showSurvey = useCallback((survey: FeedbackSurvey) => {
    if (!service.shouldShowSurvey(survey)) return
    setActiveSurvey(survey)
    setCurrentStep(0)
    setResponses([])
    setIsVisible(true)
    setStartedAt(new Date())
    service.markSurveyViewed(survey.id)
  }, [service])

  const hideSurvey = useCallback(() => { setIsVisible(false) }, [])

  const resetSurvey = useCallback(() => {
    setActiveSurvey(null)
    setCurrentStep(0)
    setResponses([])
    setIsVisible(false)
    setStartedAt(null)
  }, [])

  const submitResponse = useCallback((response: Omit<FeedbackResponse, "timestamp">) => {
    const fullResponse: FeedbackResponse = { ...response, timestamp: new Date() }
    setResponses(prev => {
      const idx = prev.findIndex(r => r.questionId === response.questionId)
      if (idx >= 0) { const u = [...prev]; u[idx] = fullResponse; return u }
      return [...prev, fullResponse]
    })
  }, [])

  const nextStep = useCallback(() => {
    if (activeSurvey && currentStep < activeSurvey.questions.length - 1) setCurrentStep(p => p + 1)
  }, [activeSurvey, currentStep])

  const previousStep = useCallback(() => {
    if (currentStep > 0) setCurrentStep(p => p - 1)
  }, [currentStep])

  const completeSurvey = useCallback(async () => {
    if (!activeSurvey || !startedAt) return
    setIsSubmitting(true)
    const submission: FeedbackSubmission = {
      surveyId: activeSurvey.id, responses, completed: true, startedAt, completedAt: new Date()
    }
    try {
      await service.submitFeedback(submission)
      if (activeSurvey.followUp?.enabled) {
        setCurrentStep(activeSurvey.questions.length)
      } else {
        setTimeout(resetSurvey, 2000)
      }
    } catch (e) {
      console.error("[Fountain] Submit error:", e)
    } finally {
      setIsSubmitting(false)
    }
  }, [activeSurvey, responses, startedAt, service, resetSurvey])

  const value: FeedbackContextValue = useMemo(() => ({
    activeSurvey, currentStep, responses, isVisible, isSubmitting,
    showSurvey, hideSurvey, submitResponse, nextStep, previousStep, completeSurvey, resetSurvey,
  }), [activeSurvey, currentStep, responses, isVisible, isSubmitting, showSurvey, hideSurvey, submitResponse, nextStep, previousStep, completeSurvey, resetSurvey])

  return (
    <FeedbackContext.Provider value={value}>
      {children}
    </FeedbackContext.Provider>
  )
}

export function useFeedback(): FeedbackContextValue {
  const context = useContext(FeedbackContext)
  if (!context) throw new Error("useFeedback must be used within a FeedbackProvider")
  return context
}
