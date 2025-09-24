
import React, { useState, useMemo, useEffect } from 'react';
import type { Expense, User } from './types';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import CategoryChart from './components/CategoryChart';
import { PlusIcon } from './components/icons/PlusIcon';
import { ExportIcon } from './components/icons/ExportIcon';
import AuthModal from './components/AuthModal';
import GeminiDebug from './components/GeminiDebug';
import { authService } from './services/authService';
import { TrijoshhLogo } from './components/icons/TrijoshhLogo';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => authService.getCurrentUser());
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isGeminiDebugOpen, setIsGeminiDebugOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'category'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Load and save expenses based on the current user
  useEffect(() => {
    if (currentUser) {
      try {
        const savedExpenses = localStorage.getItem(`expenses_${currentUser.id}`);
        setExpenses(savedExpenses ? JSON.parse(savedExpenses) : []);
      } catch (error) {
        console.error("Could not parse expenses from localStorage", error);
        setExpenses([]);
      }
    } else {
      setExpenses([]); // Clear expenses on logout
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      try {
        localStorage.setItem(`expenses_${currentUser.id}`, JSON.stringify(expenses));
      } catch (error) {
        console.error("Could not save expenses to localStorage", error);
      }
    }
  }, [expenses, currentUser]);
  
  // Auth Modal Handlers
  const handleOpenLogin = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };
  
  const handleOpenSignup = () => {
    setAuthMode('signup');
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);
  };
  
  const handleLogout = () => {
    authService.logOut();
    setCurrentUser(null);
  };

  // Expense Handlers
  const handleAddExpense = (expense: Omit<Expense, 'id'>) => {
    setExpenses(prev => [...prev, { ...expense, id: crypto.randomUUID() }]);
    setIsExpenseModalOpen(false);
  };

  const handleUpdateExpense = (updatedExpense: Expense) => {
    setExpenses(prev => prev.map(exp => exp.id === updatedExpense.id ? updatedExpense : exp));
    setIsExpenseModalOpen(false);
    setEditingExpense(null);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id));
  };
  
  const handleEditClick = (expense: Expense) => {
    setEditingExpense(expense);
    setIsExpenseModalOpen(true);
  };

  const handleOpenExpenseModal = () => {
    setEditingExpense(null);
    setIsExpenseModalOpen(true);
  };
  
  const handleCloseExpenseModal = () => {
    setIsExpenseModalOpen(false);
    setEditingExpense(null);
  };

  const totalExpenses = useMemo(() => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }, [expenses]);

  const sortedExpenses = useMemo(() => {
    return [...expenses].sort((a, b) => {
      if (sortBy === 'category') {
        const categoryComparison = a.category.localeCompare(b.category);
        if (categoryComparison !== 0) {
          return sortOrder === 'asc' ? categoryComparison : -categoryComparison;
        }
      }
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }, [expenses, sortBy, sortOrder]);

  const handleExportToCSV = () => {
    if (expenses.length === 0) {
      alert("No expenses to export.");
      return;
    }
    const escapeCsvField = (field: any): string => {
      const stringField = String(field);
      if (/[",\n]/.test(stringField)) {
        return `"${stringField.replace(/"/g, '""')}"`;
      }
      return stringField;
    };

    const headers = ['ID', 'Description', 'Amount', 'Category', 'Date'];
    const csvRows = [
      headers.join(','),
      ...expenses.map(exp => [
        escapeCsvField(exp.id),
        escapeCsvField(exp.description),
        escapeCsvField(exp.amount),
        escapeCsvField(exp.category),
        escapeCsvField(exp.date),
      ].join(','))
    ];

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    const today = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `trijoshh_expenses_${today}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


  return (
    <div className="min-h-screen bg-surface-main text-text-primary font-sans">
      <Header 
        totalExpenses={totalExpenses} 
        currentUser={currentUser}
        onLogout={handleLogout}
        onLoginClick={handleOpenLogin}
        onSignupClick={handleOpenSignup}
      />
      
      <main className="container mx-auto p-4 md:p-8">
        {currentUser ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1 bg-surface-card p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-text-primary">Expense Breakdown</h2>
              <CategoryChart expenses={expenses} />
            </div>

            <div className="lg:col-span-2 bg-surface-card p-6 rounded-2xl shadow-lg">
              <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                <h2 className="text-2xl font-bold text-text-primary">Recent Expenses</h2>
                <div className="flex items-center gap-2">
                   <button
                    onClick={handleExportToCSV}
                    className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-text-primary font-bold py-2 px-4 rounded-lg transition-colors duration-300 shadow-md"
                    aria-label="Export expenses to CSV"
                  >
                    <ExportIcon className="w-5 h-5" />
                    <span>Export CSV</span>
                  </button>
                  {process.env.NODE_ENV === 'development' && (
                    <button
                      onClick={() => setIsGeminiDebugOpen(true)}
                      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 shadow-md"
                      aria-label="Open Gemini API Debug Console"
                      title="Debug Gemini AI Integration"
                    >
                      🧪
                      <span>Debug AI</span>
                    </button>
                  )}
                  <button
                    onClick={handleOpenExpenseModal}
                    className="flex items-center gap-2 bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 shadow-md"
                    aria-label="Add new expense"
                  >
                    <PlusIcon className="w-5 h-5" />
                    <span>Add Expense</span>
                  </button>
                </div>
              </div>
              
              <div className="flex justify-start items-center gap-4 mb-4 pb-4 border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <label htmlFor="sort-by" className="text-sm font-medium text-text-secondary">Sort by:</label>
                  <select 
                    id="sort-by"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'date' | 'category')}
                    className="bg-surface-input border border-gray-600 rounded-md px-2 py-1 text-text-primary focus:ring-1 focus:ring-brand-primary focus:border-brand-primary text-sm"
                  >
                    <option value="date">Date</option>
                    <option value="category">Category</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="sort-order" className="text-sm font-medium text-text-secondary">Order:</label>
                  <select 
                    id="sort-order"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                    className="bg-surface-input border border-gray-600 rounded-md px-2 py-1 text-text-primary focus:ring-1 focus:ring-brand-primary focus:border-brand-primary text-sm"
                  >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                  </select>
                </div>
              </div>

              <ExpenseList 
                expenses={sortedExpenses}
                onEdit={handleEditClick}
                onDelete={handleDeleteExpense}
              />
            </div>
          </div>
        ) : (
          <div className="text-center pt-16">
            <TrijoshhLogo className="h-16 mx-auto mb-8" />
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">Welcome to TRIJOSHH Expense Tracker</h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
              Your smart solution to effortlessly track, categorize, and manage your expenses. 
              Sign up or log in to take control of your finances.
            </p>
            <div className="flex justify-center items-center gap-4">
              <button onClick={handleOpenLogin} className="text-lg font-bold py-3 px-8 rounded-lg transition-colors duration-300 hover:bg-surface-input ring-2 ring-brand-secondary">
                Log In
              </button>
              <button onClick={handleOpenSignup} className="text-lg bg-brand-primary hover:bg-brand-secondary text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 shadow-lg">
                Sign Up Now
              </button>
            </div>
          </div>
        )}
      </main>

      {isExpenseModalOpen && (
        <ExpenseForm 
          onClose={handleCloseExpenseModal} 
          onAddExpense={handleAddExpense}
          onUpdateExpense={handleUpdateExpense}
          existingExpense={editingExpense}
        />
      )}
      
      {isAuthModalOpen && (
        <AuthModal 
          onClose={() => setIsAuthModalOpen(false)}
          onAuthSuccess={handleAuthSuccess}
          initialMode={authMode}
        />
      )}
      
      {isGeminiDebugOpen && (
        <GeminiDebug 
          isVisible={isGeminiDebugOpen}
          onClose={() => setIsGeminiDebugOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
