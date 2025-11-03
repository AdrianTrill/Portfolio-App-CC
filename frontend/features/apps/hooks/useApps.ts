import { useCallback, useEffect, useMemo, useState } from 'react'
import type { AppInfo } from '@/types/app'
import { listApps, checkHealth } from '@/features/apps/api'

export function useApps() {
  const [apps, setApps] = useState<AppInfo[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastCheckedById, setLastCheckedById] = useState<Record<string, number>>({})
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('favorites')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await listApps()
      // Sort by favorite first
      data.sort((a, b) => (favorites.includes(b.id) ? 1 : 0) - (favorites.includes(a.id) ? 1 : 0))
      setApps(data)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const refreshHealth = useCallback(async (id: string) => {
    try {
      const res = await checkHealth(id)
      setApps(prev =>
        prev?.map(a => (a.id === id ? { ...a, health: { ...a.health, status: res.status } } : a)) || null,
      )
      setLastCheckedById(prev => ({ ...prev, [id]: Date.now() }))
    } catch (e) {
      // noop, keep existing state
    }
  }, [])

  const refreshAll = useCallback(async () => {
    if (!apps) return
    await Promise.all(apps.map(a => refreshHealth(a.id)))
  }, [apps, refreshHealth])

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      localStorage.setItem('favorites', JSON.stringify(next))
      // Reorder apps with favorites on top
      setApps(curr => (curr ? [...curr].sort((a, b) => (next.includes(b.id) ? 1 : 0) - (next.includes(a.id) ? 1 : 0)) : curr))
      return next
    })
  }, [])

  const lastChecked = useCallback((id: string) => lastCheckedById[id] || null, [lastCheckedById])

  return { apps, loading, error, refreshHealth, refreshAll, favorites, toggleFavorite, lastChecked }
}


