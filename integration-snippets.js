// ============================================
// INTEGRATION CODE SNIPPETS FOR BUDGETAPP.JSX
// ============================================
// Add these snippets to your BudgetApp component

// 1. IMPORTS - Add at the top of your file
// ============================================
import React, { useState, useEffect } from 'react';
import { authAPI, userAPI, budgetAPI } from './apiService';

// 2. AUTHENTICATION HANDLERS
// ============================================

// Sign Up Handler
const handleSignUp = async () => {
  try {
    const result = await authAPI.signUp(
      signUpForm.fullName,
      signUpForm.email,
      signUpForm.password
    );
    
    alert('Account created successfully!');
    setIsLoggedIn(true);
    setSavedPasscode(result.user.passcode || '1234');
    setIsPremium(result.user.isPremium);
    setShowSignUp(false);
  } catch (error) {
    alert(`Sign up failed: ${error.message}`);
  }
};

// Sign In Handler
const handleSignIn = async (email, password) => {
  try {
    const result = await authAPI.signIn(email, password);
    
    setIsLoggedIn(true);
    setSavedPasscode(result.user.passcode);
    setIsPremium(result.user.isPremium);
    setDarkMode(result.user.darkMode);
    
    // Load budget data after login
    await loadBudgetData();
  } catch (error) {
    alert(`Sign in failed: ${error.message}`);
  }
};

// Passcode Verification Handler
const handlePasscodeSubmit = async () => {
  try {
    await authAPI.verifyPasscode(passcode);
    setIsLoggedIn(true);
    setShowPasscodeInput(false);
    setPasscodeError(false);
    
    // Load budget data after passcode verified
    await loadBudgetData();
  } catch (error) {
    setPasscodeError(true);
    setPasscode('');
  }
};

// Logout Handler
const handleLogout = () => {
  authAPI.logout();
  setIsLoggedIn(false);
  // Clear all state
  setIncomeItems([]);
  setExpenseItems([]);
  // ... reset other state
};

// 3. DATA LOADING
// ============================================

// Load Budget Data from Server
const loadBudgetData = async () => {
  try {
    const budgetData = await budgetAPI.getBudgetData();
    
    // Update state with loaded data
    setIncomeItems(budgetData.incomeItems || []);
    setExpenseItems(budgetData.expenseItems || []);
    setSeasonalData(budgetData.seasonalData || {});
    setLinkedAccounts(budgetData.linkedAccounts || []);
    setReceipts(budgetData.receipts || []);
    setActiveChallenges(budgetData.challenges?.filter(c => c.isActive) || []);
    setLockedSeasons(budgetData.lockedSeasons || {});
    setLockedWeeks(budgetData.lockedWeeks || {});
    setWordOfYear(budgetData.wordOfYear || '');
    setSelectedYear(budgetData.selectedYear || new Date().getFullYear());
  } catch (error) {
    console.error('Error loading budget data:', error);
    // If error is 404, budget data doesn't exist yet (first time user)
    if (error.message.includes('404')) {
      console.log('No budget data found, starting fresh');
    }
  }
};

// Load User Profile
const loadUserProfile = async () => {
  try {
    const profile = await userAPI.getProfile();
    setIsPremium(profile.isPremium);
    setDarkMode(profile.darkMode);
  } catch (error) {
    console.error('Error loading profile:', error);
  }
};

// 4. DATA SAVING
// ============================================

// Auto-save Budget Data (add this useEffect)
useEffect(() => {
  // Only save if user is logged in
  if (!authAPI.isLoggedIn()) return;
  
  const saveBudgetData = async () => {
    try {
      await budgetAPI.saveBudgetData({
        incomeItems,
        expenseItems,
        seasonalData,
        linkedAccounts,
        receipts,
        challenges: activeChallenges,
        lockedSeasons,
        lockedWeeks,
        wordOfYear,
        selectedYear,
      });
      console.log('Budget data auto-saved');
    } catch (error) {
      console.error('Auto-save error:', error);
    }
  };
  
  // Debounce save calls (wait 2 seconds after last change)
  const timeoutId = setTimeout(saveBudgetData, 2000);
  return () => clearTimeout(timeoutId);
}, [
  incomeItems,
  expenseItems,
  seasonalData,
  linkedAccounts,
  receipts,
  activeChallenges,
  lockedSeasons,
  lockedWeeks,
  wordOfYear,
  selectedYear,
]);

