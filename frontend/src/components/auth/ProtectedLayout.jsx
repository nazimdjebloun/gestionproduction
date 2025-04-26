"use client";
import { useAuth } from "../../../context/auth-context";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedLayout({ children }) {
  const { user, userLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Don't redirect if already on sign-in page
    if (!userLoading && !user && pathname !== "/connection") {
      router.push("/connection");
    }
  }, [user, userLoading, router, pathname]);

  // Show loading state or redirect immediately for unauthenticated users
  if (userLoading || (!user && pathname !== "/connection")) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <div className="w-8 h-8 border-4 border-foreground border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Return the children (content) once the user is authenticated and loading is done
  return children;
}
