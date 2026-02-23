"use client"

import { useState } from "react"
import { useJourney } from "@/lib/journey-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AlertCircleIcon, CheckCircleIcon, ShieldCheckIcon, UserIcon, FileTextIcon, PackageIcon, Edit2, ChevronDown, X } from "lucide-react"
import Image from "next/image"
import { insuranceProducts } from "@/lib/insurance-data"
import type { InsuranceProductData } from "@/lib/journey-context"

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

const productTypeLabels: Record<string, string> = {
  vas: "VAS – Health Insurance",
  travel: "Travel Insurance",
  creditlife: "MRTA / Credit Life Insurance",
  health: "Health Insurance",
}

const CATEGORY_ORDER: (keyof typeof productTypeLabels)[] = ["vas", "creditlife", "health", "travel"]

function groupProductsByCategory(products: InsuranceProductData[]) {
  const map: Record<string, InsuranceProductData[]> = { vas: [], travel: [], creditlife: [], health: [] }
  products.forEach((p) => {
    if (map[p.productType]) map[p.productType].push(p)
  })
  return map
}

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

function EditProductModalContent({
  product,
  currentSumInsured,
  onSave,
  onClose,
}: {
  product: InsuranceProductData
  currentSumInsured: string
  onSave: (sumInsured: string, premium: number) => void
  onClose: () => void
}) {
  const [selectedSumInsured, setSelectedSumInsured] = useState(currentSumInsured)
  const premiumAmount = product.productAmount || product.annualPremium || "₹0"
  const [customSumInsured, setCustomSumInsured] = useState("")
  const [useCustom, setUseCustom] = useState(false)

  const handleCalculatePremium = (sumInsuredValue: string) => {
    const basePremium = Number.parseFloat(premiumAmount.replace(/[₹,\s]/g, "") || "0")
    const sumInsuredNum = Number.parseFloat((product.sumInsured || "₹0").replace(/[₹,\s]/g, "") || "0")
    const selectedNum = Number.parseFloat(sumInsuredValue.replace(/[₹,\s]/g, "") || "0")
    const multiplier = sumInsuredNum > 0 ? selectedNum / sumInsuredNum : 1
    return Math.round(basePremium * multiplier * 10) / 10
  }

  const [customPremium, setCustomPremium] = useState(handleCalculatePremium(currentSumInsured))

  const handleSumInsuredChange = (value: string) => {
    if (useCustom) {
      setCustomSumInsured(value)
      const numValue = Number.parseFloat(value.replace(/[₹,\s]/g, "") || "0")
      setCustomPremium(handleCalculatePremium(`₹${numValue.toLocaleString("en-IN")}`))
    } else {
      setSelectedSumInsured(value)
      setCustomPremium(handleCalculatePremium(value))
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium mb-2 block">Sum Insured</Label>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="use-custom"
              checked={useCustom}
              onCheckedChange={(checked) => {
                setUseCustom(checked as boolean)
                if (checked) {
                  setCustomSumInsured("")
                }
              }}
            />
            <Label htmlFor="use-custom" className="text-sm cursor-pointer">
              Enter custom amount
            </Label>
          </div>
          {useCustom ? (
            <Input
              type="text"
              placeholder="Enter amount (e.g., ₹50,00,000)"
              value={customSumInsured}
              onChange={(e) => handleSumInsuredChange(e.target.value)}
            />
          ) : (
            <Select value={selectedSumInsured} onValueChange={handleSumInsuredChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select sum insured" />
              </SelectTrigger>
              <SelectContent>
                {product.availableSumInsured && product.availableSumInsured.length > 0 ? (
                  product.availableSumInsured.map((amount) => (
                    <SelectItem key={amount} value={amount}>
                      {amount}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value={product.sumInsured}>{product.sumInsured}</SelectItem>
                )}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium mb-2 block">Calculated Premium</Label>
        <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-md">
          <span>₹</span>
          <span className="font-semibold">{customPremium.toLocaleString("en-IN")}</span>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button onClick={onClose} variant="outline" className="flex-1">
          Cancel
        </Button>
        <Button
          onClick={() => onSave(useCustom ? customSumInsured : selectedSumInsured, customPremium)}
          className="flex-1"
        >
          Save Changes
        </Button>
      </div>
    </div>
  )
}

export function CustomerConfirmationStep() {
  const { state, setCurrentStep, addSelectedProduct, removeSelectedProduct, updateProductConfig, updateInsuranceProposal } = useJourney()
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [confirmedAccuracy, setConfirmedAccuracy] = useState(false)
  const [consentHealthy, setConsentHealthy] = useState(false)
  const [consentShareDetails, setConsentShareDetails] = useState(false)
  const [consentDeductPremium, setConsentDeductPremium] = useState(false)
  const [showAllProducts, setShowAllProducts] = useState(false)
  const [isEditingDetails, setIsEditingDetails] = useState(false)
  const [editingProduct, setEditingProduct] = useState<InsuranceProductData | null>(null)
  const [editedDetails, setEditedDetails] = useState(state.insuranceProposal)

  const handleConfirm = () => {
    if (agreedToTerms && confirmedAccuracy && consentHealthy && consentShareDetails && consentDeductPremium) {
      setCurrentStep(7) // Go to OTP verification (customer side)
    }
  }

  const canConfirm = agreedToTerms && confirmedAccuracy && consentHealthy && consentShareDetails && consentDeductPremium

  const handleEditProduct = (item: typeof state.selectedInsuranceProducts[0]) => {
    setEditingProduct(item.product)
  }

  const handleSaveProductEdit = (sumInsured: string, premium: number) => {
    if (editingProduct) {
      updateProductConfig(editingProduct.insurerId, sumInsured, premium)
      setEditingProduct(null)
    }
  }

  const handleSelectProductInModal = (product: InsuranceProductData) => {
    const isAlreadySelected = state.selectedInsuranceProducts.some(
      (p) => p.product.insurerId === product.insurerId
    )
    const totalSelected = state.selectedInsuranceProducts.length
    if (isAlreadySelected) {
      if (totalSelected > 1) removeSelectedProduct(product.insurerId)
    } else {
      // One product per category: remove existing selection in this category, then add new one
      const existingInCategory = state.selectedInsuranceProducts.find(
        (p) => p.product.productType === product.productType
      )
      if (existingInCategory) removeSelectedProduct(existingInCategory.product.insurerId)
      const sumInsuredToUse = product.availableSumInsured?.[0] || product.sumInsured
      addSelectedProduct(product, sumInsuredToUse)
    }
  }

  const handleRemoveProduct = (insurerId: string) => {
    removeSelectedProduct(insurerId)
  }

  const handleSaveDetails = () => {
    updateInsuranceProposal(editedDetails)
    setIsEditingDetails(false)
  }

  const handleDetailChange = (field: string, value: string | boolean) => {
    setEditedDetails((prev) => ({ ...prev, [field]: value }))
  }

  const handleMedicalConditionToggle = (condition: string) => {
    setEditedDetails((prev) => {
      const current = prev.selectedMedicalConditions || []
      const updated = current.includes(condition)
        ? current.filter((c) => c !== condition)
        : [...current, condition]
      return { ...prev, selectedMedicalConditions: updated }
    })
  }

  const totalProducts = state.selectedInsuranceProducts?.length || 0
  const totalPremium = state.selectedInsuranceProducts?.reduce((sum, item) => sum + item.calculatedPremium, 0) || 0
  const selectedIds = new Set(state.selectedInsuranceProducts.map((p) => p.product.insurerId))

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
            <CardTitle className="text-2xl">Welcome, {state.loanApplication.fullName || "Customer"}!</CardTitle>
            <CardDescription className="text-base mt-2">
              Please review and confirm the third-party products selected with your education loan application
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
                  ₹{Number(state.loanApplication.loanAmount || 0).toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            <Separator />

            {/* Additional Details with Edit */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">Additional Information</h3>
                {!isEditingDetails ? (
                  <Button variant="ghost" size="sm" onClick={() => setIsEditingDetails(true)} className="h-7 text-xs">
                    <Edit2 className="size-3 mr-1" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setIsEditingDetails(false)} className="h-7 text-xs">
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSaveDetails} className="h-7 text-xs">
                      Save
                    </Button>
                  </div>
                )}
              </div>
              {isEditingDetails ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-gender">Gender</Label>
                    <Select
                      value={editedDetails.gender || ""}
                      onValueChange={(value) => handleDetailChange("gender", value)}
                    >
                      <SelectTrigger id="edit-gender">
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
                    <Label htmlFor="edit-nomineeName">Nominee Name</Label>
                    <Input
                      id="edit-nomineeName"
                      value={editedDetails.nomineeName || ""}
                      onChange={(e) => handleDetailChange("nomineeName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-nomineeRelationship">Nominee Relationship</Label>
                    <Select
                      value={editedDetails.nomineeRelationship || ""}
                      onValueChange={(value) => handleDetailChange("nomineeRelationship", value)}
                    >
                      <SelectTrigger id="edit-nomineeRelationship">
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
                  <div className="space-y-2">
                    <Label htmlFor="edit-occupation">Occupation</Label>
                    <Input
                      id="edit-occupation"
                      value={editedDetails.occupation || ""}
                      onChange={(e) => handleDetailChange("occupation", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-height">Height (cm)</Label>
                    <Input
                      id="edit-height"
                      type="number"
                      value={editedDetails.height || ""}
                      onChange={(e) => handleDetailChange("height", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-weight">Weight (kg)</Label>
                    <Input
                      id="edit-weight"
                      type="number"
                      value={editedDetails.weight || ""}
                      onChange={(e) => handleDetailChange("weight", e.target.value)}
                    />
                  </div>
                </div>
              ) : (
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
                  {state.insuranceProposal.height && (
                    <div className="flex justify-between p-2 rounded bg-muted/30">
                      <span className="text-muted-foreground">Height:</span>
                      <span className="font-medium">{state.insuranceProposal.height} cm</span>
                    </div>
                  )}
                  {state.insuranceProposal.weight && (
                    <div className="flex justify-between p-2 rounded bg-muted/30">
                      <span className="text-muted-foreground">Weight:</span>
                      <span className="font-medium">{state.insuranceProposal.weight} kg</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Medical Questionnaire */}
            {(state.insuranceProposal.hasPreexistingDiseases !== undefined || isEditingDetails) && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-semibold text-sm mb-3">Medical Information</h4>
                {isEditingDetails ? (
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Do you have any pre-existing medical conditions?</Label>
                    <RadioGroup
                      value={editedDetails.hasPreexistingDiseases ? "yes" : "no"}
                      onValueChange={(value) => handleDetailChange("hasPreexistingDiseases", value === "yes")}
                      className="flex gap-6 pt-2"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="no" id="edit-medical-no" />
                        <Label htmlFor="edit-medical-no" className="cursor-pointer font-normal text-sm">No</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="yes" id="edit-medical-yes" />
                        <Label htmlFor="edit-medical-yes" className="cursor-pointer font-normal text-sm">Yes</Label>
                      </div>
                    </RadioGroup>
                    {(editedDetails.hasPreexistingDiseases || state.insuranceProposal.hasPreexistingDiseases) && (
                      <div className="p-3 rounded-lg border bg-muted/30 space-y-2">
                        <Label className="text-xs font-medium">Selected Conditions:</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {medicalConditions.map((condition) => (
                            <div key={condition} className="flex items-center gap-2">
                              <Checkbox
                                id={`edit-condition-${condition}`}
                                checked={(editedDetails.selectedMedicalConditions || []).includes(condition)}
                                onCheckedChange={() => handleMedicalConditionToggle(condition)}
                              />
                              <Label htmlFor={`edit-condition-${condition}`} className="cursor-pointer text-xs">
                                {condition}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 rounded bg-muted/30">
                      <span className="text-muted-foreground">Pre-existing Conditions:</span>
                      <span className="font-medium">
                        {state.insuranceProposal.hasPreexistingDiseases ? "Yes" : "No"}
                      </span>
                    </div>
                    {state.insuranceProposal.hasPreexistingDiseases &&
                      state.insuranceProposal.selectedMedicalConditions &&
                      state.insuranceProposal.selectedMedicalConditions.length > 0 && (
                        <div className="p-2 rounded bg-muted/30">
                          <span className="text-muted-foreground text-xs">Conditions: </span>
                          <span className="font-medium text-xs">
                            {state.insuranceProposal.selectedMedicalConditions.join(", ")}
                          </span>
                        </div>
                      )}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Selected Products */}
        <Card className="mb-6">
          <CardHeader>
            <div>
              <CardTitle className="flex items-center gap-2">
                <PackageIcon className="size-5" />
                Selected Third-Party Products ({totalProducts})
              </CardTitle>
              <CardDescription>
                Review the insurance and VAS products selected for your application
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {state.selectedInsuranceProducts && state.selectedInsuranceProducts.length > 0 ? (
              <>
                <div className="space-y-3">
                  {state.selectedInsuranceProducts.map((item, index) => (
                    <div
                      key={item.product.insurerId}
                      className="border rounded-lg p-4 bg-card transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <Image
                          src={companyLogos[item.product.companyCategory] || "/placeholder-logo.png"}
                          alt={item.product.insurerName}
                          width={48}
                          height={48}
                          className="h-12 w-12 object-contain rounded shrink-0"
                        />
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1 space-y-3">
                          <div>
                            <h3 className="font-semibold text-lg text-foreground">{item.product.productName}</h3>
                            <p className="text-sm text-muted-foreground">{item.product.insurerName}</p>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                            <div className="p-2 rounded bg-muted/50">
                              <p className="text-xs text-muted-foreground">Sum Insured</p>
                              <p className="font-semibold text-foreground">{item.selectedSumInsured}</p>
                            </div>
                            {item.product.productTenure && (
                              <div className="p-2 rounded bg-muted/50">
                                <p className="text-xs text-muted-foreground">Tenure</p>
                                <p className="font-semibold text-foreground">{item.product.productTenure}</p>
                              </div>
                            )}
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
                          <div className="pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditProduct(item)}
                              className="text-xs h-7"
                            >
                              <Edit2 className="size-3 mr-1" />
                              Edit
                            </Button>
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

        {/* All Products List - Expanded by default, two columns */}
        <Card className="mb-6 border-dashed">
          <Accordion type="single" collapsible defaultValue="all-products">
            <AccordionItem value="all-products" className="border-none">
              <AccordionTrigger className="py-3 px-4 text-sm text-muted-foreground hover:no-underline">
                <span className="text-xs">View all available products ({insuranceProducts.length})</span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-4">
                  {CATEGORY_ORDER.map((category) => {
                    const productsInCategory = groupProductsByCategory(insuranceProducts)[category]
                    if (!productsInCategory?.length) return null
                    return (
                      <div key={category}>
                        <p className="text-xs font-semibold text-muted-foreground mb-2">{productTypeLabels[category]}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {productsInCategory.map((product) => {
                            const isSelected = selectedIds.has(product.insurerId)
                            const canDeselect = isSelected && state.selectedInsuranceProducts.length > 1
                            const isClickable = !isSelected || canDeselect
                            return (
                              <div
                                key={product.insurerId}
                                role={isClickable ? "button" : undefined}
                                tabIndex={isClickable ? 0 : undefined}
                                onClick={isClickable ? () => handleSelectProductInModal(product) : undefined}
                                onKeyDown={isClickable ? (e) => e.key === "Enter" && handleSelectProductInModal(product) : undefined}
                                className={`flex items-center justify-between p-2 rounded text-xs ${
                                  isSelected ? "bg-primary/10 border border-primary/20" : "bg-muted/30"
                                } ${isClickable ? "cursor-pointer hover:opacity-90" : ""}`}
                              >
                                <div className="flex-1 min-w-0">
                                  <span className="font-medium">{product.productName}</span>
                                  <span className="text-muted-foreground ml-2">- {product.insurerName}</span>
                                  {isSelected && canDeselect && (
                                    <p className="text-muted-foreground mt-0.5">Click to remove</p>
                                  )}
                                </div>
                                {isSelected && (
                                  <Badge variant="outline" className="text-xs shrink-0">
                                    Selected
                                  </Badge>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

        {/* Edit Product Modal (for editing sum insured - kept for potential future use) */}
        {editingProduct && (
          <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Edit {editingProduct.productName}</DialogTitle>
              </DialogHeader>
              <EditProductModalContent
                product={editingProduct}
                currentSumInsured={
                  state.selectedInsuranceProducts.find((p) => p.product.insurerId === editingProduct.insurerId)
                    ?.selectedSumInsured || editingProduct.sumInsured
                }
                onSave={handleSaveProductEdit}
                onClose={() => setEditingProduct(null)}
              />
            </DialogContent>
          </Dialog>
        )}

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
                <p className="font-medium">I confirm the accuracy of all information provided</p>
                <p className="text-sm text-muted-foreground mt-1">I have reviewed all application details and product information.</p>
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
                <p className="font-medium">I agree to the Terms & Conditions</p>
                <p className="text-sm text-muted-foreground mt-1">I authorize the processing of my application for the selected products.</p>
              </Label>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg border hover:bg-muted/30 transition-colors">
              <Checkbox
                id="consent-healthy"
                checked={consentHealthy}
                onCheckedChange={(checked) => setConsentHealthy(checked as boolean)}
                className="mt-1"
              />
              <Label htmlFor="consent-healthy" className="cursor-pointer flex-1">
                <p className="font-medium">
                  {(isEditingDetails ? editedDetails.hasPreexistingDiseases : state.insuranceProposal.hasPreexistingDiseases)
                    ? "I confirm that I have declared my pre-existing disease(s) and the details provided are accurate"
                    : "I confirm that I am healthy and do not have any pre-existing disease"}
                </p>
              </Label>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg border hover:bg-muted/30 transition-colors">
              <Checkbox
                id="consent-share"
                checked={consentShareDetails}
                onCheckedChange={(checked) => setConsentShareDetails(checked as boolean)}
                className="mt-1"
              />
              <Label htmlFor="consent-share" className="cursor-pointer flex-1">
                <p className="font-medium">I allow Avanse to share my personal details to third party for issuing these additional products</p>
              </Label>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg border hover:bg-muted/30 transition-colors">
              <Checkbox
                id="consent-deduct"
                checked={consentDeductPremium}
                onCheckedChange={(checked) => setConsentDeductPremium(checked as boolean)}
                className="mt-1"
              />
              <Label htmlFor="consent-deduct" className="cursor-pointer flex-1">
                <p className="font-medium">I allow Avanse to deduct the premium of these products from my funded amount</p>
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Action Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleConfirm}
            size="lg"
            disabled={!canConfirm}
            className="min-w-[300px] text-base gap-2"
          >
            <CheckCircleIcon className="size-5" />
            Confirm & Proceed to Verification
          </Button>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>Next step: You will receive an OTP for identity verification before final submission.</p>
        </div>
      </main>
    </div>
  )
}
