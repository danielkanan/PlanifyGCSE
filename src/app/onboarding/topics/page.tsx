"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageTransition, FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/animate";
import { motion, AnimatePresence } from "framer-motion";
import { examBoards, getTopicsBySubjectAndBoard } from "@/lib/subject-data";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronDown, ChevronUp, Check, X, Dna, FlaskConical, Atom, Microscope } from "lucide-react";

export default function TopicsPage() {
  const router = useRouter();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [examBoardSelections, setExamBoardSelections] = useState<Record<string, string>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [selectedTopics, setSelectedTopics] = useState<Record<string, string[]>>({});
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState<number>(0);

  useEffect(() => {
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
  }, []);

  // Auto-select all subtopics when subjects and exam boards are loaded (only if no saved topics)
  useEffect(() => {
    if (selectedSubjects.length > 0 && Object.keys(examBoardSelections).length > 0 && Object.keys(selectedTopics).length === 0) {
      const newSelectedTopics: Record<string, string[]> = {};
      
      selectedSubjects.forEach(subjectId => {
        const subject = getSubjectData(subjectId);
        if (subject) {
          subject.topics.forEach(topic => {
            if (topic.subtopics && topic.subtopics.length > 0) {
              const key = `${subjectId}-${topic.id}`;
              newSelectedTopics[key] = [...topic.subtopics];
            }
          });
        }
      });
      
      setSelectedTopics(newSelectedTopics);
    }
  }, [selectedSubjects.length, Object.keys(examBoardSelections).length, Object.keys(selectedTopics).length]);

  const toggleTopicExpansion = (subjectId: string, topicId: string) => {
    const key = `${subjectId}-${topicId}`;
    setExpandedTopics(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleSubtopic = (subjectId: string, topicId: string, subtopic: string) => {
    const key = `${subjectId}-${topicId}`;
    const current = selectedTopics[key] || [];
    const updated = current.includes(subtopic)
      ? current.filter(s => s !== subtopic)
      : [...current, subtopic];
    
    const newSelection = {
      ...selectedTopics,
      [key]: updated
    };
    
    setSelectedTopics(newSelection);
    localStorage.setItem('selectedTopics', JSON.stringify(newSelection));
  };

  const removeAllTopics = (subjectId: string, topicId: string) => {
    const key = `${subjectId}-${topicId}`;
    const newSelection = {
      ...selectedTopics,
      [key]: []
    };
    
    setSelectedTopics(newSelection);
    localStorage.setItem('selectedTopics', JSON.stringify(newSelection));
  };

  const selectAllTopics = (subjectId: string, topicId: string, subtopics: string[]) => {
    const key = `${subjectId}-${topicId}`;
    const newSelection = {
      ...selectedTopics,
      [key]: subtopics
    };
    
    setSelectedTopics(newSelection);
    localStorage.setItem('selectedTopics', JSON.stringify(newSelection));
  };

  const handleContinue = () => {
    if (currentSubjectIndex < selectedSubjects.length - 1) {
      // Move to next subject and scroll to top
      setCurrentSubjectIndex(prev => prev + 1);
      // Use setTimeout to ensure the state update has completed before scrolling
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      // Go to dashboard
      router.push('/dashboard');
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
    const examBoardId = examBoardSelections[subjectId];
    if (!examBoardId) return null;
    
    const board = examBoards.find(b => b.id === examBoardId);
    return board?.subjects.find(s => s.id === subjectId);
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
                  Since you're in Year 11 and this subject does not have optional modules, we've auto-selected all topics. You can adjust this as required.
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
                        {subject.topics.map((topic) => {
                          const key = `${subjectId}-${topic.id}`;
                          const isExpanded = expandedTopics[key];
                          const selectedSubtopicIds = selectedTopics[key] || [];
                          const hasSubtopic = topic.subtopics && topic.subtopics.length > 0;
                          const allSelected = hasSubtopic && topic.subtopics?.every(subtopic => 
                            selectedSubtopicIds.includes(subtopic)
                          );

                          return (
                            <div key={topic.id} className="border border-border rounded-lg p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <span className="text-foreground font-medium">
                                    {topic.name}
                                  </span>
                                  {allSelected && (
                                    <span className="text-primary text-sm font-medium flex items-center">
                                      Module selected <Check className="w-4 h-4 ml-1" />
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center space-x-2">
                                  {hasSubtopic && (
                                    <>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => allSelected 
                                          ? removeAllTopics(subjectId, topic.id)
                                          : selectAllTopics(subjectId, topic.id, topic.subtopics || [])
                                        }
                                        className="text-muted-foreground hover:text-foreground"
                                      >
                                        {allSelected ? 'Remove All' : 'Select All'}
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => toggleTopicExpansion(subjectId, topic.id)}
                                        className="text-muted-foreground hover:text-foreground"
                                      >
                                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                      </Button>
                                    </>
                                  )}
                                </div>
                              </div>

                              {hasSubtopic && isExpanded && (
                                <div className="mt-4 space-y-2">
                                  <div className="flex justify-between items-center mb-3">
                                    <span className="text-sm text-muted-foreground">
                                      Select subtopics:
                                    </span>
                                  </div>
                                  {topic.subtopics?.map((subtopic) => {
                                    const isSelected = selectedSubtopicIds.includes(subtopic);
                                    return (
                                      <div
                                        key={subtopic}
                                        className="flex items-center space-x-3 p-2 rounded hover:bg-muted/50 cursor-pointer"
                                        onClick={() => toggleSubtopic(subjectId, topic.id, subtopic)}
                                      >
                                        <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                                          isSelected 
                                            ? 'bg-primary border-primary' 
                                            : 'border-muted-foreground'
                                        }`}>
                                          {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                                        </div>
                                        <span className="text-foreground text-sm">{subtopic}</span>
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
