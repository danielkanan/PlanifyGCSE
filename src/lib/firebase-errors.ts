import { FirebaseError } from "firebase/app";

/**
 * Converts Firebase error codes to user-friendly error messages
 */
export function getFirebaseErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      // Authentication errors
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please check your credentials and try again.';
      case 'auth/user-not-found':
        return 'No account found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/user-disabled':
        return 'This account has been disabled. Please contact support.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection and try again.';
      
      // Registration errors
      case 'auth/email-already-in-use':
        return 'An account with this email already exists. Please sign in instead.';
      case 'auth/weak-password':
        return 'Password is too weak. Please choose a stronger password.';
      case 'auth/operation-not-allowed':
        return 'This sign-in method is not enabled. Please contact support.';
      
      // reCAPTCHA errors
      case 'auth/captcha-check-failed':
        return 'reCAPTCHA verification failed. Please try again.';
      
      // Generic Firebase errors
      case 'auth/internal-error':
        return 'An internal error occurred. Please try again later.';
      case 'auth/invalid-api-key':
      case 'auth/invalid-app-credential':
        return 'Configuration error. Please contact support.';
      
      default:
        return 'An error occurred. Please try again.';
    }
  }
  
  if (error instanceof Error) {
    // Handle custom errors (like reCAPTCHA failures)
    if (error.message.includes('reCAPTCHA')) {
      return 'Security verification failed. Please try again.';
    }
    return error.message;
  }
  
  return 'An unexpected error occurred. Please try again.';
}
