"use client";
import React from "react";
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
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Dashboard ",
    url: "/",
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
];

export default function CustomSidebareMenu() {
  const pathname = usePathname();
  return (
    <SidebarMenu>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => {
              const isActive = pathname === item.url;

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className={isActive ? "bg-neutral-700 " : ""}
                  >
                    <Link href={item.url} className={isActive ? "" : ""}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarMenu>
  );
}
