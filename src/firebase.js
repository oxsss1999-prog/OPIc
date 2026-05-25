import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

// Environment variables from Vite (.env)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Check if credentials are set (not empty and not the template template strings)
const isFirebaseConfigured = 
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== 'your_api_key_here' &&
  firebaseConfig.apiKey.trim() !== '';

let app = null;
let auth = null;
let db = null;
let isOfflineMode = true;

if (isFirebaseConfigured) {
  try {
    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }
    auth = getAuth(app);
    db = getFirestore(app);
    isOfflineMode = false;

    // Sign in anonymously to secure private user database space
    signInAnonymously(auth)
      .then(() => {
        console.log("Firebase Anonymous Authentication initialized successfully.");
      })
      .catch((err) => {
        console.warn("Firebase Anonymous Auth warning (running offline fallback):", err.message);
        isOfflineMode = true;
      });
  } catch (err) {
    console.warn("Failed to boot Firebase (running offline fallback):", err.message);
    isOfflineMode = true;
  }
} else {
  console.log("Firebase is not configured. Running in high-performance local fallback mode.");
}

// --- Dynamic Storage Abstraction Layer (Syncs local vs Firestore seamlessly) ---
export const syncStorage = {
  isConfigured: () => !isOfflineMode,

  // Listen for Authentication state changes to sync cloud data to local storage on load
  onAuthReady: (callback) => {
    if (isOfflineMode || !auth) {
      callback(null);
      return () => {};
    }
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch cloud data and load into local storage cache
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            if (data.bookmarks) localStorage.setItem('opic_bookmarks', JSON.stringify(data.bookmarks));
            if (data.stats) {
              localStorage.setItem('opic_quizzes_done', data.stats.quizzes || 0);
              localStorage.setItem('opic_speaking_done', data.stats.speaking || 0);
            }
          }
        } catch (e) {
          console.warn("Error syncing cloud records:", e.message);
        }
      }
      callback(user);
    });
  },

  // Bookmarks
  getBookmarks: async () => {
    if (isOfflineMode) {
      return JSON.parse(localStorage.getItem('opic_bookmarks')) || [];
    }
    try {
      const user = auth?.currentUser;
      if (!user) return JSON.parse(localStorage.getItem('opic_bookmarks')) || [];
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const cloudBookmarks = userDoc.data().bookmarks || [];
        localStorage.setItem('opic_bookmarks', JSON.stringify(cloudBookmarks));
        return cloudBookmarks;
      }
      return JSON.parse(localStorage.getItem('opic_bookmarks')) || [];
    } catch (e) {
      return JSON.parse(localStorage.getItem('opic_bookmarks')) || [];
    }
  },

  saveBookmarks: async (bookmarks) => {
    localStorage.setItem('opic_bookmarks', JSON.stringify(bookmarks));
    if (isOfflineMode) return;
    try {
      const user = auth?.currentUser;
      if (user) {
        await setDoc(doc(db, 'users', user.uid), { bookmarks }, { merge: true });
      }
    } catch (e) {
      console.warn("Firestore save bookmarks error:", e.message);
    }
  },

  // Stats (Completed quizzes, speaking practices)
  getStats: async () => {
    const localStats = {
      quizzes: parseInt(localStorage.getItem('opic_quizzes_done')) || 0,
      speaking: parseInt(localStorage.getItem('opic_speaking_done')) || 0
    };
    if (isOfflineMode) return localStats;
    try {
      const user = auth?.currentUser;
      if (!user) return localStats;
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists() && userDoc.data().stats) {
        const cloudStats = userDoc.data().stats;
        localStorage.setItem('opic_quizzes_done', cloudStats.quizzes || 0);
        localStorage.setItem('opic_speaking_done', cloudStats.speaking || 0);
        return {
          quizzes: cloudStats.quizzes || 0,
          speaking: cloudStats.speaking || 0
        };
      }
      return localStats;
    } catch (e) {
      return localStats;
    }
  },

  saveStats: async (quizzes, speaking) => {
    localStorage.setItem('opic_quizzes_done', quizzes);
    localStorage.setItem('opic_speaking_done', speaking);
    if (isOfflineMode) return;
    try {
      const user = auth?.currentUser;
      if (user) {
        await setDoc(doc(db, 'users', user.uid), {
          stats: { quizzes, speaking }
        }, { merge: true });
      }
    } catch (e) {
      console.warn("Firestore save stats error:", e.message);
    }
  }
};
export { auth, db };
