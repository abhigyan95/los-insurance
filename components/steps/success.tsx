"use client"

import { useJourney } from "@/lib/journey-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CheckCircleIcon, FileTextIcon, MailIcon, PhoneIcon, Building2Icon } from "lucide-react"
import Image from "next/image"

const companyLogos: Record<string, string> = {
  "bajaj-finserv-health": "/bajaj-health-logo.png",
  "health-assure": "/health-assure-logo.png",
  "icici": "/icici-lombard-logo.png",
  "max-life": "/max-life-logo.png",
  "hdfc-life": "/hdfc-life-logo.png",
  "care-health": "/care-health-logo.png",
  "zuno": "/zuno-logo.png",
  "bajaj-general": "/bajaj-general-logo.png",
  "bajaj-life": "/bajaj-life-logo.avif",
  "new-life": "/placeholder-logo.png",
}

export function SuccessStep() {
  const { state, resetJourney } = useJourney()

  const handleDownloadProposal = () => {
    // Create PDF content
    const content = generateProposalContent()
    const blob = new Blob([content], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `Proposal-${state.losId || "Application"}.html`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    // For actual PDF, you would use a library like jsPDF or html2pdf
    // This creates an HTML file that can be printed to PDF
  }

  const generateProposalContent = () => {
    const totalPremium = state.selectedInsuranceProducts?.reduce((sum, item) => sum + item.calculatedPremium, 0) || 0
    const allProducts = state.selectedInsuranceProducts || []
    
    return `
<!DOCTYPE html>
<html>
<head>
  <title>Insurance Proposal - ${state.losId}</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    h1 { color: #1a1a1a; }
    h2 { color: #333; margin-top: 20px; }
    table { width: 100%; border-collapse: collapse; margin: 10px 0; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f2f2f2; }
    .section { margin: 20px 0; }
  </style>
</head>
<body>
  <h1>Insurance Proposal</h1>
  <p><strong>Application ID:</strong> ${state.losId || "N/A"}</p>
  <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
  
  <div class="section">
    <h2>Applicant Details</h2>
    <table>
      <tr><th>Name</th><td>${state.loanApplication.fullName || "N/A"}</td></tr>
      <tr><th>Email</th><td>${state.loanApplication.email || "N/A"}</td></tr>
      <tr><th>Mobile</th><td>${state.loanApplication.mobile || "N/A"}</td></tr>
      <tr><th>Loan Amount</th><td>₹${Number(state.loanApplication.loanAmount || 0).toLocaleString("en-IN")}</td></tr>
    </table>
  </div>
  
  <div class="section">
    <h2>Additional Details</h2>
    <table>
      <tr><th>Gender</th><td>${state.insuranceProposal.gender || "N/A"}</td></tr>
      <tr><th>Height</th><td>${state.insuranceProposal.height || "N/A"} cm</td></tr>
      <tr><th>Weight</th><td>${state.insuranceProposal.weight || "N/A"} kg</td></tr>
      <tr><th>Occupation</th><td>${state.insuranceProposal.occupation || "N/A"}</td></tr>
      <tr><th>Nominee</th><td>${state.insuranceProposal.nomineeName || "N/A"}</td></tr>
    </table>
  </div>
  
  ${state.insuranceProposal.hasPreexistingDiseases ? `
  <div class="section">
    <h2>Medical Information</h2>
    <p><strong>Pre-existing Conditions:</strong> Yes</p>
    <p><strong>Conditions:</strong> ${(state.insuranceProposal.selectedMedicalConditions || []).join(", ") || "N/A"}</p>
  </div>
  ` : ""}
  
  <div class="section">
    <h2>Available Products</h2>
    <p>Total products available: Multiple options across Health, Travel, and Credit Life Insurance</p>
  </div>
  
  <div class="section">
    <h2>Selected Products</h2>
    <table>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Insurer</th>
          <th>Sum Insured</th>
          <th>Premium</th>
        </tr>
      </thead>
      <tbody>
        ${allProducts.map(
          (item) => `
        <tr>
          <td>${item.product.productName}</td>
          <td>${item.product.insurerName}</td>
          <td>${item.selectedSumInsured}</td>
          <td>₹${item.calculatedPremium.toLocaleString("en-IN")}</td>
        </tr>
        `
        ).join("")}
      </tbody>
      <tfoot>
        <tr>
          <th colspan="3">Total Premium</th>
          <th>₹${totalPremium.toLocaleString("en-IN")}</th>
        </tr>
      </tfoot>
    </table>
  </div>
</body>
</html>
    `
  }

  const handleStartNew = () => {
    resetJourney()
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-xl border-2 border-success/20">
        <CardHeader className="text-center py-8 bg-gradient-to-br from-success/5 to-transparent">
          <div className="mx-auto mb-6 flex size-24 items-center justify-center rounded-full bg-success/10 shadow-lg">
            <CheckCircleIcon className="size-14 text-success" />
          </div>
          <CardTitle className="text-3xl text-success font-bold">
            Congratulations!
          </CardTitle>
          <CardDescription className="text-base mt-3">
            Your Third-Party Products Application form has been successfully submitted.
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
                    ₹{Number(state.loanApplication.loanAmount || 0).toLocaleString("en-IN")}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Tenure</p>
                  <p className="text-lg font-bold">{state.loanApplication.loanTenure ? `${state.loanApplication.loanTenure} Years` : state.loanApplication.moratorium ? `${state.loanApplication.moratorium} Years` : "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Status</p>
                  <p className="text-lg font-bold text-success">Under Review</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Third Party Products Section */}
            {state.selectedInsuranceProducts && state.selectedInsuranceProducts.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <FileTextIcon className="size-5" />
                  Third Party Products
                </h3>
                <div className="space-y-3">
                  {state.selectedInsuranceProducts.map((item, idx) => (
                    <div key={item.product.insurerId} className="bg-background p-3 rounded border">
                      <div className="flex items-start justify-between gap-3">
                        <Image
                          src={companyLogos[item.product.companyCategory] || "/placeholder-logo.png"}
                          alt={item.product.insurerName}
                          width={40}
                          height={40}
                          className="h-10 w-10 object-contain rounded shrink-0"
                        />
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
            <Button onClick={handleDownloadProposal} size="lg" className="min-w-[250px] h-12 text-base font-semibold shadow-lg hover:shadow-xl">
              <FileTextIcon className="size-5 mr-2" />
              Download Proposal
            </Button>
            <Button onClick={handleStartNew} variant="outline" size="lg" className="min-w-[250px] h-12 text-base">
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
