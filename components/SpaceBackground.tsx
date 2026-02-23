"use client";

import { motion } from "framer-motion";

export default function SpaceBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none bg-background">
      {/* Stars Layer */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: Math.random() }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
            className="absolute rounded-full bg-foreground"
            style={{
              width: `${Math.random() * 2}px`,
              height: `${Math.random() * 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            } as any}
          />
        ))}
      </div>

      {/* Subtle Blobs */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [0.03, 0.08, 0.03],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20 + i * 10,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute blur-[120px] rounded-full bg-foreground"
          style={{
            width: `${600 + i * 200}px`,
            height: `${500 + i * 150}px`,
            left: `${(i * 40) % 70}%`,
            top: `${(i * 30) % 70}%`,
          } as any}
        />
      ))}

      {/* Gradient Overlay for content visibility */}
      <div className="absolute inset-0 bg-gradient-to-tr from-background/40 via-transparent to-background/40" />

    </div>
  );
}
