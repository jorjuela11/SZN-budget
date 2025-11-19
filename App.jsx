import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Save, X, DollarSign, TrendingUp, TrendingDown, PieChart, User, Calendar, ChevronDown, ChevronUp, Lock, Unlock, Upload, BookOpen, ChevronRight, Home, FileText, Receipt, Users, UserPlus, Play, Moon, Sun, ShoppingCart } from 'lucide-react';
import { ResponsiveContainer, Cell, PieChart as RechartsPieChart, Pie, Tooltip } from 'recharts';

export default function BudgetApp() {
  // All state declarations
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPasscodeInput, setShowPasscodeInput] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [savedPasscode, setSavedPasscode] = useState('1234');
  const [passcodeError, setPasscodeError] = useState(false);
  const [signUpForm, setSignUpForm] = useState({ fullName: '', email: '', password: '' });
  const [isPremium, setIsPremium] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [profile, setProfile] = useState({ name: '', email: '', phone: '', address: '', occupation: '' });
  const [collaborators, setCollaborators] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [showCollaborators, setShowCollaborators] = useState(false);
  const [showAddCollaborator, setShowAddCollaborator] = useState(false);
  const [newCollaborator, setNewCollaborator] = useState({ name: '', email: '', role: 'Editor' });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({...profile});
  const [profileImage, setProfileImage] = useState(null);
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  
  const [income, setIncome] = useState([
    { id: 1, name: 'Salary', amount: 5000, category: 'Regular Income' }
  ]);
  
  const [expenses, setExpenses] = useState([
    { id: 1, name: 'Rent', amount: 1500, category: 'Housing' },
    { id: 2, name: 'Groceries', amount: 400, category: 'Food' },
    { id: 3, name: 'Car Payment', amount: 350, category: 'Transportation' }
  ]);

  const [groceries, setGroceries] = useState([
    { id: 1, name: 'Milk', quantity: 2, category: 'Dairy', purchased: false },
    { id: 2, name: 'Bread', quantity: 1, category: 'Bakery', purchased: false },
    { id: 3, name: 'Eggs', quantity: 1, category: 'Dairy', purchased: false }
  ]);
  
  const [showAddGrocery, setShowAddGrocery] = useState(false);
  const [newGrocery, setNewGrocery] = useState({ name: '', quantity: '', category: '' });
  const [editingGroceryId, setEditingGroceryId] = useState(null);
  const [editGroceryForm, setEditGroceryForm] = useState({ name: '', quantity: '', category: '' });

  const groceryCategories = ['Produce', 'Dairy', 'Meat', 'Bakery', 'Pantry', 'Frozen', 'Beverages', 'Snacks', 'Other'];

  const [categories] = useState({
    income: ['Regular Income', 'Side Hustle', 'Investments', 'Other'],
    expense: ['Housing', 'Food', 'Transportation', 'Utilities', 'Entertainment', 'Healthcare', 'Savings', 'Other']
  });
  
  const [editingId, setEditingId] = useState(null);
  const [editingType, setEditingType] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', amount: '', category: '' });
  const [newItem, setNewItem] = useState({ name: '', amount: '', category: '', type: 'expense' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState('SZN1');
  const [expandedMonths, setExpandedMonths] = useState({});
  const [editingWeek, setEditingWeek] = useState(null);
  const [wordOfYear, setWordOfYear] = useState('');
  const [isEditingWord, setIsEditingWord] = useState(false);
  const [selectedYear, setSelectedYear] = useState(2026);
  const [showIncome, setShowIncome] = useState(true);
  const [showExpenses, setShowExpenses] = useState(true);
  const [lockedSeasons, setLockedSeasons] = useState({});
  const [lockedWeeks, setLockedWeeks] = useState({});
  const [collapsedWeeks, setCollapsedWeeks] = useState({});
  const [weekCounts, setWeekCounts] = useState({});
  const [receipts, setReceipts] = useState([]);
  const [journals, setJournals] = useState({});
  const [weeklyData, setWeeklyData] = useState({});
  const [savingsAccounts, setSavingsAccounts] = useState([]);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [newAccount, setNewAccount] = useState({ bankName: '', accountName: '', accountNumber: '', balance: '' });
  const [financialChallenges] = useState([
    { id: 1, name: 'No Spend Challenge', description: 'Go 7 days without unnecessary spending', goal: 7, category: 'Spending' },
    { id: 2, name: 'Save $1000', description: 'Save $1000 in 3 months', goal: 1000, category: 'Savings' },
    { id: 3, name: 'Coffee Shop Fast', description: 'Skip coffee shops for 30 days', goal: 30, category: 'Spending' },
    { id: 4, name: 'Cook at Home', description: 'Cook all meals at home for 2 weeks', goal: 14, category: 'Spending' },
    { id: 5, name: 'Emergency Fund', description: 'Build a $5000 emergency fund', goal: 5000, category: 'Savings' },
    { id: 6, name: 'Debt Paydown', description: 'Pay off $2000 in debt', goal: 2000, category: 'Debt' },
    { id: 7, name: 'Side Hustle Goal', description: 'Earn $500 from side income', goal: 500, category: 'Income' },
    { id: 8, name: 'Track Every Expense', description: 'Log every expense for 30 days', goal: 30, category: 'Habit' }
  ]);
  const [activeChallenges, setActiveChallenges] = useState([]);
  const [showAllChallenges, setShowAllChallenges] = useState(false);
  const [showAllAvailableChallenges, setShowAllAvailableChallenges] = useState(false);

  // ============================================
  // LOCALSTORAGE PERSISTENCE
  // ============================================
  useEffect(() => {
    const savedData = localStorage.getItem('sznBudgetAppData');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
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

  // Grocery functions
  const addGrocery = () => {
    if (!newGrocery.name || !newGrocery.quantity) return;
    const grocery = {
      id: Date.now(),
      name: newGrocery.name,
      quantity: parseInt(newGrocery.quantity) || 1,
      category: newGrocery.category || 'Other',
      purchased: false
    };
    setGroceries([...groceries, grocery]);
    setNewGrocery({ name: '', quantity: '', category: '' });
    setShowAddGrocery(false);
  };

  const deleteGrocery = (id) => {
    setGroceries(groceries.filter(item => item.id !== id));
  };

  const toggleGroceryPurchased = (id) => {
    setGroceries(groceries.map(item => 
      item.id === id ? { ...item, purchased: !item.purchased } : item
    ));
  };

  const startEditGrocery = (grocery) => {
    setEditingGroceryId(grocery.id);
    setEditGroceryForm({ name: grocery.name, quantity: grocery.quantity, category: grocery.category });
  };

  const saveEditGrocery = () => {
    setGroceries(groceries.map(item =>
      item.id === editingGroceryId 
        ? { ...item, name: editGroceryForm.name, quantity: parseInt(editGroceryForm.quantity) || 1, category: editGroceryForm.category }
        : item
    ));
    setEditingGroceryId(null);
  };

  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const balance = totalIncome - totalExpenses;

  const handleFaceIdLogin = () => {
    setIsLoggedIn(true);
  };

  const handlePasscodeSubmit = () => {
    if (passcode === savedPasscode) {
      setIsLoggedIn(true);
      setPasscode('');
      setPasscodeError(false);