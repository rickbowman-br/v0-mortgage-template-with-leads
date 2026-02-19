"use client"

import React from "react"

import type { StepProps } from "../types"
import { useState } from "react"
import { Lock, Shield, PhoneOff, Bell, X, Check } from "lucide-react"

export function ContactInfoStep({ data, updateData, onNext, onBack }: StepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Format phone number as user types
  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10)
    if (digits.length === 0) return ""
    if (digits.length <= 3) return `(${digits}`
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    updateData({ phone: formatted })
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!data.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!data.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    if (!data.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    const phoneDigits = data.phone.replace(/\D/g, "")
    if (!phoneDigits) {
      newErrors.phone = "Phone number is required"
    } else if (phoneDigits.length !== 10) {
      newErrors.phone = "Please enter a valid 10-digit phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onNext()
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-8 text-center text-balance">
        Where should we send your quote(s)?
      </h2>

      <div className="flex flex-col gap-5">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block text-xs font-medium text-blue-700 uppercase tracking-wider mb-2">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            value={data.firstName}
            onChange={(e) => updateData({ firstName: e.target.value })}
            className={`w-full px-4 py-4 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1 ${
              errors.firstName ? "border-coral-500 focus:border-coral-500" : "border-blue-200 focus:border-blue-600"
            }`}
          />
          {errors.firstName && <p className="text-coral-500 text-sm mt-1">{errors.firstName}</p>}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block text-xs font-medium text-blue-700 uppercase tracking-wider mb-2">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            value={data.lastName}
            onChange={(e) => updateData({ lastName: e.target.value })}
            className={`w-full px-4 py-4 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1 ${
              errors.lastName ? "border-coral-500 focus:border-coral-500" : "border-blue-200 focus:border-blue-600"
            }`}
          />
          {errors.lastName && <p className="text-coral-500 text-sm mt-1">{errors.lastName}</p>}
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="email" className="block text-xs font-medium text-blue-700 uppercase tracking-wider mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            className={`w-full px-4 py-4 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1 ${
              errors.email ? "border-coral-500 focus:border-coral-500" : "border-blue-200 focus:border-blue-600"
            }`}
          />
          {errors.email && <p className="text-coral-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phone" className="block text-xs font-medium text-blue-700 uppercase tracking-wider mb-2">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={handlePhoneChange}
            placeholder="(   )   -"
            className={`w-full px-4 py-4 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1 ${
              errors.phone ? "border-coral-500 focus:border-coral-500" : "border-blue-200 focus:border-blue-600"
            }`}
          />
          {errors.phone && <p className="text-coral-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        {/* Bankrate Insiders - Phone Protection */}
        <div 
          className={`rounded-xl border-2 overflow-hidden transition-all ${
            data.bankrateInsiders 
              ? "border-teal-500 bg-teal-50" 
              : "border-blue-200 bg-white hover:border-blue-300"
          }`}
        >
          {/* Header */}
          <button
            type="button"
            onClick={() => updateData({ bankrateInsiders: !data.bankrateInsiders })}
            className="w-full p-4 flex items-start gap-3 text-left"
          >
            <div className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center mt-0.5 transition-colors ${
              data.bankrateInsiders 
                ? "bg-teal-500 border-teal-500" 
                : "border-blue-300 bg-white"
            }`}>
              {data.bankrateInsiders && <Check className="w-4 h-4 text-white" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-blue-900">Protect My Phone Number</span>
                <span className="bg-teal-100 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Free
                </span>
              </div>
              <p className="text-sm text-blue-700">
                Join Bankrate Insiders to control when lenders can call you
              </p>
            </div>
          </button>

          {/* Expanded Benefits */}
          {data.bankrateInsiders && (
            <div className="px-4 pb-4 pt-0">
              <div className="bg-white rounded-lg p-4 border border-teal-200">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-teal-600" />
                  <span className="font-semibold text-blue-900 text-sm">Bankrate Insiders Benefits</span>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <PhoneOff className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-800">
                      <strong className="text-blue-900">Call Shield:</strong> Lender calls route through us - block or allow anytime
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Bell className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-800">
                      <strong className="text-blue-900">Smart Alerts:</strong> Get notified before each call with lender details
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <X className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-800">
                      <strong className="text-blue-900">One-Tap Block:</strong> Stop calls from any lender instantly
                    </span>
                  </li>
                </ul>
                <div className="mt-3 pt-3 border-t border-teal-100 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">B</span>
                  </div>
                  <div className="text-xs text-blue-600">
                    Your private number stays hidden from lenders
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Privacy Disclaimer */}
        <p className="text-blue-700 text-sm leading-relaxed">
          By opting in, you agree to receive occasional emails about new features, offers, and updates from Bankrate.
          You can unsubscribe at any time. See our{" "}
          <a href="#" className="text-blue-600 underline hover:text-blue-500 transition-colors">
            Privacy Policy
          </a>{" "}
          for details.
        </p>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          Agree and Continue
        </button>

        {/* Back Button */}
        <div className="text-center">
          <button 
            type="button"
            onClick={onBack} 
            className="text-blue-600 hover:text-blue-700 font-medium text-base transition-colors"
          >
            Back
          </button>
        </div>
      </div>

      {/* Security Message */}
      <div className="mt-10 pt-6 border-t border-blue-100">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-3">
            <Lock className="w-6 h-6 text-teal-600" aria-hidden="true" />
          </div>
          <p className="text-blue-800 text-sm leading-relaxed max-w-md">
            Your security is our top priority. We use advanced encryption technology to keep your personal information
            safe.
          </p>
        </div>
      </div>
    </div>
  )
}
