"use client"

import type React from "react"

import { Github, Heart } from "lucide-react"

interface SocialLink {
  icon: React.ReactNode
  label: string
  href: string
  color: string
  hoverColor: string
  title: string
}

interface SocialLinksProps {
  variant?: "header" | "footer"
  showLabels?: boolean
}

export default function SocialLinks({ variant = "header", showLabels = false }: SocialLinksProps) {
  const links: SocialLink[] = [
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      href: "https://github.com/basilbenny1002/Image-Selecter",
      color: "text-slate-300",
      hoverColor: "hover:text-white",
      title: "View on GitHub",
    },
    {
      icon: <Heart className="w-5 h-5" />,
      label: "Donate",
      href: "https://www.paypal.com/paypalme/basilbenny12",
      color: "text-slate-300",
      hoverColor: "hover:text-red-400",
      title: "Support this project on PayPal",
    },
  ]

  if (variant === "header") {
    return (
      <div className="flex items-center gap-3">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 hover:bg-slate-700 rounded-lg transition-colors ${link.color} ${link.hoverColor}`}
            title={link.title}
            aria-label={link.label}
          >
            {link.icon}
          </a>
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4 flex-wrap justify-center">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 ${link.color} ${link.hoverColor} text-sm font-medium transition-colors hover:underline`}
          title={link.title}
          aria-label={link.label}
        >
          {link.icon}
          {showLabels && link.label}
        </a>
      ))}
    </div>
  )
}
