"use client"

import type React from "react"
import { useRef, useEffect } from "react"

import Image from "next/image"
import Link from "next/link"
import { X } from "lucide-react"
import { TOTAL_STEPS } from "./types"

interface LeadFlowLayoutProps {
  children: React.ReactNode
  currentStep: number
  totalFormSteps: number
  onClose: () => void
  lenderName?: string
}

export function LeadFlowLayout({ children, currentStep, totalFormSteps, onClose, lenderName }: LeadFlowLayoutProps) {
  const mainContentRef = useRef<HTMLElement>(null)
  const isConfirmation = currentStep > totalFormSteps
  const progressPercentage = isConfirmation ? 100 : Math.round((currentStep / TOTAL_STEPS) * 100)

  // Scroll to top when step changes
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: "instant" })
    }
  }, [currentStep])

  return (
    <div className="fixed inset-0 z-50 flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-blue-100 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Bankrate Logo */}
            <div className="flex items-center gap-3">
              <Image
                src="https://bfletnsjftkxgijnmjdp.supabase.co/storage/v1/object/public/bankrate_logos/Bankrate%20Square.svg"
                alt="Bankrate"
                width={36}
                height={36}
                className="w-9 h-9"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-blue-900 leading-tight">Bankrate</span>
                <span className="text-[10px] text-blue-600 uppercase tracking-wider leading-tight font-medium">Mortgages</span>
              </div>
            </div>

            {/* Lender Logo */}
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-teal-600" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold text-teal-700 leading-tight">Sage</span>
                  <span className="text-[8px] text-blue-800 uppercase tracking-wider leading-tight">
                    Home Loans
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar - show after step 1, hide on confirmation */}
      {currentStep > 1 && !isConfirmation && (
        <div className="w-full bg-blue-50">
          <div
            className="h-1.5 bg-gradient-blue-2 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
          <div className="text-left text-xs text-blue-600 font-medium px-4 py-1">{progressPercentage}% complete</div>
        </div>
      )}

      {/* Main Content */}
      <main ref={mainContentRef} className="flex-1 overflow-y-auto">
        <div className="min-h-full flex flex-col items-center justify-center px-4 py-8 sm:py-12 bg-blue-50/30">
          {children}
        </div>
      </main>

      {/* Footer */}
      <LeadFlowFooter lenderName={lenderName} />

      {/* Close button (mobile) */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-50 p-2 bg-background rounded-full shadow-lg border border-blue-100 hover:bg-blue-50 sm:hidden transition-colors"
        aria-label="Close"
      >
        <X className="w-5 h-5 text-blue-900" />
      </button>
    </div>
  )
}

function LeadFlowFooter({ lenderName = "Sage Home Loans Corporation" }: { lenderName?: string }) {
  return (
    <footer className="border-t border-blue-100 bg-background py-3 sm:py-6">
      <div className="max-w-4xl mx-auto px-4">
        {/* Mobile: Compact single-line footer */}
        <div className="sm:hidden">
          <div className="flex items-center justify-center gap-3 text-[10px] text-blue-700">
            <Link href="#" className="hover:text-blue-600">Privacy</Link>
            <span className="text-blue-300">|</span>
            <Link href="#" className="hover:text-blue-600">Terms</Link>
            <span className="text-blue-300">|</span>
            <span>NMLS #1427381</span>
          </div>
          <p className="text-center text-[10px] text-blue-600 mt-1">
            &copy; {new Date().getFullYear()} Bankrate, LLC
          </p>
        </div>

        {/* Desktop: Full footer */}
        <div className="hidden sm:block">
          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">Follow us:</span>
            <Link href="#" className="text-blue-800 hover:text-blue-600 transition-colors" aria-label="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </Link>
            <Link href="#" className="text-blue-800 hover:text-blue-600 transition-colors" aria-label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </Link>
            <Link href="#" className="text-blue-800 hover:text-blue-600 transition-colors" aria-label="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </Link>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-blue-800 mb-3">
            <Link href="#" className="hover:text-blue-600 transition-colors">About Bankrate</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">License Information</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Terms of Use</Link>
          </div>

          {/* NMLS Info */}
          <p className="text-center text-[10px] text-blue-600">
            Bankrate, LLC NMLS #1427381 | {lenderName} NMLS #3304 | &copy; {new Date().getFullYear()} Bankrate, LLC
          </p>
        </div>
      </div>
    </footer>
  )
}
