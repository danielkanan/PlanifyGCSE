"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageTransition, FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/animate";
import { LoadingOverlay } from "@/components/ui/loading";
import { useAuth } from "@/contexts/AuthContext";
import { examBoards } from "@/lib/subject-data";
import { Sun, BarChart3, Flag, Dna, FlaskConical, Atom, Microscope } from "lucide-react";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [userName, setUserName] = useState<string>("Daniel");

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !user) {
      router.push('/login');
      return;
    }

    // Load data from localStorage
    const savedSubjects = localStorage.getItem('selectedSubjects');
    if (savedSubjects) {
      setSelectedSubjects(JSON.parse(savedSubjects));
    }
    
    // Get user name from auth context or localStorage
    const savedUserName = localStorage.getItem('userName') || user?.displayName || 'User';
    setUserName(savedUserName);
  }, [user, loading, router]);

  // Show loading overlay while checking authentication
  if (loading) {
    return (
      <LoadingOverlay isLoading={true} message="Loading your plan...">
        <div className="min-h-screen bg-background" />
      </LoadingOverlay>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!user) {
    return null;
  }

  const getIconComponent = (iconName: string) => {
    const iconMap = {
      Dna,
      FlaskConical,
      Atom,
      Microscope
    };
    return iconMap[iconName as keyof typeof iconMap] || Dna;
  };

  const getSubjectData = (subjectId: string) => {
    for (const board of examBoards) {
      const subject = board.subjects.find(s => s.id === subjectId);
      if (subject) return subject;
    }
    return null;
  };

  const handleGeneratePlan = () => {
    // Navigate to plan generation or show plan creation modal
    console.log('Generate plan clicked');
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-card border-r border-border min-h-screen p-6">
            <FadeInUp>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-primary mb-8">
                  PlanifyGCSE
                </h1>
                
                {/* Your Planner Section */}
                <div className="mb-6">
                  <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                    Your Planner
                  </h2>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 p-2 rounded-lg bg-primary/10 border border-primary/20">
                      <Sun className="w-5 h-5 text-primary" />
                      <span className="text-foreground font-medium">Your Plan</span>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                      <BarChart3 className="w-5 h-5 text-muted-foreground" />
                      <span className="text-muted-foreground">Your Progress</span>
                    </div>
                  </div>
                </div>

                {/* Your Subjects Section */}
                <div>
                  <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                    Your Subjects
                  </h2>
                  <div className="space-y-2">
                    {selectedSubjects.map((subjectId) => {
                      const subject = getSubjectData(subjectId);
                      if (!subject) return null;
                      
                      return (
                        <div key={subjectId} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground">
                            {(() => {
                              const IconComponent = getIconComponent(subject.icon);
                              return <IconComponent className="w-4 h-4" />;
                            })()}
                          </div>
                          <span className="text-foreground">{subject.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </FadeInUp>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            <FadeInUp>
              <div className="max-w-4xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">
                      Hey, {userName} 👋
                    </h1>
                    <h2 className="text-3xl font-bold text-foreground">
                      Create Your Plan For Today
                    </h2>
                  </div>
                  <button className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-1">
                    <Flag className="w-4 h-4" />
                    <span>Report a Problem</span>
                  </button>
                </div>

                {/* Main Content Card */}
                <StaggerContainer>
                  <StaggerItem>
                    <Card className="p-12 text-center bg-card border-2 border-dashed border-muted-foreground/20">
                      <div className="space-y-6">
                        <p className="text-lg text-muted-foreground">
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
                    </Card>
                  </StaggerItem>
                </StaggerContainer>

                {/* Beta Disclaimer */}
                <FadeInUp>
                  <div className="mt-8 p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <strong>PlanifyGCSE&apos;s Reflective Revision Planner is currently in beta.</strong> We cannot guarantee the accuracy of the exam boards, modules, topics and content listed for your GCSE subjects. Please verify that the topics we have listed cover the curriculum for each of your subjects. If you find any mistakes, please use the &apos;Report a Problem&apos; button so PlanifyGCSE can fix them.
                    </p>
                  </div>
                </FadeInUp>
              </div>
            </FadeInUp>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
