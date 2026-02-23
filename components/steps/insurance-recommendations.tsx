"use client"

import { useMemo } from "react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, X, Edit2, Trash2, ChevronLeft, ShoppingCart, Plus, ArrowRight } from "lucide-react"
import { insuranceProducts } from "@/lib/insurance-data"
import { useJourney, type InsuranceProductData } from "@/lib/journey-context"
import Image from "next/image"

const productTypeLabels: Record<string, string> = {
  vas: "VAS – Health Insurance",
  travel: "Travel Insurance",
  creditlife: "MRTA / Credit Life Insurance",
  health: "Health Insurance",
}

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
  const [selectedSumInsured, setSelectedSumInsured] = useState(product.sumInsured || "₹0")
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

  const [customPremium, setCustomPremium] = useState(handleCalculatePremium(selectedSumInsured))

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

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-lg">Edit {product.productName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">Sum Insured</Label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="use-custom-sum"
                  checked={useCustom}
                  onCheckedChange={(checked) => {
                    setUseCustom(checked as boolean)
                    if (checked) {
                      setCustomSumInsured("")
                    }
                  }}
                />
                <Label htmlFor="use-custom-sum" className="text-sm cursor-pointer">
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
                <Select
                  value={selectedSumInsured}
                  onValueChange={handleSumInsuredChange}
                >
                  <SelectTrigger className="w-full px-3 py-2 border rounded-md text-sm">
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
            <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              onClick={() => onSave(useCustom ? customSumInsured : selectedSumInsured, customPremium)}
              className="flex-1"
            >
              <span className="size-4 mr-2">✓</span>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ComparisonModal({
  products,
  isOpen,
  onClose,
}: {
  products: InsuranceProductData[]
  isOpen: boolean
  onClose: () => void
}) {
  if (!isOpen || products.length === 0) return null

  const buildComparisonRows = () => {
    const rows: { label: string; values: (string | boolean)[] }[] = []

    rows.push({
      label: "Insurer",
      values: products.map((p) => p.insurerName),
    })

    rows.push({
      label: "Sum Insured",
      values: products.map((p) => p.sumInsured),
    })

    rows.push({
      label: "Product Amount",
      values: products.map((p) => p.productAmount || p.annualPremium || "N/A"),
    })

    if (products.some((p) => p.productType === "health")) {
      rows.push({
        label: "Network Hospitals",
        values: products.map((p) => (p.networkHospitals ? `${p.networkHospitals.toLocaleString()}` : "N/A")),
      })
    }

    if (products.some((p) => p.productTenure)) {
      rows.push({
        label: "Product Tenure",
        values: products.map((p) => p.productTenure || "N/A"),
      })
    }

    return rows
  }

  const comparisonRows = buildComparisonRows()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <DialogHeader className="sticky top-0 bg-white border-b">
          <div className="flex items-center justify-between">
            <DialogTitle>Compare Products</DialogTitle>
            <Button onClick={onClose} variant="ghost" size="sm" className="h-8 w-8 p-0">
              ✕
            </Button>
          </div>
        </DialogHeader>
        <div className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left font-semibold text-xs px-3 py-2 text-foreground">Features</th>
                  {products.map((product) => (
                    <th key={product.insurerId} className="text-center font-semibold text-xs px-3 py-2">
                      <div className="font-medium">{product.productName}</div>
                      <div className="text-xs text-muted-foreground font-normal">{product.insurerName}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="border-b hover:bg-muted/50">
                    <td className="px-3 py-3 font-medium text-foreground text-xs">{row.label}</td>
                    {row.values.map((value, vIdx) => (
                      <td key={vIdx} className="px-3 py-3 text-center text-xs text-foreground">
                        {typeof value === "boolean" ? (
                          value ? (
                            <span className="size-4 text-success mx-auto">✓</span>
                          ) : (
                            <span className="size-4 text-muted-foreground mx-auto">✗</span>
                          )
                        ) : (
                          value
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function SummaryPanel({
  isOpen,
  products,
  totalPremium,
  onProceed,
  onEdit,
  onRemove,
  onClose,
  onOpen,
}: {
  isOpen: boolean
  products: any[]
  totalPremium: number
  onProceed: () => void
  onEdit: (product: any) => void
  onRemove: (insurerId: string) => void
  onClose: () => void
  onOpen: () => void
}) {
  const formatPremium = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(0)}k`
    }
    return `₹${amount}`
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={onClose} />}

      {/* Sliding Panel - No floating bubble */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-out z-40 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="border-b px-4 py-3 bg-background sticky top-0 flex items-center justify-between">
          <h2 className="font-semibold text-base">Summary</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {products.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">No products selected yet</p>
            </div>
          ) : (
            products.map((item) => (
              <div key={item.product.insurerId} className="border rounded-lg p-3 bg-muted/30">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm text-foreground truncate">{item.product.productName}</p>
                    <p className="text-xs text-muted-foreground">{item.product.insurerName}</p>
                  </div>
                  <Button
                    onClick={() => onRemove(item.product.insurerId)}
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 text-destructive shrink-0"
                  >
                    <Trash2 className="size-3" />
                  </Button>
                </div>

                <div className="space-y-1 bg-white rounded p-2 text-xs mb-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sum Insured:</span>
                    <span className="font-medium">{item.selectedSumInsured}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Base Premium:</span>
                    <span className="font-medium">₹{item.basePremium.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GST (18%):</span>
                    <span className="font-medium">₹{item.gst.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between border-t pt-1 font-semibold text-primary">
                    <span>Total Premium:</span>
                    <span>₹{item.calculatedPremium.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <Button onClick={() => onEdit(item.product)} size="sm" variant="outline" className="w-full text-xs">
                  <Edit2 className="size-3 mr-1" />
                  Edit
                </Button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {products.length > 0 && (
          <div className="border-t bg-background p-4 space-y-3">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Total Annual Premium</span>
                <span className="text-lg font-bold text-primary">₹{totalPremium.toLocaleString("en-IN")}</span>
              </div>
            </div>
            <Button onClick={onProceed} className="w-full" size="lg">
              Proceed to Application Form
              <ArrowRight className="size-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

export function InsuranceRecommendationsStep() {
  const { state, setCurrentStep, addSelectedProduct, removeSelectedProduct, updateProductConfig } = useJourney()
  const [searchTerm, setSearchTerm] = useState("")
  const [editingProduct, setEditingProduct] = useState(null)
  const [compareProducts, setCompareProducts] = useState(new Set())
  const [showComparison, setShowComparison] = useState(false)
  const [showSummaryPanel, setShowSummaryPanel] = useState(false)
  const selectedIds = new Set(state.selectedInsuranceProducts.map((p) => p.product.insurerId))

  const filteredProducts = useMemo(() => {
    return insuranceProducts.filter((product) => {
      const matchesSearch =
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.insurerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        productTypeLabels[product.productType].toLowerCase().includes(searchTerm.toLowerCase())
      return matchesSearch
    })
  }, [searchTerm])

  const handleSelectProduct = (product: InsuranceProductData) => {
    const existingInCategory = state.selectedInsuranceProducts.find(
      (p) => p.product.productType === product.productType
    )
    if (existingInCategory) removeSelectedProduct(existingInCategory.product.insurerId)
    const sumInsuredToUse = product.availableSumInsured?.[0] || product.sumInsured
    addSelectedProduct(product, sumInsuredToUse)
  }

  const handleEditProduct = (product: InsuranceProductData, sumInsured: string, premium: number) => {
    updateProductConfig(product.insurerId, sumInsured, premium)
    setEditingProduct(null)
  }

  const totalPremium = state.selectedInsuranceProducts.reduce((sum, p) => sum + p.calculatedPremium, 0)

  const categoryOrder: (keyof typeof productTypeLabels)[] = ["vas", "creditlife", "health", "travel"]
  const productsByCategory = useMemo(() => {
    const map: Record<string, typeof insuranceProducts> = { vas: [], creditlife: [], health: [], travel: [] }
    filteredProducts.forEach((p) => {
      if (map[p.productType]) map[p.productType].push(p)
    })
    return map
  }, [filteredProducts])

  return (
    <div className="space-y-6 pb-32">
      <div>
        <Button
          onClick={() => setCurrentStep(2)}
          variant="outline"
          size="sm"
          className="gap-1.5 text-foreground hover:bg-muted transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <ChevronLeft className="size-4" />
          Back to Loan Confirmation
        </Button>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground">
            <Search className="size-4" />
          </span>
          <Input
            placeholder="Search products, insurers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-4 flex-wrap items-center">
          <div className="ml-auto flex gap-2">
            {compareProducts.size > 0 && (
              <Button onClick={() => setShowComparison(true)} variant="outline" size="sm">
                Compare ({compareProducts.size})
              </Button>
            )}
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">You can select only one product per category (VAS, Travel, Credit Life, Health).</p>

      <div className="space-y-8">
        {(categoryOrder.every((c) => !productsByCategory[c]?.length) ? (
          <div className="text-center py-12 text-muted-foreground">No products found matching your search.</div>
        ) : (
          categoryOrder.map((category) => {
          const products = productsByCategory[category]
          if (!products?.length) return null
          return (
            <div key={category}>
              <h2 className="text-lg font-semibold text-foreground mb-4">{productTypeLabels[category]}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => {
                  const isSelected = selectedIds.has(product.insurerId)
                  const isCompared = compareProducts.has(product.insurerId)
                  return (
              <Card key={product.insurerId} className="flex flex-col border border-border hover:shadow-md transition-shadow">
                {/* Compare Checkbox */}
                <div className="absolute top-3 right-3 flex items-center gap-1">
                  <Checkbox
                    id={`compare-${product.insurerId}`}
                    checked={isCompared}
                    onCheckedChange={(checked) => {
                      const newCompare = new Set(compareProducts)
                      if (checked) {
                        newCompare.add(product.insurerId)
                      } else {
                        newCompare.delete(product.insurerId)
                      }
                      setCompareProducts(newCompare)
                    }}
                  />
                  <Label htmlFor={`compare-${product.insurerId}`} className="text-xs cursor-pointer font-normal">
                    Compare
                  </Label>
                </div>

                {/* Header: Company Logo & Product Name */}
                <CardHeader className="pb-4 border-b">
                  <div className="flex items-center gap-3 mb-3">
                    <Image
                      src={companyLogos[product.companyCategory] || "/placeholder.svg"}
                      alt={product.insurerName}
                      width={28}
                      height={28}
                      className="h-auto w-7 object-contain"
                    />
                    <div className="flex-1">
                      <CardTitle className="text-sm font-bold">{product.productName}</CardTitle>
                      <p className="text-xs text-muted-foreground">{product.insurerName}</p>
                    </div>
                  </div>
                </CardHeader>

                {/* Content: Key Metrics */}
                <CardContent className="flex-1 flex flex-col p-4 space-y-4 justify-between">
                  <div className="space-y-4">
                    {/* Sum Insured Section */}
                    <div className="border-b pb-3">
                      <p className="text-xs text-muted-foreground mb-1">Sum Insured</p>
                      <p className="text-lg font-bold text-primary">{product.sumInsured}</p>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Product Amount</span>
                        <span className="font-medium">{product.productAmount}</span>
                      </div>
                      {product.productTenure && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Product Tenure</span>
                          <span className="font-medium">{product.productTenure}</span>
                        </div>
                      )}
                    </div>

                    {/* Key Benefits */}
                    <div className="border-t pt-3">
                      <h4 className="text-xs font-bold text-foreground mb-2">Key Benefits</h4>
                      <ul className="space-y-1.5">
                        {product.keyBenefits.slice(0, 4).map((benefit, idx) => (
                          <li key={idx} className="flex gap-2 text-xs text-muted-foreground">
                            <span className="text-primary font-bold shrink-0">•</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    {!isSelected && (
                      <Button
                        onClick={() => handleSelectProduct(product)}
                        variant="default"
                        size="sm"
                        className="flex-1"
                      >
                        <Plus className="size-3.5 mr-1.5" />
                        Add
                      </Button>
                    )}
                    {isSelected && (
                      <Button onClick={() => setEditingProduct(product)} variant="outline" size="sm" className="flex-1">
                        <Edit2 className="size-3.5 mr-1.5" />
                        Edit
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
                  )
                })}
              </div>
            </div>
          )
        })
        ))}
      </div>

      {/* Compact Review & Proceed Section - Hidden when panel is open */}
      {state.selectedInsuranceProducts.length > 0 && !showSummaryPanel && (
        <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t shadow-lg">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm font-medium">
                    {state.selectedInsuranceProducts.length} Product{state.selectedInsuranceProducts.length > 1 ? "s" : ""} Selected
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Total: <span className="font-semibold text-primary">₹{totalPremium.toLocaleString("en-IN")}</span>
                  </p>
                </div>
                <Button
                  onClick={() => setShowSummaryPanel(true)}
                  size="sm"
                  variant="outline"
                >
                  <ShoppingCart className="size-4 mr-2" />
                  Review
                </Button>
              </div>
              <Button
                onClick={() => {
                  setCurrentStep(4) // Go to Proposal page
                }}
                size="lg"
                className="min-w-[200px]"
              >
                Proceed to Application Form
                <ArrowRight className="size-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          isOpen={!!editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={(sumInsured, premium) => handleEditProduct(editingProduct, sumInsured, premium)}
        />
      )}

      <ComparisonModal
        products={Array.from(compareProducts).map((id) => insuranceProducts.find((p) => p.insurerId === id) || {})}
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
      />

      <SummaryPanel
        isOpen={showSummaryPanel}
        products={state.selectedInsuranceProducts}
        totalPremium={totalPremium}
        onProceed={() => {
          setShowSummaryPanel(false)
          setCurrentStep(4) // Updated from step 3 to 4 (Proposal page)
        }}
        onEdit={(product) => {
          setEditingProduct(product)
        }}
        onRemove={(insurerId) => {
          removeSelectedProduct(insurerId)
        }}
        onClose={() => setShowSummaryPanel(false)}
        onOpen={() => setShowSummaryPanel(true)}
      />
    </div>
  )
}
