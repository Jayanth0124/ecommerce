// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaqdm3UzBe8-E6R3KAgdUB5aj0j0ogHiQ",
  authDomain: "ecommerce-a9dea.firebaseapp.com",
  projectId: "ecommerce-a9dea",
  storageBucket: "ecommerce-a9dea.firebasestorage.app",
  messagingSenderId: "305620346946",
  appId: "1:305620346946:web:eed5802dabe64d9cf565db",
  measurementId: "G-PL9WDNXLX4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

const signOutUser = () => {
  return signOut(auth);
};

const onAuthStateChangedListener = (callback: (user: any) => void) => {
  return onAuthStateChanged(auth, callback);
};

export {
  auth,
  signInWithGoogle,
  signOutUser,
  onAuthStateChangedListener,
};
