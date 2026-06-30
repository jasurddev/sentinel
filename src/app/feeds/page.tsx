import { Database, Activity, Server, Radio, RefreshCcw } from "lucide-react"

export default function DataFeedsPage() {
  const feeds = [
    { id: "FD-01", source: "Twitter Scraper (#MBG)", status: "ACTIVE", records: "1.2M", rate: "850/sec", latency: "12ms" },
    { id: "FD-02", source: "Telegram Monitor (BEM SI)", status: "ACTIVE", records: "85K", rate: "12/sec", latency: "1.2s" },
    { id: "FD-03", source: "TikTok Video OCR (Protest)", status: "RATE_LIMITED", records: "4.5K", rate: "0/sec", latency: "-" },
    { id: "FD-04", source: "Twitter Firehose (#ReformasiJilid2)", status: "ACTIVE", records: "12.4M", rate: "1200/sec", latency: "4ms" },
    { id: "FD-05", source: "News Portal Aggregator", status: "IDLE", records: "340K", rate: "0/sec", latency: "500ms" },
    { id: "FD-06", source: "WhatsApp Group Crawler", status: "ACTIVE", records: "2.1M", rate: "45/sec", latency: "150ms" },
  ]

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex justify-between items-end shrink-0">
        <div>
          <h1 className="text-2xl font-bold font-mono tracking-tight text-slate-100 flex items-center gap-3">
            <Database className="w-7 h-7 text-emerald-500" /> DATA_INGESTION_FEEDS
          </h1>
          <p className="text-slate-400 mt-1">Live monitoring of data pipelines, web scrapers, and API integrations.</p>
        </div>
        <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 px-4 py-2 rounded-md flex items-center gap-2 transition-colors active:scale-95 text-sm font-mono">
          <RefreshCcw className="w-4 h-4" /> RESTART_WORKERS
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
        <div className="bg-card border border-border p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-500">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-mono text-slate-500">GLOBAL_INGEST_RATE</p>
            <p className="text-2xl font-bold font-mono text-slate-100 mt-1">1,707 <span className="text-sm text-slate-500 font-sans font-normal">ops/sec</span></p>
          </div>
        </div>
        <div className="bg-card border border-border p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-mono text-slate-500">ACTIVE_WORKERS</p>
            <p className="text-2xl font-bold font-mono text-slate-100 mt-1">24 <span className="text-sm text-slate-500 font-sans font-normal">/ 32</span></p>
          </div>
        </div>
        <div className="bg-card border border-border p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 rounded-lg text-purple-500">
            <Radio className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-mono text-slate-500">PIPELINE_LATENCY</p>
            <p className="text-2xl font-bold font-mono text-slate-100 mt-1">14.2 <span className="text-sm text-slate-500 font-sans font-normal">ms</span></p>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 bg-card border border-border rounded-xl flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-900 sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="p-4 text-xs font-mono text-slate-500 border-b border-border">STREAM_ID</th>
                <th className="p-4 text-xs font-mono text-slate-500 border-b border-border">SOURCE</th>
                <th className="p-4 text-xs font-mono text-slate-500 border-b border-border">STATUS</th>
                <th className="p-4 text-xs font-mono text-slate-500 border-b border-border text-right">RECORDS_INDEXED</th>
                <th className="p-4 text-xs font-mono text-slate-500 border-b border-border text-right">INGEST_RATE</th>
                <th className="p-4 text-xs font-mono text-slate-500 border-b border-border text-right">LATENCY</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {feeds.map((f) => (
                <tr key={f.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="p-4 font-mono text-xs text-slate-400">{f.id}</td>
                  <td className="p-4 text-sm font-medium text-slate-200">{f.source}</td>
                  <td className="p-4">
                    <span className={`text-[10px] font-mono px-2 py-1 rounded border flex inline-flex items-center gap-1.5 w-fit ${
                      f.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                      f.status === 'RATE_LIMITED' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 
                      'bg-slate-800 text-slate-400 border-slate-700'
                    }`}>
                      {f.status === 'ACTIVE' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>}
                      {f.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-mono text-slate-300 text-right">{f.records}</td>
                  <td className="p-4 text-sm font-mono text-slate-400 text-right">{f.rate}</td>
                  <td className="p-4 text-sm font-mono text-slate-400 text-right">{f.latency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
