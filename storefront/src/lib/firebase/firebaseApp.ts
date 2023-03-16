import { initializeApp, getApps, getApp } from "firebase/app";

// TODO: Put your Firebase config here
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

function isFirebaseInitialized(): boolean {
  return !(getApps.length === 0);
}

export const app = isFirebaseInitialized()
  ? getApp()
  : initializeApp(firebaseConfig);
