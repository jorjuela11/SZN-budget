import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Save, X, DollarSign, TrendingUp, TrendingDown, PieChart, User, Calendar, ChevronDown, ChevronUp, Lock, Unlock, Upload, BookOpen, ChevronRight, Home, FileText, Receipt, Users, UserPlus, Play, Moon, Sun, ShoppingCart } from 'lucide-react';
import { ResponsiveContainer, Cell, PieChart as RechartsPieChart, Pie, Tooltip } from 'recharts';

export default function BudgetApp() {
// All your existing state declarations
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
const [income, setIncome] = useState([{ id: 1, name: 'Salary', amount: 5000, category: 'Regular Income' }]);
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
// LOCALSTORAGE PERSISTENCE - NEW CODE
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

// All your existing functions remain the same...
// (I'm keeping the rest of your code exactly as is)

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
setShowPasscodeInput(false);
} else {
setPasscodeError(true);
setPasscode('');
}
};

const handlePasscodeKeyPress = (e) => {
if (e.key === 'Enter') {
handlePasscodeSubmit();
}
};

const handlePremiumFeature = (feature) => {
if (!isPremium) {
setShowPremiumModal(true);
}
return isPremium;
};

const activatePremium = () => {
setIsPremium(true);
setShowPremiumModal(false);
};

const seasons = [
{ name: 'SZN1', months: ['January', 'February', 'March'] },
{ name: 'SZN2', months: ['April', 'May', 'June'] },
{ name: 'SZN3', months: ['July', 'August', 'September'] },
{ name: 'SZN4', months: ['October', 'November', 'December'] }
];

const getWeekKey = (season, month, week) => `${season}-${month}-${week}`;
const getWeekData = (season, month, week) => {
const key = getWeekKey(season, month, week);
return weeklyData[key] || { checkDate: '', assignedTo: '', expenses: [], incomeItems: [], savings: 0 };
};

const updateWeekData = (season, month, week, data) => {
const key = getWeekKey(season, month, week);
setWeeklyData({...weeklyData, [key]: data});
};

const addExpenseToWeek = (season, month, week) => {
const weekData = getWeekData(season, month, week);
updateWeekData(season, month, week, {
...weekData,
expenses: [...weekData.expenses, { id: Date.now(), expenseId: '', dueDate: '', paid: false }]
});
};

const addIncomeToWeek = (season, month, week) => {
const weekData = getWeekData(season, month, week);
updateWeekData(season, month, week, {
...weekData,
incomeItems: [...weekData.incomeItems, { id: Date.now(), incomeId: '' }]
});
};

const updateWeekExpense = (season, month, week, expenseId, field, value) => {
const weekData = getWeekData(season, month, week);
const updatedExpenses = weekData.expenses.map(exp => exp.id === expenseId ? {...exp, [field]: value} : exp);
updateWeekData(season, month, week, {...weekData, expenses: updatedExpenses});
};

const updateWeekIncome = (season, month, week, incomeItemId, field, value) => {
const weekData = getWeekData(season, month, week);
const updatedIncome = weekData.incomeItems.map(inc => inc.id === incomeItemId ? {...inc, [field]: value} : inc);
updateWeekData(season, month, week, {...weekData, incomeItems: updatedIncome});
};

const deleteWeekExpense = (season, month, week, expenseId) => {
const weekData = getWeekData(season, month, week);
updateWeekData(season, month, week, {...weekData, expenses: weekData.expenses.filter(exp => exp.id !== expenseId)});
};

const deleteWeekIncome = (season, month, week, incomeItemId) => {
const weekData = getWeekData(season, month, week);
updateWeekData(season, month, week, {...weekData, incomeItems: weekData.incomeItems.filter(inc => inc.id !== incomeItemId)});
};

const calculateWeekTotal = (season, month, week) => {
const weekData = getWeekData(season, month, week);
const expenseTotal = weekData.expenses.reduce((sum, exp) => {
const expense = expenses.find(e => e.id === parseInt(exp.expenseId));
return sum + (expense ? expense.amount : 0);
}, 0);
const incomeTotal = weekData.incomeItems.reduce((sum, inc) => {
const incomeItem = income.find(i => i.id === parseInt(inc.incomeId));
return sum + (incomeItem ? incomeItem.amount : 0);
}, 0);
const savingsAmount = parseFloat(weekData.savings) || 0;
return incomeTotal - expenseTotal - savingsAmount;
};

