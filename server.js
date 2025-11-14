const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/szn-budget';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  passcode: { type: String, default: '1234' },
  isPremium: { type: Boolean, default: false },
  darkMode: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Budget Data Schema
const budgetDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  incomeItems: [{ 
    id: String,
    name: String,
    amount: Number,
    date: Date,
    category: String
  }],
  expenseItems: [{
    id: String,
    name: String,
    amount: Number,
    date: Date,
    category: String
  }],
  seasonalData: {
    type: Map,
    of: {
      months: [{
        name: String,
        weeks: [{
          number: Number,
          income: Number,
          expenses: Number,
          notes: String
        }]
      }],
      goals: [String],
      accomplishments: [String]
    }
  },
  linkedAccounts: [{
    id: String,
    name: String,
    balance: Number,
    type: String
  }],
  receipts: [{
    id: String,
    name: String,
    amount: Number,
    date: Date,
    category: String,
    imageUrl: String
  }],
  challenges: [{
    id: String,
    name: String,
    progress: Number,
    target: Number,
    isActive: Boolean,
    completed: Boolean
  }],
  lockedSeasons: { type: Map, of: Boolean },
  lockedWeeks: { type: Map, of: Boolean },
  wordOfYear: String,
  selectedYear: Number,
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const BudgetData = mongoose.model('BudgetData', budgetDataSchema);

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// ============================================
// AUTH ROUTES
// ============================================

// Sign Up
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Validate input
    if (!fullName || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Create initial budget data
    const budgetData = new BudgetData({
      userId: user._id,
      incomeItems: [],
      expenseItems: [],
      seasonalData: new Map(),
      linkedAccounts: [],
      receipts: [],
      challenges: [],
      lockedSeasons: new Map(),
      lockedWeeks: new Map(),
      selectedYear: new Date().getFullYear(),
    });

    await budgetData.save();

    // Generate token
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        isPremium: user.isPremium,
        darkMode: user.darkMode,
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server error during signup' });
  }
});

// Sign In
app.post('/api/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        isPremium: user.isPremium,
        darkMode: user.darkMode,
        passcode: user.passcode,
      }
    });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ error: 'Server error during signin' });
  }
});

// Verify Passcode
app.post('/api/auth/verify-passcode', authenticateToken, async (req, res) => {
  try {
    const { passcode } = req.body;
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.passcode === passcode) {
      res.json({ success: true, message: 'Passcode verified' });
    } else {
      res.status(401).json({ success: false, error: 'Invalid passcode' });
    }
  } catch (error) {
    console.error('Passcode verification error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update Passcode
app.put('/api/auth/update-passcode', authenticateToken, async (req, res) => {
  try {
    const { newPasscode } = req.body;
    
    if (!newPasscode || newPasscode.length !== 4) {
      return res.status(400).json({ error: 'Passcode must be 4 digits' });
    }

    await User.findByIdAndUpdate(req.user.userId, { passcode: newPasscode });
    res.json({ message: 'Passcode updated successfully' });
  } catch (error) {
    console.error('Update passcode error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ============================================
// USER ROUTES
// ============================================

// Get User Profile
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update User Profile
app.put('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const { fullName, darkMode } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { fullName, darkMode },
      { new: true }
    ).select('-password');
    
    res.json(user);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Upgrade to Premium
app.post('/api/user/upgrade-premium', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { isPremium: true },
      { new: true }
    ).select('-password');
    
    res.json({ message: 'Upgraded to premium successfully', user });
  } catch (error) {
    console.error('Premium upgrade error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ============================================
// BUDGET DATA ROUTES
// ============================================

// Get All Budget Data
app.get('/api/budget', authenticateToken, async (req, res) => {
  try {
    const budgetData = await BudgetData.findOne({ userId: req.user.userId });
    if (!budgetData) {
      return res.status(404).json({ error: 'Budget data not found' });
    }
    res.json(budgetData);
  } catch (error) {
    console.error('Get budget data error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Save/Update Budget Data (Full sync)
app.put('/api/budget', authenticateToken, async (req, res) => {
  try {
    const budgetData = await BudgetData.findOneAndUpdate(
      { userId: req.user.userId },
      { ...req.body, updatedAt: Date.now() },
      { new: true, upsert: true }
    );
    
    res.json({ message: 'Budget data saved successfully', budgetData });
  } catch (error) {
    console.error('Save budget data error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add Income Item
app.post('/api/budget/income', authenticateToken, async (req, res) => {
  try {
    const { name, amount, category } = req.body;
    const incomeItem = {
      id: Date.now().toString(),
      name,
      amount: parseFloat(amount),
      date: new Date(),
      category
    };

    const budgetData = await BudgetData.findOneAndUpdate(
      { userId: req.user.userId },
      { $push: { incomeItems: incomeItem }, updatedAt: Date.now() },
      { new: true }
    );

    res.json({ message: 'Income added', incomeItem, budgetData });
  } catch (error) {
    console.error('Add income error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add Expense Item
app.post('/api/budget/expense', authenticateToken, async (req, res) => {
  try {
    const { name, amount, category } = req.body;
    const expenseItem = {
      id: Date.now().toString(),
      name,
      amount: parseFloat(amount),
      date: new Date(),
      category
    };

    const budgetData = await BudgetData.findOneAndUpdate(
      { userId: req.user.userId },
      { $push: { expenseItems: expenseItem }, updatedAt: Date.now() },
      { new: true }
    );

    res.json({ message: 'Expense added', expenseItem, budgetData });
  } catch (error) {
    console.error('Add expense error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete Income/Expense Item
app.delete('/api/budget/:type/:id', authenticateToken, async (req, res) => {
  try {
    const { type, id } = req.params;
    const field = type === 'income' ? 'incomeItems' : 'expenseItems';

    const budgetData = await BudgetData.findOneAndUpdate(
      { userId: req.user.userId },
      { $pull: { [field]: { id } }, updatedAt: Date.now() },
      { new: true }
    );

    res.json({ message: `${type} deleted`, budgetData });
  } catch (error) {
    console.error('Delete item error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add Receipt
app.post('/api/budget/receipts', authenticateToken, async (req, res) => {
  try {
    const { name, amount, category, imageUrl } = req.body;
    const receipt = {
      id: Date.now().toString(),
      name,
      amount: parseFloat(amount),
      date: new Date(),
      category,
      imageUrl
    };

    const budgetData = await BudgetData.findOneAndUpdate(
      { userId: req.user.userId },
      { $push: { receipts: receipt }, updatedAt: Date.now() },
      { new: true }
    );

    res.json({ message: 'Receipt added', receipt, budgetData });
  } catch (error) {
    console.error('Add receipt error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add Challenge
app.post('/api/budget/challenges', authenticateToken, async (req, res) => {
  try {
    const challenge = {
      ...req.body,
      id: Date.now().toString(),
    };

    const budgetData = await BudgetData.findOneAndUpdate(
      { userId: req.user.userId },
      { $push: { challenges: challenge }, updatedAt: Date.now() },
      { new: true }
    );

    res.json({ message: 'Challenge added', challenge, budgetData });
  } catch (error) {
    console.error('Add challenge error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'SZN Budget API is running' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
