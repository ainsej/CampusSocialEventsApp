import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { users as mockUsers } from '../src/data/mockData';

export type User = typeof mockUsers[number];

interface AuthContextType {
  user: User | null;
  login: (email: string) => User | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string) => {
    const foundUser = mockUsers.find(u => u.email === email);
    setUser(foundUser || null);
    return foundUser || null;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
