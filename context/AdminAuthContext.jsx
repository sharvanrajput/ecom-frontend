"use client";
import { createContext, useEffect, useState } from "react";
import { ADMIN_API_URL } from "@/lib/admin-api";

export const AdminContext = createContext();

export function AdminContextProvider({ children }) {
  const [adminToken, setAdminToken] = useState("");
  const [isAdminHydrated, setIsAdminHydrated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("admin-token") || "";

    const verifyAdmin = async () => {
      try {
        const response = await fetch(
          `${ADMIN_API_URL}/api/user/admin/verify`,
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );

        if (!response.ok) {
          localStorage.removeItem("admin-token");
          setAdminToken("");
        } else {
          setAdminToken(storedToken);
        }
      } catch {
        localStorage.removeItem("admin-token");
        setAdminToken("");
      } finally {
        setIsAdminHydrated(true);
      }
    };

    verifyAdmin();
  }, []);

  const AdminLogin = (token) => {
    localStorage.setItem("admin-token", token);
    setAdminToken(token);
  };

  const AdminLogout = () => {
    localStorage.removeItem("admin-token");
    setAdminToken("");
  };

  const value = {
    adminToken,
    isAdminHydrated,
    AdminLogin,
    AdminLogout,
  };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}
