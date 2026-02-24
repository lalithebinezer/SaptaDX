"use client";

import { motion } from "framer-motion";

import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";
import SpaceBackground from "@/components/SpaceBackground";
import { Globe } from "@/components/ui/globe";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden px-6 page-container center-content">
      <SpaceBackground />

      
      <div className="max-w-7xl w-full z-10 py-12 flex flex-col lg:flex-row items-center gap-12 mt-20 lg:mt-0">
        <div className="flex-1 text-center md:text-left">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 text-sm font-medium border border-glass-border shadow-sm mx-auto md:mx-0"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-gradient">Innovating from India</span>
          </motion.div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 leading-[1.1] drop-shadow-[0_0_30px_rgba(128,128,128,0.2)]"
          >
            Empowering <br />
            <span className="text-gradient">Construction</span> <br />
            Infrastructure
          </motion.h1>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground font-medium mb-8 max-w-xl md:mx-0 mx-auto leading-relaxed"
          >
            SaptaDX builds the digital pulse for project managers and engineers to scale growth with precision and excellence.
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <Link href="/vision" className="premium-gradient text-background px-8 py-4 rounded-2xl font-semibold shadow-premium hover:scale-105 transition-transform flex items-center gap-2">
              Our Vision <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/dx" className="glass px-8 py-4 rounded-2xl font-semibold hover:border-foreground/50 transition-colors border border-glass-border">
              Explore DX Hub
            </Link>
          </motion.div>

          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {[
              { icon: <Zap className="w-5 h-5 text-foreground" />, title: "Velocity", desc: "Proven digital strategies." },
              { icon: <Shield className="w-5 h-5 text-foreground" />, title: "Integrity", desc: "Secure collab framework." },
              { icon: <Sparkles className="w-5 h-5 text-foreground" />, title: "Excellence", desc: "Mastering technologies." },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5, borderColor: "rgba(128, 128, 128, 0.4)" }}
                className="glass p-5 rounded-[24px] text-left border border-foreground/5 hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] transition-all group"
              >
                <div className="mb-3 p-2 rounded-xl bg-foreground/5 w-fit group-hover:bg-foreground/10 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-base font-bold mb-1 group-hover:text-foreground transition-colors">{feature.title}</h3>
                <p className="text-[10px] text-muted-foreground group-hover:text-foreground/80 leading-relaxed transition-colors">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>

        <motion.div 
          initial={{ scale: 0.8, opacity: 0, x: 50 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex-1 relative flex justify-center items-center aspect-square md:aspect-auto"
        >
          <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
             <Globe className="!relative" />
             <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.15),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)] blur-2xl" />
          </div>
        </motion.div>

      </div>
    </div>
  );
}




