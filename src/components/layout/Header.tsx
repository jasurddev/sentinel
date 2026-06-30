"use client"

import { Bell, Search, User } from "lucide-react"

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6 shrink-0 z-10">
      {/* Global Search Bar (Omnibar preview) */}
      <div className="flex-1 max-w-2xl">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-500 group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-800 rounded-md leading-5 bg-slate-900/50 text-slate-300 placeholder-slate-500 focus:outline-none focus:bg-slate-900 focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm transition-all font-mono"
            placeholder="Global Query: Entity, IP, NIK, Phone..."
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <kbd className="hidden sm:inline-block border border-slate-700 rounded px-1.5 py-0.5 text-[10px] font-sans font-medium text-slate-500 bg-slate-800">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right Side Tools */}
      <div className="ml-6 flex items-center space-x-3">
        {/* DEFCON Indicator */}
        <div className="flex items-center space-x-2 bg-red-950/40 px-3 py-1.5 rounded-full border border-red-900/50">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-mono font-semibold text-red-400 tracking-wide">
            DEFCON 3
          </span>
        </div>

        {/* Ingestion Status */}
        <div className="flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono text-slate-400">INGESTION: LIVE</span>
        </div>

        <button
          className="p-2 text-slate-400 hover:text-slate-50 transition-colors active:scale-95 relative rounded-full hover:bg-slate-800"
          aria-label="Alerts"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />
        </button>

        <button
          className="p-2 text-slate-400 hover:text-slate-50 transition-colors active:scale-95 rounded-full hover:bg-slate-800"
          aria-label="Profile"
        >
          <User className="w-5 h-5" />
        </button>
      </div>
    </header>
  )
}
