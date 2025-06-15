'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CaptchaNavigation() {
  const router = useRouter()
  const [isSequence, setIsSequence] = useState(false)
  const [nextCaptcha, setNextCaptcha] = useState<string | null>(null)

  useEffect(() => {
    const captchaSequence = localStorage.getItem('captchaSequence')
    const currentIndex = localStorage.getItem('currentCaptchaIndex')
    const playAllMode = localStorage.getItem('playAllMode')
    
    if (captchaSequence && currentIndex) {
      const sequence = JSON.parse(captchaSequence)
      const index = Number.parseInt(currentIndex)
      
      setIsSequence(playAllMode === 'true')
      
      if (index < sequence.length - 1) {
        setNextCaptcha(sequence[index + 1])
      }
    } 
  }, [])

  const handleSkip = () => {
    if (nextCaptcha) {
      const currentIndex = Number.parseInt(localStorage.getItem('currentCaptchaIndex') || '0')
      localStorage.setItem('currentCaptchaIndex', (currentIndex + 1).toString())
      router.push(nextCaptcha)
    } else {
      localStorage.removeItem('captchaSequence')
      localStorage.removeItem('currentCaptchaIndex')
      localStorage.removeItem('playAllMode')
      router.push('/')
    }
  }

  return isSequence ? (
    <div className="fixed bottom-4 left-4">
      <button 
        type='button'
        onClick={handleSkip}
        className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600"
      >
        Skip ce captcha
      </button>
    </div>
  ) : null
}
