'use client'

import { useRouter } from 'next/navigation'

export default function ListCaptchaButton() {
  const router = useRouter()
  
  const routeArray: string[] = [
    "/oddCaptcha",
    "/realCaptcha",
    "/screamer",
    "/binaryCaptcha",
    "/whereIsWaldo",
    "/wordleCaptcha",
    "/roulette",
    "/calculCaptcha",
    "/guessCaptcha",
    "/wordTTS",
    "/chess",
    "/people",
    "/pineapplePizza",
    "/creditCard"
  ]

  const startSequence = () => {
    localStorage.setItem('captchaSequence', JSON.stringify(routeArray))
    localStorage.setItem('currentCaptchaIndex', '0')
    localStorage.setItem('playAllMode', 'true')
    router.push(routeArray[0])
  }

  return (
    <button 
      type='button'
      onClick={startSequence}
      className="rounded bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 font-bold text-white transition-all hover:from-blue-600 hover:to-purple-600"
    >
      Play all Captcha
    </button>
  )
}
