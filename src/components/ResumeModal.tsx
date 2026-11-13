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
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Container */}
          <motion.div
            className={`relative z-10 w-full rounded-3xl border border-slate-200 shadow-2xl bg-white/98 text-slate-900 flex flex-col overflow-hidden transition-all duration-300 ${
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
            <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50">
              {/* Left Identity Strip */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-purple-600 to-pink-500 p-0.5 shadow-md shrink-0">
                  <div className="w-full h-full rounded-xl bg-white flex items-center justify-center text-cyan-600">
                    <FileText size={20} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-slate-950 font-mono tracking-tight">
                      Sangmeshwar Anil Naik
                    </h3>
                    <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Verified Official Resume</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-mono">
                    AI/ML Engineer • B.E. AIML @ VTU (CGPA 8.4 / 10)
                  </p>
                </div>
              </div>

              {/* Center Mode Switcher Tabs (Real PDF Document vs Digital CV) */}
              <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200">
                <button
                  onClick={() => setViewMode("pdf")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    viewMode === "pdf"
                      ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm border border-cyan-500/40"
                      : "text-slate-600 hover:text-slate-950"
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
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-sm border border-purple-500/40"
                      : "text-slate-600 hover:text-slate-950"
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
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-cyan-400 text-slate-700 hover:text-slate-950 text-xs font-mono font-medium transition-all cursor-pointer shadow-sm"
                  title="Print Resume"
                >
                  <Printer size={13} className="text-cyan-600" />
                  <span>Print</span>
                </button>

                {/* Open in New Window */}
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-cyan-400 text-slate-700 hover:text-slate-950 text-xs font-mono font-medium transition-all shadow-sm"
                  title="Open in new browser tab"
                >
                  <ExternalLink size={13} className="text-purple-600" />
                  <span>New Tab</span>
                </a>

                {/* Direct Download Button */}
                <a
                  href="/resume.pdf"
                  download="Sangmeshwar_Anil_Naik_Resume.pdf"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-bold text-xs shadow-md hover:from-cyan-500 hover:to-purple-500 transition-all cursor-pointer"
                  title="Download verified PDF resume file"
                >
                  <Download size={13} />
                  <span>Download PDF</span>
                </a>

                {/* Fullscreen Expand Button */}
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="hidden md:inline-flex p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-950 transition-colors cursor-pointer shadow-sm"
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen View"}
                >
                  {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>

                {/* Close Modal Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-950 transition-colors cursor-pointer ml-1 shadow-sm"
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
              <div className="flex-1 w-full h-full relative bg-slate-100 flex flex-col overflow-hidden">
                {/* Secondary helper toolbar */}
                <div className="px-4 py-2 border-b border-slate-200 bg-slate-50 flex items-center justify-between text-xs font-mono text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                    <span className="text-slate-800 font-semibold">Document: resume.pdf (307 KB)</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="hidden sm:inline text-slate-500">
                      High-resolution Adobe Acrobat format
                    </span>
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-600 hover:underline flex items-center gap-1 font-semibold"
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
                    className="w-full h-full min-h-[500px] rounded-2xl border border-slate-200 bg-white shadow-md"
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
              <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-7 font-sans text-xs sm:text-sm bg-white text-slate-800">
                {/* Executive Contact Strip */}
                <div className="p-6 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-4 shadow-sm">
                  <div className="space-y-1">
                    <h4 className="text-xl font-black text-slate-950 tracking-tight">
                      Sangmeshwar Anil Naik
                    </h4>
                    <p className="text-cyan-700 font-semibold font-mono text-sm">
                      AI/ML Engineer • Data Scientist • GenAI Developer
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-mono">
                    <a
                      href="mailto:sangameshnaik471@gmail.com"
                      className="flex items-center gap-1.5 hover:text-cyan-600 transition-colors"
                    >
                      <Mail size={13} className="text-cyan-600" />
                      sangameshnaik471@gmail.com
                    </a>
                    <a
                      href="tel:+918080945510"
                      className="flex items-center gap-1.5 hover:text-purple-600 transition-colors"
                    >
                      <Phone size={13} className="text-purple-600" />
                      +91 8080945510
                    </a>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-emerald-600" />
                      Bidar &amp; Mangalore, Karnataka
                    </span>
                  </div>
                </div>

                {/* Education Grid with Verified Scores */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-700 font-mono mb-3.5 flex items-center gap-2">
                    <GraduationCap size={17} />
                    <span>Academic Roadmap &amp; Scores</span>
                  </h4>
                  <div className="space-y-3">
                    <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-2 shadow-sm">
                      <div>
                        <h5 className="font-bold text-slate-950 text-sm">
                          B.E. in Artificial Intelligence &amp; Machine Learning
                        </h5>
                        <p className="text-xs text-slate-600">
                          Srinivas Institute of Technology, Mangalore (VTU)
                        </p>
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                          Sept 2023 – July 2027 (Currently Pursuing, Class of 2027)
                        </p>
                      </div>
                      <span className="px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 font-black font-mono text-xs shadow-sm">
                        CGPA: 8.4 / 10
                      </span>
                    </div>

                    <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-2 shadow-sm">
                      <div>
                        <h5 className="font-bold text-slate-950 text-sm">
                          12th (DPUC) - Science
                        </h5>
                        <p className="text-xs text-slate-600">
                          Moulana Azad Independent P.U College, Bidar
                        </p>
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                          Completed 2022
                        </p>
                      </div>
                      <span className="px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 font-bold font-mono text-xs">
                        64.33%
                      </span>
                    </div>

                    <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-2 shadow-sm">
                      <div>
                        <h5 className="font-bold text-slate-950 text-sm">
                          10th (KSEEB) - Secondary Education
                        </h5>
                        <p className="text-xs text-slate-600">
                          Government High School Hokarna, Hokarna
                        </p>
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                          Completed 2020
                        </p>
                      </div>
                      <span className="px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold font-mono text-xs">
                        79.04%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Verified Industry Accreditations */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-purple-700 font-mono mb-3.5 flex items-center gap-2">
                    <Award size={17} />
                    <span>Verified Certifications &amp; Distinctions</span>
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3.5">
                    <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between mb-1.5">
                        <h5 className="font-bold text-slate-950 text-sm">AWS Academy Data Engineering</h5>
                        <span className="text-[10px] font-mono text-amber-800 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-300">
                          Credly
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">
                        Glue, Redshift, EMR, Athena, enterprise data lakes and automated ETL pipelines.
                      </p>
                    </div>

                    <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between mb-1.5">
                        <h5 className="font-bold text-slate-950 text-sm">IT Specialist – Data Analytics</h5>
                        <span className="text-[10px] font-mono text-emerald-800 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-300">
                          929 / 1000 (93%)
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">
                        Certiport / Pearson VUE proctored exam distinction in statistical modeling.
                      </p>
                    </div>

                    <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between mb-1.5">
                        <h5 className="font-bold text-slate-950 text-sm">National C++ Mastery Challenge</h5>
                        <span className="text-[10px] font-mono text-cyan-800 px-2.5 py-0.5 rounded-full bg-cyan-50 border border-cyan-200">
                          93% Score
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">
                        National competitive programming distinction in memory allocation and algorithms.
                      </p>
                    </div>

                    <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between mb-1.5">
                        <h5 className="font-bold text-slate-950 text-sm">AI/ML for Geodata Analytics</h5>
                        <span className="text-[10px] font-mono text-pink-800 px-2.5 py-0.5 rounded-full bg-pink-50 border border-pink-200">
                          ISRO - IIRS
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">
                        Space research remote sensing machine learning from IIRS Dehradun.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Core Engineering Projects */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-pink-700 font-mono mb-3.5 flex items-center gap-2">
                    <Code2 size={17} />
                    <span>Key Engineering Projects</span>
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3.5">
                    <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
                      <h5 className="font-bold text-slate-950 text-sm">
                        Hybrid Quantum AI for Brain Tumor Analysis
                      </h5>
                      <p className="text-[11px] text-slate-600 mt-1">
                        MRI scan lesion segmentation with custom U-Net (0.94 Dice coefficient) coupled with a quantum-inspired CNN (QCNN) classifier.
                      </p>
                      <span className="text-[10px] text-cyan-700 font-mono mt-2 block font-medium">
                        Python • PyTorch • U-Net • QCNN • OpenCV
                      </span>
                    </div>

                    <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
                      <h5 className="font-bold text-slate-950 text-sm">
                        CampusConnect Service Platform
                      </h5>
                      <p className="text-[11px] text-slate-600 mt-1">
                        Cross-platform React Native/Expo app with Node.js/PostgreSQL backend and role-based permissions.
                      </p>
                      <span className="text-[10px] text-purple-700 font-mono mt-2 block font-medium">
                        React Native • Expo • Node.js • PostgreSQL • Docker
                      </span>
                    </div>

                    <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
                      <h5 className="font-bold text-slate-950 text-sm">
                        Coastal Maritime Vessel Detection
                      </h5>
                      <p className="text-[11px] text-slate-600 mt-1">
                        Real-time boat and ship detection using YOLOv8, OpenCV, and CNN bounding box localization.
                      </p>
                      <span className="text-[10px] text-emerald-700 font-mono mt-2 block font-medium">
                        Python • YOLOv8 • OpenCV • PyTorch
                      </span>
                    </div>

                    <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
                      <h5 className="font-bold text-slate-950 text-sm">
                        Real-time Messaging Engine
                      </h5>
                      <p className="text-[11px] text-slate-600 mt-1">
                        Bi-directional WebSockets chat platform with MongoDB message persistence and Docker.
                      </p>
                      <span className="text-[10px] text-pink-700 font-mono mt-2 block font-medium">
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
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
                <CheckCircle2 size={14} className="text-cyan-600" />
                <span>Verified Documentation • Batch of 2027</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setViewMode(viewMode === "pdf" ? "digital" : "pdf")}
                  className="text-xs font-mono text-cyan-600 hover:underline cursor-pointer font-semibold"
                >
                  Switch to {viewMode === "pdf" ? "Digital CV" : "PDF Viewer"}
                </button>
                <a
                  href="/resume.pdf"
                  download="Sangmeshwar_Anil_Naik_Resume.pdf"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 text-white font-bold text-xs shadow-md hover:from-cyan-500 hover:to-pink-500 transition-all cursor-pointer"
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
