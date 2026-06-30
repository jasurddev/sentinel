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
      <div className="fixed right-0 top-0 h-full w-[450px] bg-[#040405]/95 backdrop-blur-3xl border-l border-white/[0.05] z-50 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 border-b border-white/[0.05] flex justify-between items-center bg-black/40">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse rounded-full" />
            <h2 className="font-sans font-bold text-zinc-100 text-sm tracking-widest">SYS_DIAGNOSTICS <span className="text-zinc-500 font-mono text-[10px] ml-2">// {data.title}</span></h2>
          </div>
          <button onClick={onClose} className="p-1 text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.05] rounded transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8 no-scrollbar">
          
          {/* WORKFLOW DIAGRAM */}
          <section>
            <h3 className="font-sans text-[10px] font-semibold text-zinc-500 mb-4 flex items-center gap-2 uppercase tracking-[0.2em]"><Network className="w-3 h-3" /> Data Flow / Workflow</h3>
            <div className="flex flex-col gap-2">
              {data.workflow.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="w-full bg-zinc-950/80 border border-white/[0.03] p-3 rounded-sm text-xs text-zinc-300 font-mono text-center shadow-sm">
                    {step}
                  </div>
                  {idx < data.workflow.length - 1 && (
                    <div className="py-1 text-zinc-700"><ArrowRight className="w-3 h-3 rotate-90" /></div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* CRITICAL VARIABLES */}
          <section>
            <h3 className="font-sans text-[10px] font-semibold text-zinc-500 mb-4 flex items-center gap-2 uppercase tracking-[0.2em]"><Cpu className="w-3 h-3" /> Active Parameters</h3>
            <div className="grid grid-cols-1 gap-2">
              {data.variables.map((v, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-zinc-950/40 border border-white/[0.03] rounded-sm hover:border-white/[0.1] transition-colors">
                  <div>
                    <p className="font-mono text-[11px] text-zinc-400">{v.name}</p>
                    <p className="font-sans text-[9px] text-zinc-600 tracking-wider mt-0.5">{v.type}</p>
                  </div>
                  <span className={`font-mono text-sm font-bold ${pulse ? 'text-cyan-400' : 'text-cyan-500'} transition-colors`}>{v.value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* I/O STREAM SIMULATION */}
          <section>
            <h3 className="font-sans text-[10px] font-semibold text-zinc-500 mb-4 flex items-center gap-2 uppercase tracking-[0.2em]"><Terminal className="w-3 h-3" /> I/O Stream Terminal</h3>
            <div className="bg-[#000] border border-white/[0.05] rounded-sm p-4 font-mono text-[10px] sm:text-[11px] shadow-[inset_0_0_20px_rgba(0,0,0,1)]">
              <div className="text-zinc-600 mb-3 tracking-widest"># RAW_INPUT_STREAM</div>
              {data.inputs.map((inp, idx) => (
                <div key={idx} className="text-yellow-500/80 mb-1 break-words">{">"} {inp}</div>
              ))}
              
              <div className="w-full h-px bg-white/[0.05] my-4"></div>
              
              <div className="text-zinc-600 mb-3 tracking-widest"># ENGINE_OUTPUT</div>
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
