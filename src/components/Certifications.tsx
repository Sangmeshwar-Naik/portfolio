"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  ShieldCheck,
  ExternalLink,
  Sparkles,
  Trophy,
  CheckCircle2,
  Calendar,
  Layers,
  Cloud,
  FileCheck,
  Server,
  X,
  Check,
  Building,
  Target,
} from "lucide-react";
import { FaAws } from "react-icons/fa";

export interface AccreditationItem {
  id: string;
  type: "Certification" | "Achievement" | "Exam Distinction" | "Hackathon";
  title: string;
  issuer: string;
  period: string;
  badge: string;
  score?: string;
  scorePercent?: number;
  credentialUrl?: string;
  description: string;
  skills: string[];
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  category: "Cloud & DevOps" | "Data & AI" | "Software Engineering" | "Honors & Competitions";
}

const accreditationTimeline: AccreditationItem[] = [
  {
    id: "aws-data-engineering",
    type: "Certification",
    title: "AWS Academy Graduate – Data Engineering",
    issuer: "Amazon Web Services (AWS Academy)",
    period: "Issued Feb 2026",
    badge: "Credly Digital Badge",
    credentialUrl: "https://www.credly.com",
    description:
      "Enterprise cloud data engineering curriculum covering scalable ETL pipelines, automated data lakes, Amazon Redshift warehousing, AWS Glue cataloging, and EMR big data processing.",
    skills: ["AWS Glue", "Redshift", "EMR", "Data Lakes", "ETL Pipelines", "Athena"],
    icon: FaAws,
    color: "#FF9900",
    category: "Cloud & DevOps",
  },
  {
    id: "cxx-mastery",
    type: "Achievement",
    title: "National-Level C++ Mastery Challenge",
    issuer: "National Coding Challenge",
    period: "2024",
    badge: "Top Percentile Rank",
    score: "Score: 93%",
    scorePercent: 93,
    description:
      "Achieved a verified 93% score in competitive algorithmic programming, demonstrating superior competency in memory allocation, pointer manipulation, and complex data structures.",
    skills: ["C++", "Data Structures", "Algorithmic Complexity", "Competitive Programming"],
    icon: Trophy,
    color: "#f59e0b",
    category: "Honors & Competitions",
  },
  {
    id: "certiport-data-analytics",
    type: "Exam Distinction",
    title: "IT Specialist – Data Analytics",
    issuer: "Certiport (Pearson VUE)",
    period: "2025",
    badge: "Pearson High Distinction",
    score: "Score: 929 / 1000",
    scorePercent: 93,
    description:
      "Globally accredited proctored exam evaluating quantitative statistical modeling, data cleaning, trend forecasting, multi-variable correlation, and business intelligence visualization.",
    skills: ["Data Modeling", "Statistical Testing", "Data Wrangling", "Analytical Reporting"],
    icon: FileCheck,
    color: "#10b981",
    category: "Data & AI",
  },
  {
    id: "isro-geodata",
    type: "Certification",
    title: "AI/ML for Geodata Analytics",
    issuer: "ISRO - Indian Institute of Remote Sensing (IIRS), Dehradun",
    period: "2026",
    badge: "National Space Research",
    description:
      "Specialized training program conducted by ISRO's IIRS on satellite telemetry processing, spatial feature extraction, remote sensing analysis, and earth observation prediction models.",
    skills: ["Geospatial AI", "Remote Sensing", "Satellite Preprocessing", "GIS Analytics"],
    icon: Cloud,
    color: "#38bdf8",
    category: "Data & AI",
  },
  {
    id: "certiport-javascript",
    type: "Exam Distinction",
    title: "IT Specialist – JavaScript",
    issuer: "Certiport (Pearson VUE)",
    period: "2025",
    badge: "Certified Specialist",
    score: "Score: 860 / 1000",
    scorePercent: 86,
    description:
      "Certified proctored examination validating in-depth JavaScript engine comprehension, event-loop asynchronous execution, closure mechanics, and modern client-side architectures.",
    skills: ["JavaScript (ES6+)", "DOM Manipulation", "Asynchronous Events", "JSON APIs"],
    icon: FileCheck,
    color: "#F7DF1E",
    category: "Software Engineering",
  },
  {
    id: "srinathon",
    type: "Hackathon",
    title: "Srinathon 2.0 Hackathon",
    issuer: "Srinivas Institute of Technology",
    period: "2025",
    badge: "Hackathon Finalist",
    description:
      "Collaborated in a high-intensity 24-hour agile sprint to engineer, prototype, and defend an innovative technical software solution before an expert industry evaluation jury.",
    skills: ["Rapid Prototyping", "Team Engineering", "Pitching", "Agile Sprints"],
    icon: Sparkles,
    color: "#a855f7",
    category: "Honors & Competitions",
  },
  {
    id: "aws-cloud-computing",
    type: "Certification",
    title: "Cloud Computing Foundations",
    issuer: "AWS Academy",
    period: "2026",
    badge: "Official Certificate",
    description:
      "Mastery of core cloud infrastructure principles including compute virtualization (EC2), scalable storage (S3), isolated virtual networking (VPC), and enterprise IAM security.",
    skills: ["Amazon EC2", "Amazon S3", "VPC Networking", "IAM Security", "Cloud Architectures"],
    icon: FaAws,
    color: "#FF9900",
    category: "Cloud & DevOps",
  },
  {
    id: "hp-data-science",
    type: "Certification",
    title: "Data Science & Analytics",
    issuer: "HP Life Global Foundation",
    period: "2025",
    badge: "Verified Certificate",
    description:
      "Hands-on foundational program on dataset exploration, business intelligence pipelines, predictive analytics, and executive decision science modeling.",
    skills: ["Data Exploration", "Business Intelligence", "Predictive Analytics", "Decision Modeling"],
    icon: Layers,
    color: "#0096D6",
    category: "Data & AI",
  },
  {
    id: "ibm-devops",
    type: "Certification",
    title: "DevOps Fundamentals",
    issuer: "IBM Developer Skills Network",
    period: "2026",
    badge: "IBM Enterprise",
    description:
      "Continuous integration and continuous deployment pipelines, automated test harnesses, container orchestration, and agile DevOps operational workflows.",
    skills: ["CI/CD Pipelines", "Containerization", "Automated Testing", "Infrastructure as Code"],
    icon: Server,
    color: "#054ADA",
    category: "Cloud & DevOps",
  },
  {
    id: "eduskills-fullstack",
    type: "Certification",
    title: "Java Full Stack Development",
    issuer: "EduSkills (AICTE Approved)",
    period: "2026",
    badge: "AICTE Accredited",
    description:
      "Government and AICTE-recognized curriculum encompassing enterprise backend Java development, Spring architectures, RESTful API persistence, and modern web integration.",
    skills: ["Java SE/EE", "Spring Boot", "RESTful Web Services", "Database Persistence"],
    icon: ShieldCheck,
    color: "#c084fc",
    category: "Software Engineering",
  },
  {
    id: "react-bootcamp",
    type: "Achievement",
    title: "React Bootcamp Certification",
    issuer: "Let's Upgrade",
    period: "2025",
    badge: "Bootcamp Graduate",
    description:
      "Intensive frontend bootcamp mastering modern component trees, custom React Hooks, application state management, and optimized virtual DOM rendering.",
    skills: ["React.js", "Component Architecture", "Hooks", "Frontend Performance"],
    icon: CheckCircle2,
    color: "#10b981",
    category: "Honors & Competitions",
  },
];

