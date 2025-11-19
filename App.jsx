import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Save, X, DollarSign, TrendingUp, TrendingDown, PieChart, User, Calendar, ChevronDown, ChevronUp, Lock, Unlock, Upload, BookOpen, ChevronRight, Home, FileText, Receipt, Users, UserPlus, Play, Moon, Sun, ShoppingCart } from 'lucide-react';
import { ResponsiveContainer, Cell, PieChart as RechartsPieChart, Pie, Tooltip } from 'recharts';

export default function BudgetApp() {
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [showPasscodeInput, setShowPasscodeInput] = useState(false);
const [showSignUp, setShowSignUp] = useState(false);
const [passcode, setPasscode] = useState('');
const [savedPasscode, setSavedPasscode] = useState('1234'); // Default passcode
const [passcodeError, setPasscodeError] = useState(false);
const [signUpForm, setSignUpForm] = useState({ fullName: '', email: '', password: '' });
const [isPremium, setIsPremium] = useState(false); // Premium subscription status
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

// NEW: Groceries state
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

// NEW: Grocery functions
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
// Simulate Face ID authentication
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

// Login Screen
if (!isLoggedIn) {
return (
<div className="min-h-screen bg-gradient-to-br from-yellow-300 via-yellow-200 to-yellow-100 flex items-center justify-center p-4">
<div className="max-w-md w-full">
{!showPasscodeInput ? (
<>
<div className="text-center mb-8">
<div className="mx-auto mb-6 flex items-center justify-center">
<svg width="200" height="120" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
<text x="100" y="85" fontFamily="Arial, sans-serif" fontSize="80" fontWeight="900" fill="#000000" textAnchor="middle">SZN</text>
</svg>
</div>
<p className="text-gray-700 text-sm font-medium">A versatile budget app for every season of life</p>
</div>

{/* Sign In / Sign Up Form */}
{!showSignUp ? (
<div className="bg-white rounded-3xl p-8 shadow-xl">
<h2 className="text-2xl font-bold text-gray-900 mb-2">Sign in now</h2>
<p className="text-gray-500 text-sm mb-6">Please sign in to continue our app</p>

<div className="space-y-4 mb-6">
<input
type="email"
placeholder="Email"
className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-yellow-300 text-gray-900"
/>
<div className="relative">
<input
type="password"
placeholder="Password"
className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-yellow-300 text-gray-900"
/>
</div>
</div>

<div className="text-right mb-6">
<button className="text-gray-500 text-sm hover:text-gray-700">Forgot Password?</button>
</div>

<button
onClick={handleFaceIdLogin}
className="w-full bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-black px-6 py-4 rounded-xl font-bold transition shadow-md mb-3"
>
Sign In
</button>

<button
onClick={() => setIsLoggedIn(false)}
className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold transition mb-4"
>
Cancel
</button>

<div className="text-center mb-4">
<span className="text-gray-600 text-sm">Don't have an account? </span>
<button onClick={() => setShowSignUp(true)} className="text-yellow-500 font-semibold text-sm hover:text-yellow-600">
Sign up
</button>
</div>

<div className="relative my-6">
<div className="absolute inset-0 flex items-center">
<div className="w-full border-t border-gray-200"></div>
</div>
<div className="relative flex justify-center text-sm">
<span className="px-4 bg-white text-gray-500">Or</span>
</div>
</div>

<div className="space-y-3">
<button
onClick={handleFaceIdLogin}
className="w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition"
>
<User className="w-5 h-5 text-gray-700" />
<span className="text-gray-700 font-semibold">Continue with Face ID</span>
</button>
<button
onClick={() => setShowPasscodeInput(true)}
className="w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition"
>
<Lock className="w-5 h-5 text-gray-700" />
<span className="text-gray-700 font-semibold">Continue with Passcode</span>
</button>
</div>
</div>
) : (
<div className="bg-white rounded-3xl p-8 shadow-xl">
<h2 className="text-2xl font-bold text-gray-900 mb-2">Sign up now</h2>
<p className="text-gray-500 text-sm mb-6">Please fill the details and create account</p>

<div className="space-y-4 mb-6">
<input
type="text"
placeholder="Full Name"
value={signUpForm.fullName}
onChange={(e) => setSignUpForm({...signUpForm, fullName: e.target.value})}
className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-yellow-300 text-gray-900"
/>
<input
type="email"
placeholder="Email"
value={signUpForm.email}
onChange={(e) => setSignUpForm({...signUpForm, email: e.target.value})}
className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-yellow-300 text-gray-900"
/>
<input
type="password"
placeholder="Password"
value={signUpForm.password}
onChange={(e) => setSignUpForm({...signUpForm, password: e.target.value})}
className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-yellow-300 text-gray-900"
/>
</div>

<button
onClick={handleFaceIdLogin}
className="w-full bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-black px-6 py-4 rounded-xl font-bold transition shadow-md mb-3"
>
Sign Up
</button>

<button
onClick={() => setShowSignUp(false)}
className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold transition mb-4"
>
Cancel
</button>

<div className="text-center mb-4">
<span className="text-gray-600 text-sm">Already have an account? </span>
<button onClick={() => setShowSignUp(false)} className="text-yellow-500 font-semibold text-sm hover:text-yellow-600">
Sign in
</button>
</div>

<div className="relative my-6">
<div className="absolute inset-0 flex items-center">
<div className="w-full border-t border-gray-200"></div>
</div>
<div className="relative flex justify-center text-sm">
<span className="px-4 bg-white text-gray-500">Or</span>
</div>
</div>

<div className="flex justify-center gap-4">
<button className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition">
<svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
</svg>
</button>
<button className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 flex items-center justify-center hover:opacity-90 transition">
<svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
</svg>
</button>
<button className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center hover:bg-blue-500 transition">
<svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
</svg>
</button>
</div>
</div>
)}
</>
) : (
<div className="bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-200 rounded-3xl p-8 shadow-xl min-h-[600px] flex flex-col">
<div className="flex justify-between items-center mb-12">
<h2 className="text-2xl font-bold text-gray-900">Enter your PIN</h2>
<button
onClick={() => {
setShowPasscodeInput(false);
setPasscode('');
setPasscodeError(false);
}}
className="text-gray-900 font-semibold hover:opacity-70"
>
Logout
</button>
</div>

{/* PIN Circles */}
<div className="flex justify-center gap-6 mb-12">
{[0, 1, 2, 3].map((index) => (
<div 
key={index}
className="w-4 h-4 rounded-full border-2 border-gray-900 flex items-center justify-center"
>
{passcode.length > index && (
<div className="w-3 h-3 rounded-full bg-gray-900"></div>
)}
</div>
))}
</div>

{passcodeError && (
<div className="text-center mb-6">
<p className="text-red-600 font-semibold">Incorrect PIN</p>
<p className="text-red-500 text-sm">Please try again</p>
</div>
)}

{/* Number Pad */}
<div className="flex-1 flex flex-col justify-end">
<div className="grid grid-cols-3 gap-6 max-w-xs mx-auto w-full">
{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
<button
key={num}
onClick={() => {
if (passcode.length < 4) {
const newPasscode = passcode + num;
setPasscode(newPasscode);
if (newPasscode.length === 4) {
setTimeout(() => {
if (newPasscode === savedPasscode) {
setIsLoggedIn(true);
setPasscode('');
setPasscodeError(false);
setShowPasscodeInput(false);
} else {
setPasscodeError(true);
setPasscode('');
}
}, 300);
}
}
}}
className="text-4xl font-light text-gray-900 hover:bg-yellow-200 rounded-full aspect-square flex items-center justify-center transition"
>
{num}
</button>
))}
            
{/* Face ID Button */}
<button
onClick={handleFaceIdLogin}
className="flex items-center justify-center hover:bg-yellow-200 rounded-full aspect-square transition"
>
<User className="w-8 h-8 text-gray-900" />
</button>

{/* 0 Button */}
<button
onClick={() => {
if (passcode.length < 4) {
const newPasscode = passcode + '0';
setPasscode(newPasscode);
if (newPasscode.length === 4) {
setTimeout(() => {
if (newPasscode === savedPasscode) {
setIsLoggedIn(true);
setPasscode('');
setPasscodeError(false);
setShowPasscodeInput(false);
} else {
setPasscodeError(true);
setPasscode('');
}
}, 300);
}
}
}}
className="text-4xl font-light text-gray-900 hover:bg-yellow-200 rounded-full aspect-square flex items-center justify-center transition"
>
0
</button>

{/* Delete Button */}
<button
onClick={() => setPasscode(passcode.slice(0, -1))}
className="flex items-center justify-center hover:bg-yellow-200 rounded-full aspect-square transition"
>
<X className="w-8 h-8 text-gray-900" />
</button>
</div>
<p className="text-center text-xs text-gray-600 mt-6">Default PIN: 1234</p>
</div>
</div>
)}
</div>
</div>
);
}

