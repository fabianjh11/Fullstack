import { getAuth } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBPTv79IG5YCygIzTWJ0FiAMcoxjhcq19U",
    authDomain: "fmjh-snake.firebaseapp.com",
    projectId: "fmjh-snake",
    storageBucket: "fmjh-snake.appspot.com",
    messagingSenderId: "166206153207",
    appId: "1:166206153207:web:0e67fbd9f19a1673588ef2"
};

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const db = getFirestore(app);

export {app, firebaseAuth, db};
