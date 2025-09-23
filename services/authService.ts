
import type { User } from '../types';

// In a real application, NEVER store users or passwords in localStorage.
// This is a simulation for a frontend-only environment.
// Use a secure backend with a database for production apps.
const USERS_STORAGE_KEY = 'trijoshh_users';
const CURRENT_USER_SESSION_KEY = 'trijoshh_currentUser';

const getStoredUsers = (): (User & { password: string })[] => {
  try {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  } catch (e) {
    return [];
  }
};

const saveUsers = (users: (User & { password: string })[]) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

export const authService = {
  getCurrentUser: (): User | null => {
    try {
      const user = sessionStorage.getItem(CURRENT_USER_SESSION_KEY);
      return user ? JSON.parse(user) : null;
    } catch (e) {
      return null;
    }
  },

  signUp: async (email: string, password: string): Promise<User> => {
    // Simulate network delay
    await new Promise(res => setTimeout(res, 500));
    
    const users = getStoredUsers();
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (existingUser) {
      throw new Error('An account with this email already exists.');
    }

    const newUser: User & { password: string } = {
      id: crypto.randomUUID(),
      email,
      password, // In a real app, hash and salt this password on the backend.
    };

    saveUsers([...users, newUser]);
    
    const userForSession: User = { id: newUser.id, email: newUser.email };
    sessionStorage.setItem(CURRENT_USER_SESSION_KEY, JSON.stringify(userForSession));
    
    return userForSession;
  },

  logIn: async (email: string, password: string): Promise<User> => {
    // Simulate network delay
    await new Promise(res => setTimeout(res, 500));
    
    const users = getStoredUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user || user.password !== password) {
      throw new Error('Invalid email or password.');
    }
    
    const userForSession: User = { id: user.id, email: user.email };
    sessionStorage.setItem(CURRENT_USER_SESSION_KEY, JSON.stringify(userForSession));

    return userForSession;
  },

  logOut: (): void => {
    sessionStorage.removeItem(CURRENT_USER_SESSION_KEY);
  },
};
