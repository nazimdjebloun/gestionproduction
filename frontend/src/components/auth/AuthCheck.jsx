"use client";
import { useAuth } from "../../../context/auth-context";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react"; // Import useState
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Toaster } from "sonner";

export default function AuthCheck({ children }) {
  const { user, userLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthCheckComplete, setIsAuthCheckComplete] = useState(false); // New state variable

  // Handle redirects based on authentication
  useEffect(() => {
    if (!userLoading) {
      // Only run this effect after loading is complete
      // If the user is authenticated but is trying to go to the login page, redirect to home
      if (user && pathname === "/connection") {
        router.push("/");
      }

      // If the user is not authenticated and trying to access a protected route, redirect to login page
      if (!user && pathname !== "/connection") {
        router.push("/connection");
      }
      setIsAuthCheckComplete(true); // Set the state to indicate the auth check is complete
    }
  }, [user, pathname, router, userLoading]); // Add loading to the dependency array

  // Show loading spinner while checking auth
  if (userLoading) {
    return null;
  }

  // Conditionally render children *after* the auth check is complete
  if (!isAuthCheckComplete) {
    return null; // Or a loading indicator if you prefer
  }

  // If on the connection page and not authenticated, render children directly
  if (pathname === "/connection" && !user) {
    return children;
  }

  // Otherwise, render the full layout
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      {children}
      <Toaster />
    </SidebarProvider>
  );
}
