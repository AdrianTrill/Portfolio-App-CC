export type HealthStatus = 'UP' | 'DOWN' | 'UNKNOWN'

export interface Architecture {
  short: string
  diagram_url?: string | null
}

export interface Health {
  endpoint?: string | null
  status: HealthStatus
}

export interface AppInfo {
  id: string
  name: string
  description: string
  can_run_locally: boolean
  platforms: string[]
  tech_stack: string[]
  tags: string[]
  images: string[]
  architecture: Architecture
  health: Health
  repo_url?: string | null
  docs_url?: string | null
  run?: { command: string; notes?: string }
}

export interface HealthResponse {
  id: string
  status: HealthStatus
}


