"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

interface LayoutProps {
  children: React.ReactNode;
  navItems: NavItem[];
}

const Layout = ({ children, navItems }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background border-b border-border p-4 flex items-center justify-between">
        <div className="font-bold text-lg">
          <Link href="/">My Education ERP</Link>
        </div>
        <button onClick={toggleMenu} className="md:hidden">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        <nav
          className={cn(
            "md:flex space-x-4 items-center",
            isMenuOpen ? "flex flex-col absolute top-full left-0 w-full bg-background border-b border-border p-4" : "hidden"
          )}
        >
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default Layout;