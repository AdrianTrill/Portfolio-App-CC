"use client"

import type { AppInfo } from '@/types/app'
import { Carousel } from '@/components/Carousel'
import { Chip } from '@/components/Chip'
import { StatusPill } from '@/components/StatusPill'
import { useEffect, useState } from 'react'
import { PredictiveMaintenanceDoc } from '@/components/docs/PredictiveMaintenanceDoc'

export function AppDetailsModal({
  app,
  onClose,
  onRefresh,
  lastCheckedMs = null,
}: {
  app: AppInfo
  onClose: () => void
  onRefresh: () => void
  lastCheckedMs?: number | null
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
      <div role="dialog" aria-modal="true" className="relative z-10 w-full max-w-4xl rounded-lg bg-[#212434] p-0 shadow-lg">
        <div className="flex items-center justify-between gap-4 border-b border-[#2e3246] bg-[#242737] px-5 py-3 text-slate-100 rounded-t-lg">
          <h2 className="text-xl font-semibold">{app.name}</h2>
          <div className="flex items-center gap-2">
            {app.repo_url && (
              <a
                className="no-underline inline-flex items-center gap-2 rounded-md bg-white px-3 py-1 text-sm text-blue-700 shadow-sm hover:bg-blue-50 active:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-white/60"
                href={app.repo_url}
                target="_blank"
                rel="noreferrer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M10 3a7 7 0 00-7 7c0 3.09 2 5.72 4.79 6.65.35.06.48-.15.48-.34v-1.2c-1.95.43-2.36-.95-2.36-.95-.32-.82-.78-1.04-.78-1.04-.64-.44.05-.43.05-.43.7.05 1.06.72 1.06.72.63 1.08 1.66.77 2.06.59.06-.46.25-.77.46-.95-1.56-.18-3.2-.78-3.2-3.47 0-.77.27-1.39.72-1.88-.07-.18-.31-.9.07-1.87 0 0 .59-.19 1.94.72A6.7 6.7 0 0110 7.8c.6 0 1.21.08 1.78.23 1.35-.91 1.94-.72 1.94-.72.38.97.14 1.69.07 1.87.45.49.72 1.11.72 1.88 0 2.7-1.65 3.29-3.22 3.47.26.22.49.66.49 1.33v1.97c0 .19.12.41.49.34C15 15.72 17 13.09 17 10a7 7 0 00-7-7z"/></svg>
                <span>Repo</span>
              </a>
            )}
            {app.docs_url && (
              <DocsButton />
            )}
            <button onClick={onClose} className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-1 text-sm text-blue-700 shadow-sm hover:bg-blue-50 active:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-white/60">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.3 5.71L12 12.01 5.7 5.7 4.29 7.11l6.3 6.3-6.3 6.29 1.41 1.41 6.3-6.3 6.29 6.3 1.41-1.41-6.3-6.29 6.3-6.3z"/></svg>
              Close
            </button>
          </div>
        </div>
        <div className="px-5 py-4">
          <div className="text-sm text-slate-300">{app.description}</div>
          <div className="mt-3"><StatusPill status={app.health.status} /></div>

          <div className="mt-4">
            <Carousel images={app.images} altPrefix={app.name} />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-medium text-slate-100">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {app.tech_stack.map(t => (
                  <Chip key={t} label={t} variant="tech" />
                ))}
              </div>
              {app.run?.notes && <div className="mt-2 text-xs text-gray-500">{app.run.notes}</div>}
            </div>
            <div>
              <h3 className="mb-2 font-medium text-slate-100">Architecture</h3>
              <p className="text-sm text-slate-300">{app.architecture.short}</p>
              {app.architecture.diagram_url && (
                <a className="mt-2 inline-block text-blue-700 underline" href={app.architecture.diagram_url} target="_blank" rel="noreferrer">
                  Open diagram
                </a>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-slate-400">Platforms: {app.platforms.join(', ')}</div>
            <div className="flex items-center gap-3">
              {lastCheckedMs && (
                <div className="text-xs text-slate-400">Last checked: {new Date(lastCheckedMs).toLocaleTimeString()}</div>
              )}
              <button onClick={onRefresh} className="inline-flex items-center gap-2 rounded-md bg-[#2e5cff] px-3 py-1 text-sm text-white shadow-sm hover:bg-[#244de2] active:bg-[#1d3fbf] focus:outline-none focus:ring-2 focus:ring-blue-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 6v3l4-4-4-4v3C6.48 4 2 8.48 2 14h2c0-4.42 3.58-8 8-8zm8 4h-2c0 4.42-3.58 8-8 8v-3l-4 4 4 4v-3c5.52 0 10-4.48 10-10z"/></svg>
                Refresh health
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DocsButton() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        className="no-underline inline-flex items-center gap-2 rounded-md bg-white px-3 py-1 text-sm text-blue-700 shadow-sm hover:bg-blue-50 active:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-white/60"
        onClick={() => setOpen(true)}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2H8a2 2 0 00-2 2v15a1 1 0 001.555.832L12 17.5l4.445 2.332A1 1 0 0018 19V2z"/></svg>
        Open docs
      </button>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="relative z-10 w-full max-w-3xl rounded-xl bg-[#212434] shadow-2xl ring-1 ring-[#2e3246]">
            <button
              onClick={() => setOpen(false)}
              aria-label="Close documentation"
              className="absolute right-3 top-3 rounded-full bg-[#2e3246] p-2 text-slate-100 hover:bg-[#39405a] focus:outline-none focus:ring-2 focus:ring-white/60"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.3 5.71L12 12.01 5.7 5.7 4.29 7.11l6.3 6.3-6.3 6.29 1.41 1.41 6.3-6.3 6.29 6.3 1.41-1.41-6.3-6.29 6.3-6.3z"/></svg>
            </button>
            <div className="px-6 py-5 text-slate-100">
              <PredictiveMaintenanceDoc />
            </div>
          </div>
        </div>
      )}
    </>
  )
}


