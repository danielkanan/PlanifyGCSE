"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { 
  PageTransition, 
  FadeInUp, 
  StaggerContainer, 
  StaggerItem,
  SlideInFromLeft,
  SlideInFromRight,
  ScrollFadeInUp,
  ScrollSlideInFromLeft,
  ScrollSlideInFromRight,
  ScrollStaggerContainer,
  ScrollStaggerItem
} from "@/components/ui/animate";

export default function HomePage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <FadeInUp>
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xl text-foreground">PlanifyGCSE</span>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/login">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </header>
      </FadeInUp>

      {/* Hero Section */}
      <section className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background via-muted/30 to-muted/60 px-4 flex items-center justify-center">
        <StaggerContainer className="container mx-auto text-center max-w-4xl">
          <StaggerItem>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              A New Approach To<br />
              <span className="text-primary">Revision Timetables</span>
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Plan, track and structure your revision effectively.
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="flex flex-col gap-4 justify-center items-center">
              <Link href="/register">
                <Button 
                  size="lg" 
                  className="px-8 py-4 text-base font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Build a Revision Plan
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground">
                It&apos;s completely free. See how it works below!
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* Feature Section 1 - Revision Planning */}
      <section className="py-20 px-4 bg-gradient-to-b from-muted/60 via-muted/40 to-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollSlideInFromLeft>
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    A new approach to revision planning
                  </h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Generate targeted revision plans that align with a time frame that 
                  you choose. A Revision Plan is made which fits in your schedule and uses 
                  your available revision hours and time before your exam deadline.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-foreground">Smart scheduling based on your availability</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-foreground">Adaptive to your exam deadlines</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-foreground">Personalized study sessions</span>
                  </div>
                </div>
              </div>
            </ScrollSlideInFromLeft>
            <ScrollSlideInFromRight>
              <div className="w-full h-96 bg-muted/30 border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-muted/50 rounded-lg mx-auto mb-4"></div>
                  <p className="text-muted-foreground text-sm">Feature Image Placeholder</p>
                  <p className="text-muted-foreground text-xs">Revision Planning Interface</p>
                </div>
              </div>
            </ScrollSlideInFromRight>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="container mx-auto px-4">
        <Separator className="w-3/4 mx-auto" />
      </div>

      {/* Feature Section 2 - Confidence Assessment */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <ScrollSlideInFromLeft>
                <div className="w-full h-96 bg-muted/30 border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-muted/50 rounded-lg mx-auto mb-4"></div>
                    <p className="text-muted-foreground text-sm">Feature Image Placeholder</p>
                    <p className="text-muted-foreground text-xs">Confidence Assessment Interface</p>
                  </div>
                </div>
              </ScrollSlideInFromLeft>
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <ScrollSlideInFromRight>
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                      Automatically pinpoint your weakest topics
                    </h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Track your confidence level in a topic both before you study it. Use 
                    our system to identify and focus your revision time on areas where you&apos;re 
                    struggling most and need additional study time.
                  </p>
                </div>
              </ScrollSlideInFromRight>
            </div>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="container mx-auto px-4">
        <Separator className="w-3/4 mx-auto" />
      </div>

      {/* Feature Section 3 - Pick up where you left off */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollSlideInFromLeft>
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    Pick up where you left off
                  </h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Leave notes after each session with what you did and what you 
                  want to work on next so you can pick up right where you left off.
                </p>
              </div>
            </ScrollSlideInFromLeft>
            <ScrollSlideInFromRight>
              <div className="w-full h-96 bg-muted/30 border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-muted/50 rounded-lg mx-auto mb-4"></div>
                  <p className="text-muted-foreground text-sm">Feature Image Placeholder</p>
                  <p className="text-muted-foreground text-xs">Progress Continuation Interface</p>
                </div>
              </div>
            </ScrollSlideInFromRight>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="container mx-auto px-4">
        <Separator className="w-3/4 mx-auto" />
      </div>

      {/* Progress Overview Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <ScrollSlideInFromLeft>
                <div className="w-full h-96 bg-muted/30 border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-muted/50 rounded-lg mx-auto mb-4"></div>
                    <p className="text-muted-foreground text-sm">Feature Image Placeholder</p>
                    <p className="text-muted-foreground text-xs">Progress Overview Interface</p>
                  </div>
                </div>
              </ScrollSlideInFromLeft>
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <ScrollSlideInFromRight>
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-primary font-bold">4</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                      See an overview of your progress
                    </h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    See which topics you need to spend more time studying. 
                    Keep your study goals clear and your progress visible as you 
                    work through different topics.
                  </p>
                </div>
              </ScrollSlideInFromRight>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background via-muted/20 to-muted/40">
        <ScrollStaggerContainer className="container mx-auto text-center max-w-4xl">
          <ScrollStaggerItem>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Build Your Revision Plan Today
            </h2>
          </ScrollStaggerItem>
          <ScrollStaggerItem>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              We&apos;ve built Sherpa&apos;s Revision Planner to help students who aren&apos;t 
              sure where to start with structuring their revision.
            </p>
          </ScrollStaggerItem>
          <ScrollStaggerItem>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Build a plan, target your weakest topics and track your progress to ace your 
              GCSE exams.
            </p>
          </ScrollStaggerItem>
          <ScrollStaggerItem>
            <div className="flex flex-col gap-4 justify-center items-center">
              <Link href="/register">
                <Button 
                  size="lg" 
                  className="px-10 py-4 text-lg font-bold bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/95 hover:via-primary/85 hover:to-primary/75 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-primary/20 hover:border-primary/40"
                >
                  Build a Revision Plan
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground font-medium">
                Start your journey to exam success today
              </p>
            </div>
          </ScrollStaggerItem>
        </ScrollStaggerContainer>
      </section>

      {/* Footer */}
      <ScrollFadeInUp>
        <footer className="border-t bg-gradient-to-b from-muted/40 via-card to-card py-12">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center space-x-2">
                <span className="font-bold text-xl text-foreground">PlanifyGCSE</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Helping students structure a high-quality individualised 
                approach to exam revision.
              </p>
            </div>
            
            <div className="border-t mt-8 pt-8 text-center">
              <p className="text-sm text-muted-foreground">
                © 2025 PlanifyGCSE. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </ScrollFadeInUp>
      </div>
    </PageTransition>
  );
}
