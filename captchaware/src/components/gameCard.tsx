import Link from "next/link";

export default function GameCard({ href, title, color }: { href: string; title: string; color: string }) {
  return (
    <Link href={href} className="group">
      <div
        className={`${color} transform rounded-xl border border-white/10 p-6 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl`}
      >
        <h3 className="mb-3 font-bold text-white text-xl">{title}</h3>
        <div className="mt-4 flex items-center text-sm text-white/80">
          <span>Play Now</span>
          <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
