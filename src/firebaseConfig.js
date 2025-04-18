// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth/react-native';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPVOpXJXGtiwsTe8f3cargY6RD6vJZ8DQ",
  authDomain: "managementsystem-78442.firebaseapp.com",
  databaseURL: "https://managementsystem-78442-default-rtdb.firebaseio.com",
  projectId: "managementsystem-78442",
  storageBucket: "managementsystem-78442.firebasestorage.app",
  messagingSenderId: "879991934421",
  appId: "1:879991934421:web:1588ae0cf1341e07d6815c",
  measurementId: "G-T2VTT5GN05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export {app, database, auth}