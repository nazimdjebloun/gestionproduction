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
    title: "Client",
    url: "/client",
    icon: Folder,
  },
  {
    title: "Dossier client",
    url: "/dossierclient",
    icon: FilePen,
  },
  {
    title: "Fiche production",
    url: "/ficheproduction",
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
                const isActive =
                  item.url === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.url) && item.url !== "#";

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      className={`hover:bg-secondary ${
                        isActive ? "bg-primary text-primary-foreground " : ""
                      }`}
                    >
                      {/* hover:bg-primary hover:text-primary-foreground */}
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
