import { NextRequest, NextResponse } from 'next/server';
import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';
import type { RecaptchaVerificationRequest, RecaptchaResponse } from '@/types/recaptcha.types';
import { getRecaptchaConfig } from '@/lib/recaptcha.config';

const config = getRecaptchaConfig();

export async function POST(request: NextRequest) {
  try {
    const body: RecaptchaVerificationRequest = await request.json();
    const { token, action } = body;

    console.log('reCAPTCHA verification request:', { action, tokenLength: token?.length });

    if (!token || !action) {
      console.error('Missing token or action in request');
      return NextResponse.json(
        { success: false, error: 'Missing token or action' } as RecaptchaResponse,
        { status: 400 }
      );
    }



    // Create the reCAPTCHA Enterprise client
    console.log('Creating reCAPTCHA Enterprise client for project:', config.PROJECT_ID);
    const client = new RecaptchaEnterpriseServiceClient();
    const projectPath = client.projectPath(config.PROJECT_ID);

    // Build the assessment request
    const assessmentRequest = {
      assessment: {
        event: {
          token: token,
          siteKey: config.SITE_KEY,
        },
      },
      parent: projectPath,
    };

    console.log('Sending assessment request to Google Cloud...');
    const [response] = await client.createAssessment(assessmentRequest);
    console.log('Received assessment response from Google Cloud');

    // Check if the token is valid
    if (!response.tokenProperties?.valid) {
      const reason = response.tokenProperties?.invalidReason || 'Unknown reason';
      console.log(`reCAPTCHA token invalid: ${reason}`);
      return NextResponse.json(
        { 
          success: false, 
          error: `Token invalid: ${reason}` 
        } as RecaptchaResponse,
        { status: 400 }
      );
    }

    // Check if the expected action was executed
    if (response.tokenProperties?.action !== action) {
      console.log('reCAPTCHA action mismatch');
      return NextResponse.json(
        { 
          success: false, 
          error: 'Action mismatch' 
        } as RecaptchaResponse,
        { status: 400 }
      );
    }

    // Get the risk score and reasons
    const score = response.riskAnalysis?.score || 0;
    const reasons = response.riskAnalysis?.reasons || [];

    console.log(`reCAPTCHA score: ${score} for action: ${action}`);
    
    // Log reasons if any
    if (reasons.length > 0) {
      console.log('reCAPTCHA reasons:', reasons);
    }

    // Check if the score meets our threshold
    const success = score >= config.SCORE_THRESHOLD;

    return NextResponse.json({
      success,
      score,
      reasons,
    } as RecaptchaResponse);

  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    
    // If this is a Google Cloud authentication error, provide a helpful message
    if (error instanceof Error) {
      if (error.message.includes('authentication') || error.message.includes('credentials')) {
        console.warn('Google Cloud credentials not configured - allowing request for development');
        // In development, if Google Cloud isn't set up, we'll allow the request
        // This should be changed for production
        if (process.env.NODE_ENV === 'development') {
          return NextResponse.json({
            success: true,
            score: 0.8, // Mock a good score for development
            reasons: ['Development mode - credentials not configured'],
          } as RecaptchaResponse);
        }
      }
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: `Verification failed: ${error instanceof Error ? error.message : 'Unknown error'}` 
      } as RecaptchaResponse,
      { status: 500 }
    );
  }
}
