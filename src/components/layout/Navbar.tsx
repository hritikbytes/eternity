"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { HeartHandshake, Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex flex-1 items-center justify-start">
          <Link href="/" className="flex items-center gap-2 text-primary font-heading text-2xl font-semibold">
            <HeartHandshake className="h-8 w-8" />
            <span>Eternity</span>
          </Link>
        </div>

        <nav className="hidden md:flex flex-none items-center justify-center gap-8 font-medium">
          <Link href="/how-it-works" className="relative text-foreground/80 hover:text-primary transition-colors py-1 after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform hover:after:scale-x-100">
            How it works
          </Link>
          <Link href="/success-stories" className="relative text-foreground/80 hover:text-primary transition-colors py-1 after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform hover:after:scale-x-100">
            Success Stories
          </Link>
          <div className="relative text-foreground/50 py-1 cursor-default flex items-center gap-2">
            Premium
            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-primary/20">Coming Soon</span>
          </div>
        </nav>

        <div className="hidden md:flex flex-1 items-center justify-end gap-2">
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "h-9 px-3")}
          >
            Login
          </Link>
          <Link
            href="/signup"
            className={cn(buttonVariants({ variant: "default", size: "lg" }), "h-9 px-4")}
          >
            Signup
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground ml-auto"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border p-6 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top-2 duration-300">
          <div className="flex flex-col gap-3">
            <Link href="/how-it-works" className="w-full justify-center h-12 rounded-full border border-border bg-background px-4 inline-flex items-center">
              How it works
            </Link>
            <Link href="/success-stories" className="w-full justify-center h-12 rounded-full border border-border bg-background px-4 inline-flex items-center">
              Success Stories
            </Link>
            <div className="w-full justify-center h-12 rounded-full border border-border bg-background/50 text-foreground/50 px-4 inline-flex items-center gap-2 cursor-default">
              Premium
              <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-primary/20">Coming Soon</span>
            </div>

            <Link
              href="/login"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full h-12 justify-center rounded-full")}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className={cn(buttonVariants({ variant: "default", size: "lg" }), "w-full h-12 justify-center rounded-full")}
            >
              Signup
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
