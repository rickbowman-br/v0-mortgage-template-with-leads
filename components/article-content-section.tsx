"use client"

import { useState, useEffect } from "react"

export function ArticleContentSection() {
  const [activeTab, setActiveTab] = useState<"mortgages" | "refinance">("mortgages")
  const [activeSection, setActiveSection] = useState("national-mortgage-trends")

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "national-mortgage-trends",
        "mortgage-news",
        "compare-rates",
        "rate-factors",
        "refinance-guide",
        "mortgage-faq",
      ]

      const scrollPosition = window.scrollY + 200

      // Find active section based on scroll position
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i])
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="article-content-section" className="bg-blue-50 py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Table of Contents */}
          <div className="hidden lg:block w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-8">
              <div className="bg-background rounded-lg p-6 border border-blue-100 shadow-sm">
                <h3 className="text-lg font-bold text-blue-900 mb-6 uppercase tracking-wider">On this page</h3>
                <nav className="flex flex-col gap-4" aria-label="Page sections">
                  {[
                    { id: "national-mortgage-trends", label: "National mortgage interest rate trends" },
                    { id: "mortgage-news", label: "Mortgage news this week" },
                    { id: "compare-rates", label: "How to compare mortgage rates" },
                    { id: "rate-factors", label: "Factors that determine your mortgage rate" },
                    { id: "refinance-guide", label: "How to refinance your current mortgage" },
                    { id: "mortgage-faq", label: "Mortgage FAQ" },
                  ].map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-sm leading-relaxed transition-colors ${
                        activeSection === item.id
                          ? "text-blue-600 font-medium border-l-2 border-blue-600 pl-3 -ml-3"
                          : "text-blue-800 hover:text-blue-600"
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-background rounded-lg p-8 sm:p-8 px-4 sm:px-8 border border-blue-100 shadow-sm">
              {/* Main Heading */}
              <h2 id="national-mortgage-trends" className="text-3xl sm:text-4xl font-bold text-blue-900 mb-6 sm:mb-8 text-balance">
                Weekly national mortgage interest rate trends
              </h2>

              {/* Tabs */}
              <div className="flex border-b border-blue-200 mb-6 sm:mb-8">
                <button
                  type="button"
                  onClick={() => setActiveTab("mortgages")}
                  className={`px-6 py-3 font-medium transition-colors ${
                    activeTab === "mortgages"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-blue-800 hover:text-blue-600"
                  }`}
                >
                  Mortgages
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("refinance")}
                  className={`px-6 py-3 font-medium transition-colors ${
                    activeTab === "refinance"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-blue-800 hover:text-blue-600"
                  }`}
                >
                  Refinance
                </button>
              </div>

              {/* Chart and Legend Container */}
              <div className="flex flex-col lg:flex-row gap-8 mb-8">
                {/* Chart Area */}
                <div className="flex-1">
                  <div className="h-80 bg-blue-50 rounded-lg p-6 relative border border-blue-100">
                    {/* Y-axis labels */}
                    <div className="absolute left-2 top-6 bottom-12 flex flex-col justify-between text-xs text-blue-700">
                      <span>7.50%</span>
                      <span>7.00%</span>
                      <span>6.50%</span>
                      <span>6.00%</span>
                      <span>5.50%</span>
                      <span>5.00%</span>
                    </div>

                    {/* Chart content */}
                    <div className="ml-12 mr-4 h-full relative">
                      {/* Grid lines */}
                      <div className="absolute inset-0 flex flex-col justify-between">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="border-t border-blue-200" />
                        ))}
                      </div>

                      {/* Sample trend lines */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200" aria-hidden="true">
                        {/* 30 year fixed - blue line */}
                        <path d="M 0 40 Q 75 35 150 45 Q 225 50 300 60" stroke="#0157FF" strokeWidth="2" fill="none" />
                        {/* 15 year fixed - teal line */}
                        <path d="M 0 80 Q 75 75 150 85 Q 225 90 300 100" stroke="#00A391" strokeWidth="2" fill="none" />
                        {/* 10 year fixed - lavender line */}
                        <path
                          d="M 0 90 Q 75 85 150 95 Q 225 100 300 110"
                          stroke="#9B4F8F"
                          strokeWidth="2"
                          fill="none"
                        />
                        {/* 5/1 ARM - light blue line */}
                        <path
                          d="M 0 100 Q 75 95 150 105 Q 225 110 300 120"
                          stroke="#548DFF"
                          strokeWidth="2"
                          fill="none"
                        />
                      </svg>
                    </div>

                    {/* X-axis labels */}
                    <div className="absolute bottom-2 left-12 right-4 flex justify-between text-xs text-blue-700">
                      <span>Jun</span>
                      <span>Jul</span>
                      <span>Aug</span>
                      <span>Sep</span>
                    </div>
                  </div>
                </div>

                {/* Current Rates Legend */}
                <div className="w-full lg:w-64 flex-shrink-0">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">Current mortgage rates</h3>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-600" />
                        <span className="text-sm text-blue-800">30 year fixed</span>
                      </div>
                      <span className="font-semibold text-blue-900">6.27%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-teal-500" />
                        <span className="text-sm text-blue-800">15 year fixed</span>
                      </div>
                      <span className="font-semibold text-blue-900">5.49%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-lavender-600" />
                        <span className="text-sm text-blue-800">10 year fixed</span>
                      </div>
                      <span className="font-semibold text-blue-900">5.64%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-400" />
                        <span className="text-sm text-blue-800">5/1 ARM</span>
                      </div>
                      <span className="font-semibold text-blue-900">5.51%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Explanatory Text */}
              <div className="mb-12">
                <p className="text-gray-700 leading-relaxed">
                  For today,{" "}
                  {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}, the
                  current average 30-year fixed mortgage interest rate is 6.33%. If you're looking to refinance your
                  current mortgage, today's average 30-year fixed refinance interest rate is 6.67%. Meanwhile, today's
                  average 15-year refinance interest rate is 6.04%. Whether you need a mortgage now or plan to get one
                  in the next year or two, it's crucial to compare offers. Bankrate can connect you with current offers
                  on various types of loans, often well below the national average. We display the lender's interest
                  rate, APR (rate plus costs) and estimated monthly payment to help you more easily find the best
                  mortgage for your needs.
                </p>
              </div>

              {/* Mortgage Rate News Section */}
              <div id="mortgage-news" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Mortgage rate news this week -{" "}
                  {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </h2>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Mortgage rates rebound despite Fed's rate cut
                </h3>

                <p className="text-gray-700 leading-relaxed mb-4">
                  As expected, the Federal Reserve cut rates a quarter point last week. And in a repeat of last year's
                  pattern, mortgage rates zigged when the central bank zagged. This week, rates on 30-year, fixed-rate
                  loans averaged 6.39 percent, according to Bankrate's latest lender{" "}
                  <a href="#" className="text-blue-600 underline">
                    survey
                  </a>
                  , up from last week's 6.30 percent reading.
                </p>

                <p className="text-gray-700 leading-relaxed mb-8">
                  The movement served as another reminder that borrowers shouldn't focus too much on what the Fed does:
                  The main driver of mortgage rates is not the central bank but 10-year Treasury yields, which briefly
                  dipped below 4 percent last week, after being near 4.5 percent earlier in the year. They're in the
                  neighborhood of 4.1 percent now.
                </p>
              </div>

              {/* Bankrate's Mortgage Rate Variability Index */}
              <div className="flex flex-col lg:flex-row items-start gap-8 mb-12">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Bankrate's Mortgage Rate Variability Index
                  </h3>

                  <p className="text-gray-700 leading-relaxed mb-4">
                    The Mortgage Rate Variability Index reads 7 out of 10 as of{" "}
                    {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}, down
                    from 8 last week. Our index ranks variability from a low of 1 to a high of 10, with lower readings
                    reflecting more consistency in loan offers.
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-4">
                    What does that mean for you as a borrower? In this case, the volatility is welcome news: Mortgage
                    rates have dropped in recent weeks, falling to 6.30 percent. This movement occurred after a tepid
                    jobs report and a rate cut by the Federal Reserve. Mortgage rates are near their lowest levels in a
                    year. When the variability index shows uncertainty, as it does now, you're more likely to find
                    dramatic differences in lender offers, so that means you should shop around for the best mortgage
                    deal.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    This period of higher variability reflects a long-awaited decline in mortgage rates. Since late
                    February {new Date().getFullYear()}, the average 30-year mortgage rate in Bankrate's weekly survey
                    had trended no higher than 6.95 percent and no lower than 6.72 percent. That cycle finally broke in
                    August, and now the average rate is nearing 6.25 percent.
                  </p>
                </div>

                {/* Rate Variability Index Gauge */}
                <div className="w-32 flex-shrink-0 mx-auto lg:mx-0">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full border-8 border-gray-200 relative">
                      {/* Gauge segments */}
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: `conic-gradient(from 0deg, #FFA500 0deg ${(7 / 10) * 180}deg, #E5E7EB ${(7 / 10) * 180}deg 180deg)`,
                        }}
                      ></div>
                      <div className="absolute inset-2 bg-white rounded-full flex flex-col items-center justify-center">
                        <div className="text-xs text-gray-600 font-medium">RATE</div>
                        <div className="text-xs text-gray-600 font-medium">VARIABILITY</div>
                        <div className="text-xs text-gray-600 font-medium">INDEX</div>
                        <div className="text-3xl font-bold text-gray-900 mt-1">7</div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 mt-2">
                      <span>0</span>
                      <span>10</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compare Rates Section */}
              <div id="compare-rates" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How to compare mortgage rates</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When comparing mortgage rates, it's important to look beyond just the interest rate. Consider the
                  Annual Percentage Rate (APR), which reflects the yearly cost of a mortgage, including the interest
                  rate plus any fees or other costs associated with the loan. Also, pay attention to the loan term,
                  points, and any associated fees. Bankrate's comparison tool helps you see all these details
                  side-by-side.
                </p>
              </div>

              {/* Rate Factors Section */}
              <div id="rate-factors" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Factors that determine your mortgage rate</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Several factors influence your mortgage rate, including your credit score, debt-to-income ratio,
                  loan-to-value ratio, the type of mortgage you choose, and current market conditions. A higher credit
                  score and a larger down payment generally lead to lower rates.
                </p>
              </div>

              {/* Refinance Guide Section */}
              <div id="refinance-guide" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How to refinance your current mortgage</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Refinancing your mortgage can help you lower your interest rate, reduce your monthly payments, or
                  shorten your loan term. The process typically involves applying for a new loan, undergoing an
                  appraisal, and closing on the new mortgage. It's essential to compare offers from multiple lenders to
                  ensure you get the best deal.
                </p>
              </div>

              {/* Mortgage FAQ Section */}
              <div id="mortgage-faq">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Mortgage FAQ</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>What is an APR?</strong> APR stands for Annual Percentage Rate, which reflects the yearly
                      cost of a mortgage, including the interest rate plus any fees or other costs.
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>What are points?</strong> Points are fees paid directly to the lender at closing in
                      exchange for a reduction in the interest rate. One point equals 1 percent of the loan amount.
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Should I get a fixed-rate or adjustable-rate mortgage?</strong> A fixed-rate mortgage has
                      the same interest rate for the life of the loan, providing payment stability. An adjustable-rate
                      mortgage (ARM) typically starts with a lower interest rate that can change over time, potentially
                      increasing your payments.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
