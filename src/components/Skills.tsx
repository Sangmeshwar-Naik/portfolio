"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useInView, AnimatePresence } from "framer-motion";

const TechText = dynamic(() => import("./TechText"), { ssr: false });
import {
  Code2,
  Brain,
  Globe,
  Database,
  Wrench,
  Sparkles,
  Atom,
  Cpu,
  Layers,
  Network,
  Bot,
  Terminal,
  Server,
  Play,
  Pause,
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Check,
} from "lucide-react";
import {
  SiPython,
  SiC,
  SiCplusplus,
  SiJavascript,
  SiMysql,
  SiTensorflow,
  SiPytorch,
  SiOpencv,
  SiHtml5,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiDocker,
  SiGooglecolab,
  SiJupyter,
  SiGooglecloud,
} from "react-icons/si";
import { FaJava, FaAws, FaDatabase } from "react-icons/fa";

export interface SkillItem {
  name: string;
  level: "Advanced" | "Proficient" | "Core Focus" | "Hands-on";
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  tag?: string;
  category: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  description: string;
  color: string;
  badge: string;
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    title: "Programming",
    icon: Code2,
    color: "#00f5ff",
    badge: "Core Logic",
    description: "Core algorithmic problem-solving, memory management, and enterprise software engineering.",
    skills: [
      { name: "Python", level: "Advanced", icon: SiPython, color: "#3776AB", tag: "AI/ML Core", category: "Programming" },
      { name: "C", level: "Proficient", icon: SiC, color: "#A8B9CC", tag: "Low-level Systems", category: "Programming" },
      { name: "C++", level: "Proficient", icon: SiCplusplus, color: "#00599C", tag: "93% Score Challenge", category: "Programming" },
      { name: "Java", level: "Proficient", icon: FaJava, color: "#EA2D2E", tag: "Full Stack Intern", category: "Programming" },
      { name: "JavaScript", level: "Proficient", icon: SiJavascript, color: "#F7DF1E", tag: "Certiport Certified", category: "Programming" },
      { name: "SQL", level: "Advanced", icon: FaDatabase, color: "#336791", tag: "Database Intern", category: "Programming" },
    ],
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    icon: Brain,
    color: "#bf00ff",
    badge: "Specialization",
    description: "Deep neural networks, medical computer vision pipelines, and quantum machine learning experimentation.",
    skills: [
      { name: "Machine Learning", level: "Core Focus", icon: Brain, color: "#00f5ff", category: "AI & Machine Learning" },
      { name: "Deep Learning", level: "Core Focus", icon: Cpu, color: "#bf00ff", category: "AI & Machine Learning" },
      { name: "Artificial Intelligence", level: "Core Focus", icon: Sparkles, color: "#ff006e", category: "AI & Machine Learning" },
      { name: "Computer Vision", level: "Core Focus", icon: SiOpencv, color: "#5C3EE8", tag: "YOLO / CNN", category: "AI & Machine Learning" },
      { name: "CNN", level: "Core Focus", icon: Layers, color: "#38bdf8", category: "AI & Machine Learning" },
      { name: "U-Net", level: "Core Focus", icon: Network, color: "#ec4899", tag: "Brain Tumor Segmentation", category: "AI & Machine Learning" },
      { name: "Generative AI", level: "Hands-on", icon: Bot, color: "#10b981", tag: "LLMs / Chatbots", category: "AI & Machine Learning" },
      { name: "Quantum ML (QCNN)", level: "Core Focus", icon: Atom, color: "#8b5cf6", tag: "Quantum Research", category: "AI & Machine Learning" },
      { name: "TensorFlow", level: "Proficient", icon: SiTensorflow, color: "#FF6F00", category: "AI & Machine Learning" },
      { name: "PyTorch", level: "Proficient", icon: SiPytorch, color: "#EE4C2C", category: "AI & Machine Learning" },
    ],
  },
  {
    id: "web-dev",
    title: "Web Development",
    icon: Globe,
    color: "#ec4899",
    badge: "Full Stack",
    description: "Modern client-side interfaces, server-side APIs, and real-time distributed communication.",
    skills: [
      { name: "React.js", level: "Proficient", icon: SiReact, color: "#61DAFB", tag: "React Bootcamp", category: "Web Development" },
      { name: "Node.js", level: "Proficient", icon: SiNodedotjs, color: "#339933", category: "Web Development" },
      { name: "Express.js", level: "Proficient", icon: SiExpress, color: "#FFFFFF", category: "Web Development" },
      { name: "REST APIs", level: "Proficient", icon: Server, color: "#00f5ff", category: "Web Development" },
      { name: "HTML5", level: "Advanced", icon: SiHtml5, color: "#E34F26", category: "Web Development" },
      { name: "CSS3", level: "Advanced", icon: Globe, color: "#1572B6", category: "Web Development" },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    icon: Database,
    color: "#10b981",
    badge: "Data Persistence",
    description: "Relational modeling, document storage architectures, and high-throughput query optimization.",
    skills: [
      { name: "MySQL", level: "Proficient", icon: SiMysql, color: "#4479A1", tag: "Relational Schema", category: "Databases" },
      { name: "PostgreSQL", level: "Proficient", icon: SiPostgresql, color: "#4169E1", tag: "CampusConnect App", category: "Databases" },
      { name: "MongoDB", level: "Proficient", icon: SiMongodb, color: "#47A248", tag: "NoSQL Chat Storage", category: "Databases" },
    ],
  },
  {
    id: "tools",
    title: "Tools & Platforms",
    icon: Wrench,
    color: "#f59e0b",
    badge: "Infrastructure",
    description: "Cloud architectures, containerization engines, developer tooling, and analytical notebooks.",
    skills: [
      { name: "Git", level: "Proficient", icon: SiGit, color: "#F05032", category: "Tools & Platforms" },
      { name: "GitHub", level: "Proficient", icon: SiGithub, color: "#ffffff", category: "Tools & Platforms" },
      { name: "Docker", level: "Hands-on", icon: SiDocker, color: "#2496ED", tag: "Containerization", category: "Tools & Platforms" },
      { name: "AWS", level: "Proficient", icon: FaAws, color: "#FF9900", tag: "AWS Academy Grad", category: "Tools & Platforms" },
      { name: "Google Cloud", level: "Proficient", icon: SiGooglecloud, color: "#4285F4", tag: "Google Intern", category: "Tools & Platforms" },
      { name: "VS Code", level: "Advanced", icon: Terminal, color: "#007ACC", category: "Tools & Platforms" },
      { name: "Google Colab", level: "Advanced", icon: SiGooglecolab, color: "#F9AB00", category: "Tools & Platforms" },
      { name: "Jupyter Notebook", level: "Advanced", icon: SiJupyter, color: "#F37626", category: "Tools & Platforms" },
      { name: "Power BI", level: "Hands-on", icon: Globe, color: "#F2C811", tag: "Data Insights", category: "Tools & Platforms" },
      { name: "Antigravity", level: "Proficient", icon: Sparkles, color: "#bf00ff", category: "Tools & Platforms" },
    ],
  },
];

