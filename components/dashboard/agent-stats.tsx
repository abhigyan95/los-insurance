import { Card, CardContent } from "@/components/ui/card"
import { Users, TrendingUp, FileCheck, DollarSign } from "lucide-react"
import { mockAgents, mockLeads } from "@/lib/dashboard-data"
import { formatCurrency } from "@/lib/utils"

export function AgentStats() {
  const totalLeads = mockLeads.length
  const totalPolicies = mockLeads.reduce((sum, lead) => sum + lead.policies.length, 0)
  const totalPremium = mockLeads.reduce((sum, lead) => sum + lead.totalPremium, 0)

  const stats = [
    {
      label: "Total Agents",
      value: mockAgents.length,
      icon: Users,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Active Leads",
      value: totalLeads,
      icon: TrendingUp,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Policies Issued",
      value: totalPolicies,
      icon: FileCheck,
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Total Premium",
      value: formatCurrency(totalPremium),
      icon: DollarSign,
      color: "bg-orange-50 text-orange-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="size-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
