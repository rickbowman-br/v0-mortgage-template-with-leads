"use client"

import { cn } from "../libs/utils"
import type { FeedbackQuestion } from "../types"

interface CSATQuestionProps {
  question: FeedbackQuestion
  value?: number
  onChange: (value: number) => void
}

const satisfactionLevels = [
  { value: 1, label: "Very Dissatisfied", color: "bg-coral-500 border-coral-500" },
  { value: 2, label: "Dissatisfied", color: "bg-coral-300 border-coral-300" },
  { value: 3, label: "Neutral", color: "bg-yellow-200 border-yellow-300" },
  { value: 4, label: "Satisfied", color: "bg-teal-300 border-teal-300" },
  { value: 5, label: "Very Satisfied", color: "bg-teal-500 border-teal-500" },
]

export function CSATQuestion({ question, value, onChange }: CSATQuestionProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-blue-900">{question.question}</h3>
        {question.subtext && <p className="mt-1 text-sm text-muted-foreground">{question.subtext}</p>}
      </div>
      <div className="flex flex-col gap-2">
        {satisfactionLevels.map((level) => (
          <button
            key={level.value}
            type="button"
            onClick={() => onChange(level.value)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-all duration-150",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              value === level.value
                ? cn(level.color, "text-white")
                : "bg-white border-blue-200 text-blue-900 hover:bg-blue-50"
            )}
          >
            <div className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
              value === level.value ? "bg-white/20" : level.color
            )}>
              <span className="text-white">{level.value}</span>
            </div>
            <span className="font-medium">{level.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
