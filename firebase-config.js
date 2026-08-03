// Firebase Konfiqurasiya Məlumatları
const firebaseConfig = {
  apiKey: "AIzaSyBq0McXVuGWsm2lgttN14nAlqXB0bQQC3U",
  authDomain: "deotriweb.firebaseapp.com",
  projectId: "deotriweb",
  storageBucket: "deotriweb.firebasestorage.app",
  messagingSenderId: "223655667596",
  appId: "1:223655667596:web:daba5be4bb8357f17f58a9",
  measurementId: "G-BMT3FHS7YK"
};

// 1. Firebase-i daxil olan CDN vasitəsilə başladırıq
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// 2. Verilənlər bazasını (Firestore) qlobal db dəyişəninə mənimsədirik
const db = firebase.firestore();
