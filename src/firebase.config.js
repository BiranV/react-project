import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9_LfgzTZLk_Eu6XBtDIiZt5l1l33hLS8",
  authDomain: "react-recipe-2f8dc.firebaseapp.com",
  projectId: "react-recipe-2f8dc",
  storageBucket: "react-recipe-2f8dc.appspot.com",
  messagingSenderId: "561978351288",
  appId: "1:561978351288:web:f2ebaa7890e8805a579e4d",
  measurementId: "G-DFCR1RH3QX",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
