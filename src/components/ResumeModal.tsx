"use client";

import { useState, useEffect, useRef } from "react";
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
  Printer,
  Maximize2,
  Minimize2,
  Eye,
  RefreshCw,
  Layers,
  ShieldCheck,
  Check,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

type ViewMode = "pdf" | "digital";

export default function ResumeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("pdf");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pdfLoaded, setPdfLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setPdfLoaded(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("open-resume-modal", handleOpen);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("open-resume-modal", handleOpen);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handlePrint = () => {
    if (iframeRef.current?.contentWindow) {
      try {
        iframeRef.current.contentWindow.print();
        return;
      } catch {
        // Fallback below
      }
    }
    window.open("/resume.pdf", "_blank")?.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
          {/* Backdrop with Blur */}
          <motion.div
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Container */}
          <motion.div
            className={`relative z-10 w-full glass rounded-[28px] sm:rounded-[36px] border border-cyan-500/40 shadow-2xl shadow-cyan-500/25 bg-[#060714]/98 flex flex-col overflow-hidden transition-all duration-300 ${
              isFullscreen
                ? "w-[98vw] h-[96vh] max-w-none max-h-none rounded-2xl"
                : "max-w-5xl h-[90vh] max-h-[850px]"
            }`}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* ============================================================== */}
            {/* TOP HEADER BAR: TITLE, VIEW TABS & QUICK CONTROLS             */}
            {/* ============================================================== */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 bg-black/40">
              {/* Left Identity Strip */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-purple-600 to-pink-500 p-0.5 shadow-md shrink-0">
                  <div className="w-full h-full rounded-[10px] bg-[#070818] flex items-center justify-center text-cyan-300">
                    <FileText size={20} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-white font-mono tracking-tight">
                      Sangmeshwar Anil Naik
                    </h3>
                    <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Verified Official Resume</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono">
                    AI/ML Engineer • B.E. AIML @ VTU (CGPA 8.4 / 10)
                  </p>
                </div>
              </div>

              {/* Center Mode Switcher Tabs (Real PDF Document vs Digital CV) */}
              <div className="flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/10 shadow-inner">
                <button
                  onClick={() => setViewMode("pdf")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    viewMode === "pdf"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25 border border-cyan-400/40"
                      : "text-slate-400 hover:text-white"
                  }`}
                  title="View Authentic PDF Document"
                >
                  <Eye size={13} />
                  <span>Real PDF Viewer</span>
                </button>
                <button
                  onClick={() => setViewMode("digital")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    viewMode === "digital"
                      ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md shadow-purple-500/25 border border-purple-400/40"
                      : "text-slate-400 hover:text-white"
                  }`}
                  title="View Structured Interactive Digital CV"
                >
                  <Layers size={13} />
                  <span>Interactive CV</span>
                </button>
              </div>

              {/* Right Action Icons & Controls */}
              <div className="flex items-center gap-2">
                {/* Print Shortcut */}
                <button
                  onClick={handlePrint}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass border border-white/10 hover:border-cyan-400/50 text-slate-300 hover:text-white text-xs font-mono font-medium transition-all cursor-pointer"
                  title="Print Resume"
                >
                  <Printer size={13} className="text-cyan-400" />
                  <span>Print</span>
                </button>

                {/* Open in New Window */}
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass border border-white/10 hover:border-cyan-400/50 text-slate-300 hover:text-white text-xs font-mono font-medium transition-all"
                  title="Open in new browser tab"
                >
                  <ExternalLink size={13} className="text-purple-400" />
                  <span>New Tab</span>
                </a>

                {/* Direct Download Button */}
                <a
                  href="/resume.pdf"
                  download="Sangmeshwar_Anil_Naik_Resume.pdf"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-xs shadow-md shadow-cyan-500/25 hover:from-cyan-400 hover:to-purple-500 transition-all cursor-pointer"
                  title="Download verified PDF resume file"
                >
                  <Download size={13} />
                  <span>Download PDF</span>
                </a>

                {/* Fullscreen Expand Button */}
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="hidden md:inline-flex p-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen View"}
                >
                  {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>

                {/* Close Modal Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer ml-1"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* ============================================================== */}
            {/* VIEW MODE 1: THE REAL PDF DOCUMENT EMBED                       */}
            {/* ============================================================== */}
            {viewMode === "pdf" ? (
              <div className="flex-1 w-full h-full relative bg-[#090a18] flex flex-col overflow-hidden">
                {/* Secondary helper toolbar */}
                <div className="px-4 py-2 border-b border-white/10 bg-black/30 flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-slate-300 font-semibold">Document: resume.pdf (307 KB)</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="hidden sm:inline text-slate-400">
                      High-resolution Adobe Acrobat format
                    </span>
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <span>Direct Link</span>
                      <ExternalLink size={10} />
                    </a>
                  </div>
                </div>

                {/* Embedded PDF iframe / object with full hardware acceleration */}
                <div className="flex-1 w-full h-full relative p-2 sm:p-4 flex items-center justify-center">
                  <iframe
                    ref={iframeRef}
                    src="/resume.pdf#view=FitH&toolbar=1&navpanes=0&scrollbar=1"
                    title="Sangmeshwar Anil Naik Official Resume"
                    className="w-full h-full min-h-[500px] rounded-2xl border border-white/10 bg-[#0d0e24] shadow-2xl"
                    onLoad={() => setPdfLoaded(true)}
                  />

                  {/* Fallback link overlay for small mobile devices where PDF iframes might be disabled */}
                  <noscript>
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#070818]">
                      <p className="text-sm text-slate-300 mb-4 font-mono">
                        Direct PDF viewer is available below:
                      </p>
                      <a
                        href="/resume.pdf"
                        target="_blank"
                        className="px-5 py-2.5 rounded-xl bg-cyan-500 text-white font-bold"
                      >
                        Open Resume PDF
                      </a>
                    </div>
                  </noscript>
                </div>
              </div>
            ) : (
              /* ============================================================== */
              /* VIEW MODE 2: INTERACTIVE STRUCTURED DIGITAL CV                 */
              /* ============================================================== */
              <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-7 font-sans text-xs sm:text-sm">
                {/* Executive Contact Strip */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.025] border border-white/10 flex flex-wrap items-center justify-between gap-4 shadow-xl">
                  <div className="space-y-1">
                    <h4 className="text-xl font-black text-white tracking-tight">
                      Sangmeshwar Anil Naik
                    </h4>
                    <p className="text-cyan-400 font-semibold font-mono text-sm">
                      AI/ML Engineer • Data Scientist • GenAI Developer
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 font-mono">
                    <a
                      href="mailto:sangameshnaik471@gmail.com"
                      className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
                    >
                      <Mail size={13} className="text-cyan-400" />
                      sangameshnaik471@gmail.com
                    </a>
                    <a
                      href="tel:+918080945510"
                      className="flex items-center gap-1.5 hover:text-purple-400 transition-colors"
                    >
                      <Phone size={13} className="text-purple-400" />
                      +91 8080945510
                    </a>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-emerald-400" />
                      Bidar &amp; Mangalore, Karnataka
                    </span>
                  </div>
                </div>

                {/* Education Grid with Verified Scores */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-400 font-mono mb-3.5 flex items-center gap-2">
                    <GraduationCap size={17} />
                    <span>Academic Roadmap &amp; Scores</span>
                  </h4>
                  <div className="space-y-3">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h5 className="font-bold text-white text-sm">
                          B.E. in Artificial Intelligence &amp; Machine Learning
                        </h5>
                        <p className="text-xs text-slate-300">
                          Srinivas Institute of Technology, Mangalore (VTU)
                        </p>
                        <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                          Sept 2023 – July 2027 (Currently Pursuing, Class of 2027)
                        </p>
                      </div>
                      <span className="px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-black font-mono text-xs shadow-sm">
                        CGPA: 8.4 / 10
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h5 className="font-bold text-white text-sm">
                          12th (DPUC) - Science
                        </h5>
                        <p className="text-xs text-slate-300">
                          Moulana Azad Independent P.U College, Bidar
                        </p>
                        <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                          Completed 2022
                        </p>
                      </div>
                      <span className="px-3.5 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 font-bold font-mono text-xs">
                        64.33%
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h5 className="font-bold text-white text-sm">
                          10th (KSEEB) - Secondary Education
                        </h5>
                        <p className="text-xs text-slate-300">
                          Government High School Hokarna, Hokarna
                        </p>
                        <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                          Completed 2020
                        </p>
                      </div>
                      <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold font-mono text-xs">
                        79.04%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Verified Industry Accreditations */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-purple-400 font-mono mb-3.5 flex items-center gap-2">
                    <Award size={17} />
                    <span>Verified Certifications &amp; Distinctions</span>
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="font-bold text-white text-sm">AWS Academy Data Engineering</h5>
                        <span className="text-[10px] font-mono text-amber-300 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                          Credly
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">
                        Glue, Redshift, EMR, Athena, enterprise data lakes and automated ETL pipelines.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="font-bold text-white text-sm">IT Specialist – Data Analytics</h5>
                        <span className="text-[10px] font-mono text-emerald-300 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                          929 / 1000 (93%)
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">
                        Certiport / Pearson VUE proctored exam distinction in statistical modeling.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="font-bold text-white text-sm">National C++ Mastery Challenge</h5>
                        <span className="text-[10px] font-mono text-cyan-300 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">
                          93% Score
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">
                        National competitive programming distinction in memory allocation and algorithms.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="font-bold text-white text-sm">AI/ML for Geodata Analytics</h5>
                        <span className="text-[10px] font-mono text-pink-300 px-2 py-0.5 rounded bg-pink-500/10 border border-pink-500/30">
                          ISRO - IIRS
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">
                        Space research remote sensing machine learning from IIRS Dehradun.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Core Engineering Projects */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-pink-400 font-mono mb-3.5 flex items-center gap-2">
                    <Code2 size={17} />
                    <span>Key Engineering Projects</span>
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <h5 className="font-bold text-white text-sm">
                        Hybrid Quantum AI for Brain Tumor Analysis
                      </h5>
                      <p className="text-[11px] text-slate-300 mt-1">
                        MRI scan lesion segmentation with custom U-Net (0.94 Dice coefficient) coupled with a quantum-inspired CNN (QCNN) classifier.
                      </p>
                      <span className="text-[10px] text-cyan-400 font-mono mt-2 block">
                        Python • PyTorch • U-Net • QCNN • OpenCV
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <h5 className="font-bold text-white text-sm">
                        CampusConnect Service Platform
                      </h5>
                      <p className="text-[11px] text-slate-300 mt-1">
                        Cross-platform React Native/Expo app with Node.js/PostgreSQL backend and role-based permissions.
                      </p>
                      <span className="text-[10px] text-purple-400 font-mono mt-2 block">
                        React Native • Expo • Node.js • PostgreSQL • Docker
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <h5 className="font-bold text-white text-sm">
                        Coastal Maritime Vessel Detection
                      </h5>
                      <p className="text-[11px] text-slate-300 mt-1">
                        Real-time boat and ship detection using YOLOv8, OpenCV, and CNN bounding box localization.
                      </p>
                      <span className="text-[10px] text-emerald-400 font-mono mt-2 block">
                        Python • YOLOv8 • OpenCV • PyTorch
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <h5 className="font-bold text-white text-sm">
                        Real-time Messaging Engine
                      </h5>
                      <p className="text-[11px] text-slate-300 mt-1">
                        Bi-directional WebSockets chat platform with MongoDB message persistence and Docker.
                      </p>
                      <span className="text-[10px] text-pink-400 font-mono mt-2 block">
                        Socket.io • React.js • Node.js • MongoDB
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* MODAL FOOTER BAR                                               */}
            {/* ============================================================== */}
            <div className="p-4 sm:p-5 border-t border-white/10 bg-black/50 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <CheckCircle2 size={14} className="text-cyan-400" />
                <span>Verified Documentation • Batch of 2027</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setViewMode(viewMode === "pdf" ? "digital" : "pdf")}
                  className="text-xs font-mono text-cyan-400 hover:underline cursor-pointer"
                >
                  Switch to {viewMode === "pdf" ? "Digital CV" : "PDF Viewer"}
                </button>
                <a
                  href="/resume.pdf"
                  download="Sangmeshwar_Anil_Naik_Resume.pdf"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-pink-400 transition-all cursor-pointer"
                >
                  <Download size={14} />
                  <span>Download Official PDF</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
