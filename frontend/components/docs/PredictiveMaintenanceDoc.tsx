export function PredictiveMaintenanceDoc() {
  return (
    <div className="max-h-[70vh] overflow-auto px-1 max-w-none space-y-4 text-slate-100">
      <h1 className="text-2xl font-semibold text-[#2e5cff]">Predictive Maintenance</h1>
      <p className="text-sm text-slate-200">
        Predictive Maintenance is a demo showing a Next.js frontend (with Tailwind CSS) backed by a
        FastAPI service. It aggregates telemetry (e.g., pumps), checks health via HTTP, and presents a
        clean UI for status monitoring and details.
      </p>
      <h2 className="text-lg font-medium text-slate-100">What you can do</h2>
      <ul className="list-disc pl-5 text-sm text-slate-200 space-y-1">
        <li>Open the details modal with a 1–4 image carousel</li>
        <li>Refresh health per app or in bulk</li>
        <li>Pin favorites to keep them at the top</li>
      </ul>
      <h2 className="text-lg font-medium text-slate-100">Architecture</h2>
      <p className="text-sm text-slate-200">
        Next.js App Router + Tailwind CSS for UI; FastAPI for endpoints. Health computed with a 1.5s
        timeout against per-app endpoints.
      </p>
      <h2 className="text-lg font-medium text-slate-100">Local run</h2>
      <pre className="rounded bg-[#0b1220] p-3 text-slate-100 text-sm"><code>bash scripts/setup_all.sh
bash scripts/run_backend.sh
bash scripts/run_frontend.sh</code></pre>
      <p className="text-sm text-slate-200">
        Open <code>http://localhost:3000</code>. Backend defaults to <code>http://localhost:8000</code>
        (override with <code>NEXT_PUBLIC_API_BASE</code>).
      </p>
    </div>
  )
}


