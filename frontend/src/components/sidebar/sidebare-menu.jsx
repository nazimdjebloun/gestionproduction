import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  LayoutDashboard,
  Folder,
  FilePen,
} from "lucide-react";


const items = [
  {
    title: "Dashboard ",
    url: "#",
    icon: LayoutDashboard,
  },
  {
    title: "Dossier client",
    url: "#",
    icon: Folder,
  },
  {
    title: "Fiche production",
    url: "#",
    icon: FilePen,
  },

  {
    title: "Parametre",
    url: "#",
    icon: Settings,
  },
  {
    title: "test",
    url: "#",
    icon: Home,
  },
  {
    title: "test2",
    url: "#",
    icon: Inbox,
  },
];
 
export default function CustomSidebareMenu() {
  return (
    <SidebarMenu>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarMenu>
  );
}
