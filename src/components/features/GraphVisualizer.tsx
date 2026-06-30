"use client"

import { useEffect, useRef, useState } from "react"
import ForceGraph2D from "react-force-graph-2d"

interface Props {
  isPreview?: boolean
}

// Generate random graph for load testing (1000 nodes, 1500 edges)
const generateData = (nodeCount: number, edgeCount: number) => {
  const nodes = Array.from({ length: nodeCount }).map((_, id) => ({
    id,
    group: Math.floor(Math.random() * 5),
    val: Math.random() * 5 + 1,
    name: ['@anon_user_', 'buzzer_bot_', 'aktivis_kampus_', 'media_lokal_'][Math.floor(Math.random() * 4)] + Math.random().toString(36).substring(7)
  }))
  const links = Array.from({ length: edgeCount }).map(() => ({
    source: Math.floor(Math.random() * nodeCount),
    target: Math.floor(Math.random() * nodeCount)
  }))
  return { nodes, links }
}

export default function GraphVisualizer({ isPreview = false }: Props) {
  const fgRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [data, setData] = useState({ nodes: [], links: [] })
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })
  
  useEffect(() => {
    setData(generateData(isPreview ? 100 : 1000, isPreview ? 150 : 1500) as any)
    
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        })
      }
    }
    
    // Slight delay to ensure container is fully rendered before measuring
    setTimeout(updateDimensions, 100)
    window.addEventListener('resize', updateDimensions)
    
    return () => window.removeEventListener('resize', updateDimensions)
  }, [isPreview])

  return (
    <div ref={containerRef} className="w-full h-full relative bg-[#020617] overflow-hidden">
      {!isPreview && (
        <div className="absolute top-4 left-4 z-10 bg-slate-900/80 border border-slate-700 p-3 rounded-lg backdrop-blur-sm pointer-events-none">
          <h3 className="font-mono text-primary text-sm font-bold flex items-center gap-2">
             <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
             WEBGL_RENDERER_ACTIVE
          </h3>
          <p className="text-xs text-slate-400 mt-1 font-mono">Nodes: {data.nodes.length} | Edges: {data.links.length}</p>
        </div>
      )}
      {isPreview && (
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#020617] to-transparent opacity-40"></div>
      )}
      <ForceGraph2D
        ref={fgRef}
        graphData={data}
        nodeLabel="name"
        nodeColor={(node: any) => {
          const colors = ['#facc15', '#ef4444', '#3b82f6', '#10b981', '#a855f7']
          return colors[node.group]
        }}
        nodeRelSize={isPreview ? 2 : 4}
        linkColor={() => 'rgba(148, 163, 184, 0.15)'}
        backgroundColor="#020617"
        width={dimensions.width}
        height={dimensions.height}
        enableNodeDrag={!isPreview}
        enableZoomInteraction={!isPreview}
        enablePanInteraction={!isPreview}
        warmupTicks={100} // Pre-calculate layout
        cooldownTicks={0} // Stop simulation after warmup
      />
    </div>
  )
}
