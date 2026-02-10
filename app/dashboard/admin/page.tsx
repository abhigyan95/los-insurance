"use client"

import { AgentStats } from "@/components/dashboard/agent-stats"
import { AgentManagementTable } from "@/components/dashboard/agent-management-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="border-b bg-card p-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage agents and monitor portfolio performance</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          <AgentStats />

          <Card>
            <CardHeader>
              <CardTitle>Agent Performance</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <AgentManagementTable />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
