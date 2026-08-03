// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBq0McXVuGWsm2lgttN14nAlqXB0bQQC3U",
  authDomain: "deotriweb.firebaseapp.com",
  projectId: "deotriweb",
  storageBucket: "deotriweb.firebasestorage.app",
  messagingSenderId: "223655667596",
  appId: "1:223655667596:web:daba5be4bb8357f17f58a9",
  measurementId: "G-BMT3FHS7YK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
