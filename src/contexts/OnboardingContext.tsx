"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface OnboardingData {
  selectedSubjects: string[];
  selectedExamBoards: Record<string, string>;
  selectedModules: Record<string, boolean>;
  selectedTopics: Record<string, boolean>;
  currentSubjectIndex: number;
}

interface OnboardingContextType {
  data: OnboardingData;
  updateSubjects: (subjects: string[]) => void;
  updateExamBoards: (examBoards: Record<string, string>) => void;
  updateModules: (modules: Record<string, boolean>) => void;
  updateTopics: (topics: Record<string, boolean>) => void;
  updateCurrentSubjectIndex: (index: number) => void;
  resetOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const initialData: OnboardingData = {
  selectedSubjects: [],
  selectedExamBoards: {},
  selectedModules: {},
  selectedTopics: {},
  currentSubjectIndex: 0,
};

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<OnboardingData>(initialData);

  const updateSubjects = (subjects: string[]) => {
    setData(prev => ({ ...prev, selectedSubjects: subjects }));
  };

  const updateExamBoards = (examBoards: Record<string, string>) => {
    setData(prev => ({ ...prev, selectedExamBoards: examBoards }));
  };

  const updateModules = (modules: Record<string, boolean>) => {
    setData(prev => ({ ...prev, selectedModules: modules }));
  };

  const updateTopics = (topics: Record<string, boolean>) => {
    setData(prev => ({ ...prev, selectedTopics: topics }));
  };

  const updateCurrentSubjectIndex = (index: number) => {
    setData(prev => ({ ...prev, currentSubjectIndex: index }));
  };

  const resetOnboarding = () => {
    setData(initialData);
  };

  return (
    <OnboardingContext.Provider
      value={{
        data,
        updateSubjects,
        updateExamBoards,
        updateModules,
        updateTopics,
        updateCurrentSubjectIndex,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}
