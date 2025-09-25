// reCAPTCHA Enterprise configuration
export const RECAPTCHA_CONFIG = {
  // Client-side site key (public)
  SITE_KEY: '6LccOtUrAAAAAPjsyU74q-VDCqOpKZ5z_pv-OsHD',
  
  // Google Cloud Project ID
  PROJECT_ID: 'planifygcse',
  
  // Score threshold for considering interactions legitimate
  // Range: 0.0 to 1.0 (higher = more likely to be human)
  SCORE_THRESHOLD: 0.5,
  
  // Timeout for reCAPTCHA token generation (milliseconds)
  TIMEOUT: 10000,
} as const;

// Environment-specific configuration
export const getRecaptchaConfig = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  return {
    ...RECAPTCHA_CONFIG,
    // In development, you might want to lower the threshold
    SCORE_THRESHOLD: isDevelopment ? 0.3 : RECAPTCHA_CONFIG.SCORE_THRESHOLD,
  };
};
