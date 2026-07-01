'use client'

import { useMission } from "@/contexts/MissionContext"
import { ShieldAlert } from 'lucide-react'
import React from 'react'

export function MissionTransitionWrapper({ children }: { children: React.ReactNode }) {
  const { isTransitioning, transitionText } = useMission()
  
  return (
    <div className="flex-1 flex flex-col h-full min-w-0 no-scrollbar overflow-hidden relative">
      <div className={`flex-1 flex flex-col h-full w-full transition-opacity duration-300 ${isTransitioning ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>
        {children}
      </div>

      {/* Localized Transition Overlay that doesn't cover Sidebar */}
      {isTransitioning && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none">
          <div className="bg-black/80 backdrop-blur-md border border-cyan-900/50 p-8 rounded-lg flex flex-col items-center shadow-[0_0_50px_rgba(6,182,212,0.15)] min-w-[400px]">
            <ShieldAlert className="w-12 h-12 text-cyan-500 mb-6 animate-pulse" />
            <div className="text-cyan-400 font-mono text-lg font-bold mb-4 tracking-widest text-center">
              SYSTEM RECALIBRATION
            </div>
            <div className="text-zinc-300 font-mono text-xs tracking-widest mb-6 h-4 text-center">
              {transitionText}
            </div>
            
            <div className="w-full h-1 bg-zinc-900 overflow-hidden relative rounded-full">
              <div className="absolute top-0 left-0 h-full bg-cyan-500 transition-all duration-300" style={{ width: '100%', animation: 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
