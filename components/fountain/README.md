# Fountain

A self-contained, Sprig-like inline feedback system for React + Tailwind projects.

## Installation

1. Copy the entire `fountain/` folder into your project's `components/` directory.
2. Ensure peer dependencies are installed:

```
react >= 18
tailwindcss >= 3
clsx
tailwind-merge
lucide-react
```

## Quick Start

### 1. Wrap your app with the provider

```tsx
import { FeedbackProvider, FeedbackWidget } from "@/components/fountain"

export default function Layout({ children }) {
  return (
    <FeedbackProvider
      config={{
        apiEndpoint: "/api/feedback",  // optional
        onSubmit: async (submission) => {
          console.log("Feedback received:", submission)
        },
      }}
    >
      {children}
      <FeedbackWidget />
    </FeedbackProvider>
  )
}
```

### 2. Trigger surveys manually

```tsx
import { useFeedback, surveyTemplates } from "@/components/fountain"

function MyComponent() {
  const { showSurvey } = useFeedback()

  return (
    <button onClick={() => showSurvey(surveyTemplates.nps)}>
      Give Feedback
    </button>
  )
}
```

### 3. Use automatic triggers

```tsx
import { useFeedbackTrigger, surveyTemplates } from "@/components/fountain"

function MyPage() {
  useFeedbackTrigger({
    survey: {
      ...surveyTemplates.quickMood,
      trigger: {
        type: "scroll-depth",
        scrollDepth: 50,
        showOnce: true,
      },
    },
    enabled: true,
  })

  return <div>Your page content</div>
}
```

## Trigger Types

| Type             | Description                                  |
| ---------------- | -------------------------------------------- |
| `time-delay`     | Show after a specified delay in ms            |
| `scroll-depth`   | Show when user scrolls past a % threshold     |
| `exit-intent`    | Show when cursor leaves the viewport (desktop)|
| `page-view`      | Show shortly after page loads                 |
| `element-visible`| Show when a CSS-selected element is visible   |
| `click`          | Show when a CSS-selected element is clicked   |
| `manual`         | Programmatic control only                     |

## Question Types

| Type           | Description                             |
| -------------- | --------------------------------------- |
| `nps`          | Net Promoter Score (0-10)               |
| `csat`         | Customer Satisfaction (5 levels)        |
| `rating`       | Star rating (configurable max)          |
| `thumbs`       | Thumbs up / down binary                 |
| `emoji`        | Emoji mood selector (5 moods)           |
| `scale`        | Numeric scale (configurable min/max)    |
| `text`         | Open-ended textarea                     |
| `multi-choice` | Single or multi-select options          |

## Pre-built Templates

Import from `templates.ts`:

- `nps` - Net Promoter Score
- `csat` - Customer Satisfaction
- `quickMood` - Quick Mood Check
- `featureFeedback` - Feature Feedback
- `exitIntent` - Exit Intent Survey
- `productRating` - Product Rating
- `effortScore` - Customer Effort Score
- `mortgageExperience` - Mortgage Experience Survey

## Folder Structure

```
fountain/
  index.ts               # Barrel export
  types.ts               # All TypeScript types
  templates.ts           # Pre-built survey configs
  feedback-context.tsx   # React context + provider
  feedback-widget.tsx    # Main popup widget
  hooks/
    use-feedback-trigger.ts  # Auto-trigger hook
  lib/
    feedback-service.ts  # Storage, cooldowns, API
    utils.ts             # Local cn() utility
  questions/
    index.ts             # Question barrel export
    nps-question.tsx
    csat-question.tsx
    rating-question.tsx
    thumbs-question.tsx
    emoji-question.tsx
    text-question.tsx
    multi-choice-question.tsx
    scale-question.tsx
```

## Configuration

The `FeedbackProvider` accepts an optional `config` prop:

```tsx
interface FeedbackServiceConfig {
  apiEndpoint?: string     // POST endpoint for submissions
  apiKey?: string          // Bearer token for auth
  debug?: boolean          // Enable console logging
  onSubmit?: (submission: FeedbackSubmission) => Promise<void>
}
```

## License

Internal use - Bankrate.
