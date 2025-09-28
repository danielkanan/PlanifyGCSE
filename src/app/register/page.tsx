"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithGoogle, signInWithMicrosoft, createAccount, hasCompletedOnboarding } from "@/lib/auth";
import { validateEmail, validatePassword, validateConfirmPassword, sanitizeInput } from "@/lib/validation";
import { getFirebaseErrorMessage } from "@/lib/firebase-errors";
import { useRouter } from "next/navigation";
import { 
  PageTransition, 
  StaggerContainer, 
  StaggerItem
} from "@/components/ui/animate";
import { LoadingButton } from "@/components/ui/loading";

export default function RegisterPage() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [loadingStates, setLoadingStates] = useState({
    google: false,
    microsoft: false,
    email: false
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState<{ 
    email?: string; 
    password?: string; 
    confirmPassword?: string;
    general?: string;
  }>({});
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      setLoadingStates(prev => ({ ...prev, google: true }));
      const result = await signInWithGoogle();
      const onboardingCompleted = await hasCompletedOnboarding(result.user);
      
      // Redirect based on onboarding status
      router.push(onboardingCompleted ? "/my-plan" : "/create-plan/subjects");
    } catch (error) {
      console.error("Google sign-in failed:", error);
      setErrors({ general: getFirebaseErrorMessage(error) });
    } finally {
      setLoadingStates(prev => ({ ...prev, google: false }));
    }
  };

  const handleMicrosoftSignIn = async () => {
    try {
      setLoadingStates(prev => ({ ...prev, microsoft: true }));
      const result = await signInWithMicrosoft();
      const onboardingCompleted = await hasCompletedOnboarding(result.user);
      
      // Redirect based on onboarding status
      router.push(onboardingCompleted ? "/my-plan" : "/create-plan/subjects");
    } catch (error) {
      console.error("Microsoft sign-in failed:", error);
      setErrors({ general: getFirebaseErrorMessage(error) });
    } finally {
      setLoadingStates(prev => ({ ...prev, microsoft: false }));
    }
  };

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});
    
    // Validate inputs
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);
    const confirmPasswordValidation = validateConfirmPassword(formData.password, formData.confirmPassword);
    
    if (!emailValidation.isValid || !passwordValidation.isValid || !confirmPasswordValidation.isValid) {
      setErrors({
        email: emailValidation.error,
        password: passwordValidation.error,
        confirmPassword: confirmPasswordValidation.error
      });
      return;
    }
    
    try {
      setLoadingStates(prev => ({ ...prev, email: true }));
      const sanitizedEmail = sanitizeInput(formData.email);
      await createAccount(sanitizedEmail, formData.password);
      // New users always go to create-plan
      router.push("/create-plan/subjects");
    } catch (error) {
      console.error("Registration failed:", error);
      setErrors({ 
        email: getFirebaseErrorMessage(error)
      });
    } finally {
      setLoadingStates(prev => ({ ...prev, email: false }));
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
                Create an Account To Build Your Revision Plan
              </h2>
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign In!
                </Link>
              </p>
            </div>
          </StaggerItem>

          {!showEmailForm ? (
            // Social Login Options
            <>
              {/* Error Display */}
              {errors.general && (
                <StaggerItem>
                  <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-sm text-red-700 dark:text-red-300 leading-relaxed">{errors.general}</p>
                    </div>
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
                    isLoading={loadingStates.google}
                    loadingText="Signing up..."
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
                    isLoading={loadingStates.microsoft}
                    loadingText="Signing up..."
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

              {/* Email Sign Up */}
              <StaggerItem>
                <Button 
                  variant="outline" 
                  className="w-full h-12 flex items-center justify-center gap-3 text-foreground border-input hover:bg-accent"
                  onClick={() => setShowEmailForm(true)}
                  disabled={loadingStates.google || loadingStates.microsoft}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Sign Up With Email
                </Button>
              </StaggerItem>
          </>
          ) : (
            // Email Registration Form
            <StaggerItem>
              <form className="space-y-4" onSubmit={handleEmailRegister}>
                {/* Error Display */}
                {errors.general && (
                  <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-sm text-red-700 dark:text-red-300 leading-relaxed">{errors.general}</p>
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">
                    Your Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your Email Address"
                    className={`h-12 ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    disabled={loadingStates.email}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    Create a Password
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Must be at least 8 characters with uppercase, lowercase, number, and special character.
                  </p>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a Password"
                    className={`h-12 ${errors.password ? 'border-red-500 focus:border-red-500' : ''}`}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    required
                    disabled={loadingStates.email}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your Password"
                    className={`h-12 ${errors.confirmPassword ? 'border-red-500 focus:border-red-500' : ''}`}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    required
                    disabled={loadingStates.email}
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                  )}
                </div>

                <LoadingButton
                  type="submit" 
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                  isLoading={loadingStates.email}
                  loadingText="Creating Account..."
                >
                  Create Account
                </LoadingButton>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">or</span>
                  </div>
                </div>

                {/* Back to Social Options */}
                <Button 
                  type="button"
                  variant="outline" 
                  className="w-full h-12 flex items-center justify-center gap-3 text-foreground border-input hover:bg-accent"
                  onClick={() => setShowEmailForm(false)}
                  disabled={loadingStates.email}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  Other Sign In Options
                </Button>
              </form>
            </StaggerItem>
          )}
        </StaggerContainer>
      </div>
    </PageTransition>
  );
}