// 5. COMPONENT LIFECYCLE
// ============================================

// Load data on component mount
useEffect(() => {
  const initializeApp = async () => {
    // Check if user is logged in
    if (authAPI.isLoggedIn()) {
      try {
        await loadUserProfile();
        await loadBudgetData();
      } catch (error) {
        console.error('Initialization error:', error);
        // If token is invalid, logout
        if (error.message.includes('token')) {
          handleLogout();
        }
      }
    }
  };
  
  initializeApp();
}, []);

// 6. CRUD OPERATIONS WITH API
// ============================================

// Add Income (updated to use API)
const addIncome = async () => {
  if (newItem.name && newItem.amount) {
    try {
      const result = await budgetAPI.addIncome(
        newItem.name,
        parseFloat(newItem.amount),
        newItem.category || 'Other'
      );
      
      // Update local state with new item
      setIncomeItems([...incomeItems, result.incomeItem]);
      setNewItem({ name: '', amount: '', category: '', type: 'expense' });
      setShowIncomeForm(false);
    } catch (error) {
      console.error('Error adding income:', error);
      alert('Failed to add income');
    }
  }
};

// Add Expense (updated to use API)
const addExpense = async () => {
  if (newItem.name && newItem.amount) {
    try {
      const result = await budgetAPI.addExpense(
        newItem.name,
        parseFloat(newItem.amount),
        newItem.category || 'Other'
      );
      
      // Update local state with new item
      setExpenseItems([...expenseItems, result.expenseItem]);
      setNewItem({ name: '', amount: '', category: '', type: 'expense' });
      setShowExpenseForm(false);
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense');
    }
  }
};

// Delete Item (updated to use API)
const deleteItem = async (id, type) => {
  try {
    await budgetAPI.deleteItem(type, id);
    
    // Update local state
    if (type === 'income') {
      setIncomeItems(incomeItems.filter(item => item.id !== id));
    } else {
      setExpenseItems(expenseItems.filter(item => item.id !== id));
    }
  } catch (error) {
    console.error('Error deleting item:', error);
    alert('Failed to delete item');
  }
};

// 7. PREMIUM UPGRADE
// ============================================

const handleUpgradeToPremium = async () => {
  try {
    await userAPI.upgradeToPremium();
    setIsPremium(true);
    setShowPremiumModal(false);
    alert('Successfully upgraded to Premium! 🎉');
  } catch (error) {
    console.error('Premium upgrade error:', error);
    alert('Failed to upgrade to premium');
  }
};

// 8. DARK MODE SYNC
// ============================================

// Update dark mode on server when toggled
useEffect(() => {
  const syncDarkMode = async () => {
    if (authAPI.isLoggedIn()) {
      try {
        await userAPI.updateProfile({ darkMode });
      } catch (error) {
        console.error('Error syncing dark mode:', error);
      }
    }
  };
  
  syncDarkMode();
}, [darkMode]);

// ============================================
// USAGE IN JSX
// ============================================

// Update your Sign In button:
<button
  onClick={() => handleSignIn(emailInput, passwordInput)}
  className="w-full bg-gradient-to-r from-yellow-300 to-yellow-400 ..."
>
  Sign In
</button>

// Update your Sign Up button:
<button
  onClick={handleSignUp}
  className="w-full bg-gradient-to-r from-yellow-300 to-yellow-400 ..."
>
  Sign Up
</button>

// Update Premium Modal button:
<button
  onClick={handleUpgradeToPremium}
  className="w-full bg-gradient-to-r from-yellow-300 to-yellow-400 ..."
>
  Upgrade to Premium - $9.99/month
</button>

// Add Logout button (in settings or profile):
<button
  onClick={handleLogout}
  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl"
>
  Logout
</button>

// ============================================
// NOTES
// ============================================

/*
1. Replace your existing handlers with these API-integrated versions
2. Make sure to import apiService at the top
3. The auto-save will sync data to server every 2 seconds after changes
4. User authentication persists across browser sessions via localStorage
5. All data is now stored in MongoDB instead of localStorage
6. Token expires after 7 days - user will need to sign in again
*/
