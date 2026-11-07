"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
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
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-4 shadow-lg shadow-cyan-500/10">
            <Sparkles size={13} className="text-cyan-400" />
            Biography &amp; Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Turning Ideas Into{" "}
            <span className="text-gradient">Intelligent Solutions</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Specializing in Artificial Intelligence, Machine Learning, and engineered full-stack architectures.
          </p>
        </motion.div>

        {/* ============================================================== */}
        {/* TOP ROW: EXECUTIVE BIOGRAPHY & LIVE METRIC CARDS                */}
        {/* ============================================================== */}
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-stretch mb-8 sm:mb-10">
          {/* Executive Overview Card */}
          <motion.div
            className="lg:col-span-7 glass rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between relative overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Header Badge Strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-amber-500/40 shadow-sm bg-[#0a0a14]">
                    <Image
                      src="/logo.jpg"
                      alt="SAN Logo"
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Sangmeshwar Anil Naik</h3>
                    <p className="text-[11px] text-cyan-400 font-mono">B.E. AIML Specialist</p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Available for Roles &amp; Internships</span>
                </div>
              </div>

              {/* Core Executive Text */}
              <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug mb-4">
                Bridging Theoretical Machine Learning with Scalable Real-World Engineering.
              </h4>

              <div className="space-y-3.5 text-slate-300 text-sm sm:text-base leading-relaxed">
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
            <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 text-slate-300">
                <MapPin size={14} className="text-cyan-400" />
                <span>Bidar &amp; Mangalore, Karnataka</span>
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <GraduationCap size={14} className="text-purple-400" />
                <span>VTU Class of 2027</span>
              </span>
            </div>
          </motion.div>

          {/* 4 Verified Metric Capsules */}
          <motion.div
            className="lg:col-span-5 grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="glass rounded-3xl p-5 sm:p-6 text-center border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/[0.04] transition-all flex flex-col justify-center shadow-xl">
              <div className="text-3xl sm:text-4xl font-black text-cyan-400 mb-1">
                <AnimatedCounter target={8.4} decimals={1} />
              </div>
              <p className="text-xs sm:text-sm font-bold text-white mt-1">B.E. AIML CGPA</p>
              <span className="text-[10px] text-slate-400 font-mono mt-0.5">Scale: 10.0 (VTU)</span>
            </div>

            <div className="glass rounded-3xl p-5 sm:p-6 text-center border border-white/10 hover:border-purple-400/50 hover:bg-purple-500/[0.04] transition-all flex flex-col justify-center shadow-xl">
              <div className="text-3xl sm:text-4xl font-black text-purple-400 mb-1">
                <AnimatedCounter target={4} suffix="+" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-white mt-1">Virtual Internships</p>
              <span className="text-[10px] text-slate-400 font-mono mt-0.5">AICTE &amp; EduSkills</span>
            </div>

            <div className="glass rounded-3xl p-5 sm:p-6 text-center border border-white/10 hover:border-pink-400/50 hover:bg-pink-500/[0.04] transition-all flex flex-col justify-center shadow-xl">
              <div className="text-3xl sm:text-4xl font-black text-pink-400 mb-1">
                <AnimatedCounter target={6} suffix="+" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-white mt-1">Core Deployments</p>
              <span className="text-[10px] text-slate-400 font-mono mt-0.5">AI &amp; Web Systems</span>
            </div>

            <div className="glass rounded-3xl p-5 sm:p-6 text-center border border-white/10 hover:border-emerald-400/50 hover:bg-emerald-500/[0.04] transition-all flex flex-col justify-center shadow-xl">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 mb-1">
                <AnimatedCounter target={8} suffix="+" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-white mt-1">Certifications</p>
              <span className="text-[10px] text-slate-400 font-mono mt-0.5">AWS, IBM, Certiport</span>
            </div>
          </motion.div>
        </div>

        {/* ============================================================== */}
        {/* BOTTOM ROW: ACADEMIC ROADMAP & CORE SPECIALIZATION PILLARS      */}
        {/* ============================================================== */}
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Academic Education Timeline Card */}
          <motion.div
            className="lg:col-span-6 glass rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-md">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Academic Journey</h3>
                  <p className="text-xs text-slate-400 font-mono">Formal Education &amp; Scores</p>
                </div>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 font-mono">
                Verified
              </span>
            </div>

            <div className="space-y-6">
              {educationList.map((edu, idx) => (
                <div
                  key={idx}
                  className="relative pl-6 border-l-2 border-white/10 last:border-0 pb-1"
                >
                  {/* Glowing Node Dot */}
                  <span
                    className={`absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#050508] ${
                      edu.current
                        ? "bg-cyan-400 shadow-[0_0_12px_#00f5ff]"
                        : "bg-slate-500"
                    }`}
                  />

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                      {edu.degree}
                    </h4>
                    <span className="text-xs px-2.5 py-0.5 rounded-full glass text-cyan-300 border border-cyan-500/30 font-semibold font-mono">
                      {edu.score}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
                    {edu.institution}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                    {edu.university} • {edu.duration}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Core Specialization Pillars & Mission Card */}
          <motion.div
            className="lg:col-span-6 space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            {/* 6 Core Specialization Domains Grid */}
            <div className="glass rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl">
              <div className="flex items-center gap-2.5 pb-4 border-b border-white/10 mb-6">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-md">
                  <Compass size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Engineering Pillars</h3>
                  <p className="text-xs text-slate-400 font-mono">Core Competency Specializations</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {coreDomains.map((domain, idx) => {
                  const Icon = domain.icon;
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/40 hover:bg-cyan-500/[0.04] transition-all group flex items-start gap-3"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm mt-0.5"
                        style={{
                          backgroundColor: `${domain.color}20`,
                          color: domain.color,
                        }}
                      >
                        <Icon size={16} />
                      </div>
                      <div>
                        <h5 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {domain.name}
                        </h5>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-snug line-clamp-1">
                          {domain.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Career Objective Terminal Console */}
            <div className="glass rounded-3xl p-6 border border-white/10 relative overflow-hidden shadow-xl bg-[#070814]/90">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-cyan-400" />
                  <span>career_mission.sh</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono">
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
