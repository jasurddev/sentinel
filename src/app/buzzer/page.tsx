'use client'

import { Megaphone, Target, Bot, MessageSquare, Activity, Download } from "lucide-react"
import { useState } from "react"
import { TechTelemetryPanel } from "@/components/features/TechTelemetryPanel"
import { triggerMockDownload } from "@/lib/downloadMock"

export default function BuzzerPage() {
  const [showTelemetry, setShowTelemetry] = useState(false)
  
  const handleDownloadROI = () => {
    const csvContent = `Campaign_ID,Target_Narrative,Platform,Accounts_Deployed,Engagement_Rate,Posts_Generated,Status
BZ-001,Counter #ReformasiJilid2,Twitter/X,800,4.2%,12500,ACTIVE
BZ-002,Amplify Pro-MBG Sentiment,TikTok,1200,6.8%,45000,ACTIVE
BZ-003,Neutralize Hoax Campaign,Instagram,400,2.1%,8000,STAGING`
    triggerMockDownload(`BUZZER_ROI_REPORT_${Date.now()}.csv`, csvContent, "text/csv")
  }

  const campaigns = [
    { id: "BZ-001", narrative: "Counter #ReformasiJilid2", platform: "Twitter/X", accounts: 800, engagement: "4.2%", status: "ACTIVE" },
    { id: "BZ-002", narrative: "Amplify Pro-MBG Sentiment", platform: "TikTok", accounts: 1200, engagement: "6.8%", status: "ACTIVE" },
    { id: "BZ-003", narrative: "Neutralize Hoax Campaign", platform: "Instagram", accounts: 400, engagement: "2.1%", status: "STAGING" },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold font-sans tracking-tight text-zinc-100 flex items-center gap-3">
            <Megaphone className="w-7 h-7 text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" /> BUZZER_OPS
            <span className="ml-2 text-[10px] bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-0.5 rounded-sm tracking-widest font-sans font-semibold uppercase">OFFENSIVE</span>
          </h1>
          <p className="text-zinc-500 mt-1 text-sm font-sans">Information warfare — Content distribution and engagement manipulation.</p>
        </div>
        <button onClick={() => setShowTelemetry(true)} className="bg-zinc-950/50 hover:bg-zinc-900 text-xs font-mono text-zinc-400 hover:text-yellow-500 border border-white/[0.05] hover:border-yellow-500/30 px-3 py-1.5 rounded-sm transition-colors flex items-center gap-2 shadow-sm">
          <Activity className="w-4 h-4 text-yellow-500" /> SYS_DIAGNOSTICS
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card rounded-md p-4 flex items-center gap-4">
          <div className="p-3 bg-yellow-500/5 rounded-sm micro-border"><Target className="w-5 h-5 text-yellow-500" /></div>
          <div>
            <p className="text-[10px] font-sans font-semibold tracking-widest text-zinc-500 uppercase">ACTIVE_CAMPAIGNS</p>
            <p className="text-2xl font-bold font-mono text-zinc-200 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">3</p>
          </div>
        </div>
        <div className="glass-card rounded-md p-4 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/5 rounded-sm micro-border"><Bot className="w-5 h-5 text-emerald-500" /></div>
          <div>
            <p className="text-[10px] font-sans font-semibold tracking-widest text-zinc-500 uppercase">ACCOUNTS_DEPLOYED</p>
            <p className="text-2xl font-bold font-mono text-zinc-200 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">2,400</p>
          </div>
        </div>
        <div className="glass-card rounded-md p-4 flex items-center gap-4">
          <div className="p-3 bg-purple-500/5 rounded-sm micro-border"><MessageSquare className="w-5 h-5 text-purple-500" /></div>
          <div>
            <p className="text-[10px] font-sans font-semibold tracking-widest text-zinc-500 uppercase">CONTENT_GENERATED</p>
            <p className="text-2xl font-bold font-mono text-zinc-200 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">14.2K</p>
          </div>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Campaigns Table (col-span-2) */}
        <div className="xl:col-span-2 glass-card rounded-md overflow-hidden flex flex-col">
          <div className="p-4 border-b border-white/[0.05] bg-black/20 flex justify-between items-center">
            <h2 className="font-semibold text-zinc-200 font-sans tracking-wide text-sm">CAMPAIGN MANAGER</h2>
            <div className="flex gap-2">
              <button onClick={handleDownloadROI} className="text-[10px] font-sans font-semibold tracking-widest uppercase bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-3 py-1.5 rounded-sm hover:bg-emerald-500/20 transition-colors flex items-center gap-2">
                <Download className="w-3 h-3" /> EXPORT_ROI
              </button>
              <button className="text-[10px] font-sans font-semibold tracking-widest uppercase bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-3 py-1.5 rounded-sm hover:bg-yellow-500/20 transition-colors">
                + NEW CAMPAIGN
              </button>
            </div>
          </div>
          <div className="p-4 flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.05] text-[10px] font-sans font-semibold tracking-widest uppercase text-zinc-500">
                  <th className="pb-3 px-2 font-normal">ID</th>
                  <th className="pb-3 px-2 font-normal">Target_Narrative</th>
                  <th className="pb-3 px-2 font-normal">Platform</th>
                  <th className="pb-3 px-2 font-normal text-center">Accounts</th>
                  <th className="pb-3 px-2 font-normal text-right">Engagement</th>
                  <th className="pb-3 px-2 font-normal text-right">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {campaigns.map((row) => (
                  <tr key={row.id} className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-2 font-mono text-zinc-300 text-xs">{row.id}</td>
                    <td className="py-3 px-2 text-zinc-200 font-sans text-sm max-w-[200px] truncate" title={row.narrative}>{row.narrative}</td>
                    <td className="py-3 px-2 text-zinc-400 text-xs font-sans">{row.platform}</td>
                    <td className="py-3 px-2 text-center font-mono text-cyan-500 text-xs">{row.accounts}</td>
                    <td className="py-3 px-2 text-right font-mono text-emerald-500 text-xs">{row.engagement}</td>
                    <td className="py-3 px-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {row.status === 'ACTIVE' && <Activity className="w-3 h-3 text-yellow-500 animate-pulse" />}
                        <span className={`text-[9px] font-sans font-semibold tracking-widest px-2 py-0.5 rounded-sm border uppercase ${
                          row.status === 'ACTIVE' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                          'bg-zinc-800 text-zinc-400 border-white/[0.05]'
                        }`}>
                          {row.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side Panel: Engine */}
        <div className="glass-card rounded-md flex flex-col h-fit">
          <div className="p-4 border-b border-white/[0.05] bg-black/20">
            <h2 className="font-semibold text-zinc-200 font-sans tracking-wide text-sm">CONTENT ENGINE</h2>
          </div>
          <div className="p-5 flex flex-col gap-4">
            <div className="p-3 bg-black/40 border border-white/[0.03] rounded-sm">
              <p className="text-[11px] font-sans tracking-widest text-zinc-500 uppercase mb-1">AI Generation Rate</p>
              <p className="font-mono text-purple-400 font-bold drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]">450 <span className="text-[10px] text-zinc-500">posts/hr</span></p>
            </div>
            <div className="p-3 bg-black/40 border border-white/[0.03] rounded-sm">
              <p className="text-[11px] font-sans tracking-widest text-zinc-500 uppercase mb-1">Unique Spin Score</p>
              <div className="flex items-center gap-3">
                <p className="font-mono text-emerald-500 font-bold drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]">94%</p>
                <div className="flex-1 bg-zinc-950 border border-white/[0.03] h-1.5 rounded-sm overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[94%] shadow-[0_0_8px_#10b981]"></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-black/40 border border-white/[0.03] rounded-sm">
              <span className="text-[11px] font-sans tracking-widest text-zinc-500 uppercase">Detection Avoidance</span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
                <span className="font-mono text-emerald-400 text-[10px] tracking-widest">STEALTH</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <TechTelemetryPanel
        isOpen={showTelemetry}
        onClose={() => setShowTelemetry(false)}
        data={{
          title: "BUZZER Information Warfare",
          workflow: ["Input Target Narrative", "LLM Content Generation & Spinning", "Task Scheduler Queue", "Headless Browser Bot Farm Execution"],
          variables: [
            { name: "accountsDeployed", value: "2400", type: "Integer" },
            { name: "uniqueSpinScore", value: "94%", type: "Float [0..100]" },
            { name: "engagementRate", value: "6.8%", type: "Float" }
          ],
          inputs: ["{ target_narrative: 'Counter #ReformasiJilid2', platform: 'Twitter' }"],
          outputs: ["{ status: 'SUCCESS', posts_deployed: 142, proxy: 'RES_ID_77' }"]
        }}
      />
    </div>
  )
}
