"use client";

import { useRef, useState, useMemo } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import CircularCarousel from "./CircularCarousel";

const TechText = dynamic(() => import("./TechText"), { ssr: false });
import {
  ExternalLink,
  X,
  ArrowUpRight,
  Brain,
  Atom,
  Eye,
  MessageSquare,
  Building2,
  Compass,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

export interface ProjectData {
  id: string;
  title: string;
  category: "AI & Medical" | "Computer Vision" | "Conversational AI" | "Full Stack & Mobile" | "Quantum AI";
  badge: string;
  featured: boolean;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  keyFeatures: string[];
  githubUrl: string;
  liveUrl?: string;
  gradient: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  date: string;
  image: string;
}

const projectsList: ProjectData[] = [
  {
    id: "quantum-brain-tumor",
    title: "Hybrid Quantum AI for Brain Tumor Analysis",
    category: "Quantum AI",
    badge: "Medical AI & Research",
    featured: true,
    shortDescription:
      "Medical imaging system combining brain MRI analysis, U-Net tumor segmentation, and quantum-inspired convolutional neural network (QCNN) classification.",
    fullDescription:
      "A breakthrough medical AI application designed to support radiologists and clinical specialists in early brain tumor detection. The architecture integrates a high-precision U-Net segmentation pipeline to isolate lesions from MRI scans, coupled with a hybrid Quantum Convolutional Neural Network (QCNN) implemented in PyTorch for heightened classification accuracy.",
    technologies: ["Python", "PyTorch", "U-Net", "QCNN", "Deep Learning", "Computer Vision"],
    keyFeatures: [
      "High-resolution brain MRI scan upload & preprocessing",
      "Automated lesion segmentation using custom U-Net architecture",
      "Quantum-inspired CNN classification of tumor types",
      "Interactive confidence score & heatmap visualization",
      "Dual interface tailored for patient review and clinician diagnosis",
    ],
    githubUrl: "https://github.com/Sangmeshwar-Naik",
    liveUrl: "https://github.com/Sangmeshwar-Naik",
    gradient: "from-cyan-500 via-blue-600 to-purple-600",
    icon: Atom,
    date: "2026",
    image: "/projects/brain-tumor-ai.jpg",
  },
  {
    id: "campus-connect",
    title: "CampusConnect - Smart Campus Service Request Platform",
    category: "Full Stack & Mobile",
    badge: "Enterprise Mobile",
    featured: true,
    shortDescription:
      "Cross-platform platform (React Native, Expo) with Node.js/Express API and PostgreSQL for centralized campus service request workflows.",
    fullDescription:
      "An end-to-end mobile and API ecosystem solving administrative fragmentation across educational campuses. Features multi-tenant role-based access for students, departmental staff, and administrators with live status tracking, push notifications, and automated escalation.",
    technologies: ["React Native", "Expo", "Node.js", "Express.js", "PostgreSQL", "Docker", "REST APIs"],
    keyFeatures: [
      "Role-based authentication & permissions (Student / Staff / Admin)",
      "Real-time ticket logging with image attachments & geo-tagging",
      "Automated request assignment and state progression lifecycle",
      "Administrative analytics dashboard with PostgreSQL query optimization",
      "Dockerized container deployment for reliable service hosting",
    ],
    githubUrl: "https://github.com/Sangmeshwar-Naik",
    liveUrl: "https://github.com/Sangmeshwar-Naik",
    gradient: "from-purple-500 via-indigo-600 to-cyan-500",
    icon: Building2,
    date: "October 2026",
    image: "/projects/campus-connect.jpg",
  },
  {
    id: "boat-ship-detection",
    title: "Boat & Ship Detection in Coastal Areas Using Ground-Level Images",
    category: "Computer Vision",
    badge: "Computer Vision",
    featured: true,
    shortDescription:
      "YOLO and CNN-based computer vision system to automatically detect and classify marine vessels from camera and satellite feeds with bounding boxes.",
    fullDescription:
      "Engineered an automated coastal surveillance intelligence model to assist harbor authorities and maritime conservationists. Evaluates ground-level marine camera streams and satellite imagery, utilizing advanced data augmentation and YOLO/CNN object detection with real-time confidence scores.",
    technologies: ["Python", "YOLO", "OpenCV", "CNN", "PyTorch", "Computer Vision"],
    keyFeatures: [
      "Real-time multi-class maritime vessel detection & tracking",
      "High precision bounding box localization with confidence thresholding",
      "Robust image preprocessing pipeline for varied weather & wave conditions",
      "Satellite and ground-level footage ingestion pipeline",
      "Edge-optimized inference for coastal surveillance towers",
    ],
    githubUrl: "https://github.com/Sangmeshwar-Naik",
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    icon: Eye,
    date: "Aug 2025 – Jan 2026",
    image: "/projects/coastal-vessel.jpg",
  },
  {
    id: "mental-health-chatbot",
    title: "AI-Powered Mental Health Chatbot",
    category: "Conversational AI",
    badge: "NLP & Wellness",
    featured: false,
    shortDescription:
      "Conversational AI agent using Python, NLP, and TensorFlow for empathetic wellness support with interactive meditation and cognitive exercises.",
    fullDescription:
      "An intelligent conversational wellness companion built with transformer-based NLP and sentiment classification. The bot detects sentiment shifts, provides evidence-based coping exercises, guides users through calming meditation routines, and provides interactive wellness games.",
    technologies: ["Python", "TensorFlow", "NLP", "Flask", "NLTK", "Scikit-learn"],
    keyFeatures: [
      "Sentiment-aware conversational flow and emotion classification",
      "Integrated guided meditation and breathing exercises",
      "Interactive cognitive well-being games and prompts",
      "Crisis keyword safety detection with helpline redirection",
      "Privacy-first anonymous conversation architecture",
    ],
    githubUrl: "https://github.com/Sangmeshwar-Naik",
    gradient: "from-pink-500 via-purple-600 to-indigo-600",
    icon: MessageSquare,
    date: "Nov 2025 – Dec 2025",
    image: "/projects/mental-health-ai.jpg",
  },
  {
    id: "qcnn-classification",
    title: "QCNN Quantum Neural Network Image Classifier",
    category: "Quantum AI",
    badge: "Quantum Research",
    featured: false,
    shortDescription:
      "Experimental Quantum Convolutional Neural Network leveraging parameterized quantum circuits for complex feature representation.",
    fullDescription:
      "Research exploration applying quantum mechanics principles—including entanglement and superposition—to computer vision. Simulates parameterized quantum circuits functioning as convolutional kernels for multi-class classification benchmark datasets.",
    technologies: ["Python", "PyTorch", "PennyLane", "Quantum Circuits", "QCNN"],
    keyFeatures: [
      "Parameterized quantum variational circuit implementation",
      "Hybrid classical-quantum gradient backpropagation",
      "Comparative benchmark analysis against classical CNN baselines",
      "Qubit state evolution visualizer",
    ],
    githubUrl: "https://github.com/Sangmeshwar-Naik",
    gradient: "from-cyan-500 via-teal-500 to-emerald-500",
    icon: Atom,
    date: "2026",
    image: "/projects/qcnn-classifier.jpg",
  },
  {
    id: "realtime-chat-app",
    title: "Full-Stack Real-Time Chat Application",
    category: "Full Stack & Mobile",
    badge: "WebSockets & Microservices",
    featured: false,
    shortDescription:
      "Full-stack instant messaging platform with React, Node.js, MongoDB, Socket.io, JWT authentication, and Docker containerization.",
    fullDescription:
      "A production-grade real-time collaboration application featuring bidirectional WebSocket channels, persistent chat histories, online presence broadcasting, typing indicators, and token-based access security wrapped in Docker containers.",
    technologies: ["React.js", "Node.js", "MongoDB", "Socket.io", "Express.js", "Docker", "JWT"],
    keyFeatures: [
      "Sub-millisecond bidirectional messaging powered by Socket.io",
      "Live user presence tracking & dynamic typing indicators",
      "Secure JWT authentication with encrypted message persistence",
      "Responsive glassmorphic UI with dark-mode aesthetic",
      "Dockerized container setup with automated restart policies",
    ],
    githubUrl: "https://github.com/Sangmeshwar-Naik",
    gradient: "from-emerald-500 via-cyan-500 to-blue-500",
    icon: MessageCircle,
    date: "2025",
    image: "/projects/realtime-chat.jpg",
  },
  {
    id: "ai-trip-planner",
    title: "AI Trip Planner - Intelligent Itinerary Engine",
    category: "Conversational AI",
    badge: "GenAI & Automation",
    featured: false,
    shortDescription:
      "AI-driven travel planning application generating personalized day-by-day itineraries based on user constraints, budget, and travel preferences.",
    fullDescription:
      "Streamlines travel research by synthesizing location data, budgets, and personalized interests into comprehensive travel schedules. Uses algorithmic scoring to recommend balanced sights, cuisine, and logistics.",
    technologies: ["Python", "NLP", "React", "REST APIs", "Flask"],
    keyFeatures: [
      "Customized day-wise itinerary synthesis based on traveler profile",
      "Budget estimation & landmark grouping algorithms",
      "Automated suggestions for cultural, culinary, and scenic spots",
      "Interactive trip plan export and sharing",
    ],
    githubUrl: "https://github.com/Sangmeshwar-Naik",
    gradient: "from-amber-500 via-orange-600 to-pink-500",
    icon: Compass,
    date: "2025",
    image: "/projects/ai-trip-planner.jpg",
  },
];

export default function Projects() {
  const containerRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  const categories = ["All", "Quantum AI", "Computer Vision", "Conversational AI", "Full Stack & Mobile"];

  const filteredProjects =
    !filterCategory || filterCategory === "All"
      ? projectsList
      : projectsList.filter((p) => p.category === filterCategory);

  const carouselItems = useMemo(
    () =>
      projectsList.map((project) => ({
        src: project.image,
        alt: project.title,
        title: project.title,
        subtitle: project.badge,
        project: project,
      })),
    []
  );

  return (
    <section id="projects" className="relative w-full py-28 sm:py-36 md:py-40 scroll-mt-24 sm:scroll-mt-28 overflow-hidden flex justify-center">
      {/* Background Lighting */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div ref={containerRef} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="w-full flex flex-col items-center justify-center text-center mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full glass border border-pink-500/30 text-xs font-semibold text-pink-300 mb-4 mx-auto">
            <Sparkles size={13} className="text-pink-400" />
            Verified Portfolio Work
          </div>
          <h2 className="sr-only">Projects That Make An Impact</h2>
          <div className="w-full max-w-5xl mx-auto h-[65px] sm:h-[85px] md:h-[105px] relative flex items-center justify-center text-center">
            <TechText
              text="Projects That Make An Impact"
              highlightText="Impact"
              fontWeight={900}
              fontSize={72}
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
            Real-world systems, AI architectures, and full-stack solutions built with modern toolchains.
          </p>
        </motion.div>

        {/* Category Filters - Refined Rounded Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-14">
          {categories.map((cat) => {
            const count =
              cat === "All"
                ? projectsList.length
                : projectsList.filter((p) => p.category === cat).length;
            const isActive = filterCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setFilterCategory(filterCategory === cat ? null : cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-md ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-cyan-500/25 scale-105"
                    : "glass border border-white/10 text-slate-300 hover:text-white hover:border-white/20"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-white/5 text-slate-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Continuous 3D Circular Rotating Carousel Showcase - Spacious Rounded Box */}
        <motion.div
          className="mb-14 relative w-full rounded-3xl glass border border-white/10 p-5 sm:p-7 overflow-hidden bg-[#070818]/80 shadow-2xl backdrop-blur-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Showcase Control Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 px-2">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-sm shadow-cyan-400" />
              <span className="text-xs sm:text-sm font-bold text-white tracking-wider uppercase font-mono">
                3D Continuous Project Radar
              </span>
            </div>
            <span className="text-xs text-slate-400 font-mono text-center sm:text-right">
              ✦ Rotates continuously • Drag to spin or click any card to open full details
            </span>
          </div>

          {/* 3D Circular Rotating Cylinder Container */}
          <div style={{ width: "100%", height: "560px", position: "relative" }}>
            <CircularCarousel
              items={carouselItems}
              preset="cylinder"
              intro="rise"
              cardWidth={220}
              aspectRatio={1}
              speed={14}
              captions={true}
              gap={25}
              tilt={-5}
              curve={1}
              perspective={2500}
              autoplay="drift"
              interval={3}
              direction="left"
              momentum={0.6}
              snap
              pauseOnHover
              focusOnClick
              draggable
              parallax={0.3}
              stretch={0.5}
              fadeColor="#000000"
              depthFade={0.55}
              innerShade={0.6}
              cornerRadius={12}
              onItemClick={(item) => {
                if (item.project) {
                  setSelectedProject(item.project);
                }
              }}
            />
          </div>
        </motion.div>

        {/* Detailed Project Specifications Grid - Only Shown When a Filter Category is Clicked */}
        <AnimatePresence>
          {filterCategory && (
            <motion.div
              key="filtered-specifications"
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="mt-6 mb-12"
            >
              {/* Section Sub-heading with Interactive Close Control */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Layers size={17} />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                      <span>{filterCategory === "All" ? "All Project Specifications" : `${filterCategory} Projects`}</span>
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      Showing {filteredProjects.length} matching {filteredProjects.length === 1 ? "system" : "systems"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setFilterCategory(null)}
                  className="text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 px-4 py-2 rounded-xl glass border border-white/15 hover:border-cyan-400/40 transition-all cursor-pointer shadow-sm hover:bg-white/5"
                  title="Close and hide detailed project specifications"
                >
                  <X size={14} className="text-cyan-400" />
                  <span>Hide Results</span>
                </button>
              </div>

              {/* Projects Cards Grid - Spacious Rounded Boxes */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
                {filteredProjects.map((project, idx) => {
                  const Icon = project.icon;
                  return (
                    <motion.div
                      key={project.id}
                      className="group relative rounded-2xl sm:rounded-3xl glass border border-white/10 overflow-hidden flex flex-col justify-between hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/15 transition-all duration-300 bg-[#070818]/90 backdrop-blur-xl"
                      initial={{ opacity: 0, y: 35 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.15 }}
                      transition={{ duration: 0.6, delay: idx * 0.08 }}
                      whileHover={{ y: -6 }}
                    >
                      {/* Subtle corner ambient glow */}
                      <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-500/5 rounded-3xl blur-2xl group-hover:bg-cyan-500/20 transition-all pointer-events-none" />

                      {/* Visual Header Banner with Project Image */}
                      <div>
                        <div className="h-52 relative overflow-hidden bg-[#060714]">
                          {/* Project Imagery */}
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#080816] via-[#080816]/30 to-transparent" />
                          <div className="absolute inset-0 bg-[#060714]/15 backdrop-blur-[0.5px]" />

                          {/* Top Badges */}
                          <div className="relative z-10 flex items-center justify-between p-4.5">
                            <span className="px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-semibold text-cyan-300 border border-white/15 shadow-lg">
                              {project.badge}
                            </span>
                            {project.featured && (
                              <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold tracking-wider uppercase border border-amber-400/30 backdrop-blur-md shadow-lg">
                                Featured
                              </span>
                            )}
                          </div>

                          {/* Central/Bottom Icon & Date */}
                          <div className="absolute bottom-3.5 left-4.5 right-4.5 z-10 flex items-center justify-between">
                            <div className="w-11 h-11 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-cyan-400 shadow-xl group-hover:scale-110 transition-transform">
                              <Icon size={22} />
                            </div>
                            <span className="text-xs text-slate-200/90 font-mono font-medium px-3.5 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md">
                              {project.date}
                            </span>
                          </div>
                        </div>

                        {/* Body Content with generous breathing room */}
                        <div className="p-7 sm:p-8">
                          <h3 className="text-xl sm:text-[22px] font-bold text-white group-hover:text-cyan-300 transition-colors mb-3 leading-snug">
                            {project.title}
                          </h3>

                          <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed mb-6">
                            {project.shortDescription}
                          </p>

                          {/* Tech Badges with Refined Rounded Boxes */}
                          <div className="flex flex-wrap gap-2 mb-2">
                            {project.technologies.slice(0, 4).map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-white/[0.04] border border-white/10 text-slate-300 hover:border-cyan-400/30 transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 4 && (
                              <span className="px-2.5 py-1 rounded-xl text-xs font-mono font-medium bg-white/[0.02] text-slate-400 border border-white/5">
                                +{project.technologies.length - 4}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Card Actions Footer */}
                      <div className="px-7 sm:px-8 pb-7 pt-4 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-300 hover:text-white hover:border-cyan-400/50 transition-all shadow-sm"
                            aria-label="GitHub Repository"
                          >
                            <FaGithub size={18} />
                          </a>
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 transition-all shadow-sm"
                              aria-label="Live Demo"
                            >
                              <ExternalLink size={17} />
                            </a>
                          )}
                        </div>

                        <button
                          onClick={() => setSelectedProject(project)}
                          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/btn cursor-pointer py-2 px-3.5 rounded-xl hover:bg-cyan-500/10 shadow-sm"
                        >
                          <span>Inspect Details</span>
                          <ArrowUpRight size={15} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View All on GitHub Banner */}
        <div className="text-center mt-16">
          <motion.a
            href="https://github.com/Sangmeshwar-Naik"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl glass border border-white/10 text-sm font-semibold text-white hover:border-cyan-500/50 hover:text-cyan-300 transition-all shadow-xl"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <FaGithub size={18} />
            <span>Explore All Repositories on GitHub</span>
            <ArrowUpRight size={16} />
          </motion.a>
        </div>
      </div>

      {/* Interactive Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
              onClick={() => setSelectedProject(null)}
            />

            <motion.div
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass rounded-3xl border border-white/15 p-7 sm:p-9 shadow-2xl z-10"
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-xl glass text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Modal Project Image Banner */}
              <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden mb-6 border border-white/15 shadow-xl bg-[#060714]">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080816] via-transparent to-black/40" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 backdrop-blur-md shadow-sm">
                    {selectedProject.badge}
                  </span>
                  {selectedProject.featured && (
                    <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold tracking-wider uppercase border border-amber-400/30 backdrop-blur-md shadow-sm">
                      Featured
                    </span>
                  )}
                </div>
                <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs text-slate-300 font-mono bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
                  <Calendar size={13} className="text-cyan-400" />
                  <span>{selectedProject.date}</span>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
                {selectedProject.title}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                {selectedProject.fullDescription}
              </p>

              {/* Key Features */}
              <div className="mb-6">
                <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-3 flex items-center gap-1.5">
                  <Layers size={14} className="text-purple-400" />
                  Key Implementations &amp; Features
                </h4>
                <div className="space-y-2">
                  {selectedProject.keyFeatures.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 size={16} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Used */}
              <div className="mb-8">
                <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-3">
                  Technologies &amp; Libraries
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/[0.04] border border-white/10 text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[160px] py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-white glass hover:border-cyan-400/50 flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <FaGithub size={16} />
                  <span>View Source Code</span>
                </a>
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[160px] py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
                  >
                    <span>Open Project Page</span>
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
