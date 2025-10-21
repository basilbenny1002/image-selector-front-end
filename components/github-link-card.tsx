"use client"

import { Github } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function GitHubLinkCard() {
  return (
    <Card className="bg-slate-800 border-slate-700 p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
          <Github className="w-6 h-6 text-slate-300" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-white mb-2">Open Source on GitHub</h3>
          <p className="text-sm text-slate-300 mb-4">
            ImageDeduper is open source. Contribute, report issues, or star the project on GitHub.
          </p>
          <a
            href="https://github.com/basilbenny1002/Image-Selecter"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Github className="w-4 h-4" />
            View Repository
          </a>
        </div>
      </div>
    </Card>
  )
}
