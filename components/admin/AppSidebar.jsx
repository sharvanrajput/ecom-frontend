"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  ChevronsUpDown,
  List,
  LogOut,
  Package,
  Plus,
  UserRound,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


// Navigation links
const navGroups = [
  {
    label: "Manage",
    items: [
      { title: "Add Product", href: "/admin/add-items", icon: Plus },
      { title: "All Products", href: "/admin/list-items", icon: List },
      { title: "Orders", href: "/admin/orders", icon: Package },
    ],
  },
];

// User details
const user = {
  name: "Admin User",
  email: "admin@example.com",
};

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();


  const handleLogout = () => {
    adminLogout();
    router.replace("/admin/login");
  };

  return (
    <Sidebar collapsible="icon">
      {/* Header */}
      <SidebarHeader className="p-4">
        <Link href="/admin/list-items">
          <h2 className="text-xl font-bold">
            Admin <span className="text-muted-foreground">Panel</span>
          </h2>
        </Link>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent>
        {navGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = item.icon;

                  const isActive =
                    pathname === item.href ||
                    pathname.startsWith(item.href + "/");

                  return (
                    <SidebarMenuItem key={item.href}>
                      <Link href={item.href}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          tooltip={item.title}
                        >
                          <Icon />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <UserRound />

              <div className="flex flex-1 flex-col items-start">
                <span>{user.name}</span>
                <span className="text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>

              <ChevronsUpDown />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent side="top" align="start">
            <DropdownMenuItem
              onSelect={handleLogout}
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              <LogOut className="mr-2 size-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
