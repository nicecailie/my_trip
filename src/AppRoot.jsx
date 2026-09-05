import React from "react";
import { StorageProvider } from "./contexts/StorageContext";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./hooks/useAuth";
import Layout from "./components/layout/Layout";
import LoginSignup from "./components/auth/Login";

const AppRouter = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Layout /> : <LoginSignup />;
};

export default function AppRoot() {
  return (
    <StorageProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </StorageProvider>
  );
}
