"use client"
import { useState } from "react"
import { LeadTable } from "@/components/dashboard/lead-table"
import { PolicyDetailsModal } from "@/components/dashboard/policy-details-modal"
import type { Policy } from "@/lib/dashboard-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function DashboardPage() {
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null)

  return (
    <div className="flex flex-col h-full">
      <div className="border-b bg-card p-6">
        <div className="flex items-center justify-between">
          {/* Ambit logo removed - now displayed in sidebar only */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">Agent Portal</h1>
            <p className="text-muted-foreground mt-1">Track and manage all customer leads and insurance policies</p>
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="size-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Leads</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <LeadTable onPolicyClick={setSelectedPolicy} />
            </CardContent>
          </Card>
        </div>
      </div>

      {selectedPolicy && (
        <PolicyDetailsModal policy={selectedPolicy} isOpen={!!selectedPolicy} onClose={() => setSelectedPolicy(null)} />
      )}
    </div>
  )
}
