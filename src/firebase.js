import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyChRtbcnmzYy7Sl0uqDp0Y_iU-zxowDKAc",
    authDomain: "movies-3fd30.firebaseapp.com",
    projectId: "movies-3fd30",
    storageBucket: "movies-3fd30.firebasestorage.app",
    messagingSenderId: "71337221545",
    appId: "1:71337221545:web:0686c3c57bbe7a650638b8"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(getFirestore)