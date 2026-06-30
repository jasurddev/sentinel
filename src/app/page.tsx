"use client"

import { Activity, ShieldAlert, Database, Map as MapIcon, GitGraph, Terminal } from "lucide-react"
import Link from "next/link"
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

const GraphNoSSR = dynamic(() => import('@/components/features/GraphVisualizer'), { ssr: false })
const MapNoSSR = dynamic(() => import('@/components/features/GeoMap'), { ssr: false })

export default function Home() {
  // Live State Simulators
  const [ingestedCount, setIngestedCount] = useState(1450392)
  const [activeFeeds, setActiveFeeds] = useState(12)
  const [liveLogs, setLiveLogs] = useState<{id: number, time: string, msg: string}[]>([])

  // Odometer / Counter effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIngestedCount(prev => prev + Math.floor(Math.random() * 45) + 5)
    }, 800)
    return () => clearInterval(interval)
  }, [])

  // Live Logs effect
  useEffect(() => {
    // Inisialisasi awal di client untuk mencegah Hydration Error
    setLiveLogs([{ id: 1, time: new Date().toLocaleTimeString(), msg: "[SYS] Initializing OSINT Data Stream..." }])

    const messages = [
      "[X_SCRAPER] Ingested 1,420 tweets regarding query '#ReformasiJilid2'",
      "[TELEGRAM] Extracted 4 media files from Channel_BEM_SI",
      "[DB] Pinecone vector index updated with 'MBG' sentiment data",
      "[AI_ENGINE] Sentiment analysis completed: 68% Negative for MBG",
      "[OSINT] Discovered coordinated bot network amplifying #ReformasiJilid2",
      "[ALERT] Suspicious mass-mobilization directive found on Dark Web forum"
    ]

    const interval = setInterval(() => {
      const newMsg = messages[Math.floor(Math.random() * messages.length)]
      setLiveLogs(prev => {
        const updated = [...prev, { id: Date.now(), time: new Date().toLocaleTimeString(), msg: newMsg }]
        return updated.slice(-4) // Keep only last 4 logs
      })
      
      // Randomly fluctuate active feeds
      if(Math.random() > 0.7) {
        setActiveFeeds(prev => prev === 12 ? 14 : 12)
      }
    }, 2000)
    
    return () => clearInterval(interval)
  }, [])

  const topThreats = [
    { id: "ACT-01", actor: "Bot Farm JKT_Pusat", level: "CRITICAL", time: "LIVE" },
    { id: "ACT-02", actor: "Provocateur Net", level: "HIGH", time: "5m ago" },
    { id: "ACT-03", actor: "Anon_Aktivis", level: "HIGH", time: "12m ago" },
  ]

  const topFeeds = [
    { id: "FD-01", source: "Twitter (#MBG)", status: "ACTIVE", rate: "850/s" },
    { id: "FD-04", source: "TikTok OCR (Protest)", status: "ACTIVE", rate: "1200/s" },
    { id: "FD-02", source: "Telegram (BEM_SI)", status: "ACTIVE", rate: "12/s" },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header with Live Counters */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold font-mono tracking-tight text-slate-100 flex items-center gap-3">
            <Activity className="w-7 h-7 text-yellow-400 animate-pulse" /> OMNI_DASHBOARD
          </h1>
          <p className="text-slate-400 mt-1 text-sm">Real-time intelligence overview across all active modules.</p>
        </div>
        <div className="flex gap-8">
          <div className="text-right">
            <p className="text-[10px] font-mono text-slate-500 mb-1">ACTIVE_PIPELINES</p>
            <p className="text-2xl font-bold font-mono text-cyan-400 flex items-center gap-2 justify-end">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              {activeFeeds}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-mono text-slate-500 mb-1">TOTAL_INGESTED_DATA</p>
            <p className="text-2xl font-bold font-mono text-emerald-400 transition-all duration-300">
              {ingestedCount.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Live Log Terminal */}
      <div className="bg-[#020617] border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 h-28 overflow-hidden relative shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
        <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400/50 shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
        <div className="absolute top-2 right-4 text-[10px] text-slate-500 font-mono flex items-center gap-2">
          <Terminal className="w-3 h-3" /> LIVE_STREAM
        </div>
        <div className="flex flex-col gap-2 justify-end h-full mt-2">
          {liveLogs.map(log => (
            <div key={log.id} className="flex gap-3 animate-in slide-in-from-bottom-2 fade-in duration-300">
              <span className="text-slate-500 shrink-0">[{log.time}]</span>
              <span className={
                log.msg.includes("[ALERT]") ? "text-red-400 font-bold" : 
                log.msg.includes("[AI_ENGINE]") ? "text-purple-400" : 
                log.msg.includes("[SHODAN]") ? "text-cyan-400" :
                "text-emerald-400"
              }>
                {log.msg}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        
        {/* Link Analysis Preview */}
        <Link href="/graph" className="xl:col-span-2 row-span-2 bg-card border border-border rounded-xl flex flex-col overflow-hidden group hover:border-slate-700 transition-all h-[400px]">
          <div className="p-4 border-b border-border flex items-center justify-between bg-slate-900/50">
            <h2 className="font-semibold text-slate-200 font-mono flex items-center gap-2">
              <GitGraph className="w-4 h-4 text-primary" /> LINK_ANALYSIS
            </h2>
            <span className="text-xs text-slate-500 font-mono group-hover:text-primary transition-colors">View Full Graph →</span>
          </div>
          <div className="flex-1 relative">
            <GraphNoSSR isPreview={true} />
          </div>
        </Link>

        {/* GEOINT Map Preview */}
        <Link href="/map" className="xl:col-span-2 row-span-2 bg-card border border-border rounded-xl flex flex-col overflow-hidden group hover:border-slate-700 transition-all h-[400px]">
          <div className="p-4 border-b border-border flex items-center justify-between bg-slate-900/50">
            <h2 className="font-semibold text-slate-200 font-mono flex items-center gap-2">
              <MapIcon className="w-4 h-4 text-cyan-400" /> GEOINT_MAP
            </h2>
            <span className="text-xs text-slate-500 font-mono group-hover:text-cyan-400 transition-colors">Open Map →</span>
          </div>
          <div className="flex-1 relative">
            <MapNoSSR isPreview={true} />
          </div>
        </Link>

        {/* Threat Intel Preview */}
        <Link href="/threats" className="xl:col-span-2 bg-card border border-border rounded-xl flex flex-col group hover:border-slate-700 transition-all h-[300px]">
          <div className="p-4 border-b border-border flex items-center justify-between bg-slate-900/50">
            <h2 className="font-semibold text-slate-200 font-mono flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-500" /> THREAT_INTEL
            </h2>
            <span className="text-xs text-slate-500 font-mono group-hover:text-red-400 transition-colors">All Threats →</span>
          </div>
          <div className="p-4 flex-1 overflow-auto no-scrollbar">
            <div className="space-y-3">
              {topThreats.map(t => (
                <div key={t.id} className="flex justify-between items-center bg-slate-900/50 border border-slate-800 p-3 rounded-lg group-hover:bg-slate-800/50 transition-colors">
                  <div>
                    <p className="font-medium text-sm text-slate-200">{t.actor}</p>
                    <p className="text-xs text-slate-500 font-mono mt-1 flex items-center gap-1">
                      {t.time === 'LIVE' && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>}
                      {t.time}
                    </p>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-1 rounded border ${
                        t.level === 'CRITICAL' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                        'bg-orange-500/10 text-orange-400 border-orange-500/20'
                  }`}>
                    {t.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Link>

        {/* Data Feeds Preview */}
        <Link href="/feeds" className="xl:col-span-2 bg-card border border-border rounded-xl flex flex-col group hover:border-slate-700 transition-all h-[300px]">
          <div className="p-4 border-b border-border flex items-center justify-between bg-slate-900/50">
            <h2 className="font-semibold text-slate-200 font-mono flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-500" /> DATA_FEEDS
            </h2>
            <span className="text-xs text-slate-500 font-mono group-hover:text-emerald-400 transition-colors">Manage Feeds →</span>
          </div>
          <div className="p-4 flex-1 overflow-auto no-scrollbar">
            <div className="space-y-3">
              {topFeeds.map(f => (
                <div key={f.id} className="flex justify-between items-center bg-slate-900/50 border border-slate-800 p-3 rounded-lg group-hover:bg-slate-800/50 transition-colors">
                  <div>
                    <p className="font-medium text-sm text-slate-200">{f.source}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <p className="text-xs text-slate-500 font-mono">{f.status}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                    {f.rate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Link>

      </div>
    </div>
  )
}
