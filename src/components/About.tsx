"use client";

import { useRef, useState, useEffect } from "react";
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
} from "lucide-react";

const educationList = [
  {
    degree: "B.E. in Artificial Intelligence & Machine Learning",
    institution: "Srinivas Institute of Technology, Mangalore",
    university: "Visvesvaraya Technological University (VTU)",
    duration: "Sept 2023 – July 2027",
    score: "CGPA: 8.4 / 10",
    current: true,
  },
  {
    degree: "12th (DPUC) - Science",
    institution: "Moulana Azad Independent P.U College, Bidar",
    university: "Department of Pre-University Education",
    duration: "2022",
    score: "64.33%",
    current: false,
  },
  {
    degree: "10th (KSEEB) - Secondary School",
    institution: "Government High School Hokarna, Hokarna",
    university: "Karnataka Secondary Education Examination Board",
    duration: "2020",
    score: "79.04%",
    current: false,
  },
];

const areasOfInterest = [
  "Artificial Intelligence",
  "Deep Learning",
  "Computer Vision",
  "Generative AI",
  "Quantum Machine Learning",
  "Full Stack Development",
];

function AnimatedCounter({ target, suffix = "", decimals = 0 }: { target: number; suffix?: string; decimals?: number }) {
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
    <section id="about" className="relative w-full py-28 sm:py-36 md:py-40 scroll-mt-24 sm:scroll-mt-28 overflow-hidden flex justify-center">
      {/* Background radial blurs */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div ref={containerRef} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-purple-500/30 text-xs font-semibold text-purple-300 mb-4">
            <Sparkles size={13} className="text-purple-400" />
            About Me
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Turning Ideas Into{" "}
            <span className="text-gradient">Intelligent Solutions</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Specializing in Artificial Intelligence, Machine Learning, and building high-impact software systems.
          </p>
        </motion.div>

        {/* Two-Column Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Professional Intro & Education History */}
          <motion.div
            className="lg:col-span-6 space-y-8"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {/* Story Card */}
            <div className="glass rounded-3xl p-8 border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2.5">
                <Compass className="text-cyan-400" size={22} />
                <span>Who I Am</span>
              </h3>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  I am a Bachelor of Engineering student specializing in{" "}
                  <strong className="text-cyan-300 font-semibold">
                    Artificial Intelligence and Machine Learning
                  </strong>{" "}
                  at Srinivas Institute of Technology, Mangalore (VTU).
                </p>
                <p>
                  I enjoy building intelligent applications, exploring emerging AI technologies,
                  developing machine learning solutions, and solving real-world problems through technology.
                </p>
                <p>
                  My interests include{" "}
                  <span className="text-purple-300 font-medium">
                    Artificial Intelligence, Deep Learning, Computer Vision, Generative AI, Quantum Machine Learning,
                  </span>{" "}
                  and <span className="text-pink-300 font-medium">Full Stack Development</span>.
                </p>
              </div>

              {/* Location & Quick Meta */}
              <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-cyan-400" />
                  Bidar &amp; Mangalore, Karnataka
                </span>
                <span className="flex items-center gap-1.5">
                  <GraduationCap size={14} className="text-purple-400" />
                  VTU Batch of 2027
                </span>
              </div>
            </div>

            {/* Education Timeline Card */}
            <div className="glass rounded-3xl p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2.5">
                <GraduationCap className="text-purple-400" size={22} />
                <span>Academic Education</span>
              </h3>

              <div className="space-y-6">
                {educationList.map((edu, idx) => (
                  <div key={idx} className="relative pl-6 border-l border-white/15 last:border-0 pb-1">
                    <span
                      className={`absolute -left-1.5 top-1 w-3 h-3 rounded-full ${
                        edu.current
                          ? "bg-cyan-400 shadow-[0_0_10px_#00f5ff]"
                          : "bg-slate-500"
                      }`}
                    />
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-base font-bold text-white">{edu.degree}</h4>
                      <span className="text-xs px-2.5 py-0.5 rounded-full glass text-cyan-300 border border-cyan-500/30 font-semibold">
                        {edu.score}
                      </span>
                    </div>
                    <p className="text-sm text-slate-300 mt-1">{edu.institution}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {edu.university} • {edu.duration}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Statistics, Career Objectives, Areas of Interest */}
          <motion.div
            className="lg:col-span-6 space-y-8"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Verified Statistics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="glass rounded-2xl p-5 text-center border border-white/10 hover:border-cyan-500/40 transition-colors">
                <div className="text-3xl sm:text-4xl font-black text-cyan-400 mb-1">
                  <AnimatedCounter target={8.4} decimals={1} />
                </div>
                <p className="text-xs text-slate-400 font-medium">B.E. CGPA (out of 10)</p>
              </div>

              <div className="glass rounded-2xl p-5 text-center border border-white/10 hover:border-purple-500/40 transition-colors">
                <div className="text-3xl sm:text-4xl font-black text-purple-400 mb-1">
                  <AnimatedCounter target={4} suffix="+" />
                </div>
                <p className="text-xs text-slate-400 font-medium">Virtual Internships</p>
              </div>

              <div className="glass rounded-2xl p-5 text-center border border-white/10 hover:border-pink-500/40 transition-colors">
                <div className="text-3xl sm:text-4xl font-black text-pink-400 mb-1">
                  <AnimatedCounter target={6} suffix="+" />
                </div>
                <p className="text-xs text-slate-400 font-medium">Core Projects</p>
              </div>

              <div className="glass rounded-2xl p-5 text-center border border-white/10 hover:border-emerald-500/40 transition-colors">
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 mb-1">
                  <AnimatedCounter target={8} suffix="+" />
                </div>
                <p className="text-xs text-slate-400 font-medium">Certifications</p>
              </div>
            </div>

            {/* Career Objective Card */}
            <div className="glass rounded-3xl p-8 border border-white/10 relative overflow-hidden">
              <div className="flex items-center gap-2.5 mb-4">
                <Briefcase className="text-cyan-400" size={22} />
                <h3 className="text-xl font-bold text-white">Career Objective</h3>
              </div>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed italic">
                &ldquo;Results-driven B.E. student specializing in Artificial Intelligence and Machine Learning,
                with a strong foundation in C, Python, and software development. Seeking an entry-level
                opportunity to apply my technical skills, develop innovative solutions, and contribute to
                organizational growth while continuously expanding my expertise.&rdquo;
              </p>
            </div>

            {/* Areas of Interest Card */}
            <div className="glass rounded-3xl p-8 border border-white/10">
              <div className="flex items-center gap-2.5 mb-6">
                <BookOpen className="text-purple-400" size={22} />
                <h3 className="text-xl font-bold text-white">Areas of Focus &amp; Research</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {areasOfInterest.map((interest, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all"
                  >
                    <CheckCircle2 size={16} className="text-cyan-400 flex-shrink-0" />
                    <span className="text-sm font-semibold text-slate-200">{interest}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
