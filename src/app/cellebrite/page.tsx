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
          <h1 className="text-2xl font-bold font-mono tracking-tight text-slate-100 flex items-center gap-3">
            <Smartphone className="w-7 h-7 text-purple-500" /> CELLEBRITE_FORENSICS
          </h1>
          <p className="text-slate-400 mt-1 text-sm">Digital forensics acquisition and artifact extraction engine.</p>
        </div>
        <button onClick={() => setShowTelemetry(true)} className="bg-slate-900/50 hover:bg-slate-800 text-xs font-mono text-slate-400 hover:text-purple-400 border border-slate-700 px-3 py-2 rounded-md transition-colors flex items-center gap-2">
          <Activity className="w-4 h-4 text-purple-400" /> SYS_DIAGNOSTICS
        </button>
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
                  <th className="pb-3 px-2 font-normal text-right">ARTIFACTS</th>
                  <th className="pb-3 px-2 font-normal text-right">ACTIONS</th>
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
                    <td className="py-3 px-2 text-right font-mono text-slate-300">{row.artifacts}</td>
                    <td className="py-3 px-2 text-right">
                      {row.status === 'Complete' ? (
                        <button 
                          onClick={() => setActiveArtifacts(row.id)}
                          className="bg-slate-800 hover:bg-slate-700 text-purple-400 px-3 py-1.5 rounded text-xs font-mono transition-colors border border-slate-700 inline-flex items-center gap-1"
                        >
                          <FolderTree className="w-3 h-3" /> BROWSE
                        </button>
                      ) : (
                        <div className="flex items-center justify-end gap-2 text-yellow-500">
                          <Activity className="w-4 h-4 animate-pulse" />
                          <span className="text-xs">{row.status}</span>
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
        <div className="bg-card border border-border rounded-xl flex flex-col h-fit">
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

      {/* ARTIFACT BROWSER MODAL */}
      {activeArtifacts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setActiveArtifacts(null)}></div>
          <div className="relative bg-[#020617] border border-purple-900/50 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.15)] flex flex-col animate-in zoom-in-95 duration-200">
            
            <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-purple-950/20">
              <div className="flex items-center gap-3">
                <FolderTree className="w-5 h-5 text-purple-400" />
                <h2 className="font-mono font-bold text-slate-100">ARTIFACT_EXPLORER // {activeArtifacts}</h2>
              </div>
              <button onClick={() => setActiveArtifacts(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <div className="flex-1 overflow-auto p-0 flex">
              {/* Sidebar File Tree */}
              <div className="w-1/3 border-r border-slate-800 p-4 bg-slate-900/30 overflow-y-auto">
                <p className="text-xs font-mono text-slate-500 mb-4">Extracted File System</p>
                <ul className="space-y-2 text-sm text-slate-300 font-mono">
                  <li className="flex items-center gap-2"><FolderTree className="w-4 h-4 text-slate-500" /> Root/</li>
                  <li className="flex items-center gap-2 pl-4 text-purple-400"><FolderTree className="w-4 h-4" /> WhatsApp/</li>
                  <li className="flex items-center gap-2 pl-8 hover:text-white cursor-pointer"><MessageCircle className="w-4 h-4 text-emerald-500" /> msgstore.db.crypt14</li>
                  <li className="flex items-center gap-2 pl-8 hover:text-white cursor-pointer"><ImageIcon className="w-4 h-4 text-sky-500" /> Media/</li>
                  <li className="flex items-center gap-2 pl-4"><FolderTree className="w-4 h-4 text-slate-500" /> System/</li>
                  <li className="flex items-center gap-2 pl-8 hover:text-white cursor-pointer"><File className="w-4 h-4 text-slate-500" /> accounts.sqlite</li>
                  <li className="flex items-center gap-2 pl-4"><FolderTree className="w-4 h-4 text-slate-500" /> UserData/</li>
                  <li className="flex items-center gap-2 pl-8 hover:text-white cursor-pointer"><File className="w-4 h-4 text-slate-500" /> keystore.bin</li>
                </ul>
              </div>

              {/* Main Content Area */}
              <div className="w-2/3 p-6 flex flex-col">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                    <MessageCircle className="w-8 h-8 text-emerald-500" />
                    <div>
                      <h3 className="text-lg font-bold text-slate-200">msgstore.db.crypt14</h3>
                      <p className="text-xs font-mono text-slate-500">Status: DECRYPTED • 14,293 Records</p>
                    </div>
                  </div>
                  
                  <div className="bg-black border border-slate-800 rounded p-4 font-mono text-xs text-slate-400 h-64 overflow-y-auto">
                    <p className="text-red-400 mb-2">/* INTELLIGENCE ALERT: Target keywords found */</p>
                    <p>[2026-06-29 14:32:11] <strong>Sender: +62812XXXXX</strong></p>
                    <p className="mb-4 text-slate-300">"Uangnya udah masuk ke rekening yang satu lagi. Pastikan anak-anak kumpul di titik X besok siang."</p>
                    
                    <p>[2026-06-29 14:35:04] <strong>Target</strong></p>
                    <p className="mb-4 text-slate-300">"Aman. Sudah dikoordinasikan sama korlap. Jangan lupa hapus chat ini."</p>
                    
                    <p className="text-purple-400 border-t border-slate-800 pt-2 mt-4 inline-block">-- END OF DECRYPTED FRAGMENT --</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
                  <button 
                    onClick={() => handleDownloadUFDR(activeArtifacts)}
                    className="py-2 px-6 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold font-mono rounded flex items-center gap-2 transition-colors shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                  >
                    <Download className="w-4 h-4" /> EXPORT FULL .UFDR
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
