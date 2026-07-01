'use client'

import { useMission } from "@/contexts/MissionContext"
import { Shield, Target, Users, MapPin, Activity, ShieldAlert, Crosshair, TrendingUp } from "lucide-react"

export default function OpBriefPage() {
  const { activeMission } = useMission()

  const getMissionData = () => {
    switch (activeMission.id) {
      case 'LODAYA':
        return {
          objective: "Dismantle domestic terror cells and radicalized student networks orchestrating cyber and physical sabotage across West Java.",
          commander: "Brig. Gen. A. Kusuma",
          assets: "4 Cyber Teams, 12 Field Agents, 2 UAVs",
          status: "45% Completed",
          targets: 34,
          budget: "$1.2M",
          incidents: [
            { time: "09:42", desc: "Coordinated DDoS on KPU servers intercepted.", severity: "HIGH" },
            { time: "08:15", desc: "VMS detected TANGO-01 in Bandung.", severity: "CRITICAL" },
          ]
        }
      case 'MANGUNI':
        return {
          objective: "Neutralize cross-border smuggling rings and dark web marketplaces operating via North Sulawesi ports.",
          commander: "Col. D. Runtukahu",
          assets: "2 Cyber Teams, 8 Field Agents, 1 Marine Unit",
          status: "62% Completed",
          targets: 18,
          budget: "$850K",
          incidents: [
            { time: "11:20", desc: "Suspicious maritime cargo flagged at Bitung.", severity: "HIGH" },
            { time: "10:05", desc: "Dark web transaction tracked to local IP.", severity: "MEDIUM" },
          ]
        }
      case 'MANDAU':
        return {
          objective: "Monitor and preempt eco-terrorism and illegal land-grab syndicates threatening critical infrastructure in Kalimantan.",
          commander: "Maj. Gen. S. Hidayat",
          assets: "6 Cyber Teams, 24 Field Agents, 4 UAVs, Satellite Link",
          status: "Archive Mode (Monitoring)",
          targets: 142,
          budget: "$4.5M",
          incidents: [
            { time: "14:00", desc: "Routine satellite scan nominal.", severity: "LOW" },
          ]
        }
      default:
        return { objective: "", commander: "", assets: "", status: "", targets: 0, budget: "", incidents: [] }
    }
  }

  const data = getMissionData()

  return (
    <div className="flex flex-col gap-6 relative h-full w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-sans font-bold text-zinc-100 flex items-center gap-3 tracking-tight">
            <Shield className="w-6 h-6 text-yellow-500" />
            OPERATION DOSSIER
          </h1>
          <p className="text-zinc-500 font-mono text-xs mt-1 max-w-2xl uppercase tracking-widest">
            {activeMission.clearance} CLEARANCE REQUIRED
          </p>
        </div>
        
        <div className="px-4 py-2 bg-black border border-white/[0.05] rounded flex items-center gap-3">
          <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">Active OP</span>
          <span className="text-sm font-sans font-bold text-cyan-400">{activeMission.name}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="glass-card rounded-md p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <Crosshair className="w-64 h-64 text-white" />
            </div>
            
            <h2 className="text-[11px] font-mono text-zinc-500 tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
              <Target className="w-4 h-4 text-cyan-500" /> Mission Objective
            </h2>
            <p className="text-lg font-sans text-zinc-200 leading-relaxed max-w-3xl">
              {data.objective}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <div>
                <p className="text-[10px] font-mono text-zinc-500 mb-1">COMMANDER</p>
                <p className="text-sm font-sans font-semibold text-zinc-200">{data.commander}</p>
              </div>
              <div>
                <p className="text-[10px] font-mono text-zinc-500 mb-1">REGION</p>
                <p className="text-sm font-sans font-semibold text-zinc-200">{activeMission.region}</p>
              </div>
              <div>
                <p className="text-[10px] font-mono text-zinc-500 mb-1">STATUS</p>
                <p className="text-sm font-sans font-semibold text-emerald-400">{data.status}</p>
              </div>
              <div>
                <p className="text-[10px] font-mono text-zinc-500 mb-1">BUDGET</p>
                <p className="text-sm font-mono font-semibold text-zinc-200">{data.budget}</p>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-md p-6">
            <h2 className="text-[11px] font-mono text-zinc-500 tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
              <Activity className="w-4 h-4 text-yellow-500" /> Tactical Incidents
            </h2>
            <div className="space-y-3">
              {data.incidents.map((inc, idx) => (
                <div key={idx} className="flex gap-4 p-3 bg-black/40 border border-white/[0.05] rounded hover:border-white/[0.1] transition-colors">
                  <div className="text-[10px] font-mono text-zinc-500 w-12 shrink-0 pt-0.5">{inc.time}</div>
                  <div className="flex-1 text-sm font-sans text-zinc-300">{inc.desc}</div>
                  <div className={`text-[10px] font-mono font-bold tracking-widest px-2 py-1 rounded border ${
                    inc.severity === 'CRITICAL' ? 'text-red-400 border-red-500/30 bg-red-500/10' :
                    inc.severity === 'HIGH' ? 'text-orange-400 border-orange-500/30 bg-orange-500/10' :
                    inc.severity === 'MEDIUM' ? 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10' :
                    'text-zinc-400 border-zinc-500/30 bg-zinc-500/10'
                  }`}>
                    {inc.severity}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="flex flex-col gap-6">
          <div className="glass-card rounded-md p-6">
            <h2 className="text-[11px] font-mono text-zinc-500 tracking-[0.2em] uppercase mb-6">OP Metrics</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-sans text-zinc-400 flex items-center gap-2"><Users className="w-3.5 h-3.5 text-zinc-500" /> Active Targets</span>
                  <span className="text-xl font-mono text-zinc-100">{data.targets}</span>
                </div>
                <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-full w-[70%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-sans text-zinc-400 flex items-center gap-2"><TrendingUp className="w-3.5 h-3.5 text-zinc-500" /> Sentiment Threat</span>
                  <span className="text-xl font-mono text-zinc-100">82%</span>
                </div>
                <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
                  <div className="bg-orange-500 h-full w-[82%]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-md p-6">
            <h2 className="text-[11px] font-mono text-zinc-500 tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-500" /> Deployed Assets
            </h2>
            <p className="text-sm font-sans text-zinc-300 leading-relaxed mb-4">
              {data.assets}
            </p>
            <div className="h-32 bg-black/50 border border-white/[0.05] rounded flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, #10b981 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
              <span className="text-[10px] font-mono text-emerald-500/50 relative z-10 tracking-[0.2em] uppercase">[ SAT-LINK ENCRYPTED ]</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
