
import React from 'react';
import type { Expense } from '../types';
import { CATEGORY_COLORS, CATEGORY_ICONS } from '../constants';
import { EditIcon } from './icons/EditIcon';
import { DeleteIcon } from './icons/DeleteIcon';

interface ExpenseItemProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense, onEdit, onDelete }) => {
  const Icon = CATEGORY_ICONS[expense.category] || CATEGORY_ICONS.Other;
  const color = CATEGORY_COLORS[expense.category] || CATEGORY_COLORS.Other;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // Adjust for timezone offset to prevent date from changing
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() + userTimezoneOffset).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="flex items-center bg-gray-800 p-4 rounded-xl shadow transition-all duration-300 hover:bg-gray-700 hover:shadow-lg">
      <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
        <Icon className="w-6 h-6" style={{ color: color }} />
      </div>
      <div className="flex-grow ml-4">
        <p className="font-bold text-text-primary">{expense.description}</p>
        <p className="text-sm text-text-tertiary">{formatDate(expense.date)}</p>
      </div>
      <div className="text-right mr-4">
        <p className="font-semibold text-lg text-text-primary">
          -Rs. {expense.amount.toFixed(2)}
        </p>
        <p className="text-xs px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: color }}>
          {expense.category}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <button onClick={() => onEdit(expense)} className="p-2 text-text-tertiary hover:text-blue-400 transition-colors">
          <EditIcon className="w-5 h-5" />
        </button>
        <button onClick={() => onDelete(expense.id)} className="p-2 text-text-tertiary hover:text-red-400 transition-colors">
          <DeleteIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;
