"use client";

import { useState, useEffect } from "react";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import GithubActivity from "@/components/GithubActivity";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

function SectionDivider({ label }: { label?: string }) {
  return (
    <div className="w-full max-w-5xl px-4 my-10 sm:my-20 flex items-center justify-center relative z-10 pointer-events-none">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 via-purple-500/30 to-transparent relative">
        {label && (
          <div className="absolute left-1/2 -translate-x-1/2 -top-3.5 flex items-center gap-2 px-4 py-1 rounded-full glass border border-white/10 bg-[#070712]/95 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-300 shadow-xl shadow-cyan-500/10 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>{label}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-[#050508] text-white flex flex-col items-center">
      {/* Precision Glowing Custom Cursor */}
      <CustomCursor />

      {/* Futuristic Initial Loader */}
      {isLoading && <LoadingScreen />}

      <div
        className={`w-full max-w-full flex flex-col items-center transition-opacity duration-700 ${
          isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <Navigation />
        <Hero />

        <SectionDivider label="Biography & Foundation" />
        <About />

        <SectionDivider label="Technical Competencies" />
        <Skills />

        <SectionDivider label="Featured Engineering" />
        <Projects />

        <SectionDivider label="Career Milestones" />
        <Experience />

        <SectionDivider label="Accredited Honors & Certifications" />
        <Certifications />

        {/* Dedicated Breathing Room & Cyber Transition Divider */}
        <div className="w-full max-w-6xl px-4 my-14 sm:my-24 flex items-center justify-center relative z-10 pointer-events-none">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/40 via-cyan-500/40 to-transparent relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-4 flex items-center gap-2 px-5 py-1.5 rounded-full glass border border-white/10 bg-[#06060e]/95 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-200 shadow-xl shadow-cyan-500/15 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Open Source Engineering &amp; Repositories</span>
            </div>
          </div>
        </div>

        <GithubActivity />

        <SectionDivider label="Direct Communication" />
        <Contact />

        <Footer />
      </div>
    </main>
  );
}
