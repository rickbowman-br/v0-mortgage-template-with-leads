"use client"

import type React from "react"
import { FeedbackProvider, FeedbackWidget } from "@/components/fountain"

export function FeedbackWrapper({ children }: { children: React.ReactNode }) {
  return (
    <FeedbackProvider
      config={{
        debug: true,
        onSubmit: async (submission) => {
          console.log("[Fountain] Feedback submitted:", submission)
        },
      }}
    >
      {children}
      <FeedbackWidget />
    </FeedbackProvider>
  )
}
