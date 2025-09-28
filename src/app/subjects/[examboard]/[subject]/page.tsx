"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeInUp } from "@/components/ui/animate";
import { ConfidenceSelector } from "@/components/ui/confidence-selector";
import PlanLayout from "@/components/layout/PlanLayout";
import { useUserPlan } from "@/contexts/UserPlanContext";
import { Edit } from "lucide-react";
import { getPapersBySubjectAndBoard, getSubjectNameFromId } from "@/lib/subject-data";

export default function SubjectProgressPage() {
  const params = useParams();
  const router = useRouter();
  const examBoard = params.examboard as string;
  const subject = params.subject as string;
  const { userPlan } = useUserPlan();
  
  // Get all papers for this subject
  const allPapers = getPapersBySubjectAndBoard(examBoard, subject);
  const subjectName = getSubjectNameFromId(subject, examBoard);
  
  // Get papers and topics from user's saved plan
  const userSubject = userPlan?.subjects?.find((s: { id: string }) => s.id === subject);
  const papers = userSubject?.papers?.map((userPaper: { id: string; topics: { topicId: number }[] }) => {
    // Find the corresponding paper in the exam board data
    const examBoardPaper = allPapers.find(p => p.id === userPaper.id);
    if (!examBoardPaper) return null;
    
    // Map topic IDs to topic objects with names
    const topics = userPaper.topics.map((topicData: { topicId: number }) => {
      const topic = examBoardPaper.topics.find(t => t.topicId === topicData.topicId);
      return topic || { id: `topic-${topicData.topicId}`, name: `Topic ${topicData.topicId}` }; // fallback if topic not found
    });
    
    return {
      ...examBoardPaper,
      topics
    };
  }).filter((paper): paper is NonNullable<typeof paper> => paper !== null) || [];

  return (
    <PlanLayout currentPage="subject" subjectId={subject}>
      <FadeInUp>
        <div className="space-y-6">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {subjectName}
            </h1>
            <p className="text-muted-foreground">
              See your confidence levels in your topics.
            </p>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {examBoard.toUpperCase()}
                </Badge>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-muted-foreground text-xs h-7 px-2 border-border bg-background hover:bg-muted"
                onClick={() => router.push(`/edit/subjects/${examBoard}/${subject}`)}
              >
                <Edit className="w-3 h-3 mr-1" />
                Edit My Topics
              </Button>
            </div>
          </div>

          {/* Papers */}
          <div className="space-y-8">
            {papers.map((paper, paperIndex: number) => (
              <div key={paperIndex} className="space-y-4">
                {/* Paper Name - Outside the card */}
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-foreground">
                    {paper.name}
                  </h2>
                </div>
                
                {/* Topics Card */}
                <Card className="p-3 bg-card border border-border">
                    <div className="space-y-1">
                       {paper.topics.map((topic, topicIndex: number) => (
                       <div key={topicIndex} className="py-2 -mx-3 px-3 border-b border-border last:border-b-0">
                         {/* Desktop layout (640px and above) */}
                         <div className="hidden sm:flex items-center justify-between">
                           <div className="flex items-center space-x-3">
                             <div className="w-2 h-2 rounded-full bg-foreground" />
                             <div>
                               <p className="text-foreground font-semibold text-sm">{topic.name}</p>
                               <p className="text-xs text-muted-foreground">Not yet studied</p>
                             </div>
                           </div>
                           <ConfidenceSelector />
                         </div>
                         
                         {/* Mobile layout (below 640px) */}
                         <div className="sm:hidden space-y-3">
                           <div className="flex items-center space-x-3">
                             <div className="w-2 h-2 rounded-full bg-foreground" />
                             <div>
                               <p className="text-foreground font-semibold text-sm">{topic.name}</p>
                               <p className="text-xs text-muted-foreground">Not yet studied</p>
                             </div>
                           </div>
                           <div>
                             <ConfidenceSelector />
                           </div>
                         </div>
                       </div>
                      ))}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </FadeInUp>
    </PlanLayout>
  );
}
