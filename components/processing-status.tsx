"use client"

import { Loader2 } from "lucide-react"
import ProgressIndicator from "./progress-indicator"

interface ProcessingStatusProps {
  processingData: {
    stage: number
    percentage: number
    eta_seconds: number | null
    status: string
  }
}

export default function ProcessingStatus({ processingData }: ProcessingStatusProps) {
  const steps = [
    { name: "Grouping similar images", description: "Finding and grouping duplicate images", status: "indexing" },
    { name: "Selecting best images", description: "Choosing highest quality from each group", status: "selecting" },
  ]

  const { stage, percentage, eta_seconds, status } = processingData

  const formatETA = (seconds: number | null) => {
    if (!seconds) return "Calculating..."
    if (seconds < 60) return `${Math.round(seconds)}s`
    const minutes = Math.floor(seconds / 60)
    const secs = Math.round(seconds % 60)
    return `${minutes}m ${secs}s`
  }

  const currentStepIndex = stage - 1

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Loader2 className="w-5 h-5 text-green-600 animate-spin" />
        <span className="text-gray-700 font-medium">Processing images...</span>
      </div>

      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
        <p className="text-sm text-gray-600 font-medium mb-2">Current Stage:</p>
        <p className="text-sm text-green-700">{steps[currentStepIndex]?.name || "Processing..."}</p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600 font-medium">Progress</p>
          <div className="flex gap-4">
            <p className="text-sm font-semibold text-green-600">{percentage}%</p>
            {eta_seconds !== null && (
              <p className="text-sm font-semibold text-blue-600">ETA: {formatETA(eta_seconds)}</p>
            )}
          </div>
        </div>
        <div className="w-full bg-green-100 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <ProgressIndicator current={stage} total={steps.length} label="Processing Steps" />

      <div className="space-y-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
              index < currentStepIndex ? "bg-green-50 border border-green-200" : "bg-gray-50 border border-gray-200"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold ${
                index < currentStepIndex
                  ? "bg-green-600 text-white"
                  : index === currentStepIndex
                    ? "bg-blue-500 text-white animate-pulse"
                    : "bg-gray-300 text-gray-600"
              }`}
            >
              {index < currentStepIndex ? "✓" : index + 1}
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${index <= currentStepIndex ? "text-gray-800" : "text-gray-600"}`}>
                {step.name}
              </p>
              <p className={`text-xs ${index <= currentStepIndex ? "text-gray-600" : "text-gray-500"}`}>
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
