"use client"

import { Loader2 } from "lucide-react"

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
    if (seconds === null || seconds === undefined) return "Calculating..."
    if (seconds < 60) return `${Math.round(seconds)}s`
    const minutes = Math.floor(seconds / 60)
    const secs = Math.round(seconds % 60)
    return `${minutes}m ${secs}s`
  }

  const currentStepIndex = stage - 1

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
        <span className="text-gray-700 font-medium">Processing images...</span>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => {
          const isCurrentStep = index === currentStepIndex
          const isCompletedStep = index < currentStepIndex
          const stepProgress = isCurrentStep ? percentage : isCompletedStep ? 100 : 0

          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold transition-all ${
                      isCompletedStep
                        ? "bg-emerald-600 text-white"
                        : isCurrentStep
                          ? "bg-blue-500 text-white animate-pulse"
                          : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {isCompletedStep ? "✓" : index + 1}
                  </div>
                  <div>
                    <p
                      className={`text-sm font-medium ${isCurrentStep || isCompletedStep ? "text-gray-800" : "text-gray-600"}`}
                    >
                      {step.name}
                    </p>
                    <p className={`text-xs ${isCurrentStep || isCompletedStep ? "text-gray-600" : "text-gray-500"}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-emerald-600">{stepProgress}%</p>
                  {isCurrentStep && <p className="text-xs text-blue-600 font-medium">ETA: {formatETA(eta_seconds)}</p>}
                </div>
              </div>

              <div className="ml-9 w-full bg-gray-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isCompletedStep
                      ? "bg-emerald-600"
                      : isCurrentStep
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                        : "bg-gray-300"
                  }`}
                  style={{ width: `${stepProgress}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
