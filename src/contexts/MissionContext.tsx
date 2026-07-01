'use client'

import React, { createContext, useContext, useState } from 'react'

export type Mission = {
  id: string
  name: string
  status: 'ACTIVE' | 'RESTRICTED' | 'ARCHIVED'
  region: string
}

export const MISSIONS: Mission[] = [
  { id: 'LODAYA', name: 'OP: LODAYA', status: 'ACTIVE', region: 'West Java' },
  { id: 'MANGUNI', name: 'OP: MANGUNI', status: 'RESTRICTED', region: 'North Sulawesi' },
  { id: 'MANDAU', name: 'OP: MANDAU', status: 'ARCHIVED', region: 'Kalimantan' },
]

type MissionContextType = {
  activeMission: Mission
  setActiveMission: (missionId: string) => void
}

const MissionContext = createContext<MissionContextType | undefined>(undefined)

export function MissionProvider({ children }: { children: React.ReactNode }) {
  const [activeMission, setActiveMissionState] = useState<Mission>(MISSIONS[0])

  const setActiveMission = (missionId: string) => {
    const mission = MISSIONS.find(m => m.id === missionId)
    if (mission) {
      setActiveMissionState(mission)
    }
  }

  return (
    <MissionContext.Provider value={{ activeMission, setActiveMission }}>
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
