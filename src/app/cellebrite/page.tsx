'use client'

import { Smartphone, HardDrive, FileSearch, Briefcase, Activity, Download, FolderTree, X, File, Image as ImageIcon, MessageCircle } from "lucide-react"
import { useState } from "react"
import { TechTelemetryPanel } from "@/components/features/TechTelemetryPanel"
import { triggerMockDownload } from "@/lib/downloadMock"

export default function CellebritePage() {
  const [showTelemetry, setShowTelemetry] = useState(false)
  const [activeArtifacts, setActiveArtifacts] = useState<string | null>(null)

  const extractions = [
    { id: "CS-001", device: "iPhone 15 Pro Max", os: "iOS 17.4", method: "Physical", status: "Complete", artifacts: "142K" },
    { id: "CS-002", device: "Samsung S24 Ultra", os: "Android 14", method: "Cloud", status: "Processing", artifacts: "89K" },
    { id: "CS-003", device: "Huawei Mate 60", os: "HarmonyOS 4", method: "Physical", status: "Complete", artifacts: "201K" },
    { id: "CS-004", device: "MacBook Pro M3", os: "macOS Sonoma", method: "Physical", status: "Queued", artifacts: "-" },
    { id: "CS-005", device: "iPhone 14", os: "iOS 17.2", method: "Remote", status: "Complete", artifacts: "67K" },
  ]

  const handleDownloadUFDR = (id: string) => {
    const mockUFDR = `<?xml version="1.0" encoding="UTF-8"?>
<UFDR version="1.0">
  <Metadata>
    <CaseID>${id}</CaseID>
    <ExtractedDate>${new Date().toISOString()}</ExtractedDate>
    <Examiner>SENTINEL_SYSTEM</Examiner>
  </Metadata>
  <Artifacts>
    <Category name="Chats" count="12450">
      <Item type="WhatsApp" status="Decrypted">Found keywords: "Transfer", "Aksi"</Item>
    </Category>
    <Category name="Images" count="450">
      <Item type="EXIF">Contains GPS coordinates tracking back to target location.</Item>
    </Category>
  </Artifacts>
</UFDR>`
    triggerMockDownload(`UFDR_DUMP_${id}.xml`, mockUFDR, "application/xml")
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold font-sans tracking-tight text-zinc-100 flex items-center gap-3">
            <Smartphone className="w-7 h-7 text-purple-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" /> CELLEBRITE_FORENSICS
          </h1>
          <p className="text-zinc-500 mt-1 text-sm font-sans">Digital forensics acquisition and artifact extraction engine.</p>
        </div>
        <button onClick={() => setShowTelemetry(true)} className="bg-zinc-950/50 hover:bg-zinc-900 text-xs font-mono text-zinc-400 hover:text-purple-400 border border-white/[0.05] hover:border-purple-500/30 px-3 py-1.5 rounded-sm transition-colors flex items-center gap-2 shadow-sm">
          <Activity className="w-4 h-4 text-purple-400" /> SYS_DIAGNOSTICS
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card rounded-md p-4 flex items-center gap-4">
          <div className="p-3 bg-purple-500/5 rounded-sm micro-border"><HardDrive className="w-5 h-5 text-purple-500" /></div>
          <div>
            <p className="text-[10px] font-sans font-semibold tracking-widest text-zinc-500 uppercase">DEVICES_EXTRACTED</p>
            <p className="text-2xl font-bold font-mono text-zinc-200 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">47</p>
          </div>
        </div>
        <div className="glass-card rounded-md p-4 flex items-center gap-4">
          <div className="p-3 bg-cyan-500/5 rounded-sm micro-border"><FileSearch className="w-5 h-5 text-cyan-500" /></div>
          <div>
            <p className="text-[10px] font-sans font-semibold tracking-widest text-zinc-500 uppercase">ARTIFACTS_RECOVERED</p>
            <p className="text-2xl font-bold font-mono text-zinc-200 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">1.2M</p>
          </div>
        </div>
        <div className="glass-card rounded-md p-4 flex items-center gap-4">
          <div className="p-3 bg-yellow-500/5 rounded-sm micro-border"><Briefcase className="w-5 h-5 text-yellow-500" /></div>
          <div>
            <p className="text-[10px] font-sans font-semibold tracking-widest text-zinc-500 uppercase">ACTIVE_CASES</p>
            <p className="text-2xl font-bold font-mono text-zinc-200 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">12</p>
          </div>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Extraction Table (col-span-2) */}
        <div className="xl:col-span-2 glass-card rounded-md overflow-hidden flex flex-col">
          <div className="p-4 border-b border-white/[0.05] bg-black/20">
            <h2 className="font-semibold text-zinc-200 font-sans text-sm tracking-wide">RECENT EXTRACTIONS</h2>
          </div>
          <div className="p-4 flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.05] text-[10px] font-sans font-semibold tracking-widest uppercase text-zinc-500">
                  <th className="pb-3 px-2 font-normal">Case_ID</th>
                  <th className="pb-3 px-2 font-normal">Device</th>
                  <th className="pb-3 px-2 font-normal">OS</th>
                  <th className="pb-3 px-2 font-normal">Method</th>
                  <th className="pb-3 px-2 font-normal text-right">Artifacts</th>
                  <th className="pb-3 px-2 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {extractions.map((row) => (
                  <tr key={row.id} className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-2 font-mono text-zinc-300 text-xs">{row.id}</td>
                    <td className="py-3 px-2 text-zinc-200 font-sans text-sm">{row.device}</td>
                    <td className="py-3 px-2 text-zinc-400 text-xs font-sans">{row.os}</td>
                    <td className="py-3 px-2">
                      <span className={`text-[9px] font-sans font-semibold tracking-widest px-2 py-0.5 rounded-sm border uppercase ${
                        row.method === 'Physical' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                        row.method === 'Cloud' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                        'bg-zinc-800 text-zinc-400 border-white/[0.05]'
                      }`}>
                        {row.method}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right font-mono text-zinc-300 text-xs">{row.artifacts}</td>
                    <td className="py-3 px-2 text-right">
                      {row.status === 'Complete' ? (
                        <button 
                          onClick={() => setActiveArtifacts(row.id)}
                          className="bg-zinc-950 hover:bg-zinc-900 text-purple-400 px-3 py-1 rounded-sm text-[10px] font-mono transition-colors border border-white/[0.05] hover:border-purple-500/30 inline-flex items-center gap-1.5"
                        >
                          <FolderTree className="w-3 h-3" /> BROWSE
                        </button>
                      ) : (
                        <div className="flex items-center justify-end gap-2 text-yellow-500">
                          <Activity className="w-3 h-3 animate-pulse" />
                          <span className="text-[10px] font-sans tracking-widest uppercase">{row.status}</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side Panel: Pipeline */}
        <div className="glass-card rounded-md flex flex-col h-fit">
          <div className="p-4 border-b border-white/[0.05] bg-black/20">
            <h2 className="font-semibold text-zinc-200 font-sans text-sm tracking-wide">EXTRACTION PIPELINE</h2>
          </div>
          <div className="p-6 flex flex-col gap-6">
            
            <div>
              <div className="flex justify-between items-end mb-2">
                <p className="text-[11px] font-sans text-zinc-400 uppercase tracking-wider">Chat Analysis</p>
                <p className="text-[10px] font-mono text-emerald-400 font-bold">92%</p>
              </div>
              <div className="w-full bg-zinc-950 border border-white/[0.03] h-1.5 rounded-sm overflow-hidden">
                <div className="bg-emerald-500 h-full w-[92%] shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <p className="text-[11px] font-sans text-zinc-400 uppercase tracking-wider">EXIF Mapping</p>
                <p className="text-[10px] font-mono text-cyan-400 font-bold">78%</p>
              </div>
              <div className="w-full bg-zinc-950 border border-white/[0.03] h-1.5 rounded-sm overflow-hidden">
                <div className="bg-cyan-500 h-full w-[78%] shadow-[0_0_8px_rgba(6,182,212,0.5)]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <p className="text-[11px] font-sans text-zinc-400 uppercase tracking-wider">Cross-Case Correlation</p>
                <p className="text-[10px] font-mono text-purple-400 font-bold">45%</p>
              </div>
              <div className="w-full bg-zinc-950 border border-white/[0.03] h-1.5 rounded-sm overflow-hidden">
                <div className="bg-purple-500 h-full w-[45%] shadow-[0_0_8px_rgba(168,85,247,0.5)] animate-pulse"></div>
              </div>
              <p className="text-[9px] font-mono text-zinc-500 mt-3">Processing CS-002 against 47 known devices...</p>
            </div>

          </div>
        </div>
      </div>

      {/* ARTIFACT BROWSER MODAL */}
      {activeArtifacts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setActiveArtifacts(null)}></div>
          <div className="relative bg-[#040405] border border-white/[0.1] rounded-md w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
            
            <div className="p-5 border-b border-white/[0.05] flex justify-between items-center bg-purple-950/10">
              <div className="flex items-center gap-3">
                <FolderTree className="w-4 h-4 text-purple-500" />
                <h2 className="font-mono font-bold text-zinc-100">ARTIFACT_EXPLORER // {activeArtifacts}</h2>
              </div>
              <button onClick={() => setActiveArtifacts(null)} className="text-zinc-500 hover:text-white"><X className="w-4 h-4" /></button>
            </div>

            <div className="flex-1 overflow-auto p-0 flex h-[600px]">
              {/* Sidebar File Tree */}
              <div className="w-1/3 border-r border-white/[0.05] p-5 bg-black/40 overflow-y-auto">
                <p className="text-[9px] font-sans tracking-widest text-zinc-500 mb-5 uppercase">Extracted File System</p>
                <ul className="space-y-3 text-[11px] text-zinc-400 font-mono">
                  <li className="flex items-center gap-2"><FolderTree className="w-3 h-3 text-zinc-600" /> Root/</li>
                  <li className="flex items-center gap-2 pl-4 text-purple-400"><FolderTree className="w-3 h-3" /> WhatsApp/</li>
                  <li className="flex items-center gap-2 pl-8 hover:text-zinc-100 cursor-pointer transition-colors text-zinc-300"><MessageCircle className="w-3 h-3 text-emerald-500" /> msgstore.db.crypt14</li>
                  <li className="flex items-center gap-2 pl-8 hover:text-zinc-100 cursor-pointer transition-colors"><ImageIcon className="w-3 h-3 text-sky-500" /> Media/</li>
                  <li className="flex items-center gap-2 pl-4"><FolderTree className="w-3 h-3 text-zinc-600" /> System/</li>
                  <li className="flex items-center gap-2 pl-8 hover:text-zinc-100 cursor-pointer transition-colors"><File className="w-3 h-3 text-zinc-600" /> accounts.sqlite</li>
                  <li className="flex items-center gap-2 pl-4"><FolderTree className="w-3 h-3 text-zinc-600" /> UserData/</li>
                  <li className="flex items-center gap-2 pl-8 hover:text-zinc-100 cursor-pointer transition-colors"><File className="w-3 h-3 text-zinc-600" /> keystore.bin</li>
                </ul>
              </div>

              {/* Main Content Area */}
              <div className="w-2/3 p-6 flex flex-col bg-zinc-950/20">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6 pb-5 border-b border-white/[0.05]">
                    <MessageCircle className="w-6 h-6 text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <div>
                      <h3 className="text-sm font-bold font-mono text-zinc-200">msgstore.db.crypt14</h3>
                      <p className="text-[10px] font-sans tracking-widest text-zinc-500 mt-1 uppercase">Status: DECRYPTED • 14,293 Records</p>
                    </div>
                  </div>
                  
                  <div className="bg-[#020617] border border-white/[0.03] rounded-sm p-5 font-mono text-[11px] text-zinc-400 h-64 overflow-y-auto shadow-inner">
                    <p className="text-red-400 mb-3 font-semibold">/* INTELLIGENCE ALERT: Target keywords found */</p>
                    <p>[2026-06-29 14:32:11] <strong>Sender: +62812XXXXX</strong></p>
                    <p className="mb-5 text-zinc-300">"Uangnya udah masuk ke rekening yang satu lagi. Pastikan anak-anak kumpul di titik X besok siang."</p>
                    
                    <p>[2026-06-29 14:35:04] <strong>Target</strong></p>
                    <p className="mb-5 text-zinc-300">"Aman. Sudah dikoordinasikan sama korlap. Jangan lupa hapus chat ini."</p>
                    
                    <p className="text-purple-400 border-t border-white/[0.05] pt-3 mt-4 inline-block opacity-70">-- END OF DECRYPTED FRAGMENT --</p>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-white/[0.05] flex justify-end">
                  <button 
                    onClick={() => handleDownloadUFDR(activeArtifacts)}
                    className="py-2 px-6 bg-purple-950 hover:bg-purple-900 text-purple-400 text-xs font-sans tracking-widest border border-purple-800 rounded-sm flex items-center gap-2 transition-colors"
                  >
                    <Download className="w-3 h-3" /> EXPORT FULL .UFDR
                  </button>
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
          title: "CELLEBRITE Parser Engine",
          workflow: ["Ingest .UFDR Raw File", "Auto-Parse Chat & SQLite DBs", "LLM Entity & Intent Recognition", "Cross-Case Correlation Search"],
          variables: [
            { name: "extractionMethod", value: "Physical (UFED)", type: "Enum" },
            { name: "artifactsRecovered", value: "1.2M", type: "Integer" }
          ],
          inputs: ["{ file_path: 'E:/extractions/CS-002_S24.ufdr', format: 'UFDR' }"],
          outputs: ["{ db_inserted: 89432_rows, alerts_found: 12 }"]
        }}
      />
    </div>
  )
}
