// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtXGVsdY_YujBDBTid2ZMGeMKWFKoqqXM",
  authDomain: "kuffetienda-react.firebaseapp.com",
  projectId: "kuffetienda-react",
  storageBucket: "kuffetienda-react.firebasestorage.app",
  messagingSenderId: "399898796849",
  appId: "1:399898796849:web:94991a6f55df6298bfc610"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);