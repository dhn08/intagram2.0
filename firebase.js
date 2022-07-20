import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBuNTSXyp2U8ZF2C-bYDbtUMi8PvcbJWMs",
  authDomain: "instagram-2-81f89.firebaseapp.com",
  projectId: "instagram-2-81f89",
  storageBucket: "instagram-2-81f89.appspot.com",
  messagingSenderId: "634956164123",
  appId: "1:634956164123:web:c865fcd7b05ddcdd339cbe",
  measurementId: "G-ZVGLDP8334",
};
//For next js
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
export { app, db, storage };
