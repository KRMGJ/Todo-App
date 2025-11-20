import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/**
 * Firebase configuration object containing keys and identifiers for the app.
 * This configuration is used to initialize the Firebase application.
 * Make sure to keep these values secure and do not expose them in public repositories.
 * @see https://firebase.google.com/docs/web/setup#config-object
 * @constant {Object} firebaseConfig - The Firebase configuration object.
 * @property {string} apiKey - The API key for the Firebase project.
 * @property {string} authDomain - The authentication domain for the Firebase project.
 * @property {string} projectId - The project ID for the Firebase project.
 * @property {string} storageBucket - The storage bucket URL for the Firebase project.
 * @property {string} messagingSenderId - The messaging sender ID for the Firebase project.
 * @property {string} appId - The application ID for the Firebase project.
 * @property {string} measurementId - The measurement ID for Google Analytics (if used).
 * @author 장민규
 * @created 2025-11-20
 */
const firebaseConfig = {
    apiKey: "AIzaSyAyScenFnKEr_ENkal4MTII3OngYQBTrcg",
    authDomain: "todo-app-43344.firebaseapp.com",
    projectId: "todo-app-43344",
    storageBucket: "todo-app-43344.firebasestorage.app",
    messagingSenderId: "426289589012",
    appId: "1:426289589012:web:8696cf9b2b8526b0583001",
    measurementId: "G-7QH0416L4C"
};

/**
 * Initialize Firebase app, Firestore database, and Firebase Authentication.
 * These instances are used throughout the application for data storage and user authentication.
 * @see https://firebase.google.com/docs/web/setup
 * @constant {FirebaseApp} app - The initialized Firebase application instance.
 * @constant {Firestore} db - The Firestore database instance.
 * @constant {Auth} auth - The Firebase Authentication instance.
 * @author 장민규
 * @created 2025-11-20
 */
export const app = initializeApp(firebaseConfig);

/**
 * Firestore database instance for interacting with the database.
 * @see https://firebase.google.com/docs/firestore
 * @constant {Firestore} db - The Firestore database instance.
 * @author 장민규
 * @created 2025-11-20
 */
export const db = getFirestore(app);

/**
 * Firebase Authentication instance for managing user authentication.
 * @see https://firebase.google.com/docs/auth
 * @constant {Auth} auth - The Firebase Authentication instance.
 * @author 장민규
 * @created 2025-11-20
 */
export const auth = getAuth(app);