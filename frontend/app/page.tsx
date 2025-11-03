"use client"

import { useApps } from '@/features/apps/hooks/useApps'
import { useMemo, useState } from 'react'
import { AppCard } from '@/components/AppCard'

export default function SolutionCenterPage() {
  const { apps, loading, error, refreshHealth, refreshAll, favorites, toggleFavorite, lastChecked } = useApps()
  const [q, setQ] = useState('')
  const [status, setStatus] = useState<'ALL' | 'UP' | 'DOWN' | 'UNKNOWN'>('ALL')
  const [sortBy, setSortBy] = useState<'name' | 'status'>('name')

  const filtered = useMemo(() => {
    let list = apps || []
    if (q) {
      const s = q.toLowerCase()
      list = list.filter(a =>
        [a.name, a.description, ...a.tech_stack, ...a.tags].some(v => v.toLowerCase().includes(s)),
      )
    }
    if (status !== 'ALL') list = list.filter(a => a.health.status === status)
    list = [...list].sort((a, b) => {
      const favA = favorites.includes(a.id) ? 1 : 0
      const favB = favorites.includes(b.id) ? 1 : 0
      const favOrder = favB - favA // favorites first
      if (favOrder !== 0) return favOrder
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return a.health.status.localeCompare(b.health.status)
    })
    return list
  }, [apps, q, status, sortBy, favorites])

  if (loading) return <div>Loading apps…</div>
  if (error) return <div className="text-red-600">Failed to load apps.</div>

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h1 className="mr-auto text-2xl font-semibold text-slate-100">Solution Center Apps</h1>
        <div className="relative">
          <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-slate-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 5 1.5-1.5-5-5zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
          </span>
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search apps…"
            className="h-9 w-56 rounded-md border border-[#2e3246] bg-[#212434] pl-8 pr-3 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2e5cff]"
          />
        </div>
        <label className="text-sm text-slate-300">Status</label>
        <select
          className="h-9 rounded-md border border-[#2e3246] bg-[#212434] px-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#2e5cff] appearance-none pr-6 bg-[url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'%23cbd5e1\'><path d=\'M7 10l5 5 5-5H7z\'/></svg>')] bg-no-repeat bg-right-2"
          value={status}
          onChange={e => setStatus(e.target.value as any)}
        >
          <option value="ALL">All</option>
          <option value="UP">UP</option>
          <option value="DOWN">DOWN</option>
          <option value="UNKNOWN">UNKNOWN</option>
        </select>
        <label className="text-sm text-slate-300">Sort</label>
        <select
          className="h-9 rounded-md border border-[#2e3246] bg-[#212434] px-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#2e5cff] appearance-none pr-6 bg-[url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'%23cbd5e1\'><path d=\'M7 10l5 5 5-5H7z\'/></svg>')] bg-no-repeat bg-right-2"
          value={sortBy}
          onChange={e => setSortBy(e.target.value as any)}
        >
          <option value="name">Name</option>
          <option value="status">Status</option>
        </select>
        <button
          onClick={refreshAll}
          className="inline-flex h-9 items-center gap-2 rounded-md border border-[#2e3246] bg-[#2e5cff] px-3 text-sm font-medium text-white shadow-sm transition hover:bg-[#244de2] active:bg-[#1d3fbf] focus:outline-none focus:ring-2 focus:ring-[#2e5cff]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 6v3l4-4-4-4v3C6.48 4 2 8.48 2 14h2c0-4.42 3.58-8 8-8zm8 4h-2c0 4.42-3.58 8-8 8v-3l-4 4 4 4v-3c5.52 0 10-4.48 10-10z"/></svg>
          Refresh all
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(app => (
          <AppCard
            key={app.id}
            app={app}
            onRefresh={() => refreshHealth(app.id)}
            view="all"
            favoritesIds={favorites}
            onToggleFavorite={toggleFavorite}
            lastCheckedMs={lastChecked(app.id)}
          />
        ))}
      </div>
    </div>
  )
}


