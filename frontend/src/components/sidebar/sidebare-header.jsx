import React from 'react'
import { User, LogOut, Axe } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from 'next/link';
export default function CustomSidebareHeader() {
  return (
    <SidebarHeader className="border-b">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Menu">
            <Link href="#" className="flex items-center">

              <Axe className="size-5" />
              <span className="ml-2 text-lg font-semibold">Gestion Production</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
