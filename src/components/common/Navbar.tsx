"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // This would typically come from your cart state management
  const cartTotal = 2499.99; // Example amount

  const navItems = [
    // { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const formatTaka = (amount: number) => {
    return `Tk ${amount.toFixed(2)}`;
  };

  return (
    <nav className="border-b border-b-gray-200 py-2 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image src="/logo.png" alt="Logo" width={100} height={100} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex items-center relative max-w-xs w-full mx-4">
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8"
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Cart Total */}
            <div className="hidden md:flex items-center mr-2">
              <span className="text-sm font-bold">{formatTaka(cartTotal)}</span>
            </div>

            <Link href="/cart" className="relative">
              <ShoppingBag className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground rounded-full text-xs w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link href="/auth/login">
              <User className="h-6 w-6" />
            </Link>

            {/* Mobile menu button */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  {isMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {/* Mobile Cart Total */}
                  <div className="flex items-center justify-between px-2">
                    <span className="text-sm font-medium">Cart Total:</span>
                    <span className="text-sm font-medium">
                      {formatTaka(cartTotal)}
                    </span>
                  </div>

                  {/* Mobile Search */}
                  <div className="relative">
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="pl-8"
                    />
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>

                  {/* Mobile Navigation Links */}
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg py-2 text-gray-600 hover:text-gray-900 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
