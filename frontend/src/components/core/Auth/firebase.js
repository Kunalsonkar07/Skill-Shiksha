// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwELU0JIKtHWz-W_1tcPKZrmZr2iFzLhs",
  authDomain: "skill-shiksha.firebaseapp.com",
  projectId: "skill-shiksha",
  storageBucket: "skill-shiksha.firebasestorage.app",
  messagingSenderId: "922196936698",
  appId: "1:922196936698:web:11803347e8b5d38625c643",
  measurementId: "G-366V1J0PV3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };