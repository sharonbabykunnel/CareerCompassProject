// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCUAcgcvZauf85JG2iN6s2lom0M7Hm-9Sk",
  authDomain: "careercompass-a9b5b.firebaseapp.com",
  projectId: "careercompass-a9b5b",
  storageBucket: "careercompass-a9b5b.appspot.com",
  messagingSenderId: "490981674126",
  appId: "1:490981674126:web:5b9f7e8ce4193011e48ddf",
  measurementId: "G-Q9V9EJ1M0F",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const provider = new GoogleAuthProvider()

export default app
