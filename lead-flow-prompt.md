# Mortgage Lead Flow - Full Build Prompt

Build a complete multi-step mortgage lead generation flow as a full-screen overlay experience in Next.js (App Router). This is a 16-step wizard that collects user information to generate personalized mortgage rate quotes, with an optional soft credit check for pre-qualification.

---

## ARCHITECTURE

### File Structure
```
components/
  lead-flow.tsx                    # Main orchestrator (state, step routing)
  lead-flow/
    types.ts                       # All TypeScript types, initial data
    lead-flow-layout.tsx           # Full-screen layout shell
    steps/
      index.ts                     # Barrel exports
      zip-code-step.tsx            # Step 1
      loan-type-step.tsx           # Step 2
      property-type-step.tsx       # Step 3
      property-use-step.tsx        # Step 4
      first-time-buyer-step.tsx    # Step 5
      buying-stage-step.tsx        # Step 6
      purchase-price-step.tsx      # Step 7
      down-payment-step.tsx        # Step 8
      soft-credit-check-step.tsx   # Step 9
      credit-score-step.tsx        # Step 10
      military-status-step.tsx     # Step 11
      employment-status-step.tsx   # Step 12
      bankruptcy-history-step.tsx  # Step 13
      annual-income-step.tsx       # Step 14
      matching-quotes-step.tsx     # Step 15
      contact-info-step.tsx        # Step 16
      confirmation-step.tsx        # Final (post-step 16)
```

### State Management Pattern
- The parent `lead-flow.tsx` component owns ALL state via a single `useState<LeadFlowData>` object
- Every step receives the same `StepProps` interface: `{ data, updateData, onNext, onBack }`
- `updateData` accepts `Partial<LeadFlowData>` for granular updates
- Step navigation is a simple integer counter `currentStep` with `goToNextStep` / `goToPreviousStep`
- Most steps auto-advance on selection (no "Continue" button needed for single-choice steps)
- Steps that need explicit submission (sliders, text inputs) have a "Continue" button

### Types (types.ts)
```typescript
export interface LenderInfo {
  lender: string; nmls: string; rate: string; term: string;
  apr: string; points: string; payment: string;
}

export type PropertyType = "single-family" | "townhome" | "condo" | "multi-family" | null
export type PropertyUse = "primary" | "second-home" | "investment" | null
export type BuyingStage = "offer-accepted" | "making-offers" | "open-houses" | "researching" | null
export type DownPayment = "less-than-20" | "20" | "more-than-20" | null
export type CreditScore = "780+" | "760-779" | "740-759" | "720-739" | "700-719" | "680-699" | "660-679" | "640-659" | "620-639" | "580-619" | null
export type EmploymentStatus = "employed" | "not-employed" | "self-employed" | "military" | "retired" | "other" | null

export interface LeadFlowData {
  zipCode: string
  loanType: "purchase" | "refinance" | null
  lenderName: string
  propertyType: PropertyType
  propertyUse: PropertyUse
  firstTimeBuyer: boolean | null
  buyingStage: BuyingStage
  purchasePrice: number | null
  downPayment: DownPayment
  creditScore: CreditScore
  militaryStatus: boolean | null
  employmentStatus: EmploymentStatus
  bankruptcyHistory: boolean | null
  annualIncome: number | null
  additionalLenders: string[]
  softCreditCheckCompleted: boolean | null
  verifiedCreditScore: CreditScore | null
  totalMonthlyDebt: number | null
  latePayments24Months: number | null
  oldestAccountAge: number | null
  firstName: string
  lastName: string
  email: string
  phone: string
  joinWaitlist: boolean
  bankrateInsiders: boolean
}

export interface StepProps {
  data: LeadFlowData
  updateData: (updates: Partial<LeadFlowData>) => void
  onNext: () => void
  onBack: () => void
}
```

Prefill all data fields with realistic demo values so the flow can be clicked through quickly for demos.

---

## LAYOUT SHELL (lead-flow-layout.tsx)

A fixed full-screen overlay (`fixed inset-0 z-50`) with this structure:
- **Header**: Left side shows Bankrate square logo + "Bankrate / Mortgages" text. Right side shows lender logo/name (e.g., "Sage Home Loans"). Simple, clean.
- **Progress bar**: Appears after step 1, hidden on confirmation. Shows a gradient fill bar with "X% complete" text below it.
- **Main content area**: `flex-1 overflow-y-auto` with centered content. **CRITICAL**: Add a `useRef` to this element and scroll to top (`scrollTo({ top: 0, behavior: "instant" })`) in a `useEffect` whenever `currentStep` changes. Without this, navigating to the next step keeps the user scrolled down.
- **Footer**: Desktop version has social links (Facebook, Instagram, LinkedIn), legal links (About, License, Privacy, Terms), NMLS info. Mobile version is compact single-line.
- **Close button**: Fixed top-right, mobile only, circular with X icon.

