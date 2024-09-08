// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-a4b18.firebaseapp.com",
  projectId: "mern-estate-a4b18",
  storageBucket: "mern-estate-a4b18.appspot.com",
  messagingSenderId: "442322096619",
  appId: "1:442322096619:web:107654da1c40bca77809ae"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);