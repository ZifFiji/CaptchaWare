"use client";

import Link from "next/link";
import RandomCaptchaButton from "./RandomCaptchaButton.tsx";
import ListCaptchaButton from "./ListCaptchaButton.tsx";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 w-full border-white/10 border-b bg-black/20 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="font-bold text-white text-xl">CaptchaWare</Link>
        <RandomCaptchaButton />
        <ListCaptchaButton />
      </div>
    </nav>
  )
}
