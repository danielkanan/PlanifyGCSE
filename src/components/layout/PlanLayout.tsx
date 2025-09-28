"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageTransition, FadeInUp } from "@/components/ui/animate";
import { LoadingOverlay } from "@/components/ui/loading";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Sun, 
  BarChart3, 
  Dna, 
  FlaskConical, 
  Atom, 
  Microscope
} from "lucide-react";

interface PlanLayoutProps {
  children: React.ReactNode;
  currentPage: 'plan' | 'progress' | 'subject';
  subjectId?: string;
}

export default function PlanLayout({ children, currentPage, subjectId }: PlanLayoutProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  useEffect(() => {
    // Clear localStorage on page reload
    const handleBeforeUnload = () => {
      localStorage.removeItem('selectedSubjects');
      localStorage.removeItem('examBoardSelections');
      localStorage.removeItem('selectedTopics');
      localStorage.removeItem('userName');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

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
    

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
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
      Microscope
    };
    return iconMap[iconName as keyof typeof iconMap] || Dna;
  };

  const getSubjectData = (subjectId: string) => {
    // This would normally come from Firestore, but for now we'll use dummy data
    const dummySubjects = [
      { id: 'biology', name: 'Biology', icon: 'Dna' },
      { id: 'chemistry', name: 'Chemistry', icon: 'FlaskConical' },
      { id: 'physics', name: 'Physics', icon: 'Atom' },
      { id: 'combined-science', name: 'Combined Science', icon: 'Microscope' }
    ];
    return dummySubjects.find(s => s.id === subjectId);
  };

  const handleSubjectClick = (subjectId: string) => {
    const subject = getSubjectData(subjectId);
    if (subject) {
      router.push(`/my-plan/subject/${subjectId}`);
    }
  };

  return (
      <div className="min-h-screen bg-background">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-card border-r border-border min-h-screen p-6">
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
                    <div 
                      className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
                        currentPage === 'plan' 
                          ? 'bg-primary/10 border border-primary/20' 
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => router.push('/my-plan')}
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
                      onClick={() => router.push('/my-plan/progress')}
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
                    {selectedSubjects.length > 0 ? (
                  selectedSubjects.map((currentSubjectId) => {
                    const subject = getSubjectData(currentSubjectId);
                        if (!subject) return null;
                        
                    const isActive = currentPage === 'subject' && currentSubjectId === subjectId;
                        
                        return (
                          <div 
                        key={currentSubjectId} 
                            className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
                              isActive 
                                ? 'bg-primary/10 border border-primary/20' 
                                : 'hover:bg-muted/50'
                            }`}
                        onClick={() => handleSubjectClick(currentSubjectId)}
                          >
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground">
                              {(() => {
                                const IconComponent = getIconComponent(subject.icon);
                                return <IconComponent className="w-4 h-4" />;
                              })()}
                            </div>
                            <span className={`${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {subject.name}
                            </span>
                          </div>
                        );
                      })
                    ) : (
                      // Fallback to dummy subjects if no localStorage data
                  ['biology', 'chemistry', 'physics'].map((currentSubjectId) => {
                    const subject = getSubjectData(currentSubjectId);
                        if (!subject) return null;
                        
                    const isActive = currentPage === 'subject' && currentSubjectId === subjectId;
                        
                        return (
                          <div 
                        key={currentSubjectId} 
                            className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
                              isActive 
                                ? 'bg-primary/10 border border-primary/20' 
                                : 'hover:bg-muted/50'
                            }`}
                        onClick={() => handleSubjectClick(currentSubjectId)}
                          >
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground">
                              {(() => {
                                const IconComponent = getIconComponent(subject.icon);
                                return <IconComponent className="w-4 h-4" />;
                              })()}
                            </div>
                            <span className={`${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {subject.name}
                            </span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                </div>
          </div>

        {/* Main Content */}
        <div className="flex-1 px-8 py-8">
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
