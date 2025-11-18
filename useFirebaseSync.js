// useFirebaseSync.js - Custom hook for syncing data with Firebase
import { useEffect, useState } from 'react';
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { db, auth } from './firebase';

export const useFirebaseSync = (initialData) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    
    if (!user) {
      // If no user, fall back to localStorage
      const savedData = localStorage.getItem('sznBudgetAppData');
      if (savedData) {
        try {
          setData(JSON.parse(savedData));
        } catch (err) {
          console.error('Error loading from localStorage:', err);
        }
      }
      setLoading(false);
      return;
    }

    // Reference to user's budget document
    const userDocRef = doc(db, 'budgets', user.uid);

    // Set up real-time listener
    const unsubscribe = onSnapshot(
      userDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setData(docSnap.data());
        }
        setLoading(false);
      },
      (err) => {
        console.error('Error listening to document:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [auth.currentUser]);

  // Save data to Firebase
  const saveData = async (newData) => {
    const user = auth.currentUser;
    
    if (!user) {
      // Fall back to localStorage if not logged in
      localStorage.setItem('sznBudgetAppData', JSON.stringify(newData));
      setData(newData);
      return;
    }

    try {
      const userDocRef = doc(db, 'budgets', user.uid);
      await setDoc(userDocRef, {
        ...newData,
        lastModified: new Date().toISOString(),
        userId: user.uid
      }, { merge: true });
      setData(newData);
    } catch (err) {
      console.error('Error saving to Firebase:', err);
      setError(err.message);
      // Fall back to localStorage
      localStorage.setItem('sznBudgetAppData', JSON.stringify(newData));
    }
  };

  return { data, saveData, loading, error };
};

// Helper function to load initial user data
export const loadUserData = async (userId) => {
  try {
    const userDocRef = doc(db, 'budgets', userId);
    const docSnap = await getDoc(userDocRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error('Error loading user data:', error);
    return null;
  }
};
