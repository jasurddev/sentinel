'use client'

import { ScanFace, Users, Fingerprint, MapPin, Search, Activity, FileText, Download, X, ExternalLink, Camera } from "lucide-react"
import { useState } from "react"
import { TechTelemetryPanel } from "@/components/features/TechTelemetryPanel"
import { triggerMockDownload } from "@/lib/downloadMock"

export default function NetraPage() {
  const [showTelemetry, setShowTelemetry] = useState(false)
  const [activeDossier, setActiveDossier] = useState<string | null>(null)

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
        name: "Ahmad Mulyadi",
        dob: "1999-04-12",
        address: "Jl. Dago Asri No. 12, Coblong, Bandung",
        blood_type: "O",
        occupation: "Mahasiswa"
      },
      digital_footprint: [
        { platform: "Twitter/X", handle: "@ahmad_rebel", id: "10923810238" },
        { platform: "Telegram", handle: "@amulyadi", id: "59123891" }
      ],
      last_seen: {
        timestamp: new Date().toISOString(),
        location: "Bandung, ID",
        lat: -6.8915,
        lng: 107.6107,
        source: "CCTV_NODE_DAGO_4"
      }
    }, null, 2)

    triggerMockDownload(`DOSSIER_${id}_${Date.now()}.json`, mockData, "application/json")
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold font-sans tracking-tight text-zinc-100 flex items-center gap-3">
            <ScanFace className="w-7 h-7 text-cyan-500 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" /> NETRA_PROFILING
          </h1>
          <p className="text-zinc-500 mt-1 text-sm font-sans">Identity resolution engine — Face Recognition, NIK Lookup, and Location Tracking.</p>
        </div>
        <button onClick={() => setShowTelemetry(true)} className="bg-zinc-950/50 hover:bg-zinc-900 text-xs font-mono text-zinc-400 hover:text-cyan-400 border border-white/[0.05] hover:border-cyan-500/30 px-3 py-1.5 rounded-sm transition-colors flex items-center gap-2 shadow-sm">
          <Activity className="w-4 h-4 text-cyan-500" /> SYS_DIAGNOSTICS
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card rounded-md p-4 flex items-center gap-4">
          <div className="p-3 bg-cyan-500/5 rounded-sm micro-border"><Users className="w-5 h-5 text-cyan-500" /></div>
          <div>
            <p className="text-[10px] font-sans font-semibold tracking-widest text-zinc-500 uppercase">FACES_INDEXED</p>
            <p className="text-2xl font-bold font-mono text-zinc-200 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">2.4M</p>
          </div>
        </div>
        <div className="glass-card rounded-md p-4 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/5 rounded-sm micro-border"><Fingerprint className="w-5 h-5 text-emerald-500" /></div>
          <div>
            <p className="text-[10px] font-sans font-semibold tracking-widest text-zinc-500 uppercase">NIK_MATCHED</p>
            <p className="text-2xl font-bold font-mono text-zinc-200 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">847</p>
          </div>
        </div>
        <div className="glass-card rounded-md p-4 flex items-center gap-4">
          <div className="p-3 bg-yellow-500/5 rounded-sm micro-border"><MapPin className="w-5 h-5 text-yellow-500" /></div>
          <div>
            <p className="text-[10px] font-sans font-semibold tracking-widest text-zinc-500 uppercase">ACTIVE_TRACES</p>
            <p className="text-2xl font-bold font-mono text-zinc-200 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">23</p>
          </div>
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

      {/* Identified Profiles Section */}
      <div className="mt-2">
        <h2 className="text-sm font-sans font-semibold text-zinc-300 mb-4 flex items-center gap-2">
          <Users className="w-4 h-4 text-cyan-500" /> RECENT MATCHES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {profiles.map((profile) => (
            <div key={profile.id} className={`glass-card rounded-md p-4 flex flex-col gap-4 transition-all ${
              profile.threat === 'CRITICAL' ? 'border-t-2 border-t-red-500' :
              profile.threat === 'HIGH' ? 'border-t-2 border-t-yellow-500' :
              'border-t-2 border-t-zinc-500'
            }`}>
              
              <div className="flex gap-3">
                {/* Silhouette */}
                <div className="w-12 h-12 rounded-sm bg-zinc-950 border border-white/[0.05] flex items-center justify-center shrink-0 overflow-hidden relative shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                  <ScanFace className="w-6 h-6 text-zinc-700" />
                  {profile.status === 'IDENTIFIED' && <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay"></div>}
                </div>
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-mono font-bold text-zinc-200 text-sm truncate">{profile.id}</h3>
                  </div>
                  <span className={`inline-block text-[9px] font-sans font-semibold tracking-widest px-1.5 py-0.5 rounded-sm border ${
                    profile.status === 'IDENTIFIED' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                    profile.status === 'TRACKING' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                    'bg-zinc-800 text-zinc-400 border-white/[0.05]'
                  }`}>
                    {profile.status}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-sans">
                  <span className="text-zinc-500">Match Acc:</span>
                  <span className="font-mono text-emerald-400">{profile.match}</span>
                </div>
                <div className="flex justify-between text-[10px] font-sans">
                  <span className="text-zinc-500">Loc:</span>
                  <span className="truncate ml-2 text-zinc-300">{profile.location.split(',')[0]}</span>
                </div>
              </div>

              {/* Action */}
              <button 
                onClick={() => setActiveDossier(profile.id)}
                className="w-full mt-1 py-1.5 bg-zinc-950 hover:bg-zinc-900 text-[10px] font-mono text-cyan-500 border border-white/[0.03] hover:border-cyan-500/30 rounded-sm transition-colors flex justify-center items-center gap-2"
              >
                <FileText className="w-3 h-3" /> DOSSIER
              </button>

            </div>
          ))}
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
      </div>

      {/* TARGET DOSSIER MODAL */}
      {activeDossier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setActiveDossier(null)}></div>
          <div className="relative bg-[#040405] border border-white/[0.1] rounded-md w-full max-w-4xl max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
            
            <div className="p-5 border-b border-white/[0.05] flex justify-between items-center bg-cyan-950/10">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-cyan-500" />
                <h2 className="font-mono font-bold text-zinc-100">TARGET_DOSSIER // {activeDossier}</h2>
                <span className="ml-4 px-2 py-0.5 text-[9px] font-sans tracking-widest bg-red-500/10 text-red-500 border border-red-500/20 rounded-sm uppercase">RESTRICTED_ACCESS</span>
              </div>
              <button onClick={() => setActiveDossier(null)} className="text-zinc-500 hover:text-white"><X className="w-4 h-4" /></button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Photo & Match */}
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
