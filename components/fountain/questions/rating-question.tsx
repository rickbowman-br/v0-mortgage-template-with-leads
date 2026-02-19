"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "../libs/utils"
import type { FeedbackQuestion } from "../types"

interface RatingQuestionProps {
  question: FeedbackQuestion
  value?: number
  onChange: (value: number) => void
}

export function RatingQuestion({ question, value, onChange }: RatingQuestionProps) {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null)
  const maxRating = question.max || 5
  const displayValue = hoveredValue ?? value ?? 0

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-blue-900">{question.question}</h3>
        {question.subtext && <p className="mt-1 text-sm text-muted-foreground">{question.subtext}</p>}
      </div>
      <div className="flex items-center gap-2">
        {Array.from({ length: maxRating }, (_, i) => {
          const starValue = i + 1
          const isFilled = starValue <= displayValue
          return (
            <button
              key={starValue}
              type="button"
              onClick={() => onChange(starValue)}
              onMouseEnter={() => setHoveredValue(starValue)}
              onMouseLeave={() => setHoveredValue(null)}
              className={cn(
                "p-1 rounded-lg transition-all duration-150",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                "hover:scale-110"
              )}
            >
              <Star className={cn(
                "w-8 h-8 transition-colors duration-150",
                isFilled ? "fill-yellow-300 text-yellow-400" : "fill-transparent text-blue-200 hover:text-yellow-300"
              )} />
            </button>
          )
        })}
      </div>
      {value && <p className="text-sm text-muted-foreground">You rated {value} out of {maxRating} stars</p>}
    </div>
  )
}
