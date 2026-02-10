"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { InsuranceProposalData } from "./insurance-proposal-data" // Assuming InsuranceProposalData is declared in another file

export interface LoanApplicationData {
  fullName: string
  parentName?: string
  dateOfBirth?: string
  mobile: string
  email: string
  pan?: string
  aadhaar?: string
  currentAddress: string
  city: string
  state: string
  pincode: string
  loanAmount: string
  loanTenure?: string
  educationType?: string
  moratorium?: string
  propertyType?: string
  employmentType?: string
  monthlyIncome?: string
}

export interface InsuranceProductData {
  insurerId: string
  productName: string
  insurerName: string
  productType: "vas" | "travel" | "creditlife" | "health"
  companyCategory: "bajaj-general" | "bajaj-life" | "bajaj-finserv-health" | "icici" | "max-life" | "new-life"
  sumInsured: string
  availableSumInsured?: string[]
  productAmount: string
  annualPremium?: string
  chargeCode: string
  keyBenefits: string[]
  cover?: string
  productTenure?: string
  networkHospitals?: number
  insurerLogo?: string
}

export interface SelectedProductConfig {
  product: InsuranceProductData
  selectedSumInsured: string
  basePremium: number
  gst: number
  calculatedPremium: number
  chargeCode: string
  additionalOptions?: Record<string, string>
}

export interface JourneyState {
  losId: string | null
  loanApplication: Partial<LoanApplicationData>
  wantsInsurance: boolean | null
  selectedInsurance: InsuranceProductData | null
  selectedInsuranceProducts: SelectedProductConfig[]
  insuranceProposal: Partial<InsuranceProposalData>
  otpVerified: boolean
  policyNumber: string | null
  currentStep: number
}

interface JourneyContextType {
  state: JourneyState
  updateLoanApplication: (data: Partial<LoanApplicationData>) => void
  setWantsInsurance: (wants: boolean) => void
  selectInsurance: (product: InsuranceProductData) => void
  addSelectedProduct: (product: InsuranceProductData, sumInsured: string) => void
  removeSelectedProduct: (insurerId: string) => void
  updateProductConfig: (insurerId: string, sumInsured: string, premium: number) => void
  updateInsuranceProposal: (data: Partial<InsuranceProposalData>) => void
  generateLosId: () => void
  verifyOtp: () => void
  generatePolicyNumber: () => void
  setCurrentStep: (step: number) => void
  resetJourney: () => void
}

const JourneyContext = createContext<JourneyContextType | undefined>(undefined)

const initialState: JourneyState = {
  losId: null,
  loanApplication: {},
  wantsInsurance: null,
  selectedInsurance: null,
  selectedInsuranceProducts: [],
  insuranceProposal: {},
  otpVerified: false,
  policyNumber: null,
  currentStep: 1,
}

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<JourneyState>(initialState)

  const updateLoanApplication = (data: Partial<LoanApplicationData>) => {
    setState((prev) => ({
      ...prev,
      loanApplication: { ...prev.loanApplication, ...data },
    }))
  }

  const setWantsInsurance = (wants: boolean) => {
    setState((prev) => ({ ...prev, wantsInsurance: wants }))
  }

  const selectInsurance = (product: InsuranceProductData) => {
    setState((prev) => ({ ...prev, selectedInsurance: product }))
  }

  const addSelectedProduct = (product: InsuranceProductData, sumInsured: string) => {
    // Get premium from productAmount first, then annualPremium, default to "₹0" if neither exists
    const premiumAmount = product.productAmount || product.annualPremium || "₹0"
    
    // Handle case where premiumAmount might be undefined or empty
    if (!premiumAmount || premiumAmount === "₹0") {
      console.warn(`Product premium not found for ${product.productName}, using default ₹0`)
    }
    
    // Safely parse the premium amount, defaulting to 0 if parsing fails
    const basePremium = Number.parseFloat(premiumAmount.replace(/[₹,\s]/g, "")) || 0
    const gst = Math.round(basePremium * 0.18 * 10) / 10
    const total = basePremium + gst
    
    setState((prev) => ({
      ...prev,
      selectedInsuranceProducts: [
        ...prev.selectedInsuranceProducts,
        {
          product,
          selectedSumInsured: sumInsured,
          basePremium,
          gst,
          calculatedPremium: total,
          chargeCode: product.chargeCode,
        },
      ],
    }))
  }

  const removeSelectedProduct = (insurerId: string) => {
    setState((prev) => ({
      ...prev,
      selectedInsuranceProducts: prev.selectedInsuranceProducts.filter((p) => p.product.insurerId !== insurerId),
    }))
  }

  const updateProductConfig = (insurerId: string, sumInsured: string, premium: number) => {
    setState((prev) => ({
      ...prev,
      selectedInsuranceProducts: prev.selectedInsuranceProducts.map((p) =>
        p.product.insurerId === insurerId
          ? {
              ...p,
              selectedSumInsured: sumInsured,
              basePremium: premium,
              gst: Math.round(premium * 0.18 * 10) / 10,
              calculatedPremium: premium + Math.round(premium * 0.18 * 10) / 10,
            }
          : p,
      ),
    }))
  }

  const updateInsuranceProposal = (data: Partial<InsuranceProposalData>) => {
    setState((prev) => ({
      ...prev,
      insuranceProposal: { ...prev.insuranceProposal, ...data },
    }))
  }

  const generateLosId = () => {
    const randomId = `LOS${Date.now()}${Math.floor(Math.random() * 1000)}`
    setState((prev) => ({ ...prev, losId: randomId }))
  }

  const verifyOtp = () => {
    const randomPolicy = `POL${Date.now()}${Math.floor(Math.random() * 1000)}`
    setState((prev) => ({
      ...prev,
      otpVerified: true,
      policyNumber: randomPolicy,
    }))
  }

  const generatePolicyNumber = () => {
    const randomPolicy = `POL${Date.now()}${Math.floor(Math.random() * 1000)}`
    setState((prev) => ({ ...prev, policyNumber: randomPolicy }))
  }

  const setCurrentStep = (step: number) => {
    setState((prev) => ({ ...prev, currentStep: step }))
  }

  const resetJourney = () => {
    setState(initialState)
  }

  return (
    <JourneyContext.Provider
      value={{
        state,
        updateLoanApplication,
        setWantsInsurance,
        selectInsurance,
        addSelectedProduct,
        removeSelectedProduct,
        updateProductConfig,
        updateInsuranceProposal,
        generateLosId,
        verifyOtp,
        generatePolicyNumber,
        setCurrentStep,
        resetJourney,
      }}
    >
      {children}
    </JourneyContext.Provider>
  )
}

export function useJourney() {
  const context = useContext(JourneyContext)
  if (!context) {
    throw new Error("useJourney must be used within JourneyProvider")
  }
  return context
}
