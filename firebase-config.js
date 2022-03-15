// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDG6LTBjOZLck3m1tpY8XEx1XpP5EpiFNw",
  authDomain: "habit-tracker-f34c6.firebaseapp.com",
  projectId: "habit-tracker-f34c6",
  storageBucket: "habit-tracker-f34c6.appspot.com",
  messagingSenderId: "668157708418",
  appId: "1:668157708418:web:64c28340b70cac83958c9b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
