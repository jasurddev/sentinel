"use client"

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

interface Props {
  isPreview?: boolean
}

export default function GeoMap({ isPreview = false }: Props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="w-full h-full relative rounded-xl overflow-hidden z-0">
      <MapContainer 
        center={isPreview ? [-2, 118] : [-2, 118]} 
        zoom={isPreview ? 4 : 5} 
        style={{ height: '100%', width: '100%', background: '#020617' }}
        zoomControl={!isPreview}
        dragging={!isPreview}
        scrollWheelZoom={!isPreview}
        doubleClickZoom={!isPreview}
        touchZoom={!isPreview}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {/* Dummy Target 1 */}
        <CircleMarker center={[-6.2088, 106.8456]} radius={isPreview ? 4 : 6} color="#ef4444" fillColor="#ef4444" fillOpacity={0.8}>
          {!isPreview && (
            <Popup>
              <div className="bg-slate-900 p-1 text-slate-200 font-mono text-xs">
                <strong className="text-red-500">OP_CENTER_JKT</strong><br/>
                Coordinated Buzzer Farm (MBG Topic)
              </div>
            </Popup>
          )}
        </CircleMarker>

        {/* Dummy Target 2 */}
        <CircleMarker center={[-6.9175, 107.6191]} radius={isPreview ? 4 : 6} color="#facc15" fillColor="#facc15" fillOpacity={0.8}>
          {!isPreview && (
            <Popup>
              <div className="bg-slate-900 p-1 text-slate-200 font-mono text-xs">
                <strong className="text-yellow-500">NODE_BDG</strong><br/>
                Student Movement Aggregation (#ReformasiJilid2)
              </div>
            </Popup>
          )}
        </CircleMarker>

        {/* Dummy Target 3 */}
        <CircleMarker center={[-7.7956, 110.3695]} radius={isPreview ? 4 : 6} color="#22d3ee" fillColor="#22d3ee" fillOpacity={0.8}>
          {!isPreview && (
            <Popup>
              <div className="bg-slate-900 p-1 text-slate-200 font-mono text-xs">
                <strong className="text-cyan-500">ACT_YGY</strong><br/>
                Amplification Network detected.
              </div>
            </Popup>
          )}
        </CircleMarker>
      </MapContainer>
      
      {!isPreview && (
        <div className="absolute top-4 left-4 z-[400] bg-slate-900/80 border border-slate-700 p-3 rounded-lg backdrop-blur-sm pointer-events-none">
          <h3 className="font-mono text-cyan-400 text-sm font-bold flex items-center gap-2">
             <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
             OSM_CARTO_DARK_ACTIVE
          </h3>
          <p className="text-xs text-slate-400 mt-1 font-mono">Tracking: 3 Active Nodes</p>
        </div>
      )}
      {isPreview && (
        <div className="absolute inset-0 z-[400] pointer-events-none shadow-[inset_0_0_40px_rgba(2,6,23,1)]"></div>
      )}
    </div>
  )
}
