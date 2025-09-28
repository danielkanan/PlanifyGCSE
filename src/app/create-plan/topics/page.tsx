"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageTransition, FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/animate";
import { LoadingOverlay } from "@/components/ui/loading";
import { useAuth } from "@/contexts/AuthContext";
import { hasCompletedOnboarding, markOnboardingCompleted, saveUserPlan } from "@/lib/auth";
import { motion, AnimatePresence } from "framer-motion";
import { examBoards } from "@/lib/subject-data";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronDown, ChevronUp, Check } from "lucide-react";

export default function TopicsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [examBoardSelections, setExamBoardSelections] = useState<Record<string, string>>({});
  const [expandedPapers, setExpandedPapers] = useState<Record<string, boolean>>({});
  const [selectedTopics, setSelectedTopics] = useState<Record<string, string[]>>({});
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState<number>(0);

  const getSubjectData = useCallback((subjectId: string) => {
    const examBoardId = examBoardSelections[subjectId];
    if (!examBoardId) return null;
    
    const board = examBoards.find(b => b.id === examBoardId);
    if (!board) return null;
    
    // For tiered subjects, we need to find the specific tier
    if (subjectId === 'mathematics' || subjectId === 'combined-science') {
      // Default to higher tier for now - this should be dynamic based on user selection
      return board.subjects.find(s => s.id === `${subjectId}-higher`);
    }
    return board.subjects.find(s => s.id === subjectId);
  }, [examBoardSelections]);

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

    // Load data from localStorage
    const savedSubjects = localStorage.getItem('selectedSubjects');
    const savedExamBoards = localStorage.getItem('examBoardSelections');
    const savedTopics = localStorage.getItem('selectedTopics');

    if (savedSubjects) {
      setSelectedSubjects(JSON.parse(savedSubjects));
    }
    if (savedExamBoards) {
      setExamBoardSelections(JSON.parse(savedExamBoards));
    }
    if (savedTopics) {
      setSelectedTopics(JSON.parse(savedTopics));
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [user, loading, router]);

  // Auto-select all topics when subjects and exam boards are loaded (only if no saved topics)
  useEffect(() => {
    if (selectedSubjects.length > 0 && Object.keys(examBoardSelections).length > 0 && Object.keys(selectedTopics).length === 0) {
      const newSelectedTopics: Record<string, string[]> = {};
      
      selectedSubjects.forEach(subjectId => {
        const subject = getSubjectData(subjectId);
        if (subject) {
          subject.papers.forEach(paper => {
            if (paper.topics && paper.topics.length > 0) {
              const key = `${subjectId}-${paper.id}`;
              newSelectedTopics[key] = paper.topics.map(topic => topic.id);
            }
          });
        }
      });
      
      setSelectedTopics(newSelectedTopics);
    }
  }, [selectedSubjects, examBoardSelections, selectedTopics, getSubjectData]);

  // Show loading overlay while checking authentication
  if (loading) {
    return (
      <LoadingOverlay isLoading={true} message="Loading topics...">
        <div className="min-h-screen bg-background" />
      </LoadingOverlay>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!user) {
    return null;
  }

  const togglePaperExpansion = (subjectId: string, paperId: string) => {
    const key = `${subjectId}-${paperId}`;
    setExpandedPapers(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleTopic = (subjectId: string, paperId: string, topic: string) => {
    const key = `${subjectId}-${paperId}`;
    const current = selectedTopics[key] || [];
    const updated = current.includes(topic)
      ? current.filter(s => s !== topic)
      : [...current, topic];
    
    const newSelection = {
      ...selectedTopics,
      [key]: updated
    };
    
    setSelectedTopics(newSelection);
    localStorage.setItem('selectedTopics', JSON.stringify(newSelection));
  };

  const removeAllTopics = (subjectId: string, paperId: string) => {
    const key = `${subjectId}-${paperId}`;
    const newSelection = {
      ...selectedTopics,
      [key]: []
    };
    
    setSelectedTopics(newSelection);
    localStorage.setItem('selectedTopics', JSON.stringify(newSelection));
  };

  const selectAllTopics = (subjectId: string, paperId: string, topics: string[]) => {
    const key = `${subjectId}-${paperId}`;
    const newSelection = {
      ...selectedTopics,
      [key]: topics
    };
    
    setSelectedTopics(newSelection);
    localStorage.setItem('selectedTopics', JSON.stringify(newSelection));
  };

  const handleContinue = async () => {
    if (currentSubjectIndex < selectedSubjects.length - 1) {
      // Move to next subject and scroll to top
      setCurrentSubjectIndex(prev => prev + 1);
      // Use setTimeout to ensure the state update has completed before scrolling
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      // Save plan data and mark onboarding as completed
      if (user) {
        try {
          // Save the complete plan data to Firestore
          await saveUserPlan(user, selectedSubjects, examBoardSelections, selectedTopics);
          await markOnboardingCompleted(user);
          
          // Clear localStorage after successful save
          localStorage.removeItem('selectedSubjects');
          localStorage.removeItem('examBoardSelections');
          localStorage.removeItem('selectedTopics');
          
          router.push('/my-plan');
        } catch (error) {
          console.error("Failed to save plan or mark onboarding as completed:", error);
          // Still redirect to my-plan even if saving fails
          router.push('/my-plan');
        }
      } else {
        router.push('/my-plan');
      }
    }
  };

  const handleBack = () => {
    if (currentSubjectIndex > 0) {
      setCurrentSubjectIndex(prev => prev - 1);
      // Use setTimeout to ensure the state update has completed before scrolling
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      router.back();
    }
  };



  const getCurrentSubject = () => {
    if (currentSubjectIndex >= selectedSubjects.length) return null;
    const subjectId = selectedSubjects[currentSubjectIndex];
    return getSubjectData(subjectId);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <div className="w-full px-8 py-12">
          {/* Back Button and Subject Indicator */}
          <FadeInUp>
            <div className="mb-6 flex items-center justify-between">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleBack}
                className="text-muted-foreground hover:text-foreground border-border hover:border-muted-foreground"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Go back a step
              </Button>
              <div className="text-sm text-muted-foreground border border-border rounded-md px-3 py-2 bg-background">
                Subject {currentSubjectIndex + 1} / {selectedSubjects.length}
              </div>
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
                  What topics are you studying for{" "}
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentSubjectIndex}
                      initial={{ opacity: 0, filter: "blur(8px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(8px)" }}
                      transition={{ 
                        duration: 0.4,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      className="inline-block"
                    >
                      {getCurrentSubject()?.name}?
                    </motion.span>
                  </AnimatePresence>
                </h2>
                <p className="text-muted-foreground">
                  Since you&apos;re in Year 11 and this subject does not have optional modules, we&apos;ve auto-selected all topics. You can adjust this as required.
                </p>
              </div>
            </div>
          </FadeInUp>

          {/* Topics List */}
          <StaggerContainer>
            <div className="space-y-4">
              {(() => {
                const subject = getCurrentSubject();
                if (!subject) return null;
                const subjectId = selectedSubjects[currentSubjectIndex];

                return (
                  <StaggerItem key={subjectId}>
                    <Card className="p-6 bg-card">
                      <div className="space-y-3">
                        {subject.papers.map((paper) => {
                          const key = `${subjectId}-${paper.id}`;
                          const isExpanded = expandedPapers[key];
                          const selectedTopicIds = selectedTopics[key] || [];
                          const hasTopics = paper.topics && paper.topics.length > 0;
                          const allSelected = hasTopics && paper.topics?.every(topic => 
                            selectedTopicIds.includes(topic.id)
                          );

                          return (
                            <div key={paper.id} className="border border-border rounded-lg p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <span className="text-foreground font-medium">
                                    {paper.name}
                                  </span>
                                  {allSelected && (
                                    <span className="text-primary text-sm font-medium flex items-center">
                                      Paper selected <Check className="w-4 h-4 ml-1" />
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center space-x-2">
                                  {hasTopics && (
                                    <>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => allSelected 
                                          ? removeAllTopics(subjectId, paper.id)
                                          : selectAllTopics(subjectId, paper.id, paper.topics?.map(t => t.id) || [])
                                        }
                                        className="text-muted-foreground hover:text-foreground"
                                      >
                                        {allSelected ? 'Remove All' : 'Select All'}
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => togglePaperExpansion(subjectId, paper.id)}
                                        className="text-muted-foreground hover:text-foreground"
                                      >
                                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                      </Button>
                                    </>
                                  )}
                                </div>
                              </div>

                              {hasTopics && isExpanded && (
                                <div className="mt-4 space-y-2">
                                  <div className="flex justify-between items-center mb-3">
                                    <span className="text-sm text-muted-foreground">
                                      Select topics:
                                    </span>
                                  </div>
                                  {paper.topics?.map((topic) => {
                                    const isSelected = selectedTopicIds.includes(topic.id);
                                    return (
                                      <div
                                        key={topic.id}
                                        className="flex items-center space-x-3 p-2 rounded hover:bg-muted/50 cursor-pointer"
                                        onClick={() => toggleTopic(subjectId, paper.id, topic.id)}
                                      >
                                        <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                                          isSelected 
                                            ? 'bg-primary border-primary' 
                                            : 'border-muted-foreground'
                                        }`}>
                                          {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                                        </div>
                                        <span className="text-foreground text-sm">{topic.name}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </Card>
                  </StaggerItem>
                );
              })()}
            </div>
          </StaggerContainer>

          {/* Continue Button */}
          <FadeInUp>
            <div className="mt-8 flex justify-end">
              <Button 
                onClick={handleContinue}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-2"
              >
                {currentSubjectIndex < selectedSubjects.length - 1 ? 'Next Subject' : 'Save & Continue'}
              </Button>
            </div>
          </FadeInUp>
        </div>
      </div>
    </PageTransition>
  );
}
