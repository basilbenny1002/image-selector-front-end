"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertCircle, Upload, AlertTriangle, Mail, Instagram, Sparkles } from "lucide-react"
import ImageUploadZone from "@/components/image-upload-zone"
import BackendHealthCheck from "@/components/backend-health-check"
import ProcessingStatus from "@/components/processing-status"
import ProcessButton from "@/components/process-button"
import DownloadManager from "@/components/download-manager"
import UploadProgress from "@/components/upload-progress"
import StatusBadge from "@/components/status-badge"
import SocialLinks from "@/components/social-links"

export default function Home() {
  const [backendReady, setBackendReady] = useState(false)
  const [backendChecking, setBackendChecking] = useState(true)
  const [enableBackendCheck] = useState(process.env.NEXT_PUBLIC_ENABLE_BACKEND_CHECK === "true")
  const [userId] = useState(() => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)

  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStatus, setProcessingStatus] = useState("")
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [processingStep, setProcessingStep] = useState<"upload" | "process" | "download">("upload")
  const [currentUploadFile, setCurrentUploadFile] = useState<string>("")

  // Check backend health on mount
  useEffect(() => {
    if (enableBackendCheck) {
      checkBackendHealth()
    } else {
      setBackendReady(true)
      setBackendChecking(false)
    }
  }, [enableBackendCheck])

  const checkBackendHealth = async () => {
    setBackendChecking(true)
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000"

    try {
      const response = await fetch(`${backendUrl}/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })

      if (response.ok) {
        setBackendReady(true)
        setError(null)
      } else {
        setBackendReady(false)
        setError("Backend returned an error")
      }
    } catch (err) {
      setBackendReady(false)
      setError("Backend is not responding. Retrying...")
      setTimeout(checkBackendHealth, 3000)
    } finally {
      setBackendChecking(false)
    }
  }

  const handleFilesSelected = (files: File[]) => {
    const validFiles: File[] = []
    let totalSize = 0
    const imageExtensions = ["jpg", "jpeg", "png", "webp", "bmp", "tiff"]

    for (const file of files) {
      const ext = file.name.split(".").pop()?.toLowerCase()

      if (!ext || !imageExtensions.includes(ext)) {
        setError(`Invalid file type: ${file.name}. Only image files are allowed.`)
        continue
      }

      totalSize += file.size
      if (totalSize > 250 * 1024 * 1024) {
        setError("Total upload size exceeds 250MB limit")
        break
      }

      validFiles.push(file)
    }

    if (validFiles.length > 0) {
      setSelectedFiles(validFiles)
      setError(null)
    }
  }

  const uploadImages = async () => {
    if (selectedFiles.length === 0) {
      setError("Please select images first")
      return
    }

    setIsUploading(true)
    setError(null)
    setUploadProgress(0)
    setProcessingStep("upload")

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000"

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i]
        setCurrentUploadFile(file.name)

        const formData = new FormData()
        formData.append("file", file)
        formData.append("user_id", userId)

        const response = await fetch(`${backendUrl}/upload`, {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`)
        }

        setUploadProgress(Math.round(((i + 1) / selectedFiles.length) * 100))
      }

      setIsUploading(false)
      setProcessingStep("process")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload images")
      setIsUploading(false)
      setProcessingStep("upload")
    }
  }

  const processImages = async () => {
    setIsProcessing(true)
    setProcessingStatus("Starting image processing...")
    setError(null)
    setProcessingStep("process")

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000"

    try {
      // Poll progress endpoint
      const progressInterval = setInterval(async () => {
        try {
          const response = await fetch(`${backendUrl}/progress/${userId}`)
          const data = await response.json()
          setProcessingStatus(`Processing: ${data.progress}% complete`)
        } catch (err) {
          console.error("Failed to fetch progress:", err)
        }
      }, 1000)

      // Wait a bit then check for download
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Try to get download URL
      const downloadResponse = await fetch(`${backendUrl}/download/${userId}`)
      const downloadData = await downloadResponse.json()

      clearInterval(progressInterval)

      if (downloadData.download_url) {
        setDownloadUrl(downloadData.download_url)
        setProcessingStatus("Processing complete!")
      } else if (downloadData.error) {
        throw new Error(downloadData.error)
      }

      setIsProcessing(false)
      setProcessingStep("download")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process images")
      setIsProcessing(false)
      setProcessingStep("process")
    }
  }

  const downloadResults = () => {
    if (downloadUrl) {
      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = "processed_images.zip"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const resetWorkflow = () => {
    setSelectedFiles([])
    setDownloadUrl(null)
    setUploadProgress(0)
    setProcessingStatus("")
    setProcessingStep("upload")
    setError(null)
    setCurrentUploadFile("")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <header className="border-b border-blue-100 bg-white/70 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-sm">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                Image Selecter
              </h1>
            </div>
          </div>
          <SocialLinks variant="header" />
        </div>
      </header>

      <div className="border-b border-blue-100 bg-gradient-to-r from-emerald-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <p className="text-base font-medium bg-gradient-to-r from-emerald-700 to-cyan-700 bg-clip-text text-transparent">
            ✨ Upload photos → We find duplicates → Download the best ones
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {enableBackendCheck && (
          <BackendHealthCheck isReady={backendReady} isChecking={backendChecking} onRetry={checkBackendHealth} />
        )}

        {enableBackendCheck && !backendReady && (
          <div className="mt-8 text-center">
            <p className="text-gray-500">Waiting for backend to be ready...</p>
          </div>
        )}

        {backendReady && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
              {/* Upload Area - 3 columns */}
              <div className="lg:col-span-3">
                <Card className="bg-white border-blue-200 p-8 shadow-sm hover:shadow-md transition-shadow">
                  <h2 className="text-lg font-semibold text-gray-800 mb-6">Upload Images</h2>

                  {processingStep === "upload" && !isUploading && !downloadUrl && (
                    <>
                      <ImageUploadZone onFilesSelected={handleFilesSelected} selectedCount={selectedFiles.length} />

                      {selectedFiles.length > 0 && (
                        <div className="mt-6 space-y-4">
                          <StatusBadge
                            status="idle"
                            label={`${selectedFiles.length} image(s) selected`}
                            message={`Total size: ${(selectedFiles.reduce((sum, f) => sum + f.size, 0) / 1024 / 1024).toFixed(2)}MB`}
                          />
                          <Button
                            onClick={uploadImages}
                            className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold py-6"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Images
                          </Button>
                        </div>
                      )}
                    </>
                  )}

                  {isUploading && (
                    <UploadProgress
                      progress={uploadProgress}
                      filesCount={selectedFiles.length}
                      currentFile={currentUploadFile}
                    />
                  )}

                  {processingStep === "process" && !isProcessing && !downloadUrl && (
                    <div className="space-y-4">
                      <StatusBadge
                        status="success"
                        label={`${selectedFiles.length} image(s) uploaded successfully`}
                        message="Ready to process and deduplicate your images."
                      />
                      <ProcessButton
                        onClick={processImages}
                        isLoading={isProcessing}
                        disabled={!selectedFiles.length}
                        error={error}
                      />
                    </div>
                  )}

                  {isProcessing && <ProcessingStatus status={processingStatus} />}

                  {processingStep === "download" && downloadUrl && (
                    <DownloadManager
                      downloadUrl={downloadUrl}
                      onDownload={downloadResults}
                      onReset={resetWorkflow}
                      isProcessing={isProcessing}
                    />
                  )}
                </Card>
              </div>

              <div>
                <Card className="bg-white border-blue-200 p-6 shadow-sm sticky top-24">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    Limits
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li>
                      <span className="block text-xs text-gray-500 mb-1">Max upload</span>
                      <span className="font-semibold text-gray-800">250MB</span>
                    </li>
                    <li>
                      <span className="block text-xs text-gray-500 mb-1">Supported formats</span>
                      <span className="font-semibold text-gray-800">JPG, PNG, WebP, BMP, TIFF</span>
                    </li>
                  </ul>
                  <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                    <p className="text-xs text-gray-500">
                      For larger batches, check out this{" "}
                      <a
                        href="https://github.com/basilbenny1002/Image-Selecter"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:text-emerald-700 font-medium underline"
                      >
                        GitHub repo
                      </a>
                      .
                    </p>
                    <p className="text-xs text-gray-500">
                      Running on free Render. All files deleted after download or refresh. We keep none of your data.
                    </p>
                  </div>
                </Card>
              </div>
            </div>

            <div className="mb-12">
              <Card className="bg-white border-blue-200 p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  {[
                    {
                      step: 1,
                      title: "Upload",
                      description: "Point it at a folder of images you want to sort",
                    },
                    {
                      step: 2,
                      title: "Vectorize",
                      description: "Convert each photo into a vector with a pretrained ResNet50 to measure similarity",
                    },
                    {
                      step: 3,
                      title: "Group",
                      description: "Group images that look alike by measuring cosine similarity",
                    },
                    {
                      step: 4,
                      title: "Rate",
                      description: "Rate every image in a group with the aesthetics-predictor model",
                    },
                    {
                      step: 5,
                      title: "Download",
                      description: "Copy the highest-scoring image to your output folder",
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex flex-col">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center text-white font-bold mb-3 flex-shrink-0">
                        {item.step}
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </>
        )}

        {/* Error Display */}
        {error && (
          <div className="fixed bottom-4 right-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 max-w-md shadow-lg">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-800 font-semibold">Error</p>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        )}
      </div>

      <footer className="border-t border-blue-100 bg-white/50 mt-16 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Left: About */}
            <div>
              <p className="text-sm text-gray-600 leading-relaxed">
                <span className="font-semibold text-gray-800">Image Selecter</span> is an open-source project 
                <span className="font-semibold text-gray-800"></span> that helps you sort through large sets
                of photos and find the best ones.
              </p>
            </div>

            {/* Center: Contact */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Get in Touch</p>
              <a
                href="mailto:basilbenny1002@gmail.com"
                className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                basilbenny1002@gmail.com
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors text-sm"
              >
                <Instagram className="w-4 h-4" />
                Instagram
              </a>
            </div>

            {/* Right: GitHub & Support */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Check Out on GitHub</p>
              <a
                href="https://github.com/basilbenny1002/Image-Selecter"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors text-sm underline"
              >
                GitHub (Frontend)
              </a>
              <a
                href="https://github.com/basilbenny1002/Image-Selecter-Backend"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors text-sm underline"
              >
                GitHub (Backend)
              </a>
              <a
                href="https://www.paypal.com/donate"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white rounded-lg text-sm font-medium transition-colors mt-2"
              >
                Support Project
              </a>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <p className="text-xs text-gray-500 text-center">
              © 2025 Image Selecter. Open source project. Limited upload due to free Render server. All files deleted
              after download or page refresh.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
