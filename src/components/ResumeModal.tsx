"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Download,
  X,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Code2,
  Award,
  Sparkles,
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function ResumeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-resume-modal", handleOpen);
    return () => window.removeEventListener("open-resume-modal", handleOpen);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Container */}
          <motion.div
            className="relative z-10 w-full max-w-4xl glass rounded-[32px] sm:rounded-[40px] border border-cyan-500/40 shadow-2xl shadow-cyan-500/20 bg-[#070818]/95 max-h-[90vh] flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.25 }}
          >
            {/* Modal Top Header Bar */}
            <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-purple-600 to-pink-500 p-0.5 shadow-md">
                  <div className="w-full h-full rounded-[10px] bg-[#070818] flex items-center justify-center text-cyan-300">
                    <FileText size={20} />
                  </div>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white font-mono flex items-center gap-2">
                    <span>Verified Academic &amp; Technical CV</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                      2026 / 2027
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Sangmeshwar Anil Naik • B.E. AIML @ VTU (CGPA 8.4)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <a
                  href="/resume.pdf"
                  download="Sangmeshwar_Naik_Resume.pdf"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold text-xs shadow-md shadow-cyan-500/20 hover:opacity-90 transition-all cursor-pointer"
                >
                  <Download size={13} />
                  <span>Download PDF</span>
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close resume modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Scrollable CV Document View */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 font-sans text-xs sm:text-sm">
              {/* Executive Contact Strip */}
              <div className="p-5 rounded-2xl bg-white/[0.025] border border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-lg font-black text-white tracking-tight">Sangmeshwar Anil Naik</h4>
                  <p className="text-cyan-400 font-semibold font-mono">AI/ML Engineer &amp; Full-Stack Developer</p>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Mail size={13} className="text-cyan-400" />
                    sangameshnaik471@gmail.com
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone size={13} className="text-purple-400" />
                    +91 8080945510
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-emerald-400" />
                    Karnataka, India
                  </span>
                </div>
              </div>

              {/* Education Grid */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-400 font-mono mb-3 flex items-center gap-2">
                  <GraduationCap size={16} />
                  <span>Education &amp; Academic Honors</span>
                </h4>
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h5 className="font-bold text-white text-sm">B.E. in Artificial Intelligence &amp; Machine Learning</h5>
                      <p className="text-xs text-slate-300">Srinivas Institute of Technology, Mangalore (VTU)</p>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">Sept 2023 – July 2027</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-bold font-mono text-xs">
                      CGPA: 8.4 / 10
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h5 className="font-bold text-white text-sm">12th (DPUC) Science</h5>
                      <p className="text-xs text-slate-300">Moulana Azad Independent P.U College, Bidar</p>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">2022</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 font-bold font-mono text-xs">
                      64.33%
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h5 className="font-bold text-white text-sm">10th (KSEEB) Secondary Education</h5>
                      <p className="text-xs text-slate-300">Government High School Hokarna</p>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">2020</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold font-mono text-xs">
                      79.04%
                    </span>
                  </div>
                </div>
              </div>

              {/* Internships & Milestones */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-purple-400 font-mono mb-3 flex items-center gap-2">
                  <Briefcase size={16} />
                  <span>Industry Virtual Internships</span>
                </h4>
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <h5 className="font-bold text-white text-sm">SQL &amp; Database Management Virtual Internship</h5>
                      <span className="text-[10px] font-mono text-cyan-300 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">
                        AICTE EduSkills • 8 Weeks
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Executed end-to-end relational schema designs, query optimizations, and database normalization projects recognized by AICTE.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <h5 className="font-bold text-white text-sm">Java Full Stack Developer Virtual Internship</h5>
                      <span className="text-[10px] font-mono text-purple-300 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30">
                        AICTE EduSkills • 10 Weeks
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Constructed enterprise back-end Java microservices, REST APIs, and responsive front-end persistence layers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Core Featured Projects */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-pink-400 font-mono mb-3 flex items-center gap-2">
                  <Code2 size={16} />
                  <span>Key Engineering Projects</span>
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <h5 className="font-bold text-white text-sm">Hybrid Quantum AI (QCNN)</h5>
                    <p className="text-[11px] text-slate-300 mt-1">U-Net brain lesion MRI segmentation combined with quantum-inspired classification.</p>
                    <span className="text-[10px] text-cyan-400 font-mono mt-2 block">Python • PyTorch • U-Net • QCNN</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <h5 className="font-bold text-white text-sm">Real-time Messaging Platform</h5>
                    <p className="text-[11px] text-slate-300 mt-1">Bi-directional WebSockets chat with persistent channel streaming &amp; Docker containerization.</p>
                    <span className="text-[10px] text-purple-400 font-mono mt-2 block">Socket.io • React • Node • MongoDB</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="p-5 border-t border-white/10 bg-black/40 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                Verified documentation prepared for technical recruitment &amp; admissions.
              </span>
              <a
                href="/resume.pdf"
                download="Sangmeshwar_Naik_Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 hover:opacity-90 transition-all cursor-pointer"
              >
                <Download size={14} />
                <span>Download Official PDF</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

