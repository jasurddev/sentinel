"use client"

import { X, Activity, Cpu, Network, Terminal, Database, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

export interface TechTelemetryData {
  title: string;
  workflow: string[];
  variables: { name: string; value: string; type: string }[];
  inputs: string[];
  outputs: string[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: TechTelemetryData;
}

export function TechTelemetryPanel({ isOpen, onClose, data }: Props) {
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => setPulse(p => !p), 1000)
    return () => clearInterval(interval)
  }, [isOpen])

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Sliding Panel */}
      <div className="fixed right-0 top-0 h-full w-[450px] bg-[#020617] border-l border-slate-800 z-50 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
            <h2 className="font-mono font-bold text-slate-200 text-sm">SYS_DIAGNOSTICS: <span className="text-emerald-400">{data.title}</span></h2>
          </div>
          <button onClick={onClose} className="p-1 text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-8 no-scrollbar">
          
          {/* WORKFLOW DIAGRAM */}
          <section>
            <h3 className="font-mono text-xs text-slate-500 mb-3 flex items-center gap-2 uppercase tracking-widest"><Network className="w-4 h-4" /> Data Flow / Workflow</h3>
            <div className="flex flex-col gap-2">
              {data.workflow.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="w-full bg-slate-900/80 border border-slate-800 p-3 rounded-lg text-sm text-slate-300 font-mono text-center">
                    {step}
                  </div>
                  {idx < data.workflow.length - 1 && (
                    <div className="py-1 text-slate-700"><ArrowRight className="w-4 h-4 rotate-90" /></div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* CRITICAL VARIABLES */}
          <section>
            <h3 className="font-mono text-xs text-slate-500 mb-3 flex items-center gap-2 uppercase tracking-widest"><Cpu className="w-4 h-4" /> Active Parameters</h3>
            <div className="grid grid-cols-1 gap-2">
              {data.variables.map((v, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-slate-900/40 border border-slate-800 rounded-lg">
                  <div>
                    <p className="font-mono text-xs text-slate-400">{v.name}</p>
                    <p className="font-mono text-[10px] text-slate-600">{v.type}</p>
                  </div>
                  <span className={`font-mono text-sm font-bold ${pulse ? 'text-cyan-400' : 'text-cyan-500'} transition-colors`}>{v.value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* I/O STREAM SIMULATION */}
          <section>
            <h3 className="font-mono text-xs text-slate-500 mb-3 flex items-center gap-2 uppercase tracking-widest"><Terminal className="w-4 h-4" /> I/O Stream Terminal</h3>
            <div className="bg-black border border-slate-800 rounded-lg p-3 font-mono text-[10px] sm:text-xs">
              <div className="text-slate-500 mb-2"># RAW_INPUT_STREAM</div>
              {data.inputs.map((inp, idx) => (
                <div key={idx} className="text-yellow-500/80 mb-1 break-words">{">"} {inp}</div>
              ))}
              
              <div className="w-full h-px bg-slate-800 my-3"></div>
              
              <div className="text-slate-500 mb-2"># ENGINE_OUTPUT</div>
              {data.outputs.map((out, idx) => (
                <div key={idx} className="text-emerald-400 mb-1 break-words">{"<<"} {out}</div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  )
}
