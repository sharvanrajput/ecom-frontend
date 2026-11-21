"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  ChartBar,
  Folder,
  FileText,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  UserRound,
  ChevronsUpDown,
  Plus,
  List,
  ListOrderedIcon,
  Package,
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
    label: "Overview",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { title: "Users", href: "/users", icon: Users },
      { title: "Analytics", href: "/analytics", icon: ChartBar },
      { title: "Projects", href: "/projects", icon: Folder },
    ],
  },
  {
    label: "Manage",
    items: [
      { title: "Add Product", href: "/admin/add-items", icon: Plus },
      { title: "All Product", href: "/admin/list-items", icon: List },
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
    router.push("/login");
  };

  return (
    <Sidebar collapsible="icon">
      {/* Header */}
      <SidebarHeader className="p-4">
        <Link href="/dashboard">
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
            <Link href="/profile">
              <DropdownMenuItem asChild>
                <UserRound />
                Profile
              </DropdownMenuItem>
            </Link>

            <Link href="/settings/account">
              <DropdownMenuItem asChild>
                <Settings />
                Account Settings
              </DropdownMenuItem>
            </Link>

            <DropdownMenuItem onSelect={handleLogout}>
              <LogOut />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
