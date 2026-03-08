import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    setPersistence,
    browserSessionPersistence,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBzh9tp3B_Yrc2wUSR6qdJNN6lD6Nfu36A",
    authDomain: "website1-db95e.firebaseapp.com",
    projectId: "website1-db95e",
    storageBucket: "website1-db95e.firebasestorage.app",
    messagingSenderId: "93321438330",
    appId: "1:93321438330:web:93cd7df13b2824a7d6c7c3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    setPersistence,
    browserSessionPersistence,
    onAuthStateChanged,
    signOut
};
