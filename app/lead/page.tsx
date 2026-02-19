"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Suspense } from "react"
import LeadFlow from "@/components/lead-flow"

function LeadFlowContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Get lender data from URL params
  const lenderData = {
    lender: searchParams.get("lender") || "Unknown Lender",
    nmls: searchParams.get("nmls") || "",
    rate: searchParams.get("rate") || "",
    term: searchParams.get("term") || "",
    apr: searchParams.get("apr") || "",
    points: searchParams.get("points") || "",
    payment: searchParams.get("payment") || "",
  }

  const initialZipCode = searchParams.get("zipCode") || ""

  const handleClose = () => {
    // Navigate back to rates page
    router.push("/rates?type=purchase")
  }

  return (
    <LeadFlow
      lender={lenderData}
      onClose={handleClose}
      initialZipCode={initialZipCode}
    />
  )
}

export default function LeadPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <LeadFlowContent />
    </Suspense>
  )
}
