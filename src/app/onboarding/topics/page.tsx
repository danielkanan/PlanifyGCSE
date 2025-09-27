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
import { ChevronDown, ChevronUp } from "lucide-react";

export default function TopicSelectionPage() {
  const router = useRouter();
  const { data, updateModules, updateTopics, updateCurrentSubjectIndex } = useOnboarding();
  const [selectedModules, setSelectedModules] = useState<Record<string, boolean>>(data.selectedModules);
  const [selectedTopics, setSelectedTopics] = useState<Record<string, boolean>>(data.selectedTopics);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  // Get the current subject based on the index
  const currentSubjectId = data.selectedSubjects[data.currentSubjectIndex];
  const selectedSubject = subjects.find(s => s.id === currentSubjectId);
  const selectedExamBoardId = data.selectedExamBoards[currentSubjectId];
  const selectedExamBoard = selectedSubject?.examBoards.find(eb => eb.id === selectedExamBoardId);

  const isLastSubject = data.currentSubjectIndex === data.selectedSubjects.length - 1;
  const isFirstSubject = data.currentSubjectIndex === 0;

  useEffect(() => {
    setSelectedModules(data.selectedModules);
    setSelectedTopics(data.selectedTopics);
  }, [data.selectedModules, data.selectedTopics]);

  // Auto-select all modules when component mounts for current subject
  useEffect(() => {
    if (selectedExamBoard && currentSubjectId) {
      const currentSubjectModules = selectedExamBoard.modules;
      const hasCurrentSubjectModules = currentSubjectModules.some(module => 
        Object.keys(data.selectedModules).some(key => key.includes(currentSubjectId))
      );

      if (!hasCurrentSubjectModules) {
        const autoSelectedModules: Record<string, boolean> = {};
        const autoSelectedTopics: Record<string, boolean> = {};
        
        currentSubjectModules.forEach(module => {
          const moduleKey = `${currentSubjectId}-${module.id}`;
          autoSelectedModules[moduleKey] = true;
          module.topics.forEach(topic => {
            const topicKey = `${currentSubjectId}-${topic.id}`;
            autoSelectedTopics[topicKey] = true;
          });
        });
        
        setSelectedModules(prev => ({ ...prev, ...autoSelectedModules }));
        setSelectedTopics(prev => ({ ...prev, ...autoSelectedTopics }));
      }
    }
  }, [selectedExamBoard, currentSubjectId, data.selectedModules]);

  const toggleModule = (moduleId: string) => {
    const moduleKey = `${currentSubjectId}-${moduleId}`;
    const newSelection = {
      ...selectedModules,
      [moduleKey]: !selectedModules[moduleKey]
    };
    setSelectedModules(newSelection);
    
    // If selecting module, select all topics in that module
    if (!selectedModules[moduleKey]) {
      const module = selectedExamBoard?.modules.find(m => m.id === moduleId);
      if (module) {
        const topicUpdates: Record<string, boolean> = {};
        module.topics.forEach(topic => {
          const topicKey = `${currentSubjectId}-${topic.id}`;
          topicUpdates[topicKey] = true;
        });
        setSelectedTopics(prev => ({ ...prev, ...topicUpdates }));
      }
    }
  };

  const toggleTopic = (topicId: string) => {
    const topicKey = `${currentSubjectId}-${topicId}`;
    const newSelection = {
      ...selectedTopics,
      [topicKey]: !selectedTopics[topicKey]
    };
    setSelectedTopics(newSelection);
  };

  const toggleModuleExpansion = (moduleId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const handleContinue = () => {
    updateModules(selectedModules);
    updateTopics(selectedTopics);
    
    if (isLastSubject) {
      // Complete onboarding and redirect to dashboard
      router.push("/dashboard");
    } else {
      // Move to next subject
      updateCurrentSubjectIndex(data.currentSubjectIndex + 1);
    }
  };

  const handleBack = () => {
    if (isFirstSubject) {
      router.push("/onboarding/exam-boards");
    } else {
      updateCurrentSubjectIndex(data.currentSubjectIndex - 1);
    }
  };

  if (!selectedSubject || !selectedExamBoard) {
    return (
      <OnboardingLayout currentStep={3} totalSteps={3}>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">No Subject Selected</h1>
            <p className="text-muted-foreground mb-6">Please go back and select a subject and exam board.</p>
            <Button onClick={handleBack}>Go Back</Button>
          </div>
        </div>
      </OnboardingLayout>
    );
  }

  return (
    <OnboardingLayout currentStep={3} totalSteps={3}>
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
              Subject {data.currentSubjectIndex + 1} / {data.selectedSubjects.length}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-8 max-w-4xl">
          <StaggerContainer className="space-y-8">
            <StaggerItem>
              <div className="text-center space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  What topics are you studying for GCSE {selectedSubject.name}?
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {selectedSubject.hasOptionalModules 
                    ? "This subject has optional modules."
                    : "Since you're in Year 11 and this subject does not have optional modules, we've auto-selected all topics. You can adjust this as required."
                  }
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="space-y-4">
                {selectedExamBoard.modules.map((module) => {
                  const moduleKey = `${currentSubjectId}-${module.id}`;
                  return (
                    <Card key={module.id} className="p-4">
                      <div className="space-y-3">
                        {/* Module Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-base font-semibold text-foreground">
                              {module.name}
                            </h3>
                            {selectedModules[moduleKey] && (
                              <span className="text-sm text-primary font-medium">
                                Module selected ✓
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleModuleExpansion(module.id)}
                            >
                              {expandedModules[module.id] ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleModule(module.id)}
                            >
                              {selectedModules[moduleKey] ? "Remove All" : "Select All"}
                            </Button>
                          </div>
                        </div>

                        {/* Topics List */}
                        {expandedModules[module.id] && (
                          <div className="ml-4 space-y-2 border-l-2 border-muted pl-4">
                            {module.topics.map((topic) => {
                              const topicKey = `${currentSubjectId}-${topic.id}`;
                              return (
                                <div 
                                  key={topic.id}
                                  className="flex items-center justify-between py-1"
                                >
                                  <div className="flex items-center space-x-3">
                                    <input
                                      type="checkbox"
                                      checked={selectedTopics[topicKey] || false}
                                      onChange={() => toggleTopic(topic.id)}
                                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                                    />
                                    <span className="text-sm text-foreground">{topic.name}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex justify-between items-center pt-8">
                <Button variant="ghost" onClick={handleBack}>
                  ← Previous
                </Button>
                <Button 
                  onClick={handleContinue}
                  className="px-8"
                >
                  {isLastSubject ? "Complete Setup" : "Next Subject"}
                </Button>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </OnboardingLayout>
  );
}
