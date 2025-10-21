"use client"

import { Download, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface DownloadManagerProps {
  onDownload: () => void
  onReset: () => void
  isProcessing: boolean
}

export default function DownloadManager({ onDownload, onReset, isProcessing }: DownloadManagerProps) {
  const [hasDownloaded, setHasDownloaded] = useState(false)

  const handleDownload = async () => {
    setHasDownloaded(true)
    await onDownload()
  }

  return (
    <div className="space-y-4">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-green-800 font-semibold">Processing Complete!</p>
          <p className="text-sm text-green-700 mt-1">Your deduplicated images are ready to download.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={handleDownload}
          disabled={isProcessing || hasDownloaded}
          className={`text-white font-semibold ${
            hasDownloaded
              ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
          }`}
        >
          <Download className="w-4 h-4 mr-2" />
          {hasDownloaded ? "Downloaded" : "Download"}
        </Button>
        <Button
          onClick={onReset}
          disabled={isProcessing}
          variant="outline"
          className="border-blue-200 text-emerald-600 hover:bg-emerald-50 bg-transparent"
        >
          Process More
        </Button>
      </div>
    </div>
  )
}
