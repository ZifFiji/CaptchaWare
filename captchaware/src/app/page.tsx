import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Bienvenue sur le CaptchaWare</h1>
      <div className="flex space-x-4 mt-4">
        <Link href="/oddCaptcha" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors shadow-md">Premier jeu</Link>
        <Link href="/realCaptcha" className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md transition-colors shadow-md">Deuxième jeu</Link>
        <Link href="/screamer" className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors shadow-md">Troisième Jeu</Link> 
        <Link href="/binaryCaptcha" className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition-colors shadow-md">Quatrième Jeu</Link>
      </div>
    </div>
  );
}
