import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">P</span>
            </div>
            <span className="font-bold text-xl text-foreground">Planify</span>
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

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted/20 py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4">
              BUILD A GCSE REVISION PLANNER
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            A New Approach To{" "}
            <span className="text-primary">GCSE Revision</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Plan, track and structure your revision effectively. Use Planify&apos;s intelligent revision 
            planning tool to plan and ace your exams.
          </p>
          <div className="flex flex-col gap-4 justify-center items-center">
            <Link href="/register">
              <Button size="lg" className="px-8 py-3 text-base">
                Build a Revision Plan
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground">
              It&apos;s completely free. See how it works below!
            </p>
          </div>
        </div>
      </section>

      {/* Feature Section 1 - Revision Planning */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
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
            <div className="relative">
              <div className="w-full h-96 bg-muted/30 border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-muted/50 rounded-lg mx-auto mb-4"></div>
                  <p className="text-muted-foreground text-sm">Feature Image Placeholder</p>
                  <p className="text-muted-foreground text-xs">Revision Planning Interface</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 2 - Confidence Assessment */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="w-full h-96 bg-muted/30 border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-muted/50 rounded-lg mx-auto mb-4"></div>
                  <p className="text-muted-foreground text-sm">Feature Image Placeholder</p>
                  <p className="text-muted-foreground text-xs">Confidence Assessment Interface</p>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-6">
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
          </div>
        </div>
      </section>

      {/* Feature Section 3 - Pick up where you left off */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
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
            <div className="relative">
              <div className="w-full h-96 bg-muted/30 border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-muted/50 rounded-lg mx-auto mb-4"></div>
                  <p className="text-muted-foreground text-sm">Feature Image Placeholder</p>
                  <p className="text-muted-foreground text-xs">Progress Continuation Interface</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Overview Section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="w-full h-96 bg-muted/30 border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-muted/50 rounded-lg mx-auto mb-4"></div>
                  <p className="text-muted-foreground text-sm">Feature Image Placeholder</p>
                  <p className="text-muted-foreground text-xs">Progress Overview Interface</p>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-6">
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
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-t from-background to-muted/20">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Build Your Revision Plan Today
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            We&apos;ve built Sherpa&apos;s Revision Planner to help students who aren&apos;t 
            sure where to start with structuring their revision.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Build a plan, target your weakest topics and track your progress to ace your 
            GCSE exams.
          </p>
          <Link href="/register">
            <Button size="lg" className="px-8 py-3 text-base mb-4">
              Build a Revision Plan
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">P</span>
              </div>
              <span className="font-bold text-xl text-foreground">Planify</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Helping students structure a high-quality individualised 
              approach to exam revision.
            </p>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 Planify. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
