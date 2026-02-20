"use client"

import { useState } from "react"
import { useJourney } from "@/lib/journey-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircleIcon, LockIcon, CheckCircleIcon, ArrowLeftIcon } from "lucide-react"

const medicalConditions = [
  "Diabetes",
  "Hypertension",
  "Heart Disease",
  "Asthma",
  "Thyroid Disorders",
  "Kidney Disease",
  "Liver Disease",
  "Cancer",
  "Arthritis",
  "Mental Health Conditions",
  "Other",
]

export function InsuranceProposalStep() {
  const { state, updateInsuranceProposal, setCurrentStep } = useJourney()
  const [proposalData, setProposalData] = useState({
    ...state.insuranceProposal,
    hasPreexistingDiseases: state.insuranceProposal.hasPreexistingDiseases || false,
    selectedMedicalConditions: state.insuranceProposal.selectedMedicalConditions || [],
  })

  const handleChange = (field: string, value: string | boolean) => {
    setProposalData((prev) => ({ ...prev, [field]: value }))
  }

  const handleMedicalConditionToggle = (condition: string) => {
    setProposalData((prev) => {
      const current = prev.selectedMedicalConditions || []
      const updated = current.includes(condition)
        ? current.filter((c) => c !== condition)
        : [...current, condition]
      return { ...prev, selectedMedicalConditions: updated }
    })
  }

  const handleSubmit = () => {
    updateInsuranceProposal(proposalData)
    setCurrentStep(5) // Go to Send Customer Link step
  }

  // Prefilled data from loan application
  const prefilledFields = {
    fullName: state.loanApplication.fullName || "",
    dateOfBirth: state.loanApplication.dateOfBirth || "",
    mobile: state.loanApplication.mobile || "",
    email: state.loanApplication.email || "",
    address: `${state.loanApplication.currentAddress || ""}, ${state.loanApplication.city || ""}, ${state.loanApplication.state || ""} - ${state.loanApplication.pincode || ""}`,
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Button onClick={() => setCurrentStep(3)} variant="outline" size="sm" className="mb-4 shadow-sm hover:shadow-md transition-shadow">
        <ArrowLeftIcon className="size-4 mr-2" />
        Back to Product Selection
      </Button>

      <Card className="shadow-lg border-2">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
          <CardTitle className="text-2xl text-balance font-bold">Third Party Products Application Form</CardTitle>
          <CardDescription className="text-base mt-2">Complete the application details for all selected products</CardDescription>
          <div className="flex items-start gap-2 mt-4 p-3 rounded-lg bg-accent">
            <AlertCircleIcon className="size-5 text-accent-foreground shrink-0 mt-0.5" />
            <p className="text-sm text-accent-foreground leading-relaxed">
              Some fields have been auto-filled from your loan application. Please verify and complete the remaining details.
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Selected Products Summary */}
          {state.selectedInsuranceProducts && state.selectedInsuranceProducts.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground text-lg">Selected Products ({state.selectedInsuranceProducts.length})</h3>
              <div className="space-y-3">
                {state.selectedInsuranceProducts.map((item, index) => (
                  <div key={item.product.insurerId} className="p-4 rounded-lg border bg-muted/30">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{item.product.productName}</p>
                          <p className="text-xs text-muted-foreground">{item.product.insurerName}</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm bg-background p-3 rounded">
                      <div>
                        <span className="text-muted-foreground text-xs">Sum Insured</span>
                        <p className="font-semibold text-foreground">{item.selectedSumInsured}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-xs">Product Amount</span>
                        <p className="font-semibold text-primary">{item.product.productAmount}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-xs">Charge Code</span>
                        <p className="font-medium text-foreground">{item.product.chargeCode}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-xs">Total Premium</span>
                        <p className="font-semibold text-primary">₹{item.calculatedPremium.toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center p-4 rounded-lg bg-primary/10 border-2 border-primary/20">
                <span className="font-semibold text-lg">Total Premium (All Products)</span>
                <span className="font-bold text-2xl text-primary">
                  ₹{state.selectedInsuranceProducts.reduce((sum, item) => sum + item.calculatedPremium, 0).toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          )}

          <Separator />

          {/* Prefilled Fields Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-foreground">
              <LockIcon className="size-5 text-success" />
              <h3 className="font-semibold text-lg">Auto-filled from Loan Application</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prefilled-fullName" className="flex items-center gap-2">
                  Full Name{" "}
                  <span className="text-xs text-success flex items-center gap-1">
                    <CheckCircleIcon className="size-3" /> Auto-filled
                  </span>
                </Label>
                <Input id="prefilled-fullName" value={prefilledFields.fullName} className="bg-accent/50" readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prefilled-dob" className="flex items-center gap-2">
                  Date of Birth{" "}
                  <span className="text-xs text-success flex items-center gap-1">
                    <CheckCircleIcon className="size-3" /> Auto-filled
                  </span>
                </Label>
                <Input id="prefilled-dob" value={prefilledFields.dateOfBirth} className="bg-accent/50" readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prefilled-mobile" className="flex items-center gap-2">
                  Mobile Number{" "}
                  <span className="text-xs text-success flex items-center gap-1">
                    <CheckCircleIcon className="size-3" /> Auto-filled
                  </span>
                </Label>
                <Input id="prefilled-mobile" value={prefilledFields.mobile} className="bg-accent/50" readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prefilled-email" className="flex items-center gap-2">
                  Email{" "}
                  <span className="text-xs text-success flex items-center gap-1">
                    <CheckCircleIcon className="size-3" /> Auto-filled
                  </span>
                </Label>
                <Input id="prefilled-email" value={prefilledFields.email} className="bg-accent/50" readOnly />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="prefilled-address" className="flex items-center gap-2">
                  Address{" "}
                  <span className="text-xs text-success flex items-center gap-1">
                    <CheckCircleIcon className="size-3" /> Auto-filled
                  </span>
                </Label>
                <Input id="prefilled-address" value={prefilledFields.address} className="bg-accent/50" readOnly />
              </div>
            </div>
          </div>

          <Separator />

          {/* Additional Application Details - Only Incremental Fields */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-foreground">Additional Details</h3>
            <p className="text-sm text-muted-foreground">Please provide the following information to complete your application</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select value={proposalData.gender || ""} onValueChange={(value) => handleChange("gender", value)}>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nomineeName">Nominee Name *</Label>
                <Input
                  id="nomineeName"
                  placeholder="Enter nominee full name"
                  value={proposalData.nomineeName || ""}
                  onChange={(e) => handleChange("nomineeName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nomineeRelationship">Nominee Relationship *</Label>
                <Select
                  value={proposalData.nomineeRelationship || ""}
                  onValueChange={(value) => handleChange("nomineeRelationship", value)}
                >
                  <SelectTrigger id="nomineeRelationship">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spouse">Spouse</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="child">Child</SelectItem>
                    <SelectItem value="sibling">Sibling</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-1">
                <Label htmlFor="occupation">Occupation *</Label>
                <Input
                  id="occupation"
                  placeholder="Enter occupation"
                  value={proposalData.occupation || ""}
                  onChange={(e) => handleChange("occupation", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm) *</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Enter height in cm"
                  value={proposalData.height || ""}
                  onChange={(e) => handleChange("height", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg) *</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Enter weight in kg"
                  value={proposalData.weight || ""}
                  onChange={(e) => handleChange("weight", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Medical Conditions Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-foreground">Medical Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-lg border">
                <Checkbox
                  id="hasPreexistingDiseases"
                  checked={proposalData.hasPreexistingDiseases || false}
                  onCheckedChange={(checked) => handleChange("hasPreexistingDiseases", checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="hasPreexistingDiseases" className="cursor-pointer flex-1">
                  <p className="font-medium mb-1">Do you have any pre-existing medical conditions?</p>
                  <p className="text-sm text-muted-foreground">
                    Please select if you have been diagnosed with any medical conditions
                  </p>
                </Label>
              </div>

              {proposalData.hasPreexistingDiseases && (
                <div className="p-4 rounded-lg border bg-muted/30 space-y-3">
                  <Label className="text-sm font-medium">Please select all applicable conditions:</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {medicalConditions.map((condition) => (
                      <div key={condition} className="flex items-center gap-2">
                        <Checkbox
                          id={`condition-${condition}`}
                          checked={(proposalData.selectedMedicalConditions || []).includes(condition)}
                          onCheckedChange={() => handleMedicalConditionToggle(condition)}
                        />
                        <Label htmlFor={`condition-${condition}`} className="cursor-pointer text-sm">
                          {condition}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button onClick={handleSubmit} size="lg" className="min-w-[200px]">
              Continue to Next Step
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
