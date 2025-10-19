"use client"

import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface BackendHealthCheckProps {
  isReady: boolean
  isChecking: boolean
  onRetry: () => void
}

export default function BackendHealthCheck({ isReady, isChecking, onRetry }: BackendHealthCheckProps) {
  if (isChecking) {
    return (
      <Card className="bg-blue-50 border border-blue-200 p-4 flex items-start gap-3">
        <Loader2 className="w-5 h-5 text-blue-600 animate-spin flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-blue-900 font-semibold">Waking up backend...</p>
          <p className="text-sm text-blue-800 mt-1">This may take a moment on the free tier. Please wait.</p>
        </div>
      </Card>
    )
  }

  if (isReady) {
    return (
      <Card className="bg-green-50 border border-green-200 p-4 flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-green-900 font-semibold">Backend is ready</p>
          <p className="text-sm text-green-800 mt-1">You can now upload and process your images.</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="bg-red-50 border border-red-200 p-4 flex items-start gap-3 justify-between">
      <div className="flex items-start gap-3 flex-1">
        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-red-900 font-semibold">Backend is not responding</p>
          <p className="text-sm text-red-800 mt-1">The backend server is currently unavailable. Please try again.</p>
        </div>
      </div>
      <Button onClick={onRetry} size="sm" className="bg-red-600 hover:bg-red-700 text-white flex-shrink-0">
        Retry
      </Button>
    </Card>
  )
}
