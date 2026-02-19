"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronUp } from "lucide-react"

export function HeroContent() {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)

  return (
    <section className="text-white bg-blue-900 relative pb-0">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 pb-4 sm:pb-6 pt-4 sm:pt-8">
        {/* Breadcrumb and Advertiser Disclosure */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-8 gap-3 sm:gap-0">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-blue-300" aria-label="Breadcrumb">
            <span>Mortgages</span>
            <span aria-hidden="true">{">"}</span>
            <span className="text-white">Mortgage Rates</span>
          </nav>
          <div className="hidden sm:flex items-center gap-6">
            <a href="#" className="text-sm text-blue-300 hover:text-blue-200 transition-colors">
              Advertiser Disclosure
            </a>
            <a href="#" className="text-sm text-blue-300 hover:text-blue-200 transition-colors">
              Bankrate Promise
            </a>
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-4 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white text-balance">
            Compare current mortgage rates for today
          </h1>
        </div>

        {/* Author Information */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-center sm:gap-4 mb-4 sm:mb-8 gap-3">
          <div className="flex -space-x-2">
            <Image
              src="/images/jeff-ostrowski.webp"
              alt="Jeff Ostrowski"
              width={40}
              height={40}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-blue-800 object-cover"
            />
            <Image
              src="/images/suzanne-de-vita.webp"
              alt="Suzanne De Vita"
              width={40}
              height={40}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-blue-800 object-cover"
            />
            <Image
              src="/images/mark-hamrick.webp"
              alt="Mark Hamrick"
              width={40}
              height={40}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-blue-800 object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="text-xs sm:text-sm text-white text-left">
              <span className="text-blue-100">Written by </span>
              <span className="underline font-medium text-blue-300 cursor-pointer hover:text-blue-200 transition-colors">
                Jeff Ostrowski
              </span>
              <span className="sm:hidden text-blue-100"> + 2 others</span>
              <span className="hidden sm:inline text-blue-100">, Edited by </span>
              <span className="hidden sm:inline underline font-medium text-blue-300 cursor-pointer hover:text-blue-200 transition-colors">
                Suzanne De Vita
              </span>
              <span className="hidden sm:inline text-blue-100">, Reviewed by </span>
              <span className="hidden sm:inline underline font-medium text-blue-300 cursor-pointer hover:text-blue-200 transition-colors">
                Mark Hamrick
              </span>
              <span className="hidden sm:inline text-blue-100">, </span>
              <span className="inline-flex items-center ml-2 sm:ml-0">
                <Image
                  src="/images/badge.svg"
                  alt="Expert Verified Badge"
                  width={14}
                  height={14}
                  className="sm:w-4 sm:h-4 mr-1"
                />
                <span className="text-teal-300 underline text-xs sm:text-sm hover:text-teal-200 transition-colors cursor-pointer">
                  Expert verified
                </span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-blue-100 mt-1">
              Updated on{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Body Text */}
        <div className="text-left sm:text-center mb-4 sm:mb-8">
          <p className="sm:text-base text-blue-100 leading-relaxed max-w-4xl mx-auto text-xs">
            On{" "}
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
            , the national average 30-year fixed mortgage APR is 6.40%. The average 15-year fixed mortgage APR is 5.76%,
            according to Bankrate's latest survey of the nation's largest mortgage lenders.
          </p>
        </div>

        {/* Footer Disclaimer - On This Page */}
        <div className="border-0 pt-0">
          <div
            className="flex cursor-pointer justify-start border-l-2 border-[rgba(255,221,131,1)] px-3 ml-0 flex-row items-center"
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            onKeyDown={(e) => e.key === "Enter" && setIsAccordionOpen(!isAccordionOpen)}
            role="button"
            tabIndex={0}
          >
            <p className="text-xs sm:text-sm text-white leading-relaxed max-w-5xl font-bold tracking-widest">
              ON THIS PAGE
            </p>
            <ChevronUp
              className={`h-4 w-4 sm:h-5 sm:w-5 text-[#80ABFF] mt-1 flex-shrink-0 ml-4 transition-transform duration-200 text-background ${
                isAccordionOpen ? "" : "rotate-180"
              }`}
            />
          </div>
          {isAccordionOpen && (
            <div className="px-3 pb-4 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
                <div className="space-y-3">
                  <a href="#national-mortgage-trends" className="block text-sm text-white hover:text-blue-200 underline">
                    National mortgage interest rate trends
                  </a>
                  <a href="#mortgage-news" className="block text-sm text-white hover:text-blue-200 underline">
                    Mortgage news this week
                  </a>
                </div>
                <div className="space-y-3">
                  <a href="#compare-rates" className="block text-sm text-white hover:text-blue-200 underline">
                    How to compare mortgage rates
                  </a>
                  <a href="#rate-factors" className="block text-sm text-white hover:text-blue-200 underline">
                    Factors that determine your mortgage rate
                  </a>
                </div>
                <div className="space-y-3">
                  <a href="#refinance-guide" className="block text-sm text-white hover:text-blue-200 underline">
                    How to refinance your current mortgage
                  </a>
                  <a href="#mortgage-faq" className="block text-sm text-white hover:text-blue-200 underline">
                    Mortgage FAQ
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
