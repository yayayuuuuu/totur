// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // ✅ Storage

const firebaseConfig = {
  apiKey: "AIzaSyA1_K5bEsSmZPAZBkK1d6n_yE4OLXC-Pfs",
  authDomain: "totur-94cfd.firebaseapp.com",
  projectId: "totur-94cfd",
  storageBucket: "totur-94cfd.appspot.com",
  messagingSenderId: "604653847520",
  appId: "1:604653847520:web:0ee8df414c3ad78af76185",
  measurementId: "G-69VB9JR1R5"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // ✅ Storage 初始化

// ✅ 匯出需要的 firebase 功能
export { app, auth, db, storage };


