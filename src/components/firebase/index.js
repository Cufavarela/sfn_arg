import firebase from "firebase/app";
import "@firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const getFirebase = () => app;

export const getFirestore = () => firebase.firestore(app);

export const auth = app.auth();

export const storage = firebase.storage();
