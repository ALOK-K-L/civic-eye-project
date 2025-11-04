// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
// Note: We are not using storage for this project, but it's fine to leave.
// import { getStorage } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDap3cMH51rAHCWZ6WF32PXuG95RnIOL5E",
  authDomain: "civic-eye-remastered.firebaseapp.com",
  projectId: "civic-eye-remastered",
  storageBucket: "civic-eye-remastered.firebasestorage.app",
  messagingSenderId: "978190277695",
  appId: "1:978190277695:web:b875a140ab4722e7ac6c8a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const storage = getStorage(app);

// Export the services you need
export { db, auth };
