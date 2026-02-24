"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useState, useEffect } from "react";

import { useAuth } from "@/context/AuthContext";
import { Moon as LucideMoon, Sun as LucideSun, User as UserIcon, Menu, X } from "lucide-react";

import { MoonIcon, SunIcon } from "./ui/animated-weather-icons";
import { useTheme } from "@/context/ThemeContext";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: "Vision", href: "/vision" },
  { name: "Teamwork", href: "/teamwork" },
  { name: "DX", href: "/dx" },
  { name: "Collaborate", href: "/collaborate" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <nav className={cn("fixed top-0 left-0 right-0 z-50 flex justify-center p-4 transition-all duration-500", scrolled ? "py-2" : "py-4")}>
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "rounded-2xl flex items-center justify-between w-full max-w-7xl px-4 md:px-8 py-3 transition-all duration-500 border border-glass-border/40",
          scrolled ? "glass-intense shadow-xl shadow-black/10 scale-[0.98]" : "glass shadow-glass"
        )}
      >
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <Link href="/" className="text-lg md:text-xl font-bold tracking-tight text-foreground truncate max-w-[200px] sm:max-w-none">
            <span className="hidden sm:inline">Unlock your growth potential with </span>
            <span className="text-primary italic drop-shadow-[0_0_10px_var(--foreground)] opacity-80">Sapta's</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-2 mr-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            {isAdmin && (
               <Link
                 href="/admin"
                 className={cn(
                   "relative px-3 py-2 text-sm font-bold transition-colors hover:text-primary text-primary/80",
                   pathname === "/admin" ? "text-primary" : "text-primary/60"
                 )}
               >
                 Admin
                 {pathname === "/admin" && (
                   <motion.div
                     layoutId="activeNav"
                     className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                     transition={{ type: "spring", stiffness: 380, damping: 30 }}
                   />
                 )}
               </Link>
            )}
          </div>

          <div className="flex items-center gap-4 pl-4 border-l border-glass-border">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-xl hover:bg-foreground/5 transition-colors relative h-10 w-10 flex items-center justify-center overflow-hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "light" ? <LucideSun size={20} className="text-foreground" /> : <LucideMoon size={20} className="text-foreground" />}
                </motion.div>
              </AnimatePresence>
            </button>

            <div className="flex items-center gap-2 group cursor-pointer pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] text-muted-foreground leading-tight">
                  {theme === "light" ? "Clear Skies" : "Misty Skies"}
                </p>
                <p className="text-xs font-bold leading-tight">24°C</p>
              </div>
              <div className="p-1.5 rounded-xl bg-foreground/5 border border-foreground/10 group-hover:bg-foreground/10 transition-colors">
                {theme === "light" ? <SunIcon size={22} /> : <MoonIcon size={22} />}
              </div>
            </div>

            {user && (
              <Link 
                href="/collaborate"
                className="group flex items-center gap-3 pl-4 border-l border-white/5"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold leading-tight line-clamp-1">{user.displayName || "User"}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight">Collaborator</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon size={20} className="text-primary" />
                  )}
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile menu toggle & quick actions */}
        <div className="flex lg:hidden items-center gap-2">
          <button 
                onClick={toggleTheme}
                className="p-2 rounded-xl hover:bg-foreground/5 transition-colors relative h-9 w-9 flex items-center justify-center"
              >
              {theme === "light" ? <LucideSun size={18} className="text-foreground" /> : <LucideMoon size={18} className="text-foreground" />}
          </button>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-xl hover:bg-foreground/5 transition-colors text-foreground"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-4 right-4 glass rounded-3xl p-6 shadow-2xl border border-glass-border/40 lg:hidden flex flex-col gap-6 z-40"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-4 py-3 rounded-xl text-lg font-medium transition-colors",
                    pathname === item.href ? "bg-primary/10 text-primary" : "hover:bg-foreground/5 text-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  href="/admin"
                  className={cn(
                    "px-4 py-3 rounded-xl text-lg font-bold transition-colors border border-primary/20",
                    pathname === "/admin" ? "bg-primary/10 text-primary" : "text-primary/70 hover:bg-primary/5"
                  )}
                >
                  Admin Panel
                </Link>
              )}
            </div>

            <div className="pt-6 border-t border-glass-border flex flex-col gap-4">
              <div className="flex items-center justify-between px-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-foreground/5 border border-foreground/10">
                    {theme === "light" ? <SunIcon size={20} /> : <MoonIcon size={20} />}
                  </div>
                  <div>
                    <p className="text-xs font-bold">24°C</p>
                    <p className="text-[10px] text-muted-foreground">{theme === "light" ? "Clear Skies" : "Misty Skies"}</p>
                  </div>
                </div>
                
                {user && (
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-xs font-bold leading-tight">{user.displayName || "User"}</p>
                      <p className="text-[10px] text-muted-foreground">Collaborator</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 overflow-hidden flex items-center justify-center">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <UserIcon size={16} className="text-primary" />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
