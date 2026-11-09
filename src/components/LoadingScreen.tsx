"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const staticParticles = [
  { x: 120, delay: 0.2, duration: 3.5 },
  { x: 280, delay: 0.8, duration: 4.2 },
  { x: 450, delay: 1.4, duration: 3.8 },
  { x: 620, delay: 0.5, duration: 4.5 },
  { x: 790, delay: 1.1, duration: 3.2 },
  { x: 960, delay: 1.7, duration: 4.0 },
  { x: 1100, delay: 0.3, duration: 3.6 },
  { x: 200, delay: 2.0, duration: 4.8 },
  { x: 380, delay: 1.6, duration: 3.4 },
  { x: 550, delay: 2.2, duration: 4.1 },
  { x: 720, delay: 0.9, duration: 3.9 },
  { x: 890, delay: 1.5, duration: 4.4 },
];

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[99999] bg-[#050508] flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      {/* Brand Monogram */}
      <motion.div
        className="relative mb-8"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-20 h-20 rounded-none overflow-hidden border border-amber-500/40 shadow-2xl shadow-amber-500/25 bg-[#0a0a14]">
          <Image
            src="/logo.jpg"
            alt="SAN Logo"
            fill
            sizes="80px"
            className="object-cover"
            priority
          />
        </div>
      </motion.div>

      {/* Futuristic Dual Ring Spinner */}
      <div className="relative w-20 h-20">
        <motion.div
          className="absolute inset-0 w-full h-full rounded-full border-2 border-transparent border-t-cyan-400 border-r-purple-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-12 h-12 -mt-6 -ml-6 rounded-full border-2 border-transparent border-b-pink-500 border-l-cyan-400"
          animate={{ rotate: -360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_12px_#00f5ff]" />
        </div>
      </div>

      {/* Loading status */}
      <p className="mt-8 text-xs text-slate-400 font-semibold tracking-widest uppercase animate-pulse">
        Initializing AI Environment...
      </p>

      {/* Subtle Progress Bar */}
      <div className="mt-5 w-44 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.3, ease: "easeInOut" }}
        />
      </div>

      {/* Ambient background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {staticParticles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
            style={{ left: `${(p.x / 1200) * 100}%` }}
            initial={{ y: -10, opacity: 0 }}
            animate={{
              y: 900,
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
