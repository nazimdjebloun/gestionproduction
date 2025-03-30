"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeProvider({
  children,
  ...props
}) {
  const [mounted, setMounted] = useState(false);

  // Ensures that theme is applied only after the component is mounted on the client-side
  useEffect(() => {
    setMounted(true); // Marks as mounted on the client
  }, []);

  if (!mounted) {
    // Optionally render a loading state or nothing until the component mounts on the client
    return null;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
