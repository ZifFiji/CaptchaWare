'use client'

import { useRouter } from 'next/navigation'
import { randomCaptcha } from '@/lib/randomCaptcha'

export default function RandomChallengeButton() {
  const router = useRouter()

  const handleRandomChallenge = () => {
    const randomRoute = randomCaptcha()
    router.push(randomRoute)
  }

  return (
    <button type="button" onClick={handleRandomChallenge} className="rounded-md bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 font-medium text-sm text-white transition-all duration-300 hover:from-orange-600 hover:to-orange-700">
      Random Challenge
    </button>
  )
}


