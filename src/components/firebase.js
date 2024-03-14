// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_hSLlMzYcAtSR0k4pxSksKxaxzCIneQo",
  authDomain: "challengequest-29a55.firebaseapp.com",
  projectId: "challengequest-29a55",
  storageBucket: "challengequest-29a55.appspot.com",
  messagingSenderId: "199953527002",
  appId: "1:199953527002:web:3655628b89f71278a435e3",
  measurementId: "G-TTBD6CS5F4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
