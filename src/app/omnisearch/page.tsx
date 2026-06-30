"use client"

import { Search, Loader2, Database, ShieldAlert, Users, MapPin, GitGraph } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function OmnisearchPage() {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [loadingText, setLoadingText] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsSearching(true)
    setShowResults(false)

    // Simulate OSINT deep search process
    const steps = [
      "Initiating Deep Web Crawlers...",
      "Querying Pinecone Vector Database...",
      "Traversing Neo4j Entity Graph (1.2M nodes)...",
      "Running Gemini 1.5 Pro Sentiment Analysis...",
      "Correlating GEOINT Metadata...",
      "Synthesizing Intelligence Report..."
    ]

    let stepIndex = 0
    setLoadingText(steps[0])

    const interval = setInterval(() => {
      stepIndex++
      if (stepIndex < steps.length) {
        setLoadingText(steps[stepIndex])
      } else {
        clearInterval(interval)
        setIsSearching(false)
        setShowResults(true)
      }
    }, 600)
  }

  return (
    <div className="h-full flex flex-col items-center pt-12">
      
      {/* Search Header */}
      <div className={`w-full max-w-4xl flex flex-col items-center transition-all duration-700 ${showResults ? 'mb-8' : 'mt-32'}`}>
        <div className="flex items-center gap-3 mb-6">
           <Search className="w-10 h-10 text-yellow-400" />
           <h1 className="text-4xl font-bold font-mono tracking-tight text-slate-100">OMNI<span className="text-yellow-400">SEARCH</span></h1>
        </div>
        <p className="text-slate-400 font-mono text-sm mb-8 text-center max-w-lg">
          Global Intelligence Query Engine. Enter any Keyword, Phone Number, IP Address, or Username to perform deep traversal.
        </p>

        <form onSubmit={handleSearch} className="w-full relative group">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-slate-500 group-focus-within:text-yellow-400 transition-colors" />
          </div>
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#020617] border-2 border-slate-700 focus:border-yellow-400 rounded-full py-5 pl-16 pr-6 text-lg text-slate-200 font-mono shadow-[0_0_30px_rgba(0,0,0,0.5)] focus:shadow-[0_0_30px_rgba(250,204,21,0.15)] focus:outline-none transition-all placeholder:text-slate-600"
            placeholder="e.g. MBG, #ReformasiJilid2, 192.168.1.1..."
            disabled={isSearching}
          />
          <button 
            type="submit" 
            disabled={isSearching || !query}
            className="absolute inset-y-2 right-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold font-mono px-6 rounded-full disabled:opacity-50 transition-colors"
          >
            {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : "EXECUTE"}
          </button>
        </form>
      </div>

      {/* Loading State */}
      {isSearching && (
        <div className="w-full max-w-4xl mt-12 flex flex-col items-center animate-in fade-in duration-300">
          <div className="w-16 h-16 border-4 border-slate-800 border-t-yellow-400 rounded-full animate-spin mb-6"></div>
          <p className="font-mono text-yellow-400 text-lg tracking-widest uppercase">{loadingText}</p>
        </div>
      )}

      {/* Results State */}
      {showResults && (
        <div className="w-full max-w-6xl flex-1 min-h-0 animate-in slide-in-from-bottom-8 fade-in duration-700 flex flex-col gap-6 pb-12">
          
          <div className="bg-slate-900/50 border border-emerald-500/30 p-6 rounded-xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.8)]"></div>
             <h3 className="text-emerald-400 font-mono font-bold flex items-center gap-2 mb-3">
               <Database className="w-5 h-5" /> AI INTELLIGENCE SYNTHESIS
             </h3>
             <p className="text-slate-300 font-mono text-sm leading-relaxed">
               Query <span className="text-yellow-400 font-bold">"{query}"</span> appears in 142,503 records across 4 active pipelines. Analysis indicates a highly coordinated narrative manipulation campaign. Primary sentiment is <span className="text-red-400">Hostile (82%)</span>. Cross-referencing Graph Data reveals 3 primary orchestrator nodes connected to known Buzzer Syndicates.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/graph" className="bg-card border border-border p-6 rounded-xl group hover:border-slate-600 transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <GitGraph className="w-8 h-8 text-primary" />
                <span className="text-xs font-mono text-slate-500">14K Nodes Found</span>
              </div>
              <h4 className="font-mono font-bold text-slate-200 mb-2 group-hover:text-primary transition-colors">Link Analysis Data</h4>
              <p className="text-sm text-slate-400">Open module to view connected super-spreaders and bot networks related to this query.</p>
            </Link>
            
            <Link href="/map" className="bg-card border border-border p-6 rounded-xl group hover:border-slate-600 transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <MapPin className="w-8 h-8 text-cyan-400" />
                <span className="text-xs font-mono text-slate-500">3 Hotspots</span>
              </div>
              <h4 className="font-mono font-bold text-slate-200 mb-2 group-hover:text-cyan-400 transition-colors">Geospatial Matches</h4>
              <p className="text-sm text-slate-400">Location metadata extracted from images and IP logs point to JKT, BDG, and YGY.</p>
            </Link>

            <Link href="/threats" className="bg-card border border-border p-6 rounded-xl group hover:border-slate-600 transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <ShieldAlert className="w-8 h-8 text-red-500" />
                <span className="text-xs font-mono text-slate-500">2 Critical Alerts</span>
              </div>
              <h4 className="font-mono font-bold text-slate-200 mb-2 group-hover:text-red-400 transition-colors">Associated Threats</h4>
              <p className="text-sm text-slate-400">Matches found against database of known Provocateur Networks and Fake News Proxies.</p>
            </Link>
          </div>

        </div>
      )}

    </div>
  )
}
