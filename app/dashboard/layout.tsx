// app/dashboard/layout.tsx
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { NavigationSidebar } from "@/components/navigation-sidebar";
import { Header } from "@/components/header";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css"; // Adjusted path assuming it's in app folder

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Application dashboard",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen`}
        >
          <div className="h-full relative">
            <div className="hidden md:flex h-full w-72 flex-col fixed inset-y-0 z-50">
              <NavigationSidebar />
            </div>
            <div className="md:pl-72 flex flex-col h-full">
              <Header />
              <main className="flex-1 overflow-auto">
                <div className="h-full">{children}</div>
              </main>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
