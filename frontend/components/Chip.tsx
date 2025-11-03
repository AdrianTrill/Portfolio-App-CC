import { clsx } from 'clsx'

export function Chip({ label, variant = 'default' }: { label: string; variant?: 'default' | 'tech' | 'tag' }) {
  const styles = clsx(
    'inline-block rounded-md px-2 py-0.5 text-xs',
    variant === 'tech' && 'bg-blue-50 text-blue-700',
    variant === 'tag' && 'bg-purple-50 text-purple-700',
    variant === 'default' && 'bg-gray-100 text-gray-700',
  )
  return <span className={styles}>{label}</span>
}


