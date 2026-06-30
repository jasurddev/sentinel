"use client"

import { cn } from "@/lib/utils"
import { Activity, Database, GitGraph, Map as MapIcon, Search, Settings, ShieldAlert, TerminalSquare, Home } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { icon: Home, label: "Command Center", href: "/" },
  { icon: Search, label: "Omnisearch", href: "/omnisearch" },
  { icon: GitGraph, label: "Link Analysis", href: "/graph" },
  { icon: MapIcon, label: "GEOINT Map", href: "/map" },
  { icon: ShieldAlert, label: "Threat Intel", href: "/threats" },
  { icon: Database, label: "Data Feeds", href: "/feeds" },
  { icon: TerminalSquare, label: "Dork Generator", href: "/dorks" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-16 lg:w-64 border-r border-border bg-card flex flex-col h-full transition-all duration-300 z-10 shrink-0">
      <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-border">
        <Activity className="w-6 h-6 text-primary shrink-0" />
        <span className="hidden lg:block ml-3 font-mono font-bold tracking-wider text-sm text-slate-100">SENTINEL_OSINT</span>
      </div>
      
      <nav className="flex-1 py-4 flex flex-col gap-2 px-2 overflow-y-auto no-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link 
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center p-3 lg:px-4 rounded-md transition-all duration-200 group active:scale-95",
                isActive 
                  ? "bg-slate-800 text-primary font-medium" 
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-50"
              )}
              title={item.label}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="hidden lg:block ml-3 text-sm">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border flex justify-center lg:justify-start">
        <button className="flex items-center text-slate-400 hover:text-slate-50 transition-colors active:scale-95 w-full p-2 lg:p-0 rounded-md lg:rounded-none hover:bg-slate-800 lg:hover:bg-transparent">
          <Settings className="w-5 h-5 flex-shrink-0" />
          <span className="hidden lg:block ml-3 text-sm font-medium">Settings</span>
        </button>
      </div>
    </aside>
  )
}
