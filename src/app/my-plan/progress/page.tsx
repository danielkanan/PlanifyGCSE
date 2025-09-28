"use client";

import { FadeInUp } from "@/components/ui/animate";
import PlanLayout from "@/components/layout/PlanLayout";
import { BookOpen } from "lucide-react";

export default function ProgressPage() {
  return (
    <PlanLayout currentPage="progress">
      <FadeInUp>
        <div className="space-y-6">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Your Progress
            </h1>
            <p className="text-muted-foreground">
              Here, you can see the number of sessions you&apos;ve completed each day.
            </p>
          </div>

          {/* Empty State */}
          <div className="flex-1 flex items-center justify-center min-h-[200px] border border-border rounded-lg bg-card">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <BookOpen className="w-16 h-16 text-primary" />
              </div>
              <p className="text-muted-foreground">
                You haven&apos;t completed any sessions yet. Head to &apos;Your Plan&apos; to get started.
              </p>
            </div>
          </div>
        </div>
      </FadeInUp>
    </PlanLayout>
  );
}