const calculateSeasonalTotals = (seasonName) => {
const season = seasons.find(s => s.name === seasonName);
if (!season) return { income: 0, expenses: 0, balance: 0 };

let totalIncome = 0;
let totalExpenses = 0;

season.months.forEach(month => {
[1, 2, 3, 4].forEach(week => {
const weekData = getWeekData(seasonName, month, week);
  
weekData.incomeItems.forEach(inc => {
const incomeItem = income.find(i => i.id === parseInt(inc.incomeId));
if (incomeItem) totalIncome += incomeItem.amount;
});

weekData.expenses.forEach(exp => {
const expense = expenses.find(e => e.id === parseInt(exp.expenseId));
if (expense) totalExpenses += expense.amount;
});
});
});

return {
income: totalIncome,
expenses: totalExpenses,
balance: totalIncome - totalExpenses
};
};

const calculateSeasonalSavings = (seasonName) => {
const season = seasons.find(s => s.name === seasonName);
if (!season) return 0;

let totalSavings = 0;

season.months.forEach(month => {
const weekCount = getWeekCount(seasonName, month);
for (let week = 1; week <= weekCount; week++) {
const weekData = getWeekData(seasonName, month, week);
totalSavings += parseFloat(weekData.savings) || 0;
}
});

return totalSavings;
};

const toggleMonth = (month) => setExpandedMonths({...expandedMonths, [month]: !expandedMonths[month]});
const toggleSeasonLock = (season) => setLockedSeasons({...lockedSeasons, [season]: !lockedSeasons[season]});

const getWeekCountKey = (season, month) => `${season}-${month}`;
const getWeekCount = (season, month) => {
const key = getWeekCountKey(season, month);
return weekCounts[key] || 4;
};

const addWeekToMonth = (season, month) => {
const key = getWeekCountKey(season, month);
const currentCount = getWeekCount(season, month);
setWeekCounts({...weekCounts, [key]: currentCount + 1});
};

const getWeekLockKey = (season, month, week) => `${season}-${month}-${week}`;
const toggleWeekLock = (season, month, week) => {
const key = getWeekLockKey(season, month, week);
setLockedWeeks({...lockedWeeks, [key]: !lockedWeeks[key]});
};

const toggleWeekCollapse = (season, month, week) => {
const key = getWeekLockKey(season, month, week);
setCollapsedWeeks({...collapsedWeeks, [key]: !collapsedWeeks[key]});
};

const addReceipt = (file) => {
setReceipts([...receipts, { id: Date.now(), name: file.name, date: new Date().toISOString().split('T')[0], season: selectedSeason }]);
};

const deleteReceipt = (id) => setReceipts(receipts.filter(r => r.id !== id));
const getJournal = (season) => journals[season] || { goals: [], accomplishments: [] };

const addJournalEntry = (season, field, entry) => {
if (!entry.trim()) return;
const currentJournal = getJournal(season);
const updatedEntries = [...currentJournal[field], entry];
setJournals({ ...journals, [season]: { ...currentJournal, [field]: updatedEntries } });
};

const deleteJournalEntry = (season, field, index) => {
const currentJournal = getJournal(season);
const updatedEntries = currentJournal[field].filter((_, i) => i !== index);
setJournals({ ...journals, [season]: { ...currentJournal, [field]: updatedEntries } });
};

const addSavingsAccount = () => {
if (!newAccount.bankName || !newAccount.accountName) return;
const account = {
id: Date.now(),
bankName: newAccount.bankName,
accountName: newAccount.accountName,
accountNumber: newAccount.accountNumber,
balance: parseFloat(newAccount.balance) || 0,
linkedDate: new Date().toLocaleDateString()
};
setSavingsAccounts([...savingsAccounts, account]);
setNewAccount({ bankName: '', accountName: '', accountNumber: '', balance: '' });
setShowAddAccount(false);
};

const removeSavingsAccount = (id) => {
setSavingsAccounts(savingsAccounts.filter(acc => acc.id !== id));
};

const maskAccountNumber = (number) => {
if (!number || number.length < 4) return '****';
return '****' + number.slice(-4);
};

