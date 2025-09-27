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

export default function ExamBoardSelectionPage() {
  const router = useRouter();
  const { data, updateExamBoards } = useOnboarding();
  const [selectedExamBoards, setSelectedExamBoards] = useState<Record<string, string>>(data.selectedExamBoards);

  useEffect(() => {
    setSelectedExamBoards(data.selectedExamBoards);
  }, [data.selectedExamBoards]);

  // Filter subjects to only show those selected in the previous step
  const selectedSubjects = subjects.filter(subject => 
    data.selectedSubjects.includes(subject.id)
  );

  const handleExamBoardChange = (subjectId: string, examBoardId: string) => {
    const newSelection = {
      ...selectedExamBoards,
      [subjectId]: examBoardId
    };
    setSelectedExamBoards(newSelection);
  };

  const handleContinue = () => {
    updateExamBoards(selectedExamBoards);
    router.push("/onboarding/topics");
  };

  const handleBack = () => {
    router.push("/onboarding/subjects");
  };

  const isFormValid = selectedSubjects.length > 0 && 
    selectedSubjects.every(subject => selectedExamBoards[subject.id] && selectedExamBoards[subject.id] !== "");

  // If no subjects were selected, redirect back to subjects page
  if (selectedSubjects.length === 0) {
    return (
      <OnboardingLayout currentStep={2} totalSteps={3}>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">No Subjects Selected</h1>
            <p className="text-muted-foreground mb-6">Please go back and select at least one subject.</p>
            <Button onClick={handleBack}>Go Back</Button>
          </div>
        </div>
      </OnboardingLayout>
    );
  }

  return (
    <OnboardingLayout currentStep={2} totalSteps={3}>
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
              Step 2 of 3
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-8 max-w-4xl">
          <StaggerContainer className="space-y-8">
            <StaggerItem>
              <div className="text-center space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  What exam boards are you covering?
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  We&apos;ll automatically import the topics for your exam boards, based on your year group.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="space-y-6">
                {selectedSubjects.map((subject) => (
                  <Card key={subject.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold">
                          {subject.icon}
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-foreground">
                            {subject.name}
                          </h3>
                        </div>
                      </div>
                      
                      <div className="w-52">
                        <select
                          value={selectedExamBoards[subject.id] || ""}
                          onChange={(e) => handleExamBoardChange(subject.id, e.target.value)}
                          className="w-full p-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="">Select your exam board</option>
                          {subject.examBoards.map((examBoard) => (
                            <option key={examBoard.id} value={examBoard.id}>
                              {examBoard.name}
                            </option>
                          ))}
                        </select>
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
                  disabled={!isFormValid}
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
