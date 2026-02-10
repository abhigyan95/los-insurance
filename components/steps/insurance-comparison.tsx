"use client"

import { useJourney } from "@/lib/journey-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckIcon, XIcon, ArrowLeftIcon } from "lucide-react"

// Dummy data for comparison
const mockProducts = [
  {
    id: "ins-001",
    name: "Comprehensive Health Plus",
    insurer: "HealthFirst Insurance",
    sumInsured: "₹10,00,000",
    annualPremium: "₹12,500",
    networkHospitals: 8500,
    roomRentLimit: "No Limit",
    waitingPeriod: "2 years",
    prePostHospitalization: true,
    ambulance: true,
    daycareProcedures: true,
    maternity: false,
  },
  {
    id: "ins-002",
    name: "Premium Shield Pro",
    insurer: "SecureLife Health",
    sumInsured: "₹15,00,000",
    annualPremium: "₹18,750",
    networkHospitals: 10000,
    roomRentLimit: "Single Private AC",
    waitingPeriod: "1 year",
    prePostHospitalization: true,
    ambulance: true,
    daycareProcedures: true,
    maternity: true,
  },
  {
    id: "ins-003",
    name: "Family Health Guard",
    insurer: "WellCare Insurance",
    sumInsured: "₹12,00,000",
    annualPremium: "₹15,200",
    networkHospitals: 9200,
    roomRentLimit: "₹5,000/day",
    waitingPeriod: "18 months",
    prePostHospitalization: true,
    ambulance: true,
    daycareProcedures: false,
    maternity: false,
  },
]

const ComparisonRow = ({ label, values }: { label: string; values: (string | boolean)[] }) => {
  return (
    <div className="grid grid-cols-4 gap-4 py-4 border-b">
      <div className="font-medium text-sm text-foreground">{label}</div>
      {values.map((value, index) => (
        <div key={index} className="text-sm text-center">
          {typeof value === "boolean" ? (
            value ? (
              <CheckIcon className="size-5 text-success mx-auto" />
            ) : (
              <XIcon className="size-5 text-muted-foreground mx-auto" />
            )
          ) : (
            <span className="text-foreground font-medium">{value}</span>
          )}
        </div>
      ))}
    </div>
  )
}

export function InsuranceComparisonStep() {
  const { setCurrentStep } = useJourney()

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground text-balance">Compare Insurance Plans</h2>
        <Button onClick={() => setCurrentStep(1)} variant="outline">
          <ArrowLeftIcon className="size-4" />
          Back to Plans
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header Row */}
              <div className="grid grid-cols-4 gap-4 pb-4 border-b-2">
                <div className="font-semibold text-foreground">Features</div>
                {mockProducts.map((product) => (
                  <div key={product.id} className="text-center">
                    <h3 className="font-semibold text-sm text-foreground text-balance">{product.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{product.insurer}</p>
                  </div>
                ))}
              </div>

              {/* Comparison Rows */}
              <ComparisonRow label="Sum Insured" values={mockProducts.map((p) => p.sumInsured)} />
              <ComparisonRow label="Annual Premium" values={mockProducts.map((p) => p.annualPremium)} />
              <ComparisonRow
                label="Network Hospitals"
                values={mockProducts.map((p) => p.networkHospitals.toLocaleString())}
              />
              <ComparisonRow label="Room Rent Limit" values={mockProducts.map((p) => p.roomRentLimit)} />
              <ComparisonRow label="Waiting Period" values={mockProducts.map((p) => p.waitingPeriod)} />
              <ComparisonRow
                label="Pre & Post Hospitalization"
                values={mockProducts.map((p) => p.prePostHospitalization)}
              />
              <ComparisonRow label="Ambulance Charges" values={mockProducts.map((p) => p.ambulance)} />
              <ComparisonRow label="Daycare Procedures" values={mockProducts.map((p) => p.daycareProcedures)} />
              <ComparisonRow label="Maternity Coverage" values={mockProducts.map((p) => p.maternity)} />
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8 pt-6 border-t">
            {mockProducts.map((product) => (
              <Button key={product.id} onClick={() => setCurrentStep(4)} className="flex-1 max-w-[200px]">
                Select {product.insurer.split(" ")[0]}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
