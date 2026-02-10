"use client"

import { useJourney } from "@/lib/journey-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ShieldCheckIcon, XIcon } from "lucide-react"

export function InsuranceDecisionStep() {
  const { setWantsInsurance, setCurrentStep } = useJourney()

  const handleDecision = (wantsInsurance: boolean) => {
    setWantsInsurance(wantsInsurance)
    if (wantsInsurance) {
      setCurrentStep(3) // Go to insurance recommendations
    } else {
      setCurrentStep(7) // Skip to success
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center size-16 rounded-full bg-accent">
              <ShieldCheckIcon className="size-8 text-accent-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl text-balance">Secure Your Customer with Health Insurance</CardTitle>
          <CardDescription className="text-base leading-relaxed">
            Would you like to protect your customer with comprehensive Health Insurance linked to this Home Loan?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <h4 className="font-medium text-foreground">Why Health Insurance?</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <ShieldCheckIcon className="size-4 mt-0.5 text-success shrink-0" />
                <span>Financial protection against medical emergencies</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheckIcon className="size-4 mt-0.5 text-success shrink-0" />
                <span>Cashless hospitalization at network hospitals</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheckIcon className="size-4 mt-0.5 text-success shrink-0" />
                <span>Tax benefits under Section 80D</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheckIcon className="size-4 mt-0.5 text-success shrink-0" />
                <span>Peace of mind for you and your family</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button onClick={() => handleDecision(true)} size="lg" className="flex-1">
              Yes, Show Insurance Options
            </Button>
            <Button onClick={() => handleDecision(false)} variant="outline" size="lg" className="flex-1">
              <XIcon className="size-4" />
              Skip Insurance
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
