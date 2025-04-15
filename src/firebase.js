// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBicJTHTNxq0KwDemRJ5CaIA4XYbBxGY8o",
  authDomain: "fashion-fits-64cea.firebaseapp.com",
  projectId: "fashion-fits-64cea",
  storageBucket: "fashion-fits-64cea.firebasestorage.app",
  messagingSenderId: "221484047738",
  appId: "1:221484047738:web:f233a6ed9eb3761e5dcac3",
  measurementId: "G-RRGS8BSMDR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };