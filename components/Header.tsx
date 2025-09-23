
import React from 'react';
import { TrijoshhLogo } from './icons/TrijoshhLogo';
import type { User } from '../types';

interface HeaderProps {
  totalExpenses: number;
  currentUser: User | null;
  onLogout: () => void;
  onLoginClick: () => void;
  onSignupClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ totalExpenses, currentUser, onLogout, onLoginClick, onSignupClick }) => {
  return (
    <header className="bg-surface-card shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <TrijoshhLogo className="h-8 md:h-9" />
        </div>
        <div className="flex items-center gap-4">
          {currentUser ? (
            <>
              <div className="text-right">
                <p className="text-sm text-text-tertiary">Total Expenses</p>
                <p className="text-xl font-semibold text-text-primary">
                  Rs. {totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <div className="h-10 w-px bg-gray-600"></div>
              <div className="text-right">
                 <p className="text-sm text-text-secondary truncate" title={currentUser.email}>{currentUser.email}</p>
                 <button onClick={onLogout} className="text-sm text-brand-primary hover:underline">Log Out</button>
              </div>
            </>
          ) : (
             <div className="flex items-center gap-2">
               <button onClick={onLoginClick} className="font-bold py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-surface-input">
                 Log In
               </button>
               <button onClick={onSignupClick} className="bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 shadow-md">
                 Sign Up
               </button>
             </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
