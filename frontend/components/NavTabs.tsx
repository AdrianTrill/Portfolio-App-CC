"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Tab({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={[
        'no-underline inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm transition',
        active
          ? 'bg-[#2e3246] text-slate-100 shadow'
          : 'text-slate-300 hover:bg-white/10 hover:text-white',
        'active:scale-[.98] focus:outline-none focus:ring-2 focus:ring-white/40',
      ].join(' ')}
    >
      {children}
    </Link>
  )
}

export function NavTabs() {
  const pathname = usePathname()
  const isLocal = pathname?.startsWith('/local')
  return (
    <div className="flex gap-2">
      <Tab href="/" active={!isLocal}>
        {/* grid icon */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M10 3H3v7h7V3zm11 0h-7v7h7V3zM10 14H3v7h7v-7zm11 0h-7v7h7v-7z"/></svg>
        <span>Solution Center Apps</span>
      </Tab>
      <Tab href="/local" active={!!isLocal}>
        {/* laptop icon */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 5h16a1 1 0 011 1v9H3V6a1 1 0 011-1zm17 12H3l-2 2h22l-2-2z"/></svg>
        <span>Local Apps</span>
      </Tab>
    </div>
  )
}


