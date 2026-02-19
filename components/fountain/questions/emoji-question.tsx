"use client"

import { cn } from "../libs/utils"
import type { FeedbackQuestion } from "../types"

const defaultEmojis = [
  { value: "very_unhappy", emoji: "\u{1F620}", label: "Very Unhappy", color: "hover:bg-coral-100 data-[selected=true]:bg-coral-500" },
  { value: "unhappy", emoji: "\u{1F61F}", label: "Unhappy", color: "hover:bg-coral-50 data-[selected=true]:bg-coral-400" },
  { value: "neutral", emoji: "\u{1F610}", label: "Neutral", color: "hover:bg-yellow-100 data-[selected=true]:bg-yellow-200" },
  { value: "happy", emoji: "\u{1F60A}", label: "Happy", color: "hover:bg-teal-50 data-[selected=true]:bg-teal-400" },
  { value: "very_happy", emoji: "\u{1F60D}", label: "Very Happy", color: "hover:bg-teal-100 data-[selected=true]:bg-teal-500" },
]

interface EmojiQuestionProps {
  question: FeedbackQuestion
  value?: string
  onChange: (value: string) => void
}

export function EmojiQuestion({ question, value, onChange }: EmojiQuestionProps) {
  const options = question.options?.length
    ? question.options.map((opt, i) => ({
        value: opt.value.toString(),
        emoji: opt.label,
        label: opt.label,
        color: defaultEmojis[i]?.color || defaultEmojis[2].color,
      }))
    : defaultEmojis

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-blue-900">{question.question}</h3>
        {question.subtext && <p className="mt-1 text-sm text-muted-foreground">{question.subtext}</p>}
      </div>
      <div className="flex items-center justify-center gap-2">
        {options.map((option) => {
          const isSelected = value === option.value
          return (
            <button
              key={option.value}
              type="button"
              data-selected={isSelected}
              onClick={() => onChange(option.value)}
              className={cn(
                "flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:scale-105",
                option.color,
                isSelected
                  ? "border-blue-600 text-white shadow-md scale-110"
                  : "border-transparent bg-blue-50 text-blue-900"
              )}
            >
              <span className="text-3xl" role="img" aria-label={option.label}>{option.emoji}</span>
              <span className={cn("text-xs font-medium", isSelected && option.value !== "neutral" && "text-white")}>{option.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
