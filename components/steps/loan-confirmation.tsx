"use client"

import { useState } from "react"
import { useJourney } from "@/lib/journey-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircleIcon, Plus, ArrowRight, Edit2, Check, X } from "lucide-react"

export function LoanConfirmationStep() {
  const { state, setCurrentStep, updateLoanApplication } = useJourney()
  const [isEditingAmount, setIsEditingAmount] = useState(false)
  const [editedAmount, setEditedAmount] = useState(state.loanApplication.loanAmount || "")

  const handleAddProducts = () => {
    setCurrentStep(3) // Go to Product Selection
  }

  const handleSkipProducts = () => {
    setCurrentStep(8) // Skip to Success
  }

  const handleEditAmount = () => {
    setIsEditingAmount(true)
  }

  const handleSaveAmount = () => {
    updateLoanApplication({ loanAmount: editedAmount })
    setIsEditingAmount(false)
  }

  const handleCancelEdit = () => {
    setEditedAmount(state.loanApplication.loanAmount || "")
    setIsEditingAmount(false)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Header */}
      <Card className="mb-6 shadow-xl border-2 border-success/20 bg-gradient-to-br from-success/5 to-transparent">
        <CardHeader className="text-center py-8">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-success/10 p-4">
              <CheckCircleIcon className="size-16 text-success" />
            </div>
          </div>
          <CardTitle className="text-3xl text-balance text-success font-bold">Loan Application Submitted Successfully!</CardTitle>
          <CardDescription className="text-base mt-3">
            Your loan application has been captured. Application ID: <span className="font-bold text-primary text-lg">{state.losId}</span>
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Loan Details Summary */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-muted/50 border-b">
          <CardTitle className="text-xl font-semibold">Loan Application Summary</CardTitle>
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
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Loan Amount:</span>
                  {isEditingAmount ? (
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={editedAmount}
                        onChange={(e) => setEditedAmount(e.target.value)}
                        className="w-32 h-8 text-sm"
                        autoFocus
                      />
                      <Button size="sm" onClick={handleSaveAmount} className="h-8">
                        <Check className="size-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleCancelEdit} className="h-8">
                        <X className="size-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary text-lg">
                        ₹{Number(state.loanApplication.loanAmount).toLocaleString("en-IN")}
                      </span>
                      <Button size="sm" variant="ghost" onClick={handleEditAmount} className="h-6 w-6 p-0">
                        <Edit2 className="size-3" />
                      </Button>
                    </div>
                  )}
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

      {/* Review Button - Prominent */}
      <div className="mb-6 flex justify-center">
        <Button onClick={handleAddProducts} size="lg" className="min-w-[300px] h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
          <Plus className="size-6 mr-2" />
          Add Third-Party Products
        </Button>
      </div>

      {/* Skip Option */}
      <div className="flex justify-center">
        <Button onClick={handleSkipProducts} variant="ghost" size="lg" className="text-muted-foreground">
          Skip for Now
          <ArrowRight className="size-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
