"use client"

import { Loader2 } from "lucide-react"
import ProgressIndicator from "./progress-indicator"

interface UploadProgressProps {
  progress: number
  filesCount: number
  currentFile?: string
}

export default function UploadProgress({ progress, filesCount, currentFile }: UploadProgressProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
        <span className="text-slate-300 font-medium">Uploading images...</span>
      </div>

      <ProgressIndicator current={progress} total={100} label="Upload Progress" />

      {currentFile && (
        <div className="bg-slate-700/50 rounded-lg p-3">
          <p className="text-xs text-slate-400 mb-1">Current file:</p>
          <p className="text-sm text-slate-300 truncate">{currentFile}</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-slate-700/30 rounded p-2">
          <p className="text-xs text-slate-400">Files</p>
          <p className="text-sm font-semibold text-slate-200">{filesCount}</p>
        </div>
        <div className="bg-slate-700/30 rounded p-2">
          <p className="text-xs text-slate-400">Progress</p>
          <p className="text-sm font-semibold text-blue-400">{progress}%</p>
        </div>
        <div className="bg-slate-700/30 rounded p-2">
          <p className="text-xs text-slate-400">Status</p>
          <p className="text-sm font-semibold text-slate-200">In Progress</p>
        </div>
      </div>
    </div>
  )
}
