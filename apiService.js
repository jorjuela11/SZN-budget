// API Service for SZN Budget App Frontend
// This file handles all API calls to the backend

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function to set auth token in localStorage
const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

// Helper function to remove auth token from localStorage
const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};

// Helper function to make authenticated API calls
const fetchWithAuth = async (url, options = {}) => {
  const token = getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Token expired or invalid, logout user
    removeAuthToken();
    window.location.href = '/';
  }

  return response;
};

// ============================================
// AUTH API CALLS
// ============================================

export const authAPI = {
  // Sign up new user
  signUp: async (fullName, email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      setAuthToken(data.token);
      return data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },

  // Sign in existing user
  signIn: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Sign in failed');
      }

      setAuthToken(data.token);
      return data;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  },

  // Verify passcode
  verifyPasscode: async (passcode) => {
    try {
      const response = await fetchWithAuth(`${API_URL}/auth/verify-passcode`, {
        method: 'POST',
        body: JSON.stringify({ passcode }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Passcode verification failed');
      }

      return data;
    } catch (error) {
      console.error('Passcode verification error:', error);
      throw error;
    }
  },

  // Update passcode
  updatePasscode: async (newPasscode) => {
    try {
      const response = await fetchWithAuth(`${API_URL}/auth/update-passcode`, {
        method: 'PUT',
        body: JSON.stringify({ newPasscode }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Passcode update failed');
      }

      return data;
    } catch (error) {
      console.error('Passcode update error:', error);
      throw error;
    }
  },

  // Logout
  logout: () => {
    removeAuthToken();
  },

  // Check if user is logged in
  isLoggedIn: () => {
    return !!getAuthToken();
  },
};

// ============================================
// USER API CALLS
// ============================================

export const userAPI = {
  // Get user profile
  getProfile: async () => {
    try {
      const response = await fetchWithAuth(`${API_URL}/user/profile`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get profile');
      }

      return data;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (updates) => {
    try {
      const response = await fetchWithAuth(`${API_URL}/user/profile`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }

      return data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  },

  // Upgrade to premium
  upgradeToPremium: async () => {
    try {
      const response = await fetchWithAuth(`${API_URL}/user/upgrade-premium`, {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upgrade to premium');
      }

      return data;
    } catch (error) {
      console.error('Premium upgrade error:', error);
      throw error;
    }
  },
};

// ============================================
// BUDGET DATA API CALLS
// ============================================

export const budgetAPI = {
  // Get all budget data
  getBudgetData: async () => {
    try {
      const response = await fetchWithAuth(`${API_URL}/budget`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get budget data');
      }

      return data;
    } catch (error) {
      console.error('Get budget data error:', error);
      throw error;
    }
  },

  // Save/sync all budget data
  saveBudgetData: async (budgetData) => {
    try {
      const response = await fetchWithAuth(`${API_URL}/budget`, {
        method: 'PUT',
        body: JSON.stringify(budgetData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save budget data');
      }

      return data;
    } catch (error) {
      console.error('Save budget data error:', error);
      throw error;
    }
  },

  // Add income item
  addIncome: async (name, amount, category) => {
    try {
      const response = await fetchWithAuth(`${API_URL}/budget/income`, {
        method: 'POST',
        body: JSON.stringify({ name, amount, category }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add income');
      }

      return data;
    } catch (error) {
      console.error('Add income error:', error);
      throw error;
    }
  },

  // Add expense item
  addExpense: async (name, amount, category) => {
    try {
      const response = await fetchWithAuth(`${API_URL}/budget/expense`, {
        method: 'POST',
        body: JSON.stringify({ name, amount, category }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add expense');
      }

      return data;
    } catch (error) {
      console.error('Add expense error:', error);
      throw error;
    }
  },

  // Delete income or expense
  deleteItem: async (type, id) => {
    try {
      const response = await fetchWithAuth(`${API_URL}/budget/${type}/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete item');
      }

      return data;
    } catch (error) {
      console.error('Delete item error:', error);
      throw error;
    }
  },

  // Add receipt
  addReceipt: async (name, amount, category, imageUrl) => {
    try {
      const response = await fetchWithAuth(`${API_URL}/budget/receipts`, {
        method: 'POST',
        body: JSON.stringify({ name, amount, category, imageUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add receipt');
      }

      return data;
    } catch (error) {
      console.error('Add receipt error:', error);
      throw error;
    }
  },

  // Add challenge
  addChallenge: async (challenge) => {
    try {
      const response = await fetchWithAuth(`${API_URL}/budget/challenges`, {
        method: 'POST',
        body: JSON.stringify(challenge),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add challenge');
      }

      return data;
    } catch (error) {
      console.error('Add challenge error:', error);
      throw error;
    }
  },
};

// Export helper functions
export { getAuthToken, setAuthToken, removeAuthToken };
