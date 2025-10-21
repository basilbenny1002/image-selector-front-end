"use client"

import { Loader2 } from "lucide-react"

interface UploadProgressProps {
  progress: number
  filesCount: number
  currentFile?: string
}

export default function UploadProgress({ progress, filesCount, currentFile }: UploadProgressProps) {
  const currentCount = Math.ceil((progress / 100) * filesCount)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" />
        <span className="text-gray-700 font-medium">Uploading images...</span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600 font-medium">Progress</p>
          <p className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            {currentCount}/{filesCount} images
          </p>
        </div>
        <div className="w-full bg-emerald-100 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {currentFile && (
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
          <p className="text-xs text-gray-500 mb-1">Current file:</p>
          <p className="text-sm text-gray-700 font-medium truncate">{currentFile}</p>
        </div>
      )}
    </div>
  )
}
