import { RouletteWheel } from "./RouletteWheel.tsx"

export default function RouletteCaptcha() {
  return (
    <div className="mx-auto flex h-screen max-w-2xl flex-col items-center justify-center">
      <RouletteWheel />
    </div>
  )
}
