"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageTransition, FadeInUp } from "@/components/ui/animate";
import { LoadingOverlay } from "@/components/ui/loading";
import { useAuth } from "@/contexts/AuthContext";
import { useUserPlan } from "@/contexts/UserPlanContext";
import { examBoards } from "@/lib/subject-data";
import { 
  Sun, 
  BarChart3, 
  Dna, 
  FlaskConical, 
  Atom, 
  Microscope,
  Calculator,
  BookOpen,
  Briefcase,
  Monitor,
  Menu,
  X
} from "lucide-react";

interface PlanLayoutProps {
  children: React.ReactNode;
  currentPage: 'plan' | 'progress' | 'subject';
  subjectId?: string;
}

export default function PlanLayout({ children, currentPage, subjectId }: PlanLayoutProps) {
  const { user, loading } = useAuth();
  const { userPlan, selectedSubjects, isLoading } = useUserPlan();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Clear localStorage on page reload
    const handleBeforeUnload = () => {
      localStorage.removeItem('selectedSubjects');
      localStorage.removeItem('examBoardSelections');
      localStorage.removeItem('selectedTopics');
      localStorage.removeItem('userName');
    };

    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1080);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('resize', checkMobile);
    checkMobile(); // Check on mount

    // Redirect to login if not authenticated
    if (!loading && !user) {
      router.push('/login');
      return;
    }

    // User plan is now managed by UserPlanContext
    

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('resize', checkMobile);
    };
  }, [user, loading, router]);

  // Show loading overlay while checking authentication
  if (loading) {
    return (
      <LoadingOverlay isLoading={true} message="Loading...">
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
      Microscope,
      Calculator,
      BookOpen,
      Briefcase,
      Monitor
    };
    return iconMap[iconName as keyof typeof iconMap] || Dna;
  };

  const getSubjectData = (subjectId: string) => {
    // Get subject data from user's plan
    if (userPlan && userPlan.subjects) {
      return userPlan.subjects.find((s: { id: string }) => s.id === subjectId);
    }
    return null;
  };

  const handleSubjectClick = (subjectId: string) => {
    const subject = getSubjectData(subjectId);
    if (subject) {
      // Use the exam board from the user's plan
      const examBoardId = subject.examBoardId || 'aqa';
      
      // Check if subject has tiers (mathematics, combined-science)
      if (subjectId === 'mathematics' || subjectId === 'combined-science') {
        // Default to higher tier for now
        router.push(`/subjects/${examBoardId}/${subjectId}/higher`);
      } else {
        router.push(`/subjects/${examBoardId}/${subjectId}`);
      }
      if (isMobile) closeSidebar();
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
      <div className="h-screen bg-background overflow-hidden">
        {/* Mobile Header */}
        {isMobile && (
          <div className="sticky top-0 z-50 bg-background border-b border-border px-4 py-3 flex items-center justify-between">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-muted transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-bold text-primary">PlanifyGCSE</h1>
            <div className="w-9" /> {/* Spacer for centering */}
          </div>
        )}

        {/* Mobile Overlay */}
        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={closeSidebar}
          />
        )}

        <div className="flex h-screen">
          {/* Sidebar */}
          <div className={`
            ${isMobile 
              ? `fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${
                  sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }` 
              : 'w-64 sticky top-0 h-screen'
            } 
            bg-card border-r border-border p-6 overflow-y-auto
          `}>
              <div className="mb-8">
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-2xl font-bold text-primary">
                    PlanifyGCSE
                  </h1>
                  {isMobile && (
                    <button
                      onClick={closeSidebar}
                      className="p-2 rounded-md hover:bg-muted transition-colors"
                      aria-label="Close sidebar"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                
                {/* Your Planner Section */}
                <div className="mb-6">
                  <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                    Your Planner
                  </h2>
                  <div className="space-y-2">
                    <div 
                      className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
                        currentPage === 'plan' 
                          ? 'bg-primary/10 border border-primary/20' 
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => {
                        router.push('/my-plan');
                        if (isMobile) closeSidebar();
                      }}
                    >
                      <Sun className={`w-5 h-5 ${currentPage === 'plan' ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className={`font-medium ${currentPage === 'plan' ? 'text-foreground' : 'text-muted-foreground'}`}>
                        Your Plan
                      </span>
                    </div>
                    <div 
                      className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
                        currentPage === 'progress' 
                          ? 'bg-primary/10 border border-primary/20' 
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => {
                        router.push('/your-progress');
                        if (isMobile) closeSidebar();
                      }}
                    >
                      <BarChart3 className={`w-5 h-5 ${currentPage === 'progress' ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className={`font-medium ${currentPage === 'progress' ? 'text-foreground' : 'text-muted-foreground'}`}>
                        Your Progress
                      </span>
                    </div>
                  </div>
                </div>

                {/* Your Subjects Section */}
                <div>
                  <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                    Your Subjects
                  </h2>
                  <div className="space-y-2">
                    {isLoading ? (
                      <div className="text-muted-foreground text-sm">
                        Loading subjects...
                      </div>
                    ) : selectedSubjects.length > 0 ? (
                  selectedSubjects.map((subject) => {
                    if (!subject) return null;
                        
                    const isActive = currentPage === 'subject' && subject.id === subjectId;
                    
                    // Get subject data from exam board to derive name and icon
                    const examBoard = examBoards.find(board => board.id === subject.examBoardId);
                    let subjectData = examBoard?.subjects.find(s => s.id === subject.id);
                    
                    // If not found, try to find by base subject ID (for tiered subjects)
                    if (!subjectData) {
                      const baseSubjectId = subject.id.replace(/-higher$|-foundation$/, '');
                      subjectData = examBoard?.subjects.find(s => s.id === baseSubjectId);
                    }
                    
                    // If still not found, try to find by tiered version
                    if (!subjectData) {
                      subjectData = examBoard?.subjects.find(s => s.id === `${subject.id}-higher`) ||
                                   examBoard?.subjects.find(s => s.id === `${subject.id}-foundation`);
                    }
                    
                    const subjectName = subjectData?.name || subject.id;
                    const subjectIcon = subjectData?.icon || 'BookOpen';
                        
                        return (
                          <div 
                        key={subject.id} 
                            className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
                              isActive 
                                ? 'bg-primary/10 border border-primary/20' 
                                : 'hover:bg-muted/50'
                            }`}
                        onClick={() => handleSubjectClick(subject.id)}
                          >
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground">
                              {(() => {
                                const IconComponent = getIconComponent(subjectIcon);
                                return <IconComponent className="w-4 h-4" />;
                              })()}
                            </div>
                            <span className={`${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {subjectName}
                            </span>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-muted-foreground text-sm">
                        No subjects selected
                      </div>
                    )}
                  </div>
                </div>

                </div>
          </div>

        {/* Main Content */}
        <div className="flex-1 px-4 pt-4 pb-6 sm:px-8 sm:pt-12 sm:pb-12 overflow-y-auto">
          <PageTransition>
            <FadeInUp>
              <div className="w-full">
                {/* Header */}
                <div className="mb-8">
                </div>

                {/* Content */}
                {children}
              </div>
            </FadeInUp>
          </PageTransition>
          </div>
        </div>
      </div>
  );
}
