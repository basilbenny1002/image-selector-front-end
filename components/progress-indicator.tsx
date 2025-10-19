"use client"

interface ProgressIndicatorProps {
  current: number
  total: number
  label?: string
}

export default function ProgressIndicator({ current, total, label }: ProgressIndicatorProps) {
  const percentage = Math.round((current / total) * 100)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-300">{label || "Progress"}</p>
        <p className="text-sm font-semibold text-blue-400">{percentage}%</p>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-slate-400">
        {current} of {total} complete
      </p>
    </div>
  )
}
