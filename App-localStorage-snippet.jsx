// ADD THIS CODE AT THE TOP OF YOUR COMPONENT (after all useState declarations)

// ============================================
// LOCALSTORAGE PERSISTENCE
// ============================================

// Load data from localStorage on mount
useEffect(() => {
  const savedData = localStorage.getItem('sznBudgetAppData');
  if (savedData) {
    try {
      const data = JSON.parse(savedData);
      // Load all saved state
      if (data.income) setIncome(data.income);
      if (data.expenses) setExpenses(data.expenses);
      if (data.groceries) setGroceries(data.groceries);
      if (data.profile) setProfile(data.profile);
      if (data.collaborators) setCollaborators(data.collaborators);
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
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  }
}, []);

// Save data to localStorage whenever it changes
useEffect(() => {
  const dataToSave = {
    income,
    expenses,
    groceries,
    profile,
    collaborators,
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
    selectedYear
  };
  localStorage.setItem('sznBudgetAppData', JSON.stringify(dataToSave));
}, [income, expenses, groceries, profile, collaborators, weeklyData, 
    savingsAccounts, activeChallenges, journals, receipts, wordOfYear, 
    weekCounts, lockedSeasons, lockedWeeks, darkMode, isPremium, 
    profileImage, selectedYear]);

// ============================================
// END LOCALSTORAGE CODE
// ============================================

