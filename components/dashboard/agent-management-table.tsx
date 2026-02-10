import { mockAgents } from "@/lib/dashboard-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Settings } from "lucide-react"

export function AgentManagementTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted">
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Agent Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Phone</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Leads Handled</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Policies Issued</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Conversion Rate</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Branch</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mockAgents.map((agent) => (
            <tr key={agent.id} className="border-b hover:bg-muted/50 transition-colors">
              <td className="px-6 py-4 text-sm font-medium text-foreground">{agent.name}</td>
              <td className="px-6 py-4 text-sm text-foreground">{agent.email}</td>
              <td className="px-6 py-4 text-sm text-foreground">{agent.phone}</td>
              <td className="px-6 py-4 text-sm text-foreground">{agent.leadsHandled}</td>
              <td className="px-6 py-4 text-sm text-foreground">{agent.policiesIssued}</td>
              <td className="px-6 py-4 text-sm text-foreground font-medium text-green-600">{agent.conversionRate}%</td>
              <td className="px-6 py-4 text-sm text-foreground">{agent.branch}</td>
              <td className="px-6 py-4">
                <Badge variant={agent.status === "active" ? "default" : "secondary"}>{agent.status}</Badge>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Settings className="size-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
