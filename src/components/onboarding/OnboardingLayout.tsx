"use client";

import { ReactNode } from "react";
import { 
  PageTransition
} from "@/components/ui/animate";

interface OnboardingLayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
}

export default function OnboardingLayout({ 
  children, 
  currentStep, 
  totalSteps
}: OnboardingLayoutProps) {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        {/* Main Content */}
        {children}
      </div>
    </PageTransition>
  );
}
