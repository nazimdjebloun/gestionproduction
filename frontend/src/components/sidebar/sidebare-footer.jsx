import React from 'react'
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
import ThemeSwitch from '../theme/theme-swicth';
export default function CustomSidebareFooter() {
  return (
    <SidebarFooter className="border-t">
      <SidebarMenu>
        <SidebarMenuItem className="flex items-center justify-center">
          <SidebarMenuButton asChild tooltip="theme" >
            <ThemeSwitch />
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Profile">
            <a href="#profile" className="flex items-center">
              <User className="h-6 w-6"></User>
              <span className="ml-2">John Doe</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Logout">
            <a href="#logout" className="flex items-center text-red-500">
              <LogOut className="size-5" />
              <span className="ml-2">Logout</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
