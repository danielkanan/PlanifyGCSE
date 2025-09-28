"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageTransition, FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/animate";
import { LoadingOverlay } from "@/components/ui/loading";
import { useAuth } from "@/contexts/AuthContext";
import { hasCompletedOnboarding } from "@/lib/auth";
import { getAllSubjects } from "@/lib/subject-data";
import { useRouter } from "next/navigation";
import { Plus, Dna, FlaskConical, Atom, Microscope } from "lucide-react";

export default function SubjectsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const subjects = getAllSubjects();

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

    // Load saved subject selections from localStorage
    const saved = localStorage.getItem('selectedSubjects');
    if (saved) {
      setSelectedSubjects(JSON.parse(saved));
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [user, loading, router]);

  // Show loading overlay while checking authentication
  if (loading) {
    return (
      <LoadingOverlay isLoading={true} message="Loading subjects...">
        <div className="min-h-screen bg-background" />
      </LoadingOverlay>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!user) {
    return null;
  }

  const handleSubjectToggle = (subjectId: string) => {
    const newSelection = selectedSubjects.includes(subjectId) 
      ? selectedSubjects.filter(id => id !== subjectId)
      : [...selectedSubjects, subjectId];
    
    setSelectedSubjects(newSelection);
    localStorage.setItem('selectedSubjects', JSON.stringify(newSelection));
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

  const handleContinue = () => {
    router.push('/create-plan/exam-boards');
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <div className="w-full px-8 py-12">
          {/* Header */}
          <FadeInUp>
            <div className="mb-8">
              <div>
                <h1 className="text-xl font-bold text-muted-foreground mb-2">
                  PlanifyGCSE
                </h1>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  What subjects are you studying?
                </h2>
                <p className="text-muted-foreground">
                  Select the subjects that you&apos;d like to include as part of your revision timetable.
                </p>
              </div>
            </div>
          </FadeInUp>

          {/* Subjects List */}
          <StaggerContainer>
            <div className="space-y-3">
              {subjects.map((subject) => (
                <StaggerItem key={subject.id}>
                  <Card 
                    className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedSubjects.includes(subject.id) 
                        ? 'bg-primary/10 border-primary/50' 
                        : 'bg-card hover:bg-muted/50'
                    }`}
                    onClick={() => handleSubjectToggle(subject.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground">
                          {(() => {
                            const IconComponent = getIconComponent(subject.icon);
                            return <IconComponent className="w-5 h-5" />;
                          })()}
                        </div>
                        <span className="text-foreground font-medium">
                          {subject.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {selectedSubjects.includes(subject.id) ? (
                          <span className="text-primary text-sm font-medium">
                            Added
                          </span>
                        ) : (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          {/* Continue Button */}
          <FadeInUp>
            <div className="mt-8 flex justify-end">
              <Button 
                onClick={handleContinue}
                disabled={selectedSubjects.length === 0}
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
