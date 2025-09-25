// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgba4Ds2rDcyXQYpH0I5wFPRlFnob-hHY",
  authDomain: "planifygcse.firebaseapp.com",
  projectId: "planifygcse",
  storageBucket: "planifygcse.firebasestorage.app",
  messagingSenderId: "758461041966",
  appId: "1:758461041966:web:eab35ced423dc71ee4bebf",
  measurementId: "G-6PS7YYK80J"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Analytics (only in browser environment)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
