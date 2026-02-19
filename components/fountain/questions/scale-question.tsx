"use client"

import { useState } from "react"
import { cn } from "../libs/utils"
import type { FeedbackQuestion } from "../types"

interface ScaleQuestionProps {
  question: FeedbackQuestion
  value?: number
  onChange: (value: number) => void
}

export function ScaleQuestion({ question, value, onChange }: ScaleQuestionProps) {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null)
  const min = question.min ?? 1
  const max = question.max ?? 5
  const range = max - min + 1

  const getColorIntensity = (index: number, total: number) => {
    const position = index / (total - 1)
    if (position <= 0.33) return "bg-coral-100 hover:bg-coral-200 data-[selected=true]:bg-coral-500 data-[selected=true]:text-white"
    if (position <= 0.66) return "bg-yellow-100 hover:bg-yellow-200 data-[selected=true]:bg-yellow-300 data-[selected=true]:text-yellow-900"
    return "bg-teal-100 hover:bg-teal-200 data-[selected=true]:bg-teal-500 data-[selected=true]:text-white"
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-blue-900">{question.question}</h3>
        {question.subtext && <p className="mt-1 text-sm text-muted-foreground">{question.subtext}</p>}
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          {Array.from({ length: range }, (_, i) => {
            const scaleValue = min + i
            const isSelected = value === scaleValue
            const isHovered = hoveredValue === scaleValue
            return (
              <button
                key={scaleValue}
                type="button"
                data-selected={isSelected}
                onClick={() => onChange(scaleValue)}
                onMouseEnter={() => setHoveredValue(scaleValue)}
                onMouseLeave={() => setHoveredValue(null)}
                className={cn(
                  "flex-1 py-3 rounded-lg border-2 border-transparent font-medium transition-all duration-150",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                  getColorIntensity(i, range),
                  isSelected && "ring-2 ring-blue-600 ring-offset-2",
                  isHovered && !isSelected && "scale-105"
                )}
              >
                {scaleValue}
              </button>
            )
          })}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{question.minLabel || min + " - Low"}</span>
          <span>{question.maxLabel || max + " - High"}</span>
        </div>
      </div>
    </div>
  )
}
