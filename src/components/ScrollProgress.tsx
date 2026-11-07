"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[9999] pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 via-pink-500 to-cyan-400 origin-left shadow-[0_0_12px_rgba(0,245,255,0.8)]"
        style={{ scaleX }}
      />
    </div>
  );
}

