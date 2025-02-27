// components/header.tsx
"use client";

import React from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Search, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  showSearchBar?: boolean;
}

export const Header = ({ showSearchBar = true }: HeaderProps) => {
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
    <header className="flex items-center justify-between p-4 gap-4 h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <SignedIn>
          <p className="text-muted-foreground">Welcome back, {username}!</p>
        </SignedIn>
        <SignedOut>
          <p className="text-muted-foreground">Welcome! Please sign in</p>
        </SignedOut>
      </div>

      <div className="flex items-center gap-4">
        {showSearchBar && (
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-64 pl-8 rounded-full bg-background"
            />
          </div>
        )}

        <Button variant="outline" size="icon">
          <Calendar className="h-5 w-5" />
        </Button>

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

        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox: "h-10 w-10",
              },
            }}
            fallback={
              <Avatar>
                <AvatarImage src={user?.imageUrl} alt={username} />
                <AvatarFallback>{getInitials()}</AvatarFallback>
              </Avatar>
            }
          />
        </SignedIn>
      </div>
    </header>
  );
};
