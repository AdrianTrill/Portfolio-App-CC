import type { HealthStatus } from '@/types/app'
import { clsx } from 'clsx'

export function StatusPill({ status }: { status: HealthStatus }) {
  const color =
    status === 'UP' ? 'bg-green-100 text-green-800' : status === 'DOWN' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-700'

  return (
    <span className={clsx('inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium', color)}>
      {status}
    </span>
  )
}


