"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Command,
  X,
  Compass,
  Code2,
  Brain,
  Briefcase,
  Award,
  FolderGit2,
  Mail,
  FileText,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  Terminal,
  Leaf,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

interface PaletteItem {
  id: string;
  category: "Navigation" | "Projects" | "Skills & Tech" | "Quick Actions";
  title: string;
  subtitle?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  action: () => void;
  badge?: string;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
        setQuery("");
        setSelectedIndex(0);
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  const handleCopyEmail = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText("sangameshnaik471@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const items: PaletteItem[] = [
    // Navigation
    {
      id: "nav-hero",
      category: "Navigation",
      title: "Hero & Introduction",
      subtitle: "Overview, bio status & profile radar",
      icon: Compass,
      action: () => scrollTo("hero"),
    },
    {
      id: "nav-about",
      category: "Navigation",
      title: "About Me (Bento Grid)",
      subtitle: "Executive background, VTU CGPA 8.4 & metrics",
      icon: Sparkles,
      action: () => scrollTo("about"),
    },
    {
      id: "nav-skills",
      category: "Navigation",
      title: "Technologies & Orbital Radar",
      subtitle: "360° rotating radar across 6 tech domains",
      icon: Code2,
      action: () => scrollTo("skills"),
    },
    {
      id: "nav-projects",
      category: "Navigation",
      title: "Featured Engineering Projects",
      subtitle: "Medical AI, Quantum ML, Real-time Chat & Web",
      icon: FolderGit2,
      action: () => scrollTo("projects"),
    },
    {
      id: "nav-experience",
      category: "Navigation",
      title: "Career Journey & Internships",
      subtitle: "EduSkills AICTE SQL & Java full-stack internships",
      icon: Briefcase,
      action: () => scrollTo("experience"),
    },
    {
      id: "nav-certifications",
      category: "Navigation",
      title: "Certifications & Accreditations",
      subtitle: "AWS Academy, IBM DevOps, Certiport distinctions",
      icon: Award,
      action: () => scrollTo("certifications"),
    },
    {
      id: "nav-github",
      category: "Navigation",
      title: "GitHub Activity & Repositories",
      subtitle: "Interactive code inspector & architecture pipelines",
      icon: Terminal,
      action: () => scrollTo("github"),
    },
    {
      id: "nav-contact",
      category: "Navigation",
      title: "Direct Contact Gateway",
      subtitle: "Send a transmission & direct communication channels",
      icon: Mail,
      action: () => scrollTo("contact"),
    },

    // Projects
    {
      id: "proj-qcnn",
      category: "Projects",
      title: "Hybrid Quantum AI for Brain Tumor Analysis",
      subtitle: "Medical imaging, U-Net segmentation & QCNN classifier",
      icon: Brain,
      badge: "Quantum AI",
      action: () => scrollTo("projects"),
    },
    {
      id: "proj-chat",
      category: "Projects",
      title: "Real-time Messaging Platform",
      subtitle: "Socket.io, React, Node.js, MongoDB & Docker",
      icon: Code2,
      badge: "Distributed Systems",
      action: () => scrollTo("projects"),
    },
    {
      id: "proj-campus",
      category: "Projects",
      title: "CampusConnect - Student Hub",
      subtitle: "Academic notes, events & student collaboration portal",
      icon: Compass,
      badge: "Full Stack",
      action: () => scrollTo("projects"),
    },
    {
      id: "proj-vessel",
      category: "Projects",
      title: "Coastal Small Vessel Detection",
      subtitle: "Maritime computer vision with YOLOv8 & OpenCV",
      icon: FolderGit2,
      badge: "Computer Vision",
      action: () => scrollTo("projects"),
    },
    {
      id: "proj-trip",
      category: "Projects",
      title: "AI Trip Planner - Itinerary Engine",
      subtitle: "Generative AI multi-day itinerary synthesis",
      icon: Sparkles,
      badge: "GenAI",
      action: () => scrollTo("projects"),
    },

    // Skills
    {
      id: "skill-python",
      category: "Skills & Tech",
      title: "Python (AI/ML Core)",
      subtitle: "Primary programming language for deep learning & systems",
      icon: Code2,
      badge: "Advanced",
      action: () => scrollTo("skills"),
    },
    {
      id: "skill-unet",
      category: "Skills & Tech",
      title: "U-Net & Medical Segmentation",
      subtitle: "MRI brain lesion segmentation architecture",
      icon: Brain,
      badge: "Core Focus",
      action: () => scrollTo("skills"),
    },
    {
      id: "skill-qcnn",
      category: "Skills & Tech",
      title: "Quantum ML (QCNN)",
      subtitle: "Quantum-inspired convolutional neural network research",
      icon: Sparkles,
      badge: "Specialization",
      action: () => scrollTo("skills"),
    },
    {
      id: "skill-react",
      category: "Skills & Tech",
      title: "React.js & Next.js",
      subtitle: "Modern responsive web applications & front-end interfaces",
      icon: Code2,
      badge: "Proficient",
      action: () => scrollTo("skills"),
    },
    {
      id: "skill-sql",
      category: "Skills & Tech",
      title: "SQL & Relational Databases",
      subtitle: "Enterprise database schema modeling & query optimization",
      icon: Compass,
      badge: "Advanced",
      action: () => scrollTo("skills"),
    },
    {
      id: "skill-docker",
      category: "Skills & Tech",
      title: "Docker & Containerization",
      subtitle: "Containerized deployment pipelines & microservices",
      icon: Terminal,
      badge: "Hands-on",
      action: () => scrollTo("skills"),
    },

    // Quick Actions
    {
      id: "act-resume",
      category: "Quick Actions",
      title: "Download Verified Resume",
      subtitle: "Official PDF with academic credentials & project history",
      icon: FileText,
      badge: "PDF",
      action: () => {
        window.open("/resume.pdf", "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "act-toggle-leaves",
      category: "Quick Actions",
      title: "Toggle Falling Leaves 🍂",
      subtitle: "Pause or resume the autumn falling leaves animation",
      icon: Leaf,
      badge: "Animation",
      action: () => {
        window.dispatchEvent(new CustomEvent("toggle-falling-leaves"));
        setIsOpen(false);
      },
    },
    {
      id: "act-copy-email",
      category: "Quick Actions",
      title: copied ? "Email Copied to Clipboard!" : "Copy Sangmeshwar's Email",
      subtitle: "sangameshnaik471@gmail.com",
      icon: copied ? Check : Copy,
      badge: "Clipboard",
      action: handleCopyEmail,
    },
    {
      id: "act-github",
      category: "Quick Actions",
      title: "Open GitHub Profile",
      subtitle: "github.com/Sangmeshwar-Naik",
      icon: FaGithub,
      badge: "External",
      action: () => {
        window.open("https://github.com/Sangmeshwar-Naik", "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "act-linkedin",
      category: "Quick Actions",
      title: "Open LinkedIn Profile",
      subtitle: "Connect on LinkedIn",
      icon: FaLinkedin,
      badge: "External",
      action: () => {
        window.open("https://www.linkedin.com/in/sangmeshwar-naik-555828385", "_blank");
        setIsOpen(false);
      },
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase())) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      filteredItems[selectedIndex].action();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100000] flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Dialog */}
          <motion.div
            className="relative w-full max-w-2xl glass rounded-3xl border border-cyan-500/40 shadow-2xl shadow-cyan-500/25 bg-[#080918]/95 overflow-hidden flex flex-col max-h-[75vh]"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 relative">
              <Search size={18} className="text-cyan-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type a command, project, skill, or section..."
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none font-sans"
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 text-[10px] font-mono text-slate-400 border border-white/10">
                ESC
              </kbd>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white sm:hidden"
                aria-label="Close command palette"
              >
                <X size={18} />
              </button>
            </div>

            {/* Results List */}
            <div className="overflow-y-auto p-3.5 space-y-1.5 divide-y divide-white/[0.04]">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-slate-400 font-mono text-xs">
                  No commands or results matching &ldquo;{query}&rdquo;
                </div>
              ) : (
                filteredItems.map((item, index) => {
                  const Icon = item.icon;
                  const isSelected = index === selectedIndex;

                  return (
                    <button
                      key={item.id}
                      onClick={() => item.action()}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl text-left transition-all cursor-pointer ${
                        isSelected
                          ? "bg-cyan-500/15 border border-cyan-500/40 text-white"
                          : "text-slate-300 hover:bg-white/[0.04] border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <div
                          className={`w-9.5 h-9.5 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-colors ${
                            isSelected
                              ? "bg-cyan-500/25 text-cyan-300"
                              : "bg-white/[0.05] text-slate-400"
                          }`}
                        >
                          <Icon size={17} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-bold truncate">
                            {item.title}
                          </p>
                          {item.subtitle && (
                            <p className="text-[11px] text-slate-400 truncate font-mono">
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {item.badge && (
                          <span className="text-[10px] font-mono uppercase font-semibold px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                            {item.badge}
                          </span>
                        )}
                        <span className="text-[10px] font-mono text-slate-500">
                          {item.category}
                        </span>
                        {isSelected && (
                          <ArrowRight size={13} className="text-cyan-400 animate-pulse ml-1" />
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Guidance */}
            <div className="px-5 py-3 border-t border-white/10 bg-black/40 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <div className="flex items-center gap-4">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              <span className="text-cyan-400 font-medium">Sangmeshwar Naik • Portfolio OS</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
