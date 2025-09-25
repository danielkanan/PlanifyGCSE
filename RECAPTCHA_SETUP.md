# reCAPTCHA Enterprise Integration

This document describes the reCAPTCHA Enterprise integration implemented in the Planify GCSE application.

## Overview

reCAPTCHA Enterprise has been integrated to protect the following user interactions:
- Email/password login
- Email/password registration
- Google OAuth sign-in
- Microsoft OAuth sign-in

## Implementation Details

### Client-Side Integration

The reCAPTCHA Enterprise JavaScript API is loaded in the root layout (`src/app/layout.tsx`) with the site key:

```html
<script src="https://www.google.com/recaptcha/enterprise.js?render=6LccOtUrAAAAAPjsyU74q-VDCqOpKZ5z_pv-OsHD"></script>
```

### Components

1. **Types** (`src/types/recaptcha.types.ts`)
   - TypeScript definitions for reCAPTCHA actions and responses
   - Global window interface extension for reCAPTCHA

2. **Configuration** (`src/lib/recaptcha.config.ts`)
   - Centralized configuration for site key, project ID, and score threshold
   - Environment-specific settings

3. **React Hook** (`src/hooks/useRecaptcha.ts`)
   - Custom hook for executing and verifying reCAPTCHA tokens
   - Handles both client-side token generation and backend verification

4. **API Route** (`src/app/api/recaptcha/verify/route.ts`)
   - Backend verification using Google Cloud reCAPTCHA Enterprise API
   - Validates tokens and returns risk scores

### Protected Actions

The following actions are protected with reCAPTCHA:

- `LOGIN` - Email/password authentication
- `REGISTER` - Account creation with email/password
- `GOOGLE_SIGNIN` - Google OAuth authentication
- `MICROSOFT_SIGNIN` - Microsoft OAuth authentication

### Configuration

#### Site Configuration
- **Site Key**: `6LccOtUrAAAAAPjsyU74q-VDCqOpKZ5z_pv-OsHD` (public)
- **Project ID**: `planifygcse`
- **Score Threshold**: `0.5` (production), `0.3` (development)

#### Environment Variables

#### Development Mode

For local development, the application will work without Google Cloud credentials. The API route includes a development mode bypass that returns a mock success response.

#### Production Setup

For production deployment, you need to set up Google Cloud authentication:

```env
# Required for production
GOOGLE_CLOUD_PROJECT=planifygcse
GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account-key.json

# Optional configuration
RECAPTCHA_SITE_KEY=6LccOtUrAAAAAPjsyU74q-VDCqOpKZ5z_pv-OsHD
RECAPTCHA_PROJECT_ID=planifygcse
RECAPTCHA_SCORE_THRESHOLD=0.5
```

#### Google Cloud Setup Steps

1. **Create a Service Account**:
   - Go to Google Cloud Console → IAM & Admin → Service Accounts
   - Create a new service account for your application
   - Grant it the "reCAPTCHA Enterprise Admin" role

2. **Generate Service Account Key**:
   - Select your service account → Keys → Add Key → Create new key
   - Choose JSON format and download the key file
   - Set `GOOGLE_APPLICATION_CREDENTIALS` to the path of this file

3. **Alternative: Use Environment Variables**:
   ```env
   GOOGLE_CLOUD_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   GOOGLE_CLOUD_CLIENT_EMAIL=your-service-account@planifygcse.iam.gserviceaccount.com
   GOOGLE_CLOUD_PROJECT_ID=planifygcse
   ```

### Usage Flow

1. User initiates a protected action (login, register, etc.)
2. Client-side hook executes reCAPTCHA and gets a token
3. Token is sent to backend API route for verification
4. Backend validates token with Google Cloud reCAPTCHA Enterprise
5. Risk score is evaluated against threshold
6. Action proceeds only if verification passes

### Dependencies

- `@google-cloud/recaptcha-enterprise` - Google Cloud client library for backend verification

### Security Considerations

- Tokens expire after 2 minutes
- Risk scores range from 0.0 (bot) to 1.0 (human)
- Score threshold can be adjusted based on security requirements
- All verification happens on the server-side for security

### Testing

To test the integration:

1. Start the development server: `npm run dev`
2. Navigate to login or registration pages
3. Attempt to sign in/register - reCAPTCHA will execute automatically
4. Check browser console and server logs for reCAPTCHA scores and verification results

### Troubleshooting

Common issues and solutions:

1. **reCAPTCHA not loaded**: Ensure the script tag is properly included in the layout
2. **Verification fails**: Check that the site key and project ID are correct
3. **Low scores**: Users may need to interact more with the site before attempting protected actions
4. **Network errors**: Ensure the Google Cloud reCAPTCHA Enterprise API is accessible

### Score Interpretation

- **0.9-1.0**: Very likely human interaction
- **0.7-0.8**: Likely human interaction
- **0.5-0.6**: Neutral (current threshold)
- **0.3-0.4**: Suspicious activity
- **0.0-0.2**: Very likely bot

The current threshold of 0.5 provides a balance between security and user experience.
