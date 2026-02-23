"use client";

import { motion } from "framer-motion";

export default function WaveDrops() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.05, 0.1, 0.05],
            scale: [1, 1.2, 1],
            y: ["0%", "5%", "0%"],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
          className="absolute rounded-full bg-primary/20 blur-[100px]"
          style={{
            width: `${300 + i * 100}px`,
            height: `${200 + i * 50}px`,
            left: `${(i * 20) % 100}%`,
            top: `${(i * 15) % 100}%`,
          } as any}
        />

      ))}
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
      
      {/* SVG Wave Pattern */}
      <svg className="absolute bottom-0 left-0 w-full h-[300px] opacity-20" preserveAspectRatio="none" viewBox="0 0 1440 320">
        <motion.path
          animate={{
            d: [
              "M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,192L48,181.3C96,171,192,149,288,160C384,171,480,213,576,213.3C672,213,768,171,864,154.7C960,139,1056,149,1152,165.3C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          fill="var(--color-primary)"
        />
      </svg>
    </div>
  );
}
