"use client"

import { Check } from "lucide-react"
import { cn } from "../libs/utils"
import type { FeedbackQuestion } from "../types"

interface MultiChoiceQuestionProps {
  question: FeedbackQuestion
  value?: string[]
  onChange: (value: string[]) => void
  multiSelect?: boolean
}

export function MultiChoiceQuestion({ question, value = [], onChange, multiSelect = false }: MultiChoiceQuestionProps) {
  const handleSelect = (optionValue: string) => {
    if (multiSelect) {
      if (value.includes(optionValue)) {
        onChange(value.filter(v => v !== optionValue))
      } else {
        onChange([...value, optionValue])
      }
    } else {
      onChange([optionValue])
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-blue-900">{question.question}</h3>
        {question.subtext && <p className="mt-1 text-sm text-muted-foreground">{question.subtext}</p>}
        {multiSelect && <p className="mt-1 text-xs text-blue-600">Select all that apply</p>}
      </div>
      <div className="flex flex-col gap-2">
        {question.options?.map((option) => {
          const isSelected = value.includes(option.value.toString())
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option.value.toString())}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg border-2 text-left transition-all duration-150",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                isSelected
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-white border-blue-200 text-blue-900 hover:bg-blue-50 hover:border-blue-300"
              )}
            >
              <div className={cn(
                "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                multiSelect ? "rounded" : "rounded-full",
                isSelected ? "bg-white border-white" : "border-blue-300 bg-white"
              )}>
                {isSelected && <Check className="w-3 h-3 text-blue-600" />}
              </div>
              <span className="font-medium">{option.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
