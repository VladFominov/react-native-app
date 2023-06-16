// import * as firebase from "firebase";
// import "firebase/auth"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVqGgYPCopaw6r3oKzmNXp86OAWM-lT3M",
  authDomain: "travel-memory-keeper.firebaseapp.com",
  projectId: "travel-memory-keeper",
  storageBucket: "travel-memory-keeper.appspot.com",
  messagingSenderId: "698228289156",
  appId: "1:698228289156:web:75e537503c0d64da725cd1",
  measurementId: "G-C6CEZ6X15T"
};

// // Initialize Firebase
// export default firebase.initializeApp(firebaseConfig);
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const  FIREBASE_AUTH = getAuth(FIREBASE_APP);
const analytics = getAnalytics(FIREBASE_APP);