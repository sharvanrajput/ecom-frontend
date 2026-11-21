"use client";
import { AppSidebar } from "@/components/admin/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ShopContextProvider } from "@/context/ShopContext";
import "../../globals.css";
import { usePathname } from "next/navigation";

export default function layout({ children }) {
  const path = usePathname();

  return (
    <>
      <html>
        <body>
          <SidebarProvider>
            {path !== "/admin/login" && <AppSidebar />}
            <main className="w-full">
              {path !== "/admin/login" && <SidebarTrigger />}
              <ShopContextProvider>{children}</ShopContextProvider>
            </main>
          </SidebarProvider>
        </body>
      </html>
    </>
  );
}
