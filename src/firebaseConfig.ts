// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, Auth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrfeWq-kSjcCfAyf9vJFkC32GHvqfR80M",
  authDomain: "myapp-auth-service.firebaseapp.com",
  projectId: "myapp-auth-service",
  storageBucket: "myapp-auth-service.appspot.com",
  messagingSenderId: "746965946862",
  appId: "1:746965946862:web:0bc6b81ba3197054e4beff",
  measurementId: "G-NLRGCJWJCX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
const auth: Auth = getAuth(app);

export { analytics, auth };

