"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithGoogle, signInWithMicrosoft, signInWithEmail } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { 
  PageTransition, 
  FadeInUp, 
  StaggerContainer, 
  StaggerItem
} from "@/components/ui/animate";
import { LoadingOverlay, LoadingButton } from "@/components/ui/loading";
import { getFirebaseErrorMessage } from "@/lib/firebase-errors";


export default function LoginPage() {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [microsoftLoading, setMicrosoftLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Clear error when component mounts
  useEffect(() => {
    setError("");
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      setError("");
      await signInWithGoogle();
      router.push("/");
    } catch (error) {
      console.error("Google sign-in failed:", error);
      setError(getFirebaseErrorMessage(error));
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleMicrosoftSignIn = async () => {
    try {
      setMicrosoftLoading(true);
      setError("");
      await signInWithMicrosoft();
      router.push("/");
    } catch (error) {
      console.error("Microsoft sign-in failed:", error);
      setError(getFirebaseErrorMessage(error));
    } finally {
      setMicrosoftLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setEmailLoading(true);
      setError("");
      await signInWithEmail(email, password);
      router.push("/");
    } catch (error) {
      console.error("Email sign-in failed:", error);
      setError(getFirebaseErrorMessage(error));
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <StaggerContainer className="w-full max-w-md space-y-6">
          {/* Logo */}
          <StaggerItem>
            <div className="text-center">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground">PlanifyGCSE</h1>
              </div>
            </div>
          </StaggerItem>

          {/* Header */}
          <StaggerItem>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">
                Log in to your account
              </h2>
              <p className="text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Sign Up!
                </Link>
              </p>
            </div>
          </StaggerItem>

          {/* Error Message */}
          {error && (
            <StaggerItem>
              <div className="bg-orange-50 dark:bg-orange-100/30 border border-orange-200 dark:border-orange-300 rounded-md px-3 py-3 flex items-start justify-between gap-2">
                <div className="flex items-start gap-2 flex-1">
                  <svg className="w-4 h-4 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-orange-700 dark:text-orange-800 leading-relaxed">
                    {error}
                  </p>
                </div>
                <button
                  onClick={() => setError("")}
                  className="text-orange-500 hover:text-orange-700 dark:text-orange-600 dark:hover:text-orange-800 transition-colors flex-shrink-0 cursor-pointer mt-0.5"
                  aria-label="Close error message"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </StaggerItem>
          )}

          {/* Social Login Buttons */}
          <StaggerItem>
            <div className="space-y-3">
              <LoadingButton
                variant="outline" 
                className="w-full h-12 flex items-center justify-center gap-3 text-foreground border-input hover:bg-accent"
                onClick={handleGoogleSignIn}
                isLoading={googleLoading}
                loadingText="Signing in with Google..."
                disabled={microsoftLoading || emailLoading}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </LoadingButton>

              <LoadingButton
                variant="outline" 
                className="w-full h-12 flex items-center justify-center gap-3 text-foreground border-input hover:bg-accent"
                onClick={handleMicrosoftSignIn}
                isLoading={microsoftLoading}
                loadingText="Signing in with Microsoft..."
                disabled={googleLoading || emailLoading}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"/>
                </svg>
                Continue with Microsoft
              </LoadingButton>
            </div>
          </StaggerItem>

          {/* Divider */}
          <StaggerItem>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">or</span>
              </div>
            </div>
          </StaggerItem>

          {/* Login Form */}
          <StaggerItem>
            <form className="space-y-4" onSubmit={handleEmailSignIn}>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your Email Address"
                  className="h-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={googleLoading || microsoftLoading || emailLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your Password"
                  className="h-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={googleLoading || microsoftLoading || emailLoading}
                />
              </div>

              <LoadingButton
                type="submit" 
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                isLoading={emailLoading}
                loadingText="Signing in..."
                disabled={googleLoading || microsoftLoading}
              >
                Login
              </LoadingButton>

              <div className="text-center">
                <Link 
                  href="/forgot-password" 
                  className="text-primary hover:underline text-sm"
                >
                  Forgot your password?
                </Link>
              </div>
            </form>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </PageTransition>
  );
}
