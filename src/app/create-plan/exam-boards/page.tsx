"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageTransition, FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/animate";
import { LoadingOverlay } from "@/components/ui/loading";
import { useAuth } from "@/contexts/AuthContext";
import { hasCompletedOnboarding } from "@/lib/auth";
import { examBoards, getExamBoardsForSubject } from "@/lib/subject-data";
import { useRouter } from "next/navigation";
import { ChevronLeft, Dna, FlaskConical, Atom, Microscope } from "lucide-react";

export default function ExamBoardsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [examBoardSelections, setExamBoardSelections] = useState<Record<string, string>>({});

  useEffect(() => {
    // Clear localStorage on page reload
    const handleBeforeUnload = () => {
      localStorage.removeItem('selectedSubjects');
      localStorage.removeItem('examBoardSelections');
      localStorage.removeItem('selectedTopics');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Redirect to login if not authenticated
    if (!loading && !user) {
      router.push('/login');
      return;
    }

    // Check if user has already completed onboarding
    if (user) {
      hasCompletedOnboarding(user).then((completed) => {
        if (completed) {
          router.push('/my-plan');
          return;
        }
      });
    }

    // Load selected subjects from localStorage
    const saved = localStorage.getItem('selectedSubjects');
    if (saved) {
      setSelectedSubjects(JSON.parse(saved));
    }
    
    // Load saved exam board selections from localStorage
    const savedExamBoards = localStorage.getItem('examBoardSelections');
    if (savedExamBoards) {
      setExamBoardSelections(JSON.parse(savedExamBoards));
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [user, loading, router]);

  // Show loading overlay while checking authentication
  if (loading) {
    return (
      <LoadingOverlay isLoading={true} message="Loading exam boards...">
        <div className="min-h-screen bg-background" />
      </LoadingOverlay>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!user) {
    return null;
  }

  const handleExamBoardChange = (subjectId: string, examBoardId: string) => {
    const newSelection = {
      ...examBoardSelections,
      [subjectId]: examBoardId
    };
    
    setExamBoardSelections(newSelection);
    localStorage.setItem('examBoardSelections', JSON.stringify(newSelection));
  };

  const handleContinue = () => {
    router.push('/create-plan/topics');
  };

  const getIconComponent = (iconName: string) => {
    const iconMap = {
      Dna,
      FlaskConical,
      Atom,
      Microscope
    };
    return iconMap[iconName as keyof typeof iconMap] || Dna;
  };

  const isAllSelected = () => {
    return selectedSubjects.every(subjectId => examBoardSelections[subjectId]);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <div className="w-full px-4 pt-4 pb-6 sm:px-8 sm:pt-12 sm:pb-12">
          {/* Back Button */}
          <FadeInUp>
            <div className="mb-6">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => router.back()}
                className="text-muted-foreground hover:text-foreground border-border hover:border-muted-foreground"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Go back a step
              </Button>
            </div>
          </FadeInUp>

          {/* Header */}
          <FadeInUp>
            <div className="mb-8">
              <div>
                <h1 className="text-xl font-bold text-muted-foreground mb-2">
                  PlanifyGCSE
                </h1>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  What exam boards are you covering?
                </h2>
                <p className="text-muted-foreground">
                  We&apos;ll automatically import the topics for your exam boards.
                </p>
              </div>
            </div>
          </FadeInUp>

          {/* Subjects and Exam Boards */}
          <StaggerContainer>
            <div className="space-y-6">
              {selectedSubjects.map((subjectId) => {
                // Find the subject across all exam boards, handling tiered subjects
                let subject = null;
                for (const board of examBoards) {
                  // For tiered subjects, we'll show the first available tier (higher)
                  if (subjectId === 'mathematics' || subjectId === 'combined-science') {
                    subject = board.subjects.find(s => s.id === `${subjectId}-higher`);
                  } else {
                    subject = board.subjects.find(s => s.id === subjectId);
                  }
                  if (subject) break;
                }
                
                if (!subject) return null;
                
                // Get available exam boards for this subject
                const availableExamBoards = getExamBoardsForSubject(subjectId);

                return (
                  <StaggerItem key={subjectId}>
                    <Card className="p-6 bg-card">
                      {/* Desktop layout: horizontal */}
                      <div className="hidden sm:flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground">
                            {(() => {
                              const IconComponent = getIconComponent(subject.icon);
                              return <IconComponent className="w-5 h-5" />;
                            })()}
                          </div>
                          <span className="text-foreground font-medium text-lg">
                            {subject.name}
                          </span>
                        </div>
                        <div className="flex-1 max-w-xs ml-8">
                          <select
                            value={examBoardSelections[subjectId] || ''}
                            onChange={(e) => handleExamBoardChange(subjectId, e.target.value)}
                            className="w-full p-3 bg-muted border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="">Select your exam board</option>
                            {availableExamBoards.map((board) => (
                              <option key={board.id} value={board.id}>
                                {board.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      {/* Mobile layout: vertical */}
                      <div className="sm:hidden space-y-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground">
                            {(() => {
                              const IconComponent = getIconComponent(subject.icon);
                              return <IconComponent className="w-5 h-5" />;
                            })()}
                          </div>
                          <span className="text-foreground font-medium text-lg">
                            {subject.name}
                          </span>
                        </div>
                        <div>
                          <select
                            value={examBoardSelections[subjectId] || ''}
                            onChange={(e) => handleExamBoardChange(subjectId, e.target.value)}
                            className="w-full p-3 bg-muted border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="">Select your exam board</option>
                            {availableExamBoards.map((board) => (
                              <option key={board.id} value={board.id}>
                                {board.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </Card>
                  </StaggerItem>
                );
              })}
            </div>
          </StaggerContainer>

          {/* Continue Button */}
          <FadeInUp>
            <div className="mt-8 flex justify-end">
              <Button 
                onClick={handleContinue}
                disabled={!isAllSelected()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-2"
              >
                Save & Continue
              </Button>
            </div>
          </FadeInUp>
        </div>
      </div>
    </PageTransition>
  );
}
