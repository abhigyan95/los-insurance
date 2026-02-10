"use client"

import { useState } from "react"
import { useJourney } from "@/lib/journey-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AlertCircleIcon, CheckCircleIcon, ShieldCheckIcon, UserIcon, FileTextIcon, PackageIcon } from "lucide-react"
import Image from "next/image"

export function CustomerConfirmationStep() {
  const { state, setCurrentStep } = useJourney()
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [confirmedAccuracy, setConfirmedAccuracy] = useState(false)

  const handleConfirm = () => {
    if (agreedToTerms && confirmedAccuracy) {
      setCurrentStep(7) // Go to OTP verification (customer side)
    }
  }

  const totalProducts = state.selectedInsuranceProducts?.length || 0
  const totalPremium = state.selectedInsuranceProducts?.reduce((sum, item) => sum + item.calculatedPremium, 0) || 0

  return (
    <div className="min-h-screen bg-background">
      {/* Customer-Facing Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image src="/avanse-logo.png" alt="Avanse Logo" width={100} height={50} className="h-10 w-auto" />
              <div>
                <h1 className="text-xl font-bold text-foreground">Product Confirmation</h1>
                <p className="text-xs text-muted-foreground">Application ID: {state.losId}</p>
              </div>
            </div>
            <Badge variant="outline" className="gap-1">
              <ShieldCheckIcon className="size-3" />
              Secure
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Welcome Card */}
        <Card className="mb-6 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <UserIcon className="size-12 text-primary" />
            </div>
            <CardTitle className="text-2xl">Welcome, {state.loanApplication.fullName}!</CardTitle>
            <CardDescription className="text-base mt-2">
              Please review and confirm the third-party products selected for your education loan application
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Important Notice */}
        <div className="mb-6 flex items-start gap-3 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border-2 border-amber-200 dark:border-amber-800">
          <AlertCircleIcon className="size-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-900 dark:text-amber-100 mb-1">Important: Independent Confirmation Required</p>
            <p className="text-sm text-amber-800 dark:text-amber-200">
              As per regulatory requirements, you must independently review and confirm your product selection. 
              Please verify all details carefully before proceeding.
            </p>
          </div>
        </div>

        {/* Application Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileTextIcon className="size-5" />
              Application Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg bg-muted/30">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Student Name</p>
                <p className="font-semibold text-foreground">{state.loanApplication.fullName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Parent/Co-Applicant</p>
                <p className="font-semibold text-foreground">{state.loanApplication.parentName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Mobile Number</p>
                <p className="font-semibold text-foreground">{state.loanApplication.mobile}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Email Address</p>
                <p className="font-semibold text-foreground">{state.loanApplication.email}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Education Type</p>
                <p className="font-semibold text-foreground">
                  {state.loanApplication.educationType === "pg-international"
                    ? "PG International"
                    : state.loanApplication.educationType === "pg-india"
                    ? "PG India"
                    : state.loanApplication.educationType === "ug"
                    ? "Undergraduate"
                    : state.loanApplication.educationType || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Loan Amount</p>
                <p className="font-bold text-primary text-lg">
                  ₹{Number(state.loanApplication.loanAmount).toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            <Separator />

            {/* Auto-filled Additional Details */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Additional Information Provided</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between p-2 rounded bg-muted/30">
                  <span className="text-muted-foreground">Gender:</span>
                  <span className="font-medium capitalize">{state.insuranceProposal.gender || "N/A"}</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-muted/30">
                  <span className="text-muted-foreground">Nominee Name:</span>
                  <span className="font-medium">{state.insuranceProposal.nomineeName || "N/A"}</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-muted/30">
                  <span className="text-muted-foreground">Nominee Relationship:</span>
                  <span className="font-medium capitalize">{state.insuranceProposal.nomineeRelationship || "N/A"}</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-muted/30">
                  <span className="text-muted-foreground">Occupation:</span>
                  <span className="font-medium">{state.insuranceProposal.occupation || "Student"}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selected Products */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PackageIcon className="size-5" />
              Selected Third-Party Products ({totalProducts})
            </CardTitle>
            <CardDescription>
              Review the insurance and VAS products selected for your application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {state.selectedInsuranceProducts && state.selectedInsuranceProducts.length > 0 ? (
              <>
                <div className="space-y-3">
                  {state.selectedInsuranceProducts.map((item, index) => (
                    <div key={item.product.insurerId} className="border rounded-lg p-4 bg-card hover:bg-muted/30 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1 space-y-3">
                          <div>
                            <h3 className="font-semibold text-lg text-foreground">{item.product.productName}</h3>
                            <p className="text-sm text-muted-foreground">{item.product.insurerName}</p>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                            <div className="p-2 rounded bg-muted/50">
                              <p className="text-xs text-muted-foreground">Sum Insured</p>
                              <p className="font-semibold text-foreground">{item.selectedSumInsured}</p>
                            </div>
                            <div className="p-2 rounded bg-muted/50">
                              <p className="text-xs text-muted-foreground">Product Amount</p>
                              <p className="font-semibold text-foreground">{item.product.productAmount}</p>
                            </div>
                            <div className="p-2 rounded bg-muted/50">
                              <p className="text-xs text-muted-foreground">Charge Code</p>
                              <p className="font-medium text-foreground">{item.product.chargeCode}</p>
                            </div>
                            <div className="p-2 rounded bg-muted/50">
                              <p className="text-xs text-muted-foreground">Premium</p>
                              <p className="font-bold text-primary">₹{item.calculatedPremium.toLocaleString("en-IN")}</p>
                            </div>
                          </div>

                          {/* Key Benefits */}
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground mb-2">Key Benefits:</p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-1 text-xs">
                              {item.product.keyBenefits.slice(0, 4).map((benefit, idx) => (
                                <li key={idx} className="flex items-start gap-1">
                                  <CheckCircleIcon className="size-3 text-success shrink-0 mt-0.5" />
                                  <span className="text-muted-foreground">{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Total Premium */}
                <div className="flex justify-between items-center p-4 rounded-lg bg-primary/10 border-2 border-primary/20">
                  <span className="font-semibold text-lg">Total Premium (All Products)</span>
                  <span className="font-bold text-2xl text-primary">₹{totalPremium.toLocaleString("en-IN")}</span>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No products selected</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Confirmation Checkboxes */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Confirmation & Consent</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-lg border hover:bg-muted/30 transition-colors">
              <Checkbox
                id="accuracy"
                checked={confirmedAccuracy}
                onCheckedChange={(checked) => setConfirmedAccuracy(checked as boolean)}
                className="mt-1"
              />
              <Label htmlFor="accuracy" className="cursor-pointer flex-1">
                <p className="font-medium mb-1">I confirm the accuracy of all information provided</p>
                <p className="text-sm text-muted-foreground">
                  I have reviewed all application details and product information, and confirm that the information is accurate and complete.
                </p>
              </Label>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg border hover:bg-muted/30 transition-colors">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                className="mt-1"
              />
              <Label htmlFor="terms" className="cursor-pointer flex-1">
                <p className="font-medium mb-1">I agree to the Terms & Conditions</p>
                <p className="text-sm text-muted-foreground">
                  I agree to the terms and conditions of the selected products and authorize the processing of my application.
                </p>
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Action Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleConfirm}
            size="lg"
            disabled={!agreedToTerms || !confirmedAccuracy}
            className="min-w-[300px] text-base gap-2"
          >
            <CheckCircleIcon className="size-5" />
            Confirm & Proceed to Verification
          </Button>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>
            Next step: You will receive an OTP for identity verification before final submission.
          </p>
        </div>
      </main>
    </div>
  )
}
