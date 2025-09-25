"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithGoogle, signInWithMicrosoft, createAccount } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import { RECAPTCHA_ACTIONS } from "@/types/recaptcha.types";
import { getFirebaseErrorMessage } from "@/lib/firebase-errors";

export default function RegisterPage() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dateOfBirth: "",
    password: ""
  });
  const router = useRouter();
  const { executeRecaptcha, verifyRecaptcha } = useRecaptcha();

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError("");
      
      // Execute reCAPTCHA
      const token = await executeRecaptcha(RECAPTCHA_ACTIONS.GOOGLE_SIGNIN);
      if (!token) {
        throw new Error("reCAPTCHA verification failed");
      }

      // Verify reCAPTCHA on backend
      const isValid = await verifyRecaptcha(token, RECAPTCHA_ACTIONS.GOOGLE_SIGNIN);
      if (!isValid) {
        throw new Error("reCAPTCHA verification failed");
      }

      await signInWithGoogle();
      router.push("/");
    } catch (error) {
      console.error("Google sign-in failed:", error);
      setError(getFirebaseErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleMicrosoftSignIn = async () => {
    try {
      setLoading(true);
      setError("");
      
      // Execute reCAPTCHA
      const token = await executeRecaptcha(RECAPTCHA_ACTIONS.MICROSOFT_SIGNIN);
      if (!token) {
        throw new Error("reCAPTCHA verification failed");
      }

      // Verify reCAPTCHA on backend
      const isValid = await verifyRecaptcha(token, RECAPTCHA_ACTIONS.MICROSOFT_SIGNIN);
      if (!isValid) {
        throw new Error("reCAPTCHA verification failed");
      }

      await signInWithMicrosoft();
      router.push("/");
    } catch (error) {
      console.error("Microsoft sign-in failed:", error);
      setError(getFirebaseErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      
      // Execute reCAPTCHA
      const token = await executeRecaptcha(RECAPTCHA_ACTIONS.REGISTER);
      if (!token) {
        throw new Error("reCAPTCHA verification failed");
      }

      // Verify reCAPTCHA on backend
      const isValid = await verifyRecaptcha(token, RECAPTCHA_ACTIONS.REGISTER);
      if (!isValid) {
        throw new Error("reCAPTCHA verification failed");
      }

      const userCredential = await createAccount(formData.email, formData.password);
      
      // Send verification email after successful account creation
      try {
        const verifyResponse = await fetch('/api/send-verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email }),
        });
        
        if (!verifyResponse.ok) {
          console.warn('Failed to send verification email, but account was created successfully');
        }
      } catch (verifyError) {
        console.warn('Failed to send verification email:', verifyError);
      }
      
      router.push("/");
    } catch (error) {
      console.error("Registration failed:", error);
      setError(getFirebaseErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

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
            Create an Account To Build Your Revision Plan
          </h2>
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign In!
            </Link>
          </p>
        </div>

        {!showEmailForm ? (
          // Social Login Options
          <>
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

            {/* Social Login Buttons */}
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full h-12 flex items-center justify-center gap-3 text-foreground border-input hover:bg-accent"
                onClick={handleGoogleSignIn}
                disabled={loading}
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
              </Button>

              <Button 
                variant="outline" 
                className="w-full h-12 flex items-center justify-center gap-3 text-foreground border-input hover:bg-accent"
                onClick={handleMicrosoftSignIn}
                disabled={loading}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"/>
                </svg>
                Continue with Microsoft
              </Button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">or</span>
              </div>
            </div>

            {/* Email Sign Up */}
            <Button 
              variant="outline" 
              className="w-full h-12 flex items-center justify-center gap-3 text-foreground border-input hover:bg-accent"
              onClick={() => {
                setShowEmailForm(true);
                setError("");
              }}
              disabled={loading}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Sign Up With Email
            </Button>
          </>
        ) : (
          // Email Registration Form
          <form className="space-y-4" onSubmit={handleEmailRegister}>
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
              <Label htmlFor="name" className="text-sm font-medium text-foreground">
                Your Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Your Name"
                className="h-12"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Your Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Your Email Address"
                className="h-12"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth" className="text-sm font-medium text-foreground">
                Date of Birth
              </Label>
              <Input
                id="dateOfBirth"
                type="text"
                placeholder="DD/MM/YYYY"
                className="h-12"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Create a Password
              </Label>
              <p className="text-xs text-muted-foreground">Minimum of 8 characters.</p>
              <Input
                id="password"
                type="password"
                placeholder="Create a Password"
                className="h-12"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
                disabled={loading}
              />
            </div>


            <Button 
              type="submit" 
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>

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
              onClick={() => {
                setShowEmailForm(false);
                setError("");
              }}
              disabled={loading}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              Other Sign In Options
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
