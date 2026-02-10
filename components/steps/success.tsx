"use client"

import { useJourney } from "@/lib/journey-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CheckCircleIcon, FileTextIcon, MailIcon, PhoneIcon, Building2Icon } from "lucide-react"

export function SuccessStep() {
  const { state, resetJourney } = useJourney()

  const handleDownloadProposal = () => {
    // Simulate downloading proposal
    console.log("Downloading proposal...")
  }

  const handleStartNew = () => {
    resetJourney()
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-success/10">
            <CheckCircleIcon className="size-12 text-success" />
          </div>
          <CardTitle className="text-3xl text-success">
            Congratulations your Bajaj Insurance Plan is Submitted!
          </CardTitle>
          <CardDescription className="text-base">
            Your loan is disbursed and insurance will be active soon
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Loan & Insurance Summary */}
          <div className="rounded-lg border bg-muted/30 p-4 space-y-4">
            {/* Loan Disbursement Section */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Building2Icon className="size-5" />
                Loan Disbursement Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-background p-3 rounded border">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Application ID</p>
                  <p className="text-lg font-bold text-primary">{state.losId}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Loan Amount</p>
                  <p className="text-lg font-bold">
                    ₹{Number(state.loanApplication.loanAmount).toLocaleString("en-IN")}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Tenure</p>
                  <p className="text-lg font-bold">{state.loanApplication.loanTenure} Years</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Status</p>
                  <p className="text-lg font-bold text-success">Disbursed</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Insurance Policies Section */}
            {state.selectedInsuranceProducts && state.selectedInsuranceProducts.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <FileTextIcon className="size-5" />
                  Insurance Policies
                </h3>
                <div className="space-y-3">
                  {state.selectedInsuranceProducts.map((item, idx) => (
                    <div key={item.product.insurerId} className="bg-background p-3 rounded border">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 space-y-2">
                          <div>
                            <p className="text-xs text-muted-foreground font-medium">{item.product.productName}</p>
                            <p className="text-sm font-semibold text-primary mt-1">
                              Application #{Math.random().toString(36).substr(2, 8).toUpperCase()}
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-muted-foreground">Sum Insured:</span>
                              <p className="font-medium">{item.selectedSumInsured}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Charge Code:</span>
                              <p className="font-medium">{item.chargeCode}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Provider:</span>
                              <p className="font-medium">{item.product.insurerName}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Premium:</span>
                              <p className="font-medium">₹{item.calculatedPremium.toLocaleString("en-IN")}</p>
                            </div>
                          </div>
                        </div>
                        <FileTextIcon className="size-5 text-muted-foreground shrink-0" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* What's Next */}
          <div className="space-y-3">
            <h3 className="font-semibold">What Happens Next?</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                  1
                </div>
                <div>
                  <p className="font-medium">Document Verification</p>
                  <p className="text-sm text-muted-foreground">
                    Our team will verify your submitted documents within 24-48 hours
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                  2
                </div>
                <div>
                  <p className="font-medium">Credit Assessment</p>
                  <p className="text-sm text-muted-foreground">Credit score check and loan eligibility review</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                  3
                </div>
                <div>
                  <p className="font-medium">Final Approval</p>
                  <p className="text-sm text-muted-foreground">
                    You'll receive approval notification and next steps via email and SMS
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
            <h3 className="font-semibold">Need Help?</h3>
            <div className="flex items-center gap-2 text-sm">
              <MailIcon className="size-4 text-muted-foreground" />
              <span>support@loanportal.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <PhoneIcon className="size-4 text-muted-foreground" />
              <span>1800-123-4567 (Toll Free)</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={handleDownloadProposal} variant="outline">
              <FileTextIcon className="size-4 mr-2" />
              Download Proposal
            </Button>
            <Button onClick={handleStartNew} className="bg-primary hover:bg-primary/90">
              Fill New Application
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            A confirmation email has been sent to {state.loanApplication.email}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
