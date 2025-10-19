"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, Folder } from "lucide-react"

interface ImageUploadZoneProps {
  onFilesSelected: (files: File[]) => void
  selectedCount: number
}

export default function ImageUploadZone({ onFilesSelected, selectedCount }: ImageUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const folderInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    onFilesSelected(files)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      onFilesSelected(files)
    }
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
        isDragging ? "border-green-400 bg-green-50" : "border-green-300 bg-green-50/50 hover:border-green-400"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
          <Upload className="w-8 h-8 text-green-600" />
        </div>

        <div>
          <p className="text-gray-800 font-semibold">Drag and drop your images here</p>
          <p className="text-gray-600 text-sm mt-1">or use the buttons below</p>
        </div>

        <div className="flex gap-3 flex-wrap justify-center">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Select Files
          </button>

          <button
            onClick={() => folderInputRef.current?.click()}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <Folder className="w-4 h-4" />
            Select Folder
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        <input
          ref={folderInputRef}
          type="file"
          multiple
          webkitdirectory="true"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        <p className="text-xs text-gray-500 mt-4">Max 250MB total • Supported: JPG, PNG, WebP, BMP, TIFF</p>
      </div>
    </div>
  )
}
