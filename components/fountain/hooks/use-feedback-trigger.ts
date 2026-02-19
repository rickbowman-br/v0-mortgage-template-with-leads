"use client"

import { useEffect, useRef, useCallback } from "react"
import type { FeedbackSurvey, UseFeedbackTriggerOptions } from "../types"
import { useFeedback } from "../feedback-context"

export function useFeedbackTrigger({ survey, enabled = true }: UseFeedbackTriggerOptions) {
  const { showSurvey, isVisible } = useFeedback()
  const hasTriggered = useRef(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const trigger = useCallback(() => {
    if (hasTriggered.current || isVisible || !enabled) return
    hasTriggered.current = true
    showSurvey(survey)
  }, [showSurvey, survey, isVisible, enabled])

  useEffect(() => {
    if (!enabled || survey.trigger.type !== "time-delay") return
    timeoutRef.current = setTimeout(trigger, survey.trigger.delay || 5000)
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [enabled, survey.trigger.type, survey.trigger.delay, trigger])

  useEffect(() => {
    if (!enabled || survey.trigger.type !== "scroll-depth") return
    const target = survey.trigger.scrollDepth || 50
    const handleScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight
      const pct = docH > 0 ? (window.scrollY / docH) * 100 : 0
      if (pct >= target && !hasTriggered.current) trigger()
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [enabled, survey.trigger.type, survey.trigger.scrollDepth, trigger])

  useEffect(() => {
    if (!enabled || survey.trigger.type !== "exit-intent") return
    const h = (e: MouseEvent) => { if (e.clientY <= 0) trigger() }
    document.addEventListener("mouseleave", h)
    return () => document.removeEventListener("mouseleave", h)
  }, [enabled, survey.trigger.type, trigger])

  useEffect(() => {
    if (!enabled || survey.trigger.type !== "page-view") return
    timeoutRef.current = setTimeout(trigger, 500)
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [enabled, survey.trigger.type, trigger])

  useEffect(() => {
    if (!enabled || survey.trigger.type !== "element-visible" || !survey.trigger.selector) return
    const el = document.querySelector(survey.trigger.selector)
    if (!el) return
    const obs = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) { trigger(); obs.disconnect() }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [enabled, survey.trigger.type, survey.trigger.selector, trigger])

  useEffect(() => {
    if (!enabled || survey.trigger.type !== "click" || !survey.trigger.selector) return
    const h = (e: Event) => { if ((e.target as Element).matches(survey.trigger.selector!)) trigger() }
    document.addEventListener("click", h)
    return () => document.removeEventListener("click", h)
  }, [enabled, survey.trigger.type, survey.trigger.selector, trigger])

  const triggerManually = useCallback(() => {
    if (survey.trigger.type === "manual") trigger()
  }, [survey.trigger.type, trigger])

  const reset = useCallback(() => { hasTriggered.current = false }, [])
  return { triggerManually, reset }
}

export function useShowFeedback() {
  const { showSurvey } = useFeedback()
  return useCallback((survey: FeedbackSurvey) => { showSurvey(survey) }, [showSurvey])
}
