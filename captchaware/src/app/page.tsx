import GameCard from "@/components/gameCard"

export default function Home() {
  return (
    <div>
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-bold text-5xl text-transparent md:text-6xl">CaptchaWare</h1>
          <p className="mx-auto max-w-2xl text-gray-300 text-xl">
            Discover our collection of fun, interactive captchas. Test your skills with our unique challenges!{" "}
          </p>
        </div>

        <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <GameCard href="/oddCaptcha" title="First Captcha" color="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700" />
          <GameCard href="/realCaptcha" title="Second Captcha" color="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700" />
          <GameCard href="/screamer" title="Third Captcha" color="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700" />
          <GameCard href="/binaryCaptcha" title="Fourth Captcha" color="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700" />
          <GameCard href="/whereIsWaldo" title="Fifth Captcha" color="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700" />
          <GameCard href="/wordleCaptcha" title="Sixth Captcha" color="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700" />
          <GameCard href="/roulette" title="Seventh Captcha" color="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700" />
          <GameCard href="/calculCaptcha" title="Eighth Captcha" color="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700" />
          <GameCard href="/guessCaptcha" title="Ninth Captcha" color="bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700" />
          <GameCard href="/wordTTS" title="Tenth Captcha" color="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700" />
          <GameCard href="/chess" title="Eleventh Captcha" color="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700" />
          <GameCard href="/people" title="Picture Captcha" color="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700" />
          <GameCard href="/pineapplePizza" title="Pizza Captcha" color="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700" />
        </div>
      </div>
    </div>
  )
}

