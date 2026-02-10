"use client"

import { X, Download } from "lucide-react"
import type { Policy } from "@/lib/dashboard-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"

interface PolicyDetailsModalProps {
  policy: Policy | null
  isOpen: boolean
  onClose: () => void
}

export function PolicyDetailsModal({ policy, isOpen, onClose }: PolicyDetailsModalProps) {
  if (!isOpen || !policy) return null

  const handleDownloadCOI = () => {
    const link = document.createElement("a")
    link.href = "/documents/coi-sample.pdf"
    link.download = `COI_${policy.policyNumber}.pdf`
    link.click()
  }

  const handleDownloadSFQ = () => {
    const link = document.createElement("a")
    link.href = "/documents/sfq-sample.pdf"
    link.download = `SFQ_${policy.policyNumber}.pdf`
    link.click()
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-card shadow-lg z-50 overflow-y-auto">
        <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-card">
          <h2 className="text-2xl font-bold text-foreground">Policy Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="size-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Policy Number</p>
                <p className="text-2xl font-bold text-foreground">{policy.policyNumber}</p>
              </div>
              <Badge variant={policy.insurerStatus === "Enforced" ? "default" : "secondary"}>
                {policy.insurerStatus}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-semibold text-foreground mb-4">Policy Information</p>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-muted-foreground">Policy Status</span>
                  <p className="font-medium text-foreground">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Active
                    </Badge>
                  </p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Insurer Status</span>
                  <p className="font-medium text-foreground">{policy.insurerStatus}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Insurer Remarks</span>
                  <p className="font-medium text-foreground">{policy.insurerRemarks || "-"}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Proposal Number</span>
                  <p className="font-medium text-foreground">{policy.proposalNumber}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Insurer</span>
                  <p className="font-medium text-foreground">{policy.insurer}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Product</span>
                  <p className="font-medium text-foreground">{policy.product}</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground mb-4">Premium Breakdown</p>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Base Premium</span>
                  <p className="font-medium text-foreground">{formatCurrency(policy.basePremium)}</p>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">GST (18%)</span>
                  <p className="font-medium text-foreground">{formatCurrency(policy.gst)}</p>
                </div>
                <div className="flex justify-between border-t border-border pt-3">
                  <span className="text-sm font-semibold text-foreground">Total Premium</span>
                  <p className="font-bold text-foreground">{formatCurrency(policy.premium)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-border">
            <div>
              <p className="text-sm font-semibold text-foreground mb-4">Coverage Details</p>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-muted-foreground">Start Date</span>
                  <p className="font-medium text-foreground">{policy.startDate}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Expiry Date</span>
                  <p className="font-medium text-foreground">{policy.expiryDate}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Tenure</span>
                  <p className="font-medium text-foreground">{policy.tenure}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Sum Insured</span>
                  <p className="font-medium text-foreground">{formatCurrency(policy.sumInsured)}</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground mb-4">Customer Information</p>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-muted-foreground">Proposer</span>
                  <p className="font-medium text-foreground">{policy.proposer}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Email</span>
                  <p className="font-medium text-foreground text-xs">{policy.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-6 border-t border-border">
            <Button onClick={handleDownloadCOI} variant="outline" className="flex-1 gap-2 bg-transparent">
              <Download className="size-4" />
              Download COI
            </Button>
            <Button onClick={handleDownloadSFQ} variant="outline" className="flex-1 gap-2 bg-transparent">
              <Download className="size-4" />
              Download SFQ
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
