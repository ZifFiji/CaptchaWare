import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import RandomCaptchaButton from "@/components/RandomCaptchaButton"
import Navbar from "@/components/Navbar"

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
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  )
}
