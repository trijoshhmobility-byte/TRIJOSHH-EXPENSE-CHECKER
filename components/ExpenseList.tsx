
import React from 'react';
import type { Expense } from '../types';
import ExpenseItem from './ExpenseItem';

interface ExpenseListProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onEdit, onDelete }) => {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-16 px-6 border-2 border-dashed border-gray-600 rounded-xl">
        <h3 className="text-xl font-semibold text-text-secondary">No Expenses Yet</h3>
        <p className="text-text-tertiary mt-2">Click "Add Expense" to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {expenses.map(expense => (
        <ExpenseItem 
          key={expense.id} 
          expense={expense}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ExpenseList;
