export type CompanyCategory =
  | "bajaj-general"
  | "bajaj-life"
  | "bajaj-finserv-health"
  | "health-assure"
  | "icici"
  | "max-life"
  | "hdfc-life"
  | "care-health"
  | "zuno"
  | "new-life"

export interface InsuranceProductData {
  insurerId: string
  productName: string
  insurerName: string
  productType: "vas" | "travel" | "creditlife" | "health"
  companyCategory: CompanyCategory
  sumInsured: string
  availableSumInsured?: string[]
  productAmount: string
  annualPremium?: string
  chargeCode: string
  keyBenefits: string[]
  cover?: string
  productTenure?: string
  networkHospitals?: number
}

export const insuranceProducts: InsuranceProductData[] = [
  // 1. Bajaj Swasthyacare Supreme
  {
    insurerId: "bajaj-vas-swasthyacare",
    productName: "Bajaj Swasthyacare Supreme",
    insurerName: "Bajaj Finserv Health",
    productType: "vas",
    companyCategory: "bajaj-finserv-health",
    chargeCode: "BJ00501",
    sumInsured: "₹30,00,000",
    availableSumInsured: ["₹30,00,000"],
    productAmount: "₹46,784",
    annualPremium: "₹46,784 (Student) / ₹37,100 (Parent)",
    productTenure: "Student – 5 Yr / Parent – 5 Yr",
    keyBenefits: [
      "Complimentary Credit Life insurance cover of ₹30,00,000 sum assured",
      "Wellness benefits worth – ₹1,23,884 Which Includes Below Benefits-",
      "Annual LAB Benefits",
      "Annual OPD benefits",
      "Hospitalization Linked OPD benefits",
      "Free annual health check up",
    ],
  },
  // 2. Health Assure – Sampurna Arogya
  {
    insurerId: "bajaj-vas-health-assure",
    productName: "Health Assure – Sampurna Arogya",
    insurerName: "Health Assure",
    productType: "vas",
    companyCategory: "health-assure",
    chargeCode: "BJ00502",
    sumInsured: "₹30,00,000",
    availableSumInsured: ["₹30,00,000"],
    productAmount: "₹44,499",
    annualPremium: "₹44,499 (Student) / ₹31,582 (Parent)",
    productTenure: "Student – 5 Yr / Parent – 5 Yr",
    keyBenefits: [
      "Complimentary Credit Life insurance cover of ₹30,00,000 sum assured",
      "Wellness benefits worth – ₹76,081 Which Includes Below Benefits-",
      "Annual LAB Benefits",
      "Annual OPD benefits",
      "Free annual health check",
      "LAB & OPD Benefits",
      "Tele & Distant consultations",
    ],
  },
  // 3. Max Life Insurance
  {
    insurerId: "max-life-insurance",
    productName: "Max Life Insurance",
    insurerName: "Max Life Insurance",
    productType: "creditlife",
    companyCategory: "max-life",
    chargeCode: "BJ00701",
    sumInsured: "₹30,00,000",
    availableSumInsured: ["₹30,00,000"],
    productAmount: "₹33,170",
    productTenure: "Applicant – 5 Yr",
    keyBenefits: ["Credit Life Insurance Cover ₹30,00,000 sum assured"],
  },
  // 4. HDFC Life Insurance
  {
    insurerId: "hdfc-life-insurance",
    productName: "HDFC Life Insurance",
    insurerName: "HDFC Life",
    productType: "creditlife",
    companyCategory: "hdfc-life",
    chargeCode: "BJ00702",
    sumInsured: "₹30,00,000",
    availableSumInsured: ["₹30,00,000"],
    productAmount: "₹32,817",
    productTenure: "Applicant – 5 Yr",
    keyBenefits: ["Credit Life Insurance Cover ₹30,00,000 sum assured"],
  },
  // 5. ICICI Lombard Health Shield 360
  {
    insurerId: "icici-health-shield",
    productName: "ICICI Lombard Health Shield 360",
    insurerName: "ICICI Lombard",
    productType: "health",
    companyCategory: "icici",
    chargeCode: "BJ00801",
    sumInsured: "₹5,00,000",
    availableSumInsured: ["₹5,00,000"],
    productAmount: "₹16,048",
    productTenure: "1 Yr",
    keyBenefits: [
      "Hospitalization Expenses",
      "Day Care Procedure",
      "Pre & Post Hospitalization",
      "In Patient Hospitalization",
      "Unlimited Reset Benefit",
      "Dependent Accommodation",
      "Ambulance Cover",
    ],
  },
  // 6. Zuno – Group Health Insurance
  {
    insurerId: "zuno-group-health",
    productName: "Zuno – Group Health Insurance",
    insurerName: "Zuno",
    productType: "health",
    companyCategory: "zuno",
    chargeCode: "BJ00803",
    sumInsured: "₹5,00,000",
    availableSumInsured: ["₹5,00,000"],
    productAmount: "₹12,500",
    productTenure: "1 Yr",
    keyBenefits: [
      "Hospitalization Expenses",
      "Day Care Procedure",
      "Pre & Post Hospitalization",
      "In Patient AYUSH Hospitalization",
      "Unlimited Reset Benefit",
      "Dependent Accommodation",
      "Ambulance Cover",
    ],
  },
  // 7. ZUNO – Overseas Travel Policy
  {
    insurerId: "zuno-travel-policy",
    productName: "ZUNO – Overseas Travel Policy",
    insurerName: "Zuno",
    productType: "travel",
    companyCategory: "zuno",
    chargeCode: "BJ00601",
    sumInsured: "USD 1,00,000",
    availableSumInsured: ["USD 1,00,000"],
    productAmount: "₹48,392",
    cover: "World Wide",
    productTenure: "2 Yr",
    keyBenefits: [
      "Accident & sickness medical expense benefit (A&S ME Benefit)",
      "OPD Cover (Included under A&S ME Benefit)",
      "Emergency medical evacuation",
      "Pre-existing disease coverage in life threatening condition",
      "Sickness & dental relief",
      "Repatriation of remains",
      "Accidental death",
    ],
  },
  // 8. ICICI Lombard - Overseas Travel Policy
  {
    insurerId: "icici-travel-policy",
    productName: "ICICI Lombard - Overseas Travel Policy",
    insurerName: "ICICI Lombard",
    productType: "travel",
    companyCategory: "icici",
    chargeCode: "BJ00602",
    sumInsured: "USD 1,00,000",
    availableSumInsured: ["USD 1,00,000"],
    productAmount: "₹49,360",
    cover: "World Wide",
    productTenure: "2 Yr",
    keyBenefits: [
      "Accident & sickness medical expense benefit (A&S ME Benefit)",
      "OPD Cover (Included under A&S ME Benefit)",
      "Emergency medical evacuation",
      "Pre-existing disease coverage in life threatening condition",
      "Sickness & dental relief",
      "Repatriation of remains",
      "Accidental death",
    ],
  },
  // 9. Care Health – Group Care 360
  {
    insurerId: "care-group-care-360",
    productName: "Care Health – Group Care 360",
    insurerName: "Care Health Insurance",
    productType: "health",
    companyCategory: "care-health",
    chargeCode: "BJ00804",
    sumInsured: "USD 1,00,000",
    availableSumInsured: ["USD 1,00,000"],
    productAmount: "₹45,440",
    productTenure: "1 Yr",
    keyBenefits: [
      "International Student – In Patient Care",
      "Pre Existing Disease Cover in Life threatening",
      "Outpatient Care",
      "Loss of passport",
      "Accidental Death",
    ],
  },
  // 10. Care Health – Group Health Insurance
  {
    insurerId: "care-group-health",
    productName: "Care Health – Group Health Insurance",
    insurerName: "Care Health Insurance",
    productType: "health",
    companyCategory: "care-health",
    chargeCode: "BJ00802",
    sumInsured: "₹5,00,000",
    availableSumInsured: ["₹5,00,000"],
    productAmount: "₹7,808",
    productTenure: "1 Yr",
    keyBenefits: [
      "Hospitalization Expenses",
      "Day Care Procedure",
      "Pre & Post Hospitalization",
      "In Patient AYUSH Hospitalization",
      "Unlimited Reset Benefit",
      "Dependent Accommodation",
    ],
  },
]
