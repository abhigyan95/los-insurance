"use client"

import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Step {
  id: number
  name: string
  description: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
  skippedSteps?: number[] // Add support for skipped steps
}

export function Stepper({ steps, currentStep, skippedSteps = [] }: StepperProps) {
  return (
    <nav aria-label="Progress" className="w-full">
      <ol className="flex items-center justify-between gap-1">
        {steps.map((step, index) => {
          const isSkipped = skippedSteps.includes(step.id) // Check if step is skipped first
          const isCompleted = step.id < currentStep && !isSkipped // Don't mark skipped steps as completed
          const isCurrent = step.id === currentStep
          const isUpcoming = step.id > currentStep

          return (
            <li key={step.id} className="flex flex-col items-center flex-1 relative">
              {/* Container for circle - fixed width centered */}
              <div className="flex justify-center w-8 mb-1">
                <div
                  className={cn(
                    "flex items-center justify-center size-8 rounded-full border-2 transition-all",
                    isCompleted && "bg-success border-success text-success-foreground",
                    isCurrent && "bg-primary border-primary text-primary-foreground",
                    isSkipped && !isCompleted && "bg-muted border-border text-muted-foreground",
                    isUpcoming && !isSkipped && "bg-muted border-border text-muted-foreground",
                  )}
                >
                  {isCompleted ? (
                    <CheckIcon className="size-4" />
                  ) : (
                    <span className="text-xs font-semibold">{step.id}</span>
                  )}
                </div>
              </div>

              {/* Connector line - stretches across full width */}
              {index < steps.length - 1 && (
                <div
                  className="absolute top-4 left-1/2 right-0 h-0.5 transition-all"
                  style={{
                    left: "calc(50% + 18px)",
                    width: "calc(50% - 18px)",
                    backgroundColor: isCompleted ? "hsl(var(--success))" : "hsl(var(--border))",
                  }}
                />
              )}

              {/* Step label - centered below circle */}
              <div className="flex flex-col items-center text-center min-h-10">
                <span
                  className={cn(
                    "text-xs font-medium leading-tight",
                    isCurrent && "text-foreground",
                    isCompleted && "text-foreground",
                    isSkipped && !isCompleted && "text-muted-foreground",
                    isUpcoming && !isSkipped && "text-muted-foreground",
                  )}
                >
                  {step.name}
                </span>
                <span className="text-[10px] text-muted-foreground hidden sm:block">{step.description}</span>
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
