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
          className="absolute -top-24 -left-24 w-[520px] h-[520px] bg-cyan-500/15 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.25, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 -right-28 w-[560px] h-[560px] bg-purple-600/15 rounded-full blur-[130px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -35, 0],
            y: [0, 35, 0],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 left-1/3 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[110px]"
          animate={{
            opacity: [0.3, 0.65, 0.3],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Ambient Subtle Cyber Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
      </div>

      {/* Subtle vignettes */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#050508]/40 via-transparent to-[#050508] pointer-events-none z-0" />
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#050508]/50 via-transparent to-[#050508]/50 pointer-events-none z-0" />

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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <Sparkles size={13} className="text-cyan-400" />
              Available for Opportunities &amp; Internships
            </div>

            {/* Intro text */}
            <p className="text-sm md:text-base font-semibold tracking-widest uppercase text-slate-400 mb-2">
              Hi, I&apos;m
            </p>

            {/* Name */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.08] mb-4">
              <span className="text-white">SANGMESHWAR </span>
              <br className="hidden sm:inline" />
              <span className="text-gradient">NAIK</span>
            </h1>

            {/* Typing roles */}
            <div className="mb-6 flex items-center justify-center lg:justify-start">
              <RoleTypingEffect roles={roles} />
            </div>

            {/* Description */}
            <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8">
              Building intelligent solutions through Artificial Intelligence, Machine Learning,
              and modern software engineering. Passionate about transforming innovative ideas
              into real-world applications.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
              {/* View Projects */}
              <motion.button
                onClick={() => scrollTo("projects")}
                className="group relative px-6 py-3.5 rounded-xl font-semibold text-sm text-white overflow-hidden shadow-lg shadow-cyan-500/25 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 transition-all flex items-center gap-2 cursor-pointer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <span>View My Projects</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>

              {/* Download Resume */}
              <motion.a
                href="/resume.pdf"
                download="Sangmeshwar_Naik_Resume.pdf"
                className="group px-6 py-3.5 rounded-xl font-semibold text-sm text-white glass hover:border-purple-400/50 hover:text-purple-300 transition-all flex items-center gap-2 cursor-pointer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <Download size={16} className="text-purple-400 group-hover:translate-y-0.5 transition-transform" />
                <span>Download Resume</span>
              </motion.a>

              {/* Contact Me */}
              <motion.button
                onClick={() => scrollTo("contact")}
                className="group px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 glass hover:border-cyan-400/50 hover:text-cyan-300 transition-all flex items-center gap-2 cursor-pointer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <Mail size={16} className="text-cyan-400" />
                <span>Contact Me</span>
              </motion.button>
            </div>

            {/* Social Links & Quick Info */}
            <div className="flex items-center justify-center lg:justify-start gap-4 text-slate-400">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                Find me on:
              </span>
              <a
                href="https://github.com/Sangmeshwar-Naik"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-300 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                aria-label="GitHub Profile"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/sangmeshwar-naik-555828385"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-300 hover:text-[#0a66c2] hover:border-[#0a66c2]/50 hover:bg-[#0a66c2]/10 transition-all"
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
              className="absolute w-[360px] h-[480px] rounded-[48px] bg-gradient-to-tr from-cyan-500/25 via-purple-600/30 to-pink-500/20 blur-3xl pointer-events-none"
              animate={{
                scale: [1, 1.12, 1],
                opacity: [0.55, 0.9, 0.55],
                rotate: [0, 45, 0],
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Revolving Cyber Dashed Orbital Rings behind the Card */}
            <motion.div
              className="absolute w-[440px] h-[440px] rounded-full border border-dashed border-cyan-500/20 pointer-events-none hidden sm:block"
              animate={{ rotate: 360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute w-[380px] h-[380px] rounded-full border border-dotted border-purple-500/25 pointer-events-none hidden sm:block"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />

            {/* Smooth continuous 3D Floating Motion Wrapper for the Profile Card */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-full flex justify-center"
            >
              {/* Central Profile Card with portrait photo and monogram logo */}
              <div className="relative glass rounded-3xl p-5 sm:p-6 border border-white/10 max-w-sm w-full shadow-2xl">
                {/* Profile Card Inner Display Frame with Dotted Backdrop and Generous Top Space */}
                <div className="relative w-full rounded-2xl overflow-hidden bg-[#090b1c] border border-blue-500/20 pt-12 pb-5 px-5 sm:pt-14 sm:pb-6 sm:px-6 flex flex-col items-center text-center">
                  <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1.5px,transparent_1.5px)] [background-size:18px_18px] opacity-25 pointer-events-none" />

                  {/* Portrait with Glowing Gold Border and Authentic Proportions */}
                  <div className="relative z-10 w-40 h-[190px] sm:w-44 sm:h-[210px] rounded-[28px] sm:rounded-3xl overflow-hidden border-2 border-amber-400 shadow-[0_0_28px_rgba(251,191,36,0.45)] mb-3.5 bg-white shrink-0">
                    <Image
                      src="/profile.jpg"
                      alt="Sangmeshwar Anil Naik"
                      fill
                      sizes="(max-width: 640px) 160px, 176px"
                      className="object-cover object-top"
                      priority
                    />
                  </div>

                  {/* Monogram Emblem Badge */}
                  <div className="relative z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-amber-400/60 shadow-[0_0_15px_rgba(251,191,36,0.35)] bg-[#070814] mb-2.5">
                    <Image
                      src="/logo.jpg"
                      alt="SAN Monogram"
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>

                  {/* Name & Academic Credentials */}
                  <h3 className="relative z-10 text-xl sm:text-2xl font-black text-white tracking-tight">
                    Sangmeshwar Anil Naik
                  </h3>
                  <p className="relative z-10 text-xs sm:text-sm font-semibold text-cyan-400 mt-1 mb-5">
                    B.E. AIML @ VTU
                  </p>

                  {/* Bottom Pill Status Strip */}
                  <div className="relative z-10 w-full py-2.5 px-4 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs text-slate-300 font-mono">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      CGPA 8.4 / 10
                    </span>
                    <span className="text-slate-300">Mangalore, KA</span>
                  </div>
                </div>

                {/* Quick Spec Highlights */}
                <div className="grid grid-cols-2 gap-3 text-center mt-3.5">
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                    <span className="text-xs text-slate-400 block font-medium">Specialization</span>
                    <p className="text-sm sm:text-base font-bold text-white mt-0.5">AI &amp; ML</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                    <span className="text-xs text-slate-400 block font-medium">Graduation</span>
                    <p className="text-sm sm:text-base font-bold text-cyan-400 mt-0.5">2027</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Satellite Badge 1 (Top Right) */}
            <motion.div
              className="absolute -top-4 -right-4 glass px-4 py-2.5 rounded-2xl border border-cyan-500/30 flex items-center gap-2.5 shadow-xl pointer-events-none hidden sm:flex"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Brain size={18} className="text-cyan-400" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Focus</p>
                <p className="text-xs font-bold text-white">Deep Learning</p>
              </div>
            </motion.div>

            {/* Floating Satellite Badge 2 (Bottom Left) */}
            <motion.div
              className="absolute -bottom-4 -left-4 glass px-4 py-2.5 rounded-2xl border border-purple-500/30 flex items-center gap-2.5 shadow-xl pointer-events-none hidden sm:flex"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <Cpu size={18} className="text-purple-400" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Domain</p>
                <p className="text-xs font-bold text-white">Computer Vision</p>
              </div>
            </motion.div>
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
