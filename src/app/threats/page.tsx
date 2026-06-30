import { ShieldAlert, AlertTriangle, Crosshair, Radar, Target } from "lucide-react"

export default function ThreatIntelPage() {
  const threats = [
    { id: "TR-001", actor: "Bot Farm JKT_Pusat", type: "Astroturfing", target: "Trending Topic (MBG)", level: "CRITICAL", time: "2h ago", status: "ACTIVE" },
    { id: "TR-002", actor: "Provocateur Network", type: "Disinformation", target: "Protest Action", level: "HIGH", time: "5h ago", status: "MONITORING" },
    { id: "TR-003", actor: "Anon_Aktivis", type: "Doxing", target: "Gov Officials", level: "HIGH", time: "12h ago", status: "ACTIVE" },
    { id: "TR-004", actor: "Buzzer_Sindikat_A", type: "Narrative Manipulation", target: "#ReformasiJilid2", level: "CRITICAL", time: "1d ago", status: "MITIGATING" },
    { id: "TR-005", actor: "Media_Proxy_04", type: "Fake News", target: "Public Sentiment", level: "MEDIUM", time: "2d ago", status: "DORMANT" },
  ]

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex justify-between items-end shrink-0">
        <div>
          <h1 className="text-2xl font-bold font-mono tracking-tight text-slate-100 flex items-center gap-3">
            <ShieldAlert className="w-7 h-7 text-red-500" /> THREAT_INTELLIGENCE
          </h1>
          <p className="text-slate-400 mt-1">Active threat actors, campaigns, and tactical analysis.</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/30 px-4 py-2 rounded-md flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
          <span className="text-red-400 font-mono text-sm font-bold tracking-widest">DEFCON 3</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border bg-slate-900/50">
            <h2 className="font-semibold text-slate-200 font-mono flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" /> KNOWN_ACTORS_TRACKING
            </h2>
          </div>
          <div className="flex-1 overflow-auto no-scrollbar p-0">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-900 sticky top-0 z-10">
                <tr>
                  <th className="p-4 text-xs font-mono text-slate-500 border-b border-border">ID</th>
                  <th className="p-4 text-xs font-mono text-slate-500 border-b border-border">ACTOR</th>
                  <th className="p-4 text-xs font-mono text-slate-500 border-b border-border">TYPE</th>
                  <th className="p-4 text-xs font-mono text-slate-500 border-b border-border">TARGET</th>
                  <th className="p-4 text-xs font-mono text-slate-500 border-b border-border">LEVEL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {threats.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-800/30 transition-colors group cursor-pointer">
                    <td className="p-4 font-mono text-sm text-slate-400">{t.id}</td>
                    <td className="p-4 text-sm font-medium text-slate-200 group-hover:text-primary transition-colors">{t.actor}</td>
                    <td className="p-4 text-sm text-slate-400">{t.type}</td>
                    <td className="p-4 text-sm text-slate-400">{t.target}</td>
                    <td className="p-4">
                      <span className={`text-[10px] font-mono px-2 py-1 rounded border ${
                        t.level === 'CRITICAL' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                        t.level === 'HIGH' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 
                        'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                      }`}>
                        {t.level}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl flex flex-col p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Radar className="w-32 h-32 text-primary" />
          </div>
          <h3 className="font-mono text-slate-300 font-bold mb-4 flex items-center gap-2">
            <Crosshair className="w-4 h-4 text-cyan-400" /> TACTICAL_OVERVIEW
          </h3>
          <div className="space-y-6 relative z-10">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Coordinated Bot Attacks</span>
                <span className="text-red-400 font-mono">87%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-red-500 h-full w-[87%] shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Narrative Manipulation</span>
                <span className="text-orange-400 font-mono">64%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full w-[64%] shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Fake News Dissemination</span>
                <span className="text-purple-400 font-mono">32%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full w-[32%] shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-border">
              <h4 className="text-xs font-mono text-slate-500 mb-3">RECENT_IOC_DETECTED</h4>
              <ul className="space-y-2">
                <li className="text-xs font-mono bg-slate-900 border border-slate-800 p-2 rounded text-red-400">185.15.43.2 (C2 Server)</li>
                <li className="text-xs font-mono bg-slate-900 border border-slate-800 p-2 rounded text-red-400">hash: 9a3b...c4f1</li>
                <li className="text-xs font-mono bg-slate-900 border border-slate-800 p-2 rounded text-red-400">domain: secure-update-win.net</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
