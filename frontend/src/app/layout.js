import { Geist, Geist_Mono } from "next/font/google";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "sonner";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import ClientWrapper from "./QueryClientProvider";
import { AuthProvider } from "../../context/auth-context";
import ProtectedLayout from "@/components/auth/ProtectedLayout";
import AuthCheck from "@/components/auth/AuthCheck";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Gestion de production",
  description: "ANEP gestion production",
};
const queryClient = new QueryClient();
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClientWrapper>
            <AuthProvider>
              <AuthCheck>{children}</AuthCheck>
            </AuthProvider>
          </ClientWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}

//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="system"
//           enableSystem
//           disableTransitionOnChange
//         >
//           <ClientWrapper>
//             <AuthProvider>
//               <ProtectedLayout>
//                 {({ isAuthenticated }) =>
//                   isAuthenticated ? (
//                     <SidebarProvider>
//                       <AppSidebar />
//                       <SidebarTrigger />
//                       {children}
//                       <Toaster />
//                     </SidebarProvider>
//                   ) : (
//                     children
//                   )
//                 }
//               </ProtectedLayout>
//             </AuthProvider>
//           </ClientWrapper>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }






//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="system"
//           enableSystem
//           disableTransitionOnChange
//         >
//           <ClientWrapper>
//             <SidebarProvider>
//               <AppSidebar />
//               <SidebarTrigger />
//               {children}
//               <Toaster />
//             </SidebarProvider>
//           </ClientWrapper>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }
