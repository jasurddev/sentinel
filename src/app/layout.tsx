import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Sentinel OSINT Dashboard",
  description: "Enterprise-Grade Intelligence & OSINT Analysis Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="h-full bg-background text-foreground flex overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col h-full min-w-0">
          <Header />
          <main className="flex-1 overflow-auto bg-slate-950 p-4 lg:p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
