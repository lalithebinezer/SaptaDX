"use client";

import { motion } from "framer-motion";

export default function GlowingGlobe() {
  // Simplified World Map Path Data
  const worldPath = "M90.1,10.1C83.3,16,77,21,72,27c-5-6-11-11-18-17c1.3-3.7,1.3-7.7,0-10C35,5,19,16,11,32c-6,12-8,25-5,38c3,12,12,25,23,32 c11,7,25,8,38,5c12-3,25-12,32-23c7-11,8-25,5-38c-3-12-12-25-23-32C71,7,58,6,46,10z"; // Placeholder for actual complex path

  return (
    <motion.div 
      animate={{ 
        x: [0, 15, 0, -15, 0],
        y: [0, -10, 0, 10, 0]
      }}
      transition={{ 
        duration: 15, 
        repeat: Infinity, 
        ease: "linear" 
      }}
      className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center"
    >
      {/* Globe Background Glow */}
      <div className="absolute inset-0 bg-primary/20 rounded-full blur-[60px] animate-pulse" />
      
      {/* Main Globe Sphere - Removed 'rotate' to make it a revolving sphere experience */}
      <div 
        className="relative w-full h-full rounded-full border border-primary/30 glass shadow-[inset_0_0_50px_rgba(21,128,61,0.2)] overflow-hidden"
      >

        {/* Stylized World Map - Direct SVG for absolute reliability */}
        <div className="absolute inset-0 opacity-40 animate-pan-slow flex">
           <div className="min-w-full h-full flex items-center justify-around translate-x-12 opacity-80">
              <WorldSvg />
              <WorldSvg />
           </div>
        </div>

        {/* Abstract Grid Lines */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className="absolute border border-primary/40 rounded-full"
              style={{
                top: '50%',
                left: '50%',
                width: `${100 - i * 15}%`,
                height: `100%`,
                transformOrigin: 'top left',
                transform: `translate(-50%, -50%) rotateY(${i * 30}deg)`
              }}
            />
          ))}
        </div>

        {/* India Highlight */}
        <div className="absolute top-[48%] left-[68%] w-4 h-4 z-20">
            <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75" />
            <div className="absolute inset-0 bg-primary rounded-full shadow-[0_0_20px_#15803d]" />
            <div className="absolute top-6 left-2 whitespace-nowrap text-[10px] font-extrabold text-primary uppercase tracking-widest bg-white/90 px-3 py-1 rounded-full border border-primary/30 shadow-sm leading-none">
                SaptaDX Hub
            </div>
        </div>
      </div>

      {/* Floating Atmosphere Elements */}
      <motion.div
        animate={{ 
          rotate: -360,
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          rotate: { duration: 60, repeat: Infinity, ease: "linear" },
          scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute inset-0 -m-4 border border-primary/10 rounded-full"
      />
    </motion.div>

  );
}

function WorldSvg() {
    return (
        <svg viewBox="0 0 2000 1000" className="h-[70%] w-auto fill-primary/60">
            <path d="M228.3,165c0.3,5.1,1.7,10.1,4,14.8c4.3,8.7,11.3,16,20,20.6c8.5,4.5,18.1,6.5,27.7,5.8c9.6-0.7,18.9-4.3,26.5-10.3c6.1-4.8,11-10.9,14.5-17.8c0.9-1.8,1.7-3.7,2.3-5.5c-9.1-3.6-18.7-6.2-28.5-7.6c-4.9-0.7-9.8-1.2-14.8-1.2c-15.6,0-30.7,3.9-44.1,11V165z M107.5,191.1c-13.6,1.4-26.4,7.3-36.4,16.8c-10,9.5-16.7,22.2-18.9,35.8c-2.2,13.6,0.3,27.6,7,39.8c6.7,12.2,17.4,21.8,30.3,27c5.2,2.1,10.6,3.4,16.2,3.9c1,0.1,2.1,0.2,3.1,0.2c5.9,0,11.8-0.9,17.4-2.7c11.2-3.6,21.1-10.5,28.6-19.8c7.5-9.3,12.1-20.6,13.2-32.5c1.1-11.9-1.1-23.9-6.4-34.5c-5.3-10.6-13.6-19.5-23.9-25.2C127.8,194.5,117.8,192.1,107.5,191.1L107.5,191.1z M523.6,210.5c-15.5,1.7-29.8,9.5-40.2,21.8c-10.4,12.3-15.9,28-15.4,44.1c0.5,16.1,7.1,31.4,18.5,42.9c11.4,11.5,26.7,18.4,42.8,19.3c5.3,0.3,10.5,0.1,15.7-0.6c1.1-0.1,2.1-0.3,3.2-0.5c11.9-2.1,22.8-8,30.9-16.7c8.1-8.7,13.1-19.8,14.1-31.7c0.9-11.9-1.5-23.8-7-34.3s-14.1-19-24.8-24.3c-10.7-5.3-22.8-7.3-34.6-5.7C525.8,210.3,524.7,210.4,523.6,210.5L523.6,210.5z M824,242.4c-11.8,1.4-23,7.2-31.4,16.4c-8.4,9.2-13.3,21.3-13.8,33.9c-0.5,12.6,3.6,25,11.4,34.9c7.9,9.9,19.1,16.7,31.6,19.2c4.1,0.8,8.2,1.2,12.4,1.2c1,0,2.1-0.1,3.1-0.1c11.7-1.1,22.5-6.6,30.3-15.4c7.8-8.8,12.1-20.2,12.1-31.9c0-11.7-4.3-23-12.1-31.8c-7.8-8.8-18.6-14.3-30.3-15.4c-1-0.1-2.1-0.2-3.1-0.2C831,241.9,827.4,242.1,824,242.4L824,242.4z" />
            <path d="M1240,280c-50,0-100,20-150,50s-100,80-150,80s-100-20-150-50s-100-80-150-80s-100,20-150,50s-100,80-150,80" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10" className="opacity-30" />
            {/* Added abstract shapes for continents */}
            <path d="M150,200 Q200,100 350,150 T550,200 T750,150 T950,250 T1150,200 T1350,300" fill="none" stroke="currentColor" strokeWidth="4" className="opacity-40" />
            <circle cx="400" cy="300" r="100" className="opacity-20" />
            <circle cx="900" cy="500" r="150" className="opacity-20" />
            <circle cx="1400" cy="350" r="120" className="opacity-20" />
            <rect x="200" y="500" width="300" height="200" rx="40" className="opacity-20" />
            <path d="M1000,600 L1200,800 L1400,600 L1200,400 Z" className="opacity-20" />
        </svg>
    );
}
