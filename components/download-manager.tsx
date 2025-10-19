"use client"

import { Download, CheckCircle2, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface DownloadManagerProps {
  downloadUrl: string | null
  onDownload: () => void
  onReset: () => void
  isProcessing: boolean
}

export default function DownloadManager({ downloadUrl, onDownload, onReset, isProcessing }: DownloadManagerProps) {
  const [copied, setCopied] = useState(false)

  if (!downloadUrl) return null

  const copyToClipboard = () => {
    navigator.clipboard.writeText(downloadUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-green-300 font-semibold">Processing Complete!</p>
          <p className="text-sm text-green-200 mt-1">Your deduplicated images are ready to download.</p>
        </div>
      </div>

      <div className="bg-slate-700/50 rounded-lg p-4 space-y-3">
        <p className="text-sm text-slate-300 font-medium">Download Link:</p>
        <div className="flex items-center gap-2 bg-slate-800 rounded p-3 break-all">
          <span className="text-xs text-slate-400 flex-1 font-mono">{downloadUrl.substring(0, 50)}...</span>
          <button
            onClick={copyToClipboard}
            className="p-2 hover:bg-slate-700 rounded transition-colors flex-shrink-0"
            title="Copy link"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button onClick={onDownload} disabled={isProcessing} className="bg-green-600 hover:bg-green-700 text-white">
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
        <Button
          onClick={onReset}
          disabled={isProcessing}
          variant="outline"
          className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
        >
          Process More
        </Button>
      </div>
    </div>
  )
}
