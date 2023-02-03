// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { FacebookAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBryCtIyXPAX6SI1SA7mQj5GziXO-oQXS8",
    authDomain: "disneyplus-clone-319f0.firebaseapp.com",
    projectId: "disneyplus-clone-319f0",
    storageBucket: "disneyplus-clone-319f0.appspot.com",
    messagingSenderId: "845501838717",
    appId: "1:845501838717:web:aaee9568ad11daae8b8814",
    measurementId: "G-K07YHYR67P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage();
// Sign in using a popup.
const provider = new GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');


export { auth, provider, storage };
export default db;