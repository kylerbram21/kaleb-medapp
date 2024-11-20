// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLXuazLBkE61Xh2HpFHsPNLQE540SGWuc",
  authDomain: "medapp-base-1a0e7.firebaseapp.com",
  projectId: "medapp-base-1a0e7",
  storageBucket: "medapp-base-1a0e7.firebasestorage.app",
  messagingSenderId: "824460135690",
  appId: "1:824460135690:web:97ad4f4928524ed4a1fef3",
  measurementId: "G-CY5XMBTM7L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app);