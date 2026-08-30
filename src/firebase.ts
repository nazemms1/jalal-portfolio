import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDtEURQoVPnOhxpPk9y2Oo3pNZBmRr4TQc",
  authDomain: "active-cosine-423408-m6.firebaseapp.com",
  projectId: "active-cosine-423408-m6",
  storageBucket: "active-cosine-423408-m6.firebasestorage.app",
  messagingSenderId: "932923919925",
  appId: "1:932923919925:web:aec8aa47648e06b75f2b7c",
  measurementId: "G-XP6316YH9B"
};

// Initialize Firebase App singleton safely
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// Safe Analytics initialization for SSR
export const initAnalytics = async () => {
  if (typeof window !== "undefined" && (await isSupported())) {
    return getAnalytics(app);
  }
  return null;
};
