"use client";

import { AppSidebar } from "@/components/admin/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminContext } from "@/context/AdminAuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";

export default function AdminLayout({ children }) {
  const { adminToken } = useContext(AdminContext);
  const path = usePathname();
  const router = useRouter();

  if (!adminToken) {
    router.replace("/admin/login");
  }

  return path == "/admin/login" ? (
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
