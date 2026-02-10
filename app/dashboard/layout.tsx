import type React from "react"
import { Sidebar } from "@/components/dashboard/sidebar-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
