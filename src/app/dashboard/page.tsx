"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  PageTransition, 
  FadeInUp, 
  StaggerContainer, 
  StaggerItem 
} from "@/components/ui/animate";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const { data, resetOnboarding } = useOnboarding();

  const handleLogout = () => {
    // TODO: Implement logout functionality
    resetOnboarding();
    router.push("/login");
  };

  const handleStartOver = () => {
    resetOnboarding();
    router.push("/onboarding/subjects");
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <FadeInUp>
          <header className="border-b bg-card">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-xl text-primary">PlanifyGCSE</span>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" onClick={handleStartOver}>
                  Start Over
                </Button>
                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          </header>
        </FadeInUp>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-8 max-w-4xl">
          <StaggerContainer className="space-y-8">
            <StaggerItem>
              <div className="text-center space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Welcome to PlanifyGCSE!
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Your onboarding is complete. Here&apos;s what you&apos;ve selected:
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="grid gap-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Selected Subjects</h2>
                  <div className="space-y-2">
                    {data.selectedSubjects.length > 0 ? (
                      data.selectedSubjects.map(subjectId => (
                        <div key={subjectId} className="text-muted-foreground">
                          {subjectId.charAt(0).toUpperCase() + subjectId.slice(1)}
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground">No subjects selected</p>
                    )}
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Selected Exam Boards</h2>
                  <div className="space-y-2">
                    {Object.keys(data.selectedExamBoards).length > 0 ? (
                      Object.entries(data.selectedExamBoards).map(([subjectId, examBoardId]) => (
                        <div key={subjectId} className="text-muted-foreground">
                          {subjectId.charAt(0).toUpperCase() + subjectId.slice(1)}: {examBoardId}
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground">No exam boards selected</p>
                    )}
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Selected Modules & Topics</h2>
                  <div className="space-y-2">
                    {Object.keys(data.selectedModules).length > 0 ? (
                      <div className="text-muted-foreground">
                        {Object.keys(data.selectedModules).length} modules selected
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No modules selected</p>
                    )}
                    {Object.keys(data.selectedTopics).length > 0 && (
                      <div className="text-muted-foreground">
                        {Object.keys(data.selectedTopics).length} topics selected
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="text-center pt-8">
                <Button size="lg" className="px-8">
                  Start Building Your Revision Plan
                </Button>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </PageTransition>
  );
}
