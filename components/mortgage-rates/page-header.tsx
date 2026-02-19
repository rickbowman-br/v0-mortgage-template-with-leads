"use client"

import Image from "next/image"
import { Search } from "lucide-react"

export function PageHeader() {
  return (
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
  )
}
