// src/context/auth-context.jsx
"use client";
import { createContext, useContext, useState, useEffect } from "react";

// Create context
const AuthContext = createContext(undefined);

// Auth provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userLoading, setLoading] = useState(true);

  // Check if user exists in localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, userLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
