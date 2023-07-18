// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "leaflet-travel-app.firebaseapp.com",
  projectId: "leaflet-travel-app",
  storageBucket: "leaflet-travel-app.appspot.com",
  messagingSenderId: "324798510665",
  appId: "1:324798510665:web:4158b7726e705fe907f198"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);