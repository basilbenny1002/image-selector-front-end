"use client"

import { Zap, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProcessButtonProps {
  onClick: () => void
  isLoading: boolean
  disabled: boolean
  error?: string | null
}

export default function ProcessButton({ onClick, isLoading, disabled, error }: ProcessButtonProps) {
  return (
    <div className="space-y-3">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Zap className="w-4 h-4 mr-2" />
            Start Processing
          </>
        )}
      </Button>

      {error && (
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-3 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-200">{error}</p>
        </div>
      )}
    </div>
  )
}