---

## STEP-BY-STEP SPECIFICATIONS

### Step 1: ZIP Code
- **Layout**: Centered card with headline "Get your mortgage rate quote" and subtitle "It only takes about 30 seconds to complete your custom quote!"
- **Input**: Large text input with 5-digit numeric validation. Shows green checkmark when valid, X clear button. Input is masked to digits only.
- **CTA**: "Get Started" button, disabled until valid ZIP.
- **No back button** (first step).

### Step 2: Loan Type
- **Question**: "What type of loan are you looking for?"
- **Options**: Two large cards side by side: "Home Purchase" (house icon) and "Home Refinance" (house with dollar sign icon).
- **Behavior**: Auto-advances on click.
- **Icons**: Custom SVG line-art icons (not Lucide). House with windows/door for purchase, house with circular dollar sign overlay for refinance.

### Step 3: Property Type
- **Question**: "What type of property are you purchasing?"
- **Options**: 2x2 grid of cards: Single Family Home, Townhome, Condominium, Multi-Family Home.
- **Icons**: Custom SVG line-art for each (house with chimney, narrow house with window grid, tall building with window rows, duplex with vertical divider).
- **Selection state**: Selected card fills with blue-600 background, white text/icons. Unselected cards have gray border with blue text.
- **Behavior**: Auto-advances on click.

### Step 4: Property Use
- **Question**: "How will this property be used?"
- **Options**: 3 cards in a row (stack on mobile): Primary Residence (house with dots), Second Home (palm tree icon), Investment Or Rental (hand with key icon).
- **Wrapped in a white card** with shadow and border.
- **Behavior**: Auto-advances on click.

### Step 5: First-Time Buyer
- **Question**: "Is this your first time purchasing property?"
- **Options**: Two cards: Yes (circle with checkmark) and No (circle with X).
- **Wrapped in a white card**.
- **Behavior**: Auto-advances on click.

### Step 6: Buying Stage
- **Question**: "Where are you in the homebuying process?"
- **Options**: Vertical stack of full-width buttons: "Offer Accepted by Seller", "Making Offers", "Going to Open Houses", "Researching Options".
- **Selection state**: Selected gets blue border + blue-50 background. Others are white with gray border.
- **Behavior**: Auto-advances on click.

### Step 7: Purchase Price
- **Question**: "What's the estimated purchase price of the property?"
- **Input**: Dollar amount text field with formatted display (e.g., "$540,000") + clear button.
- **Slider**: Range input from $80K to $2M with a styled blue fill track and circular thumb. Custom CSS for slider thumb (blue circle with white border and shadow).
- **CTA**: "Continue" button.

### Step 8: Down Payment
- **Question**: "What is your estimated down payment?"
- **Helper text**: "Putting at least 20% down will help you avoid private mortgage insurance, though some lenders will let you put as little as 3% down."
- **Options**: Three vertical full-width buttons: "Less than 20%", "20%", "More than 20%".
- **Behavior**: Auto-advances on click.

### Step 9: Soft Credit Check (Pre-Qualification Gate)
This is the most complex step with 3 sub-views:

**Default view**: Promotion card with gradient background (blue-50 to teal-50):
- Shield icon with "Free Soft Credit Check" heading and "No impact to your credit score" subtitle.
- Three benefit rows with icons: "More accurate rates" (Target icon), "Faster approval process" (Zap icon), "Know where you stand" (CheckCircle2 icon).
- Trust badges at bottom: "Bank-level security", "No hard inquiry", "100% free".
- Two CTAs: Primary "Get Pre-Qualified Now" button and secondary "Enter my credit score manually" button.

**SSN Input view** (after clicking Get Pre-Qualified): Lock icon header, form with:
- Last 4 digits of SSN (centered, tracking-widest, numeric only, max 4).
- Date of birth (date input).
- Checkbox for terms agreement.
- "256-bit SSL encryption protects your data" badge.
- "Verify My Credit" button (disabled until all fields valid).

**Processing view**: Spinning circle animation with Shield icon in center, "Securely verifying your credit" heading, bouncing dots animation. After 2 seconds, simulates returning verified credit data:
- `verifiedCreditScore: "740-759"`
- `totalMonthlyDebt: 1850`
- `latePayments24Months: 0`
- `oldestAccountAge: 8`

