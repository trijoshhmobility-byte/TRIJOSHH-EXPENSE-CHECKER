
import React, { useState } from 'react';
import { CloseIcon } from './icons/CloseIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { authService } from '../services/authService';
import type { User } from '../types';

interface AuthModalProps {
  onClose: () => void;
  onAuthSuccess: (user: User) => void;
  initialMode?: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onAuthSuccess, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isLogin = mode === 'login';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const authFunction = isLogin ? authService.logIn : authService.signUp;
      const user = await authFunction(email, password);
      onAuthSuccess(user);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setError(null);
    setMode(isLogin ? 'signup' : 'login');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 transition-opacity duration-300">
      <div className="bg-surface-card rounded-2xl shadow-2xl p-8 w-full max-w-md m-4 relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-text-tertiary hover:text-text-primary transition-colors">
          <CloseIcon className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-text-primary">{isLogin ? 'Log In' : 'Sign Up'}</h2>
        
        {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-md mb-4 text-sm">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-input border border-gray-600 rounded-lg px-3 py-2 text-text-primary focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-input border border-gray-600 rounded-lg px-3 py-2 text-text-primary focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition"
              placeholder="••••••••"
              required
              minLength={isLogin ? undefined : 6}
            />
          </div>
          <div className="flex flex-col gap-4 pt-2">
            <button 
              type="submit" 
              className="w-full py-2.5 px-6 bg-brand-primary hover:bg-brand-secondary text-white font-semibold rounded-lg transition-colors shadow-md flex justify-center items-center"
              disabled={isLoading}
            >
              {isLoading ? <SpinnerIcon className="w-5 h-5" /> : (isLogin ? 'Log In' : 'Create Account')}
            </button>
            <button 
              type="button" 
              onClick={toggleMode} 
              className="text-sm text-brand-primary hover:underline"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
