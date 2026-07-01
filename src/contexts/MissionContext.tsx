'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Crosshair, ShieldAlert } from 'lucide-react'

export type Mission = {
  id: string
  name: string
  status: 'ACTIVE' | 'RESTRICTED' | 'ARCHIVED'
  region: string
  clearance: string
}

export const MISSIONS: Mission[] = [
  { id: 'LODAYA', name: 'OP: LODAYA', status: 'ACTIVE', region: 'West Java', clearance: 'LEVEL 4' },
  { id: 'MANGUNI', name: 'OP: MANGUNI', status: 'RESTRICTED', region: 'North Sulawesi', clearance: 'LEVEL 5 (RESTRICTED)' },
  { id: 'MANDAU', name: 'OP: MANDAU', status: 'ARCHIVED', region: 'Kalimantan', clearance: 'LEVEL 3' },
]

type MissionContextType = {
  activeMission: Mission
  setActiveMission: (missionId: string) => void
  isTransitioning: boolean
}

const MissionContext = createContext<MissionContextType | undefined>(undefined)

export function MissionProvider({ children }: { children: React.ReactNode }) {
  const [activeMission, setActiveMissionState] = useState<Mission>(MISSIONS[0])
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionText, setTransitionText] = useState('')

  const setActiveMission = (missionId: string) => {
    if (activeMission.id === missionId) return;
    
    const mission = MISSIONS.find(m => m.id === missionId)
    if (mission) {
      setIsTransitioning(true)
      
      // Simulate system recalibration
      let step = 0;
      const steps = [
        "PURGING LOCAL CACHE...",
        "ESTABLISHING SECURE CONNECTION...",
        `VERIFYING CLEARANCE ${mission.clearance}...`,
        `SYNCING DATA FOR ${mission.name}...`,
        "SYSTEM ONLINE."
      ];
      
      setTransitionText(steps[0]);
      
      const interval = setInterval(() => {
        step++;
        if (step < steps.length) {
          setTransitionText(steps[step]);
        }
        
        if (step >= steps.length) {
          clearInterval(interval);
          setActiveMissionState(mission);
          setTimeout(() => setIsTransitioning(false), 200);
        }
      }, 300);
    }
  }

  return (
    <MissionContext.Provider value={{ activeMission, setActiveMission, isTransitioning }}>
      {/* Hide children with opacity during transition to make it blink */}
      <div className={`h-full w-full transition-opacity duration-300 ${isTransitioning ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>
        {children}
      </div>
      
      {/* Global Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center pointer-events-none">
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
    </MissionContext.Provider>
  )
}

export function useMission() {
  const context = useContext(MissionContext)
  if (context === undefined) {
    throw new Error('useMission must be used within a MissionProvider')
  }
  return context
}
