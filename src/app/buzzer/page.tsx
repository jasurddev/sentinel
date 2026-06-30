import { Megaphone, Target, Bot, MessageSquare, Activity } from "lucide-react"

export default function BuzzerPage() {
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
          <h1 className="text-2xl font-bold font-mono tracking-tight text-slate-100 flex items-center gap-3">
            <Megaphone className="w-7 h-7 text-yellow-500" /> BUZZER_OPS
            <span className="ml-2 text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded tracking-widest">OFFENSIVE</span>
          </h1>
          <p className="text-slate-400 mt-1 text-sm">Information warfare — Content distribution and engagement manipulation.</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-yellow-500/10 rounded-lg text-yellow-400"><Target className="w-6 h-6" /></div>
          <div>
            <p className="text-[10px] font-mono text-slate-500">ACTIVE_CAMPAIGNS</p>
            <p className="text-2xl font-bold font-mono text-slate-200">3</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400"><Bot className="w-6 h-6" /></div>
          <div>
            <p className="text-[10px] font-mono text-slate-500">ACCOUNTS_DEPLOYED</p>
            <p className="text-2xl font-bold font-mono text-slate-200">2,400</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400"><MessageSquare className="w-6 h-6" /></div>
          <div>
            <p className="text-[10px] font-mono text-slate-500">CONTENT_GENERATED</p>
            <p className="text-2xl font-bold font-mono text-slate-200">14.2K</p>
          </div>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Campaigns Table (col-span-2) */}
        <div className="xl:col-span-2 bg-card border border-border rounded-xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border bg-slate-900/50 flex justify-between items-center">
            <h2 className="font-semibold text-slate-200 font-mono text-sm">CAMPAIGN_MANAGER</h2>
            <button className="text-xs bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-3 py-1 rounded hover:bg-yellow-500/20 transition-colors">
              + NEW_CAMPAIGN
            </button>
          </div>
          <div className="p-4 flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-xs font-mono text-slate-500">
                  <th className="pb-3 px-2 font-normal">ID</th>
                  <th className="pb-3 px-2 font-normal">TARGET_NARRATIVE</th>
                  <th className="pb-3 px-2 font-normal">PLATFORM</th>
                  <th className="pb-3 px-2 font-normal text-center">ACCOUNTS</th>
                  <th className="pb-3 px-2 font-normal text-right">ENGAGEMENT</th>
                  <th className="pb-3 px-2 font-normal text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {campaigns.map((row) => (
                  <tr key={row.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-2 font-mono text-slate-300">{row.id}</td>
                    <td className="py-3 px-2 text-slate-200 max-w-[200px] truncate" title={row.narrative}>{row.narrative}</td>
                    <td className="py-3 px-2 text-slate-400 text-xs">{row.platform}</td>
                    <td className="py-3 px-2 text-center font-mono text-cyan-400">{row.accounts}</td>
                    <td className="py-3 px-2 text-right font-mono text-emerald-400">{row.engagement}</td>
                    <td className="py-3 px-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {row.status === 'ACTIVE' && <Activity className="w-3 h-3 text-yellow-500 animate-pulse" />}
                        <span className={`text-[10px] font-mono px-2 py-1 rounded border ${
                          row.status === 'ACTIVE' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                          'bg-slate-800 text-slate-400 border-slate-700'
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
        <div className="bg-card border border-border rounded-xl flex flex-col h-fit">
          <div className="p-4 border-b border-border bg-slate-900/50">
            <h2 className="font-semibold text-slate-200 font-mono text-sm">CONTENT_ENGINE</h2>
          </div>
          <div className="p-5 flex flex-col gap-4">
            <div className="p-3 bg-slate-900/50 border border-slate-800 rounded-lg">
              <p className="text-xs text-slate-500 mb-1">AI Generation Rate</p>
              <p className="font-mono text-purple-400 text-lg">450 posts/hr</p>
            </div>
            <div className="p-3 bg-slate-900/50 border border-slate-800 rounded-lg">
              <p className="text-xs text-slate-500 mb-1">Unique Spin Score</p>
              <div className="flex items-center gap-3">
                <p className="font-mono text-emerald-400 text-lg">94%</p>
                <div className="flex-1 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[94%]"></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-900/50 border border-slate-800 rounded-lg">
              <span className="text-sm text-slate-300">Detection Avoidance</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                <span className="font-mono text-emerald-400 text-xs">STEALTH</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
