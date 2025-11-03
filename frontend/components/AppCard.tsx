"use client"

import type { AppInfo } from '@/types/app'
import { Chip } from '@/components/Chip'
import { StatusPill } from '@/components/StatusPill'
import { useState } from 'react'
import { AppDetailsModal } from '@/components/AppDetailsModal'
import { clsx } from 'clsx'

export function AppCard({
  app,
  onRefresh,
  view,
  favoritesIds = [],
  onToggleFavorite,
  lastCheckedMs,
}: {
  app: AppInfo
  onRefresh: () => void
  view: 'all' | 'local'
  favoritesIds?: string[]
  onToggleFavorite?: (id: string) => void
  lastCheckedMs?: number | null
}) {
  const [open, setOpen] = useState(false)
  const disabled = view === 'local' && !app.can_run_locally
  const isFav = favoritesIds.includes(app.id)

  return (
    <div
      className={clsx(
        'rounded-lg border border-[#2e3246] bg-[#242737] p-4 shadow-sm transition flex flex-col h-full',
        disabled && 'opacity-50',
        'hover:shadow-md',
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold text-slate-100">{app.name}</h3>
          <p className="mt-1 text-sm text-slate-300">{app.description}</p>
        </div>
        <div className="flex items-center gap-2">
          {onToggleFavorite && (
            <button
              aria-label={isFav ? 'Unfavorite' : 'Favorite'}
              className={clsx('rounded px-2 py-1 text-sm', isFav ? 'text-yellow-600' : 'text-gray-400 hover:text-gray-600')}
              onClick={() => onToggleFavorite(app.id)}
            >
              ★
            </button>
          )}
          <StatusPill status={app.health.status} />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {app.tech_stack.slice(0, 3).map(t => (
          <Chip key={t} label={t} variant="tech" />
        ))}
        {app.tags.slice(0, 2).map(t => (
          <Chip key={t} label={t} variant="tag" />
        ))}
      </div>

      <div className="flex-1" />

      <div className="mt-4 flex items-center justify-between">
        <button
          className="rounded bg-gray-900 px-3 py-1 text-sm text-white hover:bg-black"
          onClick={() => setOpen(true)}
        >
          View details
        </button>
        <button className="text-sm text-blue-700 hover:underline" onClick={onRefresh}>
          Refresh health
        </button>
      </div>

      {lastCheckedMs && (
        <div className="mt-1 text-xs text-gray-500">Last checked: {new Date(lastCheckedMs).toLocaleTimeString()}</div>
      )}

      {open && (
        <AppDetailsModal
          app={app}
          onClose={() => setOpen(false)}
          onRefresh={onRefresh}
          lastCheckedMs={lastCheckedMs || null}
        />
      )}
    </div>
  )
}


