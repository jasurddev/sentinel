'use client'

import { useState, useEffect } from 'react'
import {
  Radio,
  Activity,
  TrendingDown,
  TrendingUp,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Brain,
  Users,
  Sparkles,
  Download,
} from 'lucide-react'
import { TechTelemetryPanel } from '@/components/features/TechTelemetryPanel'
import { triggerMockDownload } from '@/lib/downloadMock'

/* ─── Types ─────────────────────────────────────────────────────── */

interface Narrative {
  id: string
  name: string
  platforms: string[]
  sentiment: number          // -100 to +100
  volume: string
  trend: 'UP' | 'STABLE' | 'DECLINING'
}

interface Influencer {
  handle: string
  reach: string
  sentiment: 'Hostile' | 'Neutral' | 'Supportive'
}

/* ─── Data ──────────────────────────────────────────────────────── */

const narratives: Narrative[] = [
  { id: 'NR-01', name: '#ReformasiJilid2',      platforms: ['Twitter', 'TikTok'],       sentiment: -67, volume: '124K', trend: 'UP' },
  { id: 'NR-02', name: 'Pro-MBG Campaign',      platforms: ['Twitter', 'Instagram'],    sentiment:  42, volume: '89K',  trend: 'STABLE' },
  { id: 'NR-03', name: 'Hoax: Anggaran Bocor',  platforms: ['WhatsApp', 'Telegram'],    sentiment: -81, volume: '45K',  trend: 'UP' },
  { id: 'NR-04', name: 'Student Movement Unity', platforms: ['Telegram', 'TikTok'],     sentiment: -23, volume: '31K',  trend: 'DECLINING' },
]

const influencers: Influencer[] = [
  { handle: '@reform_warrior',  reach: '1.2M', sentiment: 'Hostile' },
  { handle: '@berita_rakyat99', reach: '890K', sentiment: 'Hostile' },
  { handle: '@faktual_id',      reach: '2.1M', sentiment: 'Neutral' },
]

/* ─── Helpers ───────────────────────────────────────────────────── */

function sentimentColor(value: number): string {
  if (value <= -60) return 'bg-red-500'
  if (value <= -20) return 'bg-orange-500'
  if (value < 20)   return 'bg-yellow-500'
  return 'bg-emerald-500'
}

function sentimentTextColor(value: number): string {
  if (value <= -60) return 'text-red-400'
  if (value <= -20) return 'text-orange-400'
  if (value < 20)   return 'text-yellow-400'
  return 'text-emerald-400'
}

function sentimentGlow(value: number): string {
  if (value <= -60) return 'shadow-[0_0_10px_rgba(239,68,68,0.5)]'
  if (value <= -20) return 'shadow-[0_0_10px_rgba(249,115,22,0.5)]'
  if (value < 20)   return 'shadow-[0_0_10px_rgba(234,179,8,0.5)]'
  return 'shadow-[0_0_10px_rgba(16,185,129,0.5)]'
}

function trendBadge(trend: Narrative['trend']) {
  switch (trend) {
    case 'UP':
      return (
        <span className="flex items-center gap-1 text-red-400 text-[10px] font-mono bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded">
          <ArrowUpRight className="w-3 h-3" /> RISING
        </span>
      )
    case 'STABLE':
      return (
        <span className="flex items-center gap-1 text-yellow-400 text-[10px] font-mono bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded">
          <Minus className="w-3 h-3" /> STABLE
        </span>
      )
    case 'DECLINING':
      return (
        <span className="flex items-center gap-1 text-emerald-400 text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
          <ArrowDownRight className="w-3 h-3" /> DECLINING
        </span>
      )
  }
}

function influencerColor(sentiment: Influencer['sentiment']): string {
  if (sentiment === 'Hostile') return 'text-red-400'
  if (sentiment === 'Neutral') return 'text-yellow-400'
  return 'text-emerald-400'
}

/* ─── Page Component ────────────────────────────────────────────── */

