import { initializeApp, FirebaseApp, getApps } from 'firebase/app';

let firebaseApp: FirebaseApp;

export const initializeFirebase = () => {
  if (!getApps().length) {
    const firebaseConfig = {
      apiKey: "<FIREBASE_API_KEY>",
      authDomain: "<FIREBASE_AUTH_DOMAIN>",
      projectId: "<FIREBASE_PROJECT_ID>",
      storageBucket: "<FIREBASE_STORAGE_BUCKET>",
      messagingSenderId: "<FIREBASE_MESSAGING_SENDER_ID>",
      appId: "<FIREBASE_APP_ID>",
    };
    firebaseApp = initializeApp(firebaseConfig);
  }
};

export const getFirebase = (): FirebaseApp => {
    if (!firebaseApp) {
        throw new Error("Firebase has not been initialized. Call initializeFirebase first.");
      }
    return firebaseApp;
};