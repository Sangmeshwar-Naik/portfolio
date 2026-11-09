"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";

const TechText = dynamic(() => import("./TechText"), { ssr: false });
import {
  GraduationCap,
  Award,
  BookOpen,
  Compass,
  CheckCircle2,
  Calendar,
  Sparkles,
  MapPin,
  Briefcase,
  Terminal,
  Cpu,
  Brain,
  Atom,
  Globe,
  Database,
  Layers,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

const educationList = [
  {
    degree: "B.E. in Artificial Intelligence & Machine Learning",
    institution: "Srinivas Institute of Technology, Mangalore",
    university: "Visvesvaraya Technological University (VTU)",
    duration: "Sept 2023 – July 2027",
    score: "CGPA: 8.4 / 10",
    current: true,
    badge: "Currently Pursuing",
  },
  {
    degree: "12th (DPUC) - Science",
    institution: "Moulana Azad Independent P.U College, Bidar",
    university: "Department of Pre-University Education",
    duration: "Completed 2022",
    score: "64.33%",
    current: false,
    badge: "Pre-University",
  },
  {
    degree: "10th (KSEEB) - Secondary School",
    institution: "Government High School Hokarna, Hokarna",
    university: "Karnataka Secondary Education Examination Board",
    duration: "Completed 2020",
    score: "79.04%",
    current: false,
    badge: "Secondary Education",
  },
];

const coreDomains = [
  {
    name: "Artificial Intelligence",
    detail: "Statistical modeling & heuristic systems",
    icon: Brain,
    color: "#00f5ff",
  },
  {
    name: "Deep Learning & Vision",
    detail: "CNNs, U-Net lesion segmentation & YOLO",
    icon: EyeIcon,
    color: "#bf00ff",
  },
  {
    name: "Generative AI & LLMs",
    detail: "Prompt engineering, agentic workflows & APIs",
    icon: Sparkles,
    color: "#ec4899",
  },
  {
    name: "Quantum Machine Learning",
    detail: "Hybrid classical-quantum neural networks (QCNN)",
    icon: Atom,
    color: "#8b5cf6",
  },
  {
    name: "Full-Stack Development",
    detail: "Modern React, Next.js, Node.js & REST APIs",
    icon: Globe,
    color: "#10b981",
  },
  {
    name: "Database Architecture",
    detail: "Relational SQL modeling & NoSQL systems",
    icon: Database,
    color: "#f59e0b",
  },
];

function EyeIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return <Layers size={size} className={className} />;
}

function AnimatedCounter({
  target,
  suffix = "",
  decimals = 0,
}: {
  target: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let current = 0;
    const duration = 1500;
    const steps = 40;
    const stepTime = duration / steps;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setVal(target);
        clearInterval(timer);
      } else {
        setVal(current);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {decimals > 0 ? val.toFixed(decimals) : Math.floor(val)}
      {suffix}
    </span>
  );
}

