"use client"

import { useEffect, useRef, useState } from "react"
import ForceGraph2D from "react-force-graph-2d"

interface Props {
  isPreview?: boolean
}

// Generate structured dummy graph for presentation (Massive Scale)
const generateData = () => {
  const nodes = [
    { id: 'TGT-1', name: 'AHMAD MULYADI', group: 'CRITICAL', val: 18 },
    { id: 'TGT-2', name: 'KORLAP PUSAT', group: 'CRITICAL', val: 14 },
    { id: 'HUB-1', name: '@ahmad_rebel', group: 'ACCOUNT', val: 10 },
    { id: 'HUB-2', name: 'Telegram (Ops Group)', group: 'ORG', val: 12 },
    { id: 'HUB-3', name: '103.45.X.X (C2)', group: 'IP', val: 8 },
    { id: 'HUB-4', name: '0812-XXXX-9999', group: 'PHONE', val: 8 },
    { id: 'HUB-5', name: 'BEM KAMPUS Y', group: 'ORG', val: 10 },
  ]
  const links = [
    { source: 'TGT-1', target: 'HUB-1' },
    { source: 'TGT-1', target: 'HUB-2' },
    { source: 'TGT-1', target: 'HUB-4' },
    { source: 'TGT-2', target: 'HUB-2' },
    { source: 'TGT-2', target: 'HUB-5' },
    { source: 'HUB-1', target: 'HUB-3' },
    { source: 'HUB-4', target: 'HUB-5' },
  ]

  // Massive botnet cluster
  for(let i=1; i<=150; i++) {
    nodes.push({ id: `bot-${i}`, name: '', group: 'BOT', val: 2 })
    links.push({ source: 'HUB-1', target: `bot-${i}` })
    if(i % 5 === 0) links.push({ source: 'HUB-3', target: `bot-${i}` })
  }
  
  // Massive telegram members / sympathizers
  for(let i=1; i<=120; i++) {
    nodes.push({ id: `tg-${i}`, name: '', group: 'USER', val: 3 })
    links.push({ source: 'HUB-2', target: `tg-${i}` })
    if(i % 12 === 0) links.push({ source: 'HUB-4', target: `tg-${i}` })
  }

  // Student org network
  for(let i=1; i<=80; i++) {
    nodes.push({ id: `mhs-${i}`, name: '', group: 'USER', val: 3 })
    links.push({ source: 'HUB-5', target: `mhs-${i}` })
    if(i % 8 === 0) links.push({ source: 'TGT-2', target: `mhs-${i}` })
  }

  // Cross-pollination links for organic look
  for(let i=0; i<40; i++) {
    links.push({
      source: `bot-${Math.floor(Math.random()*150)+1}`,
      target: `tg-${Math.floor(Math.random()*120)+1}`
    })
  }

  return { nodes, links }
}

export default function GraphVisualizer({ isPreview = false }: Props) {
  const fgRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [data, setData] = useState({ nodes: [], links: [] })
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })
  
  useEffect(() => {
    setData(generateData() as any)
    
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
    // Force redraw loop to keep the blinking animation running
    const interval = setInterval(() => {
      if (fgRef.current) {
        // A tiny invisible zoom adjustment to trigger canvas redraw
        const z = fgRef.current.zoom();
        fgRef.current.zoom(z + 0.000001);
        fgRef.current.zoom(z - 0.000001);
      }
    }, 50);

    return () => {
      window.removeEventListener('resize', updateDimensions)
      clearInterval(interval)
    }
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
        nodeCanvasObject={(node: any, ctx, globalScale) => {
          const label = node.name;
          const fontSize = 12 / globalScale;
          
          // Colors
          let color = '#3b82f6';
          if (node.group === 'CRITICAL') color = '#ef4444';
          else if (node.group === 'ACCOUNT') color = '#facc15';
          else if (node.group === 'ORG') color = '#10b981';
          else if (node.group === 'LOC' || node.group === 'IP') color = '#a855f7';
          else if (node.group === 'PHONE') color = '#f97316';
          else if (node.group === 'BOT') color = '#334155';
          else if (node.group === 'USER') color = '#475569';

          // Blinking effect for CRITICAL
          if (node.group === 'CRITICAL') {
            const t = Date.now() / 150;
            const radius = node.val + 2 + Math.abs(Math.sin(t)) * 5;
            ctx.beginPath();
            ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(239, 68, 68, 0.8)';
            ctx.lineWidth = 1.5 / globalScale;
            ctx.stroke();
          }

          // Node circle
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.val, 0, 2 * Math.PI, false);
          ctx.fillStyle = color;
          ctx.fill();

          // Text Label
          if (label && (globalScale > 1.2 || node.group === 'CRITICAL' || node.group === 'ACCOUNT' || node.group === 'ORG' || node.group === 'IP' || node.group === 'PHONE')) {
            ctx.font = `900 ${fontSize}px "Arial Black", Impact, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillStyle = node.group === 'CRITICAL' ? '#fca5a5' : '#f8fafc';
            
            // Add a subtle text shadow for readability
            ctx.shadowColor = 'rgba(0,0,0,0.8)';
            ctx.shadowBlur = 4;
            ctx.fillText(label, node.x, node.y + node.val + (4/globalScale));
            ctx.shadowBlur = 0; // reset
          }
        }}
        linkColor={() => 'rgba(148, 163, 184, 0.15)'}
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={1.5}
        linkDirectionalParticleColor={() => 'rgba(34, 211, 238, 0.7)'}
        linkDirectionalParticleSpeed={0.005}
        backgroundColor="#020617"
        width={dimensions.width}
        height={dimensions.height}
        enableNodeDrag={!isPreview}
        enableZoomInteraction={!isPreview}
        enablePanInteraction={!isPreview}
        warmupTicks={50}
        cooldownTicks={150}
      />
    </div>
  )
}
