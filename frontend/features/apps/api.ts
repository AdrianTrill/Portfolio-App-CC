import type { AppInfo, HealthResponse } from '@/types/app'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000'

export async function listApps(): Promise<AppInfo[]> {
  const res = await fetch(`${API_BASE}/api/apps`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch apps')
  return res.json()
}

export async function checkHealth(id: string): Promise<HealthResponse> {
  const res = await fetch(`${API_BASE}/api/health/${id}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to refresh health')
  return res.json()
}


