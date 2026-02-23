"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { useAuth } from "@/context/AuthContext";
import { Moon as LucideMoon, Sun as LucideSun, User as UserIcon } from "lucide-react";

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
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();


  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="glass rounded-2xl flex items-center justify-between w-full max-w-7xl px-8 py-3 shadow-glass border-glass-border/40"
      >

        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
            Unlock your growth potential with <span className="text-primary italic drop-shadow-[0_0_10px_var(--foreground)] opacity-80">Sapta's</span>
          </Link>
        </div>

        <div className="flex items-center gap-6">
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
          </div>

          <div className="flex items-center gap-4 pl-4 border-l border-glass-border">
            {/* Theme Toggle */}
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

            {/* Weather Widget (Reactive) */}
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

      </motion.div>
    </nav>
  );
}
