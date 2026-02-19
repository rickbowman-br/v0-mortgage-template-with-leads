"use client"

import { useState } from "react"
import { cn } from "../libs/utils"
import type { FeedbackQuestion } from "../types"

interface NPSQuestionProps {
  question: FeedbackQuestion
  value?: number
  onChange: (value: number) => void
}

export function NPSQuestion({ question, value, onChange }: NPSQuestionProps) {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null)

  const getScoreColor = (score: number, isSelected: boolean, isHovered: boolean) => {
    if (!isSelected && !isHovered) return "bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100"
    if (score <= 6) return "bg-coral-500 text-white border-coral-500"
    if (score <= 8) return "bg-yellow-200 text-yellow-900 border-yellow-300"
    return "bg-teal-500 text-white border-teal-500"
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-blue-900">{question.question}</h3>
        {question.subtext && <p className="mt-1 text-sm text-muted-foreground">{question.subtext}</p>}
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-1">
          {Array.from({ length: 11 }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onChange(i)}
              onMouseEnter={() => setHoveredValue(i)}
              onMouseLeave={() => setHoveredValue(null)}
              className={cn(
                "w-9 h-9 rounded-lg border-2 text-sm font-medium transition-all duration-150",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                getScoreColor(i, value === i, hoveredValue === i)
              )}
            >
              {i}
            </button>
          ))}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{question.minLabel || "Not likely at all"}</span>
          <span>{question.maxLabel || "Extremely likely"}</span>
        </div>
      </div>
    </div>
  )
}
