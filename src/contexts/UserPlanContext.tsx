"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { getUserPlan } from "@/lib/auth";

interface UserPlanContextType {
  userPlan: { subjects: { id: string; examBoardId?: string; papers?: { id: string; topics: { topicId: number }[] }[] }[] } | null;
  selectedSubjects: { id: string; examBoardId?: string }[];
  isLoading: boolean;
  refreshUserPlan: () => Promise<void>;
}

const UserPlanContext = createContext<UserPlanContextType | undefined>(undefined);

export function UserPlanProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [userPlan, setUserPlan] = useState<{ subjects: { id: string; examBoardId?: string; papers?: { id: string; topics: { topicId: number }[] }[] }[] } | null>(null);
  const [selectedSubjects, setSelectedSubjects] = useState<{ id: string; examBoardId?: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadUserPlan = useCallback(async () => {
    if (!user) {
      setUserPlan(null);
      setSelectedSubjects([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const plan = await getUserPlan(user);
      
      if (plan && plan.subjects) {
        setUserPlan(plan);
        setSelectedSubjects(plan.subjects);
      } else {
        setUserPlan(null);
        setSelectedSubjects([]);
      }
    } catch (error) {
      console.error("Error loading user plan:", error);
      setUserPlan(null);
      setSelectedSubjects([]);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const refreshUserPlan = async () => {
    await loadUserPlan();
  };

  useEffect(() => {
    loadUserPlan();
  }, [loadUserPlan]);

  return (
    <UserPlanContext.Provider value={{
      userPlan,
      selectedSubjects,
      isLoading,
      refreshUserPlan
    }}>
      {children}
    </UserPlanContext.Provider>
  );
}

export function useUserPlan() {
  const context = useContext(UserPlanContext);
  if (context === undefined) {
    throw new Error("useUserPlan must be used within a UserPlanProvider");
  }
  return context;
}
