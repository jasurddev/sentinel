import { Smartphone, HardDrive, FileSearch, Briefcase, Activity } from "lucide-react"

export default function CellebritePage() {
  const extractions = [
    { id: "CS-001", device: "iPhone 15 Pro Max", os: "iOS 17.4", method: "Physical", status: "Complete", artifacts: "142K" },
    { id: "CS-002", device: "Samsung S24 Ultra", os: "Android 14", method: "Cloud", status: "Processing", artifacts: "89K" },
    { id: "CS-003", device: "Huawei Mate 60", os: "HarmonyOS 4", method: "Physical", status: "Complete", artifacts: "201K" },
    { id: "CS-004", device: "MacBook Pro M3", os: "macOS Sonoma", method: "Physical", status: "Queued", artifacts: "-" },
    { id: "CS-005", device: "iPhone 14", os: "iOS 17.2", method: "Remote", status: "Complete", artifacts: "67K" },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-mono tracking-tight text-slate-100 flex items-center gap-3">
          <Smartphone className="w-7 h-7 text-purple-500" /> CELLEBRITE_FORENSICS
        </h1>
        <p className="text-slate-400 mt-1 text-sm">Digital forensics acquisition and artifact extraction engine.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400"><HardDrive className="w-6 h-6" /></div>
          <div>
            <p className="text-[10px] font-mono text-slate-500">DEVICES_EXTRACTED</p>
            <p className="text-2xl font-bold font-mono text-slate-200">47</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400"><FileSearch className="w-6 h-6" /></div>
          <div>
            <p className="text-[10px] font-mono text-slate-500">ARTIFACTS_RECOVERED</p>
            <p className="text-2xl font-bold font-mono text-slate-200">1.2M</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-yellow-500/10 rounded-lg text-yellow-400"><Briefcase className="w-6 h-6" /></div>
          <div>
            <p className="text-[10px] font-mono text-slate-500">ACTIVE_CASES</p>
            <p className="text-2xl font-bold font-mono text-slate-200">12</p>
          </div>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Extraction Table (col-span-2) */}
        <div className="xl:col-span-2 bg-card border border-border rounded-xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border bg-slate-900/50">
            <h2 className="font-semibold text-slate-200 font-mono text-sm">RECENT_EXTRACTIONS</h2>
          </div>
          <div className="p-4 flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-xs font-mono text-slate-500">
                  <th className="pb-3 px-2 font-normal">CASE_ID</th>
                  <th className="pb-3 px-2 font-normal">DEVICE</th>
                  <th className="pb-3 px-2 font-normal">OS</th>
                  <th className="pb-3 px-2 font-normal">METHOD</th>
                  <th className="pb-3 px-2 font-normal">STATUS</th>
                  <th className="pb-3 px-2 font-normal text-right">ARTIFACTS</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {extractions.map((row) => (
                  <tr key={row.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-2 font-mono text-slate-300">{row.id}</td>
                    <td className="py-3 px-2 text-slate-200">{row.device}</td>
                    <td className="py-3 px-2 text-slate-400 text-xs">{row.os}</td>
                    <td className="py-3 px-2">
                      <span className={`text-[10px] font-mono px-2 py-1 rounded border ${
                        row.method === 'Physical' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                        row.method === 'Cloud' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                        'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        {row.method}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        {row.status === 'Processing' && <Activity className="w-3 h-3 text-yellow-500 animate-pulse" />}
                        <span className={`text-xs ${
                          row.status === 'Complete' ? 'text-emerald-400' :
                          row.status === 'Processing' ? 'text-yellow-400' :
                          'text-slate-500'
                        }`}>{row.status}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-right font-mono text-slate-300">{row.artifacts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side Panel: Pipeline */}
        <div className="bg-card border border-border rounded-xl flex flex-col">
          <div className="p-4 border-b border-border bg-slate-900/50">
            <h2 className="font-semibold text-slate-200 font-mono text-sm">EXTRACTION_PIPELINE</h2>
          </div>
          <div className="p-6 flex flex-col gap-6">
            
            <div>
              <div className="flex justify-between items-end mb-2">
                <p className="text-sm text-slate-300">Chat Analysis</p>
                <p className="text-xs font-mono text-emerald-400">92%</p>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[92%] shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <p className="text-sm text-slate-300">EXIF Mapping</p>
                <p className="text-xs font-mono text-cyan-400">78%</p>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full w-[78%] shadow-[0_0_8px_rgba(6,182,212,0.5)]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <p className="text-sm text-slate-300">Cross-Case Correlation</p>
                <p className="text-xs font-mono text-purple-400">45%</p>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full w-[45%] shadow-[0_0_8px_rgba(168,85,247,0.5)] animate-pulse"></div>
              </div>
              <p className="text-[10px] text-slate-500 mt-2">Processing CS-002 against 47 known devices...</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
