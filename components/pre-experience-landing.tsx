"use client"

import { List, ChevronDown, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ComparisonOverlay from "./comparison-overlay"
import { ArticleContentSection } from "./article-content-section"
import { useState } from "react"
import { useFeedbackTrigger } from "@/components/fountain"
import type { FeedbackSurvey } from "@/components/fountain"

const pageFeedbackSurvey: FeedbackSurvey = {
  id: "page-thumbs-feedback",
  name: "Page Feedback",
  questions: [
    {
      id: "page-helpful",
      type: "thumbs",
      question: "Is this page helpful?",
      subtext: "Your feedback helps us improve our mortgage rate tools.",
      required: true,
    },
    {
      id: "page-improvement",
      type: "text",
      question: "Anything we could do better?",
      subtext: "Optional - but we'd love to hear your thoughts.",
      required: false,
    },
  ],
  trigger: { type: "scroll-depth", scrollDepth: 50, showOnce: true, cooldownDays: 7 },
  position: "bottom-right",
  followUp: { enabled: true, message: "Thanks for your feedback! It helps us make Bankrate better for everyone." },
}

export default function PreExperienceLanding() {
  const [isOnThisPageOpen, setIsOnThisPageOpen] = useState(false)

  useFeedbackTrigger({ survey: pageFeedbackSurvey, enabled: true })

  const today = new Date()
  const formattedDate = today.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })

  const tocLinks = [
    { id: "national-mortgage-trends", label: "Weekly national mortgage interest rate trends" },
    { id: "mortgage-news", label: "Mortgage rate news" },
    { id: "rate-variability", label: "Bankrate's Mortgage Rate Variability Index" },
    { id: "research-methodology", label: "Research methodology" },
    { id: "compare-rates", label: "Compare mortgage rates" },
    { id: "rate-factors", label: "What factors affect mortgage rates?" },
    { id: "refinance-guide", label: "Should I refinance my mortgage?" },
    { id: "mortgage-faq", label: "Mortgage FAQ" },
  ]

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Header */}
      <header className="bg-background border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Image
              src="https://bfletnsjftkxgijnmjdp.supabase.co/storage/v1/object/public/bankrate_logos/Bankrate%20Primary%20Logo%20-%20Blue.svg"
              alt="Bankrate"
              width={120}
              height={28}
              className="w-24 h-auto sm:w-28 md:w-32"
            />

            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-blue-900 hover:text-blue-600 font-medium transition-colors">
                Banking
              </a>
              <a href="#" className="text-blue-900 hover:text-blue-600 font-medium transition-colors">
                Mortgages
              </a>
              <a href="#" className="text-blue-900 hover:text-blue-600 font-medium transition-colors">
                Investing
              </a>
              <a href="#" className="text-blue-900 hover:text-blue-600 font-medium transition-colors">
                Credit cards
              </a>
              <a href="#" className="text-blue-900 hover:text-blue-600 font-medium transition-colors">
                Loans
              </a>
              <a href="#" className="text-blue-900 hover:text-blue-600 font-medium transition-colors">
                Home equity
              </a>
              <a href="#" className="text-blue-900 hover:text-blue-600 font-medium transition-colors">
                Insurance
              </a>
            </nav>

            <button className="text-blue-900 hover:text-blue-600 transition-colors" aria-label="Search">
              <Search className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-8 sm:py-12 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:mb-10 gap-3 sm:gap-0 mb-4">
            <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
              <a href="#" className="hover:underline text-blue-300 transition-colors">
                Mortgages
              </a>
              <span className="text-blue-400" aria-hidden="true">›</span>
              <span className="font-medium text-white">Mortgage Rates</span>
            </nav>
            <div className="flex items-center gap-4 sm:gap-6 text-sm">
              <a href="#" className="hover:underline text-xs text-blue-300 transition-colors">
                Advertiser Disclosure
              </a>
              <span className="text-blue-400" aria-hidden="true">|</span>
              <a href="#" className="hover:underline text-xs text-blue-300 transition-colors">
                Bankrate Promise
              </a>
            </div>
          </div>

          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-[56px] font-bold leading-tight text-white text-balance">
              Compare current mortgage rates for today
            </h1>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm mb-6 sm:mb-10 lg:mb-16">
            <div className="flex items-center gap-1 sm:gap-2">
              <Image
                src="/professional-headshot.png"
                alt="Jeff Ostrowski"
                width={32}
                height={32}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-blue-400"
              />
              <span className="text-blue-100">
                Written by <span className="font-medium text-white">Jeff Ostrowski</span>
              </span>
            </div>
            <span className="text-blue-400 hidden sm:inline" aria-hidden="true">|</span>
            <div className="flex items-center gap-1 sm:gap-2">
              <Image
                src="/professional-woman-headshot.png"
                alt="Suzanne De Vita"
                width={32}
                height={32}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-blue-400"
              />
              <span className="text-blue-100">
                Edited by <span className="font-medium text-white">Suzanne De Vita</span>
              </span>
            </div>
            <span className="text-blue-400 hidden sm:inline" aria-hidden="true">|</span>
            <div className="flex items-center gap-1 sm:gap-2">
              <Image
                src="/professional-man-headshot.png"
                alt="Mark Hamrick"
                width={32}
                height={32}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-blue-400"
              />
              <span className="text-blue-100">
                Reviewed by <span className="font-medium text-white">Mark Hamrick</span>
              </span>
            </div>
            <span className="text-blue-400" aria-hidden="true">|</span>
            <span className="text-blue-100">{formattedDate}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 lg:gap-8 items-start">
            {/* Left Column - White Card and On This Page */}
            <div className="flex flex-col gap-6">
              {/* White Card with CTA */}
              <div className="bg-background rounded-lg p-6 sm:p-10 lg:p-12 shadow-xl">
                <h2 className="font-bold text-blue-900 text-center text-xl sm:text-2xl mb-8 text-balance">
                  What type of home loan are you looking for?
                </h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/rates?type=purchase"
                    className="flex-1 bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition-colors text-center text-base shadow-sm"
                  >
                    Purchase
                  </Link>
                  <Link
                    href="/rates?type=refinance"
                    className="flex-1 bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition-colors text-center text-base shadow-sm"
                  >
                    Refinance
                  </Link>
                  <Link
                    href="/rates?type=purchase"
                    className="flex-1 bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition-colors text-center text-base shadow-sm"
                  >
                    View all rates
                  </Link>
                </div>
              </div>

              {/* On This Page Section */}
              <div className="bg-background rounded-lg p-6 sm:p-8 shadow-lg">
                <button
                  onClick={() => setIsOnThisPageOpen(!isOnThisPageOpen)}
                  className="flex items-center justify-between w-full text-left"
                  aria-expanded={isOnThisPageOpen}
                >
                  <div className="flex items-center gap-3">
                    <List className="w-6 h-6 text-blue-900" aria-hidden="true" />
                    <h3 className="text-base font-bold text-blue-900">On this page</h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-blue-900 transition-transform ${isOnThisPageOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>

                {isOnThisPageOpen && (
                  <nav className="mt-4 pt-4 border-t border-blue-100" aria-label="Page sections">
                    <ul className="flex flex-col gap-3">
                      {tocLinks.map((link) => (
                        <li key={link.id}>
                          <a
                            href={`#${link.id}`}
                            className="text-sm text-blue-800 hover:text-blue-600 transition-colors block"
                            onClick={() => setIsOnThisPageOpen(false)}
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}
              </div>
            </div>

            {/* Right Column - How It Works Sidebar */}
            <div className="bg-background rounded-lg p-6 shadow-lg lg:sticky lg:top-8">
              <h3 className="text-sm font-bold text-blue-900 tracking-wider pb-4 border-b border-blue-100 mb-4 uppercase">
                How it works
              </h3>
              <div className="flex flex-col gap-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                    <span className="text-teal-600 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 mb-1 text-base">Compare top rates</h4>
                    <p className="text-sm text-blue-800 leading-relaxed">See low rates from over 100+ lenders.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                    <span className="text-teal-600 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 mb-1 text-base">Select a lender</h4>
                    <p className="text-sm text-blue-800 leading-relaxed">Get custom quotes in under 2 minutes.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                    <span className="text-teal-600 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 mb-1 text-base">See your savings</h4>
                    <p className="text-sm text-blue-800 leading-relaxed">You could take hundreds off your mortgage.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ComparisonOverlay />

      {/* Article Content Section */}
      <ArticleContentSection />
    </div>
  )
}
