"use client"

import { useApps } from '@/features/apps/hooks/useApps'
import { useMemo, useState } from 'react'
import { AppCard } from '@/components/AppCard'

export default function LocalAppsPage() {
  const { apps, loading, error, refreshHealth, refreshAll, favorites, toggleFavorite, lastChecked } = useApps()
  const [showOnlyRunnable, setShowOnlyRunnable] = useState(false)
  const filtered = useMemo(() => {
    let list = apps || []
    if (showOnlyRunnable) list = list.filter(a => a.can_run_locally)
    return [...list].sort((a, b) => (favorites.includes(b.id) ? 1 : 0) - (favorites.includes(a.id) ? 1 : 0))
  }, [apps, showOnlyRunnable, favorites])

  if (loading) return <div>Loading apps…</div>
  if (error) return <div className="text-red-600">Failed to load apps.</div>

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <h1 className="text-2xl font-semibold mr-auto text-slate-100">Local Apps</h1>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={showOnlyRunnable} onChange={e => setShowOnlyRunnable(e.target.checked)} />
          Show only runnable
        </label>
        <button onClick={refreshAll} className="inline-flex h-9 items-center gap-2 rounded-md border border-[#2e3246] bg-[#2e5cff] px-3 text-sm font-medium text-white shadow-sm transition hover:bg-[#244de2] active:bg-[#1d3fbf] focus:outline-none focus:ring-2 focus:ring-[#2e5cff]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 6v3l4-4-4-4v3C6.48 4 2 8.48 2 14h2c0-4.42 3.58-8 8-8zm8 4h-2c0 4.42-3.58 8-8 8v-3l-4 4 4 4v-3c5.52 0 10-4.48 10-10z"/></svg>
          Refresh all
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(app => (
          <AppCard
            key={app.id}
            app={app}
            view="local"
            onRefresh={() => refreshHealth(app.id)}
            favoritesIds={favorites}
            onToggleFavorite={toggleFavorite}
            lastCheckedMs={lastChecked(app.id)}
          />
        ))}
      </div>
    </div>
  )
}


