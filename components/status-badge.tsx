"use client"

import { CheckCircle2, AlertCircle, Loader2, Clock } from "lucide-react"

type StatusType = "idle" | "loading" | "success" | "error" | "pending"

interface StatusBadgeProps {
  status: StatusType
  label: string
  message?: string
}

export default function StatusBadge({ status, label, message }: StatusBadgeProps) {
  const statusConfig = {
    idle: {
      icon: Clock,
      bgColor: "bg-slate-700/50",
      textColor: "text-slate-300",
      borderColor: "border-slate-600",
    },
    loading: {
      icon: Loader2,
      bgColor: "bg-blue-900/30",
      textColor: "text-blue-300",
      borderColor: "border-blue-700",
    },
    success: {
      icon: CheckCircle2,
      bgColor: "bg-green-900/30",
      textColor: "text-green-300",
      borderColor: "border-green-700",
    },
    error: {
      icon: AlertCircle,
      bgColor: "bg-red-900/30",
      textColor: "text-red-300",
      borderColor: "border-red-700",
    },
    pending: {
      icon: Clock,
      bgColor: "bg-yellow-900/30",
      textColor: "text-yellow-300",
      borderColor: "border-yellow-700",
    },
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div className={`${config.bgColor} border ${config.borderColor} rounded-lg p-3 flex items-start gap-3`}>
      <Icon
        className={`w-5 h-5 ${config.textColor} flex-shrink-0 mt-0.5 ${status === "loading" ? "animate-spin" : ""}`}
      />
      <div className="flex-1">
        <p className={`${config.textColor} font-semibold text-sm`}>{label}</p>
        {message && <p className={`${config.textColor} text-xs opacity-80 mt-1`}>{message}</p>}
      </div>
    </div>
  )
}
