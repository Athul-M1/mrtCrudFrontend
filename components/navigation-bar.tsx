"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserPlus, Users, Home } from "lucide-react";

export function NavigationBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <Users className="h-5 w-5" />
          <span>User Manager</span>
        </div>
        
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className={cn(
              "flex h-10 items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname === "/"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-secondary"
            )}
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          
          <Link
            href="/users"
            className={cn(
              "flex h-10 items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname === "/users"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-secondary"
            )}
          >
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Users</span>
          </Link>
          
          <Link
            href="/users/new"
            className={cn(
              "flex h-10 items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname === "/users/new"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-secondary"
            )}
          >
            <UserPlus className="h-4 w-4" />
            <span className="hidden sm:inline">New User</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}