If user clicks "Enter my credit score manually", sets `softCreditCheckCompleted: false` and advances.

### Step 10: Credit Score
Two modes based on `isVerified` prop:

**Verified mode** (soft check completed):
- Green gradient header with shield/checkmark: "Your verified credit score" with the score range shown large.
- Description text for the score category.
- "Credit Report Insights" section: 3-column grid (stack on mobile) showing:
  - **Debt-to-Income**: Calculated as `(totalMonthlyDebt / (annualIncome / 12)) * 100`. Color-coded: <36% green "Excellent", <43% yellow "Acceptable", 43%+ orange "High". Shows monthly debt amount.
  - **Payment History**: Shows "Perfect" (green) for 0 late payments, count + "Late" for others. Subtext "Last 24 months".
  - **Credit History**: Shows years with "Well Established" (7+), "Building" (3+), or "New" labels.
- "Continue with verified score" button.

**Manual mode** (soft check skipped):
- Custom vertical slider UI (NOT a native range input). This is a tall vertical track with score ranges listed alongside.
- The slider has a background gradient track: orange at top (lower scores) to teal/green at bottom (higher scores).
- Score ranges displayed alongside: 580-619 at top to 780+ at bottom.
- Each score has a label: "Excellent" (780+, 760-779), "Very Good" (740-759, 720-739), "Good" (700-719, 680-699), "Building" (660-679, 640-659), "Emerging" (620-639, 580-619).
- Draggable thumb with touch support (handleTouchStart, handleTouchMove, handleTouchEnd, handleMouseDown, handleMouseMove, handleMouseUp with useEffect for global listeners).
- Score color dots/badges that change color based on position.
- "Continue" button.

### Step 11: Military Status
- **Question**: "Are you or your spouse an active military member, reserve member or veteran?"
- **Options**: Two cards: Yes (circle checkmark) and No (circle X).
- **Behavior**: Auto-advances on click.

### Step 12: Employment Status
- **Question**: "What's your employment status?"
- **Options**: 2-column grid: Employed, Not Employed, Self Employed, Military, Retired, Other.
- **Behavior**: Auto-advances on click.

### Step 13: Bankruptcy History
- **Question**: "Have you filed for bankruptcy or foreclosure in the last four years?"
- **Options**: Two cards: Yes and No, with circle icons (checkmark and X).
- **Behavior**: Auto-advances on click.

### Step 14: Annual Income
- **Question**: "What is the gross annual income of the borrower or borrowers?"
- **Input**: Dollar amount with formatted display + clear button.
- **Slider**: Range from $0 to $250K, blue fill track, same custom thumb styling.
- **CTA**: "Continue" button.

### Step 15: Matching Quotes
- **Header**: "We found other quotes that match your criteria" with subtitle "Select up to 2 additional offers with no impact to your credit score."
- **Cards**: Horizontal row (stack on mobile):
  - First card is the original lender selection (blue border, "Your Selection" badge).
  - Additional lender cards with checkbox in top-right corner. Each shows lender name, NMLS, state license, star rating with half-star support.
  - "Show more quotes" button to reveal additional lenders.
- Max 2 additional selections.
- Legal disclaimer text about electronic signature and consent.
- Two CTAs: "Continue with top N quotes" and "I only want my original quote".

### Step 16: Contact Info
- **Question**: "Where should we send your quote(s)?"
- **Form fields**: First Name, Last Name, Email Address, Phone Number (auto-formatted as (XXX) XXX-XXXX).
- **Validation**: All fields required. Email format check. Phone must be 10 digits.
- **Bankrate Insiders opt-in**: A collapsible card with checkbox. When checked, expands to show benefits:
  - "Call Shield" - route lender calls through Bankrate
  - "Smart Alerts" - notifications before calls
  - "One-Tap Block" - block lenders instantly
  - Shows "Your private number stays hidden from lenders"
- Privacy disclaimer text with link.
- "Agree and Continue" button.
- Security message at bottom with lock icon.

### Confirmation Step (Post Step 16)
This is the most feature-rich screen. It generates personalized quotes based on all collected data.

