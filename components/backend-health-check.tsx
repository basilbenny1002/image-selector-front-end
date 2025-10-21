"use client"

import { Loader2, AlertCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"

interface BackendHealthCheckProps {
  isReady: boolean
  isChecking: boolean
  onRetry: () => void
}

export default function BackendHealthCheck({ isReady, isChecking, onRetry }: BackendHealthCheckProps) {
  const [showTimeout, setShowTimeout] = useState(false)

  useEffect(() => {
    if (isChecking) {
      const timer = setTimeout(() => {
        setShowTimeout(true)
      }, 60000) // 1 minute

      return () => clearTimeout(timer)
    } else {
      setShowTimeout(false)
    }
  }, [isChecking])

  if (isChecking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Card className="bg-white border border-blue-200 p-8 shadow-lg max-w-md w-full mx-4">
          <div className="flex flex-col items-center text-center">
            <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {showTimeout ? "Backend is not responding" : "Waiting for backend"}
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              {showTimeout
                ? "The backend server is taking longer than expected. Retrying..."
                : "This may take a moment on the free tier. Please wait."}
            </p>
            {showTimeout && (
              <p className="text-xs text-gray-500">
                Attempting to reconnect automatically. This usually takes 30-60 seconds.
              </p>
            )}
          </div>
        </Card>
      </div>
    )
  }

  if (isReady) {
    return null
  }

  return (
    <Card className="bg-red-50 border border-red-200 p-4 flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-red-900 font-semibold">Backend is not responding</p>
        <p className="text-sm text-red-800 mt-1">The backend server is currently unavailable. Please try again.</p>
      </div>
    </Card>
  )
}
