// components/navigation-sidebar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  CreditCard,
  BarChart3,
  PieChart,
  Receipt,
  FileText,
  Menu,
  X,
  Settings,
  BellRing,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const routes = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Banking",
    icon: CreditCard,
    href: "/dashboard/banking",
    color: "text-violet-500",
  },
  {
    label: "Investments",
    icon: BarChart3,
    href: "/dashboard/investments",
    color: "text-pink-700",
  },
  {
    label: "Budget & Expenses",
    icon: PieChart,
    href: "/dashboard/budgeting",
    color: "text-orange-700",
  },
  {
    label: "Payments & Transfers",
    icon: Receipt,
    href: "/dashboard/payments",
    color: "text-emerald-500",
  },
  {
    label: "Tax Filing",
    icon: FileText,
    href: "/dashboard/tax",
    color: "text-blue-700",
  },
];

export const NavigationSidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile navbar toggle */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-background border-r transition-transform duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-14 items-center px-4 border-b">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-xl"
            onClick={() => setIsOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <span>FinPal</span>
          </Link>
        </div>

        <ScrollArea className="flex-1 px-3 py-2">
          <div className="space-y-1 py-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted/50",
                  pathname === route.href ? "bg-muted" : "transparent"
                )}
              >
                <route.icon className={cn("h-5 w-5", route.color)} />
                {route.label}
                {route.href === "/dashboard/tax" && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs text-blue-600">
                    3
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="py-2">
            <h4 className="px-2 py-1 text-xs font-semibold text-muted-foreground">
              Support
            </h4>
            <div className="space-y-1">
              <Link href="/dashboard/help">
                <Button variant="ghost" className="w-full justify-start gap-3">
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                  Help & Support
                </Button>
              </Link>
              <Button variant="ghost" className="w-full justify-start gap-3">
                <Settings className="h-5 w-5 text-muted-foreground" />
                Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3">
                <BellRing className="h-5 w-5 text-muted-foreground" />
                Notifications
              </Button>
            </div>
          </div>
        </ScrollArea>

        <div className="border-t p-3">
          <Button variant="outline" className="w-full justify-start gap-3">
            <LogOut className="h-5 w-5" />
            Sign Out
          </Button>
        </div>
      </div>
    </>
  );
};
