import React from "react"
import { RouletteWheel } from "./RouletteWheel.tsx"

export default function RouletteCaptcha() {
  return (
    <div className="mx-auto flex h-screen w-full max-w-2xl flex-col items-center justify-center">
      <RouletteWheel />
    </div>
  )
}
