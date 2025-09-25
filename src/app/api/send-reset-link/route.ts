import { NextRequest, NextResponse } from 'next/server';
import admin from '@/lib/firebaseAdmin';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Generate password reset link with Firebase Admin
    const actionCodeSettings = {
      url: `https://planifygcse.com/reset-password`,
      handleCodeInApp: true,
    };

    const firebaseResetLink = await admin.auth().generatePasswordResetLink(email, actionCodeSettings);
    
    // Extract the oobCode from Firebase's link to create our custom link
    const url = new URL(firebaseResetLink);
    const oobCode = url.searchParams.get('oobCode');
    
    // Create custom reset link that goes to our custom page
    const customResetLink = `https://planifygcse.com/reset-password?oobCode=${oobCode}`;

    // Send custom email via Resend
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'noreply@planifygcse.com',
      to: email,
      subject: 'Reset your PlanifyGCSE password',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password - Planify</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap');
          </style>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%); min-height: 100vh;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            
            <!-- Header with Logo -->
            <div style="text-align: center; margin-bottom: 40px;">
              <div style="display: inline-flex; align-items: center; gap: 12px; margin-bottom: 24px;">
                <div style="width: 48px; height: 48px; background: #212121; border-radius: 10px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(33, 33, 33, 0.15);">
                  <span style="color: #fafafa; font-weight: 700; font-size: 20px; font-family: 'Geist', sans-serif;">P</span>
                </div>
                <h1 style="color: #212121; margin: 0; font-size: 32px; font-weight: 700; font-family: 'Geist', sans-serif;">Planify</h1>
              </div>
            </div>

            <!-- Main Card -->
            <div style="background: #ffffff; border-radius: 10px; padding: 48px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); border: 1px solid #e5e5e5;">
              
              <!-- Icon and Title -->
              <div style="text-align: center; margin-bottom: 36px;">
                <div style="width: 80px; height: 80px; background: #fafafa; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 24px; border: 1px solid #e5e5e5;">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#525252" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <circle cx="12" cy="16" r="1"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <h2 style="color: #212121; margin: 0 0 12px 0; font-size: 28px; font-weight: 600; font-family: 'Geist', sans-serif;">Reset Your Password</h2>
                <p style="color: #737373; margin: 0; font-size: 16px; line-height: 1.6; font-family: 'Geist', sans-serif;">We received a request to reset your password for your Planify account. Click the button below to create a new password.</p>
              </div>

              <!-- CTA Button -->
              <div style="text-align: center; margin-bottom: 36px;">
                <a href="${customResetLink}" style="display: inline-block; background: #212121; color: #fafafa; padding: 16px 40px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 16px; font-family: 'Geist', sans-serif; transition: all 0.2s ease; box-shadow: 0 2px 8px rgba(33, 33, 33, 0.15);">
                  Reset My Password
                </a>
              </div>

              <!-- Security Notice -->
              <div style="padding: 24px; background: #fafafa; border-radius: 10px; border-left: 4px solid #212121; margin-bottom: 0;">
                <p style="color: #525252; margin: 0; font-size: 14px; line-height: 1.6; font-family: 'Geist', sans-serif;">
                  <strong style="color: #212121;">Security notice:</strong> This password reset link will expire in 1 hour for your security. If you didn't request this password reset, you can safely ignore this email.
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div style="text-align: center; margin-top: 40px; padding-top: 32px;">
              <div style="margin-bottom: 20px;">
                <div style="display: inline-flex; align-items: center; gap: 8px; margin-bottom: 16px;">
                  <div style="width: 24px; height: 24px; background: #212121; border-radius: 6px; display: flex; align-items: center; justify-content: center;">
                    <span style="color: #fafafa; font-weight: 600; font-size: 12px; font-family: 'Geist', sans-serif;">P</span>
                  </div>
                  <span style="font-weight: 600; font-size: 16px; color: #212121; font-family: 'Geist', sans-serif;">Planify</span>
                </div>
                <p style="color: #737373; margin: 0 0 16px 0; font-size: 14px; font-family: 'Geist', sans-serif;">
                  Helping students structure a high-quality individualised approach to exam revision.
                </p>
              </div>
              
              <div style="border-top: 1px solid #e5e5e5; padding-top: 24px;">
                <p style="color: #a3a3a3; margin: 0 0 8px 0; font-size: 12px; font-family: 'Geist', sans-serif;">
                  If you're having trouble with the button above, copy and paste this link into your browser:
                </p>
                <p style="color: #737373; margin: 0; font-size: 11px; word-break: break-all; font-family: 'Geist', monospace;">
                  ${customResetLink}
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Password reset error:', error);
    
    // Handle specific Firebase errors
    if (error && typeof error === 'object' && 'code' in error && error.code === 'auth/user-not-found') {
      return NextResponse.json(
        { error: 'No account found with this email address.' },
        { status: 400 }
      );
    }
    
    if (error && typeof error === 'object' && 'code' in error && error.code === 'auth/invalid-email') {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }
    
    if ((error && typeof error === 'object' && 'code' in error && error.code === 'auth/too-many-requests') || 
        (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string' && error.message.includes('RESET_PASSWORD_EXCEED_LIMIT'))) {
      return NextResponse.json(
        { error: 'Too many password reset requests. Please wait a few minutes before trying again.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: 'Could not send reset email. Please try again later.' },
      { status: 500 }
    );
  }
}
