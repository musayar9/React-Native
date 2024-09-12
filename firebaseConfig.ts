// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import Config from "react-native-config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: Config.FIREBASE_API_KEY,
  authDomain: "test-app-6afeb.firebaseapp.com",
  projectId: "test-app-6afeb",
  storageBucket: "test-app-6afeb.appspot.com",
  messagingSenderId: "772623144319",
  appId: Config.FIREBASE_API_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
