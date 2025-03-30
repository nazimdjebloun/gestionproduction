import {
  Sidebar,
} from "@/components/ui/sidebar";
import CustomSidebarContent from "./sidebare-content";
import CustomSidebareFooter from "./sidebare-footer";
import CustomSidebareHeader from "./sidebare-header";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" >
      <CustomSidebareHeader />
      <CustomSidebarContent />
      <CustomSidebareFooter />
    </Sidebar>
  );
}
