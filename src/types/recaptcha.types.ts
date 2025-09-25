// reCAPTCHA Enterprise types
export interface RecaptchaActionType {
  LOGIN: 'LOGIN';
  REGISTER: 'REGISTER';
  GOOGLE_SIGNIN: 'GOOGLE_SIGNIN';
  MICROSOFT_SIGNIN: 'MICROSOFT_SIGNIN';
  FORGOT_PASSWORD: 'FORGOT_PASSWORD';
}

export const RECAPTCHA_ACTIONS: RecaptchaActionType = {
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  GOOGLE_SIGNIN: 'GOOGLE_SIGNIN',
  MICROSOFT_SIGNIN: 'MICROSOFT_SIGNIN',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
} as const;

export type RecaptchaAction = keyof RecaptchaActionType;

export interface RecaptchaResponse {
  success: boolean;
  score?: number;
  error?: string;
  reasons?: string[];
}

export interface RecaptchaVerificationRequest {
  token: string;
  action: RecaptchaAction;
}

// Global window interface extension for reCAPTCHA
declare global {
  interface Window {
    grecaptcha: {
      enterprise: {
        ready: (callback: () => void) => void;
        execute: (siteKey: string, options: { action: string }) => Promise<string>;
      };
    };
  }
}

export {};
