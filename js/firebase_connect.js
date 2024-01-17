// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAaJFj83VlUOizrZgdkE1nRPmfsLa-U4c0",
  authDomain: "facial-recognition-game-a3b67.firebaseapp.com",
  projectId: "facial-recognition-game-a3b67",
  storageBucket: "facial-recognition-game-a3b67.appspot.com",
  messagingSenderId: "850416641378",
  appId: "1:850416641378:web:f839aed595faca52da383b",
  measurementId: "G-7HSL7H1PSE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

