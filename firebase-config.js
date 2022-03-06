// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
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
  measurementId: "G-TM6V3YBYP6"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export default db