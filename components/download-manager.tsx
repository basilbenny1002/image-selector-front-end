"use client"

import { Download, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

interface DownloadManagerProps {
  onDownload: () => void
  onReset: () => void
  isProcessing: boolean
}

export default function DownloadManager({ onDownload, onReset, isProcessing }: DownloadManagerProps) {
  const [downloadStarted, setDownloadStarted] = useState(false)
  const [downloadError, setDownloadError] = useState(false)
  const [downloadComplete, setDownloadComplete] = useState(false)

  useEffect(() => {
    const triggerAutoDownload = async () => {
      setDownloadStarted(true)
      try {
        await onDownload()
        setDownloadComplete(true)
      } catch (err) {
        setDownloadError(true)
      }
    }

    triggerAutoDownload()
  }, [onDownload])

  return (
    <div className="space-y-4">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-green-800 font-semibold">Processing Complete!</p>
          <p className="text-sm text-green-700 mt-1">Your deduplicated images are ready.</p>
        </div>
      </div>

      {!downloadError && !downloadComplete && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
          <div className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5">
            <div className="animate-spin">⟳</div>
          </div>
          <div className="flex-1">
            <p className="text-blue-800 font-semibold">Download starting...</p>
            <p className="text-sm text-blue-700 mt-1">Your download should begin in a moment.</p>
          </div>
        </div>
      )}

      {downloadComplete && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-emerald-800 font-semibold">Download Complete!</p>
            <p className="text-sm text-emerald-700 mt-1">Your files have been downloaded successfully.</p>
          </div>
        </div>
      )}

      {downloadError && (
        <div className="space-y-3">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-red-800 font-semibold">Download Failed</p>
              <p className="text-sm text-red-700 mt-1">The automatic download didn't work. Please try manually.</p>
            </div>
          </div>
          <Button
            onClick={onDownload}
            className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Manually
          </Button>
        </div>
      )}

      <Button
        onClick={onReset}
        disabled={isProcessing}
        variant="outline"
        className="w-full border-blue-200 text-emerald-600 hover:bg-emerald-50 bg-transparent"
      >
        Process More
      </Button>
    </div>
  )
}
