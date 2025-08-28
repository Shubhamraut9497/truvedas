// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "truvedas.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: "truvedas.appspot.com",
  messagingSenderId: "236476122683",
  appId: "1:236476122683:web:acf63fa3b9f06211b03e1e",
  measurementId: "G-FLYBB000BG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore Database
const db = getFirestore(app);

// Export the db so we can use it everywhere
export { db };
