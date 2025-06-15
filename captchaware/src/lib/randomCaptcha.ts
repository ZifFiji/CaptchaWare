export function randomCaptcha() {
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
  ]
  const randomIndex = Math.floor(Math.random() * routeArray.length)
  return routeArray[randomIndex]
}
