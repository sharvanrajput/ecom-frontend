"use client";

import { AppSidebar } from "@/components/admin/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminContext } from "@/context/AdminAuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function AdminLayout({ children }) {
  const { adminToken, isAdminHydrated } = useContext(AdminContext);
  const path = usePathname();
  const router = useRouter();

  const isLoginPage = path === "/admin/login";

  useEffect(() => {
    if (isAdminHydrated && !adminToken && !isLoginPage) {
      router.replace("/admin/login");
    }

    if (isAdminHydrated && adminToken && isLoginPage) {
      router.replace("/admin/list-items");
    }
  }, [adminToken, isAdminHydrated, isLoginPage, router]);

  if (!isAdminHydrated) {
    return null;
  }

  if (!adminToken && !isLoginPage) {
    return null;
  }

  return isLoginPage ? (
    <div className="w-full ">{children}</div>
  ) : (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
