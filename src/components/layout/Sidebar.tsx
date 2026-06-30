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
    <aside className="w-16 lg:w-64 border-r border-border bg-card flex flex-col h-full transition-all duration-300 z-10 shrink-0">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-border">
        <Shield className="w-6 h-6 text-primary shrink-0" />
        <span className="hidden lg:block ml-3 font-mono font-bold tracking-wider text-sm text-slate-100">
          SENTINEL_C2
        </span>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 py-2 flex flex-col overflow-y-auto no-scrollbar">
        {navSections.map((section) => (
          <div key={section.title}>
            {/* Section Header */}
            <div className="hidden lg:block mt-6 mb-2 px-4">
              <span className="text-[10px] font-mono font-semibold text-slate-600 uppercase tracking-widest">
                {section.title}
              </span>
            </div>

            {/* Section Divider for collapsed sidebar */}
            <div className="lg:hidden mt-4 mb-2 mx-3 border-t border-slate-800" />

            {/* Nav Items */}
            <div className="flex flex-col gap-1 px-2">
              {section.items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
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
            </div>
          </div>
        ))}
      </nav>

      {/* Settings Footer */}
      <div className="p-4 border-t border-border flex justify-center lg:justify-start">
        <button
          className="flex items-center text-slate-400 hover:text-slate-50 transition-colors active:scale-95 w-full p-2 lg:p-0 rounded-md lg:rounded-none hover:bg-slate-800 lg:hover:bg-transparent"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          <span className="hidden lg:block ml-3 text-sm font-medium">Settings</span>
        </button>
      </div>
    </aside>
  )
}
