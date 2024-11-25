// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: import.meta.env.AUTH_DOMAIN,
  projectId: import.meta.env.PROJECT_ID,
  storageBucket: import.meta.env.STORAGE_BUCKET,
  messagingSenderId: import.meta.env.FIREBASE_SENDER_ID,
  appId: import.meta.env.APP_ID,
  measurementId: import.meta.env.MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const provider = new GoogleAuthProvider()

export default app
