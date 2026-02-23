"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

export default function SpaceBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Pre-generate star properties to avoid continuous re-calculations
  // and ensure they stay consistent during the component's lifecycle
  const stars = useMemo(() => {
    return [...Array(100)].map((_, i) => ({
      id: i,
      initialOpacity: Math.random(),
      duration: 2 + Math.random() * 4,
      delay: Math.random() * 5,
      width: Math.random() * 2,
      height: Math.random() * 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
    }));
  }, []);

  if (!mounted) {
    return <div className="absolute inset-0 -z-10 bg-background" />;
  }

  return (
    <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none bg-background">
      {/* Stars Layer */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ opacity: star.initialOpacity }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: star.delay,
            }}
            className="absolute rounded-full bg-foreground"
            style={{
              width: `${star.width}px`,
              height: `${star.height}px`,
              left: `${star.left}%`,
              top: `${star.top}%`,
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
