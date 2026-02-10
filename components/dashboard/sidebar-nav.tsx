"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { LayoutDashboard, Users, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Agent Management",
      href: "/dashboard/admin",
      icon: Users,
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border flex flex-col items-center gap-4">
        <Image src="/avanse-logo.png" alt="Avanse Logo" width={120} height={60} className="object-contain" />
        <div className="text-center">
          <h2 className="text-lg font-bold text-foreground">Agent Portal</h2>
          <p className="text-xs text-muted-foreground mt-1">Loan & Insurance Management</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3",
                  isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Button>
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border p-4">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
        >
          <LogOut className="size-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}
