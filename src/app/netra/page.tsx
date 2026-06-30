import { ScanFace, Users, Fingerprint, MapPin, Search } from "lucide-react"

export default function NetraPage() {
  const profiles = [
    { id: "TANGO-01", match: "98.7%", status: "IDENTIFIED", location: "Bandung, ID", threat: "CRITICAL" },
    { id: "TANGO-02", match: "94.2%", status: "TRACKING", location: "Jakarta Selatan, ID", threat: "HIGH" },
    { id: "TANGO-03", match: "89.5%", status: "IDENTIFIED", location: "Surabaya, ID", threat: "HIGH" },
    { id: "UNKNOWN-X", match: "45.1%", status: "UNKNOWN", location: "Unknown (VPN Detected)", threat: "MEDIUM" },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-mono tracking-tight text-slate-100 flex items-center gap-3">
          <ScanFace className="w-7 h-7 text-cyan-500" /> NETRA_PROFILING
        </h1>
        <p className="text-slate-400 mt-1 text-sm">Identity resolution engine — Face Recognition, NIK Lookup, and Location Tracking.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400"><Users className="w-6 h-6" /></div>
          <div>
            <p className="text-[10px] font-mono text-slate-500">FACES_INDEXED</p>
            <p className="text-2xl font-bold font-mono text-slate-200">2.4M</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400"><Fingerprint className="w-6 h-6" /></div>
          <div>
            <p className="text-[10px] font-mono text-slate-500">NIK_MATCHED</p>
            <p className="text-2xl font-bold font-mono text-slate-200">847</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-yellow-500/10 rounded-lg text-yellow-400"><MapPin className="w-6 h-6" /></div>
          <div>
            <p className="text-[10px] font-mono text-slate-500">ACTIVE_TRACES</p>
            <p className="text-2xl font-bold font-mono text-slate-200">23</p>
          </div>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Profile Grid (col-span-2) */}
        <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {profiles.map((profile) => (
            <div key={profile.id} className={`bg-card border rounded-xl p-5 flex gap-4 transition-all hover:bg-slate-900/80 ${
              profile.threat === 'CRITICAL' ? 'border-l-4 border-l-red-500 border-y-border border-r-border' :
              profile.threat === 'HIGH' ? 'border-l-4 border-l-yellow-500 border-y-border border-r-border' :
              'border-l-4 border-l-slate-500 border-y-border border-r-border'
            }`}>
              {/* Silhouette */}
              <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 overflow-hidden relative">
                <ScanFace className="w-8 h-8 text-slate-600" />
                {profile.status === 'IDENTIFIED' && <div className="absolute inset-0 bg-cyan-500/20 mix-blend-overlay"></div>}
                {profile.status === 'IDENTIFIED' && <div className="absolute top-0 left-0 w-full h-0.5 bg-cyan-400 opacity-50 shadow-[0_0_10px_#22d3ee] animate-[scan_2s_ease-in-out_infinite]"></div>}
              </div>
              
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-mono font-bold text-slate-200 truncate">{profile.id}</h3>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    profile.status === 'IDENTIFIED' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                    profile.status === 'TRACKING' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                    'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {profile.status}
                  </span>
                </div>
                <div className="space-y-1 mt-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Match Confidence</span>
                    <span className="font-mono text-emerald-400">{profile.match}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Last Location</span>
                    <span className="truncate ml-4 text-slate-300">{profile.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Side Panel: Engine Status */}
        <div className="bg-card border border-border rounded-xl flex flex-col h-fit">
          <div className="p-4 border-b border-border bg-slate-900/50">
            <h2 className="font-semibold text-slate-200 font-mono text-sm">RECOGNITION_ENGINE</h2>
          </div>
          <div className="p-5 flex flex-col gap-4">
            <div className="flex justify-between items-center p-3 bg-slate-900/50 border border-slate-800 rounded-lg">
              <span className="text-sm text-slate-300">Face Match Rate</span>
              <span className="font-mono text-cyan-400 font-bold">97.2%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-900/50 border border-slate-800 rounded-lg">
              <span className="text-sm text-slate-300">NIK DB Sync</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-mono text-emerald-400 text-xs">CONNECTED</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-900/50 border border-slate-800 rounded-lg">
              <span className="text-sm text-slate-300">CCTV Feeds</span>
              <span className="font-mono text-yellow-400 text-xs">14 ACTIVE</span>
            </div>
            <button className="mt-2 w-full py-2 bg-cyan-950 hover:bg-cyan-900 text-cyan-400 text-xs font-mono border border-cyan-800 rounded transition-colors flex items-center justify-center gap-2">
              <Search className="w-4 h-4" /> MANUAL_LOOKUP
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
