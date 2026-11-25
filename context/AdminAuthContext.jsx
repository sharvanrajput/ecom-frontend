"use client";
import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext();

export function AdminContextProvider({ children }) {
  const [adminToken, setAdminToken] = useState("sadfasda");

  useEffect(() => {
    setAdminToken(localStorage.getItem("admin-token") || "");
  }, []);

  const AdminLogin = (token) => {
    localStorage.setItem("admin-token", token);
    setAdminToken(token);
  };

  const AdminLogout = () => {
    localStorage.removeItem("admin-token");
    setAdminToken("");
  };

  const value = { adminToken, AdminLogin, AdminLogout };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}
