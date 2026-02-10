"use client"

import { ChevronDown } from "lucide-react"
import type { Lead, Policy } from "@/lib/dashboard-data"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"

interface LeadRowProps {
  lead: Lead
  isExpanded: boolean
  onToggleExpand: (id: string) => void
  onPolicyClick: (policy: Policy) => void
}

export function LeadRow({ lead, isExpanded, onToggleExpand, onPolicyClick }: LeadRowProps) {
  return (
    <>
      <tr className="border-b hover:bg-muted/50 transition-colors">
        <td className="px-4 py-3">
          <Button variant="ghost" size="sm" onClick={() => onToggleExpand(lead.id)} className="p-0 h-auto">
            <ChevronDown className={`size-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
          </Button>
        </td>
        <td className="px-4 py-3 text-sm font-medium text-foreground">{lead.id}</td>
        <td className="px-4 py-3 text-sm text-foreground">{lead.coveringLoan}</td>
        <td className="px-4 py-3 text-sm text-foreground">{lead.fundingLoan}</td>
        <td className="px-4 py-3 text-sm text-foreground">{lead.customerName}</td>
        <td className="px-4 py-3 text-sm text-foreground">{lead.branch}</td>
        <td className="px-4 py-3 text-sm text-foreground">{formatCurrency(lead.coveringLoanAmount)}</td>
        <td className="px-4 py-3 text-sm text-foreground">{formatCurrency(lead.totalPremium)}</td>
      </tr>

      {isExpanded && (
        <tr>
          <td colSpan={8} className="px-4 py-4 bg-muted/30">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground mb-3">Policies</h4>
              {lead.policies.map((policy) => (
                <div
                  key={policy.id}
                  onClick={() => onPolicyClick(policy)}
                  className="flex items-center justify-between p-3 bg-card border border-border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                >
                  <div className="grid grid-cols-4 gap-4 flex-1 text-sm">
                    <div>
                      <span className="text-muted-foreground">Policy #:</span>
                      <p className="font-medium text-foreground">{policy.policyNumber}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Start Date:</span>
                      <p className="font-medium text-foreground">{policy.startDate}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Proposer:</span>
                      <p className="font-medium text-foreground">{policy.proposer}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Insurer:</span>
                      <p className="font-medium text-foreground">{policy.insurer}</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">Click to view details →</div>
                </div>
              ))}
            </div>
          </td>
        </tr>
      )}
    </>
  )
}
