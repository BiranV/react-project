import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9_LfgzTZLk_Eu6XBtDIiZt5l1l33hLS8",
  authDomain: "react-recipe-2f8dc.firebaseapp.com",
  projectId: "react-recipe-2f8dc",
  storageBucket: "react-recipe-2f8dc.appspot.com",
  messagingSenderId: "561978351288",
  appId: "1:561978351288:web:f2ebaa7890e8805a579e4d",
  measurementId: "G-DFCR1RH3QX",
};

export class API {
  static async fetchAll() {
    (onSnapshot(collection(db, "budget"), (snapshot) => {
      return (
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            viewing: false,
            ...doc.data(),
          };
        })
      );
    }))
  }
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
