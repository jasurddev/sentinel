'use client'

import { ScanFace, Users, Fingerprint, MapPin, Search, Activity, FileText, Download, X, ExternalLink, Camera, BrainCircuit, Network } from "lucide-react"
import { useState } from "react"
import { TechTelemetryPanel } from "@/components/features/TechTelemetryPanel"
import { triggerMockDownload } from "@/lib/downloadMock"
import dynamic from "next/dynamic"

const GraphVisualizer = dynamic(() => import("@/components/features/GraphVisualizer"), { ssr: false })

export default function NetraPage() {
  const [showTelemetry, setShowTelemetry] = useState(false)
  const [activeDossier, setActiveDossier] = useState<string | null>(null)
  const [showSnapshot, setShowSnapshot] = useState<string | null>(null)

  const profiles = [
    { id: "TANGO-01", match: "98.7%", status: "IDENTIFIED", location: "Bandung, ID", threat: "CRITICAL" },
    { id: "TANGO-02", match: "94.2%", status: "TRACKING", location: "Jakarta Selatan, ID", threat: "HIGH" },
    { id: "TANGO-03", match: "89.5%", status: "IDENTIFIED", location: "Surabaya, ID", threat: "HIGH" },
    { id: "UNKNOWN-X", match: "45.1%", status: "UNKNOWN", location: "Unknown (VPN Detected)", threat: "MEDIUM" },
  ]

  const handleDownloadDossier = (id: string) => {
    const mockData = JSON.stringify({
      target_id: id,
      classification: "CRITICAL_THREAT",
      biometric_match: 98.7,
      identity: {
        nik: "3273151204990003",
        name: "AHMAD MULYADI",
        dob: "12-04-1999"
      }
    }, null, 2)
    
    triggerMockDownload(`DOSSIER_${id}_${Date.now()}.json`, mockData, "application/json")
  }

  return (
    <div className="flex flex-col gap-6 relative h-full w-full">


      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-sans font-bold text-zinc-100 flex items-center gap-3 tracking-tight">
            <ScanFace className="w-6 h-6 text-cyan-400" />
            NETRA_PROFILING
          </h1>
          <p className="text-zinc-500 font-mono text-xs mt-1 max-w-2xl">
            Identity resolution engine — Face Recognition, NIK Lookup, and Location Tracking.
          </p>
        </div>

        <button 
          onClick={() => setShowTelemetry(true)}
          className="px-3 py-1.5 bg-zinc-900 border border-zinc-700 hover:border-cyan-500 rounded-sm flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-cyan-400 transition-colors"
        >
          <Activity className="w-3 h-3" /> SYS_TELEMETRY
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-4 flex flex-col justify-between">
          <span className="text-zinc-500 text-[10px] font-sans font-semibold tracking-widest uppercase mb-1 flex items-center gap-2">
            <Users className="w-3 h-3 text-cyan-500"/> FACES_INDEXED
          </span>
          <span className="text-3xl font-mono text-zinc-200">2.4<span className="text-cyan-500 text-lg">M</span></span>
        </div>
        <div className="glass-panel p-4 flex flex-col justify-between">
          <span className="text-zinc-500 text-[10px] font-sans font-semibold tracking-widest uppercase mb-1 flex items-center gap-2">
            <Fingerprint className="w-3 h-3 text-emerald-500"/> NIK_MATCHED
          </span>
          <span className="text-3xl font-mono text-zinc-200">847</span>
        </div>
        <div className="glass-panel p-4 flex flex-col justify-between border-l-2 border-l-yellow-500/50">
          <span className="text-zinc-500 text-[10px] font-sans font-semibold tracking-widest uppercase mb-1 flex items-center gap-2">
            <MapPin className="w-3 h-3 text-yellow-500"/> ACTIVE_TRACES
          </span>
          <span className="text-3xl font-mono text-zinc-200">23</span>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* LIVE CCTV FEED (col-span-2) */}
        <div className="xl:col-span-2 glass-card rounded-md flex flex-col relative overflow-hidden h-[400px] border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
          {/* Real Video Background */}
          <div className="absolute inset-0 bg-zinc-950 flex items-center justify-center">
            <video 
              src="/demo.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-center grayscale filter contrast-125 opacity-70"
            />
            <div className="absolute inset-0 bg-cyan-900/20 mix-blend-color-burn"></div>
            {/* Scanlines effect */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
          </div>
          
          {/* Bounding Box 1 (Main Target - Foreground Left) */}
          <div className="absolute top-[35%] left-[20%] w-16 h-20 md:w-20 md:h-24 border-[1.5px] border-cyan-400 shadow-[0_0_10px_#22d3ee] z-10 animate-pulse bg-cyan-500/10">
            <div className="absolute -top-5 left-0 bg-cyan-400 text-black text-[9px] font-mono font-bold px-1.5 py-0.5 whitespace-nowrap">MATCH: 98.7%</div>
            <div className="absolute -bottom-5 left-0 text-cyan-400 text-[10px] font-mono font-bold drop-shadow-md whitespace-nowrap">AHMAD MULYADI</div>
            {/* Corners */}
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-white"></div>
            <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-white"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-white"></div>
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-white"></div>
          </div>

          {/* Bounding Box 2 (Secondary Target - Sunglasses Guy Right) */}
          <div className="absolute top-[30%] left-[58%] w-12 h-16 md:w-14 md:h-20 border-[1.5px] border-yellow-500 shadow-[0_0_8px_#eab308] z-10 opacity-70">
            <div className="absolute -top-4 left-0 bg-yellow-500 text-black text-[7px] font-mono font-bold px-1">ANALYZING...</div>
          </div>

          {/* Scanner Line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400 opacity-80 shadow-[0_0_15px_#22d3ee] animate-[scan_3s_ease-in-out_infinite] z-10"></div>

          {/* Terminal Overlay */}
          <div className="absolute bottom-4 left-4 w-72 bg-black/80 border border-white/[0.1] rounded-sm p-3 font-mono text-[10px] text-zinc-400 flex flex-col gap-1.5 z-20 backdrop-blur-sm">
            <p className="text-cyan-500 font-bold mb-1 flex items-center gap-2"><Activity className="w-3 h-3"/> LIVE_LOG // CCTV_NODE_DAGO_4</p>
            <p className="animate-pulse">&gt; Ingesting video frame_4892...</p>
            <p>&gt; Detected: 2 Faces in crowd.</p>
            <p>&gt; Extracting facial vectors [Model: InsightFace_v4]...</p>
            <p>&gt; Querying DUKCAPIL National DB...</p>
            <p className="text-emerald-400 font-bold">&gt; SUCCESS: TANGO-01 Identified (98.7% Confidence)</p>
          </div>
          
          <div className="absolute top-4 right-4 bg-red-600 border border-red-400 text-white text-[9px] font-sans font-bold px-2 py-1 rounded-sm flex items-center gap-2 z-20">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div> LIVE FEED
          </div>
        </div>

        {/* Side Panel: Engine Status */}
        <div className="glass-card rounded-md flex flex-col h-fit">
          <div className="p-4 border-b border-white/[0.05] bg-black/20">
            <h2 className="font-semibold text-zinc-200 font-sans text-sm tracking-wide">RECOGNITION ENGINE</h2>
          </div>
          <div className="p-5 flex flex-col gap-3">
            <div className="flex justify-between items-center p-3 bg-black/40 border border-white/[0.03] rounded-sm">
              <span className="text-xs font-sans text-zinc-400">Face Match Rate</span>
              <span className="font-mono text-cyan-400 font-bold drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">97.2%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-black/40 border border-white/[0.03] rounded-sm">
              <span className="text-xs font-sans text-zinc-400">NIK DB Sync</span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_#10b981]"></span>
                <span className="font-mono text-emerald-400 text-[10px] tracking-widest">CONNECTED</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-black/40 border border-white/[0.03] rounded-sm">
              <span className="text-xs font-sans text-zinc-400">CCTV Feeds</span>
              <span className="font-mono text-yellow-500 text-[10px] tracking-widest">14 ACTIVE</span>
            </div>
            <button className="mt-3 w-full py-2 bg-black hover:bg-zinc-900 text-cyan-500 text-xs font-mono border border-cyan-900 hover:border-cyan-700 rounded-sm transition-colors flex items-center justify-center gap-2">
              <Search className="w-3 h-3" /> MANUAL_LOOKUP
            </button>
          </div>
        </div>

      {/* Identified Profiles Section */}
      <div className="mt-2 xl:col-span-3">
        <h2 className="text-sm font-sans font-semibold text-zinc-300 mb-4 flex items-center gap-2">
          <Users className="w-4 h-4 text-cyan-500" /> RECENT MATCHES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {profiles.map((profile, i) => (
            <div key={i} className={`glass-card p-4 flex flex-col gap-4 border-l-4 ${profile.status === 'IDENTIFIED' ? 'border-l-red-500' : profile.status === 'TRACKING' ? 'border-l-yellow-500' : 'border-l-slate-500'}`}>
              
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/[0.1] flex items-center justify-center overflow-hidden">
                    {profile.status === 'IDENTIFIED' ? (
                       <img src={`https://randomuser.me/api/portraits/men/${32 + i}.jpg`} alt="target" className="w-full h-full object-cover filter grayscale contrast-125" />
                    ) : (
                      <ScanFace className="w-5 h-5 text-zinc-500" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-mono font-bold text-zinc-200 text-sm">{profile.id}</h3>
                    <p className="text-[10px] font-sans text-zinc-500 flex items-center gap-1 mt-0.5">
                      <Activity className="w-3 h-3 text-cyan-500" /> {profile.match}
                    </p>
                  </div>
                </div>
                <span className={`text-[9px] font-mono px-2 py-0.5 rounded-sm bg-black/50 border ${profile.status === 'IDENTIFIED' ? 'text-red-400 border-red-900/50' : profile.status === 'TRACKING' ? 'text-yellow-400 border-yellow-900/50' : 'text-slate-400 border-slate-800'}`}>
                  {profile.status}
                </span>
              </div>

              <div className="text-xs font-sans text-zinc-400 flex items-center gap-2 bg-black/30 p-2 rounded-sm border border-white/[0.02]">
                <MapPin className="w-3 h-3 text-zinc-500" />
                <span className="truncate">{profile.location}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <button 
                onClick={() => setActiveDossier(profile.id)}
                className="w-full py-1.5 text-[10px] font-mono bg-cyan-950/30 hover:bg-cyan-900 text-cyan-400 border border-cyan-900 rounded-sm transition-colors flex items-center justify-center gap-1">
                <FileText className="w-3 h-3" /> DOSSIER
                </button>
                <button 
                  onClick={() => setShowSnapshot(profile.id)}
                  className="w-full py-1.5 text-[10px] font-mono bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 rounded-sm transition-colors flex items-center justify-center gap-1">
                  <Camera className="w-3 h-3" /> SNAPSHOT
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
        

      </div>

      {/* SNAPSHOT DUMMY MODAL */}
      {showSnapshot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowSnapshot(null)}></div>
          <div className="relative bg-[#040405] border border-white/[0.1] rounded-md w-full max-w-md shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-white/[0.05] flex justify-between items-center bg-zinc-900/50">
              <div className="flex items-center gap-2 text-zinc-200">
                <Camera className="w-4 h-4 text-cyan-500" />
                <h2 className="font-mono font-bold text-sm">SNAPSHOT // {showSnapshot}</h2>
              </div>
              <button onClick={() => setShowSnapshot(null)} className="text-zinc-500 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-4">
              <div className="aspect-video bg-zinc-950 border border-white/[0.05] rounded-sm flex items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                 <img src="/demo.mp4" className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 opacity-30" alt="Snapshot Frame" />
                 <div className="z-10 flex flex-col items-center">
                    <ScanFace className="w-8 h-8 text-cyan-500 mb-2" />
                    <p className="text-cyan-400 font-mono text-xs uppercase">Capturing Frame Sequence...</p>
                 </div>
                 {/* Bounding Box Mock */}
                 <div className="absolute top-[20%] left-[40%] w-16 h-20 border-[1.5px] border-cyan-400 z-10 animate-pulse bg-cyan-500/10"></div>
              </div>
              <div className="mt-4 flex justify-between items-center bg-black/40 p-3 rounded-sm border border-white/[0.02]">
                 <span className="text-xs text-zinc-500 font-sans">Timestamp</span>
                 <span className="text-xs text-zinc-300 font-mono">{new Date().toISOString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TARGET DOSSIER MODAL */}
      {activeDossier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setActiveDossier(null)}></div>
          <div className="relative bg-[#040405] border border-white/[0.1] rounded-md w-full max-w-6xl max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
            
            <div className="p-5 border-b border-white/[0.05] flex justify-between items-center bg-cyan-950/10">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-cyan-500" />
                <h2 className="font-mono font-bold text-zinc-100">TARGET_DOSSIER // {activeDossier}</h2>
                <span className="ml-4 px-2 py-0.5 text-[9px] font-sans tracking-widest bg-red-500/10 text-red-500 border border-red-500/20 rounded-sm uppercase">RESTRICTED_ACCESS</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-cyan-500 bg-cyan-950/20 px-3 py-1 rounded-sm border border-cyan-900/50">
                  <BrainCircuit className="w-3 h-3" />
                  <span className="text-[9px] font-mono tracking-widest uppercase">AI_FUSION_SUMMARY</span>
                </div>
                <button onClick={() => setActiveDossier(null)} className="text-zinc-500 hover:text-white"><X className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-8">
              
              {/* Photo & Match (Left Column) */}
              <div className="flex flex-col gap-4">
                <div className="aspect-square bg-zinc-950 border border-white/[0.05] rounded-sm relative overflow-hidden flex items-center justify-center shadow-inner">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-10"></div>
                  {/* Dummy ID Photo */}
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="Target Photo" 
                    className="w-full h-full object-cover filter contrast-[1.1] brightness-[0.8] sepia-[0.2]"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 border border-cyan-500/30 rounded-sm text-[9px] font-mono text-cyan-400 backdrop-blur-md z-20">MATCH: 98.7%</div>
                  {/* Scanner line */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-400 opacity-60 shadow-[0_0_15px_#22d3ee] animate-[scan_3s_ease-in-out_infinite] z-20"></div>
                </div>
                <button 
                  onClick={() => handleDownloadDossier(activeDossier)}
                  className="w-full py-2 bg-cyan-950 hover:bg-cyan-900 text-cyan-400 text-xs font-sans tracking-widest border border-cyan-800 rounded-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-3 h-3" /> EXPORT_DOSSIER (.JSON)
                </button>
              </div>

              {/* Data Table */}
              <div className="md:col-span-2 flex flex-col gap-8">
                
                {/* Dukcapil Data */}
                <div>
                  <h3 className="text-[10px] font-sans font-semibold text-zinc-500 mb-4 flex items-center gap-2 border-b border-white/[0.05] pb-2 uppercase tracking-widest">
                    <Fingerprint className="w-3 h-3" /> CIVIL REGISTRY DATA (DUKCAPIL)
                  </h3>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <p className="text-[9px] text-zinc-500 font-sans tracking-widest uppercase">Nomor Induk Kependudukan</p>
                      <p className="text-sm text-cyan-500 font-mono tracking-wider mt-1">3273151204990003</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-zinc-500 font-sans tracking-widest uppercase">Nama Lengkap</p>
                      <p className="text-sm text-zinc-200 font-mono font-bold mt-1">AHMAD MULYADI</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-zinc-500 font-sans tracking-widest uppercase">Tempat, Tgl Lahir</p>
                      <p className="text-sm text-zinc-300 font-sans mt-1">Bandung, 12-04-1999</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-zinc-500 font-sans tracking-widest uppercase">Gol. Darah</p>
                      <p className="text-sm text-red-500 font-mono font-bold mt-1">O</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[9px] text-zinc-500 font-sans tracking-widest uppercase">Alamat Terdaftar</p>
                      <p className="text-sm text-zinc-300 font-sans mt-1">Jl. Dago Asri No. 12, Kel. Coblong, Kota Bandung, Jawa Barat</p>
                    </div>
                  </div>
                </div>

                {/* Digital Footprint */}
                <div>
                  <h3 className="text-[10px] font-sans font-semibold text-zinc-500 mb-4 flex items-center gap-2 border-b border-white/[0.05] pb-2 uppercase tracking-widest">
                    <Search className="w-3 h-3" /> LINKED DIGITAL IDENTITIES
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center bg-black/40 p-3 rounded-sm border border-white/[0.03]">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        <span className="text-xs text-zinc-300 font-sans">Twitter/X</span>
                      </div>
                      <span className="font-mono text-cyan-500 text-xs">@ahmad_rebel</span>
                      <ExternalLink className="w-3 h-3 text-zinc-600" />
                    </div>
                    <div className="flex justify-between items-center bg-black/40 p-3 rounded-sm border border-white/[0.03]">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-sky-500"></div>
                        <span className="text-xs text-zinc-300 font-sans">Telegram</span>
                      </div>
                      <span className="font-mono text-cyan-500 text-xs">@amulyadi (ID: 59123891)</span>
                      <ExternalLink className="w-3 h-3 text-zinc-600" />
                    </div>
                  </div>
                </div>

                {/* Last Seen / Geolocation */}
                <div>
                  <h3 className="text-[10px] font-sans font-semibold text-zinc-500 mb-4 flex items-center gap-2 border-b border-white/[0.05] pb-2 uppercase tracking-widest">
                    <Camera className="w-3 h-3" /> LAST KNOWN LOCATION
                  </h3>
                  <div className="bg-[#020617] border border-white/[0.05] rounded-sm h-32 relative overflow-hidden flex items-center justify-center">
                    {/* Fake Map Background */}
                    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950 via-black to-black">
                      <div className="w-full h-full border-[0.5px] border-white/[0.02] bg-[length:20px_20px] bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]"></div>
                    </div>
                    <div className="z-10 flex flex-col items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-ping absolute shadow-[0_0_10px_red]"></div>
                      <div className="w-2 h-2 bg-red-500 rounded-full z-10 shadow-[0_0_5px_red]"></div>
                      <p className="mt-3 text-[10px] font-mono bg-black/80 px-2 py-1 rounded-sm border border-white/[0.05] text-zinc-300">LAT: -6.8915, LNG: 107.6107</p>
                      <p className="text-[9px] text-cyan-500 mt-1 font-mono tracking-widest">SOURCE: CCTV_NODE_DAGO_4</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* AI Fusion Summary (Right Column) */}
              <div className="flex flex-col gap-4 md:border-l border-white/[0.05] md:pl-8">
                <h3 className="text-[10px] font-sans font-semibold text-zinc-500 flex items-center gap-2 border-b border-white/[0.05] pb-2 uppercase tracking-widest">
                  <BrainCircuit className="w-3 h-3 text-cyan-500" /> AI FUSION SUMMARY
                </h3>
                
                <div className="flex flex-col gap-3 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-zinc-400 font-sans uppercase">Identity Confidence</span>
                    <span className="text-xs font-mono text-cyan-400 font-bold">99.4%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-zinc-400 font-sans uppercase">Threat Score</span>
                    <span className="text-xs font-mono text-red-500 font-bold">82/100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-zinc-400 font-sans uppercase">Evidence</span>
                    <span className="text-xs font-mono text-zinc-200 font-bold">17</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-zinc-400 font-sans uppercase">Connected Entities</span>
                    <span className="text-xs font-mono text-zinc-200 font-bold">46</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-zinc-400 font-sans uppercase">Related Cases</span>
                    <span className="text-xs font-mono text-zinc-200 font-bold">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-zinc-400 font-sans uppercase">Last Seen</span>
                    <span className="text-[9px] font-mono text-yellow-500">12 menit lalu</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-red-950/20 border border-red-500/20 rounded-sm">
                  <p className="text-[9px] text-zinc-500 font-sans uppercase mb-1">AI Recommendation</p>
                  <p className="text-xs text-red-400 font-mono font-bold tracking-widest">OBSERVE / HIGH_RISK</p>
                </div>
              </div>
            </div>

            {/* KNOWLEDGE GRAPH VISUALIZER (Full Width Bottom) */}
            <div className="border-t border-white/[0.05] bg-[#020617] mt-4">
              <div className="p-4 border-b border-white/[0.02] flex items-center justify-between">
                <h3 className="text-xs font-sans font-bold text-zinc-300 flex items-center gap-2">
                  <Network className="w-4 h-4 text-cyan-500" />
                  KNOWLEDGE GRAPH 
                  <span className="text-[9px] text-cyan-500 border border-cyan-500/30 bg-cyan-950/30 px-1.5 py-0.5 rounded-sm ml-2">SNA_ACTIVE</span>
                </h3>
                <p className="text-[9px] font-mono text-zinc-500">ZOOM & PAN ENABLED</p>
              </div>
              <div className="h-[350px] w-full relative overflow-hidden">
                <GraphVisualizer isPreview={true} />
                {/* Overlay Vignette to blend edges */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(4,4,5,1)]"></div>
              </div>
            </div>
            
          </div>
        </div>
      )}

      <TechTelemetryPanel
        isOpen={showTelemetry}
        onClose={() => setShowTelemetry(false)}
        data={{
          title: "NETRA Profiling Engine",
          workflow: ["Image Acquisition (CCTV/Social)", "InsightFace Embedding Extraction", "Cosine Similarity NIK DB Match", "Geo-Location Mapping"],
          variables: [
            { name: "matchConfidence", value: "98.7%", type: "Float [0..100]" },
            { name: "threatLevel", value: "CRITICAL", type: "Enum" }
          ],
          inputs: ["{ image_vector: [0.12, 0.44...], source: 'JKT_CCTV_7' }"],
          outputs: ["{ id: 'TANGO-01', nik: '327***', status: 'IDENTIFIED' }"]
        }}
      />
    </div>
  )
}
