"use client"

import { Activity, ShieldAlert, Database, Map as MapIcon, GitGraph, Terminal, Radio, ScanFace, Megaphone, Smartphone, Shield } from "lucide-react"
import Link from "next/link"
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

const GraphNoSSR = dynamic(() => import('@/components/features/GraphVisualizer'), { ssr: false })
const MapNoSSR = dynamic(() => import('@/components/features/GeoMap'), { ssr: false })

export default function Home() {
  const [ingestedCount, setIngestedCount] = useState(1450392)
  const [activeFeeds, setActiveFeeds] = useState(12)
  const [liveLogs, setLiveLogs] = useState<{id: number, time: string, msg: string}[]>([])
  const [pillarStatus, setPillarStatus] = useState({
    semantis: { health: 98, status: "ONLINE" },
    netra: { health: 94, status: "ONLINE" },
    buzzer: { health: 87, status: "ACTIVE" },
    cellebrite: { health: 100, status: "STANDBY" },
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setIngestedCount(prev => prev + Math.floor(Math.random() * 45) + 5)
    }, 800)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setLiveLogs([{ id: 1, time: new Date().toLocaleTimeString(), msg: "[SYS] SENTINEL C2 Platform initialized. All subsystems nominal." }])

    const messages = [
      "[SEMANTIS] Ingested 1,420 tweets regarding '#ReformasiJilid2' — Sentiment: 68% Hostile",
      "[NETRA] Face match confirmed: TANGO-01 detected at JKT_Pusat CCTV Node-7",
      "[BUZZER] Campaign BZ-001 deployed 142 counter-narrative posts on Twitter/X",
      "[CELLEBRITE] Case CS-002 extraction complete — 89K artifacts recovered",
      "[SEMANTIS] Coordinated bot cluster detected amplifying anti-MBG hashtag",
      "[NETRA] NIK lookup result: Subject matched to Dukcapil record #471***",
      "[BUZZER] Engagement rate for BZ-002 (TikTok) reached 6.8% — above threshold",
      "[ALERT] Mass-mobilization directive intercepted from encrypted Telegram channel",
    ]

    const interval = setInterval(() => {
      const newMsg = messages[Math.floor(Math.random() * messages.length)]
      setLiveLogs(prev => {
        const updated = [...prev, { id: Date.now(), time: new Date().toLocaleTimeString(), msg: newMsg }]
        return updated.slice(-5)
      })
      if(Math.random() > 0.7) {
        setActiveFeeds(prev => prev === 12 ? 14 : 12)
      }
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  // Fluctuate pillar health
  useEffect(() => {
    const interval = setInterval(() => {
      setPillarStatus(prev => ({
        semantis: { ...prev.semantis, health: 95 + Math.floor(Math.random() * 5) },
        netra: { ...prev.netra, health: 91 + Math.floor(Math.random() * 8) },
        buzzer: { ...prev.buzzer, health: 84 + Math.floor(Math.random() * 10) },
        cellebrite: { ...prev.cellebrite, health: 100 },
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const topThreats = [
    { id: "ACT-01", actor: "Bot Farm JKT_Pusat", level: "CRITICAL", time: "LIVE" },
    { id: "ACT-02", actor: "Provocateur Network", level: "HIGH", time: "5m ago" },
    { id: "ACT-03", actor: "Anon_Aktivis", level: "HIGH", time: "12m ago" },
  ]

  return (
    <div className="flex flex-col gap-5">
      {/* Page Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold font-mono tracking-tight text-slate-100 flex items-center gap-3">
            <Shield className="w-7 h-7 text-yellow-400" /> SENTINEL_COMMAND_CENTER
          </h1>
          <p className="text-slate-400 mt-1 text-sm">Unified C2 Platform — All subsystems operational.</p>
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
            <p className="text-[10px] font-mono text-slate-500 mb-1">TOTAL_INGESTED</p>
            <p className="text-2xl font-bold font-mono text-emerald-400 transition-all duration-300">
              {ingestedCount.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* 4 PILLARS STATUS */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        <Link href="/medmon" className="bg-card border border-border rounded-xl p-4 group hover:border-emerald-500/30 transition-all active:scale-[0.98]">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg"><Radio className="w-5 h-5 text-emerald-500" /></div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">{pillarStatus.semantis.status}</span>
          </div>
          <h3 className="font-mono text-sm font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">SEMANTIS</h3>
          <p className="text-[11px] text-slate-500 mt-1">Media Monitoring & SNA</p>
          <div className="mt-3 w-full bg-slate-800 h-1 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full transition-all duration-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" style={{ width: `${pillarStatus.semantis.health}%` }}></div>
          </div>
          <p className="text-[10px] font-mono text-slate-500 mt-1">Health: {pillarStatus.semantis.health}%</p>
        </Link>

        <Link href="/netra" className="bg-card border border-border rounded-xl p-4 group hover:border-cyan-500/30 transition-all active:scale-[0.98]">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-cyan-500/10 rounded-lg"><ScanFace className="w-5 h-5 text-cyan-400" /></div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">{pillarStatus.netra.status}</span>
          </div>
          <h3 className="font-mono text-sm font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">NETRA</h3>
          <p className="text-[11px] text-slate-500 mt-1">Face Recognition & Profiling</p>
          <div className="mt-3 w-full bg-slate-800 h-1 rounded-full overflow-hidden">
            <div className="bg-cyan-500 h-full transition-all duration-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]" style={{ width: `${pillarStatus.netra.health}%` }}></div>
          </div>
          <p className="text-[10px] font-mono text-slate-500 mt-1">Health: {pillarStatus.netra.health}%</p>
        </Link>

        <Link href="/buzzer" className="bg-card border border-border rounded-xl p-4 group hover:border-yellow-500/30 transition-all active:scale-[0.98]">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-yellow-500/10 rounded-lg"><Megaphone className="w-5 h-5 text-yellow-400" /></div>
            <span className="text-[10px] font-mono text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20">{pillarStatus.buzzer.status}</span>
          </div>
          <h3 className="font-mono text-sm font-bold text-slate-200 group-hover:text-yellow-400 transition-colors">BUZZER OPS</h3>
          <p className="text-[11px] text-slate-500 mt-1">Information Warfare</p>
          <div className="mt-3 w-full bg-slate-800 h-1 rounded-full overflow-hidden">
            <div className="bg-yellow-500 h-full transition-all duration-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]" style={{ width: `${pillarStatus.buzzer.health}%` }}></div>
          </div>
          <p className="text-[10px] font-mono text-slate-500 mt-1">Health: {pillarStatus.buzzer.health}%</p>
        </Link>

        <Link href="/cellebrite" className="bg-card border border-border rounded-xl p-4 group hover:border-purple-500/30 transition-all active:scale-[0.98]">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-purple-500/10 rounded-lg"><Smartphone className="w-5 h-5 text-purple-400" /></div>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">{pillarStatus.cellebrite.status}</span>
          </div>
          <h3 className="font-mono text-sm font-bold text-slate-200 group-hover:text-purple-400 transition-colors">CELLEBRITE</h3>
          <p className="text-[11px] text-slate-500 mt-1">Digital Forensics</p>
          <div className="mt-3 w-full bg-slate-800 h-1 rounded-full overflow-hidden">
            <div className="bg-purple-500 h-full transition-all duration-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" style={{ width: `${pillarStatus.cellebrite.health}%` }}></div>
          </div>
          <p className="text-[10px] font-mono text-slate-500 mt-1">Health: {pillarStatus.cellebrite.health}%</p>
        </Link>
      </div>

      {/* Live Log Terminal */}
      <div className="bg-[#020617] border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 h-32 overflow-hidden relative shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
        <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400/50 shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
        <div className="absolute top-2 right-4 text-[10px] text-slate-500 font-mono flex items-center gap-2">
          <Terminal className="w-3 h-3" /> C2_LIVE_STREAM
        </div>
        <div className="flex flex-col gap-2 justify-end h-full mt-2">
          {liveLogs.map(log => (
            <div key={log.id} className="flex gap-3 animate-in slide-in-from-bottom-2 fade-in duration-300">
              <span className="text-slate-500 shrink-0">[{log.time}]</span>
              <span className={
                log.msg.includes("[ALERT]") ? "text-red-400 font-bold" : 
                log.msg.includes("[SEMANTIS]") ? "text-emerald-400" : 
                log.msg.includes("[NETRA]") ? "text-cyan-400" :
                log.msg.includes("[BUZZER]") ? "text-yellow-400" :
                log.msg.includes("[CELLEBRITE]") ? "text-purple-400" :
                "text-slate-300"
              }>
                {log.msg}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Intelligence Preview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        
        {/* Link Analysis Preview */}
        <Link href="/graph" className="xl:col-span-2 row-span-2 bg-card border border-border rounded-xl flex flex-col overflow-hidden group hover:border-slate-700 transition-all h-[350px]">
          <div className="p-3 border-b border-border flex items-center justify-between bg-slate-900/50">
            <h2 className="font-semibold text-slate-200 font-mono text-sm flex items-center gap-2">
              <GitGraph className="w-4 h-4 text-primary" /> LINK_ANALYSIS
            </h2>
            <span className="text-xs text-slate-500 font-mono group-hover:text-primary transition-colors">View Graph →</span>
          </div>
          <div className="flex-1 relative">
            <GraphNoSSR isPreview={true} />
          </div>
        </Link>

        {/* GEOINT Map Preview */}
        <Link href="/map" className="xl:col-span-2 row-span-2 bg-card border border-border rounded-xl flex flex-col overflow-hidden group hover:border-slate-700 transition-all h-[350px]">
          <div className="p-3 border-b border-border flex items-center justify-between bg-slate-900/50">
            <h2 className="font-semibold text-slate-200 font-mono text-sm flex items-center gap-2">
              <MapIcon className="w-4 h-4 text-cyan-400" /> GEOINT_MAP
            </h2>
            <span className="text-xs text-slate-500 font-mono group-hover:text-cyan-400 transition-colors">Open Map →</span>
          </div>
          <div className="flex-1 relative">
            <MapNoSSR isPreview={true} />
          </div>
        </Link>

        {/* Threat Intel Preview */}
        <Link href="/threats" className="xl:col-span-2 bg-card border border-border rounded-xl flex flex-col group hover:border-slate-700 transition-all">
          <div className="p-3 border-b border-border flex items-center justify-between bg-slate-900/50">
            <h2 className="font-semibold text-slate-200 font-mono text-sm flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-500" /> THREAT_INTEL
            </h2>
            <span className="text-xs text-slate-500 font-mono group-hover:text-red-400 transition-colors">All Threats →</span>
          </div>
          <div className="p-3 flex-1 overflow-auto no-scrollbar">
            <div className="space-y-2">
              {topThreats.map(t => (
                <div key={t.id} className="flex justify-between items-center bg-slate-900/50 border border-slate-800 p-3 rounded-lg">
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
        <Link href="/feeds" className="xl:col-span-2 bg-card border border-border rounded-xl flex flex-col group hover:border-slate-700 transition-all">
          <div className="p-3 border-b border-border flex items-center justify-between bg-slate-900/50">
            <h2 className="font-semibold text-slate-200 font-mono text-sm flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-500" /> DATA_FEEDS
            </h2>
            <span className="text-xs text-slate-500 font-mono group-hover:text-emerald-400 transition-colors">Manage →</span>
          </div>
          <div className="p-3 flex-1 overflow-auto no-scrollbar">
            <div className="space-y-2">
              {[
                { source: "Twitter (#MBG)", rate: "850/s" },
                { source: "TikTok OCR (Protest)", rate: "1200/s" },
                { source: "Telegram (BEM_SI)", rate: "12/s" },
              ].map(f => (
                <div key={f.source} className="flex justify-between items-center bg-slate-900/50 border border-slate-800 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <p className="font-medium text-sm text-slate-200">{f.source}</p>
                  </div>
                  <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">{f.rate}</span>
                </div>
              ))}
            </div>
          </div>
        </Link>

      </div>
    </div>
  )
}
