"use client"

import { Heart } from "lucide-react"
import { useState } from "react"

interface DonationBannerProps {
  onDismiss?: () => void
}

export default function DonationBanner({ onDismiss }: DonationBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false)

  if (isDismissed) return null

  const handleDismiss = () => {
    setIsDismissed(true)
    onDismiss?.()
  }

  return (
    <div className="bg-gradient-to-r from-red-900/30 to-pink-900/30 border border-red-700/50 rounded-lg p-4 flex items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3 flex-1">
        <Heart className="w-5 h-5 text-red-400 flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold text-red-300">Love this project?</p>
          <p className="text-xs text-red-200 mt-0.5">Support development with a donation on PayPal</p>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <a
          href="https://www.paypal.com/paypalme/basilbenny12"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium transition-colors"
        >
          <Heart className="w-4 h-4" />
          Donate
        </a>
        <button
          onClick={handleDismiss}
          className="p-1.5 hover:bg-slate-700 rounded transition-colors text-slate-400 hover:text-slate-300"
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
