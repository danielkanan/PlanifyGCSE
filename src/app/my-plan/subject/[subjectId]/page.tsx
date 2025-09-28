"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FadeInUp } from "@/components/ui/animate";
import { ConfidenceSelector } from "@/components/ui/confidence-selector";
import PlanLayout from "@/components/layout/PlanLayout";
import { Edit, Flag } from "lucide-react";

// Dummy data for subject-specific progress
const getSubjectProgressData = (subjectId: string) => {
  const subjectData = {
    geography: {
      name: "Geography",
      topics: [
        {
          name: "Physical Landscapes in the UK",
          subtopics: [
            { name: "The UK Physical Landscape", status: "Not yet studied" },
            { name: "Coastal Landscapes in the UK", status: "Not yet studied" },
            { name: "River Landscapes in the UK", status: "Not yet studied" },
            { name: "Glacial Landscapes in the UK", status: "Not yet studied" }
          ]
        },
        {
          name: "The Challenge of Resource Management",
          subtopics: [
            { name: "Resource Management", status: "Not yet studied" },
            { name: "Food", status: "Not yet studied" },
            { name: "Water", status: "Not yet studied" },
            { name: "Energy", status: "Not yet studied" }
          ]
        }
      ]
    },
    biology: {
      name: "Biology",
      topics: [
        {
          name: "Cell Biology",
          subtopics: [
            { name: "Cell Structure", status: "Not yet studied" },
            { name: "Cell Division", status: "Not yet studied" },
            { name: "Transport in Cells", status: "Not yet studied" },
            { name: "Cell Organisation", status: "Not yet studied" }
          ]
        },
        {
          name: "Organisation",
          subtopics: [
            { name: "Principles of Organisation", status: "Not yet studied" },
            { name: "Animal Tissues, Organs and Organ Systems", status: "Not yet studied" },
            { name: "Plant Tissues, Organs and Systems", status: "Not yet studied" }
          ]
        }
      ]
    },
    chemistry: {
      name: "Chemistry",
      topics: [
        {
          name: "Atomic Structure and the Periodic Table",
          subtopics: [
            { name: "A Simple Model of the Atom", status: "Not yet studied" },
            { name: "The Periodic Table", status: "Not yet studied" },
            { name: "Properties of Transition Metals", status: "Not yet studied" }
          ]
        }
      ]
    },
    physics: {
      name: "Physics",
      topics: [
        {
          name: "Forces",
          subtopics: [
            { name: "Forces and their Interactions", status: "Not yet studied" },
            { name: "Work Done and Energy Transfer", status: "Not yet studied" },
            { name: "Forces and Elasticity", status: "Not yet studied" }
          ]
        }
      ]
    }
  };

  return subjectData[subjectId as keyof typeof subjectData] || subjectData.geography;
};


export default function SubjectProgressPage() {
  const params = useParams();
  const subjectId = params.subjectId as string;
  const subjectData = getSubjectProgressData(subjectId);

  return (
    <PlanLayout currentPage="subject" subjectId={subjectId}>
      <FadeInUp>
        <div className="space-y-6">
          {/* Page Title */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Your {subjectData.name} Progress
              </h1>
              <p className="text-muted-foreground">
                Here, you can see your confidence levels in each of your {subjectData.name} topics.
              </p>
            </div>
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-1">
              <Flag className="w-4 h-4" />
              <span>Report a Problem</span>
            </button>
          </div>

          {/* Topics */}
          <div className="space-y-8">
            {subjectData.topics.map((topic, topicIndex) => (
              <div key={topicIndex} className="space-y-4">
                {/* Topic Name - Outside the card */}
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">
                    {topic.name}
                  </h2>
                  {topicIndex === 0 && (
                    <Button variant="outline" size="sm" className="text-muted-foreground">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit My Topics
                    </Button>
                  )}
                </div>
                
                {/* Subtopic Card */}
                <Card className="p-6 bg-card border border-border">
                  <div className="space-y-4">
                    {topic.subtopics.map((subtopic, subtopicIndex) => (
                      <div key={subtopicIndex} className="flex items-center justify-between py-4 border-b border-border last:border-b-0">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 rounded-full bg-foreground" />
                          <div>
                            <p className="text-foreground font-semibold text-lg">{subtopic.name}</p>
                            <p className="text-sm text-muted-foreground">{subtopic.status}</p>
                          </div>
                        </div>
                        <ConfidenceSelector />
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
