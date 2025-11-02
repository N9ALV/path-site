"use client"

import { GL } from "./gl"
import { useState, useEffect } from "react"

export function Hero() {
  const [hovering, setHovering] = useState(false)
  const [displayText, setDisplayText] = useState("Path")

  useEffect(() => {
    // Get refm parameter from URL
    const urlParams = new URLSearchParams(window.location.search)
    const refm = urlParams.get("refm")
    if (refm) {
      setDisplayText(refm)
    }
  }, [])

  return (
    <div className="flex flex-col h-svh justify-between">
      <GL hovering={hovering} />

      <div className="pb-16 mt-auto text-center relative">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-sentient">{displayText}</h1>
      </div>
    </div>
  )
}
