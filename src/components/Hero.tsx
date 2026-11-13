"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Mail,
  Sparkles,
  ChevronDown,
  Cpu,
  Brain,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

// Dynamically import Three.js Canvas with SSR disabled to guarantee no server-side WebGL rendering errors
const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#050508] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,245,255,0.15),rgba(255,255,255,0))]" />
  ),
});

// Dynamically import 3D Interactive Physics Lanyard
const Lanyard = dynamic(() => import("./Lanyard"), {
  ssr: false,
});

const roles = [
  "AI/ML Engineer",
  "Data Scientist",
  "GenAI Developer",
  "Computer Vision Enthusiast",
  "Quantum ML Explorer",
];

function RoleTypingEffect({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (subIndex === roles[index].length + 1 && !isDeleting) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && isDeleting) {
      const timeout = setTimeout(() => {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % roles.length);
      }, 100);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
      },
      isDeleting ? 40 : 80
    );

    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting, roles]);

  return (
    <div className="inline-flex items-center text-xl md:text-2xl lg:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 min-h-[44px]">
      <span>{roles[index].substring(0, subIndex)}</span>
      <span className="w-[3px] h-6 md:h-8 bg-cyan-400 ml-1.5 animate-pulse rounded" />
    </div>
  );
}

export default function Hero() {
  const [cardMode, setCardMode] = useState<"lanyard" | "classic">("lanyard");

  const scrollTo = (id: string) => {
    if (typeof document !== "undefined") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-28 pb-16"
    >
      {/* 3D Animated Background - Rendered Client-Side Only */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-85 overflow-hidden">
        <HeroCanvas />
      </div>

      {/* Guaranteed Animated Cyber Cosmic Background (always active and animated) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        {/* Animated Pulsing Nebulae */}
        <motion.div
          className="absolute -top-24 -left-24 w-[320px] h-[320px] sm:w-[520px] sm:h-[520px] bg-cyan-500/15 rounded-full blur-2xl sm:blur-[120px] transform-gpu will-change-transform"
          animate={{
            scale: [1, 1.25, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 -right-28 w-[340px] h-[340px] sm:w-[560px] sm:h-[560px] bg-purple-600/15 rounded-full blur-2xl sm:blur-[130px] transform-gpu will-change-transform"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -35, 0],
            y: [0, 35, 0],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 left-1/3 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-pink-500/10 rounded-full blur-2xl sm:blur-[110px] transform-gpu will-change-transform"
          animate={{
            opacity: [0.3, 0.65, 0.3],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Ambient Subtle Cyber Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />
      </div>

      {/* Subtle vignettes for clean light background */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-white/30 via-transparent to-white pointer-events-none z-0" />
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/40 via-transparent to-white/40 pointer-events-none z-0" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left / Main Introduction */}
          <motion.div
            className="lg:col-span-7 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/40 text-xs font-semibold text-cyan-700 bg-cyan-50/70 mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <Sparkles size={13} className="text-cyan-600" />
              Available for Opportunities &amp; Internships
            </div>

            {/* Intro text */}
            <p className="text-sm md:text-base font-semibold tracking-widest uppercase text-slate-500 mb-2">
              Hi, I&apos;m
            </p>

            {/* Name */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.08] mb-4">
              <span className="text-slate-950">SANGMESHWAR </span>
              <br className="hidden sm:inline" />
              <span className="text-gradient">NAIK</span>
            </h1>

            {/* Typing roles */}
            <div className="mb-6 flex items-center justify-center lg:justify-start">
              <RoleTypingEffect roles={roles} />
            </div>

            {/* Description */}
            <p className="text-base md:text-lg text-slate-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8 font-medium">
              Building intelligent solutions through Artificial Intelligence, Machine Learning,
              and modern software engineering. Passionate about transforming innovative ideas
              into real-world applications.
            </p>

            {/* CTA Buttons - Spacious Rounded Modern Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
              {/* View Projects */}
              <motion.button
                onClick={() => scrollTo("projects")}
                className="group relative px-7 py-3.5 rounded-xl font-semibold text-sm text-white overflow-hidden shadow-lg shadow-cyan-500/25 bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 transition-all flex items-center gap-2 cursor-pointer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <span>View My Projects</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>

              {/* View & Download CV */}
              <motion.button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-resume-modal"));
                  }
                }}
                className="group px-7 py-3.5 rounded-xl font-semibold text-sm text-purple-700 glass border border-purple-500/30 bg-purple-50/70 hover:bg-purple-100 hover:border-purple-400 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <Download size={16} className="text-purple-600 group-hover:translate-y-0.5 transition-transform" />
                <span>View &amp; Download CV</span>
              </motion.button>

              {/* Contact Me */}
              <motion.button
                onClick={() => scrollTo("contact")}
                className="group px-7 py-3.5 rounded-xl font-semibold text-sm text-slate-800 glass border border-slate-200 bg-white/80 hover:border-cyan-400 hover:text-cyan-700 hover:bg-cyan-50/50 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <Mail size={16} className="text-cyan-600" />
                <span>Contact Me</span>
              </motion.button>
            </div>

            {/* Social Links & Quick Info */}
            <div className="flex items-center justify-center lg:justify-start gap-4 text-slate-600">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                Find me on:
              </span>
              <a
                href="https://github.com/Sangmeshwar-Naik"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl glass border border-slate-200 bg-white/80 flex items-center justify-center text-slate-700 hover:text-slate-950 hover:border-cyan-500 hover:bg-cyan-50/50 transition-all shadow-sm"
                aria-label="GitHub Profile"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/sangmeshwar-naik-555828385"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl glass border border-slate-200 bg-white/80 flex items-center justify-center text-slate-700 hover:text-[#0a66c2] hover:border-[#0a66c2]/50 hover:bg-[#0a66c2]/10 transition-all shadow-sm"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin size={18} />
              </a>
            </div>
          </motion.div>

          {/* Right / Interactive Profile & Floating AI Cards */}
          <motion.div
            className="lg:col-span-5 relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Animated Pulsating Cosmic Aura directly behind the Profile Card */}
            <motion.div
              className="absolute w-[300px] h-[400px] sm:w-[360px] sm:h-[480px] rounded-[48px] bg-gradient-to-tr from-cyan-500/25 via-purple-600/30 to-pink-500/20 blur-2xl sm:blur-3xl pointer-events-none transform-gpu will-change-transform"
              animate={{
                scale: [1, 1.12, 1],
                opacity: [0.55, 0.9, 0.55],
                rotate: [0, 45, 0],
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Revolving Cyber Dashed Orbital Rings behind the Card */}
            <motion.div
              className="absolute w-[320px] h-[320px] sm:w-[460px] sm:h-[460px] rounded-full border border-dashed border-cyan-500/30 pointer-events-none transform-gpu"
              animate={{ rotate: 360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute w-[280px] h-[280px] sm:w-[410px] sm:h-[410px] rounded-full border border-dotted border-purple-500/35 pointer-events-none transform-gpu"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />

            {/* Interactive Profile Area: 3D Physics Lanyard Card or Classic Card */}
            <div className="relative z-10 w-full flex flex-col items-center justify-center">
              {/* Card Mode Toggle Switch - Spacious Rounded Buttons */}
              <div className="flex items-center gap-2.5 mb-3.5 z-30">
                <button
                  onClick={() => setCardMode("lanyard")}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-md ${
                    cardMode === "lanyard"
                      ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-cyan-500/25 scale-105 border border-cyan-400/40"
                      : "glass text-slate-700 bg-white/80 hover:text-slate-900 border border-slate-200"
                  }`}
                  title="Switch to 3D Physics Lanyard Card"
                >
                  <span>🪪</span>
                  <span>3D Lanyard</span>
                </button>
                <button
                  onClick={() => setCardMode("classic")}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-md ${
                    cardMode === "classic"
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-purple-500/25 scale-105 border border-purple-400/40"
                      : "glass text-slate-700 bg-white/80 hover:text-slate-900 border border-slate-200"
                  }`}
                  title="Switch to Classic Card View"
                >
                  <span>📋</span>
                  <span>Classic Card</span>
                </button>
              </div>

              {cardMode === "lanyard" ? (
                /* 3D Physics Interactive Lanyard View */
                <div className="relative w-full max-w-[390px] sm:max-w-[450px] h-[550px] sm:h-[610px] flex items-center justify-center">
                  <Lanyard
                    frontImage="/profile-card.png"
                    backImage="/profile-card.png"
                    imageFit="contain"
                    cardColor="#0f172a"
                    orientation="square"
                    finish="glossy"
                    cornerRadius={0.08}
                    size={0.68}
                    anchor="center"
                    strapLength={0.42}
                    strapColor="#1e293b"
                    strapWidth={0.65}
                    metal="gold"
                    gravity={1}
                    damping={0.5}
                    elasticity={0.5}
                    breeze={0.35}
                    interactive
                    intro
                  />

                  {/* Floating Satellite Badge 1 (Top Right) - Spacious Rounded Pill */}
                  <motion.div
                    className="absolute top-20 -right-2 sm:top-24 sm:-right-4 z-20 glass px-4 sm:px-4.5 py-2.5 sm:py-3 rounded-2xl border border-cyan-500/30 bg-white/95 flex items-center gap-2.5 sm:gap-3 shadow-xl pointer-events-none"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0">
                      <Brain size={16} className="text-cyan-600" />
                    </div>
                    <div className="text-left">
                      <p className="text-[9px] sm:text-[10px] text-slate-500 uppercase font-bold tracking-wider leading-none">Focus</p>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 whitespace-nowrap mt-0.5">Deep Learning</p>
                    </div>
                  </motion.div>

                  {/* Floating Satellite Badge 2 (Bottom Left) - Spacious Rounded Pill */}
                  <motion.div
                    className="absolute bottom-10 -left-2 sm:bottom-12 sm:-left-4 z-20 glass px-4 sm:px-4.5 py-2.5 sm:py-3 rounded-2xl border border-purple-500/30 bg-white/95 flex items-center gap-2.5 sm:gap-3 shadow-xl pointer-events-none"
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0">
                      <Cpu size={16} className="text-purple-600" />
                    </div>
                    <div className="text-left">
                      <p className="text-[9px] sm:text-[10px] text-slate-500 uppercase font-bold tracking-wider leading-none">Domain</p>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 whitespace-nowrap mt-0.5">Computer Vision</p>
                    </div>
                  </motion.div>
                </div>
              ) : (
                /* Classic Card View with Continuous 3D Floating Motion - Spacious Rounded Card */
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 w-full flex justify-center"
                >
                  <div className="relative w-full max-w-[340px] sm:max-w-[430px]">
                    {/* Central Profile Card with portrait photo and monogram logo */}
                    <div className="relative rounded-3xl p-6 sm:p-9 pt-8 sm:pt-10 border border-slate-200/90 bg-white/95 backdrop-blur-2xl w-full shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden">
                      {/* Dotted Matrix Background Pattern across Upper Section */}
                      <div className="absolute inset-x-0 top-0 h-3/4 bg-[radial-gradient(#0891b2_1.5px,transparent_1.5px)] [background-size:18px_18px] opacity-15 pointer-events-none" />

                      {/* Inner flex column with generous top space above photo */}
                      <div className="relative z-10 pt-4 pb-1 sm:pt-6 flex flex-col items-center text-center">
                        {/* Portrait with Glowing Gold Border and Generous Top Clearance */}
                        <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-[2.5px] border-amber-400 shadow-[0_0_28px_rgba(251,191,36,0.4)] mb-3.5 bg-white shrink-0">
                          <Image
                            src="/profile.jpg"
                            alt="Sangmeshwar Anil Naik"
                            fill
                            sizes="(max-width: 640px) 160px, 192px"
                            className="object-cover object-top"
                            priority
                          />
                        </div>

                        {/* Monogram Emblem Badge */}
                        <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden border border-amber-400/80 shadow-[0_0_16px_rgba(251,191,36,0.35)] bg-slate-900 mb-3.5 shrink-0">
                          <Image
                            src="/logo.jpg"
                            alt="SAN Monogram"
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        </div>

                        {/* Name & Academic Credentials */}
                        <h3 className="text-2xl sm:text-[26px] font-black text-slate-950 tracking-tight leading-snug">
                          Sangmeshwar Anil Naik
                        </h3>
                        <p className="text-sm sm:text-base font-semibold text-cyan-600 mt-1 mb-5">
                          B.E. AIML @ VTU
                        </p>

                        {/* Status Strip Pill */}
                        <div className="w-full py-3 px-5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs sm:text-sm text-slate-700 font-mono mb-4 shadow-sm">
                          <span className="flex items-center gap-2 text-emerald-600 font-bold">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                            CGPA 8.4 / 10
                          </span>
                          <span className="text-slate-600 font-medium">Mangalore, KA</span>
                        </div>

                        {/* Bottom Integrated Specification Pills */}
                        <div className="w-full pt-4 border-t border-slate-100 grid grid-cols-2 gap-3.5 text-center">
                          <div className="py-3 px-3.5 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
                            <span className="text-xs text-slate-500 block font-medium">Specialization</span>
                            <p className="text-sm sm:text-base font-bold text-slate-900 mt-1">AI &amp; ML</p>
                          </div>
                          <div className="py-3 px-3.5 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
                            <span className="text-xs text-slate-500 block font-medium">Graduation</span>
                            <p className="text-sm sm:text-base font-bold text-cyan-600 mt-1">2027</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating Satellite Badge 1 (Top Right) */}
                    <motion.div
                      className="absolute -top-3 -right-2 sm:-top-5 sm:-right-4 z-20 glass px-4 sm:px-4.5 py-2.5 sm:py-3 rounded-2xl border border-cyan-500/30 bg-white/95 flex items-center gap-2.5 sm:gap-3 shadow-xl pointer-events-none"
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0">
                        <Brain size={16} className="text-cyan-600" />
                      </div>
                      <div className="text-left">
                        <p className="text-[9px] sm:text-[10px] text-slate-500 uppercase font-bold tracking-wider leading-none">Focus</p>
                        <p className="text-xs sm:text-sm font-bold text-slate-900 whitespace-nowrap mt-0.5">Deep Learning</p>
                      </div>
                    </motion.div>

                    {/* Floating Satellite Badge 2 (Bottom Left) */}
                    <motion.div
                      className="absolute -bottom-3 -left-2 sm:-bottom-5 sm:-left-4 z-20 glass px-4 sm:px-4.5 py-2.5 sm:py-3 rounded-2xl border border-purple-500/30 bg-white/95 flex items-center gap-2.5 sm:gap-3 shadow-xl pointer-events-none"
                      animate={{ y: [0, 6, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    >
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0">
                        <Cpu size={16} className="text-purple-600" />
                      </div>
                      <div className="text-left">
                        <p className="text-[9px] sm:text-[10px] text-slate-500 uppercase font-bold tracking-wider leading-none">Domain</p>
                        <p className="text-xs sm:text-sm font-bold text-slate-900 whitespace-nowrap mt-0.5">Computer Vision</p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-75 hover:opacity-100 transition-opacity">
          <span className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">
            Scroll to Explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="cursor-pointer"
            onClick={() => scrollTo("about")}
          >
            <ChevronDown size={18} className="text-cyan-400" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
