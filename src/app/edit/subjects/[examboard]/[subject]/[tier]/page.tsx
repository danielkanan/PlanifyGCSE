"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageTransition, StaggerContainer, StaggerItem } from "@/components/ui/animate";
import { LoadingOverlay } from "@/components/ui/loading";
import { useAuth } from "@/contexts/AuthContext";
import { useUserPlan } from "@/contexts/UserPlanContext";
import { saveUserPlan } from "@/lib/auth";
import { examBoards } from "@/lib/subject-data";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft, ChevronDown, ChevronUp, Check } from "lucide-react";
import PlanLayout from "@/components/layout/PlanLayout";

export default function EditTopicsPage() {
  const { user, loading } = useAuth();
  const { userPlan, refreshUserPlan } = useUserPlan();
  const router = useRouter();
  const params = useParams();
  const examBoard = params.examboard as string;
  const subject = params.subject as string;
  const tier = params.tier as string;

  const [expandedPapers, setExpandedPapers] = useState<Record<string, boolean>>({});
  const [selectedTopics, setSelectedTopics] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string>("");

  // Get subject data
  const getSubjectData = useCallback(() => {
    const board = examBoards.find(b => b.id === examBoard);
    if (!board) return null;
    
    // For tiered subjects, find the specific tier
    return board.subjects.find(s => s.id === `${subject}-${tier.toLowerCase()}`);
  }, [examBoard, subject, tier]);

  const subjectData = getSubjectData();

  // Load existing selections from user plan
  useEffect(() => {
    if (userPlan && userPlan.subjects) {
      const userSubject = userPlan.subjects.find((s: { id: string }) => s.id === subject);
      if (userSubject && userSubject.papers) {
        const existingSelections: Record<string, string[]> = {};
        
        userSubject.papers.forEach((paper: { id: string; topics: { topicId: number }[] }) => {
          const key = `${subject}-${paper.id}`;
          // Map topic IDs back to topic string IDs for selection
          const topicIds = paper.topics.map((topicData: { topicId: number }) => {
            const topic = subjectData?.papers.find(p => p.id === paper.id)?.topics.find(t => t.topicId === topicData.topicId);
            return topic?.id || `topic-${topicData.topicId}`;
          });
          existingSelections[key] = topicIds;
        });
        
        setSelectedTopics(existingSelections);
      }
    }
    setIsLoading(false);
  }, [userPlan, subject, subjectData?.papers]);

  if (loading || isLoading) {
    return (
      <PlanLayout currentPage="subject" subjectId={subject}>
        <LoadingOverlay isLoading={true}>
          <div className="min-h-screen bg-background" />
        </LoadingOverlay>
      </PlanLayout>
    );
  }

  if (!subjectData) {
    return (
      <PlanLayout currentPage="subject" subjectId={subject}>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Subject not found</p>
        </div>
      </PlanLayout>
    );
  }

  const togglePaperExpansion = (subjectId: string, paperId: string) => {
    const key = `${subjectId}-${paperId}`;
    setExpandedPapers(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleTopic = (subjectId: string, paperId: string, topicId: string) => {
    const key = `${subjectId}-${paperId}`;
    const current = selectedTopics[key] || [];
    const updated = current.includes(topicId)
      ? current.filter(s => s !== topicId)
      : [...current, topicId];
    
    const newSelection = {
      ...selectedTopics,
      [key]: updated
    };
    
    setSelectedTopics(newSelection);
  };

  const removeAllTopics = (subjectId: string, paperId: string) => {
    const key = `${subjectId}-${paperId}`;
    const newSelection = {
      ...selectedTopics,
      [key]: []
    };
    
    setSelectedTopics(newSelection);
  };

  const selectAllTopics = (subjectId: string, paperId: string, topics: string[]) => {
    const key = `${subjectId}-${paperId}`;
    const newSelection = {
      ...selectedTopics,
      [key]: topics
    };
    
    setSelectedTopics(newSelection);
  };

  const handleSave = async () => {
    if (!user || !userPlan) return;

    // Check if any topics are selected
    const hasSelectedTopics = Object.values(selectedTopics).some(topics => topics.length > 0);
    if (!hasSelectedTopics) {
      setError("Please select at least one topic before saving.");
      return;
    }

    setError("");
    setIsSaving(true);
    try {
      // Get current user plan data
      const currentSubjects = userPlan.subjects || [];
      const examBoardSelections: Record<string, string> = {};
      
      // Build exam board selections from current plan
      currentSubjects.forEach((subj: { id: string; examBoardId?: string }) => {
        examBoardSelections[subj.id] = subj.examBoardId || examBoard;
      });

      // Update the selected topics for the current subject
      const updatedSelectedTopics: Record<string, string[]> = {};
      
      // Copy existing selections from other subjects
      currentSubjects.forEach((subj: { id: string; papers?: { id: string; topics: { topicId: number }[] }[] }) => {
        if (subj.id !== subject) {
          subj.papers?.forEach((paper: { id: string; topics: { topicId: number }[] }) => {
            const key = `${subj.id}-${paper.id}`;
            // Map topic IDs back to topic string IDs for other subjects
            const topicIds = paper.topics.map((topicData: { topicId: number }) => {
              const board = examBoards.find(b => b.id === examBoard);
              const subjectData = board?.subjects.find(s => s.id === subj.id);
              const topic = subjectData?.papers.find(p => p.id === paper.id)?.topics.find(t => t.topicId === topicData.topicId);
              return topic?.id || `topic-${topicData.topicId}`;
            });
            updatedSelectedTopics[key] = topicIds;
          });
        }
      });
      
      // Add current subject's selections
      Object.keys(selectedTopics).forEach(key => {
        updatedSelectedTopics[key] = selectedTopics[key];
      });

      // Save the updated plan
      await saveUserPlan(user, currentSubjects.map((s: { id: string }) => s.id), examBoardSelections, updatedSelectedTopics);
      
      // Refresh the user plan data
      await refreshUserPlan();
      
      // Navigate back to the subject page
      router.push(`/subjects/${examBoard}/${subject}/${tier}`);
    } catch (error) {
      console.error("Failed to save topic changes:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleBack = () => {
    router.push(`/subjects/${examBoard}/${subject}/${tier}`);
  };

  return (
    <PlanLayout currentPage="subject" subjectId={subject}>
      <PageTransition>
        <div className="space-y-6">
          {/* Back Button */}
          <div className="mb-6">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleBack}
              className="text-muted-foreground hover:text-foreground border-border hover:border-muted-foreground"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Go back
            </Button>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2 max-[770px]:text-2xl">
              What topics are you studying for {subjectData.name}?
            </h2>
          </div>

          {/* Topics List */}
          <StaggerContainer>
            <div className="space-y-4">
              <StaggerItem key={subject}>
                <Card className="p-6 bg-card">
                  <div className="space-y-3">
                    {subjectData.papers.map((paper) => {
                      const key = `${subject}-${paper.id}`;
                      const isExpanded = expandedPapers[key];
                      const selectedTopicIds = selectedTopics[key] || [];
                      const hasTopics = paper.topics && paper.topics.length > 0;
                      const allSelected = hasTopics && paper.topics?.every(topic => 
                        selectedTopicIds.includes(topic.id)
                      );

                       return (
                         <div key={paper.id} className="border border-border rounded-lg p-4">
                           <div className="flex flex-col max-[770px]:space-y-2">
                             <div className="flex items-center justify-between">
                               <div className="flex items-center space-x-3">
                                 <span className="text-foreground font-medium text-sm">
                                   {paper.name}
                                 </span>
                                 {allSelected && (
                                   <span className="text-primary text-sm font-medium flex items-center hidden min-[771px]:flex">
                                     Paper selected <Check className="w-4 h-4 ml-1" />
                                   </span>
                                 )}
                               </div>
                               <div className="flex items-center space-x-2">
                                 {hasTopics && (
                                   <>
                                     <Button
                                       variant="outline"
                                       size="sm"
                                       onClick={() => allSelected 
                                         ? removeAllTopics(subject, paper.id)
                                         : selectAllTopics(subject, paper.id, paper.topics?.map(t => t.id) || [])
                                       }
                                       className="text-muted-foreground hover:text-foreground text-xs h-7 px-2"
                                     >
                                       {allSelected ? 'Remove All' : 'Select All'}
                                     </Button>
                                     <Button
                                       variant="outline"
                                       size="sm"
                                       onClick={() => togglePaperExpansion(subject, paper.id)}
                                       className="text-muted-foreground hover:text-foreground text-xs h-7 px-2"
                                     >
                                       {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                     </Button>
                                   </>
                                 )}
                               </div>
                             </div>
                             {allSelected && (
                               <div className="hidden max-[770px]:block">
                                 <span className="text-primary text-sm font-medium flex items-center">
                                   Paper selected <Check className="w-4 h-4 ml-1" />
                                 </span>
                               </div>
                             )}
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
                                    onClick={() => toggleTopic(subject, paper.id, topic.id)}
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
            </div>
          </StaggerContainer>

          {/* Error Message */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end">
            <Button 
              onClick={handleSave}
              disabled={isSaving}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-2"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </PageTransition>
    </PlanLayout>
  );
}
