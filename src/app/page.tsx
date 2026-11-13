"use client";

import { useState, useEffect } from "react";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import CommandPalette from "@/components/CommandPalette";
import ResumeModal from "@/components/ResumeModal";
import AiAssistant from "@/components/AiAssistant";
import BackToTop from "@/components/BackToTop";
import FallingLeavesBackground from "@/components/FallingLeavesBackground";
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

function SectionSpacer() {
  return (
    <div
      className="w-full py-18 sm:py-28 md:py-36 flex items-center justify-center pointer-events-none relative"
      aria-hidden="true"
    >
      {/* Subtle detached ambient focal beacon — completely disconnected from adjacent sections */}
      <div className="flex items-center gap-2.5 opacity-40">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 shadow-sm shadow-cyan-400/50" />
        <span className="w-2.5 h-2.5 rounded-full bg-purple-400/80 shadow-md shadow-purple-500/60 animate-pulse" />
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 shadow-sm shadow-cyan-400/50" />
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
    <main className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-white text-slate-900 flex flex-col items-center">
      {/* Precision Glowing Custom Cursor */}
      <CustomCursor />

      {/* Atmospheric Autumn Falling Leaves Particle Effect */}
      <FallingLeavesBackground />

      {/* Global Scroll Progress Neon Gradient Line */}
      <ScrollProgress />

      {/* Spotlight Command Palette (Cmd+K / Ctrl+K) */}
      <CommandPalette />

      {/* Interactive Resume / CV Viewer Modal */}
      <ResumeModal />

      {/* Futuristic Initial Loader */}
      {isLoading && <LoadingScreen />}

      <div
        className={`w-full max-w-full flex flex-col items-center transition-opacity duration-700 ${
          isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <Navigation />
        <Hero />

        <SectionSpacer />
        <About />

        <SectionSpacer />
        <Skills />

        <SectionSpacer />
        <Projects />

        <SectionSpacer />
        <Experience />

        <SectionSpacer />
        <Certifications />

        <SectionSpacer />
        <GithubActivity />

        <SectionSpacer />
        <Contact />

        <SectionSpacer />
        <Footer />

        {/* Interactive Virtual AI Guide Widget */}
        <AiAssistant />

        {/* Dynamic Circular Radial Scroll-to-Top Rocket */}
        <BackToTop />
      </div>
    </main>
  );
}
