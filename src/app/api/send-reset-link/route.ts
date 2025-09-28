import { NextRequest, NextResponse } from 'next/server';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { getFirebaseErrorMessage } from '@/lib/firebase-errors';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Send password reset email using Firebase
    await sendPasswordResetEmail(auth, email);

    return NextResponse.json(
      { message: 'Password reset email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Password reset error:', error);
    
    const errorMessage = getFirebaseErrorMessage(error);
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 400 }
    );
  }
}