**Quote generation logic**: Based on credit score, down payment, loan amount, property use, employment status, and military status, generate rate quotes per lender with:
- Base rate ~6.125%, adjusted by credit score (-0.25 for 780+ to +0.5 for 580-619)
- Down payment adjustment (-0.125 for >20%, +0.125 for <20%)
- Property use adjustment (+0.25 for investment, +0.125 for second home)
- Random per-lender variance (-0.15 to +0.15)
- APR = rate + 0.15 to 0.35
- Monthly payment calculated with standard amortization formula
- Points (0 to 1.5)
- Closing costs ($2500 to $6000)

**Pre-Qualification determination**: User is "pre-qualified" if they went through soft credit check AND credit score >= 700 AND DTI < 43% AND no bankruptcy.

**Screen sections**:
1. **Pre-Qualification banner**: Green gradient for pre-qualified, yellow for "conditional", blue for standard. Shows status, user name, amount qualified for, and expiration date.
2. **Pre-Qualification Letter card** (pre-qualified only): Card with "View Letter" and "Download PDF" buttons. "View Letter" opens a full-screen modal with a formal pre-qualification letter (official letterhead style, includes all loan details, terms, and signatures). The letter modal has zoom in/out and close controls.
3. **Loan Summary Banner**: Shows Loan Amount, Rate, Term, and Est. Monthly Payment in a grid.
4. **Lender Quote Cards**: Expandable cards for each lender showing rate, APR, monthly payment, points, closing costs, term. Each has "Contact Lender" button. Cards expand to show cost breakdown (Principal & Interest, Est. PMI, Est. Taxes, Est. Insurance, Total).
5. **Rate Comparison Table**: Tabular comparison of all quotes side by side.
6. **Next Steps section**: Numbered list of what to do next.
7. **Helpful Resources**: Links to related content.
8. **Footer actions**: "Start Over" and "Save Results" buttons.

---

## UI PATTERNS & STYLING

### Color System (Bankrate Brand)
- Primary: blue-600 (#0157FF)
- Blue-900 (#00143D) for dark text
- Teal-500 (#00A391) for positive/success states
- Coral-500 (#E5665E) for errors/negative
- Yellow-200 (#FFDD83) for highlights
- Blue-50 (#F6FAFF) for light backgrounds
- Gradients: blue-2 (#0157FF to #013497) for progress bar

### Typography
- Font: Circular Std (loaded via @font-face from hosted OTF files)
- Headings: text-xl sm:text-2xl font-bold
- Body: text-sm sm:text-base
- Labels: text-xs font-medium uppercase tracking-wider

### Component Patterns
- **Card selection buttons**: `border-2 rounded-xl transition-all` with hover and selected states
- **Selected state**: `bg-blue-600 border-blue-600 text-white`
- **Unselected state**: `border-gray-200 hover:border-blue-400 hover:bg-blue-50`
- **Text input fields**: `border-2 border-gray-300 rounded-lg px-4 py-4 focus:border-blue-500`
- **Primary buttons**: `bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700`
- **Back buttons**: `text-blue-600 hover:text-blue-700 font-medium` (text only, centered below content)
- **Range sliders**: Custom styled with `style jsx` for thumb appearance

### Responsive
- Mobile-first design
- Cards stack vertically on mobile, go horizontal on sm+
- Max widths: most steps use max-w-xl or max-w-2xl, matching quotes uses max-w-4xl
- Padding adjusts: p-6 on mobile, sm:p-10 on desktop

### Icons
- All property/loan type icons are custom inline SVGs (line-art style, stroke-based, viewBox="0 0 64 64")
- UI icons use Lucide React (Shield, Lock, CheckCircle2, ChevronRight, Star, etc.)
- Icon sizing: w-12 h-12 sm:w-16 sm:h-16 for card icons, w-4/w-5 for inline icons

---

## CRITICAL BEHAVIORS

1. **Scroll reset on step change**: The layout's main content area MUST scroll to top when `currentStep` changes.
2. **Auto-advance**: Single-choice steps (loan type, property type, property use, first-time buyer, buying stage, down payment, military, employment, bankruptcy) auto-advance immediately on selection - no "Continue" button.
3. **Slider steps** (purchase price, annual income, credit score manual): These require a "Continue" button since the user needs to adjust the value.
4. **Soft credit check branching**: Step 9 either collects SSN/DOB for a simulated soft pull or allows manual entry. Step 10 renders differently based on which path was taken.
5. **Prefilled demo data**: All form fields should be prefilled with realistic values so the entire flow can be demoed by just clicking through.
6. **Quote generation**: The confirmation step generates dynamic quotes based on all collected user data, not hardcoded values.
7. **Pre-qualification logic**: Determined by credit score, DTI, soft check completion, and bankruptcy status.
