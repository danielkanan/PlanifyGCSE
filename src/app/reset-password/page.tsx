"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { auth } from "@/lib/firebase";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oobCode, setOobCode] = useState<string | null>(null);
  const [validatingCode, setValidatingCode] = useState(true);

  useEffect(() => {
    // Get the oobCode from URL parameters and validate it
    const code = searchParams.get('oobCode');
    if (code) {
      // Validate the code with Firebase
      verifyPasswordResetCode(auth, code)
        .then(() => {
          setOobCode(code);
          setValidatingCode(false);
        })
        .catch((error) => {
          console.error("Invalid reset code:", error);
          setOobCode(null);
          setValidatingCode(false);
        });
    } else {
      setValidatingCode(false);
    }
  }, [searchParams]);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!password.trim()) {
      setError("Please enter a new password");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!oobCode) {
      setError("Invalid or expired reset link. Please request a new one.");
      return;
    }

    try {
      setLoading(true);
      
      // Use Firebase client SDK to confirm password reset
      await confirmPasswordReset(auth, oobCode, password);
      setSuccess(true);
    } catch (error: unknown) {
      console.error("Password reset failed:", error);
      
      // Handle specific Firebase errors
      if (error && typeof error === 'object' && 'code' in error) {
        switch (error.code) {
          case 'auth/expired-action-code':
            setError("Reset link has expired. Please request a new one.");
            break;
          case 'auth/invalid-action-code':
            setError("Invalid reset link. Please request a new one.");
            break;
          case 'auth/weak-password':
            setError("Password is too weak. Please choose a stronger password.");
            break;
          case 'auth/user-disabled':
            setError("This account has been disabled. Please contact support.");
            break;
          default:
            if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
              setError(error.message);
            } else {
              setError("An unexpected error occurred. Please try again");
            }
        }
      } else if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
        setError(error.message);
      } else {
        setError("An unexpected error occurred. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  if (validatingCode) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Logo */}
          <div className="text-center">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground">PlanifyGCSE</h1>
              </div>
          </div>

          <Card className="w-full">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-3 text-muted-foreground">Validating reset link...</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Logo */}
          <div className="text-center">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground">PlanifyGCSE</h1>
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
                Password Reset Successful!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-muted-foreground">
                Your password has been successfully reset. You can now sign in with your new password.
              </p>
              <div className="space-y-3 pt-4">
                <Button 
                  asChild
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                >
                  <Link href="/login">
                    Sign In Now
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!oobCode) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Logo */}
          <div className="text-center">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground">PlanifyGCSE</h1>
              </div>
          </div>

          <Card className="w-full">
            <CardHeader className="text-center space-y-2">
              <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                <svg 
                  className="w-8 h-8 text-red-600 dark:text-red-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>
              <CardTitle className="text-2xl font-semibold text-foreground">
                Invalid Reset Link
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-muted-foreground">
                This password reset link is invalid or has expired. Please request a new one.
              </p>
              <div className="space-y-3 pt-4">
                <Button 
                  asChild
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                >
                  <Link href="/forgot-password">
                    Request New Reset Link
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  asChild
                  className="w-full h-12"
                >
                  <Link href="/login">
                    Back to Sign In
                  </Link>
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
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground">PlanifyGCSE</h1>
              </div>
        </div>

        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold text-foreground">
            Create New Password
          </h2>
          <p className="text-muted-foreground">
            Enter a strong new password for your account.
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
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  New Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your new password"
                  className="h-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  minLength={8}
                />
                <p className="text-xs text-muted-foreground">
                  Must be at least 8 characters long
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                  Confirm New Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your new password"
                  className="h-12"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                disabled={loading}
              >
                {loading ? "Updating Password..." : "Update Password"}
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
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground">PlanifyGCSE</h1>
              </div>
          </div>
          <Card className="w-full">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-3 text-muted-foreground">Loading...</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
