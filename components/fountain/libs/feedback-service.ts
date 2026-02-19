import type { FeedbackSubmission, FeedbackServiceConfig, FeedbackSurvey } from "../types"

const STORAGE_PREFIX = "feedback_"
const VIEWED_KEY = STORAGE_PREFIX + "viewed"
const SUBMITTED_KEY = STORAGE_PREFIX + "submitted"

class FeedbackService {
  private config: FeedbackServiceConfig
  private sessionId: string

  constructor(config: FeedbackServiceConfig = {}) {
    this.config = config
    this.sessionId = this.generateSessionId()
  }

  private generateSessionId(): string {
    if (typeof window === "undefined") return ""
    let s = sessionStorage.getItem(STORAGE_PREFIX + "session")
    if (!s) {
      s = "session_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9)
      sessionStorage.setItem(STORAGE_PREFIX + "session", s)
    }
    return s
  }

  private log(...args: unknown[]) {
    if (this.config.debug) console.log("[FeedbackService]", ...args)
  }

  hasViewedSurvey(id: string) {
    if (typeof window === "undefined") return false
    return JSON.parse(sessionStorage.getItem(VIEWED_KEY) || "[]").includes(id)
  }

  markSurveyViewed(id: string) {
    if (typeof window === "undefined") return
    const v = JSON.parse(sessionStorage.getItem(VIEWED_KEY) || "[]")
    if (!v.includes(id)) {
      v.push(id)
      sessionStorage.setItem(VIEWED_KEY, JSON.stringify(v))
    }
  }

  hasSubmittedSurvey(id: string) {
    if (typeof window === "undefined") return false
    return JSON.parse(localStorage.getItem(SUBMITTED_KEY) || "[]").includes(id)
  }

  isInCooldown(id: string, days?: number) {
    if (typeof window === "undefined" || !days) return false
    const l = localStorage.getItem(STORAGE_PREFIX + "last_" + id)
    if (!l) return false
    return Date.now() - new Date(l).getTime() < days * 86400000
  }

  shouldShowSurvey(survey: FeedbackSurvey) {
    const { trigger } = survey
    if (this.hasSubmittedSurvey(survey.id)) return false
    if (trigger.showOnce && this.hasViewedSurvey(survey.id)) return false
    if (this.isInCooldown(survey.id, trigger.cooldownDays)) return false
    return true
  }

  async submitFeedback(submission: FeedbackSubmission) {
    const enriched = {
      ...submission,
      metadata: {
        ...submission.metadata,
        url: typeof window !== "undefined" ? window.location.href : undefined,
        userAgent: typeof window !== "undefined" ? navigator.userAgent : undefined,
        sessionId: this.sessionId,
      },
    }
    if (this.config.onSubmit) await this.config.onSubmit(enriched)
    if (this.config.apiEndpoint) {
      const r = await fetch(this.config.apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(this.config.apiKey && { Authorization: "Bearer " + this.config.apiKey }),
        },
        body: JSON.stringify(enriched),
      })
      if (!r.ok) throw new Error("Failed: " + r.statusText)
    }
    if (typeof window !== "undefined") {
      const s = JSON.parse(localStorage.getItem(SUBMITTED_KEY) || "[]")
      if (!s.includes(submission.surveyId)) {
        s.push(submission.surveyId)
        localStorage.setItem(SUBMITTED_KEY, JSON.stringify(s))
      }
      localStorage.setItem(STORAGE_PREFIX + "last_" + submission.surveyId, new Date().toISOString())
    }
  }

  getSessionId() { return this.sessionId }

  reset() {
    if (typeof window === "undefined") return
    sessionStorage.removeItem(VIEWED_KEY)
    sessionStorage.removeItem(STORAGE_PREFIX + "session")
    const keysToRemove: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith(STORAGE_PREFIX)) keysToRemove.push(key)
    }
    keysToRemove.forEach(key => localStorage.removeItem(key))
  }
}

let inst: FeedbackService | null = null
export function getFeedbackService(config?: FeedbackServiceConfig) {
  if (!inst || config) inst = new FeedbackService(config)
  return inst
}
export { FeedbackService }
