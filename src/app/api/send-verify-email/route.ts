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

    // Generate email verification link with Firebase Admin
    const actionCodeSettings = {
      url: `https://planifygcse.com/email-verified`,
      handleCodeInApp: true,
    };

    const verificationLink = await admin.auth().generateEmailVerificationLink(email, actionCodeSettings);

    // Send custom verification email via Resend
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'noreply@planifygcse.com',
      to: email,
      subject: 'Verify your PlanifyGCSE email address',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Planify - Verify Your Email</title>
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
                    <path d="M9 12l2 2 4-4"/>
                    <circle cx="12" cy="12" r="9"/>
                  </svg>
                </div>
                <h2 style="color: #212121; margin: 0 0 12px 0; font-size: 28px; font-weight: 600; font-family: 'Geist', sans-serif;">Welcome to Planify!</h2>
                <p style="color: #737373; margin: 0; font-size: 16px; line-height: 1.6; font-family: 'Geist', sans-serif;">You're almost ready to start planning your revision. Please verify your email address to complete your account setup.</p>
              </div>

              <!-- CTA Button -->
              <div style="text-align: center; margin-bottom: 36px;">
                <a href="${verificationLink}" style="display: inline-block; background: #212121; color: #fafafa; padding: 16px 40px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 16px; font-family: 'Geist', sans-serif; transition: all 0.2s ease; box-shadow: 0 2px 8px rgba(33, 33, 33, 0.15);">
                  Verify My Email
                </a>
              </div>

              <!-- Next Steps Notice -->
              <div style="padding: 24px; background: #fafafa; border-radius: 10px; border-left: 4px solid #212121; margin-bottom: 0;">
                <p style="color: #525252; margin: 0; font-size: 14px; line-height: 1.6; font-family: 'Geist', sans-serif;">
                  <strong style="color: #212121;">What's next?</strong> After verifying your email, you'll be able to access all Planify features including creating personalized revision schedules, tracking your progress, and accessing study materials tailored for your GCSE exams.
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
                  ${verificationLink}
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'Could not send verification email. Please try again.' },
      { status: 500 }
    );
  }
}
