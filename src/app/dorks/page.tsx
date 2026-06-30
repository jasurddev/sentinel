"use client"

import { TerminalSquare, Copy, ExternalLink, ShieldAlert, Search, Database, Camera, FileText } from "lucide-react"
import { useState } from "react"

export default function DorksPage() {
  const [target, setTarget] = useState("example.com")
  const [dorkType, setDorkType] = useState("docs")

  const generateDork = () => {
    // Bersihkan URL dari http/https, www, dan trailing slash
    const cleanedTarget = target.trim().replace(/^https?:\/\//, '').replace(/\/$/, '').replace(/^www\./, '')
    const baseTarget = cleanedTarget ? `site:${cleanedTarget} ` : ""
    switch(dorkType) {
      case "docs": return `${baseTarget}ext:pdf | ext:doc | ext:xlsx | ext:txt "confidential" | "internal use only"`;
      case "dir": return `${baseTarget}intitle:"index of"`;
      case "db": return `${baseTarget}ext:sql | ext:db | ext:dump intext:"insert into" | intext:"create table"`;
      case "env": return `${baseTarget}ext:env | ext:log | ext:pem "DB_PASSWORD" | "PRIVATE KEY"`;
      case "cams": return `inurl:"/view.shtml" | inurl:"/mjpg/video.mjpg" intitle:"Live View / - AXIS" ${cleanedTarget ? `intext:${cleanedTarget}` : ""}`;
      default: return `${baseTarget}`;
    }
  }

  const generatedDork = generateDork()

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="shrink-0 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold font-mono tracking-tight text-slate-100 flex items-center gap-3">
            <TerminalSquare className="w-7 h-7 text-yellow-400" /> DORK_GENERATOR
          </h1>
          <p className="text-slate-400 mt-1 text-sm">Advanced Search Query Constructor for Vulnerability & Asset Discovery.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-4 overflow-y-auto">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-2">TARGET_DOMAIN</label>
            <input 
              type="text" 
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-yellow-400 font-mono transition-colors"
              placeholder="e.g. kominfo.go.id"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-2 mt-4">QUERY_PRESETS (VECTOR)</label>
            <div className="space-y-2">
              <button 
                onClick={() => setDorkType("docs")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md border text-sm transition-colors ${dorkType === "docs" ? "bg-yellow-400/10 border-yellow-400/30 text-yellow-400" : "bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-800"}`}
              >
                <FileText className="w-4 h-4" /> Confidential Documents
              </button>
              <button 
                onClick={() => setDorkType("dir")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md border text-sm transition-colors ${dorkType === "dir" ? "bg-yellow-400/10 border-yellow-400/30 text-yellow-400" : "bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-800"}`}
              >
                <Search className="w-4 h-4" /> Open Directories (Index Of)
              </button>
              <button 
                onClick={() => setDorkType("env")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md border text-sm transition-colors ${dorkType === "env" ? "bg-yellow-400/10 border-yellow-400/30 text-yellow-400" : "bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-800"}`}
              >
                <ShieldAlert className="w-4 h-4" /> Credentials & Config (.env)
              </button>
              <button 
                onClick={() => setDorkType("db")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md border text-sm transition-colors ${dorkType === "db" ? "bg-yellow-400/10 border-yellow-400/30 text-yellow-400" : "bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-800"}`}
              >
                <Database className="w-4 h-4" /> Exposed Database Dumps
              </button>
              <button 
                onClick={() => setDorkType("cams")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md border text-sm transition-colors ${dorkType === "cams" ? "bg-yellow-400/10 border-yellow-400/30 text-yellow-400" : "bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-800"}`}
              >
                <Camera className="w-4 h-4" /> Unsecured Webcams
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-xl flex flex-col relative overflow-hidden">
          <div className="p-4 border-b border-slate-800 bg-[#020617] flex justify-between items-center">
             <span className="text-xs font-mono text-slate-500 flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
               OUTPUT_TERMINAL
             </span>
          </div>
          
          <div className="p-6 flex-1 flex flex-col justify-center">
            <div className="bg-black border border-slate-800 p-6 rounded-lg relative group">
              <p className="font-mono text-lg text-emerald-400 break-all leading-relaxed">
                {generatedDork}
              </p>
              
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => navigator.clipboard.writeText(generatedDork)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-600 transition-colors"
                  title="Copy to Clipboard"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <a 
                  href={`https://www.google.com/search?q=${encodeURIComponent(generatedDork)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded border border-yellow-500/30 transition-colors"
                  title="Execute Search"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
               <div className="border border-slate-800 rounded p-4 bg-slate-900/30">
                 <p className="text-xs font-mono text-slate-500 mb-1">ENGINE</p>
                 <p className="text-sm font-bold text-slate-300">GOOGLE_SEARCH</p>
               </div>
               <div className="border border-slate-800 rounded p-4 bg-slate-900/30">
                 <p className="text-xs font-mono text-slate-500 mb-1">OPSEC_WARNING</p>
                 <p className="text-sm text-yellow-500">Executing queries may log your IP. Use proxy.</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
