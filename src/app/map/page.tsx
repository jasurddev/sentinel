"use client"
import { Map as MapIcon } from "lucide-react"
import dynamic from 'next/dynamic'

const MapNoSSR = dynamic(() => import('@/components/features/GeoMap'), { ssr: false })

export default function MapPage() {
  return (
    <div className="h-full w-full flex flex-col gap-4">
      <div className="shrink-0">
        <h1 className="text-2xl font-bold font-mono tracking-tight text-slate-100 flex items-center gap-3">
          <MapIcon className="w-7 h-7 text-cyan-400" /> GEOINT_MAP
        </h1>
        <p className="text-slate-400 mt-1 text-sm">Geospatial Intelligence mapping using CartoDB Dark Matter (Free OSM Tiles).</p>
      </div>
      
      <div className="flex-1 min-h-0 bg-[#020617] rounded-xl border border-border relative overflow-hidden">
        <MapNoSSR />
      </div>
    </div>
  )
}
