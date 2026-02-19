"use client"

import type { FeedbackQuestion } from "../types"

interface TextQuestionProps {
  question: FeedbackQuestion
  value?: string
  onChange: (value: string) => void
}

export function TextQuestion({ question, value, onChange }: TextQuestionProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-blue-900">{question.question}</h3>
        {question.subtext && <p className="mt-1 text-sm text-muted-foreground">{question.subtext}</p>}
      </div>
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Share your thoughts..."
        maxLength={500}
        className="flex min-h-[120px] w-full rounded-md border border-blue-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 focus-visible:border-blue-600 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
      />
      <p className="text-xs text-muted-foreground text-right">
        {(value?.length || 0)} / 500 characters
      </p>
    </div>
  )
}
