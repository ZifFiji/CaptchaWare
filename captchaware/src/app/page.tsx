import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          CaptchaWare
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Découvrez notre collection de captchas interactifs et amusants. Testez vos compétences avec nos défis uniques !
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        <GameCard href="/oddCaptcha" title="Premier Captcha" color="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700" />
        <GameCard href="/realCaptcha" title="Deuxième Captcha"  color="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700" />
        <GameCard href="/screamer" title="Troisième Captcha"  color="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700" />
        <GameCard href="/binaryCaptcha" title="Quatrième Captcha"  color="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700" />
        <GameCard href="/whereIsWaldo" title="Cinquième Captcha"  color="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700" />
        <GameCard href="/wordleCaptcha" title="Sixième Captcha"  color="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700" />
        <GameCard href="/roulette" title="Septième Captcha"  color="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700" />
      </div>
    </div>
  );
}

function GameCard({ href, title, color }: { href: string; title: string; color: string }) {
  return (
    <Link href={href} className="group">
      <div className={`${color} p-6 rounded-xl shadow-lg transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-2xl border border-white/10`}>
        <h3 className="text-white font-bold text-xl mb-3">{title}</h3>
        <div className="mt-4 flex items-center text-white/80 text-sm">
          <span>Jouer maintenant</span>
          <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
