"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  StaggerContainer, 
  StaggerItem 
} from "@/components/ui/animate";
import { subjects } from "@/data/subjects";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useRouter } from "next/navigation";

export default function SubjectSelectionPage() {
  const router = useRouter();
  const { data, updateSubjects } = useOnboarding();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(data.selectedSubjects);

  useEffect(() => {
    setSelectedSubjects(data.selectedSubjects);
  }, [data.selectedSubjects]);

  const toggleSubject = (subjectId: string) => {
    const newSelection = selectedSubjects.includes(subjectId) 
      ? selectedSubjects.filter(id => id !== subjectId)
      : [...selectedSubjects, subjectId];
    
    setSelectedSubjects(newSelection);
  };

  const handleContinue = () => {
    updateSubjects(selectedSubjects);
    router.push("/onboarding/exam-boards");
  };

  const handleBack = () => {
    router.push("/register");
  };

  return (
    <OnboardingLayout currentStep={1} totalSteps={3}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="px-6 pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={handleBack} className="text-muted-foreground">
                ← Go back a step
              </Button>
              <span className="font-bold text-xl text-primary">PlanifyGCSE</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Step 1 of 3
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-8 max-w-4xl">
          <StaggerContainer className="space-y-8">
            <StaggerItem>
              <div className="text-center space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  What subjects are you studying?
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Select the subjects that you&apos;d like to include as part of your revision timetable.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="space-y-4">
                {subjects.map((subject) => (
                  <Card 
                    key={subject.id}
                    className={`p-3 cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedSubjects.includes(subject.id) 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => toggleSubject(subject.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                          selectedSubjects.includes(subject.id)
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {subject.icon}
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-foreground">
                            {subject.name}
                          </h3>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {selectedSubjects.includes(subject.id) ? (
                          <span className="text-sm text-primary font-medium">
                            Selected ✓
                          </span>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSubject(subject.id);
                            }}
                          >
                            Add
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex justify-between items-center pt-8">
                <Button variant="ghost" onClick={handleBack}>
                  ← Previous
                </Button>
                <Button 
                  onClick={handleContinue}
                  disabled={selectedSubjects.length === 0}
                  className="px-8"
                >
                  Save and Continue
                </Button>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </OnboardingLayout>
  );
}
