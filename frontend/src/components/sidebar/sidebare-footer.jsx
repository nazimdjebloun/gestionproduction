"use client";
import React from "react";
import { User, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenu,
} from "@/components/ui/sidebar";
import ThemeSwitch from "../theme/theme-swicth";
import { redirect, usePathname } from "next/navigation";
import { useAuth } from "../../../context/auth-context";
import { toast } from "sonner";
// import { useRouter } from "next/router";

export default function CustomSidebareFooter() {
  const pathname = usePathname();
  const isActive = pathname === "/profile";
  const { user, logout } = useAuth();
  // const router = useRouter();
  const handleLogout = (e) => {
    e.preventDefault();
    // Log the user out
    logout();
    // Show a success message
    toast.success("Logged out successfully");
    // Redirect to the login page
    redirect("/connection");
  };

  return (
    <SidebarFooter className="border-t">
      <SidebarMenu>
        <SidebarMenuItem className="flex items-center justify-center">
          <SidebarMenuButton asChild tooltip="theme">
            <ThemeSwitch />
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            tooltip="/Profile"
            className={isActive ? "bg-neutral-700 " : ""}
          >
            <a href="/profile" className="flex items-center">
              <User className="h-6 w-6"></User>
              <span className="ml-2">{user?.name}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Logout">
            <a
              href="#logout"
              onClick={handleLogout}
              className="flex items-center text-red-500"
            >
              <LogOut className="size-5" />
              <span className="ml-2">Logout</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
