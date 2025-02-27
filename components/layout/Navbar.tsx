"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Bell,
  Star,
  BookMarked,
  Plus,
  ChevronDown,
  Menu,
} from "lucide-react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  ClerkProvider,
} from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavbarProps {
  isMobile?: boolean;
}

export default function Navbar({ isMobile = false }: NavbarProps) {
  return (
    <ClerkProvider>
      <NavbarContent isMobile={isMobile} />
    </ClerkProvider>
  );
}

function NavbarContent({ isMobile = false }: NavbarProps) {
  const { user } = useUser();

  // Get first name or full name from Clerk user object
  const username = user ? user.firstName || user.fullName || "User" : "User";

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (!user) return "U";
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`;
    }
    return user.firstName?.[0] || user.fullName?.[0] || "U";
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white">
      <div className="flex items-center">
        {isMobile && (
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <div className="ml-2 mr-4">
          <div className="relative">
            <Input placeholder="Search..." className="h-9 w-60 pl-10" />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Star className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <BookMarked className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Plus className="h-5 w-5" />
        </Button>
        
        <SignedIn>
          <div className="ml-2 flex items-center">
            <span className="mr-1">$274,36.40</span>
            <ChevronDown className="h-4 w-4" />
          </div>

          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox: "h-8 w-8",
              },
            }}
            fallback={
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.imageUrl} alt={username} />
                <AvatarFallback>{getInitials()}</AvatarFallback>
              </Avatar>
            }
          />
        </SignedIn>

        <SignedOut>
          <div className="flex items-center gap-2">
            <SignInButton mode="modal">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="sm">Sign Up</Button>
            </SignUpButton>
          </div>
        </SignedOut>
      </div>
    </div>
  );
}