"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import { RECAPTCHA_ACTIONS } from "@/types/recaptcha.types";
import { FirebaseError } from "firebase/app";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { executeRecaptcha, verifyRecaptcha } = useRecaptcha();

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      
      // Execute reCAPTCHA
      const token = await executeRecaptcha(RECAPTCHA_ACTIONS.FORGOT_PASSWORD);
      if (!token) {
        throw new Error("reCAPTCHA verification failed");
      }

      // Verify reCAPTCHA on backend
      const isValid = await verifyRecaptcha(token, RECAPTCHA_ACTIONS.FORGOT_PASSWORD);
      if (!isValid) {
        throw new Error("reCAPTCHA verification failed");
      }

      // Send custom password reset email via our API
      const response = await fetch('/api/send-reset-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to send reset email');
      }
      setSuccess(true);
    } catch (error) {
      console.error("Password reset failed:", error);
      
      // Handle API errors (from our custom backend)
      if (error instanceof Error) {
        setError(error.message);
      } else if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/user-not-found':
            setError("No account found with this email address");
            break;
          case 'auth/invalid-email':
            setError("Please enter a valid email address");
            break;
          case 'auth/too-many-requests':
            setError("Too many requests. Please try again later");
            break;
          default:
            setError("Failed to send reset email. Please try again");
        }
      } else {
        setError("An unexpected error occurred. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Logo */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-8">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">P</span>
              </div>
              <h1 className="text-3xl font-bold text-foreground">Planify</h1>
            </div>
          </div>

          <Card className="w-full">
            <CardHeader className="text-center space-y-2">
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
                <svg 
                  className="w-8 h-8 text-green-600 dark:text-green-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
              <CardTitle className="text-2xl font-semibold text-foreground">
                Check your email
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-muted-foreground">
                We've sent a password reset link to{" "}
                <span className="font-medium text-foreground">{email}</span>
              </p>
              <p className="text-center text-sm text-muted-foreground">
                If you don't see the email in your inbox, please check your spam folder.
              </p>
              <div className="space-y-3 pt-4">
                <Button 
                  onClick={() => router.push("/login")} 
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                >
                  Back to Login
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSuccess(false);
                    setEmail("");
                  }}
                  className="w-full h-12"
                >
                  Send another email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">P</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Planify</h1>
          </div>
        </div>

        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold text-foreground">
            Forgot your password?
          </h2>
          <p className="text-muted-foreground">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {/* Reset Form */}
        <Card className="w-full">
          <CardContent className="pt-6">
            <form className="space-y-4" onSubmit={handlePasswordReset}>
              {error && (
                <div className="p-4 rounded-lg bg-muted/50 border border-border/60 backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-sm text-foreground/90 leading-relaxed">{error}</p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="h-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send reset link"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Back to Login */}
        <div className="text-center">
          <Link 
            href="/login" 
            className="text-primary hover:underline text-sm inline-flex items-center gap-2"
          >
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
