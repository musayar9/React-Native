// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

import Config from "react-native-config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:" AIzaSyDzSYOUL0XNz30Kr9YuCy1e9VZhiWsBpzY",
  authDomain: "test-app-6afeb.firebaseapp.com",
  projectId: "test-app-6afeb",
  storageBucket: "test-app-6afeb.appspot.com",
  messagingSenderId: "772623144319",
  appId: "1:772623144319:web:3c21a0766d8bb4a05bf64a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
export default app;
