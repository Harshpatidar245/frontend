"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { api } from "@/lib/api";

type User = {
  id: string;
  name?: string;
  email: string;
  role?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; message?: string }>;
  register: (payload: { name: string; email: string; password: string }) => Promise<{ ok: boolean; message?: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load token and user from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const t = localStorage.getItem("token");
    const u = localStorage.getItem("user");
    if (t) setToken(t);
    if (u) {
      try {
        setUser(JSON.parse(u));
      } catch {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token: t, user: u } = res.data;

      // Save and set user/token
      setToken(t);
      setUser(u);
      localStorage.setItem("token", t);
      localStorage.setItem("user", JSON.stringify(u));

      // Explicitly check for admin login
      if (u?.role === "admin") {
        console.log("Admin logged in:", u.email);
      }

      return { ok: true };
    } catch (err: any) {
      return { ok: false, message: err?.response?.data?.message || "Login failed" };
    }
  };

  const register = async (payload: { name: string; email: string; password: string }) => {
    try {
      const res = await api.post("/auth/register", payload);
      const { token: t, user: u } = res.data;

      setToken(t);
      setUser(u);
      localStorage.setItem("token", t);
      localStorage.setItem("user", JSON.stringify(u));

      return { ok: true };
    } catch (err: any) {
      return { ok: false, message: err?.response?.data?.message || "Signup failed" };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isAdmin: user?.role === "admin",
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
