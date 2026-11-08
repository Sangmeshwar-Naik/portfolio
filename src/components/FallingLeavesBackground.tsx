"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf } from "lucide-react";

// Dynamically import FallingLeaves from falling-leaves/react so Canvas only instantiates on client
const FallingLeaves = dynamic(
  () => import("falling-leaves/react").then((mod) => mod.FallingLeaves),
  { ssr: false }
);

export default function FallingLeavesBackground() {
  const [mounted, setMounted] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleToggle = () => setEnabled((prev) => !prev);
    window.addEventListener("toggle-falling-leaves", handleToggle);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("toggle-falling-leaves", handleToggle);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      <AnimatePresence>
        {enabled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="pointer-events-none fixed inset-0 z-20 overflow-hidden"
            aria-hidden="true"
          >
            <FallingLeaves
              fullScreen
              count={isMobile ? 12 : 22}
              opacity={0.85}
              zIndex={20}
              shapes={["maple", "oak", "ginkgo", "birch"]}
              respectReducedMotion={true}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Autumn Leaves Quick Toggle Button */}
      <div className="fixed bottom-6 left-20 sm:left-22 z-40">
        <button
          onClick={() => setEnabled((prev) => !prev)}
          className={`px-3.5 py-2.5 rounded-full glass border text-xs font-mono flex items-center gap-2 transition-all shadow-xl cursor-pointer group hover:scale-105 active:scale-95 ${
            enabled
              ? "border-amber-500/50 text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 shadow-amber-500/20"
              : "border-white/10 text-slate-400 bg-[#080918]/90 hover:text-white hover:border-white/20"
          }`}
          title={enabled ? "Pause falling leaves animation" : "Start falling leaves animation"}
          aria-label="Toggle falling leaves"
        >
          <Leaf
            size={14}
            className={`transition-transform duration-300 ${
              enabled ? "text-amber-400 rotate-12 group-hover:rotate-45" : "text-slate-500"
            }`}
          />
          <span className="text-[11px] font-semibold whitespace-nowrap">
            {enabled ? "Leaves" : "Leaves OFF"}
          </span>
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              enabled ? "bg-amber-400 animate-pulse" : "bg-slate-600"
            }`}
          />
        </button>
      </div>
    </>
  );
}

