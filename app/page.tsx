"use client"

import { JourneyProvider } from "@/lib/journey-context"
import { JourneyFlow } from "@/components/journey-flow"

export default function HomePage() {
  return (
    <JourneyProvider>
      <JourneyFlow />
    </JourneyProvider>
  )
}
