import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import CustomSidebareMenu from './sidebare-menu';
export default function CustomSidebarContent() {
  return (
    <SidebarContent>
      <CustomSidebareMenu />
    </SidebarContent>
  );
}
