"use client"

import { GL } from "./gl"
import { useState } from "react"

export function Hero() {
  const [hovering, setHovering] = useState(false)
  return (
    <div className="flex flex-col h-svh justify-between">
      <GL hovering={hovering} />

      <div className="pb-16 mt-auto text-center relative">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-sentient">Path</h1>
      </div>
    </div>
  )
}
