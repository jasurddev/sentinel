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
          <h1 className="text-2xl font-bold font-mono tracking-tight text-slate-100 flex items-center gap-3">
            <ScanFace className="w-7 h-7 text-cyan-500" /> NETRA_PROFILING
          </h1>
          <p className="text-slate-400 mt-1 text-sm">Identity resolution engine — Face Recognition, NIK Lookup, and Location Tracking.</p>
        </div>
        <button onClick={() => setShowTelemetry(true)} className="bg-slate-900/50 hover:bg-slate-800 text-xs font-mono text-slate-400 hover:text-cyan-400 border border-slate-700 px-3 py-2 rounded-md transition-colors flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" /> SYS_DIAGNOSTICS
        </button>
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
            <div key={profile.id} className={`bg-card border rounded-xl p-5 flex flex-col gap-4 transition-all hover:bg-slate-900/80 ${
              profile.threat === 'CRITICAL' ? 'border-l-4 border-l-red-500 border-y-border border-r-border' :
              profile.threat === 'HIGH' ? 'border-l-4 border-l-yellow-500 border-y-border border-r-border' :
              'border-l-4 border-l-slate-500 border-y-border border-r-border'
            }`}>
              
              <div className="flex gap-4">
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
                      <span className="text-slate-500">Match</span>
                      <span className="font-mono text-emerald-400">{profile.match}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Location</span>
                      <span className="truncate ml-4 text-slate-300">{profile.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <button 
                onClick={() => setActiveDossier(profile.id)}
                className="w-full mt-2 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-400 rounded transition-colors flex justify-center items-center gap-2"
              >
                <FileText className="w-4 h-4" /> VIEW_DOSSIER
              </button>

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

      {/* TARGET DOSSIER MODAL */}
      {activeDossier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setActiveDossier(null)}></div>
          <div className="relative bg-[#020617] border border-cyan-900/50 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(6,182,212,0.15)] flex flex-col animate-in zoom-in-95 duration-200">
            
            <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-cyan-950/20">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-cyan-400" />
                <h2 className="font-mono font-bold text-slate-100">TARGET_DOSSIER // {activeDossier}</h2>
                <span className="ml-4 px-2 py-0.5 text-[10px] font-mono bg-red-500/20 text-red-400 border border-red-500/30 rounded">RESTRICTED_ACCESS</span>
              </div>
              <button onClick={() => setActiveDossier(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Photo & Match */}
              <div className="flex flex-col gap-4">
                <div className="aspect-square bg-slate-900 border border-slate-800 rounded-lg relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-10"></div>
                  {/* Dummy ID Photo */}
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="Target Photo" 
                    className="w-full h-full object-cover filter contrast-125 brightness-90 grayscale-[20%]"
                  />
                  <div className="absolute top-2 right-2 px-2 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded text-[10px] font-mono text-cyan-400 backdrop-blur-sm z-20">MATCH: 98.7%</div>
                  {/* Scanner line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 opacity-70 shadow-[0_0_15px_#22d3ee] animate-[scan_3s_ease-in-out_infinite] z-20"></div>
                </div>
                <button 
                  onClick={() => handleDownloadDossier(activeDossier)}
                  className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold font-mono rounded flex items-center justify-center gap-2 transition-colors shadow-[0_0_15px_rgba(8,145,178,0.5)]"
                >
                  <Download className="w-4 h-4" /> EXPORT_DOSSIER (.JSON)
                </button>
              </div>

              {/* Data Table */}
              <div className="md:col-span-2 flex flex-col gap-6">
                
                {/* Dukcapil Data */}
                <div>
                  <h3 className="text-xs font-mono text-slate-500 mb-3 flex items-center gap-2 border-b border-slate-800 pb-2">
                    <Fingerprint className="w-4 h-4" /> CIVIL_REGISTRY_DATA (DUKCAPIL)
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] text-slate-500 font-mono">NOMOR INDUK KEPENDUDUKAN</p>
                      <p className="text-sm text-cyan-400 font-mono tracking-wider">3273151204990003</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-mono">NAMA LENGKAP</p>
                      <p className="text-sm text-slate-200 font-mono font-bold">AHMAD MULYADI</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-mono">TEMPAT, TGL LAHIR</p>
                      <p className="text-sm text-slate-300">Bandung, 12-04-1999</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-mono">GOL. DARAH</p>
                      <p className="text-sm text-red-400 font-mono font-bold">O</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[10px] text-slate-500 font-mono">ALAMAT TERDAFTAR</p>
                      <p className="text-sm text-slate-300">Jl. Dago Asri No. 12, Kel. Coblong, Kota Bandung, Jawa Barat</p>
                    </div>
                  </div>
                </div>

                {/* Digital Footprint */}
                <div>
                  <h3 className="text-xs font-mono text-slate-500 mb-3 flex items-center gap-2 border-b border-slate-800 pb-2">
                    <Search className="w-4 h-4" /> LINKED_DIGITAL_IDENTITIES
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center bg-slate-900/50 p-3 rounded border border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span className="text-sm text-slate-300">Twitter/X</span>
                      </div>
                      <span className="font-mono text-cyan-400 text-sm">@ahmad_rebel</span>
                      <ExternalLink className="w-4 h-4 text-slate-600" />
                    </div>
                    <div className="flex justify-between items-center bg-slate-900/50 p-3 rounded border border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-sky-500"></div>
                        <span className="text-sm text-slate-300">Telegram</span>
                      </div>
                      <span className="font-mono text-cyan-400 text-sm">@amulyadi (ID: 59123891)</span>
                      <ExternalLink className="w-4 h-4 text-slate-600" />
                    </div>
                  </div>
                </div>

                {/* Last Seen / Geolocation */}
                <div>
                  <h3 className="text-xs font-mono text-slate-500 mb-3 flex items-center gap-2 border-b border-slate-800 pb-2">
                    <Camera className="w-4 h-4" /> LAST_KNOWN_LOCATION
                  </h3>
                  <div className="bg-slate-900 border border-slate-800 rounded h-32 relative overflow-hidden flex items-center justify-center">
                    {/* Fake Map Background */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900 via-slate-900 to-black">
                      <div className="w-full h-full border-[0.5px] border-slate-700/30 bg-[length:20px_20px] bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)]"></div>
                    </div>
                    <div className="z-10 flex flex-col items-center">
                      <div className="w-4 h-4 bg-red-500 rounded-full animate-ping absolute"></div>
                      <div className="w-4 h-4 bg-red-500 rounded-full z-10 border-2 border-white shadow-[0_0_10px_red]"></div>
                      <p className="mt-2 text-xs font-mono bg-black/80 px-2 py-1 rounded border border-slate-700 text-slate-300">LAT: -6.8915, LNG: 107.6107</p>
                      <p className="text-[10px] text-cyan-400 mt-1 font-mono">SOURCE: CCTV_NODE_DAGO_4</p>
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
