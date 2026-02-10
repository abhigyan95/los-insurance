"use client"

import { useJourney } from "@/lib/journey-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircleIcon, Plus, ArrowRight } from "lucide-react"

export function LoanConfirmationStep() {
  const { state, setCurrentStep } = useJourney()

  const handleAddProducts = () => {
    setCurrentStep(3) // Go to Product Selection
  }

  const handleSkipProducts = () => {
    setCurrentStep(8) // Skip to Success
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Header */}
      <Card className="mb-6">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircleIcon className="size-16 text-success" />
          </div>
          <CardTitle className="text-3xl text-balance text-success">Loan Application Submitted Successfully!</CardTitle>
          <CardDescription className="text-base mt-2">
            Your loan application has been captured. Application ID: <span className="font-bold text-primary">{state.losId}</span>
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Loan Details Summary */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl">Loan Application Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Applicant Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground border-b pb-2">Applicant Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Student Name:</span>
                  <span className="font-medium text-foreground">{state.loanApplication.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Parent/Co-Applicant:</span>
                  <span className="font-medium text-foreground">{state.loanApplication.parentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mobile:</span>
                  <span className="font-medium text-foreground">{state.loanApplication.mobile}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium text-foreground">{state.loanApplication.email}</span>
                </div>
              </div>
            </div>

            {/* Loan Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground border-b pb-2">Loan Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Education Type:</span>
                  <span className="font-medium text-foreground">
                    {state.loanApplication.educationType === "pg-international"
                      ? "PG International"
                      : state.loanApplication.educationType === "pg-india"
                      ? "PG India"
                      : state.loanApplication.educationType === "ug"
                      ? "Undergraduate (UG)"
                      : state.loanApplication.educationType || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Loan Amount:</span>
                  <span className="font-bold text-primary text-lg">
                    ₹{Number(state.loanApplication.loanAmount).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Moratorium Period:</span>
                  <span className="font-medium text-foreground">
                    {state.loanApplication.moratorium || "0"} Years
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Application ID:</span>
                  <span className="font-bold text-primary">{state.losId}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="mt-6 pt-6 border-t">
            <h3 className="font-semibold text-foreground mb-2">Address</h3>
            <p className="text-sm text-muted-foreground">
              {state.loanApplication.currentAddress}, {state.loanApplication.city},{" "}
              {state.loanApplication.state} - {state.loanApplication.pincode}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* CTA Card */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Protect Your Investment</CardTitle>
          <CardDescription className="text-base mt-2">
            Add Value Added Services (VAS) and Insurance products to safeguard your education loan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 rounded-lg bg-background">
              <div className="font-bold text-lg text-primary mb-1">Health Insurance</div>
              <p className="text-xs text-muted-foreground">Comprehensive coverage</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-background">
              <div className="font-bold text-lg text-primary mb-1">Travel Insurance</div>
              <p className="text-xs text-muted-foreground">For overseas education</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-background">
              <div className="font-bold text-lg text-primary mb-1">Credit Protection</div>
              <p className="text-xs text-muted-foreground">Secure your loan</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={handleAddProducts} size="lg" className="text-base gap-2">
              <Plus className="size-5" />
              Add Other Third-Party Products
            </Button>
            <Button onClick={handleSkipProducts} size="lg" variant="outline" className="text-base gap-2">
              Skip for Now
              <ArrowRight className="size-5" />
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-4">
            You can always add products later from your dashboard
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
