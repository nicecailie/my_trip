import React, { createContext, useEffect, useState } from "react";
import { ROLES, THEME_COLORS } from "../utils/constants";
import { useStorage } from "../hooks/useStorage";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("mytrip_current_user")) || null;
    } catch {
      return null;
    }
  });
  const { createUser, getUserByEmail } = useStorage();

  const signup = (userData) => {
    const normalizedEmail = userData.email.trim().toLowerCase();
    const normalizedUserData = { ...userData, email: normalizedEmail, name: userData.name.trim() };
    const existing = getUserByEmail(normalizedEmail);
    if (existing) return { success: false, error: "An account with this email already exists" };
    const user = createUser(normalizedUserData);
    setCurrentUser(user);
    return { success: true, user };
  };

  const login = (email, password) => {
    const user = getUserByEmail(email.trim().toLowerCase());
    if (!user) return { success: false, error: "No account was found for this email" };
    if (user.password !== password) return { success: false, error: "The password is incorrect" };
    setCurrentUser(user);
    return { success: true, user };
  };

  const logout = () => setCurrentUser(null);

  const switchRole = (newRole) => {
    if (currentUser) setCurrentUser({ ...currentUser, role: newRole });
  };

  useEffect(() => {
    if (currentUser) {
      const { password: _password, ...safeSessionUser } = currentUser;
      localStorage.setItem("mytrip_current_user", JSON.stringify(safeSessionUser));
    }
    else localStorage.removeItem("mytrip_current_user");
  }, [currentUser]);

  const isSender = () => currentUser?.role === ROLES.SENDER;
  const isTraveler = () => currentUser?.role === ROLES.TRAVELER;

  const getTheme = () =>
    isSender() ? THEME_COLORS.sender : THEME_COLORS.traveler;

  const value = {
    currentUser,
    signup,
    login,
    logout,
    switchRole,
    isSender,
    isTraveler,
    getTheme,
    isAuthenticated: !!currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