const startChallenge = (challengeId) => {
const challenge = financialChallenges.find(c => c.id === challengeId);
if (!challenge) return;

const activeChallenge = {
...challenge,
startDate: new Date().toLocaleDateString(),
progress: 0,
status: 'active'
};
setActiveChallenges([...activeChallenges, activeChallenge]);
};

const updateChallengeProgress = (challengeId, newProgress) => {
setActiveChallenges(activeChallenges.map(ch =>
ch.id === challengeId ? { ...ch, progress: Math.min(newProgress, ch.goal) } : ch
));
};

const completeChallenge = (challengeId) => {
setActiveChallenges(activeChallenges.map(ch =>
ch.id === challengeId ? { ...ch, status: 'completed', progress: ch.goal } : ch
));
};

const removeChallenge = (challengeId) => {
setActiveChallenges(activeChallenges.filter(ch => ch.id !== challengeId));
};

const seasonalIncome = totalIncome * 3;
const seasonalExpenses = totalExpenses * 3;
const seasonalBalance = seasonalIncome - seasonalExpenses;

const saveProfile = () => {
setProfile(profileForm);
setIsEditingProfile(false);
};

const cancelProfileEdit = () => {
setProfileForm({...profile});
setIsEditingProfile(false);
};

const handleProfileImageUpload = (file) => {
if (file && file.type.startsWith('image/')) {
const reader = new FileReader();
reader.onload = (e) => {
setProfileImage(e.target.result);
};
reader.readAsDataURL(file);
}
};

const addCollaborator = () => {
if (!newCollaborator.name || !newCollaborator.email) return;
const collaborator = {
id: Date.now(),
name: newCollaborator.name,
email: newCollaborator.email,
role: newCollaborator.role,
color: `hsl(${Math.random() * 360}, 70%, 60%)`,
joinedDate: new Date().toLocaleDateString()
};
setCollaborators([...collaborators, collaborator]);
setNewCollaborator({ name: '', email: '', role: 'Editor' });
setShowAddCollaborator(false);
};

const removeCollaborator = (id) => {
setCollaborators(collaborators.filter(c => c.id !== id));
if (currentUser?.id === id) {
setCurrentUser(null);
}
};

const switchUser = (collaborator) => {
setCurrentUser(collaborator);
};

const startEdit = (item, type) => {
setEditingId(item.id);
setEditingType(type);
setEditForm({ name: item.name, amount: item.amount, category: item.category });
};

const saveEdit = () => {
if (editingType === 'income') {
setIncome(income.map(item => item.id === editingId ? { ...item, name: editForm.name, amount: parseFloat(editForm.amount) || 0, category: editForm.category } : item));
} else {
setExpenses(expenses.map(item => item.id === editingId ? { ...item, name: editForm.name, amount: parseFloat(editForm.amount) || 0, category: editForm.category } : item));
}
setEditingId(null);
setEditingType(null);
};

const deleteItem = (id, type) => {
if (type === 'income') {
setIncome(income.filter(item => item.id !== id));
} else {
setExpenses(expenses.filter(item => item.id !== id));
}
};

const addItem = (type) => {
if (!newItem.name || !newItem.amount) return;
const item = {
id: Date.now(),
name: newItem.name,
amount: parseFloat(newItem.amount) || 0,
category: newItem.category || (type === 'income' ? categories.income[0] : categories.expense[0])
};
if (type === 'income') {
setIncome([...income, item]);
} else {
setExpenses([...expenses, item]);
}
setNewItem({ name: '', amount: '', category: '', type: 'expense' });
setShowIncomeForm(false);
setShowExpenseForm(false);
};

const expensesByCategory = expenses.reduce((acc, expense) => {
acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
return acc;
}, {});

const selectedSeasonData = seasons.find(s => s.name === selectedSeason);

// Return your entire JSX here - keeping it exactly the same
// (Your entire return statement from line ~800 to the end)
return (
<div className={`min-h-screen pb-24 ${darkMode ? 'bg-black' : 'bg-white'}`}>
{/* All your existing JSX code goes here - I'm keeping it exactly as you had it */}
{/* This is just placeholder - copy your entire return statement here */}
<div className="p-8 text-center">
<h1 className="text-4xl font-bold mb-4">SZN Budget App</h1>
<p className="text-gray-600">Your complete app code goes here...</p>
</div>
</div>
);
}
