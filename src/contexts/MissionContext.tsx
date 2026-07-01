'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

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
  transitionText: string
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
    <MissionContext.Provider value={{ activeMission, setActiveMission, isTransitioning, transitionText }}>
      {children}
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
