"use client"

import { useJourney } from "@/lib/journey-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircleIcon, Plus } from "lucide-react"
import { insuranceProducts } from "@/lib/insurance-data"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

const companyLogos: Record<string, string> = {
  "bajaj-general": "/bajaj-general-logo.png",
  "bajaj-life": "/bajaj-life-logo.avif",
  "bajaj-finserv-health": "/bajaj-health-logo.png",
  "health-assure": "/health-assure-logo.png",
  "icici": "/icici-lombard-logo.png",
  "max-life": "/max-life-logo.png",
  "hdfc-life": "/hdfc-life-logo.png",
  "care-health": "/care-health-logo.png",
  "zuno": "/zuno-logo.png",
  "new-life": "/placeholder-logo.png",
}

const productTypeLabels: Record<string, string> = {
  vas: "VAS – Health Insurance",
  travel: "Travel Insurance",
  creditlife: "MRTA / Credit Life Insurance",
  health: "Health Insurance",
}

export function InsuranceDecisionConfirmationStep() {
  const { state, addSelectedProduct, setCurrentStep } = useJourney()
  const [selectedProducts, setSelectedProducts] = useState(new Set<string>())
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const handleSelectProduct = (productId: string) => {
    const newSelected = new Set(selectedProducts)
    if (newSelected.has(productId)) {
      newSelected.delete(productId)
    } else {
      newSelected.add(productId)
    }
    setSelectedProducts(newSelected)
  }

  const handleProceed = () => {
    // Add each selected product to the journey state
    selectedProducts.forEach((productId) => {
      const product = insuranceProducts.find((p) => p.insurerId === productId)
      if (product) {
        addSelectedProduct(product, product.sumInsured)
      }
    })
    
    if (selectedProducts.size > 0) {
      setCurrentStep(3) // Go to Plans step for selected products
    } else {
      setCurrentStep(6) // Skip to Success if no products selected
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <Card className="mb-6">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircleIcon className="size-12 text-success" />
          </div>
          <CardTitle className="text-2xl text-balance">Congratulations!</CardTitle>
          <CardDescription className="text-base">
            Loan Details Captured Successfully. Please select VAS and / or Insurance Product.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Loan Summary */}
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold text-foreground mb-3">Your Loan Application</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Application ID</p>
                <p className="font-semibold text-foreground">{state.losId}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Loan Amount</p>
                <p className="font-semibold text-foreground">₹{state.loanApplication.loanAmount}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Applicant</p>
                <p className="font-semibold text-foreground">{state.loanApplication.fullName}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Selected Products</p>
                <p className="font-semibold text-foreground">{selectedProducts.size}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">Filter by Category</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => setActiveFilter(null)}
            variant={activeFilter === null ? "default" : "outline"}
            size="sm"
            className="bg-transparent"
          >
            All Categories
          </Button>
          {["vas", "travel", "creditlife", "health"].map((category) => (
            <Button
              key={category}
              onClick={() => setActiveFilter(category)}
              variant={activeFilter === category ? "default" : "outline"}
              size="sm"
              className="bg-transparent"
            >
              {productTypeLabels[category as keyof typeof productTypeLabels]}
            </Button>
          ))}
        </div>
      </div>

      {/* Product Categories */}
      <div className="space-y-8">
        {["vas", "travel", "creditlife", "health"].map((category) => {
          const categoryProducts = insuranceProducts.filter((p) => p.productType === category)
          
          // Skip if filter is active and doesn't match
          if (activeFilter !== null && activeFilter !== category) {
            return null
          }

          return (
            <div key={category}>
              <h2 className="text-lg font-bold text-foreground mb-4">{productTypeLabels[category as keyof typeof productTypeLabels]}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryProducts.map((product) => {
                  const isSelected = selectedProducts.has(product.insurerId)
                  return (
                    <Card key={product.insurerId} className={`flex flex-col transition-all border ${isSelected ? "ring-2 ring-primary" : ""}`}>
                      <CardHeader className="pb-3 border-b">
                        <div className="flex items-center gap-2 mb-2">
                          <Image
                            src={companyLogos[product.companyCategory] || "/placeholder.svg"}
                            alt={product.insurerName}
                            width={24}
                            height={24}
                            className="h-auto w-6"
                          />
                          <CardTitle className="text-sm font-semibold">{product.productName}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1 p-4 space-y-3">
                        {/* Sum Insured */}
                        <div className="border-b pb-3">
                          <p className="text-xs text-muted-foreground mb-1">Sum Insured</p>
                          <p className="text-base font-bold text-primary">{product.sumInsured}</p>
                        </div>

                        {/* Cover (for travel insurance) */}
                        {product.cover && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Cover</span>
                            <span className="font-medium text-primary underline">{product.cover}</span>
                          </div>
                        )}

                        {/* Product Amount */}
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Product Amount</span>
                          <span className="font-semibold">{product.productAmount}</span>
                        </div>

                        {/* Product Tenure */}
                        {product.productTenure && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Product Tenure</span>
                            <span className="font-semibold">{product.productTenure}</span>
                          </div>
                        )}

                        {/* Key Benefits */}
                        <div className="pt-2 border-t">
                          <p className="text-xs font-bold text-foreground mb-2">Key Benefits</p>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            {product.keyBenefits.slice(0, 4).map((benefit, idx) => (
                              <li key={idx} className="flex gap-1.5">
                                <span className="text-primary font-bold shrink-0">•</span>
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                      <div className="p-3 border-t">
                        <Button
                          onClick={() => handleSelectProduct(product.insurerId)}
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          className="w-full"
                        >
                          <Plus className="size-3.5 mr-1.5" />
                          {isSelected ? "Selected" : "Select"}
                        </Button>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Proceed Button */}
      <div className="flex justify-center gap-4 mt-8 mb-6">
        <Button onClick={handleProceed} size="lg">
          Proceed to {selectedProducts.size > 0 ? "Plan Details" : "Disbursement"}
        </Button>
      </div>
    </div>
  )
}
