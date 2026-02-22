"use client"

import { useJourney } from "@/lib/journey-context"
import { LoanApplicationStep } from "@/components/steps/loan-application"
import { LoanConfirmationStep } from "@/components/steps/loan-confirmation"
import { InsuranceRecommendationsStep } from "@/components/steps/insurance-recommendations"
import { InsuranceProposalStep } from "@/components/steps/insurance-proposal"
import { SendCustomerLinkStep } from "@/components/steps/send-customer-link"
import { CustomerConfirmationStep } from "@/components/steps/customer-confirmation"
import { OtpVerificationStep } from "@/components/steps/otp-verification"
import { SuccessStep } from "@/components/steps/success"
import Image from "next/image"

export function JourneyFlow() {
  const { state } = useJourney()

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
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Image src="/avanse-logo.png" alt="Avanse Logo" width={120} height={60} className="h-12 w-auto" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Third Party Product Portal</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{renderStep()}</main>
    </div>
  )
}
