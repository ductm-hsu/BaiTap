import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDOCAbC123...",
  authDomain: "mylearn-app.firebaseapp.com",
  projectId: "mylearn-app",
  storageBucket: "mylearn-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123:web:456"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);