type CategoryFilter = "All" | "Cloud & DevOps" | "Data & AI" | "Software Engineering" | "Honors & Competitions";

export default function Certifications() {
  const containerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("All");
  const [selectedItem, setSelectedItem] = useState<AccreditationItem | null>(null);

  const filteredItems =
    activeFilter === "All"
      ? accreditationTimeline
      : accreditationTimeline.filter((item) => item.category === activeFilter);

  return (
    <section id="certifications" className="relative w-full py-28 sm:py-36 md:py-40 scroll-mt-24 sm:scroll-mt-28 overflow-hidden flex justify-center">
      {/* Background Lighting & Distinct Atmosphere */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        {/* Subtle holographic grid backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />
      </div>

      <div ref={containerRef} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-4 shadow-lg shadow-cyan-500/10">
            <Award size={13} className="text-cyan-400" />
            Accreditations &amp; Honors
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Certifications &amp; <span className="text-gradient">Achievements</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Cryptographically verified credentials, proctored distinctions, and national technical awards.
          </p>
        </motion.div>

        {/* Top Metric Overview Badges */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mb-14"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass rounded-2xl p-4 border border-white/10 text-center hover:border-cyan-500/40 transition-all hover:-translate-y-1 shadow-lg shadow-cyan-500/5 group">
            <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:scale-105 transition-transform inline-block">
              8+
            </div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-1">
              Industry Certifications
            </div>
          </div>
          <div className="glass rounded-2xl p-4 border border-white/10 text-center hover:border-purple-500/40 transition-all hover:-translate-y-1 shadow-lg shadow-purple-500/5 group">
            <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 group-hover:scale-105 transition-transform inline-block">
              929 &amp; 860
            </div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-1">
              Certiport Exam Scores
            </div>
          </div>
          <div className="glass rounded-2xl p-4 border border-white/10 text-center hover:border-amber-500/40 transition-all hover:-translate-y-1 shadow-lg shadow-amber-500/5 group">
            <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 group-hover:scale-105 transition-transform inline-block">
              93%
            </div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-1">
              National C++ Challenge
            </div>
          </div>
          <div className="glass rounded-2xl p-4 border border-white/10 text-center hover:border-emerald-500/40 transition-all hover:-translate-y-1 shadow-lg shadow-emerald-500/5 group">
            <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500 group-hover:scale-105 transition-transform inline-block">
              100%
            </div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-1">
              Credly &amp; AICTE Verified
            </div>
          </div>
        </motion.div>

        {/* Interactive Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-16">
          {(
            [
              "All",
              "Cloud & DevOps",
              "Data & AI",
              "Software Engineering",
              "Honors & Competitions",
            ] as CategoryFilter[]
          ).map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/25 scale-105"
                    : "glass border border-white/10 text-slate-300 hover:text-white hover:border-white/20"
                }`}
              >
                {isActive && <Check size={14} className="stroke-[3]" />}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* NEW HOLOGRAPHIC CREDENTIAL CONDUIT (Middle Line Intact)        */}
        {/* ============================================================== */}
        <div className="relative">
          {/* Central Middle Spine Line (Desktop) - Anchored firmly in middle */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 rounded-full opacity-40">
            {/* Animated Travelling Laser Energy Pulse */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-1.5 h-28 bg-gradient-to-b from-transparent via-cyan-300 to-transparent blur-[1px] rounded-full"
              animate={{ y: ["0%", "1000%"] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Left Spine Line (Mobile) */}
          <div className="md:hidden absolute left-5 top-4 bottom-4 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 rounded-full opacity-40" />

          <div className="space-y-16">
            {filteredItems.map((item, index) => {
              const isEven = index % 2 === 0;
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="relative flex flex-col md:flex-row items-center justify-between"
                  style={{ perspective: 1200 }}
                >
                  {/* Left Slot (Desktop) */}
                  <div className="hidden md:flex w-5/12 items-center justify-end pr-10 relative">
                    {/* Horizontal Laser Connector Beam (from Center Line to Left Card) */}
                    {isEven && (
                      <motion.div
                        className="absolute right-0 top-1/2 -translate-y-1/2 h-[2px] w-10 bg-gradient-to-l from-cyan-400 via-purple-400 to-transparent pointer-events-none z-0"
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        style={{ transformOrigin: "right" }}
                      />
                    )}

                    {isEven ? (
                      /* Main 3D Holographic Credential Dossier (Left Side) */
                      <motion.div
                        className="w-full glass rounded-3xl p-7 border border-white/10 hover:border-cyan-400/50 transition-all text-left group shadow-2xl relative overflow-hidden bg-[#070714]/90 backdrop-blur-xl hover:shadow-cyan-500/20"
                        initial={{ opacity: 0, scale: 0.88, rotateX: 16, y: 35 }}
                        whileInView={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{
                          type: "spring",
                          stiffness: 85,
                          damping: 18,
                          mass: 0.8,
                        }}
                      >
                        {/* Shimmering Brand Light Orb */}
                        <div
                          className="absolute -top-10 -right-10 w-36 h-36 rounded-full blur-3xl opacity-15 group-hover:opacity-35 transition-opacity pointer-events-none"
                          style={{ backgroundColor: item.color }}
                        />

                        {/* Top Protocol Bar */}
                        <div className="flex items-center justify-between gap-3 mb-3.5">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                            <span className="text-[10px] uppercase font-mono tracking-wider font-bold px-2.5 py-0.5 rounded-md bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                              {item.type}
                            </span>
                          </div>
                          <span className="text-[11px] font-bold text-amber-300 font-mono flex items-center gap-1">
                            <span>★</span>
                            <span>{item.badge}</span>
                          </span>
                        </div>

                        {/* Title & Issuer */}
                        <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                          {item.title}
                        </h3>

                        <p className="text-xs font-semibold text-purple-400 mt-1 flex items-center gap-1.5">
                          <Building size={12} className="text-purple-400/80" />
                          <span>{item.issuer}</span>
                        </p>

                        <div className="flex items-center gap-1.5 text-xs text-slate-400 my-3 font-mono">
                          <Calendar size={13} className="text-cyan-400" />
                          <span>{item.period}</span>
                        </div>

                        {/* Performance Cyber Gauge for Scored Credentials */}
                        {item.scorePercent && (
                          <div className="mb-4 p-3 rounded-2xl bg-black/40 border border-white/5 relative overflow-hidden">
                            <div className="flex items-center justify-between text-[11px] mb-1.5 font-mono">
                              <span className="text-slate-400 flex items-center gap-1">
                                <Target size={12} className="text-emerald-400" />
                                <span>Exam Score Matrix</span>
                              </span>
                              <span className="font-bold text-emerald-300">{item.score}</span>
                            </div>
                            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-white/10">
                              <motion.div
                                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${item.scorePercent}%` }}
                                viewport={{ once: false }}
                                transition={{ duration: 1, ease: "easeOut" }}
                              />
                            </div>
                          </div>
                        )}

                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                          {item.description}
                        </p>

                        {/* Verified Competencies */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {item.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-white/[0.04] border border-white/10 text-slate-300 group-hover:border-cyan-500/20"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* Footer Quick Action */}
                        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                          <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                            <ShieldCheck size={12} className="text-emerald-400" />
                            <span>AUTHENTICATED</span>
                          </span>
                          <button
                            onClick={() => setSelectedItem(item)}
                            className="inline-flex items-center gap-1.5 font-semibold text-cyan-400 hover:text-cyan-300 cursor-pointer group-hover:translate-x-0.5 transition-transform"
                          >
                            <span>Inspect Dossier</span>
                            <ExternalLink size={12} />
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      /* Telemetry Spec HUD on the Left (When Main Card is on the Right) */
                      <motion.div
                        className="w-full text-right flex flex-col items-end gap-3 pr-2"
                        initial={{ opacity: 0, scale: 0.9, y: 25 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl glass border border-purple-500/30 text-purple-300 text-xs font-bold shadow-lg shadow-purple-500/10 font-mono">
                          <Calendar size={13} className="text-purple-400" />
                          <span>{item.period}</span>
                        </div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-slate-300 text-xs font-semibold">
                          <Building size={13} className="text-cyan-400" />
                          <span>{item.issuer}</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[11px] font-bold font-mono">
                          <Award size={13} />
                          <span>{item.badge}</span>
                        </div>
                        {item.score && (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold font-mono">
                            <Target size={13} />
                            <span>{item.score}</span>
                          </div>
                        )}
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="mt-1 inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 font-mono cursor-pointer"
                        >
                          <span>[Open Credential Matrix]</span>
                        </button>
                      </motion.div>
                    )}
                  </div>

                  {/* ========================================================== */}
                  {/* CENTRAL BEACON NODE (Locked on the Middle Spine)           */}
                  {/* ========================================================== */}
                  <motion.div
                    className="absolute left-5 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl glass border border-white/25 bg-[#090918] flex items-center justify-center shadow-2xl z-20 group cursor-pointer"
                    initial={{ scale: 0, rotate: -45 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ type: "spring", stiffness: 120, damping: 14 }}
                    onClick={() => setSelectedItem(item)}
                    title={`Click to inspect ${item.title}`}
                  >
                    {/* Pulsing Orbital Radar Ring */}
                    <div
                      className="absolute inset-0 rounded-2xl border border-dashed opacity-40 animate-spin"
                      style={{
                        borderColor: item.color,
                        animationDuration: "14s",
                      }}
                    />
                    <span
                      className="relative z-10 transition-transform group-hover:scale-125"
                      style={{ color: item.color }}
                    >
                      <Icon size={20} />
                    </span>
                  </motion.div>

                  {/* Right Slot (Desktop) */}
                  <div className="hidden md:flex w-5/12 items-center justify-start pl-10 relative">
                    {/* Horizontal Laser Connector Beam (from Center Line to Right Card) */}
                    {!isEven && (
                      <motion.div
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] w-10 bg-gradient-to-r from-purple-400 via-pink-400 to-transparent pointer-events-none z-0"
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        style={{ transformOrigin: "left" }}
                      />
                    )}

                    {!isEven ? (
                      /* Main 3D Holographic Credential Dossier (Right Side) */
                      <motion.div
                        className="w-full glass rounded-3xl p-7 border border-white/10 hover:border-purple-400/50 transition-all text-left group shadow-2xl relative overflow-hidden bg-[#070714]/90 backdrop-blur-xl hover:shadow-purple-500/20"
                        initial={{ opacity: 0, scale: 0.88, rotateX: 16, y: 35 }}
                        whileInView={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{
                          type: "spring",
                          stiffness: 85,
                          damping: 18,
                          mass: 0.8,
                        }}
                      >
                        {/* Shimmering Brand Light Orb */}
                        <div
                          className="absolute -top-10 -right-10 w-36 h-36 rounded-full blur-3xl opacity-15 group-hover:opacity-35 transition-opacity pointer-events-none"
                          style={{ backgroundColor: item.color }}
                        />

                        {/* Top Protocol Bar */}
                        <div className="flex items-center justify-between gap-3 mb-3.5">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                            <span className="text-[10px] uppercase font-mono tracking-wider font-bold px-2.5 py-0.5 rounded-md bg-purple-500/15 text-purple-300 border border-purple-500/30">
                              {item.type}
                            </span>
                          </div>
                          <span className="text-[11px] font-bold text-amber-300 font-mono flex items-center gap-1">
                            <span>★</span>
                            <span>{item.badge}</span>
                          </span>
                        </div>

                        {/* Title & Issuer */}
                        <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                          {item.title}
                        </h3>

                        <p className="text-xs font-semibold text-cyan-400 mt-1 flex items-center gap-1.5">
                          <Building size={12} className="text-cyan-400/80" />
                          <span>{item.issuer}</span>
                        </p>

                        <div className="flex items-center gap-1.5 text-xs text-slate-400 my-3 font-mono">
                          <Calendar size={13} className="text-cyan-400" />
                          <span>{item.period}</span>
                        </div>

                        {/* Performance Cyber Gauge for Scored Credentials */}
                        {item.scorePercent && (
                          <div className="mb-4 p-3 rounded-2xl bg-black/40 border border-white/5 relative overflow-hidden">
                            <div className="flex items-center justify-between text-[11px] mb-1.5 font-mono">
                              <span className="text-slate-400 flex items-center gap-1">
                                <Target size={12} className="text-emerald-400" />
                                <span>Exam Score Matrix</span>
                              </span>
                              <span className="font-bold text-emerald-300">{item.score}</span>
                            </div>
                            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-white/10">
                              <motion.div
                                className="h-full bg-gradient-to-r from-purple-500 via-pink-400 to-cyan-400 rounded-full"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${item.scorePercent}%` }}
                                viewport={{ once: false }}
                                transition={{ duration: 1, ease: "easeOut" }}
                              />
                            </div>
                          </div>
                        )}

                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                          {item.description}
                        </p>

                        {/* Verified Competencies */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {item.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-white/[0.04] border border-white/10 text-slate-300 group-hover:border-purple-500/20"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* Footer Quick Action */}
                        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                          <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                            <ShieldCheck size={12} className="text-emerald-400" />
                            <span>AUTHENTICATED</span>
                          </span>
                          <button
                            onClick={() => setSelectedItem(item)}
                            className="inline-flex items-center gap-1.5 font-semibold text-purple-400 hover:text-purple-300 cursor-pointer group-hover:translate-x-0.5 transition-transform"
                          >
                            <span>Inspect Dossier</span>
                            <ExternalLink size={12} />
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      /* Telemetry Spec HUD on the Right (When Main Card is on the Left) */
                      <motion.div
                        className="w-full text-left flex flex-col items-start gap-3 pl-2"
                        initial={{ opacity: 0, scale: 0.9, y: 25 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl glass border border-cyan-500/30 text-cyan-300 text-xs font-bold shadow-lg shadow-cyan-500/10 font-mono">
                          <Calendar size={13} className="text-cyan-400" />
                          <span>{item.period}</span>
                        </div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-slate-300 text-xs font-semibold">
                          <Building size={13} className="text-purple-400" />
                          <span>{item.issuer}</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[11px] font-bold font-mono">
                          <Award size={13} />
                          <span>{item.badge}</span>
                        </div>
                        {item.score && (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold font-mono">
                            <Target size={13} />
                            <span>{item.score}</span>
                          </div>
                        )}
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="mt-1 inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 font-mono cursor-pointer"
                        >
                          <span>[Open Credential Matrix]</span>
                        </button>
                      </motion.div>
                    )}
                  </div>

                  {/* ========================================================== */}
                  {/* Mobile Content (Always right of the line)                  */}
                  {/* ========================================================== */}
                  <motion.div
                    className="md:hidden ml-14 w-[calc(100%-3.5rem)]"
                    initial={{ opacity: 0, scale: 0.9, y: 25 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="glass rounded-3xl p-6 border border-white/10 text-left bg-[#070714]/90 backdrop-blur-xl">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 font-semibold border border-cyan-500/30">
                          {item.type}
                        </span>
                        <span className="text-[11px] font-bold text-amber-300 font-mono">
                          ★ {item.badge}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white mt-1">
                        {item.title}
                      </h3>

                      <p className="text-xs font-semibold text-purple-400 mt-0.5">
                        {item.issuer}
                      </p>

                      <div className="flex items-center gap-1.5 text-xs text-slate-400 my-2 font-mono">
                        <Calendar size={12} className="text-cyan-400" />
                        <span>{item.period}</span>
                      </div>

                      {item.score && (
                        <div className="text-xs font-bold text-emerald-400 mb-2 font-mono">
                          {item.score}
                        </div>
                      )}

                      <p className="text-xs text-slate-300 leading-relaxed mb-3">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/[0.04] border border-white/10 text-slate-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-white/10 flex justify-end">
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                        >
                          <span>View Details</span>
                          <ExternalLink size={12} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Accreditation Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
            />

            {/* Modal Dialog */}
            <motion.div
              className="relative z-10 w-full max-w-xl glass rounded-3xl p-6 sm:p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-left"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3.5 mb-4">
                <div
                  className="w-12 h-12 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-center shadow-lg"
                  style={{ color: selectedItem.color }}
                >
                  <selectedItem.icon size={26} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                    {selectedItem.badge}
                  </span>
                  <div className="text-xs text-purple-400 font-semibold mt-1">
                    {selectedItem.issuer}
                  </div>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {selectedItem.title}
              </h3>

              <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                <Calendar size={13} className="text-cyan-400" />
                <span>{selectedItem.period}</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-300">{selectedItem.category}</span>
              </div>

              {selectedItem.score && (
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-emerald-500/30 mb-5">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-300 font-semibold">Performance Metric</span>
                    <span className="text-emerald-400 font-bold">{selectedItem.score}</span>
                  </div>
                  {selectedItem.scorePercent && (
                    <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                        style={{ width: `${selectedItem.scorePercent}%` }}
                      />
                    </div>
                  )}
                </div>
              )}

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                {selectedItem.description}
              </p>

              <div className="mb-6">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                  Verified Technical Competencies
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-white/[0.04] border border-white/10 text-cyan-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                {selectedItem.credentialUrl ? (
                  <a
                    href={selectedItem.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all cursor-pointer"
                  >
                    <span>Verify Credly Badge</span>
                    <ExternalLink size={14} />
                  </a>
                ) : (
                  <div className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                    <ShieldCheck size={14} className="text-emerald-400" />
                    <span>Verified Academic &amp; Industry Credential</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}