"use client"

import { useState, useMemo } from "react"
import { LeadRow } from "./lead-row"
import { mockLeads, type Policy } from "@/lib/dashboard-data"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

interface LeadTableProps {
  onPolicyClick: (policy: Policy) => void
}

export function LeadTable({ onPolicyClick }: LeadTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [branchFilter, setBranchFilter] = useState<string | null>("all") // Updated default value
  const [statusFilter, setStatusFilter] = useState<string | null>("all") // Updated default value
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null)

  const filteredLeads = useMemo(() => {
    return mockLeads.filter((lead) => {
      const matchesSearch =
        searchTerm === "" ||
        lead.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.coveringLoan.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesBranch = branchFilter === "all" || lead.branch === branchFilter
      const matchesStatus = statusFilter === "all" || lead.status === statusFilter

      return matchesSearch && matchesBranch && matchesStatus
    })
  }, [searchTerm, branchFilter, statusFilter])

  const branches = Array.from(new Set(mockLeads.map((lead) => lead.branch)))

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by Lead ID, Name, or Loan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={branchFilter} onValueChange={(v) => setBranchFilter(v)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by Branch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Branches</SelectItem>
            {branches.map((branch) => (
              <SelectItem key={branch} value={branch}>
                {branch}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted">
              <th className="w-8 px-4 py-3 text-left"></th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Lead ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Covering Loan</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Funding Loan</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Customer Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Branch</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Loan Amount</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Total Premium</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <LeadRow
                key={lead.id}
                lead={lead}
                isExpanded={expandedLeadId === lead.id}
                onToggleExpand={(id) => setExpandedLeadId(expandedLeadId === id ? null : id)}
                onPolicyClick={onPolicyClick}
              />
            ))}
          </tbody>
        </table>
      </div>

      {filteredLeads.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">No leads found matching your criteria.</div>
      )}

      <div className="text-sm text-muted-foreground">
        Showing {filteredLeads.length} of {mockLeads.length} leads
      </div>
    </div>
  )
}
