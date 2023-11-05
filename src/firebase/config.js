// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYCz2nLtpx_ezZaqTldhpjo2F3P4si43E",
  authDomain: "react-curso-fddd6.firebaseapp.com",
  projectId: "react-curso-fddd6",
  storageBucket: "react-curso-fddd6.appspot.com",
  messagingSenderId: "492360217593",
  appId: "1:492360217593:web:4ff5a52381bc1e6dd5c328"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);