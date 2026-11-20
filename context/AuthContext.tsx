"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: "Primary Account Holder" | "Wealth Advisor";
  tier: string;
  avatarUrl: string;
  netWorth: string;
}

interface AuthContextType {
  user: UserSession | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string, role?: "Primary Account Holder" | "Wealth Advisor") => void;
  logout: () => void;
  switchRole: () => void;
}

const DEMO_USER: UserSession = {
  id: "usr_fin_991",
  name: "David Chen",
  email: "david.chen@wealthpulse.app",
  role: "Primary Account Holder",
  tier: "Platinum Wealth Portfolio",
  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  netWorth: "$142,500.00",
};

const DEMO_ADVISOR: UserSession = {
  id: "usr_fin_002",
  name: "Sarah Jenkins, CFP",
  email: "sarah.advisor@wealthpulse.app",
  role: "Wealth Advisor",
  tier: "Certified Financial Planner",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  netWorth: "Portfolio AUM $4.2M",
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  switchRole: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("wealthpulse_auth_session");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        setUser(DEMO_USER);
      }
    } else {
      setUser(DEMO_USER);
    }
  }, []);

  const login = (email: string, name?: string, role: "Primary Account Holder" | "Wealth Advisor" = "Primary Account Holder") => {
    const newUser: UserSession = {
      id: `usr_${Date.now()}`,
      name: name || email.split("@")[0],
      email,
      role,
      tier: role === "Wealth Advisor" ? "Certified Financial Planner" : "Standard Wealth Tier",
      avatarUrl: DEMO_USER.avatarUrl,
      netWorth: "$25,000.00",
    };
    setUser(newUser);
    localStorage.setItem("wealthpulse_auth_session", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("wealthpulse_auth_session");
  };

  const switchRole = () => {
    setUser((prev) => {
      const next = prev?.role === "Wealth Advisor" ? DEMO_USER : DEMO_ADVISOR;
      localStorage.setItem("wealthpulse_auth_session", JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
