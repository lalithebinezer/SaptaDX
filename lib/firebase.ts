import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableMultiTabIndexedDbPersistence } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCFU2KhJj9IYQ47MbJmk56lBKpX1-_Kbuo",
  authDomain: "saptas-growth-777.firebaseapp.com",
  projectId: "saptas-growth-777",
  storageBucket: "saptas-growth-777.firebasestorage.app",
  messagingSenderId: "1013801274846",
  appId: "1:1013801274846:web:2fb88cc3e452e8f8dde14f"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Enable persistence to handle offline mode gracefully
if (typeof window !== "undefined") {
  enableMultiTabIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled in one tab at a time.
      console.warn("Firestore persistence failed: Multiple tabs open.");
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the features required to enable persistence
      console.warn("Firestore persistence not supported by browser.");
    }
  });
}

export { app, auth, db, storage };
