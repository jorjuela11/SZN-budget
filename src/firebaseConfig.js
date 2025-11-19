import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app = null;
try {
  const key = firebaseConfig.apiKey || '';
  // Log presence and last 4 characters only (do NOT log entire key)
  console.info('DEBUG: Firebase API key present =', !!key, 'last4 =', key.slice(-4));

  if (!key) {
    console.warn('DEBUG: VITE_FIREBASE_API_KEY is not set. Firebase will not initialize.');
  } else {
    app = initializeApp(firebaseConfig);
    console.info('DEBUG: Firebase initialized successfully');
  }
} catch (err) {
  console.error('DEBUG: Failed to initialize Firebase:', err);
}

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export const storage = app ? getStorage(app) : null;
export default app;