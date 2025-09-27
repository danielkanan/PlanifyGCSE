"use client";

import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
  signOut,
  sendPasswordResetEmail,
  User,
  UserCredential
} from "firebase/auth";
import { auth } from "./firebase";

// Initialize providers
const googleProvider = new GoogleAuthProvider();
const microsoftProvider = new OAuthProvider('microsoft.com');

// Configure Microsoft provider
microsoftProvider.setCustomParameters({
  prompt: 'select_account',
});

// Configure Google provider
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// Sign in with Google
export const signInWithGoogle = async (): Promise<UserCredential> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result;
  } catch (error: any) {
    console.error("Error signing in with Google:", error);
    
    // Handle popup cancellation
    if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
      throw new Error('Sign-in was cancelled');
    }
    
    throw error;
  }
};

// Sign in with Microsoft
export const signInWithMicrosoft = async (): Promise<UserCredential> => {
  try {
    const result = await signInWithPopup(auth, microsoftProvider);
    return result;
  } catch (error: any) {
    console.error("Error signing in with Microsoft:", error);
    
    // Handle popup cancellation
    if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
      throw new Error('Sign-in was cancelled');
    }
    
    throw error;
  }
};

// Sign in with email and password
export const signInWithEmail = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;
  } catch (error) {
    console.error("Error signing in with email:", error);
    throw error;
  }
};

// Create account with email and password
export const createAccount = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result;
  } catch (error) {
    console.error("Error creating account:", error);
    throw error;
  }
};

// Sign out
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Send password reset email
export const sendPasswordReset = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
};

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};
