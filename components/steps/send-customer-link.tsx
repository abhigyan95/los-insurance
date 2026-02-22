"use client"

import { useState } from "react"
import { useJourney } from "@/lib/journey-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { AlertCircleIcon, CheckCircleIcon, MailIcon, MessageSquareIcon, PhoneIcon, ArrowLeftIcon, SendIcon, CopyIcon, ExternalLinkIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const SAMPLE_MOBILE = "9876543210"
const SAMPLE_EMAIL = "customer@example.com"

export function SendCustomerLinkStep() {
  const { state, setCurrentStep } = useJourney()
  const [sendViaSMS, setSendViaSMS] = useState(true)
  const [sendViaEmail, setSendViaEmail] = useState(true)
  const [sendViaWhatsApp, setSendViaWhatsApp] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [linkSent, setLinkSent] = useState(false)
  const [customerMobile, setCustomerMobile] = useState(state.loanApplication.mobile || SAMPLE_MOBILE)
  const [customerEmail, setCustomerEmail] = useState(state.loanApplication.email || SAMPLE_EMAIL)

  // Generate a dummy customer link
  const customerLink = `https://avanse-portal.com/customer/confirm/${state.losId}`

  const handleSendLink = () => {
    setIsSending(true)
    // Simulate sending link
    setTimeout(() => {
      setIsSending(false)
      setLinkSent(true)
    }, 2000)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(customerLink)
    // Could add a toast notification here
  }

  const handleProceed = () => {
    // In real scenario, this would wait for customer confirmation
    // For now, we'll simulate moving forward after link is sent
    setCurrentStep(6) // Go to Customer Confirmation (simulated)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Button onClick={() => setCurrentStep(4)} variant="outline" size="sm" className="mb-4 shadow-sm hover:shadow-md transition-shadow">
        <ArrowLeftIcon className="size-4 mr-2" />
        Back
      </Button>

      <Card className="shadow-lg border-2">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
          <CardTitle className="text-2xl text-balance font-bold">Send Products Confirmation Link to Customer</CardTitle>
          <CardDescription className="text-base mt-2">
            The customer will receive a link to review and confirm the selected products and application details
          </CardDescription>
          <div className="flex items-start gap-2 mt-4 p-3 rounded-lg bg-accent">
            <AlertCircleIcon className="size-5 text-accent-foreground shrink-0 mt-0.5" />
            <p className="text-sm text-accent-foreground leading-relaxed">
              This step ensures regulatory compliance by allowing the customer to independently review and confirm their product selection.
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Products Table (Avanse LOS style) */}
          {state.selectedInsuranceProducts && state.selectedInsuranceProducts.length > 0 && (
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Product Code</TableHead>
                    <TableHead>Info Captured</TableHead>
                    <TableHead>Premium</TableHead>
                    <TableHead>VAS Reference</TableHead>
                    <TableHead>Added On</TableHead>
                    <TableHead>Added By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {state.selectedInsuranceProducts.map((item, index) => (
                    <TableRow key={item.product.insurerId}>
                      <TableCell className="font-medium">{item.product.productName}</TableCell>
                      <TableCell>{item.product.chargeCode}</TableCell>
                      <TableCell>Completed</TableCell>
                      <TableCell>₹{item.calculatedPremium.toLocaleString("en-IN")}</TableCell>
                      <TableCell>{item.product.chargeCode}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} {new Date().toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true })}
                      </TableCell>
                      <TableCell className="text-muted-foreground">Agent</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Application Summary */}
          <div className="p-4 rounded-lg bg-muted/30 border">
            <h3 className="font-semibold text-foreground mb-3">Application Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground text-xs">Application ID</p>
                <p className="font-semibold text-foreground">{state.losId}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Customer Name</p>
                <p className="font-semibold text-foreground">{state.loanApplication.fullName}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Products Selected</p>
                <p className="font-semibold text-primary">{state.selectedInsuranceProducts?.length || 0}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Total Premium</p>
                <p className="font-semibold text-primary">
                  ₹{(state.selectedInsuranceProducts?.reduce((sum, item) => sum + item.calculatedPremium, 0) || 0).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </div>

          {/* Selected Products List */}
          {state.selectedInsuranceProducts && state.selectedInsuranceProducts.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Products Pending Customer Confirmation</h3>
              <div className="space-y-2">
                {state.selectedInsuranceProducts.map((item, index) => (
                  <div key={item.product.insurerId} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border text-sm">
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-xs">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{item.product.productName}</p>
                      <p className="text-xs text-muted-foreground">{item.product.insurerName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{item.selectedSumInsured}</p>
                      <p className="text-xs text-muted-foreground">Sum Insured</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Customer Contact Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Customer Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerMobile">Registered Mobile Number</Label>
                <div className="relative">
                  <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="customerMobile"
                    value={customerMobile}
                    onChange={(e) => setCustomerMobile(e.target.value)}
                    className="pl-10"
                    readOnly
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerEmail">Registered Email Address</Label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="customerEmail"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="pl-10"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Send Options */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Select Communication Channels</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/30 transition-colors">
                <Checkbox
                  id="sms"
                  checked={sendViaSMS}
                  onCheckedChange={(checked) => setSendViaSMS(checked as boolean)}
                />
                <PhoneIcon className="size-5 text-primary" />
                <Label htmlFor="sms" className="flex-1 cursor-pointer">
                  <p className="font-medium">Send via SMS</p>
                  <p className="text-xs text-muted-foreground">Send confirmation link to mobile number</p>
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/30 transition-colors">
                <Checkbox
                  id="email"
                  checked={sendViaEmail}
                  onCheckedChange={(checked) => setSendViaEmail(checked as boolean)}
                />
                <MailIcon className="size-5 text-primary" />
                <Label htmlFor="email" className="flex-1 cursor-pointer">
                  <p className="font-medium">Send via Email</p>
                  <p className="text-xs text-muted-foreground">Send confirmation link to email address</p>
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/30 transition-colors">
                <Checkbox
                  id="whatsapp"
                  checked={sendViaWhatsApp}
                  onCheckedChange={(checked) => setSendViaWhatsApp(checked as boolean)}
                />
                <MessageSquareIcon className="size-5 text-primary" />
                <Label htmlFor="whatsapp" className="flex-1 cursor-pointer">
                  <p className="font-medium">Send via WhatsApp</p>
                  <p className="text-xs text-muted-foreground">Send confirmation link via WhatsApp</p>
                </Label>
              </div>
            </div>
          </div>

          {/* Generated Link Preview */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Customer Confirmation Link</h3>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted border">
              <ExternalLinkIcon className="size-4 text-muted-foreground shrink-0" />
              <code className="flex-1 text-xs text-foreground truncate">{customerLink}</code>
              <Button onClick={handleCopyLink} size="sm" variant="outline" className="shrink-0">
                <CopyIcon className="size-3 mr-1" />
                Copy
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              This link will allow the customer to review and confirm their product selections and application details.
            </p>
          </div>

          {/* Success Message */}
          {linkSent && (
            <div className="flex items-center gap-3 p-4 rounded-lg bg-success/10 border-2 border-success/20">
              <CheckCircleIcon className="size-6 text-success shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-success">Link Sent Successfully!</p>
                <p className="text-sm text-muted-foreground">
                  The customer will receive the confirmation link via selected channels.
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4">
            {!linkSent ? (
              <Button
                onClick={handleSendLink}
                size="lg"
                disabled={isSending || (!sendViaSMS && !sendViaEmail && !sendViaWhatsApp)}
                className="gap-2"
              >
                <SendIcon className="size-4" />
                {isSending ? "Sending Link..." : "Send Confirmation Link"}
              </Button>
            ) : (
              <>
                <Button onClick={handleSendLink} size="lg" variant="outline" className="gap-2">
                  <SendIcon className="size-4" />
                  Resend Link
                </Button>
                <Button onClick={handleProceed} size="lg" className="gap-2">
                  Continue to Customer View
                  <ArrowLeftIcon className="size-4 rotate-180" />
                </Button>
              </>
            )}
          </div>

          <div className="text-center text-xs text-muted-foreground border-t pt-4">
            <p>
              <strong>Note:</strong> This step is part of the seller portal. No OTP is required at this stage.
              The customer will verify their identity when confirming the products.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
