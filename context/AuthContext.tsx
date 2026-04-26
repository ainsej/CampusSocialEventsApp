import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { users as mockUsers } from '../src/data/mockData';

export type User = typeof mockUsers[number];

interface AuthContextType {
  user: User | null;
  login: (email: string) => User | null;
  logout: () => void;
  rsvpToEvent: (eventId: string) => void;
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

  const rsvpToEvent = (eventId: string) => {
    setUser((prev) => {
      if (!prev) return prev;
      if (prev.role !== 'student') return prev;
      if (prev.rsvps.includes(eventId)) return prev;
      return { ...prev, rsvps: [...prev.rsvps, eventId] };
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, rsvpToEvent }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
