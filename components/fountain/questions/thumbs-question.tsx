"use client"

import { ThumbsUp, ThumbsDown } from "lucide-react"
import { cn } from "../libs/utils"
import type { FeedbackQuestion } from "../types"

interface ThumbsQuestionProps {
  question: FeedbackQuestion
  value?: string
  onChange: (value: string) => void
}

export function ThumbsQuestion({ question, value, onChange }: ThumbsQuestionProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-blue-900">{question.question}</h3>
        {question.subtext && <p className="mt-1 text-sm text-muted-foreground">{question.subtext}</p>}
      </div>
      <div className="flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => onChange("positive")}
          className={cn(
            "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:scale-105",
            value === "positive"
              ? "bg-teal-500 border-teal-500 text-white"
              : "bg-white border-blue-200 text-blue-900 hover:bg-teal-50 hover:border-teal-300"
          )}
        >
          <ThumbsUp className={cn("w-10 h-10", value === "positive" && "scale-110")} />
          <span className="text-sm font-medium">Yes</span>
        </button>
        <button
          type="button"
          onClick={() => onChange("negative")}
          className={cn(
            "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:scale-105",
            value === "negative"
              ? "bg-coral-500 border-coral-500 text-white"
              : "bg-white border-blue-200 text-blue-900 hover:bg-coral-50 hover:border-coral-300"
          )}
        >
          <ThumbsDown className={cn("w-10 h-10", value === "negative" && "scale-110")} />
          <span className="text-sm font-medium">No</span>
        </button>
      </div>
    </div>
  )
}
