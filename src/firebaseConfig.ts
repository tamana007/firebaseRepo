import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDERisXPpPetwY68r0E3ty-2Fz2k-rfxAU",
    authDomain: "sologenic-firebase-auth.firebaseapp.com",
    projectId: "sologenic-firebase-auth",
    storageBucket: "sologenic-firebase-auth.appspot.com",
    messagingSenderId: "921997554287",
    appId: "1:921997554287:web:272d54ea5e4af37185139a",
    measurementId: "G-RB6RZL8G1Q"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth: Auth = getAuth(app);

export { analytics, auth };

