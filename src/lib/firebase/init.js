import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported as analyticsSupported } from 'firebase/analytics';

// Build config from Vite env (VITE_ prefixed variables)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Small masked debug (no secrets leaked — only last 4 chars)
try {
  const hasKey = !!firebaseConfig.apiKey;
  const last4 = firebaseConfig.apiKey ? firebaseConfig.apiKey.slice(-4) : '----';
  console.info(`DEBUG: Firebase API key present = ${hasKey} last4 = ${last4}`);
} catch (e) {
  console.warn('DEBUG: Could not read Firebase env vars', e);
}

let firebaseApp = null;
let auth = null;
let db = null;
let storage = null;
let analytics = null;

try {
  if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
  } else {
    firebaseApp = getApps()[0];
  }

  auth = getAuth(firebaseApp);
  db = getFirestore(firebaseApp);
  storage = getStorage(firebaseApp);

  analyticsSupported().then(supported => {
    if (supported) {
      try {
        analytics = getAnalytics(firebaseApp);
      } catch (err) {
        // ignore analytics init errors in SSR or restricted browsers
      }
    }
  }).catch(() => {
    // ignore
  });
} catch (err) {
  console.error('DEBUG: Firebase initialization failed', err);
}

export { firebaseApp, auth, db, storage, analytics };
export default firebaseApp;