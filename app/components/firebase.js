import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBRSYIjUtnRuU8aApKJOOxs5UkcIdfxiG0",
    authDomain: "otokomigaki-app.firebaseapp.com",
    projectId: "otokomigaki-app",
    storageBucket: "otokomigaki-app.appspot.com",
    messagingSenderId: "648058905790",
    appId: "1:648058905790:web:886ed8a063bd26438d2aef"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth,db };