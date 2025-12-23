
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCXkqPNJ1wD6TrJKQfcYGbSmefc88LxrFw",
  authDomain: "club-hub-v.firebaseapp.com",
  projectId: "club-hub-v",
  storageBucket: "club-hub-v.firebasestorage.app",
  messagingSenderId: "107806221828",
  appId: "1:107806221828:web:5462a2dd407380aa6ab751"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);