"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageTransition, FadeInUp } from "@/components/ui/animate";
import { LoadingOverlay } from "@/components/ui/loading";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
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
  X,
  LogOut,
  User
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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
  const [isInitialized, setIsInitialized] = useState(false);

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
      const mobile = window.innerWidth < 1080;
      setIsMobile(mobile);
      
      // If switching to desktop, close sidebar
      if (!mobile && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('resize', checkMobile);
    checkMobile(); // Check on mount
    setIsInitialized(true);

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
  }, [user, loading, router, sidebarOpen]);

  // Show loading overlay while checking authentication or initializing
  if (loading || !isInitialized) {
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


  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getInitials = (displayName: string | null, email: string | null) => {
    if (displayName) {
      return displayName
        .split(' ')
        .map(name => name.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    if (email) {
      return email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  // Prevent sidebar from opening on desktop
  const handleSidebarToggle = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    }
  };

  return (
      <div className="min-h-screen bg-background">
        {/* Mobile Header */}
        {isMobile && (
          <div className="sticky top-0 z-50 bg-background border-b border-border px-4 py-3 flex items-center justify-between">
            <button
              onClick={handleSidebarToggle}
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
        {isMobile && sidebarOpen && isInitialized && (
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={closeSidebar}
          />
        )}

        <div className="flex min-h-screen">
          {/* Sidebar */}
          <div className={`
            ${isMobile 
              ? `fixed inset-y-0 left-0 z-50 w-72 transform transition-all duration-300 ease-in-out ${
                  sidebarOpen && isInitialized ? 'translate-x-0' : '-translate-x-full'
                }` 
              : 'w-72 fixed top-0 left-0 h-screen'
            } 
            bg-gradient-to-b from-card via-card/95 to-card/90 backdrop-blur-sm border-r border-border/50 shadow-xl overflow-y-auto
          `}>
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-center mb-8 relative">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    PlanifyGCSE
                  </h1>
                  {isMobile && (
                    <button
                      onClick={closeSidebar}
                      className="absolute right-0 p-2 rounded-lg hover:bg-muted/50 transition-all duration-200 hover:scale-105"
                      aria-label="Close sidebar"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                
                {/* Your Planner Section */}
                <div className="mb-8">
                  <h2 className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider mb-4 flex items-center">
                    <div className="w-1 h-4 bg-gradient-to-b from-primary to-primary/60 rounded-full mr-3"></div>
                    Your Planner
                  </h2>
                  <div className="space-y-2">
                    <div 
                      className={`group flex items-center space-x-3 px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 ${
                        currentPage === 'plan' 
                          ? 'bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 shadow-sm' 
                          : 'hover:bg-muted/30 hover:shadow-sm'
                      }`}
                      onClick={() => {
                        router.push('/my-plan');
                        if (isMobile) closeSidebar();
                      }}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${
                        currentPage === 'plan' 
                          ? 'bg-primary/20 text-primary' 
                          : 'bg-muted/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                      }`}>
                        <Sun className="w-4 h-4" />
                      </div>
                      <span className={`font-medium transition-colors duration-200 ${
                        currentPage === 'plan' ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                      }`}>
                        Your Plan
                      </span>
                    </div>
                    <div 
                      className={`group flex items-center space-x-3 px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 ${
                        currentPage === 'progress' 
                          ? 'bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 shadow-sm' 
                          : 'hover:bg-muted/30 hover:shadow-sm'
                      }`}
                      onClick={() => {
                        router.push('/your-progress');
                        if (isMobile) closeSidebar();
                      }}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${
                        currentPage === 'progress' 
                          ? 'bg-primary/20 text-primary' 
                          : 'bg-muted/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                      }`}>
                        <BarChart3 className="w-4 h-4" />
                      </div>
                      <span className={`font-medium transition-colors duration-200 ${
                        currentPage === 'progress' ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                      }`}>
                        Your Progress
                      </span>
                    </div>
                  </div>
                </div>

                {/* Your Subjects Section */}
                <div>
                  <h2 className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider mb-4 flex items-center">
                    <div className="w-1 h-4 bg-gradient-to-b from-primary to-primary/60 rounded-full mr-3"></div>
                    Your Subjects
                  </h2>
                  <div className="space-y-2">
                    {isLoading ? (
                      <div className="flex items-center justify-center p-4 text-muted-foreground text-sm">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
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
                            className={`group flex items-center space-x-3 px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 ${
                              isActive 
                                ? 'bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 shadow-sm' 
                                : 'hover:bg-muted/30 hover:shadow-sm'
                            }`}
                        onClick={() => handleSubjectClick(subject.id)}
                          >
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${
                              isActive 
                                ? 'bg-primary/20 text-primary' 
                                : 'bg-muted/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                            }`}>
                              {(() => {
                                const IconComponent = getIconComponent(subjectIcon);
                                return <IconComponent className="w-4 h-4" />;
                              })()}
                            </div>
                            <span className={`font-medium transition-colors duration-200 ${
                              isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                            }`}>
                              {subjectName}
                            </span>
                          </div>
                        );
                      })
                    ) : (
                      <div className="flex items-center justify-center p-6 text-muted-foreground text-sm bg-muted/20 rounded-xl border border-dashed border-muted-foreground/20">
                        <div className="text-center">
                          <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p>No subjects selected</p>
                          <p className="text-xs mt-1">Create a plan to get started</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Profile Card */}
                <div className="mt-auto pt-6">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 cursor-pointer hover:bg-card/70 hover:border-border transition-all duration-200 group shadow-sm hover:shadow-md">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                            {getInitials(user?.displayName, user?.email)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-foreground truncate">
                              {user?.displayName || 'User'}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {user?.email}
                            </p>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <User className="w-4 h-4 text-muted-foreground" />
                          </div>
                        </div>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64 bg-card/95 backdrop-blur-sm border border-border/50 shadow-xl rounded-xl p-2">
                      <div className="flex items-center justify-start gap-3 p-3 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/10">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                          {getInitials(user?.displayName, user?.email)}
                        </div>
                        <div className="flex flex-col space-y-1 leading-none">
                          {user?.displayName && (
                            <p className="font-medium text-sm text-foreground">{user.displayName}</p>
                          )}
                          {user?.email && (
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          )}
                        </div>
                      </div>
                      <div className="mt-2">
                        <DropdownMenuItem 
                          onClick={handleSignOut} 
                          className="cursor-pointer text-red-600 focus:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg p-3 transition-all duration-200"
                        >
                          <LogOut className="mr-3 h-4 w-4" />
                          <span className="font-medium">Sign out</span>
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                </div>
          </div>

        {/* Main Content */}
        <div className={`flex-1 px-4 pt-4 pb-6 sm:px-8 sm:pt-12 sm:pb-12 ${!isMobile ? 'ml-72' : ''}`}>
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
