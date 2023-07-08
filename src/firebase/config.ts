import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0nwBaS7P-fnEnNErN44_aBgLh_ujLPPc",
  authDomain: "altschool-capstone-project.firebaseapp.com",
  projectId: "altschool-capstone-project",
  storageBucket: "altschool-capstone-project.appspot.com",
  messagingSenderId: "74481509593",
  appId: "1:74481509593:web:f26a0209d112a846254ac8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firebase Firestore
const db = getFirestore(app);

const usersCollectionRef = collection(db, "users");
const hospitalsCollectionRef = collection(db, "hospitals");

export { db, auth, usersCollectionRef, hospitalsCollectionRef };
export default app;