// Complete combined node for "All Categories" as requested
const allCategoriesNode: SkillCategory = {
  id: "all",
  title: "All Categories",
  icon: Sparkles,
  color: "#38bdf8",
  badge: "All 35 Skills",
  description: "Comprehensive spectrum of 35 verified competencies spanning AI/ML research, full-stack systems, databases, and DevOps.",
  skills: skillCategories.flatMap((cat) => cat.skills),
};

// All 6 orbital nodes revolving in circular motion
const orbitalCategories: SkillCategory[] = [
  allCategoriesNode,
  ...skillCategories,
];

export default function Skills() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const handleOpenCategory = (cat: SkillCategory) => {
    setSelectedCategory(cat);
  };

  return (
    <section
      id="skills"
      className="relative w-full py-28 sm:py-36 md:py-40 scroll-mt-24 sm:scroll-mt-28 overflow-hidden flex justify-center"
    >
      {/* Background Glows */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <motion.div
          className="w-full flex flex-col items-center justify-center text-center mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full glass border border-cyan-500/30 text-xs font-semibold text-cyan-700 bg-cyan-50/70 mb-4 shadow-sm mx-auto">
            <Sparkles size={13} className="text-cyan-600" />
            Technologies &amp; Expertise
          </div>
          <h2 className="sr-only">Orbital Tech Radar</h2>
          <div className="w-full max-w-5xl mx-auto h-[65px] sm:h-[85px] md:h-[105px] relative flex items-center justify-center text-center">
            <TechText
              text="Orbital Tech Radar"
              highlightText="Tech Radar"
              fontWeight={900}
              fontSize={75}
              color="#0f172a"
              accentColor="#0891b2"
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
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-center font-medium">
            Click any rotating category node on the orbit below to project and explore its verified technical skills.
          </p>
        </motion.div>

        {/* ============================================================== */}
        {/* CONTINUOUS CIRCULAR ROTATING ORBIT WHEEL                       */}
        {/* ============================================================== */}
        <div className="flex flex-col items-center justify-center mb-16 relative">
          {/* Controls Bar - Crisp Square Button */}
          <div className="flex items-center gap-3 mb-6 z-20">
            <button
              onClick={() => setIsRotating(!isRotating)}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl glass border border-slate-200 bg-white/90 text-xs font-semibold text-slate-700 hover:text-slate-950 hover:border-cyan-400 transition-all cursor-pointer shadow-sm"
              title={isRotating ? "Pause Orbit" : "Resume Orbit"}
            >
              {isRotating ? (
                <>
                  <Pause size={12} className="text-cyan-600" />
                  <span>Pause Circular Orbit</span>
                </>
              ) : (
                <>
                  <Play size={12} className="text-emerald-600" />
                  <span>Resume Circular Orbit</span>
                </>
              )}
            </button>
            <span className="text-[11px] text-slate-500 hidden sm:inline font-mono">
              ★ Click any node to open skills
            </span>
          </div>

          {/* The Circular Orbit Arena */}
          <div className="relative w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] md:w-[520px] md:h-[520px] flex items-center justify-center">
            {/* Outer Decorative Track Rings */}
            <div className="absolute inset-0 rounded-full border border-dashed border-cyan-500/25 pointer-events-none" />
            <div className="absolute inset-8 rounded-full border border-purple-500/20 pointer-events-none" />
            <div className="absolute inset-16 rounded-full border border-slate-200 pointer-events-none" />

            {/* Glowing Central Reactor Hub */}
            <button
              onClick={() => handleOpenCategory(allCategoriesNode)}
              className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 rounded-full glass border border-cyan-400 flex flex-col items-center justify-center text-center p-3 shadow-xl bg-white/95 backdrop-blur-xl hover:scale-105 hover:border-cyan-500 transition-all cursor-pointer group"
              title="Click to view all 35 skills"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping mb-1.5" />
              <Cpu size={24} className="text-cyan-600 group-hover:rotate-90 transition-transform duration-500" />
              <span className="text-[11px] sm:text-xs font-bold text-slate-950 mt-1 leading-tight uppercase font-mono group-hover:text-cyan-700 transition-colors">
                Tech Orbit
              </span>
              <span className="text-[10px] text-slate-500 font-mono mt-0.5">
                35 Skills
              </span>
              <span className="text-[9px] text-cyan-600 font-mono opacity-80 group-hover:opacity-100 font-semibold">
                Explore All
              </span>
            </button>

            {/* Rotating Parent Container (Constantly Rotates in 360° Circular Motion) */}
            <motion.div
              className="absolute inset-0 w-full h-full pointer-events-none transform-gpu will-change-transform"
              animate={isRotating ? { rotate: 360 } : undefined}
              transition={
                isRotating
                  ? {
                      duration: 32,
                      repeat: Infinity,
                      ease: "linear",
                    }
                  : undefined
              }
            >
              {orbitalCategories.map((category, index) => {
                // Calculate position along circular orbit for all 6 nodes (spaced at 60 degrees)
                const totalNodes = orbitalCategories.length;
                const angleInRadians = (index / totalNodes) * (2 * Math.PI) - Math.PI / 2;
                const radiusPercent = 41;
                const x = 50 + radiusPercent * Math.cos(angleInRadians);
                const y = 50 + radiusPercent * Math.sin(angleInRadians);

                const CatIcon = category.icon;

                return (
                  <div
                    key={category.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    {/* Counter-rotating child wrapper keeps text and icon perfectly upright */}
                    <motion.div
                      animate={isRotating ? { rotate: -360 } : undefined}
                      transition={
                        isRotating
                          ? {
                              duration: 32,
                              repeat: Infinity,
                              ease: "linear",
                            }
                          : undefined
                      }
                    >
                      <button
                        onClick={() => handleOpenCategory(category)}
                        className="group relative p-3.5 sm:p-4.5 rounded-2xl glass border border-slate-200/90 hover:border-cyan-400 transition-all duration-300 flex items-center gap-2.5 sm:gap-3 cursor-pointer shadow-lg bg-white/95 hover:scale-108 hover:shadow-xl min-w-[145px] sm:min-w-[170px]"
                      >
                        <div
                          className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform"
                          style={{
                            backgroundColor: `${category.color}20`,
                            color: category.color,
                          }}
                        >
                          <CatIcon size={18} />
                        </div>

                        <div className="text-left pr-1">
                          <span className="text-xs sm:text-[13px] font-bold text-slate-900 font-mono block whitespace-nowrap group-hover:text-cyan-700 transition-colors">
                            {category.title}
                          </span>
                          <span className="text-[10px] sm:text-[11px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                            <span>{category.skills.length} skills</span>
                            <ChevronRight size={11} className="text-cyan-600 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </button>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Prompt Banner below the Orbit */}
          <div className="mt-8 text-center">
            <p className="text-xs sm:text-sm text-slate-500 font-mono flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />
              <span>Click any rotating node to open its verified skills deck</span>
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* COMPACT CATEGORY LAUNCHPAD CARDS (Spacious, Clear & Readable)  */}
        {/* ============================================================== */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5">
          {orbitalCategories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => handleOpenCategory(category)}
                className="group p-6 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-xl hover:border-cyan-400 transition-all text-left flex flex-col justify-between hover:bg-cyan-50/30 hover:-translate-y-1 shadow-md cursor-pointer relative overflow-hidden min-h-[175px]"
              >
                {/* Subtle corner glow */}
                <div
                  className="absolute top-0 right-0 w-20 h-20 blur-xl opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none"
                  style={{ backgroundColor: category.color }}
                />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform"
                      style={{
                        backgroundColor: `${category.color}20`,
                        color: category.color,
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-mono">
                      {category.badge}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-cyan-700 transition-colors leading-snug">
                    {category.title}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono text-[11px]">
                    {category.skills.length} Skills
                  </span>
                  <span className="text-cyan-700 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-0.5 text-xs">
                    <span>Open</span>
                    <ChevronRight size={13} />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* INTERACTIVE SKILLS PROJECTOR MODAL (Reveals Field's Skills)     */}
      {/* ============================================================== */}
      <AnimatePresence>
        {selectedCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCategory(null)}
            />

            {/* Modal Dialog - Spacious Rounded Box */}
            <motion.div
              className="relative z-10 w-full max-w-4xl rounded-3xl p-7 sm:p-9 border border-slate-200 shadow-2xl bg-white/98 backdrop-blur-2xl max-h-[90vh] overflow-y-auto text-slate-900"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCategory(null)}
                className="absolute top-5 right-5 p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-950 hover:bg-slate-200 transition-colors cursor-pointer"
                aria-label="Close skills dialog"
              >
                <X size={20} />
              </button>

              {/* Modal Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-6">
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md"
                    style={{
                      backgroundColor: `${selectedCategory.color}25`,
                      color: selectedCategory.color,
                    }}
                  >
                    <selectedCategory.icon size={28} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-2xl font-black text-slate-950 tracking-tight">
                        {selectedCategory.title}
                      </h3>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 border border-cyan-300 font-mono">
                        {selectedCategory.skills.length} Technologies
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1.5 max-w-xl">
                      {selectedCategory.description}
                    </p>
                  </div>
                </div>

                {/* Quick Field Switcher */}
                <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
                  {orbitalCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-mono font-semibold transition-all cursor-pointer ${
                        selectedCategory.id === cat.id
                          ? "bg-cyan-100 text-cyan-800 border border-cyan-400 font-bold"
                          : "text-slate-600 hover:text-slate-950 border border-slate-200 bg-slate-50"
                      }`}
                    >
                      {cat.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Floating Skills Grid for Chosen Field */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {selectedCategory.skills.map((skill, index) => {
                  const SkillIcon = skill.icon;
                  const isHovered = hoveredSkill === skill.name;

                  // Organic floating animation
                  const floatDuration = 3 + (index % 3) * 0.6;
                  const floatDelay = (index * 0.15) % 1.2;

                  return (
                    <motion.div
                      key={skill.name}
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        duration: floatDuration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: floatDelay,
                      }}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                        isHovered
                          ? "border-cyan-400 bg-cyan-50/60 shadow-md scale-102"
                          : "border-slate-200 bg-slate-50/80 hover:border-slate-300"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3.5">
                          <div
                            className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm"
                            style={{ color: skill.color }}
                          >
                            <SkillIcon size={20} />
                          </div>

                          <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 uppercase">
                            {skill.level}
                          </span>
                        </div>

                        <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                          {skill.name}
                        </h4>
                      </div>

                      <div className="mt-3.5 pt-2.5 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                        <span className="text-cyan-700 truncate font-semibold">
                          {skill.tag || selectedCategory.title}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom Footer Action */}
              <div className="mt-7 pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">
                  Verified proficiency supported by academic coursework and project code.
                </span>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-950 glass border border-slate-200 hover:border-cyan-400 transition-all cursor-pointer"
                >
                  Back to Orbit Wheel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
