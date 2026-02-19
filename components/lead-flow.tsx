"use client"

import { useState } from "react"
import { LeadFlowLayout } from "./lead-flow/lead-flow-layout"
import { ZipCodeStep, LoanTypeStep, PropertyTypeStep, PropertyUseStep, FirstTimeBuyerStep, BuyingStageStep, PurchasePriceStep, DownPaymentStep, CreditScoreStep, SoftCreditCheckStep, MilitaryStatusStep, EmploymentStatusStep, BankruptcyHistoryStep, AnnualIncomeStep, MatchingQuotesStep, ContactInfoStep, ConfirmationStep } from "./lead-flow/steps"
import type { LenderInfo, LeadFlowData } from "./lead-flow/types"
import { initialLeadFlowData } from "./lead-flow/types"

interface LeadFlowProps {
  lender: LenderInfo
  onClose: () => void
  initialZipCode?: string
}

export default function LeadFlow({ lender, onClose, initialZipCode = "" }: LeadFlowProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<LeadFlowData>({
    ...initialLeadFlowData,
    zipCode: initialZipCode,
    lenderName: lender.lender,
  })

  const updateFormData = (updates: Partial<LeadFlowData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  const goToNextStep = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  // Common props for all steps
  const stepProps = {
    data: formData,
    updateData: updateFormData,
    onNext: goToNextStep,
    onBack: goToPreviousStep,
  }

  // Total steps before confirmation
  const TOTAL_FORM_STEPS = 16
  const isConfirmation = currentStep > TOTAL_FORM_STEPS

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <ZipCodeStep {...stepProps} />
      case 2:
        return <LoanTypeStep {...stepProps} />
      case 3:
        return <PropertyTypeStep {...stepProps} />
      case 4:
        return <PropertyUseStep {...stepProps} />
      case 5:
        return <FirstTimeBuyerStep {...stepProps} />
      case 6:
        return <BuyingStageStep {...stepProps} />
      case 7:
        return <PurchasePriceStep {...stepProps} />
      case 8:
        return <DownPaymentStep {...stepProps} />
      case 9:
        return <SoftCreditCheckStep {...stepProps} />
      case 10:
        return <CreditScoreStep {...stepProps} isVerified={formData.softCreditCheckCompleted === true} />
      case 11:
        return <MilitaryStatusStep {...stepProps} />
      case 12:
        return <EmploymentStatusStep {...stepProps} />
      case 13:
        return <BankruptcyHistoryStep {...stepProps} />
      case 14:
        return <AnnualIncomeStep {...stepProps} />
      case 15:
        return <MatchingQuotesStep {...stepProps} />
      case 16:
        return <ContactInfoStep {...stepProps} />
      // Add more steps here as needed
      default:
        // Show confirmation when all steps are complete
        return <ConfirmationStep {...stepProps} onClose={onClose} />
    }
  }

  return (
    <LeadFlowLayout 
      currentStep={currentStep} 
      totalFormSteps={TOTAL_FORM_STEPS}
      onClose={onClose} 
      lenderName={lender.lender}
    >
      {renderStep()}
    </LeadFlowLayout>
  )
}
