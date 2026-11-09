"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const TechText = dynamic(() => import("./TechText"), { ssr: false });
import {
  Briefcase,
  GraduationCap,
  Code2,
  Trophy,
  Bot,
  Calendar,
  Sparkles,
  Building,
  Award,
} from "lucide-react";

interface TimelineItem {
  type: "Internship" | "Education" | "Hackathon" | "Bootcamp" | "Competition";
  title: string;
  organization: string;
  period: string;
  description: string;
  skills: string[];
  highlight?: string;
  gradient: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const journeyTimeline: TimelineItem[] = [
  {
    type: "Internship",
    title: "SQL & Database Management Systems Virtual Internship",
    organization: "EduSkills (AICTE)",
    period: "August 2026 – October 2026",
    description:
      "Completed an intensive 8-week virtual internship in SQL and enterprise database management systems, executing a comprehensive hands-on database design project.",
    skills: ["SQL", "Relational Database Design", "Query Optimization", "Schema Modeling"],
    highlight: "8-Week AICTE Internship",
    gradient: "from-cyan-500 to-blue-600",
    icon: Briefcase,
  },
  {
    type: "Internship",
    title: "Java Full Stack Developer Virtual Internship",
    organization: "EduSkills (AICTE)",
    period: "July 2025 – September 2025",
    description:
      "Completed a rigorous 10-week virtual internship in Java full stack development covering responsive front-end interfaces, server architectures, and RESTful database persistence.",
    skills: ["Java", "Full Stack", "Front-end Development", "Back-end Architecture", "APIs"],
    highlight: "10-Week Full Stack Program",
    gradient: "from-purple-500 to-pink-600",
    icon: Briefcase,
  },
  {
    type: "Hackathon",
    title: "Srinathon 2.0 Hackathon",
    organization: "Srinivas Institute of Technology",
    period: "2025",
    description:
      "Competed in Srinathon 2.0 Hackathon, collaborating in an agile team under tight sprint deadlines to ideate, prototype, and pitch innovative technical solutions.",
    skills: ["Rapid Prototyping", "Teamwork", "Problem Solving", "AI Pitching"],
    highlight: "Hackathon Participant",
    gradient: "from-amber-500 to-orange-600",
    icon: Trophy,
  },
  {
    type: "Bootcamp",
    title: "React Bootcamp",
    organization: "Let's Upgrade",
    period: "2025",
    description:
      "Successfully completed comprehensive React Bootcamp, mastering modern component lifecycle, React Hooks, virtual DOM performance, and responsive UI integration.",
    skills: ["React.js", "JavaScript (ES6+)", "Component Architecture", "Hooks"],
    highlight: "Bootcamp Graduate",
    gradient: "from-cyan-400 to-teal-500",
    icon: Code2,
  },
  {
    type: "Internship",
    title: "AI-ML Virtual Internship",
    organization: "Google for Developers",
    period: "July 2024 – September 2024",
    description:
      "Engineered machine learning classification and prediction pipelines using Python, Pandas, NumPy, and Scikit-learn, optimizing processing speed and model accuracy metrics.",
    skills: ["Machine Learning", "Python", "Scikit-learn", "NumPy", "Pandas"],
    highlight: "Google for Developers Program",
    gradient: "from-blue-500 to-indigo-600",
    icon: Bot,
  },
  {
    type: "Competition",
    title: "C++ Mastery Challenge - National Coding Competition",
    organization: "National-Level Competition",
    period: "2024",
    description:
      "Scored 93% in the prestigious National-Level Coding Competition C++ Mastery Challenge, proving strong algorithmic competency and memory management skills.",
    skills: ["C++", "Data Structures", "Algorithms", "Competitive Programming"],
    highlight: "Scored 93% - Top Percentile",
    gradient: "from-emerald-500 to-cyan-500",
    icon: Trophy,
  },
  {
    type: "Internship",
    title: "Robotic Fundamentals - AI & IoT Integrated",
    organization: "EduSkills",
    period: "2024",
    description:
      "Integrated artificial intelligence algorithms with IoT microcontrollers and hardware sensors for real-time robotic telemetry analysis and edge automation.",
    skills: ["AI Integration", "IoT", "Microcontrollers", "Edge Robotics", "Sensor Automation"],
    highlight: "Hardware & Edge AI",
    gradient: "from-purple-600 to-blue-600",
    icon: Briefcase,
  },
  {
    type: "Education",
    title: "B.E. in Artificial Intelligence & Machine Learning",
    organization: "Srinivas Institute of Technology / VTU",
    period: "September 2023 – July 2027",
    description:
      "Pursuing Bachelor of Engineering in AIML with a current CGPA of 8.4/10, building deep foundations in computational intelligence, data structures, and computer vision.",
    skills: ["Artificial Intelligence", "Machine Learning", "Data Structures", "Computer Vision"],
    highlight: "CGPA 8.4 / 10",
    gradient: "from-cyan-500 to-purple-600",
    icon: GraduationCap,
  },
];

export default function Experience() {
  const containerRef = useRef(null);

  return (
    <section id="experience" className="relative w-full py-28 sm:py-36 md:py-40 scroll-mt-24 sm:scroll-mt-28 overflow-hidden flex justify-center">
      {/* Background Lighting */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div ref={containerRef} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="w-full flex flex-col items-center justify-center text-center mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-none glass border border-purple-500/30 text-xs font-semibold text-purple-300 mb-4 mx-auto">
            <Sparkles size={13} className="text-purple-400" />
            Milestones &amp; Learning
          </div>
          <h2 className="sr-only">My Journey</h2>
          <div className="w-full max-w-5xl mx-auto h-[65px] sm:h-[85px] md:h-[100px] relative flex items-center justify-center text-center">
            <TechText
              text="My Journey"
              highlightText="Journey"
              fontWeight={900}
              fontSize={85}
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
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-center">
            Verified chronology of academic study, virtual internships, hackathons, and technical bootcamps.
          </p>
        </motion.div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Center Spine Line (Desktop) - Stays firmly locked in center */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 rounded-full opacity-40" />

          {/* Left Spine Line (Mobile) */}
          <div className="md:hidden absolute left-5 top-4 bottom-4 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 rounded-full opacity-40" />

          <div className="space-y-16">
            {journeyTimeline.map((item, index) => {
              const isEven = index % 2 === 0;
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="relative flex flex-col md:flex-row items-center justify-between"
                >
                  {/* Left Slot (Desktop) - Moves strictly from far left inward toward center spine */}
                  <motion.div
                    className="hidden md:flex w-5/12 items-center justify-end pr-10"
                    initial={{ opacity: 0, x: -140 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{
                      type: "spring",
                      stiffness: 75,
                      damping: 16,
                      mass: 0.8,
                    }}
                  >
                    {isEven ? (
                      /* Main Story Card on the Left - Spacious Rounded Box with Full Corner Clearance */
                      <div className="rounded-2xl sm:rounded-3xl p-8 sm:p-10 border border-white/10 hover:border-cyan-400/50 bg-[#070818]/95 backdrop-blur-xl transition-all text-left w-full group shadow-2xl relative">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 blur-3xl pointer-events-none group-hover:bg-cyan-500/15 transition-all rounded-3xl" />
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 relative z-10">
                          <span className="text-xs px-4 py-1.5 rounded-full bg-cyan-500/15 text-cyan-300 font-semibold border border-cyan-500/30 shadow-sm">
                            {item.type}
                          </span>
                          {item.highlight && (
                            <span className="text-xs font-bold text-amber-300 px-3 py-1 rounded-full border border-amber-400/30 bg-amber-400/10 shadow-sm">
                              ★ {item.highlight}
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl sm:text-[23px] font-bold text-white group-hover:text-cyan-300 transition-colors relative z-10 leading-snug">
                          {item.title}
                        </h3>

                        <p className="text-sm font-semibold text-purple-400 mt-2 relative z-10">
                          {item.organization}
                        </p>

                        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 my-4 relative z-10">
                          <Calendar size={14} className="text-cyan-400" />
                          <span>{item.period}</span>
                        </div>

                        <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed mb-6 relative z-10">
                          {item.description}
                        </p>

                        <div className="flex flex-wrap gap-2.5 relative z-10">
                          {item.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium bg-white/[0.04] border border-white/10 text-slate-300 group-hover:border-cyan-500/30 transition-colors shadow-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      /* Complementary Highlights in the Left Space when Main Card is on the Right */
                      <div className="w-full text-right flex flex-col items-end gap-4 pr-3">
                        <div className="inline-flex items-center gap-2 px-4.5 py-2 rounded-xl glass border border-purple-500/30 text-purple-300 text-xs font-bold shadow-lg shadow-purple-500/10">
                          <Calendar size={14} className="text-purple-400" />
                          <span>{item.period}</span>
                        </div>
                        <div className="inline-flex items-center gap-2 px-4.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-slate-300 text-xs font-semibold shadow-sm">
                          <Building size={13} className="text-cyan-400" />
                          <span>{item.organization}</span>
                        </div>
                        {item.highlight && (
                          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[11px] font-bold shadow-sm">
                            <Award size={13} />
                            <span>{item.highlight}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>

                  {/* Center Node / Dot - Beautiful Rounded Floating Beacon */}
                  <motion.div
                    className="absolute left-5 md:left-1/2 -translate-x-1/2 w-11 h-11 rounded-2xl glass border border-white/20 bg-[#080814] flex items-center justify-center text-cyan-400 shadow-xl shadow-cyan-500/25 z-10"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{
                      type: "spring",
                      stiffness: 120,
                      damping: 14,
                    }}
                  >
                    <Icon size={19} />
                  </motion.div>

                  {/* Right Slot (Desktop) - Moves strictly from far right inward into place */}
                  <motion.div
                    className="hidden md:flex w-5/12 items-center justify-start pl-10"
                    initial={{ opacity: 0, x: 140 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{
                      type: "spring",
                      stiffness: 75,
                      damping: 16,
                      mass: 0.8,
                    }}
                  >
                    {!isEven ? (
                      /* Main Story Card on the Right - Spacious Rounded Box with Full Corner Clearance */
                      <div className="rounded-2xl sm:rounded-3xl p-8 sm:p-10 border border-white/10 hover:border-purple-400/50 bg-[#070818]/95 backdrop-blur-xl transition-all text-left w-full group shadow-2xl relative">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 blur-3xl pointer-events-none group-hover:bg-purple-500/15 transition-all rounded-3xl" />
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 relative z-10">
                          <span className="text-xs px-4 py-1.5 rounded-full bg-purple-500/15 text-purple-300 font-semibold border border-purple-500/30 shadow-sm">
                            {item.type}
                          </span>
                          {item.highlight && (
                            <span className="text-xs font-bold text-amber-300 px-3 py-1 rounded-full border border-amber-400/30 bg-amber-400/10 shadow-sm">
                              ★ {item.highlight}
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl sm:text-[23px] font-bold text-white group-hover:text-purple-300 transition-colors relative z-10 leading-snug">
                          {item.title}
                        </h3>

                        <p className="text-sm font-semibold text-cyan-400 mt-2 relative z-10">
                          {item.organization}
                        </p>

                        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 my-4 relative z-10">
                          <Calendar size={14} className="text-purple-400" />
                          <span>{item.period}</span>
                        </div>

                        <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed mb-6 relative z-10">
                          {item.description}
                        </p>

                        <div className="flex flex-wrap gap-2.5 relative z-10">
                          {item.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium bg-white/[0.04] border border-white/10 text-slate-300 group-hover:border-purple-500/30 transition-colors shadow-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      /* Complementary Highlights in the Right Space when Main Card is on the Left */
                      <div className="w-full text-left flex flex-col items-start gap-4 pl-3">
                        <div className="inline-flex items-center gap-2 px-4.5 py-2 rounded-xl glass border border-cyan-500/30 text-cyan-300 text-xs font-bold shadow-lg shadow-cyan-500/10">
                          <Calendar size={14} className="text-cyan-400" />
                          <span>{item.period}</span>
                        </div>
                        <div className="inline-flex items-center gap-2 px-4.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-slate-300 text-xs font-semibold shadow-sm">
                          <Building size={13} className="text-purple-400" />
                          <span>{item.organization}</span>
                        </div>
                        {item.highlight && (
                          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[11px] font-bold shadow-sm">
                            <Award size={13} />
                            <span>{item.highlight}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>

                  {/* Mobile Content (Always right of line) - Spacious Rounded Box */}
                  <motion.div
                    className="md:hidden ml-14 w-[calc(100%-3.5rem)]"
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{
                      type: "spring",
                      stiffness: 80,
                      damping: 16,
                    }}
                  >
                    <div className="rounded-2xl p-7 sm:p-8 border border-white/10 bg-[#070818]/95 backdrop-blur-xl shadow-xl">
                      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
                        <span className="text-xs px-3.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 font-semibold border border-cyan-500/30 shadow-sm">
                          {item.type}
                        </span>
                        {item.highlight && (
                          <span className="text-xs font-bold text-amber-300 px-2.5 py-1 rounded-full border border-amber-400/30 bg-amber-400/10 shadow-sm">
                            ★ {item.highlight}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-white mt-1 leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-sm font-semibold text-purple-400 mt-1">
                        {item.organization}
                      </p>

                      <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 my-3">
                        <Calendar size={13} className="text-cyan-400" />
                        <span>{item.period}</span>
                      </div>

                      <p className="text-sm text-slate-300 leading-relaxed mb-5">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 rounded-xl text-xs font-mono font-medium bg-white/[0.04] border border-white/10 text-slate-300 shadow-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
