"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
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

export default function Navbar() {
  return (
    <ClerkProvider>
      <NavbarContent />
    </ClerkProvider>
  );
}

function NavbarContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0d1117]/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <Link href="/" className="flex items-center">
              <svg
                className="w-8 h-8 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span className="ml-2 text-2xl font-bold text-white">FinPal</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex items-center space-x-8"
          >
            <div className="flex items-center space-x-6">
              <Link href="/dashboard">
                <button className="text-gray-300 hover:text-white">
                  Dashboard
                </button>
              </Link>
              <Link href="/investment">
                <button className="text-gray-300 hover:text-white">
                  Investment
                </button>
              </Link>
            </div>

            <SignedIn>
              <div className="flex items-center gap-4">
                <span className="text-gray-300">Welcome, {username}!</span>
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
                      <AvatarFallback className="bg-white text-black">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                  }
                />
              </div>
            </SignedIn>

            <SignedOut>
              <div className="flex items-center space-x-4">
                <SignInButton mode="modal">
                  <button className="text-gray-300 hover:text-white">
                    Login
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button
                    variant="default"
                    className="bg-white text-black hover:bg-gray-200 rounded-full px-6"
                  >
                    Start for free
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </motion.div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
          className="md:hidden overflow-hidden bg-[#0d1117]"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/dashboard">
              <button className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white">
                Dashboard
              </button>
            </Link>
            <Link href="/investment">
              <button className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white">
                Investment
              </button>
            </Link>

            <SignedIn>
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-gray-300">Welcome, {username}!</span>
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
                      <AvatarFallback className="bg-white text-black">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                  }
                />
              </div>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white">
                  Login
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button
                  variant="default"
                  className="w-full mt-4 bg-white text-black hover:bg-gray-200 rounded-full"
                >
                  Start for free
                </Button>
              </SignUpButton>
            </SignedOut>
          </div>
        </motion.div>
      </div>
    </nav>
  );
}
