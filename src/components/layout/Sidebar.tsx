"use client"

import { cn } from "@/lib/utils"
import {
  Database,
  GitGraph,
  Home,
  Map as MapIcon,
  Megaphone,
  Radio,
  ScanFace,
  Search,
  Settings,
  Shield,
  ShieldAlert,
  Smartphone,
  TerminalSquare,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { LucideIcon } from "lucide-react"

interface NavItem {
  icon: LucideIcon
  label: string
  href: string
}

interface NavSection {
  title: string
  items: NavItem[]
}

const navSections: NavSection[] = [
  {
    title: "COMMAND",
    items: [
      { icon: Home, label: "Command Center", href: "/" },
      { icon: Search, label: "Omnisearch", href: "/omnisearch" },
    ],
  },
  {
    title: "INTELLIGENCE",
    items: [
      { icon: Radio, label: "Media Monitor", href: "/medmon" },
      { icon: GitGraph, label: "Link Analysis", href: "/graph" },
      { icon: MapIcon, label: "GEOINT Map", href: "/map" },
      { icon: ShieldAlert, label: "Threat Intel", href: "/threats" },
    ],
  },
  {
    title: "OPERATIONS",
    items: [
      { icon: ScanFace, label: "Netra Profiling", href: "/netra" },
      { icon: Megaphone, label: "Buzzer Ops", href: "/buzzer" },
      { icon: Smartphone, label: "Cellebrite Forensics", href: "/cellebrite" },
    ],
  },
  {
    title: "TOOLS",
    items: [
      { icon: Database, label: "Data Feeds", href: "/feeds" },
      { icon: TerminalSquare, label: "Dork Generator", href: "/dorks" },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 h-full border-r border-white/[0.05] bg-[#040405]/80 backdrop-blur-xl flex flex-col shrink-0">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-white/[0.05]">
        <Shield className="w-6 h-6 text-yellow-500 mr-3 shrink-0" />
        <span className="font-sans font-bold tracking-widest text-sm text-zinc-100">SENTINEL_C2</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 no-scrollbar">
        {navSections.map((group, idx) => (
          <div key={idx} className="mb-6">
            <h3 className="px-6 text-[10px] font-sans font-semibold text-zinc-500 uppercase tracking-[0.2em] mb-3">
              {group.title}
            </h3>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center px-6 py-2 text-sm font-sans transition-all group relative",
                        isActive
                          ? "text-yellow-400 bg-white/[0.03]"
                          : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.02]"
                      )}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-yellow-500 shadow-[0_0_10px_#facc15]" />
                      )}
                      <item.icon
                        className={cn(
                          "w-4 h-4 mr-3 transition-colors shrink-0",
                          isActive ? "text-yellow-500" : "text-zinc-500 group-hover:text-zinc-300"
                        )}
                      />
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User Area */}
      <div className="p-4 border-t border-white/[0.05] bg-white/[0.01]">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-sm bg-zinc-800 flex items-center justify-center shrink-0">
            <span className="font-mono text-xs font-bold text-zinc-300">OP</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-sans font-medium text-zinc-200 truncate">Operator 01</p>
            <p className="text-[10px] font-mono text-zinc-500 truncate">Clearance: TOP SECRET</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
