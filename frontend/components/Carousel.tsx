"use client"

import { useEffect, useRef, useState } from 'react'

export function Carousel({ images, altPrefix }: { images: string[]; altPrefix: string }) {
  const [index, setIndex] = useState(0)
  const total = images.length
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState(false)

  const prev = () => setIndex(i => (i - 1 + total) % total)
  const next = () => setIndex(i => (i + 1) % total)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [total])

  const currentSrc = (() => {
    const src = images[index] || ''
    // Normalize: ensure it starts with "/" and has an extension. Default to .svg
    const withLeading = src.startsWith('/') ? src : `/${src}`
    if (/\.(png|jpg|jpeg|gif|webp|svg)$/i.test(withLeading)) return withLeading
    // Default to .png when extension is missing
    return `${withLeading}.png`
  })()

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden rounded-md border bg-white">
      <div className="aspect-video flex items-center justify-center bg-gray-100">
        {/* Using next/image is optional; plain img keeps it simple here */}
        {!error ? (
          <img
            src={currentSrc}
            alt={`${altPrefix} ${index + 1}`}
            className="h-full w-full object-contain"
            onError={() => setError(true)}
          />
        ) : (
          <div className="text-sm text-gray-500">Image not found: {currentSrc}</div>
        )}
      </div>
      {total > 1 && (
        <div className="absolute inset-0 flex items-center justify-between p-2">
          <button aria-label="Previous" onClick={prev} className="rounded bg-white/80 px-2 py-1 text-sm shadow">
            ◀
          </button>
          <button aria-label="Next" onClick={next} className="rounded bg-white/80 px-2 py-1 text-sm shadow">
            ▶
          </button>
        </div>
      )}
      {total > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
          {images.map((_, i) => (
            <span key={i} className={`h-2 w-2 rounded-full ${i === index ? 'bg-gray-800' : 'bg-gray-300'}`} />
          ))}
        </div>
      )}
    </div>
  )
}


