"use client"

import { useState } from "react"
import { useJourney } from "@/lib/journey-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { LockIcon, ShieldCheckIcon, ArrowLeftIcon } from "lucide-react"
import Image from "next/image"

export function OtpVerificationStep() {
  const { state, verifyOtp, setCurrentStep } = useJourney()
  const [otp, setOtp] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      setIsVerifying(true)
      // Simulate OTP verification
      setTimeout(() => {
        verifyOtp()
        setIsVerifying(false)
        setCurrentStep(8) // Go to Success page
      }, 1500)
    }
  }

  const handleResendOtp = () => {
    setOtp("")
    // Simulate resend OTP
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Customer-Facing Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image src="/avanse-logo.png" alt="Avanse Logo" width={100} height={50} className="h-10 w-auto" />
              <div>
                <h1 className="text-xl font-bold text-foreground">Identity Verification</h1>
                <p className="text-xs text-muted-foreground">Application ID: {state.losId}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
              <LockIcon className="size-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Verify Your Identity</CardTitle>
            <CardDescription>
              We've sent a 6-digit OTP to {state.loanApplication.mobile || "your registered mobile number"}
            </CardDescription>
          </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            <p className="text-xs text-muted-foreground">Enter the 6-digit code sent to your mobile</p>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <ShieldCheckIcon className="size-4" />
            <span>Your information is secure and encrypted</span>
          </div>

          <div className="flex flex-col gap-3">
            <Button onClick={handleVerifyOtp} disabled={otp.length !== 6 || isVerifying} className="w-full">
              {isVerifying ? "Verifying..." : "Verify & Continue"}
            </Button>

            <Button variant="ghost" onClick={handleResendOtp} className="w-full">
              Resend OTP
            </Button>
          </div>

          <div className="text-center text-xs text-muted-foreground">
            Didn't receive the code? Check your spam folder or try resending.
          </div>
        </CardContent>
      </Card>
      </main>
    </div>
  )
}
