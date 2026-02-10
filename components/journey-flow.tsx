"use client"

import { useJourney } from "@/lib/journey-context"
import { Stepper, type Step } from "@/components/stepper"
import { LoanApplicationStep } from "@/components/steps/loan-application"
import { LoanConfirmationStep } from "@/components/steps/loan-confirmation"
import { InsuranceRecommendationsStep } from "@/components/steps/insurance-recommendations"
import { InsuranceProposalStep } from "@/components/steps/insurance-proposal"
import { SendCustomerLinkStep } from "@/components/steps/send-customer-link"
import { CustomerConfirmationStep } from "@/components/steps/customer-confirmation"
import { OtpVerificationStep } from "@/components/steps/otp-verification"
import { SuccessStep } from "@/components/steps/success"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LayoutDashboardIcon } from "lucide-react"
import Image from "next/image"

const steps: Step[] = [
  { id: 1, name: "Loan Application", description: "Submit Details" },
  { id: 2, name: "Confirmation", description: "Loan Captured" },
  { id: 3, name: "Select Products", description: "Choose Products" },
  { id: 4, name: "Application Form", description: "Complete Details" },
  { id: 5, name: "Send Link", description: "Customer Link" },
  { id: 6, name: "Customer Review", description: "Customer View" },
  { id: 7, name: "Verify", description: "OTP" },
  { id: 8, name: "Complete", description: "Success" },
]

export function JourneyFlow() {
  const { state } = useJourney()

  const skippedSteps = state.wantsInsurance === false ? [3, 4, 5, 6, 7] : []

  const renderStep = () => {
    switch (state.currentStep) {
      case 1:
        return <LoanApplicationStep />
      case 2:
        return <LoanConfirmationStep />
      case 3:
        return <InsuranceRecommendationsStep />
      case 4:
        return <InsuranceProposalStep />
      case 5:
        return <SendCustomerLinkStep />
      case 6:
        return <CustomerConfirmationStep />
      case 7:
        return <OtpVerificationStep />
      case 8:
        return <SuccessStep />
      default:
        return <LoanApplicationStep />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Image src="/avanse-logo.png" alt="Avanse Logo" width={120} height={60} className="h-12 w-auto" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Loan & Insurance Portal</h1>
              <p className="text-sm text-muted-foreground">Agent Dashboard</p>
            </div>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <LayoutDashboardIcon className="size-4" />
              Dashboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Stepper */}
      <div className="container mx-auto px-4 py-8">
        <Stepper steps={steps} currentStep={state.currentStep} skippedSteps={skippedSteps} />
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-12">{renderStep()}</main>
    </div>
  )
}