export default function MedmonPage() {
  const [mounted, setMounted] = useState(false)
  const [showTelemetry, setShowTelemetry] = useState(false)

  const handleDownloadCSV = () => {
    const csvContent = `id,platform,text,sentiment,author,timestamp
1,Twitter,"Mosi tidak percaya, turun ke jalan!",-0.89,@user123,2026-06-29T14:00:00Z
2,TikTok,"Gas terus kawan-kawan, jangan kasih kendor",-0.75,@rebel_tiktok,2026-06-29T14:05:00Z
3,Telegram,"Instruksi korlap sudah turun, titik kumpul di patung kuda",-0.6,@anon_99,2026-06-29T14:10:00Z
4,Twitter,"Anggaran bocor kemana nih??",-0.92,@warga_biasa,2026-06-29T14:12:00Z
5,Instagram,"Tetap damai ya teman-teman",0.45,@peace_maker,2026-06-29T14:15:00Z`
    
    triggerMockDownload(`SEMANTIS_RAW_DATA_${Date.now()}.csv`, csvContent, "text/csv")
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="h-full flex flex-col gap-6">
      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="flex justify-between items-end shrink-0">
        <div>
          <h1 className="text-2xl font-bold font-sans tracking-tight text-zinc-100 flex items-center gap-3">
            <Radio className="w-7 h-7 text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" /> SEMANTIS_MEDMON
          </h1>
          <p className="text-zinc-500 font-sans mt-1 text-sm">
            Real-time media monitoring, sentiment analysis, and Social Network Analysis (SNA).
          </p>
        </div>

        <div className="flex gap-3">
          <button onClick={handleDownloadCSV} className="bg-zinc-950/50 hover:bg-zinc-900 text-xs font-mono text-emerald-500 border border-emerald-900/30 hover:border-emerald-500/50 px-3 py-1.5 rounded-sm transition-colors flex items-center gap-2 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
            <Download className="w-3 h-3" /> EXPORT_CSV
          </button>
          <button onClick={() => setShowTelemetry(true)} className="bg-zinc-950/50 hover:bg-zinc-900 text-xs font-mono text-zinc-400 hover:text-emerald-400 border border-white/[0.05] px-3 py-1.5 rounded-sm transition-colors flex items-center gap-2 shadow-sm">
            <Activity className="w-3 h-3 text-emerald-500" /> SYS_DIAGNOSTICS
          </button>
          <div className="bg-emerald-500/5 border border-emerald-500/20 px-3 py-1.5 rounded-sm flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            <span className="text-emerald-400 font-sans text-[10px] font-bold tracking-widest uppercase">
              LIVE
            </span>
          </div>
        </div>
      </div>

      {/* ── Stats Row ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
        {/* Mentions Tracked */}
        <div className="glass-card p-4 rounded-md flex items-center gap-4">
          <div className="p-3 bg-emerald-500/5 rounded-sm micro-border">
            <Activity className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <p className="text-[10px] font-sans font-semibold tracking-widest text-zinc-500 uppercase">MENTIONS_TRACKED</p>
            <p className="text-2xl font-bold font-mono text-zinc-200 mt-1 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
              847K
            </p>
          </div>
        </div>

        {/* Sentiment Index */}
        <div className="glass-card p-4 rounded-md flex items-center gap-4">
          <div className="p-3 bg-red-500/5 rounded-sm micro-border">
            <TrendingDown className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <p className="text-[10px] font-sans font-semibold tracking-widest text-zinc-500 uppercase">SENTIMENT_INDEX</p>
            <p className="text-2xl font-bold font-mono text-red-500 mt-1 drop-shadow-[0_0_8px_rgba(239,68,68,0.2)]">
              -34.2%
            </p>
          </div>
        </div>

        {/* Narratives Detected */}
        <div className="glass-card p-4 rounded-md flex items-center gap-4">
          <div className="p-3 bg-yellow-500/5 rounded-sm micro-border">
            <MessageSquare className="w-5 h-5 text-yellow-500" />
          </div>
          <div>
            <p className="text-[10px] font-sans font-semibold tracking-widest text-zinc-500 uppercase">NARRATIVES_DETECTED</p>
            <p className="text-2xl font-bold font-mono text-zinc-200 mt-1 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
              12
            </p>
          </div>
        </div>
      </div>

      {/* ── Main 2-Col Grid ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* ── LEFT: Narrative Tracker ────────────────────────────── */}
        <div className="lg:col-span-2 glass-card rounded-md flex flex-col overflow-hidden">
          <div className="p-4 border-b border-white/[0.05] bg-black/20">
            <h2 className="font-semibold text-zinc-200 font-sans tracking-wide text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" /> NARRATIVE TRACKER
            </h2>
          </div>

          <div className="flex-1 overflow-auto no-scrollbar p-0">
            <table className="w-full text-left border-collapse">
              <thead className="bg-black/40 sticky top-0 z-10 backdrop-blur-md">
                <tr className="text-[10px] font-sans font-semibold tracking-widest uppercase text-zinc-500">
                  <th className="p-4 border-b border-white/[0.05]">ID</th>
                  <th className="p-4 border-b border-white/[0.05]">NARRATIVE</th>
                  <th className="p-4 border-b border-white/[0.05]">PLATFORMS</th>
                  <th className="p-4 border-b border-white/[0.05]">SENTIMENT</th>
                  <th className="p-4 border-b border-white/[0.05] text-right">VOLUME</th>
                  <th className="p-4 border-b border-white/[0.05] text-right">TREND</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.02]">
                {narratives.map((n) => {
                  const barWidth = Math.abs(n.sentiment)
                  return (
                    <tr
                      key={n.id}
                      className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                    >
                      <td className="p-4 font-mono text-[11px] text-zinc-400">
                        {n.id}
                      </td>
                      <td className="p-4 text-sm font-sans font-medium text-zinc-200 group-hover:text-emerald-500 transition-colors">
                        {n.name}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-1.5 flex-wrap">
                          {n.platforms.map((p) => (
                            <span
                              key={p}
                              className="text-[9px] font-sans font-semibold tracking-widest px-2 py-0.5 rounded-sm bg-black/40 text-zinc-400 border border-white/[0.05] uppercase"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 min-w-[160px]">
                        <div className="flex items-center gap-3">
                          <span className={`text-[11px] font-mono w-10 text-right ${sentimentTextColor(n.sentiment)}`}>
                            {n.sentiment > 0 ? '+' : ''}{n.sentiment}%
                          </span>
                          <div className="flex-1 bg-zinc-950 border border-white/[0.03] h-1.5 rounded-sm overflow-hidden">
                            <div
                              className={`h-full rounded-sm transition-all duration-1000 ease-out ${sentimentColor(n.sentiment)} ${sentimentGlow(n.sentiment)}`}
                              style={{ width: mounted ? `${barWidth}%` : '0%' }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-[11px] font-mono text-zinc-300 text-right">
                        {n.volume}
                      </td>
                      <td className="p-4 text-right">
                        {trendBadge(n.trend)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── RIGHT: AI Synthesis + Top Influencers ──────────────── */}
        <div className="flex flex-col gap-6 min-h-0">
          {/* AI Synthesis */}
          <div className="glass-card rounded-md p-5 border-l-2 border-l-emerald-500 relative overflow-hidden bg-emerald-950/5">
            <div className="absolute top-0 right-0 p-3 opacity-[0.03]">
              <Brain className="w-28 h-28 text-emerald-500" />
            </div>
            <h3 className="font-sans font-semibold tracking-wide text-zinc-200 text-sm mb-3 flex items-center gap-2 relative z-10">
              <Sparkles className="w-4 h-4 text-emerald-500" /> AI SYNTHESIS
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans relative z-10">
              Detected coordinated narrative manipulation targeting MBG policy.{' '}
              <span className="text-red-400 font-medium">3 bot clusters</span>{' '}
              identified originating from{' '}
              <span className="text-zinc-200 font-mono text-[10px]">JKT_Pusat</span>{' '}
              subnet. Sentiment trending{' '}
              <span className="text-red-400 font-medium">67% hostile</span>{' '}
              across Twitter and TikTok. Recommended action:{' '}
              <span className="text-emerald-400 font-medium">
                Deploy counter-narrative via BZ-001 campaign.
              </span>
            </p>
          </div>

          {/* Top Influencers */}
          <div className="glass-card rounded-md flex flex-col overflow-hidden flex-1 min-h-0">
            <div className="p-4 border-b border-white/[0.05] bg-black/20">
              <h3 className="font-sans font-semibold tracking-wide text-zinc-200 text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-500" /> TOP INFLUENCERS
              </h3>
            </div>
            <div className="flex-1 overflow-auto no-scrollbar p-3 space-y-2">
              {influencers.map((inf) => (
                <div
                  key={inf.handle}
                  className="bg-black/40 border border-white/[0.03] rounded-sm p-3 hover:border-white/[0.1] transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <p className="text-xs font-mono text-zinc-200 font-medium">
                      {inf.handle}
                    </p>
                    <span
                      className={`text-[9px] font-sans font-semibold tracking-widest px-2 py-0.5 rounded-sm border uppercase ${
                        inf.sentiment === 'Hostile'
                          ? 'bg-red-500/10 text-red-500 border-red-500/20'
                          : inf.sentiment === 'Neutral'
                            ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                            : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                      }`}
                    >
                      {inf.sentiment}
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-2 font-sans uppercase tracking-widest">
                    Reach:{' '}
                    <span className={influencerColor(inf.sentiment)}>
                      {inf.reach}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <TechTelemetryPanel
        isOpen={showTelemetry}
        onClose={() => setShowTelemetry(false)}
        data={{
          title: "SEMANTIS Engine",
          workflow: ["Scrape Twitter/TikTok/TG", "LLM Sentiment Classification", "SNA Reach Calculation", "Data Visualization"],
          variables: [
            { name: "sentimentIndex", value: "-34.2%", type: "Float [-100..100]" },
            { name: "trendDirection", value: "UP (Rising)", type: "Enum" },
            { name: "volume/mentions", value: "847K", type: "Integer" }
          ],
          inputs: ["{ platform: 'Twitter', text: 'Mosi tidak percaya', author: '@user123' }"],
          outputs: ["{ narrative: '#ReformasiJilid2', sentiment: -67, status: 'Hostile' }"]
        }}
      />
    </div>
  )
}
