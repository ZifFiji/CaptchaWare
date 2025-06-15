import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import RandomCaptchaButton from "@/components/RandomCaptchaButton"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "CaptchaWare",
  description: "Jeu de Captcha",
  icons: {
    icon: "/Captcha.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 antialiased`}>
        <div className="flex min-h-screen flex-col">
          <nav className="sticky top-0 z-10 w-full border-white/10 border-b bg-black/20 backdrop-blur-md">
            <div className="container mx-auto flex items-center justify-between px-4 py-3">
              <h1 className="font-bold text-white text-xl">CaptchaWare</h1>
              <RandomCaptchaButton/>
            </div>
          </nav>
          {children}
        </div>
      </body>
    </html>
  )
}
