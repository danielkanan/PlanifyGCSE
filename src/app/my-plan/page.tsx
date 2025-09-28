"use client";

import { Button } from "@/components/ui/button";
import { FadeInUp } from "@/components/ui/animate";
import PlanLayout from "@/components/layout/PlanLayout";

export default function MyPlanPage() {
  const handleGeneratePlan = () => {
    // Navigate to plan generation or show plan creation modal
    console.log('Generate plan clicked');
  };

  return (
    <PlanLayout currentPage="plan">
      <FadeInUp>
        <div className="space-y-6">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Create Your Plan For Today
            </h1>
            <p className="text-muted-foreground">
              Get a personalized revision plan tailored to your subjects and progress.
            </p>
          </div>

          {/* Main Content Card */}
          <div className="flex-1 flex items-center justify-center min-h-[200px] border border-border rounded-lg bg-card">
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Click below to create a revision plan for today.
              </p>
              <Button 
                onClick={handleGeneratePlan}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold"
              >
                Generate My Plan
              </Button>
            </div>
          </div>

          {/* Beta Disclaimer */}
          <div className="mt-8">
            <p className="text-xs text-muted-foreground/60 leading-relaxed">
              <strong>PlanifyGCSE&apos;s Reflective Revision Planner is currently in beta.</strong> We cannot guarantee the accuracy of the exam boards, modules, topics and content listed for your GCSE subjects. Please verify that the topics we have listed cover the curriculum for each of your subjects.
            </p>
          </div>
        </div>
      </FadeInUp>
    </PlanLayout>
  );
}
