"use client"

import { Bell, Search, User } from "lucide-react"

export function Header() {
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
            placeholder="Global Query: Entity, IP, NIK, Phone..."
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
