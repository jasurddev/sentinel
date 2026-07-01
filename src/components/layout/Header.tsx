"use client"

import { Bell, Search, User, ChevronDown, Crosshair } from "lucide-react"
import { useMission, MISSIONS } from "@/contexts/MissionContext"
import { useState } from "react"

export function Header() {
  const { activeMission, setActiveMission } = useMission()
  const [showMissions, setShowMissions] = useState(false)

  return (
    <header className="h-16 border-b border-white/[0.05] bg-black/40 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-10">
      {/* Global Search Bar (Omnibar preview) */}
      <div className="flex-1 max-w-2xl">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-zinc-500 group-focus-within:text-yellow-500 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-1.5 border border-white/[0.05] rounded leading-5 bg-zinc-950/50 text-zinc-300 placeholder-zinc-600 focus:outline-none focus:bg-black focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 sm:text-sm transition-all font-sans"
            placeholder={`Global Query: Entity, IP, NIK... (Scope: ${activeMission.name})`}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <kbd className="hidden sm:inline-block border border-white/[0.1] rounded px-1.5 py-0.5 text-[10px] font-sans font-medium text-zinc-500 bg-zinc-900">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right Side Tools */}
      <div className="ml-6 flex items-center space-x-3">
        {/* Mission Selector */}
        <div className="relative">
          <button 
            onClick={() => setShowMissions(!showMissions)}
            className="flex items-center gap-2 bg-[#020617] border border-cyan-900/50 hover:border-cyan-500/50 px-3 py-1.5 rounded transition-all group"
          >
            <Crosshair className="w-3 h-3 text-cyan-500 group-hover:text-cyan-400" />
            <span className="text-[10px] font-mono text-cyan-400 font-bold tracking-widest">{activeMission.name}</span>
            <ChevronDown className="w-3 h-3 text-cyan-700 group-hover:text-cyan-500" />
          </button>
          
          {showMissions && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowMissions(false)}></div>
              <div className="absolute top-full mt-1 right-0 w-48 bg-[#040405] border border-white/[0.1] rounded-md shadow-2xl overflow-hidden flex flex-col z-50">
                <div className="px-3 py-2 bg-black/50 border-b border-white/[0.05]">
                  <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-sans">Select Active Mission</span>
                </div>
                {MISSIONS.map(m => (
                  <button 
                    key={m.id}
                    onClick={() => {
                      setActiveMission(m.id)
                      setShowMissions(false)
                    }}
                    className={`flex flex-col text-left px-3 py-2 hover:bg-zinc-900 transition-colors ${activeMission.id === m.id ? 'bg-cyan-950/20 border-l-2 border-cyan-500' : 'border-l-2 border-transparent'}`}
                  >
                    <span className={`text-[10px] font-mono font-bold ${activeMission.id === m.id ? 'text-cyan-400' : 'text-zinc-300'}`}>{m.name}</span>
                    <span className="text-[9px] font-sans text-zinc-500">{m.region}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* DEFCON Indicator */}
        <div className="flex items-center space-x-2 bg-red-950/20 px-3 py-1 rounded border border-red-900/30">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_red]" />
          <span className="text-[10px] font-sans font-semibold text-red-400 tracking-[0.2em]">
            DEFCON 3
          </span>
        </div>

        {/* Ingestion Status */}
        <div className="flex items-center space-x-2 bg-zinc-950/50 px-3 py-1 rounded border border-white/[0.05]">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          <span className="text-[10px] font-sans text-zinc-400 tracking-wider">INGESTION: LIVE</span>
        </div>

        <button
          className="p-2 text-zinc-500 hover:text-zinc-200 transition-colors relative rounded hover:bg-white/[0.05]"
          aria-label="Alerts"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 block h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-[#040405]" />
        </button>

        <button
          className="p-2 text-zinc-500 hover:text-zinc-200 transition-colors rounded hover:bg-white/[0.05]"
          aria-label="Profile"
        >
          <User className="w-4 h-4" />
        </button>
      </div>
    </header>
  )
}