export default function About() {
  const containerRef = useRef(null);

  return (
    <section
      id="about"
      className="relative w-full pt-32 pb-32 sm:pt-40 sm:pb-40 md:pt-48 md:pb-48 scroll-mt-32 overflow-hidden flex justify-center"
    >
      {/* Background radial ambient lights */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <motion.div
          className="w-full flex flex-col items-center justify-center text-center mx-auto mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-none glass border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-4 shadow-lg shadow-cyan-500/10 mx-auto">
            <Sparkles size={13} className="text-cyan-400" />
            Biography &amp; Architecture
          </div>
          <h2 className="sr-only">Turning Ideas Into Intelligent Solutions</h2>
          <div className="w-full max-w-5xl mx-auto h-[80px] sm:h-[105px] md:h-[125px] relative flex items-center justify-center text-center">
            <TechText
              text="Turning Ideas Into Intelligent Solutions"
              highlightText="Intelligent Solutions"
              fontWeight={900}
              fontSize={68}
              color="#ffffff"
              accentColor="#00f5ff"
              dashLength={4}
              dashGap={2}
              specks={12}
              reveal="letter"
              speed={2.2}
              clickKick
              sweep
              draggable
              selection
              labels={false}
              guides={false}
              align="center"
            />
          </div>
          <p className="mt-5 text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-center">
            Specializing in Artificial Intelligence, Machine Learning, and engineered full-stack architectures.
          </p>
        </motion.div>

        {/* ============================================================== */}
        {/* TOP ROW: EXECUTIVE BIOGRAPHY & LIVE METRIC CARDS                */}
        {/* ============================================================== */}
        <div className="grid lg:grid-cols-12 gap-7 sm:gap-9 items-stretch mb-10 sm:mb-14">
          {/* Executive Overview Card - Crisp Square Cyber Box */}
          <motion.div
            className="lg:col-span-7 rounded-none p-8 sm:p-10 lg:p-12 pb-10 sm:pb-12 lg:pb-14 border border-white/10 bg-[#070818]/90 backdrop-blur-xl hover:border-cyan-400/40 transition-all flex flex-col justify-between relative shadow-2xl group min-h-[500px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            {/* Subtle corner glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 blur-3xl pointer-events-none group-hover:bg-cyan-500/15 transition-all" />

            <div>
              {/* Header Badge Strip */}
              <div className="flex flex-wrap items-center justify-between gap-3.5 mb-7">
                <div className="flex items-center gap-3.5">
                  <div className="relative w-10 h-10 rounded-none overflow-hidden border border-amber-500/50 shadow-md bg-[#0a0a14] shrink-0">
                    <Image
                      src="/logo.jpg"
                      alt="SAN Logo"
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">Sangmeshwar Anil Naik</h3>
                    <p className="text-xs sm:text-sm text-cyan-400 font-mono font-medium">B.E. AIML Specialist</p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-none bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold shadow-sm">
                  <span className="w-2.5 h-2.5 rounded-none bg-emerald-400 animate-pulse" />
                  <span>Available for Roles &amp; Internships</span>
                </div>
              </div>

              {/* Core Executive Text */}
              <h4 className="text-xl sm:text-2xl md:text-[27px] font-black text-white tracking-tight leading-snug mb-6">
                Bridging Theoretical Machine Learning with Scalable Real-World Engineering.
              </h4>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  I am a Bachelor of Engineering student specializing in{" "}
                  <strong className="text-cyan-300 font-semibold">
                    Artificial Intelligence and Machine Learning
                  </strong>{" "}
                  at Srinivas Institute of Technology, Mangalore (VTU).
                </p>
                <p>
                  My research and development focuses on{" "}
                  <span className="text-purple-300 font-medium">
                    Deep Learning, Medical Computer Vision (U-Net lesion segmentation), Quantum Machine Learning (QCNN),
                  </span>{" "}
                  and building resilient full-stack systems backed by modern databases.
                </p>
              </div>
            </div>

            {/* Bottom Meta Pill Strip */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-mono">
              <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-none bg-white/[0.04] border border-white/10 text-slate-200 shadow-sm hover:border-cyan-500/30 transition-colors">
                <MapPin size={16} className="text-cyan-400 shrink-0" />
                <span className="font-medium">Bidar &amp; Mangalore, Karnataka</span>
              </div>
              <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-none bg-white/[0.04] border border-white/10 text-slate-200 shadow-sm hover:border-purple-500/30 transition-colors">
                <GraduationCap size={17} className="text-purple-400 shrink-0" />
                <span className="font-medium">VTU Class of 2027</span>
              </div>
            </div>
          </motion.div>

          {/* 4 Verified Metric Capsules - Crisp Square Boxes */}
          <motion.div
            className="lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="rounded-none p-7 sm:p-8 min-h-[165px] sm:min-h-[180px] text-center border border-white/10 bg-[#070818]/90 backdrop-blur-xl hover:border-cyan-400/50 hover:bg-cyan-500/[0.06] transition-colors duration-300 flex flex-col justify-center shadow-xl group relative overflow-hidden"
            >
              <div className="text-3xl sm:text-4xl lg:text-[42px] font-black text-cyan-400 mb-1.5 group-hover:scale-105 transition-transform">
                <AnimatedCounter target={8.4} decimals={1} />
              </div>
              <p className="text-sm sm:text-base font-bold text-white mt-1">B.E. AIML CGPA</p>
              <span className="text-xs sm:text-[13px] text-slate-400 font-mono mt-1">Scale: 10.0 (VTU)</span>
            </motion.div>

            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="rounded-none p-7 sm:p-8 min-h-[165px] sm:min-h-[180px] text-center border border-white/10 bg-[#070818]/90 backdrop-blur-xl hover:border-purple-400/50 hover:bg-purple-500/[0.06] transition-colors duration-300 flex flex-col justify-center shadow-xl group relative overflow-hidden"
            >
              <div className="text-3xl sm:text-4xl lg:text-[42px] font-black text-purple-400 mb-1.5 group-hover:scale-105 transition-transform">
                <AnimatedCounter target={4} suffix="+" />
              </div>
              <p className="text-sm sm:text-base font-bold text-white mt-1">Virtual Internships</p>
              <span className="text-xs sm:text-[13px] text-slate-400 font-mono mt-1">AICTE &amp; EduSkills</span>
            </motion.div>

            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="rounded-none p-7 sm:p-8 min-h-[165px] sm:min-h-[180px] text-center border border-white/10 bg-[#070818]/90 backdrop-blur-xl hover:border-pink-400/50 hover:bg-pink-500/[0.06] transition-colors duration-300 flex flex-col justify-center shadow-xl group relative overflow-hidden"
            >
              <div className="text-3xl sm:text-4xl lg:text-[42px] font-black text-pink-400 mb-1.5 group-hover:scale-105 transition-transform">
                <AnimatedCounter target={6} suffix="+" />
              </div>
              <p className="text-sm sm:text-base font-bold text-white mt-1">Core Deployments</p>
              <span className="text-xs sm:text-[13px] text-slate-400 font-mono mt-1">AI &amp; Web Systems</span>
            </motion.div>

            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="rounded-none p-7 sm:p-8 min-h-[165px] sm:min-h-[180px] text-center border border-white/10 bg-[#070818]/90 backdrop-blur-xl hover:border-emerald-400/50 hover:bg-emerald-500/[0.06] transition-colors duration-300 flex flex-col justify-center shadow-xl group relative overflow-hidden"
            >
              <div className="text-3xl sm:text-4xl lg:text-[42px] font-black text-emerald-400 mb-1.5 group-hover:scale-105 transition-transform">
                <AnimatedCounter target={8} suffix="+" />
              </div>
              <p className="text-sm sm:text-base font-bold text-white mt-1">Certifications</p>
              <span className="text-xs sm:text-[13px] text-slate-400 font-mono mt-1">AWS, IBM, Certiport</span>
            </motion.div>
          </motion.div>
        </div>

        {/* ============================================================== */}
        {/* BOTTOM ROW: ACADEMIC ROADMAP & CORE SPECIALIZATION PILLARS      */}
        {/* ============================================================== */}
        <div className="grid lg:grid-cols-12 gap-7 sm:gap-9 items-start">
          {/* Academic Education Timeline Card */}
          {/* Academic Education Timeline Card - Crisp Square */}
          <motion.div
            className="lg:col-span-6 rounded-none p-8 sm:p-10 lg:p-12 pb-10 sm:pb-12 border border-white/10 bg-[#070818]/90 backdrop-blur-xl shadow-2xl hover:border-purple-400/40 transition-all"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-none bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-md shrink-0">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Academic Journey</h3>
                  <p className="text-xs sm:text-sm text-slate-400 font-mono mt-0.5">Formal Education &amp; Scores</p>
                </div>
              </div>
              <span className="text-xs uppercase font-bold tracking-wider px-3.5 py-1.5 rounded-none bg-white/5 border border-white/10 text-slate-300 font-mono">
                Verified
              </span>
            </div>

            {/* Completely non-overlapping timeline using dedicated flex columns */}
            <div className="space-y-6 sm:space-y-7">
              {educationList.map((edu, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 sm:gap-5 group"
                >
                  {/* Dedicated Timeline Track & Glowing Dot Column */}
                  <div className="flex flex-col items-center self-stretch shrink-0 pt-1.5">
                    <span
                      className={`w-3.5 h-3.5 rounded-none border-2 border-[#070818] z-10 shrink-0 transition-transform duration-300 group-hover:scale-125 ${
                        edu.current
                          ? "bg-cyan-400 shadow-[0_0_14px_#00f5ff] ring-2 ring-cyan-500/25"
                          : "bg-slate-500 ring-1 ring-white/10"
                      }`}
                    />
                    {idx !== educationList.length - 1 && (
                      <div className="w-0.5 flex-1 bg-gradient-to-b from-cyan-500/30 via-white/10 to-white/5 my-2 min-h-[50px]" />
                    )}
                  </div>

                  {/* Text Information Container */}
                  <div className="flex-1 min-w-0 pb-4">
                    <div className="flex flex-wrap items-center justify-between gap-2.5">
                      <h4 className="text-base sm:text-lg font-bold text-white leading-snug group-hover:text-cyan-300 transition-colors">
                        {edu.degree}
                      </h4>
                      <span className="text-xs sm:text-sm px-3.5 py-1.5 rounded-none glass text-cyan-300 border border-cyan-500/30 font-semibold font-mono shrink-0 shadow-sm">
                        {edu.score}
                      </span>
                    </div>

                    <p className="text-sm sm:text-base text-slate-300 mt-1.5 font-medium">
                      {edu.institution}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1 font-mono">
                      {edu.university} • {edu.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Core Specialization Pillars & Mission Card */}
          <motion.div
            className="lg:col-span-6 space-y-7 sm:space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            {/* 6 Core Specialization Domains Grid - Crisp Square */}
            <div className="rounded-none p-8 sm:p-10 lg:p-11 border border-white/10 bg-[#070818]/90 backdrop-blur-xl shadow-2xl hover:border-cyan-400/40 transition-all">
              <div className="flex items-center gap-3.5 pb-6 border-b border-white/10 mb-7">
                <div className="w-12 h-12 rounded-none bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-md shrink-0">
                  <Compass size={24} />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Engineering Pillars</h3>
                  <p className="text-xs sm:text-sm text-slate-400 font-mono mt-0.5">Core Competency Specializations</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {coreDomains.map((domain, idx) => {
                  const Icon = domain.icon;
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -3, scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className="p-5 sm:p-5.5 rounded-none bg-white/[0.03] border border-white/5 hover:border-cyan-500/40 hover:bg-cyan-500/[0.06] transition-colors group flex items-start gap-4 min-h-[96px] sm:min-h-[104px]"
                    >
                      <div
                        className="w-10 h-10 rounded-none flex items-center justify-center shrink-0 shadow-sm mt-0.5"
                        style={{
                          backgroundColor: `${domain.color}20`,
                          color: domain.color,
                        }}
                      >
                        <Icon size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                          {domain.name}
                        </h5>
                        <p className="text-xs sm:text-[13px] text-slate-300/90 mt-1.5 leading-relaxed">
                          {domain.detail}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Career Objective Terminal Console - Crisp Square Box */}
            <div className="rounded-none p-7 sm:p-9 pb-10 sm:pb-12 border border-cyan-500/30 relative overflow-hidden shadow-xl bg-[#050612]/95 backdrop-blur-xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5 text-xs sm:text-sm font-mono text-slate-400">
                <div className="flex items-center gap-2.5">
                  <Terminal size={17} className="text-cyan-400" />
                  <span className="font-semibold text-slate-300">career_mission.sh</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-none bg-rose-500/90 shadow-sm" />
                  <span className="w-3 h-3 rounded-none bg-amber-500/90 shadow-sm" />
                  <span className="w-3 h-3 rounded-none bg-emerald-500/90 shadow-sm" />
                </div>
              </div>

              <p className="text-sm sm:text-[15px] md:text-base text-slate-200 leading-relaxed font-mono tracking-tight pb-2">
                <span className="text-cyan-400 font-bold">$ </span>
                Seeking high-impact software &amp; machine learning engineering roles to deploy innovative AI solutions, contribute to organizational breakthroughs, and continuously master advanced computational systems.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
