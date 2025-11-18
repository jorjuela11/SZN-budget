// AppFirebaseIntegration.js - Code snippets to add to your App.jsx

// ========================================
// STEP 1: Add these imports at the top of App.jsx
// ========================================

import { useAuth } from './AuthContext';
import { db } from './firebase';
import { doc, setDoc, onSnapshot, collection, query, where, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';


// ========================================
// STEP 2: Replace the login screen component with this
// ========================================

// Inside your BudgetApp component, replace the login screen section with:

const { currentUser, login, signup, logout } = useAuth();
const [authLoading, setAuthLoading] = useState(false);
const [authError, setAuthError] = useState('');
const [loginEmail, setLoginEmail] = useState('');
const [loginPassword, setLoginPassword] = useState('');

// Handle real login
const handleRealLogin = async (e) => {
  e.preventDefault();
  setAuthLoading(true);
  setAuthError('');
  
  try {
    await login(loginEmail, loginPassword);
    setIsLoggedIn(true);
  } catch (error) {
    setAuthError(error.message);
  } finally {
    setAuthLoading(false);
  }
};

// Handle real signup
const handleRealSignup = async (e) => {
  e.preventDefault();
  setAuthLoading(true);
  setAuthError('');
  
  try {
    await signup(signUpForm.email, signUpForm.password, signUpForm.fullName);
    setIsLoggedIn(true);
  } catch (error) {
    setAuthError(error.message);
  } finally {
    setAuthLoading(false);
  }
};

// Handle logout
const handleLogout = async () => {
  try {
    await logout();
    setIsLoggedIn(false);
  } catch (error) {
    console.error('Logout error:', error);
  }
};


// ========================================
// STEP 3: Replace localStorage useEffect with Firebase sync
// ========================================

// REMOVE the two localStorage useEffect hooks and replace with:

useEffect(() => {
  if (!currentUser) return;

  // Reference to user's budget document
  const userDocRef = doc(db, 'budgets', currentUser.uid);

  // Set up real-time listener
  const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      
      // Load all data from Firestore
      if (data.income) setIncome(data.income);
      if (data.expenses) setExpenses(data.expenses);
      if (data.groceries) setGroceries(data.groceries);
      if (data.profile) setProfile(data.profile);
      if (data.weeklyData) setWeeklyData(data.weeklyData);
      if (data.savingsAccounts) setSavingsAccounts(data.savingsAccounts);
      if (data.activeChallenges) setActiveChallenges(data.activeChallenges);
      if (data.journals) setJournals(data.journals);
      if (data.receipts) setReceipts(data.receipts);
      if (data.wordOfYear) setWordOfYear(data.wordOfYear);
      if (data.weekCounts) setWeekCounts(data.weekCounts);
      if (data.lockedSeasons) setLockedSeasons(data.lockedSeasons);
      if (data.lockedWeeks) setLockedWeeks(data.lockedWeeks);
      if (data.darkMode !== undefined) setDarkMode(data.darkMode);
      if (data.isPremium !== undefined) setIsPremium(data.isPremium);
      if (data.profileImage) setProfileImage(data.profileImage);
      if (data.selectedYear) setSelectedYear(data.selectedYear);
    }
  });

  return () => unsubscribe();
}, [currentUser]);

// Save data to Firebase whenever it changes
useEffect(() => {
  if (!currentUser) return;

  const saveToFirebase = async () => {
    try {
      const userDocRef = doc(db, 'budgets', currentUser.uid);
      await setDoc(userDocRef, {
        income,
        expenses,
        groceries,
        profile,
        weeklyData,
        savingsAccounts,
        activeChallenges,
        journals,
        receipts,
        wordOfYear,
        weekCounts,
        lockedSeasons,
        lockedWeeks,
        darkMode,
        isPremium,
        profileImage,
        selectedYear,
        lastModified: new Date().toISOString(),
        userId: currentUser.uid
      }, { merge: true });
    } catch (error) {
      console.error('Error saving to Firebase:', error);
    }
  };

  saveToFirebase();
}, [currentUser, income, expenses, groceries, profile, weeklyData, 
    savingsAccounts, activeChallenges, journals, receipts, wordOfYear, 
    weekCounts, lockedSeasons, lockedWeeks, darkMode, isPremium, 
    profileImage, selectedYear]);


// ========================================
// STEP 4: Add real collaborator sharing
// ========================================

// Add this function to actually share budget with collaborators
const shareWithCollaborator = async (collaboratorEmail) => {
  if (!currentUser) return;

  try {
    // Create a shared access document
    const sharedDocRef = doc(collection(db, 'sharedAccess'));
    await setDoc(sharedDocRef, {
      budgetOwnerId: currentUser.uid,
      collaboratorEmail: collaboratorEmail,
      createdAt: new Date().toISOString(),
      access: 'edit' // or 'view' based on role
    });
    
    console.log('Budget shared with:', collaboratorEmail);
  } catch (error) {
    console.error('Error sharing budget:', error);
  }
};

// Load shared budgets
const loadSharedBudgets = async () => {
  if (!currentUser) return;

  try {
    const q = query(
      collection(db, 'sharedAccess'),
      where('collaboratorEmail', '==', currentUser.email)
    );
    
    const querySnapshot = await getDocs(q);
    const sharedBudgets = [];
    
    querySnapshot.forEach((doc) => {
      sharedBudgets.push(doc.data());
    });
    
    return sharedBudgets;
  } catch (error) {
    console.error('Error loading shared budgets:', error);
    return [];
  }
};


// ========================================
// STEP 5: Update the login screen JSX
// ========================================

// Replace the email input onChange in sign-in form with:
onChange={(e) => setLoginEmail(e.target.value)}
value={loginEmail}

// Replace the password input onChange in sign-in form with:
onChange={(e) => setLoginPassword(e.target.value)}
value={loginPassword}

// Replace the "Sign In" button onClick with:
onClick={handleRealLogin}

// Add error display after the "Forgot Password?" button:
{authError && (
  <div className="bg-red-50 border border-red-300 rounded-xl p-3 mb-4">
    <p className="text-red-800 text-sm">{authError}</p>
  </div>
)}

// Add loading state to Sign In button:
<button
  onClick={handleRealLogin}
  disabled={authLoading}
  className={`w-full bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-black px-6 py-4 rounded-xl font-bold transition shadow-md mb-3 ${
    authLoading ? 'opacity-50 cursor-not-allowed' : ''
  }`}
>
  {authLoading ? 'Signing In...' : 'Sign In'}
</button>


// ========================================
// STEP 6: Add logout button to header
// ========================================

// Add this button to your header (near dark mode toggle):
<button
  onClick={handleLogout}
  className={`px-4 py-2 rounded-full font-semibold transition ${
    darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
  }`}
>
  Logout
</button>


// ========================================
// NOTES:
// ========================================

// 1. The app now saves to Firebase instead of localStorage
// 2. Real-time sync works automatically across devices
// 3. Authentication is handled by Firebase
// 4. Collaborators can be invited via email
// 5. All data is backed up in the cloud

// Keep the localStorage code as a fallback for when users aren't logged in!
