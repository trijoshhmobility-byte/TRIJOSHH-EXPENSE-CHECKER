
import React, { useState, useEffect, useCallback } from 'react';
import type { Expense } from '../types';
import { ExpenseCategory } from '../types';
import { CATEGORIES } from '../constants';
import { suggestCategory } from '../services/geminiService';
import { CloseIcon } from './icons/CloseIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';

interface ExpenseFormProps {
  onClose: () => void;
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
  onUpdateExpense: (expense: Expense) => void;
  existingExpense: Expense | null;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onClose, onAddExpense, onUpdateExpense, existingExpense }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>(ExpenseCategory.Other);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (existingExpense) {
      setDescription(existingExpense.description);
      setAmount(String(existingExpense.amount));
      setCategory(existingExpense.category);
      setDate(existingExpense.date);
    }
  }, [existingExpense]);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const getCategorySuggestion = useCallback(async (desc: string) => {
    if (desc.trim().length < 5) return;
    setIsSuggesting(true);
    try {
      const suggested = await suggestCategory(desc);
      if (suggested) {
        setCategory(suggested);
      }
    } catch (e) {
      console.error("Failed to get category suggestion", e);
    } finally {
      setIsSuggesting(false);
    }
  }, []);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      if(description && !existingExpense) { // Only suggest for new expenses
        getCategorySuggestion(description);
      }
    }, 1000); // 1-second debounce

    return () => {
      clearTimeout(handler);
    };
  }, [description, getCategorySuggestion, existingExpense]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || parseFloat(amount) <= 0) {
      setError('Please fill in a valid description and amount.');
      return;
    }
    setError('');

    const expenseData = {
      description,
      amount: parseFloat(amount),
      category,
      date,
    };

    if (existingExpense) {
      onUpdateExpense({ ...expenseData, id: existingExpense.id });
    } else {
      onAddExpense(expenseData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 transition-opacity duration-300">
      <div className="bg-surface-card rounded-2xl shadow-2xl p-8 w-full max-w-md m-4 relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-text-tertiary hover:text-text-primary transition-colors">
          <CloseIcon className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-text-primary">{existingExpense ? 'Edit Expense' : 'Add New Expense'}</h2>
        
        {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-md mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-text-secondary mb-1">Description</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              className="w-full bg-surface-input border border-gray-600 rounded-lg px-3 py-2 text-text-primary focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition"
              placeholder="e.g., Weekly groceries"
              required
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-text-secondary mb-1">Amount (Rs)</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-surface-input border border-gray-600 rounded-lg px-3 py-2 text-text-primary focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition"
              placeholder="0.00"
              required
              min="0.01"
              step="0.01"
            />
          </div>
           <div className="relative">
            <label htmlFor="category" className="block text-sm font-medium text-text-secondary mb-1">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
              className="w-full bg-surface-input border border-gray-600 rounded-lg px-3 py-2 text-text-primary focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition appearance-none"
              required
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {isSuggesting && (
              <div className="absolute inset-y-0 right-3 top-6 flex items-center pointer-events-none">
                <SpinnerIcon className="w-5 h-5 text-brand-primary" />
              </div>
            )}
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-text-secondary mb-1">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-surface-input border border-gray-600 rounded-lg px-3 py-2 text-text-primary focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition"
              required
            />
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-600 hover:bg-gray-700 text-text-primary font-semibold rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" className="py-2 px-6 bg-brand-primary hover:bg-brand-secondary text-white font-semibold rounded-lg transition-colors shadow-md">
              {existingExpense ? 'Save Changes' : 'Add Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
