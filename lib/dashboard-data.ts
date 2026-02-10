export interface Lead {
  id: string
  coveringLoan: string
  fundingLoan: string
  customerName: string
  branch: string
  coveringLoanAmount: number
  totalPremium: number
  policies: Policy[]
  status: "active" | "inactive"
}

export interface Policy {
  id: string
  policyNumber: string
  startDate: string
  proposalNumber: string
  proposer: string
  insurer: string
  product: string
  premium: number
  basePremium: number
  gst: number
  sumInsured: number
  expiryDate: string
  tenure: string
  insurerStatus: "Enforced" | "Pending" | "Cancelled"
  insurerRemarks: string
  email: string
}

export const mockLeads: Lead[] = [
  {
    id: "RSXY12345",
    coveringLoan: "LAN1779498",
    fundingLoan: "IBD00000053258",
    customerName: "Shyam Pushkaran",
    branch: "Koramangala",
    coveringLoanAmount: 4000000,
    totalPremium: 34800,
    status: "active",
    policies: [
      {
        id: "POL1",
        policyNumber: "C195XXXXX",
        startDate: "30 Aug 2022",
        proposalNumber: "759475983",
        proposer: "Jaikirat Singh",
        insurer: "Digit General Insurance",
        product: "Bharat Griha Rai",
        premium: 38499,
        basePremium: 32627,
        gst: 5872,
        sumInsured: 5000000,
        expiryDate: "29 Aug 2023",
        tenure: "1 Year",
        insurerStatus: "Enforced",
        insurerRemarks: "Active",
        email: "xxxxxx@xxxxx.com",
      },
      {
        id: "POL2",
        policyNumber: "C195YYYYY",
        startDate: "30 Aug 2022",
        proposalNumber: "759475984",
        proposer: "Jaikirat Singh",
        insurer: "ICICI Prudential",
        product: "Super Protect Ci",
        premium: 28500,
        basePremium: 24150,
        gst: 4350,
        sumInsured: 2500000,
        expiryDate: "29 Aug 2023",
        tenure: "1 Year",
        insurerStatus: "Enforced",
        insurerRemarks: "Active",
        email: "xxxxxx@xxxxx.com",
      },
    ],
  },
  {
    id: "RSXY12346",
    coveringLoan: "LAN1779499",
    fundingLoan: "IBD00000053821",
    customerName: "Nivedita Pushkaran",
    branch: "Koramangala",
    coveringLoanAmount: 3500000,
    totalPremium: 28900,
    status: "active",
    policies: [
      {
        id: "POL3",
        policyNumber: "C195ZZZZZ",
        startDate: "15 Sep 2022",
        proposalNumber: "759475985",
        proposer: "Jaikirat Singh",
        insurer: "Bajaj General Insurance",
        product: "Health Guard",
        premium: 28900,
        basePremium: 24525,
        gst: 4425,
        sumInsured: 3000000,
        expiryDate: "14 Sep 2023",
        tenure: "1 Year",
        insurerStatus: "Enforced",
        insurerRemarks: "Active",
        email: "xxxxxx@xxxxx.com",
      },
    ],
  },
]

export interface Agent {
  id: string
  name: string
  email: string
  phone: string
  leadsHandled: number
  policiesIssued: number
  conversionRate: number
  branch: string
  status: "active" | "inactive"
}

export const mockAgents: Agent[] = [
  {
    id: "AG001",
    name: "Jaikirat Singh",
    email: "jaikirat@company.com",
    phone: "+91 98765 43210",
    leadsHandled: 156,
    policiesIssued: 89,
    conversionRate: 57,
    branch: "Koramangala",
    status: "active",
  },
  {
    id: "AG002",
    name: "Priya Sharma",
    email: "priya@company.com",
    phone: "+91 97654 32109",
    leadsHandled: 142,
    policiesIssued: 78,
    conversionRate: 55,
    branch: "Whitefield",
    status: "active",
  },
  {
    id: "AG003",
    name: "Amit Kumar",
    email: "amit@company.com",
    phone: "+91 96543 21098",
    leadsHandled: 128,
    policiesIssued: 62,
    conversionRate: 48,
    branch: "MG Road",
    status: "active",
  },
]
