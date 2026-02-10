"use client"

import { useState } from "react"
import { useJourney, type InsuranceProductData } from "@/lib/journey-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { IndianRupeeIcon, ArrowLeftIcon, Edit2Icon, Trash2Icon, CheckIcon } from "lucide-react"

function EditProductModal({
  product,
  isOpen,
  onClose,
  onSave,
}: {
  product: InsuranceProductData
  isOpen: boolean
  onClose: () => void
  onSave: (sumInsured: string, premium: number) => void
}) {
  const [selectedSumInsured, setSelectedSumInsured] = useState(product.availableSumInsured?.[0] || product.sumInsured)
  const premiumAmount = product.productAmount || product.annualPremium || "₹0"
  const [customPremium, setCustomPremium] = useState(Number.parseFloat(premiumAmount.replace(/[₹,\s]/g, "") || "0"))

  const handleCalculatePremium = (sumInsuredValue: string) => {
    const basePremium = Number.parseFloat(premiumAmount.replace(/[₹,\s]/g, "") || "0")
    const sumInsuredNum = Number.parseFloat(product.sumInsured.replace(/[₹,\s]/g, "") || "0")
    const selectedNum = Number.parseFloat(sumInsuredValue.replace(/[₹,\s]/g, "") || "0")
    const multiplier = sumInsuredNum > 0 ? selectedNum / sumInsuredNum : 1
    setCustomPremium(Math.round(basePremium * multiplier * 10) / 10)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-lg">Edit {product.productName}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">Sum Insured</Label>
            <select
              value={selectedSumInsured}
              onChange={(e) => {
                setSelectedSumInsured(e.target.value)
                handleCalculatePremium(e.target.value)
              }}
              className="w-full px-3 py-2 border rounded-md text-sm"
            >
              {product.availableSumInsured.map((amount) => (
                <option key={amount} value={amount}>
                  {amount}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Calculated Premium</Label>
            <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-md">
              <IndianRupeeIcon className="size-4" />
              <span className="font-semibold">{customPremium.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button onClick={() => onSave(selectedSumInsured, customPremium)} className="flex-1">
              <CheckIcon className="size-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const productTypeLabels: Record<string, string> = {
  vas: "VAS – Health Insurance",
  travel: "Travel Insurance",
  creditlife: "MRTA / Credit Life Insurance",
  health: "Health Insurance",
}

export function InsuranceSummaryStep() {
  const { state, setCurrentStep, removeSelectedProduct, updateProductConfig } = useJourney()
  const [editingProduct, setEditingProduct] = useState<InsuranceProductData | null>(null)

  const totalPremium = state.selectedInsuranceProducts.reduce((sum, p) => sum + p.calculatedPremium, 0)

  const handleEditProduct = (product: InsuranceProductData, sumInsured: string, premium: number) => {
    updateProductConfig(product.insurerId, sumInsured, premium)
    setEditingProduct(null)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Button onClick={() => setCurrentStep(2)} variant="outline" size="sm" className="mb-4">
        <ArrowLeftIcon className="size-4 mr-2" />
        Back to Plans
      </Button>

      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Selected Products Summary</h2>
          <p className="text-muted-foreground mt-2">
            Review and edit your selected insurance products before proceeding
          </p>
        </div>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Annual Premium</p>
                <p className="text-3xl font-bold text-foreground mt-1">₹{totalPremium.toLocaleString("en-IN")}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Products Selected</p>
                <p className="text-3xl font-bold text-primary mt-1">{state.selectedInsuranceProducts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {state.selectedInsuranceProducts.map((item) => (
            <Card key={item.product.insurerId} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{productTypeLabels[item.product.productType]}</Badge>
                      <span className="text-xs text-muted-foreground">{item.product.insurerName}</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-3">{item.product.productName}</h3>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Sum Insured</p>
                        <p className="font-semibold text-foreground">{item.selectedSumInsured}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Annual Premium</p>
                        <p className="font-semibold text-primary">₹{item.calculatedPremium.toLocaleString("en-IN")}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 bg-muted/50 p-3 rounded-md mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Base Premium</p>
                        <p className="font-semibold text-foreground">₹{item.basePremium.toLocaleString("en-IN")}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">GST (18%)</p>
                        <p className="font-semibold text-foreground">₹{item.gst.toLocaleString("en-IN")}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Total Premium</p>
                        <p className="font-semibold text-primary">₹{item.calculatedPremium.toLocaleString("en-IN")}</p>
                      </div>
                    </div>

                    {item.product.keyBenefits && item.product.keyBenefits.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-foreground mb-2">Key Benefits</p>
                        <ul className="flex flex-wrap gap-2">
                          {item.product.keyBenefits.map((benefit, idx) => (
                            <li key={idx} className="text-xs bg-muted px-2 py-1 rounded">
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => setEditingProduct(item.product)}
                      size="sm"
                      variant="outline"
                      className="gap-1"
                    >
                      <Edit2Icon className="size-4" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => removeSelectedProduct(item.product.insurerId)}
                      size="sm"
                      variant="outline"
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2Icon className="size-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={() => setCurrentStep(4)} size="lg">
            Proceed to Proposal
          </Button>
        </div>
      </div>

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          isOpen={!!editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={(sumInsured, premium) => handleEditProduct(editingProduct, sumInsured, premium)}
        />
      )}
    </div>
  )
}
