import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'owner_admin' | 'pro_subscriber' | 'free_user';
  plan: 'free' | 'pro' | 'syndicate';
  bankroll: number;
  avatarUrl?: string;
  createdAt: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isPaidSubscriber: boolean;
  login: (email: string, role?: 'owner_admin' | 'pro_subscriber' | 'free_user') => void;
  register: (name: string, email: string) => void;
  upgradeToPro: (plan?: 'pro' | 'syndicate') => void;
  logout: () => void;
  switchRole: (role: 'owner_admin' | 'pro_subscriber' | 'free_user') => void;
  updateBankroll: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('apex_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    // Default logged in as Pro Subscriber demo user for immediate great experience
    return {
      id: 'usr_demo_01',
      name: 'Alex Vance',
      email: 'alex.vance@apexodds.io',
      role: 'pro_subscriber',
      plan: 'pro',
      bankroll: 4500,
      createdAt: '2026-01-15',
    };
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('apex_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('apex_user');
    }
  }, [user]);

  const login = (email: string, role?: 'owner_admin' | 'pro_subscriber' | 'free_user') => {
    const isAdmin = role === 'owner_admin' || email.includes('admin');
    const effectiveRole = role || (isAdmin ? 'owner_admin' : 'pro_subscriber');
    setUser({
      id: `usr_${Date.now()}`,
      name: isAdmin ? 'Platform Owner' : email.split('@')[0],
      email,
      role: effectiveRole,
      plan: effectiveRole === 'owner_admin' ? 'syndicate' : effectiveRole === 'pro_subscriber' ? 'pro' : 'free',
      bankroll: effectiveRole === 'free_user' ? 2000 : 5000,
      createdAt: new Date().toISOString().split('T')[0],
    });
  };

  const register = (name: string, email: string) => {
    // New onboarding users start as Free Tier so they experience the inbuilt mathematical structure
    setUser({
      id: `usr_${Date.now()}`,
      name,
      email,
      role: 'free_user',
      plan: 'free',
      bankroll: 2000,
      createdAt: new Date().toISOString().split('T')[0],
    });
  };

  const upgradeToPro = (plan: 'pro' | 'syndicate' = 'pro') => {
    if (user) {
      setUser({
        ...user,
        role: 'pro_subscriber',
        plan,
      });
    } else {
      login('subscriber@apexodds.io', 'pro_subscriber');
    }
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (newRole: 'owner_admin' | 'pro_subscriber' | 'free_user') => {
    if (!user) {
      login('admin@apexodds.com', newRole === 'owner_admin' ? 'owner_admin' : newRole === 'free_user' ? 'free_user' : 'pro_subscriber');
      return;
    }
    setUser({
      ...user,
      role: newRole,
      plan: newRole === 'owner_admin' ? 'syndicate' : newRole === 'pro_subscriber' ? 'pro' : 'free',
    });
  };

  const updateBankroll = (amount: number) => {
    if (user) {
      setUser({ ...user, bankroll: amount });
    }
  };

  const isPaidSubscriber = user?.role === 'pro_subscriber' || user?.role === 'owner_admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'owner_admin',
        isPaidSubscriber,
        login,
        register,
        upgradeToPro,
        logout,
        switchRole,
        updateBankroll,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
