import '../styles/globals.css'
import Link from 'next/link'
import { NavTabs } from '@/components/NavTabs'
import type { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#1b1e2b] text-slate-200">
        <header className="bg-[#242737] text-slate-100">
          <nav className="container-max flex items-center justify-between py-4">
            <div className="flex items-center gap-2 font-semibold">
              <img src="/images/cc_logo.png" alt="Computacenter" className="h-6 w-6" />
              <span>Computacenter Portfolio</span>
            </div>
            <NavTabs />
          </nav>
        </header>
        <main className="container-max py-6">{children}</main>
      </body>
    </html>
  )
}


