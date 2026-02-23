"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function Vision() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 page-container">

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl w-full glass p-8 md:p-14 rounded-[40px] shadow-premium relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-6 opacity-10">
          <Quote size={80} className="text-primary" />
        </div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="relative z-10"
        >
          <h2 className="text-primary font-bold tracking-widest uppercase mb-4 flex items-center gap-2 text-xs md:text-sm">
            <span className="h-1 w-10 bg-primary rounded-full"></span>
            Our Vision
          </h2>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
            On Engineers' Day,
          </h1>

          <div className="space-y-6 text-lg md:text-2xl text-muted-foreground leading-relaxed">
            <p>
              we salute the <span className="text-foreground font-semibold">creativity and perseverance</span> of every construction professional whose ideas shape India's skyline and infrastructure.
            </p>
            <p>
              Your work builds not just structures, but the <span className="text-gradient font-bold underline decoration-primary/30 underline-offset-8">future itself</span>.
            </p>
          </div>
        </motion.div>


        <div className="mt-16 flex items-center gap-4">
           {["Yesterday", "Today", "Tomorrow"].map((time, i) => (
             <div key={time} className="flex items-center gap-4">
                <span className={time === "Today" ? "text-primary font-bold" : "text-muted-foreground/50"}>{time}</span>
                {i < 2 && <span className="h-1 w-8 bg-glass-border"></span>}
             </div>
           ))}
        </div>
      </motion.div>
    </div>
  );
}
