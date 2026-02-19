import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { FeedbackWrapper } from "@/components/fountain/feedback-wrapper"

export const metadata: Metadata = {
  title: "Bankrate | Compare Mortgage Rates Today",
  description: "Compare current mortgage rates from top lenders. Get personalized quotes and find the best rates for your home purchase or refinance.",
  generator: "Bankrate",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Bankrate | Compare Mortgage Rates Today",
    description: "Compare current mortgage rates from top lenders. Get personalized quotes and find the best rates for your home purchase or refinance.",
    url: "https://bankrate.com",
    siteName: "Bankrate",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en-US",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#0157FF",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="antialiased">
      <body className="font-sans">
        <FeedbackWrapper>
          {children}
        </FeedbackWrapper>
      </body>
    </html>
  )
}
