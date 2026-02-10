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
}

export const insuranceProducts: InsuranceProductData[] = [
  // VAS - Health Insurance Products
  {
    insurerId: "bajaj-vas-swasthyacare",
    productName: "Bajaj Swasthyacare Supreme",
    insurerName: "Bajaj Finserv Health",
    productType: "vas",
    companyCategory: "bajaj-finserv-health",
    chargeCode: "BJ00501",
    sumInsured: "₹30,00,000",
    productAmount: "₹45,500",
    keyBenefits: [
      "Health Benefits worth Product amounts",
      "Annual LAB Benefits",
      "Annual OPD benefits",
      "Hospitalization Linked OPD benefits",
      "Free annual health check up",
      "Free Annual Health counseling",
      "Tele & Distant Consultations",
      "10% Network Discounts",
    ],
  },
  {
    insurerId: "bajaj-vas-health-assure",
    productName: "Health Assure – Sampurna Arogya Suraksha",
    insurerName: "Bajaj Finserv Health",
    productType: "vas",
    companyCategory: "bajaj-finserv-health",
    chargeCode: "BJ00502",
    sumInsured: "₹30,00,000",
    productAmount: "₹45,000",
    keyBenefits: [
      "Health Benefits worth Product amounts",
      "Annual LAB Benefits",
      "Annual OPD benefits",
      "Free annual health check",
      "LAB & OPD Benefits",
      "Tele & Distant consultations",
    ],
  },

  // Travel Insurance Products
  {
    insurerId: "zuno-travel-policy",
    productName: "ZUNO – Overseas Travel Policy",
    insurerName: "Bajaj Allianz",
    productType: "travel",
    companyCategory: "bajaj-general",
    chargeCode: "BJ00601",
    sumInsured: "USD 1,00,000",
    productAmount: "₹ 49,360",
    cover: "Worldwide",
    productTenure: "2Yr",
    keyBenefits: [
      "Accident & sickness medical expense benefit (A&S ME Benefit)",
      "OPD Cover (Included under A&S ME Benefit)",
      "Emergency medical evacuation",
      "Pre-existing disease coverage in life-threatening condition",
    ],
  },
  {
    insurerId: "icici-travel-policy",
    productName: "ICICI Lombard – Overseas Travel Policy",
    insurerName: "ICICI Lombard",
    productType: "travel",
    companyCategory: "icici",
    chargeCode: "BJ00602",
    sumInsured: "USD 1,00,000",
    productAmount: "₹ 50,010",
    cover: "Worldwide",
    productTenure: "2Yr",
    keyBenefits: [
      "Accident & sickness medical expense benefit (A&S ME Benefit)",
      "OPD Cover (Included under A&S ME Benefit)",
      "Emergency medical evacuation",
      "Pre-existing disease coverage in life-threatening condition",
    ],
  },

  // Credit Life / MRTA Insurance
  {
    insurerId: "max-life-insurance",
    productName: "Max Life Insurance",
    insurerName: "Max Life Insurance",
    productType: "creditlife",
    companyCategory: "max-life",
    chargeCode: "BJ00701",
    sumInsured: "₹30,00,000",
    productAmount: "₹40,000",
    keyBenefits: [
      "Health Benefits worth Product amounts",
      "Annual LAB Benefits",
      "Annual OPD benefits",
      "Hospitalization Linked OPD benefits",
      "Free annual health check up",
      "Free Annual Health counseling",
      "Teleconsultations",
    ],
  },
  {
    insurerId: "new-life-insurer",
    productName: "New Life Insurer",
    insurerName: "New Life Insurer",
    productType: "creditlife",
    companyCategory: "new-life",
    chargeCode: "BJ00702",
    sumInsured: "₹5,00,000",
    productAmount: "₹16,048",
    keyBenefits: [
      "Health Benefits worth Product amounts",
      "Free annual health check",
    ],
  },

  // Health Insurance Products
  {
    insurerId: "icici-health-shield",
    productName: "ICICI Lombard Health Shield 360",
    insurerName: "ICICI Lombard",
    productType: "health",
    companyCategory: "icici",
    chargeCode: "BJ00801",
    sumInsured: "₹5,00,000",
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
  {
    insurerId: "care-group-care",
    productName: "Care – Group Care 360",
    insurerName: "Care Health Insurance",
    productType: "health",
    companyCategory: "icici",
    chargeCode: "BJ00802",
    sumInsured: "₹5,00,000",
    productAmount: "₹16,048",
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
]
