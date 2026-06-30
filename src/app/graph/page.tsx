"use client"
import dynamic from 'next/dynamic'

const GraphNoSSR = dynamic(() => import('@/components/features/GraphVisualizer'), { ssr: false })

export default function GraphPage() {
  return (
    <div className="h-full w-full flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold font-mono tracking-tight text-slate-100">LINK_ANALYSIS</h1>
        <p className="text-slate-400 mt-1 text-sm">Entity relationship mapping and clustering using Force Directed Graph.</p>
      </div>
      <div className="flex-1 min-h-0 bg-card rounded-xl border border-border relative overflow-hidden">
        <GraphNoSSR />
      </div>
    </div>
  )
}
