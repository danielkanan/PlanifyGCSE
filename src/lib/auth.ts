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
import { 
  doc, 
  getDoc, 
  setDoc, 
  serverTimestamp 
} from "firebase/firestore";
import { auth, db } from "./firebase";

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
    // Create user document if it doesn't exist
    await createUserDocument(result.user);
    return result;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

// Sign in with Microsoft
export const signInWithMicrosoft = async (): Promise<UserCredential> => {
  try {
    const result = await signInWithPopup(auth, microsoftProvider);
    // Create user document if it doesn't exist
    await createUserDocument(result.user);
    return result;
  } catch (error) {
    console.error("Error signing in with Microsoft:", error);
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
    // Create user document for new account
    await createUserDocument(result.user);
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

// Create user document in Firestore
export const createUserDocument = async (user: User): Promise<void> => {
  try {
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        onboardingCompleted: false,
        subjects: [],
        examBoard: null,
        topics: []
      });
    }
  } catch (error) {
    console.error("Error creating user document:", error);
    throw error;
  }
};

// Check if user is new (no user document exists)
export const isNewUser = async (user: User): Promise<boolean> => {
  try {
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    return !userDoc.exists();
  } catch (error) {
    console.error("Error checking if user is new:", error);
    return true; // Assume new user if error occurs
  }
};

// Check if user has completed onboarding
export const hasCompletedOnboarding = async (user: User): Promise<boolean> => {
  try {
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      return false;
    }
    
    const userData = userDoc.data();
    return userData?.onboardingCompleted || false;
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    return false;
  }
};
