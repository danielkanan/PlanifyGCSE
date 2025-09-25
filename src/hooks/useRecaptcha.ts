"use client";

import { useCallback } from 'react';
import type { RecaptchaAction } from '@/types/recaptcha.types';
import { RECAPTCHA_CONFIG } from '@/lib/recaptcha.config';

export function useRecaptcha() {
  const executeRecaptcha = useCallback(async (action: RecaptchaAction): Promise<string | null> => {
    return new Promise((resolve) => {
      if (!window.grecaptcha?.enterprise) {
        console.error('reCAPTCHA Enterprise not loaded');
        resolve(null);
        return;
      }

      window.grecaptcha.enterprise.ready(async () => {
        try {
          const token = await window.grecaptcha.enterprise.execute(RECAPTCHA_CONFIG.SITE_KEY, {
            action: action
          });
          resolve(token);
        } catch (error) {
          console.error('reCAPTCHA execution failed:', error);
          resolve(null);
        }
      });
    });
  }, []);

  const verifyRecaptcha = useCallback(async (token: string, action: RecaptchaAction): Promise<boolean> => {
    try {
      console.log('Verifying reCAPTCHA token for action:', action);
      
      const response = await fetch('/api/recaptcha/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          action,
        }),
      });

      const result = await response.json();
      
      console.log('reCAPTCHA verification response:', {
        status: response.status,
        success: result.success,
        score: result.score,
        error: result.error,
        reasons: result.reasons
      });

      if (!response.ok) {
        console.error('reCAPTCHA API error:', result.error || 'Unknown error');
        return false;
      }

      return result.success;
    } catch (error) {
      console.error('reCAPTCHA verification network error:', error);
      return false;
    }
  }, []);

  return {
    executeRecaptcha,
    verifyRecaptcha,
  };
}