return (
<div className={`min-h-screen pb-24 ${darkMode ? 'bg-black' : 'bg-white'}`}>
{/* Premium Modal */}
{showPremiumModal && (
<div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
<div className={`max-w-md w-full rounded-3xl p-8 shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
<div className="text-center mb-6">
<div className="bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg">
<svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
</svg>
</div>
<h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Premium Feature</h2>
<p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
Unlock advanced features with SZN Premium
</p>
</div>

<div className={`rounded-2xl p-4 mb-6 ${darkMode ? 'bg-gray-700' : 'bg-yellow-50'}`}>
<ul className="space-y-3">
<li className="flex items-center gap-3">
<svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
</svg>
<span className={darkMode ? 'text-white' : 'text-gray-900'}>Link unlimited savings accounts</span>
</li>
<li className="flex items-center gap-3">
<svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
</svg>
<span className={darkMode ? 'text-white' : 'text-gray-900'}>Access financial challenges</span>
</li>
<li className="flex items-center gap-3">
<svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
</svg>
<span className={darkMode ? 'text-white' : 'text-gray-900'}>Educational resources library</span>
</li>
<li className="flex items-center gap-3">
<svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
</svg>
<span className={darkMode ? 'text-white' : 'text-gray-900'}>Priority support</span>
</li>
</ul>
</div>

<div className="space-y-3">
<button
onClick={activatePremium}
className="w-full bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-black px-6 py-4 rounded-2xl font-bold transition shadow-lg text-lg"
>
Activate Premium - $9.99/month
</button>
<button
onClick={() => setShowPremiumModal(false)}
className={`w-full px-6 py-3 rounded-2xl font-semibold transition ${
darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
}`}
>
Maybe Later
</button>
</div>
</div>
</div>
)}

{/* Current User Indicator - Top Right */}
{currentUser && (
<div className={`fixed top-4 right-4 z-50 border-0 rounded-full px-4 py-2 shadow-lg flex items-center gap-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-800'}`}>
<div 
className="w-3 h-3 rounded-full" 
style={{ backgroundColor: currentUser.color }}
></div>
<span className="text-white text-sm font-semibold">Viewing as: {currentUser.name}</span>
<button
onClick={() => setCurrentUser(null)}
className="ml-2 text-gray-300 hover:text-white"
>
<X className="w-4 h-4" />
</button>
</div>
)}

{/* Sticky Header with Dark Mode and Collaborators (only on home tab) */}
{activeTab === 'home' && (
<div className="fixed top-4 right-4 z-50 flex gap-2">
{/* Dark Mode Toggle */}
<button
onClick={() => setDarkMode(!darkMode)}
className={`flex items-center justify-center rounded-full p-2.5 font-semibold transition shadow-lg backdrop-blur-lg border ${
darkMode ? 'bg-gray-800/90 text-yellow-300 hover:bg-gray-700/60 border-gray-700' : 'bg-gray-100/40 text-gray-800 hover:bg-gray-200/60 border-gray-200/60'
}`}
>
{darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
</button>

{/* Collaborators Circle Button */}
<div className="relative">
<button
onClick={() => setShowCollaborators(!showCollaborators)}
className={`relative rounded-full p-2.5 shadow-lg transition-all backdrop-blur-lg border ${
darkMode ? 'bg-gray-800/90 hover:bg-gray-700/60 border-gray-700' : 'bg-gray-100/40 hover:bg-gray-200/60 border-gray-200/60'
}`}
>
<Users className={`w-4 h-4 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
{collaborators.length > 0 && (
<span className="absolute -top-1 -right-1 bg-yellow-300 text-black text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
{collaborators.length}
</span>
)}
</button>

{/* Collaborators Dropdown Panel - keeping the full existing code */}
{showCollaborators && (
<div className={`absolute top-16 right-0 w-96 rounded-3xl p-6 shadow-2xl border-2 ${
darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-400'
}`}>
<div className="flex items-center justify-between mb-4">
<h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
Collaborators ({collaborators.length})
</h2>
<button
onClick={() => setShowCollaborators(false)}
className={`p-2 rounded-full transition ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
>
<X className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
</button>
</div>

<div className="space-y-4">
{/* Add Collaborator Button */}
{!showAddCollaborator ? (
<button
onClick={() => setShowAddCollaborator(true)}
className={`w-full px-6 py-3 rounded-full font-semibold transition shadow-lg flex items-center justify-center gap-2 ${
darkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-400 hover:bg-gray-500 text-white'
}`}
>
<UserPlus className="w-5 h-5" />
Add Collaborator
</button>
) : (
<div className={`rounded-2xl p-4 border-2 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}>
<div className="space-y-3">
<input
type="text"
placeholder="Name"
value={newCollaborator.name}
onChange={(e) => setNewCollaborator({...newCollaborator, name: e.target.value})}
className={`w-full px-4 py-2 border-2 rounded-xl focus:outline-none ${
darkMode 
? 'bg-gray-600 border-gray-500 text-white focus:border-gray-400' 
: 'bg-gray-50 border-gray-200 focus:border-gray-400'
}`}
/>
<input
type="email"
placeholder="Email"
value={newCollaborator.email}
onChange={(e) => setNewCollaborator({...newCollaborator, email: e.target.value})}
className={`w-full px-4 py-2 border-2 rounded-xl focus:outline-none ${
darkMode 
? 'bg-gray-600 border-gray-500 text-white focus:border-gray-400' 
: 'bg-gray-50 border-gray-200 focus:border-gray-400'
}`}
/>
<select
value={newCollaborator.role}
onChange={(e) => setNewCollaborator({...newCollaborator, role: e.target.value})}
className={`w-full px-4 py-2 border-2 rounded-xl focus:outline-none ${
darkMode 
? 'bg-gray-600 border-gray-500 text-white focus:border-gray-400' 
: 'bg-gray-50 border-gray-200 focus:border-gray-400'
}`}
>
<option value="Viewer">Viewer (Read Only)</option>
<option value="Editor">Editor (Can Edit)</option>
<option value="Admin">Admin (Full Access)</option>
</select>
<div className="flex gap-2">
<button
onClick={addCollaborator}
className={`flex-1 px-4 py-2 rounded-full font-semibold transition ${
darkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-400 hover:bg-gray-500 text-white'
}`}
>
Add
</button>
<button
onClick={() => {
setShowAddCollaborator(false);
setNewCollaborator({ name: '', email: '', role: 'Editor' });
}}
className={`flex-1 px-4 py-2 rounded-full font-semibold transition ${
darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
}`}
>
Cancel
</button>
</div>
</div>
</div>
)}

{/* Collaborators List */}
<div className="space-y-3 max-h-96 overflow-y-auto">
{collaborators.map(collaborator => (
<div 
key={collaborator.id} 
className={`rounded-2xl p-4 border-2 transition ${
currentUser?.id === collaborator.id 
? darkMode ? 'bg-gray-700 border-gray-500 shadow-lg' : 'bg-white border-gray-200 shadow-lg'
: darkMode ? 'bg-gray-700 border-gray-600 hover:border-gray-500' : 'bg-white border-gray-200 hover:border-gray-300'
}`}
>
<div className="flex items-center justify-between">
<div className="flex items-center gap-3 flex-1">
<div 
className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
style={{ backgroundColor: collaborator.color }}
>
{collaborator.name.charAt(0).toUpperCase()}
</div>
<div className="flex-1">
<p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{collaborator.name}</p>
<p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{collaborator.email}</p>
<div className="flex items-center gap-2 mt-1">
<span className={`text-xs px-2 py-1 rounded-full font-medium ${
darkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-100 text-gray-700'
}`}>
{collaborator.role}
</span>
</div>
</div>
</div>
<div className="flex gap-2">
{currentUser?.id === collaborator.id ? (
<button
onClick={() => setCurrentUser(null)}
className="bg-yellow-300 text-black px-3 py-1 rounded-full font-semibold hover:bg-yellow-300 transition text-sm"
>
Active
</button>
) : (
<button
onClick={() => switchUser(collaborator)}
className={`px-3 py-1 rounded-full font-semibold transition text-sm ${
darkMode ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
}`}
>
Switch
</button>
)}
<button
onClick={() => removeCollaborator(collaborator.id)}
className="p-2 hover:bg-red-100 rounded-full transition"
>
<Trash2 className="w-4 h-4 text-red-600" />
</button>
</div>
</div>
</div>
))}

{collaborators.length === 0 && !showAddCollaborator && (
<div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
<Users className={`w-12 h-12 mx-auto mb-3 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
<p>No collaborators yet. Add someone to start sharing!</p>
</div>
)}
</div>
</div>
</div>
)}
</div>
</div>
)}

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
{activeTab === 'home' && (
<div className="space-y-8">
{/* Profile Section and other home content - keeping existing code */}
<div className="p-6">
<div className="flex flex-col items-center">
<button 
onClick={() => setShowProfileInfo(!showProfileInfo)}
className="relative group cursor-pointer focus:outline-none"
>
{profileImage ? (
<img src={profileImage} alt="Profile" className="w-24 h-24 rounded-full object-cover border-0 shadow-lg group-hover:border-gray-200 transition" />
) : (
<div className="bg-yellow-300 rounded-full p-4 group-hover:bg-yellow-300 transition">
<User className="w-16 h-16 text-black" />
</div>
)}
<label 
onClick={(e) => e.stopPropagation()}
className={`absolute bottom-0 right-0 text-white p-2 rounded-full cursor-pointer transition shadow-lg ${
darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-800 hover:bg-gray-700'
}`}
>
<Upload className="w-4 h-4" />
<input
type="file"
accept="image/*"
onChange={(e) => e.target.files[0] && handleProfileImageUpload(e.target.files[0])}
className="hidden"
/>
</label>
</button>
<p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
Click profile to {showProfileInfo ? 'hide' : 'view'} details
</p>
</div>

{showProfileInfo && (
<div className={`mt-6 rounded-3xl p-6 shadow-lg border-0 ${
darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-yellow-50 to-yellow-100'
}`}>
{/* Profile info content - keeping existing code */}
<div className="flex items-center justify-between mb-4">
<h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Profile Information</h2>
{!isEditingProfile ? (
<button
onClick={() => setIsEditingProfile(true)}
className="bg-yellow-300 text-black px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition shadow-lg text-sm"
>
<Edit2 className="w-4 h-4 inline mr-1" />
Edit
</button>
) : (
<div className="flex gap-2">
<button
onClick={cancelProfileEdit}
className={`px-4 py-2 rounded-full font-semibold transition shadow-lg text-sm ${
darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-600 hover:bg-gray-500 text-white'
}`}
>
<X className="w-4 h-4 inline mr-1" />
Cancel
</button>
<button
onClick={saveProfile}
className="bg-yellow-300 text-black px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition shadow-lg text-sm flex items-center gap-1"
>
<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
</svg>
Save
</button>
</div>
)}
</div>

{isEditingProfile ? (
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div>
<label className={`block text-sm font-semibold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Full Name</label>
<input
type="text"
value={profileForm.name}
onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
placeholder="Enter your full name"
className={`w-full px-3 py-2 border-0 rounded-xl focus:outline-none ${
darkMode ? 'bg-gray-700 text-white focus:border-gray-600' : 'bg-white focus:border-gray-200'
}`}
/>
</div>
<div>
<label className={`block text-sm font-semibold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
<input
type="email"
value={profileForm.email}
onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
placeholder="Enter your email"
className={`w-full px-3 py-2 border-0 rounded-xl focus:outline-none ${
darkMode ? 'bg-gray-700 text-white focus:border-gray-600' : 'bg-white focus:border-gray-200'
}`}
/>
</div>
<div>
<label className={`block text-sm font-semibold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone</label>
<input
type="tel"
value={profileForm.phone}
onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
placeholder="Enter your phone number"
className={`w-full px-3 py-2 border-0 rounded-xl focus:outline-none ${
darkMode ? 'bg-gray-700 text-white focus:border-gray-600' : 'bg-white focus:border-gray-200'
}`}
/>
</div>
<div>
<label className={`block text-sm font-semibold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Occupation</label>
<input
type="text"
value={profileForm.occupation}
onChange={(e) => setProfileForm({...profileForm, occupation: e.target.value})}
placeholder="Enter your occupation"
className={`w-full px-3 py-2 border-0 rounded-xl focus:outline-none ${
darkMode ? 'bg-gray-700 text-white focus:border-gray-600' : 'bg-white focus:border-gray-200'
}`}
/>
</div>
<div className="md:col-span-2">
<label className={`block text-sm font-semibold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Address</label>
<input
type="text"
value={profileForm.address}
onChange={(e) => setProfileForm({...profileForm, address: e.target.value})}
placeholder="Enter your address"
className={`w-full px-3 py-2 border-0 rounded-xl focus:outline-none ${
darkMode ? 'bg-gray-700 text-white focus:border-gray-600' : 'bg-white focus:border-gray-200'
}`}
/>
</div>
</div>
) : (
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
{profile.name && (
<div className={`rounded-xl p-3 border-0 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
<p className={`text-xs font-semibold mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Full Name</p>
<p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{profile.name}</p>
</div>
)}
{profile.email && (
<div className={`rounded-xl p-3 border-0 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
<p className={`text-xs font-semibold mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Email</p>
<p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{profile.email}</p>
</div>
)}
{profile.phone && (
<div className={`rounded-xl p-3 border-0 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
<p className={`text-xs font-semibold mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Phone</p>
<p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{profile.phone}</p>
</div>
)}
{profile.occupation && (
<div className={`rounded-xl p-3 border-0 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
<p className={`text-xs font-semibold mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Occupation</p>
<p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{profile.occupation}</p>
</div>
)}
{profile.address && (
<div className={`rounded-xl p-3 border-0 md:col-span-2 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
<p className={`text-xs font-semibold mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Address</p>
<p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{profile.address}</p>
</div>
)}
{!profile.name && !profile.email && !profile.phone && !profile.address && !profile.occupation && (
<div className="md:col-span-2 text-center py-4">
<p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>No profile information yet. Click "Edit" to add your details.</p>
</div>
)}
</div>
)}
</div>
)}
</div>

{/* Welcome Section */}
<div className="text-center">
<h1 className={`text-5xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
{currentUser ? `${currentUser.name}'s View` : profile.name ? `Welcome back, ${profile.name.split(' ')[0]}` : 'Welcome'}
</h1>
<p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Here's your financial overview</p>
</div>

{wordOfYear && (
<div className="text-center py-8">
<p className={`text-sm font-semibold mb-2 uppercase tracking-wide ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Focus Statement</p>
<p className="text-6xl font-bold text-yellow-300">{wordOfYear}</p>
</div>
)}

{/* Financial Overview Wheel Chart */}
<div className={`rounded-3xl p-8 shadow-lg border-0 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
<h2 className={`text-2xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>Financial Overview</h2>
        
<ResponsiveContainer width="100%" height={350}>
<RechartsPieChart>
<defs>
<linearGradient id="homeIncomeGradient" x1="0" y1="0" x2="0" y2="1">
<stop offset="0%" stopColor="#34d399" stopOpacity={1}/>
<stop offset="100%" stopColor="#10b981" stopOpacity={1}/>
</linearGradient>
<linearGradient id="homeExpenseGradient" x1="0" y1="0" x2="0" y2="1">
<stop offset="0%" stopColor="#f87171" stopOpacity={1}/>
<stop offset="100%" stopColor="#dc2626" stopOpacity={1}/>
</linearGradient>
</defs>
<Pie
data={[
{
name: 'Income',
value: totalIncome,
fill: 'url(#homeIncomeGradient)'
},
{
name: 'Expenses',
value: totalExpenses,
fill: 'url(#homeExpenseGradient)'
}
]}
cx="50%"
cy="50%"
innerRadius={70}
outerRadius={120}
paddingAngle={0.5}
dataKey="value"
strokeWidth={0.3}
stroke="#ffffff"
>
{[
{ name: 'Income', value: totalIncome, fill: 'url(#homeIncomeGradient)' },
{ name: 'Expenses', value: totalExpenses, fill: 'url(#homeExpenseGradient)' }
].map((entry, index) => (
<Cell key={`cell-${index}`} fill={entry.fill} />
))}
</Pie>
<Tooltip 
contentStyle={{ 
backgroundColor: darkMode ? '#1f2937' : '#fff',
borderRadius: '12px',
fontWeight: '600',
boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
color: darkMode ? '#fff' : '#000'
}}
formatter={(value) => `$${value.toLocaleString('en-US', {minimumFractionDigits: 2})}`}
/>
<text 
x="50%" 
y="45%" 
textAnchor="middle" 
dominantBaseline="middle"
style={{ 
fontSize: '16px', 
fontWeight: '600',
fill: darkMode ? '#9ca3af' : '#6b7280'
}}
>
Balance
</text>
<text 
x="50%" 
y="55%" 
textAnchor="middle" 
dominantBaseline="middle"
style={{ 
fontSize: '32px', 
fontWeight: 'bold',
fill: balance >= 0 ? '#fde047' : '#dc2626'
}}
>
${Math.abs(balance).toLocaleString()}
</text>
</RechartsPieChart>
</ResponsiveContainer>
        
<div className="flex justify-center gap-8 mt-4">
<div className="flex items-center gap-2">
<div className="w-4 h-4 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-sm"></div>
<div className="text-left">
<p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Income</p>
<p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>${totalIncome.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
</div>
</div>
<div className="flex items-center gap-2">
<div className="w-4 h-4 rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-sm"></div>
<div className="text-left">
<p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Expenses</p>
<p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>${totalExpenses.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
</div>
</div>
</div>
</div>
</div>
)}

{/* NEW: Groceries Tab */}
{activeTab === 'groceries' && (
<div className="space-y-6">
<div className="flex items-center justify-between">
<div>
<h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Grocery List</h1>
<p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Manage your shopping list</p>
</div>
<button
onClick={() => {
setShowAddGrocery(!showAddGrocery);
setNewGrocery({ name: '', quantity: '', category: '' });
}}
className="bg-yellow-300 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 transition shadow-lg flex items-center gap-2"
>
<Plus className="w-5 h-5" />
Add Item
</button>
</div>

{/* Add Grocery Form */}
{showAddGrocery && (
<div className={`rounded-3xl p-6 shadow-sm border-0 ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-yellow-50 to-yellow-100'}`}>
<h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Add New Item</h3>
<div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
<input
type="text"
placeholder="Item Name"
value={newGrocery.name}
onChange={(e) => setNewGrocery({ ...newGrocery, name: e.target.value })}
className={`px-4 py-3 border-0 rounded-xl focus:outline-none ${
darkMode ? 'bg-gray-700 text-white' : 'bg-white'
}`}
/>
<input
type="number"
placeholder="Quantity"
value={newGrocery.quantity}
onChange={(e) => setNewGrocery({ ...newGrocery, quantity: e.target.value })}
className={`px-4 py-3 border-0 rounded-xl focus:outline-none ${
darkMode ? 'bg-gray-700 text-white' : 'bg-white'
}`}
/>
<select
value={newGrocery.category}
onChange={(e) => setNewGrocery({ ...newGrocery, category: e.target.value })}
className={`px-4 py-3 border-0 rounded-xl focus:outline-none ${
darkMode ? 'bg-gray-700 text-white' : 'bg-white'
}`}
>
<option value="">Select Category</option>
{groceryCategories.map(cat => (
<option key={cat} value={cat}>{cat}</option>
))}
</select>
</div>
<div className="flex gap-2">
<button
onClick={addGrocery}
className="flex-1 bg-yellow-300 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 transition"
>
Add to List
</button>
<button
onClick={() => {
setShowAddGrocery(false);
setNewGrocery({ name: '', quantity: '', category: '' });
}}
className={`px-6 py-3 rounded-full font-semibold transition ${
darkMode ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
}`}
>
Cancel
</button>
</div>
</div>
)}

{/* Grocery Items - Grouped by Category */}
<div className="space-y-4">
{groceryCategories.map(category => {
const itemsInCategory = groceries.filter(item => item.category === category);
if (itemsInCategory.length === 0) return null;

return (
<div key={category} className={`rounded-3xl p-6 shadow-sm border-0 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
<h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
{category} ({itemsInCategory.length})
</h3>
<div className="space-y-3">
{itemsInCategory.map(item => (
<div
key={item.id}
className={`p-4 rounded-2xl border-0 hover:shadow-md transition ${
item.purchased 
? darkMode ? 'bg-gray-700 opacity-60' : 'bg-gray-100 opacity-60'
: darkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-yellow-50 to-yellow-100'
}`}
>
{editingGroceryId === item.id ? (
<div className="space-y-3">
<input
type="text"
value={editGroceryForm.name}
onChange={(e) => setEditGroceryForm({...editGroceryForm, name: e.target.value})}
placeholder="Item Name"
className={`w-full px-4 py-2 border-0 rounded-xl focus:outline-none ${
darkMode ? 'bg-gray-600 text-white' : 'bg-white'
}`}
/>
<div className="grid grid-cols-2 gap-3">
<input
type="number"
value={editGroceryForm.quantity}
onChange={(e) => setEditGroceryForm({...editGroceryForm, quantity: e.target.value})}
placeholder="Quantity"
className={`px-4 py-2 border-0 rounded-xl focus:outline-none ${
darkMode ? 'bg-gray-600 text-white' : 'bg-white'
}`}
/>
<select
value={editGroceryForm.category}
onChange={(e) => setEditGroceryForm({...editGroceryForm, category: e.target.value})}
className={`px-4 py-2 border-0 rounded-xl focus:outline-none ${
darkMode ? 'bg-gray-600 text-white' : 'bg-white'
}`}
>
{groceryCategories.map(cat => (
<option key={cat} value={cat}>{cat}</option>
))}
</select>
</div>
<div className="flex gap-2">
<button
onClick={saveEditGrocery}
className="flex-1 bg-yellow-300 text-black px-4 py-2 rounded-full font-semibold hover:bg-yellow-400 transition flex items-center justify-center gap-2"
>
<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
</svg>
Save
</button>
<button
onClick={() => setEditingGroceryId(null)}
className={`flex-1 px-4 py-2 rounded-full font-semibold transition ${
darkMode ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
}`}
>
<X className="w-4 h-4 inline mr-2" />
Cancel
</button>
</div>
</div>
) : (
<div className="flex items-center justify-between">
<div className="flex items-center gap-4 flex-1">
<input
type="checkbox"
checked={item.purchased}
onChange={() => toggleGroceryPurchased(item.id)}
className="w-5 h-5 rounded cursor-pointer"
/>
<div className="flex-1">
<p className={`font-semibold text-lg ${item.purchased ? 'line-through' : ''} ${darkMode ? 'text-white' : 'text-gray-900'}`}>
{item.name}
</p>
<p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
Quantity: {item.quantity}
</p>
</div>
</div>
<div className="flex gap-2">
<button
onClick={() => startEditGrocery(item)}
className="p-2 hover:bg-yellow-200 rounded-full"
>
<Edit2 className="w-5 h-5" />
</button>
<button
onClick={() => deleteGrocery(item.id)}
className="p-2 hover:bg-red-100 rounded-full"
>
<Trash2 className="w-5 h-5 text-red-600" />
</button>
</div>
</div>
)}
</div>
))}
</div>
</div>
);
})}

{/* Empty State */}
{groceries.length === 0 && (
<div className={`text-center py-16 rounded-3xl border-0 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
<ShoppingCart className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
<p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Your grocery list is empty</p>
<p className={`text-sm mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Add items to start building your shopping list</p>
</div>
)}

{/* Summary */}
{groceries.length > 0 && (
<div className={`rounded-3xl p-6 shadow-lg border-0 ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-yellow-50 to-yellow-100'}`}>
<div className="grid grid-cols-3 gap-4 text-center">
<div>
<p className={`text-sm font-semibold uppercase ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Items</p>
<p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{groceries.length}</p>
</div>
<div>
<p className={`text-sm font-semibold uppercase ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Purchased</p>
<p className={`text-3xl font-bold text-green-500`}>{groceries.filter(item => item.purchased).length}</p>
</div>
<div>
<p className={`text-sm font-semibold uppercase ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Remaining</p>
<p className={`text-3xl font-bold text-yellow-500`}>{groceries.filter(item => !item.purchased).length}</p>
</div>
</div>
</div>
)}
</div>
</div>
)}

{activeTab === 'budget' && (
<div className="space-y-6">
<div className="flex items-center justify-between">
<h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Monthly Budget</h1>
</div>

<div className={`rounded-3xl shadow-sm border overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
<div className="flex items-center justify-between p-6">
<button onClick={() => setShowIncome(!showIncome)} className="flex items-center gap-3 flex-1">
<h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Income</h2>
{showIncome ? <ChevronUp className={`w-6 h-6 ${darkMode ? 'text-white' : ''}`} /> : <ChevronDown className={`w-6 h-6 ${darkMode ? 'text-white' : ''}`} />}
</button>
<button
onClick={() => {
setShowIncomeForm(!showIncomeForm);
setShowExpenseForm(false);
setNewItem({ name: '', amount: '', category: '', type: 'income' });
}}
className="bg-yellow-300 text-black px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition shadow-lg text-sm"
>
<Plus className="w-4 h-4 inline mr-1" />
Add Item
</button>
</div>
          
{showIncomeForm && (
<div className="px-6 pb-4">
<div className={`rounded-2xl p-4 border-0 ${darkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-yellow-50 to-yellow-100'}`}>
<div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
<input 
type="text" 
placeholder="Income Name" 
value={newItem.name} 
onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} 
className={`px-4 py-2 border-0 rounded-xl focus:outline-none ${
darkMode ? 'bg-gray-600 text-white' : 'bg-white'
}`}
/>
<input 
type="number" 
placeholder="Amount" 
value={newItem.amount} 
onChange={(e) => setNewItem({ ...newItem, amount: e.target.value })} 
className={`px-4 py-2 border-0 rounded-xl focus:outline-none ${
darkMode ? 'bg-gray-600 text-white' : 'bg-white'
}`}
/>
<select 
value={newItem.category} 
onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} 
className={`px-4 py-2 border-0 rounded-xl focus:outline-none ${
darkMode ? 'bg-gray-600 text-white' : 'bg-white'
}`}
>
<option value="">Category</option>
{categories.income.map(cat => <option key={cat} value={cat}>{cat}</option>)}
</select>
</div>
<div className="flex gap-2">
<button 
onClick={() => addItem('income')} 
className="flex-1 bg-yellow-300 text-black px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition"
>
Add Income
</button>
<button 
onClick={() => {
setShowIncomeForm(false);
setNewItem({ name: '', amount: '', category: '', type: 'expense' });
}} 
className={`px-4 py-2 rounded-full font-semibold transition ${
darkMode ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
}`}
>
Cancel
</button>
</div>
</div>
</div>
)}
          
{showIncome && (
<div className="px-6 pb-6 space-y-3">
{income.map(item => (
<div key={item.id} className={`p-4 rounded-2xl border-0 hover:shadow-md transition ${
darkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-yellow-50 to-yellow-100'
}`}>
{editingId === item.id && editingType === 'income' ? (
<div className="space-y-3">
<input
type="text"
value={editForm.name}
onChange={(e) => setEditForm({...editForm, name: e.target.value})}
placeholder="Name"
className={`w-full px-4 py-2 border-0 rounded-xl focus:outline-none ${
darkMode ? 'bg-gray-600 text-white' : 'bg-white'
}`}
/>
<input
type="number"
value={editForm.amount}
onChange={(e) => setEditForm({...editForm, amount: e.target.value})}
placeholder="Amount"
className={`w-full px-4 py-2 border-0 rounded-xl focus:outline-none ${
darkMode ? 'bg-gray-600 text-white' : 'bg-white'
}`}
/>
<select
value={editForm.category}
onChange={(e) => setEditForm({...editForm, category: e.target.value})}
className={`w-full px-4 py-2 border-0 rounded-xl focus:outline-none ${
darkMode ? 'bg-gray-600 text-white' : 'bg-white'
}`}
>
{categories.income.map(cat => <option key={cat} value={cat}>{cat}</option>)}
</select>
<div className="flex gap-2">
<button onClick={saveEdit} className="flex-1 bg-yellow-300 text-black px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition flex items-center justify-center gap-2">
<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
</svg>
Save
</button>
<button onClick={() => setEditingId(null)} className={`flex-1 px-4 py-2 rounded-full font-semibold transition ${
darkMode ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
}`}>
<X className="w-4 h-4 inline mr-2" />
Cancel
</button>
</div>
</div>
) : (
<div className="flex items-center justify-between">
<div>
<p className={`font-semibold ${darkMode ? 'text-white' : ''}`}>{item.name}</p>
<p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.category}</p>
<p className={`text-2xl font-bold ${darkMode ? 'text-white' : ''}`}>${item.amount.toFixed(2)}</p>
</div>
<div className="flex gap-2">
<button onClick={() => startEdit(item, 'income')} className="p-2 hover:bg-yellow-200 rounded-full"><Edit2 className="w-5 h-5" /></button>
<button onClick={() => deleteItem(item.id, 'income')} className="p-2 hover:bg-red-100 rounded-full"><Trash2 className="w-5 h-5 text-red-600" /></button>
</div>
</div>
)}
</div>
))}
</div>
)}
</div>

<div className={`rounded-3xl shadow-sm border overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
<div className="flex items-center justify-between p-6">
<button onClick={() => setShowExpenses(!showExpenses)} className="flex items-center gap-3 flex-1">
<h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Expenses</h2>
{showExpenses ? <ChevronUp className={`w-6 h-6 ${darkMode ? 'text-white' : ''}`} /> : <ChevronDown className={`w-6 h-6 ${darkMode ? 'text-white' : ''}`} />}
</button>
<button
onClick={() => {
setShowExpenseForm(!showExpenseForm);
setShowIncomeForm(false);
setNewItem({ name: '', amount: '', category: '', type: 'expense' });
}}
className="bg-yellow-300 text-black px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition shadow-lg text-sm"
>
<Plus className="w-4 h-4 inline mr-1" />
Add Item
</button>
</div>
          
{showExpenseForm && (
<div className="px-6 pb-4">
<div className={`rounded-2xl p-4 ${darkMode ? 'bg-gray-700 border-2 border-gray-600' : 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-0'}`}>
<div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
<input 
type="text" 
placeholder="Expense Name" 
value={newItem.name} 
onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} 
className={`px-4 py-2 rounded-xl focus:outline-none ${
darkMode ? 'bg-gray-600 text-white border-2 border-gray-500' : 'bg-white border-0'
}`}
/>
<input 
type="number" 
placeholder="Amount" 
value={newItem.amount} 
onChange={(e) => setNewItem({ ...newItem, amount: e.target.value })} 
className={`px-4 py-2 rounded-xl focus:outline-none ${
darkMode ? 'bg-gray-600 text-white border-2 border-gray-500' : 'bg-white border-0'
}`}
/>
<select 
value={newItem.category} 
onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} 
className={`px-4 py-2 rounded-xl focus:outline-none ${
darkMode ? 'bg-gray-600 text-white border-2 border-gray-500' : 'bg-white border-0'
}`}
>
<option value="">Category</option>
{categories.expense.map(cat => <option key={cat} value={cat}>{cat}</option>)}
</select>
</div>
<div className="flex gap-2">
<button 
onClick={() => addItem('expense')} 
className="flex-1 bg-yellow-300 text-black px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition"
>
Add Expense
</button>
<button 
onClick={() => {
setShowExpenseForm(false);
setNewItem({ name: '', amount: '', category: '', type: 'expense' });
}} 
className={`px-4 py-2 rounded-full font-semibold transition ${
darkMode ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
}`}
>
Cancel
</button>
</div>
</div>
</div>
)}
          
{showExpenses && (
<div className="px-6 pb-6 space-y-3">
{expenses.map(item => (
<div key={item.id} className={`p-4 rounded-2xl border-0 hover:shadow-md transition ${
darkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-yellow-50 to-yellow-100'
}`}>
{editingId === item.id && editingType === 'expense' ? (
<div className="space-y-3">
<input
type="text"
value={editForm.name}
onChange={(e) => setEditForm({...editForm, name: e.target.value})}
placeholder="Name"
className={`w-full px-4 py-2 border-0 rounded-xl focus:outline-none ${
darkMode ? 'bg-gray-600 text-white' : 'bg-white'
}`}
/>
<input
type="number"
value={editForm.amount}
onChange={(e) => setEditForm({...editForm, amount: e.target.value})}
placeholder="Amount"
className={`w-full px-4 py-2 border-0 rounded-xl focus:outline-none ${
darkMode ? 'bg-gray-600 text-white' : 'bg-white'
}`}
/>
<select
value={editForm.category}
onChange={(e) => setEditForm({...editForm, category: e.target.value})}
className={`w-full px-4 py-2 border-0 rounded-xl focus:outline-none ${
darkMode ? 'bg-gray-600 text-white' : 'bg-white'
}`}
>
{categories.expense.map(cat => <option key={cat} value={cat}>{cat}</option>)}
</select>
<div className="flex gap-2">
<button onClick={saveEdit} className="flex-1 bg-yellow-300 text-black px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition flex items-center justify-center gap-2">
<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
</svg>
Save
</button>
<button onClick={() => setEditingId(null)} className={`flex-1 px-4 py-2 rounded-full font-semibold transition ${
darkMode ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
}`}>
<X className="w-4 h-4 inline mr-2" />
Cancel
</button>
</div>
</div>
) : (
<div className="flex items-center justify-between">
<div>
<p className={`font-semibold ${darkMode ? 'text-white' : ''}`}>{item.name}</p>
<p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.category}</p>
<p className={`text-2xl font-bold ${darkMode ? 'text-white' : ''}`}>${item.amount.toFixed(2)}</p>
</div>
<div className="flex gap-2">
<button onClick={() => startEdit(item, 'expense')} className="p-2 hover:bg-yellow-200 rounded-full"><Edit2 className="w-5 h-5" /></button>
<button onClick={() => deleteItem(item.id, 'expense')} className="p-2 hover:bg-red-100 rounded-full"><Trash2 className="w-5 h-5 text-red-600" /></button>
</div>
</div>
)}
</div>
))}
</div>
)}
</div>
</div>
)}

{activeTab === 'seasonal' && (
<div className="space-y-6">
<div className="flex items-center justify-between">
<h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>SZN Breakdown</h1>
<select
value={selectedYear}
onChange={(e) => setSelectedYear(parseInt(e.target.value))}
className="px-6 py-3 bg-gradient-to-r from-yellow-300 to-yellow-300 text-black font-bold text-2xl rounded-2xl border-0 focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-lg cursor-pointer"
>
{Array.from({ length: 37 }, (_, i) => 2024 + i).map(year => (
<option key={year} value={year}>{year}</option>
))}
</select>
</div>
        
<div className={`backdrop-blur-sm rounded-3xl p-6 shadow-lg border-0 ${darkMode ? 'bg-gray-800/90' : 'bg-yellow-300/20'}`}>
<div className="flex items-center justify-between">
<div className="flex-1">
<label className={`text-sm font-semibold uppercase ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>Focus Statement</label>
{isEditingWord ? (
<input 
type="text" 
value={wordOfYear} 
onChange={(e) => setWordOfYear(e.target.value)} 
className={`w-full px-4 py-2 rounded-2xl mt-2 border-2 focus:outline-none ${
darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white/80 border-gray-300'
}`}
/>
) : (
<p className={`text-3xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{wordOfYear || 'Not set'}</p>
)}
</div>
<button 
onClick={() => setIsEditingWord(!isEditingWord)} 
className={`p-3 rounded-full transition ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
title={isEditingWord ? 'Save' : 'Edit'}
>
{isEditingWord ? (
<svg className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
</svg>
) : (
<Edit2 className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
)}
</button>
</div>
</div>

{/* Season Navigation Bar */}
<div className={`rounded-3xl shadow-sm border-0 overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
<div className="p-4">
<div className="flex items-center gap-2 mb-3">
<Calendar className="w-5 h-5 text-yellow-300" />
<p className={`text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Select Season</p>
</div>
<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
{seasons.map(season => (
<div key={season.name} className="flex flex-col gap-2">
<button 
onClick={() => setSelectedSeason(season.name)} 
className={`px-4 py-3 rounded-xl font-semibold transition ${
selectedSeason === season.name 
? 'bg-yellow-300 text-black shadow-md' 
: darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
}`}
>
{season.name}
</button>
<button
onClick={() => toggleSeasonLock(season.name)}
className={`p-2 rounded-full shadow-md transition ${
lockedSeasons[season.name] 
? 'bg-gradient-to-br from-gray-400/80 to-gray-500/80 backdrop-blur-sm text-white hover:from-gray-500/80 hover:to-gray-600/80' 
: darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white border-0' : 'bg-yellow-100 border-0 hover:bg-yellow-200'
}`}
title={lockedSeasons[season.name] ? 'Unlock Season' : 'Lock Season'}
>
{lockedSeasons[season.name] ? <Lock className="w-5 h-5 mx-auto" /> : <Unlock className="w-5 h-5 mx-auto" />}
</button>
</div>
))}
</div>
</div>
</div>

{lockedSeasons[selectedSeason] && (
<div className="bg-red-50 border-2 border-red-300 rounded-3xl p-4">
<p className="text-red-800 font-semibold flex items-center gap-2">
<Lock className="w-5 h-5" />
This season is locked and cannot be edited
</p>
</div>
)}

{/* Seasonal Content - Month breakdown with weeks */}
{selectedSeasonData && selectedSeasonData.months.map((month) => (
<div key={month} className={`rounded-3xl shadow-sm border-0 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
<button onClick={() => toggleMonth(month)} className={`w-full flex items-center justify-between p-6 transition ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-yellow-50'}`}>
<h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : ''}`}>{month}</h3>
{expandedMonths[month] ? <ChevronUp className={`w-6 h-6 ${darkMode ? 'text-white' : ''}`} /> : <ChevronDown className={`w-6 h-6 ${darkMode ? 'text-white' : ''}`} />}
</button>
{expandedMonths[month] && (
<div className="px-6 pb-6 space-y-4">
{Array.from({ length: getWeekCount(selectedSeason, month) }, (_, i) => i + 1).map((week) => {
const weekData = getWeekData(selectedSeason, month, week);
const isEditing = editingWeek === `${month}-${week}`;
const weekBalance = calculateWeekTotal(selectedSeason, month, week);
const weekLockKey = getWeekLockKey(selectedSeason, month, week);
const isWeekLocked = lockedWeeks[weekLockKey] || lockedSeasons[selectedSeason];
const isWeekCollapsed = collapsedWeeks[weekLockKey];
                  
return (
<div key={week} className={`rounded-2xl p-4 border-0 ${darkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-yellow-50 to-yellow-100'}`}>
<div className="flex justify-between items-center mb-3">
<div className="flex items-center gap-3">
<h4 className={`font-bold text-lg ${darkMode ? 'text-white' : ''}`}>Week {week}</h4>
<button
onClick={() => toggleWeekCollapse(selectedSeason, month, week)}
className={`p-1 rounded-full transition ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-yellow-200'}`}
title={isWeekCollapsed ? 'Expand Week' : 'Collapse Week'}
>
{isWeekCollapsed ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
</button>
</div>
<div className="flex items-center gap-2">
{!isWeekCollapsed && (
<>
{!lockedSeasons[selectedSeason] && (
<button
onClick={() => toggleWeekLock(selectedSeason, month, week)}
className={`p-2 rounded-full shadow-md transition ${
isWeekLocked 
? 'bg-gradient-to-br from-gray-400/80 to-gray-500/80 backdrop-blur-sm text-white hover:from-gray-500/80 hover:to-gray-600/80' 
: darkMode ? 'bg-gray-600 hover:bg-gray-500 border-0' : 'bg-yellow-100 border-0 hover:bg-yellow-200'
}`}
title={isWeekLocked ? 'Unlock Week' : 'Lock Week'}
>
{isWeekLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
</button>
)}
{!isWeekLocked && (
<button
onClick={() => setEditingWeek(isEditing ? null : `${month}-${week}`)}
className={`p-2 rounded-full transition ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-yellow-200'}`}
>
{isEditing ? <X className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
</button>
)}
</>
)}
</div>
</div>

{isWeekCollapsed ? (
<div className={`rounded-xl p-3 ${darkMode ? 'bg-gray-600' : 'bg-gray-900'}`}>
<div className="flex justify-between items-center">
<span className="text-sm font-semibold text-white">Week Balance</span>
<span className={`text-xl font-bold ${weekBalance >= 0 ? 'text-white' : 'text-red-400'}`}>
${weekBalance.toFixed(2)}
</span>
</div>
</div>
) : isEditing && !isWeekLocked ? (
<div className="space-y-4">
<div className="grid grid-cols-2 gap-3">
<div>
<label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Check Date</label>
<input
type="date"
value={weekData.checkDate}
onChange={(e) => updateWeekData(selectedSeason, month, week, {...weekData, checkDate: e.target.value})}
className={`w-full px-3 py-2 border-0 rounded-xl focus:outline-none ${
darkMode ? 'bg-gray-600 text-white' : 'bg-white'
}`}
/>
</div>
<div>
<label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Assigned To</label>
<select
value={weekData.assignedTo}
onChange={(e) => updateWeekData(selectedSeason, month, week, {...weekData, assignedTo: e.target.value})}
className={`w-full px-3 py-2 border-0 rounded-xl focus:outline-none ${
darkMode ? 'bg-gray-600 text-white' : 'bg-white'
}`}
>
<option value="">Select collaborator</option>
{collaborators.map(collab => (
<option key={collab.id} value={collab.name}>{collab.name}</option>
))}
</select>
</div>
</div>

<div>
<div className="flex items-center justify-between mb-2">
<label className={`text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Income</label>
<button
onClick={() => addIncomeToWeek(selectedSeason, month, week)}
className="bg-yellow-300 text-black px-3 py-1 rounded-full text-xs font-semibold hover:bg-yellow-300 transition"
>
<Plus className="w-3 h-3 inline mr-1" />
Add
</button>
</div>

{weekData.incomeItems.map((inc) => {
const selectedIncome = income.find(i => i.id === parseInt(inc.incomeId));
return (
<div key={inc.id} className={`p-3 rounded-xl border-0 mb-2 ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>
<div className="flex items-center gap-2">
<select
value={inc.incomeId}
onChange={(e) => updateWeekIncome(selectedSeason, month, week, inc.id, 'incomeId', e.target.value)}
className={`flex-1 px-2 py-1 border rounded-lg text-sm focus:outline-none ${
darkMode ? 'bg-gray-500 text-white border-gray-400' : 'bg-gray-50 border-gray-300'
}`}
>
<option value="">Select Income</option>
{income.map(incomeItem => (
<option key={incomeItem.id} value={incomeItem.id}>
{incomeItem.name} - ${incomeItem.amount}
</option>
))}
</select>
<button
onClick={() => deleteWeekIncome(selectedSeason, month, week, inc.id)}
className="p-2 hover:bg-red-100 rounded-full transition"
>
<Trash2 className="w-4 h-4 text-red-600" />
</button>
</div>
{selectedIncome && (
<p className={`text-xs mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Amount: ${selectedIncome.amount.toFixed(2)}</p>
)}
</div>
);
})}
</div>

<div>
<div className="flex items-center justify-between mb-2">
<label className={`text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Expenses</label>
<button
onClick={() => addExpenseToWeek(selectedSeason, month, week)}
className="bg-yellow-300 text-black px-3 py-1 rounded-full text-xs font-semibold hover:bg-yellow-300 transition"
>
<Plus className="w-3 h-3 inline mr-1" />
Add
</button>
</div>

{weekData.expenses.map((exp) => {
const selectedExpense = expenses.find(e => e.id === parseInt(exp.expenseId));
return (
<div key={exp.id} className={`p-3 rounded-xl border-0 mb-2 ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>
<div className="grid grid-cols-4 gap-2 mb-2">
<select
value={exp.expenseId}
onChange={(e) => updateWeekExpense(selectedSeason, month, week, exp.id, 'expenseId', e.target.value)}
className={`px-2 py-1 border rounded-lg text-sm focus:outline-none ${
darkMode ? 'bg-gray-500 text-white border-gray-400' : 'bg-gray-50 border-gray-300'
}`}
>
<option value="">Select</option>
{expenses.map(expense => (
<option key={expense.id} value={expense.id}>
{expense.name}
</option>
))}
</select>
<input
type="date"
value={exp.dueDate}
onChange={(e) => updateWeekExpense(selectedSeason, month, week, exp.id, 'dueDate', e.target.value)}
className={`px-2 py-1 border rounded-lg text-sm focus:outline-none ${
darkMode ? 'bg-gray-500 text-white border-gray-400' : 'bg-gray-50 border-gray-300'
}`}
/>
<label className={`flex items-center gap-1 text-sm ${darkMode ? 'text-white' : ''}`}>
<input
type="checkbox"
checked={exp.paid}
onChange={(e) => updateWeekExpense(selectedSeason, month, week, exp.id, 'paid', e.target.checked)}
className="rounded"
/>
Paid
</label>
<button
onClick={() => deleteWeekExpense(selectedSeason, month, week, exp.id)}
className="p-1 hover:bg-red-100 rounded-full transition"
>
<Trash2 className="w-4 h-4 text-red-600" />
</button>
</div>
{selectedExpense && (
<p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Amount: ${selectedExpense.amount.toFixed(2)}</p>
)}
</div>
);
})}
</div>

<div>
<label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Savings</label>
<input
type="number"
placeholder="0.00"
value={weekData.savings || ''}
onChange={(e) => updateWeekData(selectedSeason, month, week, {...weekData, savings: e.target.value})}
className={`w-full px-3 py-2 border-0 rounded-xl focus:outline-none ${
darkMode ? 'bg-gray-600 text-white' : 'bg-white'
}`}
/>
</div>
</div>
) : (
<div className="space-y-3">
{isWeekLocked && (
<div className="bg-red-50 border-2 border-red-300 rounded-xl p-2 mb-3">
<p className="text-red-800 text-sm font-semibold flex items-center gap-2">
<Lock className="w-4 h-4" />
This week is locked
</p>
</div>
)}
                          
<div className="grid grid-cols-2 gap-4 text-sm">
<div>
<span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Check Date:</span>
<span className={`ml-2 font-semibold ${darkMode ? 'text-white' : ''}`}>{weekData.checkDate || 'Not set'}</span>
</div>
<div className="flex items-center gap-2">
<span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Assigned To:</span>
{weekData.assignedTo && collaborators.find(c => c.name === weekData.assignedTo) ? (
<>
<div 
className="w-4 h-4 rounded-full"
style={{ backgroundColor: collaborators.find(c => c.name === weekData.assignedTo)?.color }}
></div>
<span className={`font-semibold ${darkMode ? 'text-white' : ''}`}>{weekData.assignedTo}</span>
</>
) : (
<span className={`ml-2 font-semibold ${darkMode ? 'text-white' : ''}`}>{weekData.assignedTo || 'Not assigned'}</span>
)}
</div>
</div>
                          
<div className={`rounded-xl p-3 border-0 ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>
<p className={`text-xs font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Income ({weekData.incomeItems.length})</p>
{weekData.incomeItems.length > 0 ? (
<div className="space-y-1">
{weekData.incomeItems.map(inc => {
const incomeItem = income.find(i => i.id === parseInt(inc.incomeId));
return incomeItem ? (
<div key={inc.id} className={`flex justify-between text-xs p-2 rounded-lg ${darkMode ? 'bg-green-900/30' : 'bg-green-50'}`}>
<span className={darkMode ? 'text-white' : ''}>{incomeItem.name}</span>
<span className={`font-semibold ${darkMode ? 'text-green-400' : 'text-green-700'}`}>${incomeItem.amount.toFixed(2)}</span>
</div>
) : null;
})}
</div>
) : (
<p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>No income assigned</p>
)}
</div>

<div className={`rounded-xl p-3 border-0 ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>
<p className={`text-xs font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Expenses ({weekData.expenses.length})</p>
{weekData.expenses.length > 0 ? (
<div className="space-y-1">
{weekData.expenses.map(exp => {
const expense = expenses.find(e => e.id === parseInt(exp.expenseId));
return expense ? (
<div key={exp.id} className={`flex justify-between items-center text-xs p-2 rounded-lg ${darkMode ? 'bg-gray-500' : 'bg-gray-50'}`}>
<span className={darkMode ? 'text-white' : ''}>{expense.name}</span>
<div className="flex items-center gap-2">
<span className={`font-semibold ${darkMode ? 'text-white' : ''}`}>${expense.amount.toFixed(2)}</span>
{exp.dueDate && <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Due: {exp.dueDate}</span>}
<span className={`px-2 py-0.5 rounded-full text-xs font-medium ${exp.paid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
{exp.paid ? 'Paid' : 'Due'}
</span>
</div>
</div>
) : null;
})}
</div>
) : (
<p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>No expenses assigned</p>
)}
</div>

<div className={`rounded-xl p-3 border-0 ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>
<div className="flex justify-between items-center">
<span className={`text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Savings</span>
<span className={`text-lg font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>${parseFloat(weekData.savings || 0).toFixed(2)}</span>
</div>
</div>

<div className={`rounded-xl p-3 ${darkMode ? 'bg-gray-600' : 'bg-gray-900'}`}>
<div className="flex justify-between items-center">
<span className="text-sm font-semibold text-white">Week Balance</span>
<span className={`text-xl font-bold ${weekBalance >= 0 ? 'text-white' : 'text-red-400'}`}>
${weekBalance.toFixed(2)}
</span>
</div>
</div>
</div>
)}
</div>
);
})}
                
{/* Add Week Button */}
{!lockedSeasons[selectedSeason] && (
<button
onClick={() => addWeekToMonth(selectedSeason, month)}
className="w-full bg-yellow-300 text-black px-6 py-3 rounded-2xl font-semibold hover:bg-yellow-300 transition shadow-md flex items-center justify-center gap-2"
>
<Plus className="w-5 h-5" />
Add Week to {month}
</button>
)}
</div>
)}
</div>
))}

{/* Linked Savings Accounts Section */}
<div className={`rounded-3xl p-6 shadow-lg border-0 relative ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-50 to-blue-100'}`}>
{!isPremium && (
<div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-3xl z-10 flex items-center justify-center">
<div className="text-center">
<div className="bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
<Lock className="w-8 h-8 text-black" />
</div>
<h4 className="text-xl font-bold text-white mb-2">Premium Feature</h4>
<p className="text-gray-200 mb-4">Link your savings accounts with Premium</p>
<button
onClick={() => setShowPremiumModal(true)}
className="bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-black px-6 py-3 rounded-2xl font-bold transition shadow-lg"
>
Upgrade to Premium
</button>
</div>
</div>
)}
<div className="flex items-center justify-between mb-4">
<h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Linked Savings Accounts</h2>
{!showAddAccount && isPremium && (
<button
onClick={() => setShowAddAccount(true)}
className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600 transition shadow-lg text-sm flex items-center gap-2"
>
<Plus className="w-4 h-4" />
Link Account
</button>
)}
</div>

{showAddAccount && (
<div className={`rounded-2xl p-4 mb-4 ${darkMode ? 'bg-gray-700 border-2 border-gray-600' : 'bg-white border-2 border-blue-200'}`}>
<h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Add New Account</h3>
<div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
<input
type="text"
placeholder="Bank Name (e.g., Chase, Bank of America)"
value={newAccount.bankName}
onChange={(e) => setNewAccount({...newAccount, bankName: e.target.value})}
className={`px-4 py-2 rounded-xl focus:outline-none ${
darkMode ? 'bg-gray-600 text-white border-2 border-gray-500' : 'bg-gray-50 border-2 border-gray-300'
}`}
/>
<input
type="text"
placeholder="Account Name (e.g., High Yield Savings)"
value={newAccount.accountName}
onChange={(e) => setNewAccount({...newAccount, accountName: e.target.value})}
className={`px-4 py-2 rounded-xl focus:outline-none ${
darkMode ? 'bg-gray-600 text-white border-2 border-gray-500' : 'bg-gray-50 border-gray-300'
}`}
/>
<input
type="text"
placeholder="Account Number (last 4 digits)"
value={newAccount.accountNumber}
onChange={(e) => setNewAccount({...newAccount, accountNumber: e.target.value})}
maxLength="4"
className={`px-4 py-2 rounded-xl focus:outline-none ${
darkMode ? 'bg-gray-600 text-white border-2 border-gray-500' : 'bg-gray-50 border-2 border-gray-300'
}`}
/>
<input
type="number"
placeholder="Current Balance"
value={newAccount.balance}
onChange={(e) => setNewAccount({...newAccount, balance: e.target.value})}
className={`px-4 py-2 rounded-xl focus:outline-none ${
darkMode ? 'bg-gray-600 text-white border-2 border-gray-500' : 'bg-gray-50 border-2 border-gray-300'
}`}
/>
</div>
<div className="flex gap-2">
<button
onClick={addSavingsAccount}
className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600 transition"
>
Link Account
</button>
<button
onClick={() => {
setShowAddAccount(false);
setNewAccount({ bankName: '', accountName: '', accountNumber: '', balance: '' });
}}
className={`flex-1 px-4 py-2 rounded-full font-semibold transition ${
darkMode ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
}`}
>
Cancel
</button>
</div>
</div>
)}

<div className="space-y-3">
{savingsAccounts.map(account => (
<div key={account.id} className={`rounded-2xl p-4 border-2 transition ${
darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-blue-200'
}`}>
<div className="flex items-start justify-between">
<div className="flex-1">
<div className="flex items-center gap-3 mb-2">
<div className="bg-blue-500 p-2 rounded-full">
<DollarSign className="w-5 h-5 text-white" />
</div>
<div>
<p className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{account.accountName}</p>
<p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{account.bankName}</p>
</div>
</div>
<div className="ml-12 space-y-1">
<p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
Account: {maskAccountNumber(account.accountNumber)}
</p>
<p className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
${account.balance.toLocaleString('en-US', {minimumFractionDigits: 2})}
</p>
<p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
Linked on {account.linkedDate}
</p>
</div>
</div>
<button
onClick={() => removeSavingsAccount(account.id)}
className="p-2 hover:bg-red-100 rounded-full transition"
>
<Trash2 className="w-5 h-5 text-red-600" />
</button>
</div>
</div>
))}

{savingsAccounts.length === 0 && !showAddAccount && (
<div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
<DollarSign className={`w-12 h-12 mx-auto mb-3 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
<p>No savings accounts linked yet. Connect your accounts to track your savings!</p>
</div>
)}

{savingsAccounts.length > 0 && (
<div className={`rounded-2xl p-4 border-2 ${
darkMode ? 'bg-gray-700 border-gray-600' : 'bg-blue-50 border-blue-300'
}`}>
<div className="flex justify-between items-center">
<span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Total Savings Balance</span>
<span className={`text-3xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
${savingsAccounts.reduce((sum, acc) => sum + acc.balance, 0).toLocaleString('en-US', {minimumFractionDigits: 2})}
</span>
</div>
</div>
)}
</div>
</div>

{/* Seasonal Financial Summary */}
<div className={`rounded-3xl p-8 shadow-lg border-0 mt-8 ${
darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-yellow-50 to-yellow-100'
}`}>
<h2 className={`text-3xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedSeason} Financial Summary</h2>
          
{/* 2 rows of 2 boxes */}
<div className="grid grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
<div className={`rounded-2xl p-4 shadow-md border-2 border-green-300 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
<div className="flex items-center gap-2 mb-2">
<div className="bg-green-100 p-2 rounded-full">
<TrendingUp className="w-5 h-5 text-green-600" />
</div>
<p className={`text-xs font-semibold uppercase ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Income</p>
</div>
<p className="text-2xl font-bold text-green-600">
${calculateSeasonalTotals(selectedSeason).income.toLocaleString('en-US', {minimumFractionDigits: 2})}
</p>
</div>

<div className={`rounded-2xl p-4 shadow-md border-2 border-red-300 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
<div className="flex items-center gap-2 mb-2">
<div className="bg-red-100 p-2 rounded-full">
<TrendingDown className="w-5 h-5 text-red-600" />
</div>
<p className={`text-xs font-semibold uppercase ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Expenses</p>
</div>
<p className="text-2xl font-bold text-red-600">
${calculateSeasonalTotals(selectedSeason).expenses.toLocaleString('en-US', {minimumFractionDigits: 2})}
</p>
</div>

<div className={`rounded-2xl p-4 shadow-md border-2 border-blue-300 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
<div className="flex items-center gap-2 mb-2">
<div className="bg-blue-100 p-2 rounded-full">
<PieChart className="w-5 h-5 text-blue-600" />
</div>
<p className={`text-xs font-semibold uppercase ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Savings</p>
</div>
<p className="text-2xl font-bold text-blue-600">
${calculateSeasonalSavings(selectedSeason).toLocaleString('en-US', {minimumFractionDigits: 2})}
</p>
</div>

<div className={`bg-gradient-to-br rounded-2xl p-4 shadow-md border-2 ${
calculateSeasonalTotals(selectedSeason).balance >= 0 
? 'from-yellow-300 via-yellow-300 to-yellow-300 border-gray-200' 
: 'from-red-300 via-red-400 to-red-500 border-red-400'
}`}>
<div className="flex items-center gap-2 mb-2">
<div className="bg-white bg-opacity-30 p-2 rounded-full">
<DollarSign className="w-5 h-5 text-gray-900" />
</div>
<p className="text-xs font-semibold text-gray-900 uppercase">Balance</p>
</div>
<p className="text-2xl font-bold text-gray-900">
${Math.abs(calculateSeasonalTotals(selectedSeason).balance).toLocaleString('en-US', {minimumFractionDigits: 2})}
</p>
</div>
</div>

{/* Chart */}
<div className="mt-8">
<h3 className={`text-xl font-bold mb-4 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>Visual Overview</h3>
<ResponsiveContainer width="100%" height={280}>
<RechartsPieChart>
<defs>
<linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
<stop offset="0%" stopColor="#34d399" stopOpacity={1}/>
<stop offset="100%" stopColor="#10b981" stopOpacity={1}/>
</linearGradient>
<linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
<stop offset="0%" stopColor="#f87171" stopOpacity={1}/>
<stop offset="100%" stopColor="#dc2626" stopOpacity={1}/>
</linearGradient>
</defs>
<Pie
data={[
{
name: 'Income',
value: calculateSeasonalTotals(selectedSeason).income,
fill: 'url(#incomeGradient)'
},
{
name: 'Expenses',
value: calculateSeasonalTotals(selectedSeason).expenses,
fill: 'url(#expenseGradient)'
}
]}
cx="50%"
cy="50%"
innerRadius={55}
outerRadius={95}
paddingAngle={0.5}
dataKey="value"
strokeWidth={0.3}
stroke="#ffffff"
>
{[
{ name: 'Income', value: calculateSeasonalTotals(selectedSeason).income, fill: 'url(#incomeGradient)' },
{ name: 'Expenses', value: calculateSeasonalTotals(selectedSeason).expenses, fill: 'url(#expenseGradient)' }
].map((entry, index) => (
<Cell key={`cell-${index}`} fill={entry.fill} />
))}
</Pie>
<Tooltip 
contentStyle={{ 
backgroundColor: darkMode ? '#1f2937' : '#fff',
borderRadius: '12px',
fontWeight: '600',
boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
color: darkMode ? '#fff' : '#000'
}}
formatter={(value) => `$${value.toLocaleString('en-US', {minimumFractionDigits: 2})}`}
/>
<text 
x="50%" 
y="48%" 
textAnchor="middle" 
dominantBaseline="middle"
style={{ 
fontSize: '24px', 
fontWeight: 'bold',
fill: calculateSeasonalTotals(selectedSeason).balance >= 0 ? '#fde047' : '#dc2626'
}}
>
${Math.abs(calculateSeasonalTotals(selectedSeason).balance).toLocaleString()}
</text>
<text 
x="50%" 
y="56%" 
textAnchor="middle" 
dominantBaseline="middle"
style={{ 
fontSize: '12px', 
fontWeight: '600',
fill: darkMode ? '#9ca3af' : '#6b7280'
}}
>
Balance
</text>
</RechartsPieChart>
</ResponsiveContainer>
<div className="flex justify-center gap-8 mt-2">
<div className="flex items-center gap-2">
<div className="w-3 h-3 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-sm"></div>
<span className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Income</span>
</div>
<div className="flex items-center gap-2">
<div className="w-3 h-3 rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-sm"></div>
<span className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Expenses</span>
</div>
</div>
</div>
</div>
</div>
)}

{activeTab === 'journal' && (
<div className="space-y-6">
<div>
<h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>SZN Journal</h1>
<p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Track your goals and accomplishments for each season</p>
</div>

{/* Season Navigation Bar */}
<div className={`rounded-3xl shadow-sm border-0 overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
<div className="p-4">
<div className="flex items-center gap-2 mb-3">
<Calendar className="w-5 h-5 text-yellow-300" />
<p className={`text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Select Season</p>
</div>
<div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
{seasons.map(season => (
<button 
key={season.name}
onClick={() => setSelectedSeason(season.name)} 
className={`px-4 py-3 rounded-xl font-semibold transition ${
selectedSeason === season.name 
? 'bg-yellow-300 text-black shadow-md' 
: darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
}`}
>
{season.name}
</button>
))}
</div>
</div>
</div>

{lockedSeasons[selectedSeason] && (
<div className="bg-red-50 border-2 border-red-300 rounded-3xl p-4">
<p className="text-red-800 font-semibold flex items-center gap-2">
<Lock className="w-5 h-5" />
This season is locked and cannot be edited
</p>
</div>
)}

<div className="space-y-6">
<div className={`rounded-3xl p-6 shadow-sm border-0 ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-yellow-50 to-yellow-100'}`}>
<h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedSeason} Goals</h3>
            
{/* Add new goal input */}
{!lockedSeasons[selectedSeason] && (
<div className="mb-4">
<div className="flex gap-2">
<input
type="text"
id={`goal-input-${selectedSeason}`}
placeholder="Add a new goal..."
className={`flex-1 px-4 py-3 border-0 rounded-2xl focus:outline-none ${
darkMode ? 'bg-gray-700 text-white' : 'bg-white'
}`}
onKeyPress={(e) => {
if (e.key === 'Enter') {
addJournalEntry(selectedSeason, 'goals', e.target.value);
e.target.value = '';
}
}}
/>
<button
onClick={() => {
const input = document.getElementById(`goal-input-${selectedSeason}`);
addJournalEntry(selectedSeason, 'goals', input.value);
input.value = '';
}}
className="bg-yellow-300 text-black px-6 py-3 rounded-2xl font-semibold hover:bg-yellow-300 transition"
>
<Plus className="w-5 h-5" />
</button>
</div>
</div>
)}
            
{/* Display goals as bullet points */}
<div className="space-y-2">
{getJournal(selectedSeason).goals.length > 0 ? (
getJournal(selectedSeason).goals.map((goal, index) => (
<div key={index} className={`flex items-start gap-3 p-3 rounded-xl border-0 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
<div className="w-2 h-2 bg-yellow-300 rounded-full mt-2 flex-shrink-0"></div>
<p className={`flex-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{goal}</p>
{!lockedSeasons[selectedSeason] && (
<button
onClick={() => deleteJournalEntry(selectedSeason, 'goals', index)}
className="text-red-600 hover:bg-red-100 p-1 rounded-full transition"
>
<Trash2 className="w-4 h-4" />
</button>
)}
</div>
))
) : (
<p className={`text-center py-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No goals added yet</p>
)}
</div>
</div>

<div className={`rounded-3xl p-6 shadow-sm border-0 ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-yellow-50 to-yellow-100'}`}>
<h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedSeason} Accomplishments</h3>
            
{/* Add new accomplishment input */}
{!lockedSeasons[selectedSeason] && (
<div className="mb-4">
<div className="flex gap-2">
<input
type="text"
id={`accomplishment-input-${selectedSeason}`}
placeholder="Add a new accomplishment..."
className={`flex-1 px-4 py-3 border-0 rounded-2xl focus:outline-none ${
darkMode ? 'bg-gray-700 text-white' : 'bg-white'
}`}
onKeyPress={(e) => {
if (e.key === 'Enter') {
addJournalEntry(selectedSeason, 'accomplishments', e.target.value);
e.target.value = '';
}
}}
/>
<button
onClick={() => {
const input = document.getElementById(`accomplishment-input-${selectedSeason}`);
addJournalEntry(selectedSeason, 'accomplishments', input.value);
input.value = '';
}}
className="bg-yellow-300 text-black px-6 py-3 rounded-2xl font-semibold hover:bg-yellow-300 transition"
>
<Plus className="w-5 h-5" />
</button>
</div>
</div>
)}
            
{/* Display accomplishments as bullet points */}
<div className="space-y-2">
{getJournal(selectedSeason).accomplishments.length > 0 ? (
getJournal(selectedSeason).accomplishments.map((accomplishment, index) => (
<div key={index} className={`flex items-start gap-3 p-3 rounded-xl border-0 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
<div className="w-2 h-2 bg-yellow-300 rounded-full mt-2 flex-shrink-0"></div>
<p className={`flex-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{accomplishment}</p>
{!lockedSeasons[selectedSeason] && (
<button
onClick={() => deleteJournalEntry(selectedSeason, 'accomplishments', index)}
className="text-red-600 hover:bg-red-100 p-1 rounded-full transition"
>
<Trash2 className="w-4 h-4" />
</button>
)}
</div>
))
) : (
<p className={`text-center py-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No accomplishments added yet</p>
)}
</div>
</div>

{/* Financial Challenges Section */}
<div className={`rounded-3xl p-6 shadow-sm border-0 relative ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-purple-50 to-purple-100'}`}>
{!isPremium && (
<div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-3xl z-10 flex items-center justify-center">
<div className="text-center">
<div className="bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
<Lock className="w-8 h-8 text-black" />
</div>
<h4 className="text-xl font-bold text-white mb-2">Premium Feature</h4>
<p className="text-gray-200 mb-4">Unlock Financial Challenges with Premium</p>
<button
onClick={() => setShowPremiumModal(true)}
className="bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-black px-6 py-3 rounded-2xl font-bold transition shadow-lg"
>
Upgrade to Premium
</button>
</div>
</div>
)}
<h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Financial Challenges</h3>
<p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Choose challenges to improve your financial habits and reach your goals!</p>

{/* Active Challenges */}
{activeChallenges.length > 0 && (
<div className="mb-6">
<h4 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Active Challenges</h4>
<div className="space-y-3">
{activeChallenges.slice(0, showAllChallenges ? activeChallenges.length : 2).map(challenge => {
const progressPercent = (challenge.progress / challenge.goal) * 100;
const isCompleted = challenge.status === 'completed';
                    
return (
<div key={challenge.id} className={`rounded-2xl p-4 border-2 ${
isCompleted
? darkMode ? 'bg-green-900/20 border-green-600' : 'bg-green-50 border-green-300'
: darkMode ? 'bg-gray-700 border-purple-500' : 'bg-white border-purple-300'
}`}>
<div className="flex items-start justify-between mb-3">
<div className="flex-1">
<div className="flex items-center gap-2 mb-1">
<h5 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{challenge.name}</h5>
<span className={`text-xs px-2 py-1 rounded-full font-medium ${
challenge.category === 'Savings' ? 'bg-blue-100 text-blue-700' :
challenge.category === 'Spending' ? 'bg-red-100 text-red-700' :
challenge.category === 'Debt' ? 'bg-orange-100 text-orange-700' :
challenge.category === 'Income' ? 'bg-green-100 text-green-700' :
'bg-gray-100 text-gray-700'
}`}>
{challenge.category}
</span>
{isCompleted && (
<span className="text-xs px-2 py-1 rounded-full font-medium bg-green-500 text-white">
✓ Completed
</span>
)}
</div>
<p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{challenge.description}</p>
<p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Started: {challenge.startDate}</p>
</div>
<button
onClick={() => removeChallenge(challenge.id)}
className="p-2 hover:bg-red-100 rounded-full transition"
>
<X className="w-4 h-4 text-red-600" />
</button>
</div>

{/* Progress Bar */}
<div className="space-y-2">
<div className="flex justify-between items-center text-sm">
<span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
Progress: {challenge.category === 'Savings' || challenge.category === 'Debt' || challenge.category === 'Income' ? `$${challenge.progress.toLocaleString()}` : `${challenge.progress} days`} / {challenge.category === 'Savings' || challenge.category === 'Debt' || challenge.category === 'Income' ? `$${challenge.goal.toLocaleString()}` : `${challenge.goal} days`}
</span>
<span className={`font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>{Math.round(progressPercent)}%</span>
</div>
<div className={`w-full h-3 rounded-full overflow-hidden ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
<div 
className={`h-full transition-all duration-300 ${
isCompleted ? 'bg-green-500' : 'bg-gradient-to-r from-purple-500 to-purple-600'
}`}
style={{ width: `${Math.min(progressPercent, 100)}%` }}
></div>
</div>
</div>

{!isCompleted && (
<div className="flex gap-2 mt-3">
<input
type="number"
placeholder="Update progress..."
className={`flex-1 px-3 py-2 rounded-xl text-sm focus:outline-none ${
darkMode ? 'bg-gray-600 text-white border-2 border-gray-500' : 'bg-gray-50 border-2 border-gray-300'
}`}
onKeyPress={(e) => {
if (e.key === 'Enter') {
updateChallengeProgress(challenge.id, parseFloat(e.target.value) || 0);
e.target.value = '';
}
}}
/>
<button
onClick={() => completeChallenge(challenge.id)}
className="bg-green-500 text-white p-2 rounded-xl hover:bg-green-600 transition"
title="Mark Complete"
>
<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
</svg>
</button>
</div>
)}
</div>
);
})}
</div>
                
{activeChallenges.length > 2 && (
<button
onClick={() => setShowAllChallenges(!showAllChallenges)}
className={`w-full mt-3 px-4 py-2 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${
darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
}`}
>
{showAllChallenges ? (
<>
<ChevronUp className="w-4 h-4" />
Show Less
</>
) : (
<>
<ChevronDown className="w-4 h-4" />
Show {activeChallenges.length - 2} More
</>
)}
</button>
)}
</div>
)}

{/* Available Challenges */}
<div>
<h4 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Available Challenges</h4>
<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
{financialChallenges
.filter(challenge => !activeChallenges.some(ac => ac.id === challenge.id))
.slice(0, showAllAvailableChallenges ? undefined : 2)
.map(challenge => (
<div key={challenge.id} className={`rounded-2xl p-4 border-2 transition hover:shadow-md ${
darkMode ? 'bg-gray-700 border-gray-600 hover:border-purple-500' : 'bg-white border-gray-200 hover:border-purple-300'
}`}>
<div className="mb-3">
<div className="flex items-center gap-2 mb-1">
<h5 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{challenge.name}</h5>
<span className={`text-xs px-2 py-1 rounded-full font-medium ${
challenge.category === 'Savings' ? 'bg-blue-100 text-blue-700' :
challenge.category === 'Spending' ? 'bg-red-100 text-red-700' :
challenge.category === 'Debt' ? 'bg-orange-100 text-orange-700' :
challenge.category === 'Income' ? 'bg-green-100 text-green-700' :
'bg-gray-100 text-gray-700'
}`}>
{challenge.category}
</span>
</div>
<p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{challenge.description}</p>
</div>
<button
onClick={() => startChallenge(challenge.id)}
className="w-full bg-purple-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-purple-600 transition flex items-center justify-center gap-2"
>
<Play className="w-4 h-4" />
Start Challenge
</button>
</div>
))}
</div>

{financialChallenges.filter(challenge => !activeChallenges.some(ac => ac.id === challenge.id)).length > 2 && (
<button
onClick={() => setShowAllAvailableChallenges(!showAllAvailableChallenges)}
className={`w-full mt-3 px-4 py-2 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${
darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
}`}
>
{showAllAvailableChallenges ? (
<>
<ChevronUp className="w-4 h-4" />
Show Less
</>
) : (
<>
<ChevronDown className="w-4 h-4" />
Show {financialChallenges.filter(challenge => !activeChallenges.some(ac => ac.id === challenge.id)).length - 2} More
</>
)}
</button>
)}

{financialChallenges.every(challenge => activeChallenges.some(ac => ac.id === challenge.id)) && (
<p className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
🎉 You've started all available challenges! Keep up the great work!
</p>
)}
</div>
</div>
</div>
</div>
)}

{activeTab === 'receipts' && (
<div className="space-y-6">
<div>
<h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Receipts</h1>
<p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Upload and manage your receipts</p>
</div>

<div className={`rounded-3xl p-6 shadow-sm border-0 ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-yellow-50 to-yellow-100'}`}>
<label className={`block text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Upload Receipt</label>
<input
type="file"
accept="image/*,.pdf"
onChange={(e) => e.target.files[0] && addReceipt(e.target.files[0])}
className={`w-full px-4 py-3 border-0 rounded-2xl focus:outline-none ${
darkMode ? 'bg-gray-700 text-white' : 'bg-white'
}`}
/>
<p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Accepts images and PDF files</p>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
{receipts.map(receipt => (
<div key={receipt.id} className={`rounded-3xl p-6 shadow-sm border-0 hover:shadow-md transition ${
darkMode ? 'bg-gray-800' : 'bg-white'
}`}>
<div className="flex items-start justify-between mb-3">
<div className="flex-1">
<p className={`font-semibold truncate mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{receipt.name}</p>
<p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{receipt.date}</p>
</div>
<button
onClick={() => deleteReceipt(receipt.id)}
className="p-2 hover:bg-red-100 rounded-full transition"
>
<Trash2 className="w-5 h-5 text-red-600" />
</button>
</div>
<span className="inline-block text-xs bg-yellow-200 text-gray-900 px-3 py-1 rounded-full font-medium">
{receipt.season}
</span>
</div>
))}
</div>

{receipts.length === 0 && (
<div className={`text-center py-16 rounded-3xl border-0 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
<Upload className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
<p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No receipts uploaded yet</p>
</div>
)}
</div>
)}

{activeTab === 'resources' && (
<div className="space-y-6">
{!isPremium ? (
<div className={`rounded-3xl p-8 shadow-lg border-0 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
<div className="max-w-md mx-auto">
<div className="bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center shadow-lg">
<Lock className="w-12 h-12 text-black" />
</div>
<h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Premium Feature</h2>
<p className={`text-lg mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
Access our complete library of educational resources, tutorials, and financial guides with SZN Premium.
</p>
              
<div className={`rounded-2xl p-6 mb-6 text-left ${darkMode ? 'bg-gray-700' : 'bg-yellow-50'}`}>
<h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>What you'll get:</h3>
<ul className="space-y-3">
<li className="flex items-start gap-3">
<svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
</svg>
<span className={darkMode ? 'text-white' : 'text-gray-900'}>Exclusive video tutorials on budgeting strategies</span>
</li>
<li className="flex items-start gap-3">
<svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
</svg>
<span className={darkMode ? 'text-white' : 'text-gray-900'}>Expert financial planning guides</span>
</li>
<li className="flex items-start gap-3">
<svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
</svg>
<span className={darkMode ? 'text-white' : 'text-gray-900'}>Monthly webinars and Q&A sessions</span>
</li>
<li className="flex items-start gap-3">
<svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
</svg>
<span className={darkMode ? 'text-white' : 'text-gray-900'}>Downloadable worksheets and templates</span>
</li>
</ul>
</div>

<button
onClick={() => setShowPremiumModal(true)}
className="w-full bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-black px-8 py-4 rounded-2xl font-bold transition shadow-lg text-lg"
>
Upgrade to Premium - $9.99/month
</button>
</div>
</div>
) : (
<>
<div>
<h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Resources</h1>
<p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Learn budgeting tips and financial planning strategies</p>
</div>

{/* Featured Video */}
<div className={`rounded-3xl p-6 shadow-lg border-0 ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-yellow-50 to-yellow-100'}`}>
<div className="flex items-center gap-2 mb-3">
<div className="bg-yellow-300 rounded-full p-1">
<Play className="w-4 h-4 text-black" />
</div>
<span className={`text-xs font-semibold uppercase ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>Featured</span>
</div>
<div className={`aspect-video rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-800'}`}>
<div className="absolute inset-0 bg-gradient-to-br from-yellow-300/20 to-transparent"></div>
<button className="relative z-10 bg-yellow-300 hover:bg-yellow-300 transition rounded-full p-6 shadow-2xl">
<Play className="w-12 h-12 text-black" />
</button>
</div>
<h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Getting Started with Seasonal Budgeting</h3>
<p className={`mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Learn how to organize your finances by seasons and take control of your yearly budget planning.</p>
<div className={`flex items-center gap-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
<span>15:32</span>
<span>•</span>
<span>Beginner Level</span>
</div>
</div>

{/* Video Categories */}
<div>
<h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Popular Topics</h2>
          
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
{/* Video Card 1 */}
<div className={`rounded-2xl p-4 shadow-sm hover:shadow-md transition border-0 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
<div className="aspect-video bg-gray-700 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden">
<div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-transparent"></div>
<button className="relative z-10 bg-white/90 hover:bg-white transition rounded-full p-4 shadow-lg">
<Play className="w-6 h-6 text-gray-800" />
</button>
</div>
<h4 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>How to Track Monthly Expenses</h4>
<p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Master the art of categorizing and monitoring your spending habits.</p>
<div className={`flex items-center gap-3 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
<span>12:45</span>
<span>•</span>
<span>Beginner</span>
</div>
</div>

{/* Video Card 2 */}
<div className={`rounded-2xl p-4 shadow-sm hover:shadow-md transition border-0 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
<div className="aspect-video bg-gray-700 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden">
<div className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-transparent"></div>
<button className="relative z-10 bg-white/90 hover:bg-white transition rounded-full p-4 shadow-lg">
<Play className="w-6 h-6 text-gray-800" />
</button>
</div>
<h4 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Setting Financial Goals</h4>
<p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Create achievable financial goals and track your progress throughout the year.</p>
<div className={`flex items-center gap-3 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
<span>18:20</span>
<span>•</span>
<span>Intermediate</span>
</div>
</div>

{/* Video Card 3 */}
<div className={`rounded-2xl p-4 shadow-sm hover:shadow-md transition border-0 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
<div className="aspect-video bg-gray-700 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden">
<div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-transparent"></div>
<button className="relative z-10 bg-white/90 hover:bg-white transition rounded-full p-4 shadow-lg">
<Play className="w-6 h-6 text-gray-800" />
</button>
</div>
<h4 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Building an Emergency Fund</h4>
<p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Learn strategies to save for unexpected expenses and financial security.</p>
<div className={`flex items-center gap-3 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
<span>10:15</span>
<span>•</span>
<span>Beginner</span>
</div>
</div>

{/* Video Card 4 */}
<div className={`rounded-2xl p-4 shadow-sm hover:shadow-md transition border-0 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
<div className="aspect-video bg-gray-700 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden">
<div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-transparent"></div>
<button className="relative z-10 bg-white/90 hover:bg-white transition rounded-full p-4 shadow-lg">
<Play className="w-6 h-6 text-gray-800" />
</button>
</div>
<h4 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Debt Management Strategies</h4>
<p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Effective methods to pay down debt and improve your financial health.</p>
<div className={`flex items-center gap-3 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
<span>22:10</span>
<span>•</span>
<span>Advanced</span>
</div>
</div>

{/* Video Card 5 */}
<div className={`rounded-2xl p-4 shadow-sm hover:shadow-md transition border-0 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
<div className="aspect-video bg-gray-700 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden">
<div className="absolute inset-0 bg-gradient-to-br from-yellow-500/30 to-transparent"></div>
<button className="relative z-10 bg-white/90 hover:bg-white transition rounded-full p-4 shadow-lg">
<Play className="w-6 h-6 text-gray-800" />
</button>
</div>
<h4 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Smart Saving Tips</h4>
<p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Discover practical ways to save money without sacrificing your lifestyle.</p>
<div className={`flex items-center gap-3 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
<span>14:30</span>
<span>•</span>
<span>Beginner</span>
</div>
</div>

{/* Video Card 6 */}
<div className={`rounded-2xl p-4 shadow-sm hover:shadow-md transition border-0 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
<div className="aspect-video bg-gray-700 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden">
<div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 to-transparent"></div>
<button className="relative z-10 bg-white/90 hover:bg-white transition rounded-full p-4 shadow-lg">
<Play className="w-6 h-6 text-gray-800" />
</button>
</div>
<h4 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Investment Basics for Beginners</h4>
<p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Get started with investing and grow your wealth over time.</p>
<div className={`flex items-center gap-3 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
<span>25:45</span>
<span>•</span>
<span>Intermediate</span>
</div>
</div>
</div>
</div>
</>
)}
</div>
)}
</div>

{/* Fixed Bottom Navigation - Updated with Groceries tab */}
<div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 max-w-4xl">
<div className={`backdrop-blur-lg rounded-full shadow-2xl border px-6 py-3 ${
darkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-gray-100/40 border-gray-200/60'
}`}>
<div className="flex items-center justify-center gap-4">
<button
onClick={() => setActiveTab('home')}
className={`flex flex-col items-center justify-center gap-1 transition-all ${
activeTab === 'home' ? 'text-yellow-300 scale-110' : darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-black hover:text-gray-800'
}`}
>
<Home className="w-6 h-6 transition-all" />
<span className="text-[9px] font-medium">Home</span>
</button>

<button
onClick={() => setActiveTab('budget')}
className={`flex flex-col items-center justify-center gap-1 transition-all ${
activeTab === 'budget' ? 'text-yellow-300 scale-110' : darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-black hover:text-gray-800'
}`}
>
<FileText className="w-6 h-6 transition-all" />
<span className="text-[9px] font-medium">Budget</span>
</button>

<button
onClick={() => setActiveTab('groceries')}
className={`flex flex-col items-center justify-center gap-1 transition-all ${
activeTab === 'groceries' ? 'text-yellow-300 scale-110' : darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-black hover:text-gray-800'
}`}
>
<ShoppingCart className="w-6 h-6 transition-all" />
<span className="text-[9px] font-medium">Groceries</span>
</button>

<button
onClick={() => setActiveTab('seasonal')}
className={`flex flex-col items-center justify-center gap-1 transition-all ${
activeTab === 'seasonal' ? 'text-yellow-300 scale-110' : darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-black hover:text-gray-800'
}`}
>
<Calendar className="w-6 h-6 transition-all" />
<span className="text-[9px] font-medium">SZN</span>
</button>

<button
onClick={() => setActiveTab('journal')}
className={`flex flex-col items-center justify-center gap-1 transition-all ${
activeTab === 'journal' ? 'text-yellow-300 scale-110' : darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-black hover:text-gray-800'
}`}
>
<BookOpen className="w-6 h-6 transition-all" />
<span className="text-[9px] font-medium">Journal</span>
</button>

<button
onClick={() => setActiveTab('receipts')}
className={`flex flex-col items-center justify-center gap-1 transition-all ${
activeTab === 'receipts' ? 'text-yellow-300 scale-110' : darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-black hover:text-gray-800'
}`}
>
<Receipt className="w-6 h-6 transition-all" />
<span className="text-[9px] font-medium">Receipts</span>
</button>

<button
onClick={() => setActiveTab('resources')}
className={`flex flex-col items-center justify-center gap-1 transition-all relative ${
activeTab === 'resources' ? 'text-yellow-300 scale-110' : darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-black hover:text-gray-800'
}`}
>
<Play className="w-6 h-6 transition-all" />
<span className="text-[9px] font-medium">Resources</span>
{!isPremium && (
<span className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-300 to-yellow-400 text-black text-[8px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
★
</span>
)}
</button>
</div>
</div>
</div>
</div>
);
}
