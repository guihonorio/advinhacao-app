// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7LcgIV06AI7CFIRyeIZjNHM2VBmoZgio",
  authDomain: "banco-de-dados-f628d.firebaseapp.com",
  projectId: "banco-de-dados-f628d",
  storageBucket: "banco-de-dados-f628d.firebasestorage.app",
  messagingSenderId: "302888171616",
  appId: "1:302888171616:web:00ace8a678fb50198b6b05",
  measurementId: "G-TS12D9BR8N",
  databaseURL: "https://banco-de-dados-f628d-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);