"use client"

import { Loader2 } from "lucide-react"
import ProgressIndicator from "./progress-indicator"

interface ProcessingStatusProps {
  status: string
}

export default function ProcessingStatus({ status }: ProcessingStatusProps) {
  const steps = [
    { name: "Grouping similar images", description: "Finding and grouping duplicate images" },
    { name: "Selecting best images", description: "Choosing highest quality from each group" },
    { name: "Preparing download", description: "Creating ZIP archive" },
  ]

  // Parse status to extract stage and percentage
  const parseStatus = () => {
    // Expected format: "Stage: Grouping similar images, Progress: 45%"
    const stageMatch = status.match(/Stage:\s*([^,]+)/)
    const percentMatch = status.match(/Progress:\s*(\d+)%/)

    return {
      stage: stageMatch ? stageMatch[1].trim() : "",
      percentage: percentMatch ? Number.parseInt(percentMatch[1]) : 0,
    }
  }

  const { stage, percentage } = parseStatus()

  const getCurrentStep = () => {
    const statusLower = status.toLowerCase()
    if (statusLower.includes("grouping")) return 0
    if (statusLower.includes("selecting")) return 1
    if (statusLower.includes("preparing")) return 2
    return 0
  }

  const currentStep = getCurrentStep()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Loader2 className="w-5 h-5 text-green-600 animate-spin" />
        <span className="text-gray-700 font-medium">Processing images...</span>
      </div>

      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
        <p className="text-sm text-gray-600 font-medium mb-2">Current Status:</p>
        <p className="text-sm text-green-700">{status || "Processing your images..."}</p>
      </div>

      {percentage > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600 font-medium">Progress</p>
            <p className="text-sm font-semibold text-green-600">{percentage}%</p>
          </div>
          <div className="w-full bg-green-100 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      )}

      <ProgressIndicator current={currentStep + 1} total={steps.length} label="Processing Steps" />

      <div className="space-y-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
              index <= currentStep ? "bg-green-50 border border-green-200" : "bg-gray-50 border border-gray-200"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold ${
                index < currentStep
                  ? "bg-green-600 text-white"
                  : index === currentStep
                    ? "bg-blue-500 text-white animate-pulse"
                    : "bg-gray-300 text-gray-600"
              }`}
            >
              {index < currentStep ? "✓" : index + 1}
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${index <= currentStep ? "text-gray-800" : "text-gray-600"}`}>
                {step.name}
              </p>
              <p className={`text-xs ${index <= currentStep ? "text-gray-600" : "text-gray-500"}`}>
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
