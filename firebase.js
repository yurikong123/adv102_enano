// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAadNUah9XLC5OTDDIB7TWYB-301mMhDAE",
    authDomain: "advni-d95f3.firebaseapp.com",
    projectId: "advni-d95f3",
    storageBucket: "advni-d95f3.firebasestorage.app",
    messagingSenderId: "157249693376",
    appId: "1:157249693376:web:84858a4b8bda1d8997ef25"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);