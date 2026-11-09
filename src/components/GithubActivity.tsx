"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  GitBranch,
  Star,
  GitFork,
  ExternalLink,
  Code2,
  FolderGit2,
  Sparkles,
  Terminal,
  Copy,
  Check,
  Cpu,
  Layers,
  ChevronRight,
  FileCode2,
  Play,
  Atom,
  Brain,
  Radio,
  Workflow,
  Zap,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

// Dynamically import WebGL2 LaserFlow liquid fog simulation
const LaserFlow = dynamic(() => import("./LaserFlow"), {
  ssr: false,
});

// Dynamically import 3D Physics CardSwap interactive stack
const CardSwap = dynamic(() => import("./CardSwap"), {
  ssr: false,
});
import { Card } from "./CardSwap";

interface RepoItem {
  id: string;
  name: string;
  title: string;
  domain: string;
  description: string;
  language: string;
  languageColor: string;
  tags: string[];
  url: string;
  branch: string;
  stars: number;
  forks: number;
  cloneCmd: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  pipelineSteps: { title: string; detail: string; status: "success" | "active" | "queued" }[];
  metrics: { label: string; value: string; color: string }[];
}

const repositories: RepoItem[] = [
  {
    id: "quantum-tumor",
    name: "Hybrid-Quantum-AI-Brain-Tumor",
    title: "Hybrid Quantum AI for Brain Tumor Analysis",
    domain: "Quantum Machine Learning & Medical Imaging",
    description:
      "Deep learning MRI lesion segmentation with custom U-Net architecture coupled with a quantum-inspired convolutional neural network (QCNN) classifier.",
    language: "Python",
    languageColor: "#3776AB",
    tags: ["Quantum-ML", "U-Net", "PyTorch", "QCNN", "Medical-AI"],
    url: "https://github.com/Sangmeshwar-Naik",
    branch: "main",
    stars: 18,
    forks: 6,
    cloneCmd: "git clone https://github.com/Sangmeshwar-Naik/Hybrid-Quantum-AI-Brain-Tumor.git",
    icon: Atom,
    pipelineSteps: [
      { title: "MRI Preprocessing", detail: "CLAHE contrast enhancement & skull stripping", status: "success" },
      { title: "U-Net Segmentation", detail: "Isolating tumor mask with 0.94 Dice coefficient", status: "success" },
      { title: "QCNN Circuit", detail: "Quantum parameter encoding & classification", status: "active" },
    ],
    metrics: [
      { label: "Dice Score", value: "94.2%", color: "#00f5ff" },
      { label: "QCNN Accuracy", value: "96.8%", color: "#a855f7" },
      { label: "Inference", value: "32ms", color: "#10b981" },
    ],
  },
  {
    id: "campus-connect",
    name: "CampusConnect-Smart-Campus",
    title: "CampusConnect - Smart Campus Service Management",
    domain: "Enterprise Full Stack & Mobile",
    description:
      "Centralized cross-platform service request management ecosystem with React Native, Expo, Node.js, Express, and PostgreSQL role-based workflows.",
    language: "TypeScript",
    languageColor: "#3178C6",
    tags: ["React Native", "Expo", "PostgreSQL", "Docker", "REST API"],
    url: "https://github.com/Sangmeshwar-Naik",
    branch: "main",
    stars: 14,
    forks: 4,
    cloneCmd: "git clone https://github.com/Sangmeshwar-Naik/CampusConnect-Smart-Campus.git",
    icon: Workflow,
    pipelineSteps: [
      { title: "Mobile Client", detail: "Expo Native client with role-based auth", status: "success" },
      { title: "Express REST API", detail: "Ticket state progression & push triggers", status: "success" },
      { title: "PostgreSQL Pooling", detail: "Sub-10ms query execution with indexed schemas", status: "active" },
    ],
    metrics: [
      { label: "Latency", value: "<12ms", color: "#00f5ff" },
      { label: "Uptime", value: "99.9%", color: "#10b981" },
      { label: "Platforms", value: "iOS / Android", color: "#a855f7" },
    ],
  },
  {
    id: "coastal-vessel",
    name: "Coastal-Vessel-Detection-YOLO",
    title: "Coastal Vessel Detection & Maritime Surveillance",
    domain: "Computer Vision & Edge Detection",
    description:
      "Automated ship and boat detection computer vision pipeline from satellite imagery and optical camera streams using YOLOv8 and convolutional feature maps.",
    language: "Python",
    languageColor: "#3776AB",
    tags: ["YOLOv8", "PyTorch", "OpenCV", "Satellite-AI", "CNN"],
    url: "https://github.com/Sangmeshwar-Naik",
    branch: "main",
    stars: 16,
    forks: 5,
    cloneCmd: "git clone https://github.com/Sangmeshwar-Naik/Coastal-Vessel-Detection-YOLO.git",
    icon: Zap,
    pipelineSteps: [
      { title: "Satellite Feed Preprocessing", detail: "Multi-spectral GeoTIFF tile extraction", status: "success" },
      { title: "YOLOv8 Object Detection", detail: "Real-time maritime bounding box regression", status: "active" },
      { title: "Edge Telemetry", detail: "Live ship tracking coordinates & alerts", status: "queued" },
    ],
    metrics: [
      { label: "mAP@0.5", value: "91.4%", color: "#00f5ff" },
      { label: "FPS Rate", value: "48 FPS", color: "#f59e0b" },
      { label: "Model", value: "YOLOv8 Custom", color: "#a855f7" },
    ],
  },
  {
    id: "mental-health",
    name: "Mental-Health-AI-Companion",
    title: "Mental Health AI Chatbot & Companion",
    domain: "Conversational NLP & Wellness",
    description:
      "Conversational AI application engineered to provide empathetic wellness dialog, sentiment analysis, and personalized therapeutic exercises.",
    language: "Python",
    languageColor: "#3776AB",
    tags: ["NLP", "TensorFlow", "Flask", "NLTK", "Sentiment Analysis"],
    url: "https://github.com/Sangmeshwar-Naik",
    branch: "main",
    stars: 12,
    forks: 3,
    cloneCmd: "git clone https://github.com/Sangmeshwar-Naik/Mental-Health-AI-Companion.git",
    icon: Brain,
    pipelineSteps: [
      { title: "Text Tokenization", detail: "Stemming, lemmatization & stopword cleaning", status: "success" },
      { title: "Intent Classifier", detail: "Multi-class softmax sentiment neural network", status: "active" },
      { title: "Therapy Engine", detail: "Empathetic contextual dialogue generator", status: "success" },
    ],
    metrics: [
      { label: "Intent Accuracy", value: "95.1%", color: "#00f5ff" },
      { label: "Response Time", value: "<80ms", color: "#10b981" },
      { label: "Framework", value: "TensorFlow", color: "#ec4899" },
    ],
  },
  {
    id: "realtime-chat",
    name: "Realtime-Chat-Application",
    title: "Real-time Collaboration & Messaging Platform",
    domain: "WebSockets & Distributed Systems",
    description:
      "Bi-directional instant messaging system with persistent room channels, typing indicators, MongoDB message persistence, and Docker containerization.",
    language: "JavaScript",
    languageColor: "#F7DF1E",
    tags: ["Socket.io", "React", "Node.js", "MongoDB", "Docker"],
    url: "https://github.com/Sangmeshwar-Naik",
    branch: "main",
    stars: 11,
    forks: 2,
    cloneCmd: "git clone https://github.com/Sangmeshwar-Naik/Realtime-Chat-Application.git",
    icon: Radio,
    pipelineSteps: [
      { title: "Handshake & Auth", detail: "JWT session handshake on WebSocket upgrade", status: "success" },
      { title: "Channel Scoping", detail: "Bi-directional room broadcasting with Socket.io", status: "active" },
      { title: "Async Persistence", detail: "MongoDB message history streaming with indexing", status: "success" },
    ],
    metrics: [
      { label: "Roundtrip", value: "<5ms", color: "#00f5ff" },
      { label: "Persistence", value: "MongoDB", color: "#10b981" },
      { label: "Containers", value: "Dockerized", color: "#a855f7" },
    ],
  },
  {
    id: "ai-trip",
    name: "AI-Trip-Planner",
    title: "Autonomous AI Trip & Itinerary Planner",
    domain: "Generative AI & Recommender Engines",
    description:
      "Intelligent travel itinerary generator creating personalized multi-day route plans with automated geographic clustering and budget planning.",
    language: "Python",
    languageColor: "#3776AB",
    tags: ["FastAPI", "OpenAI APIs", "Pandas", "GeoPy", "Python"],
    url: "https://github.com/Sangmeshwar-Naik",
    branch: "main",
    stars: 10,
    forks: 2,
    cloneCmd: "git clone https://github.com/Sangmeshwar-Naik/AI-Trip-Planner.git",
    icon: Code2,
    pipelineSteps: [
      { title: "Preference Extraction", detail: "Parsing user budget, timeline & travel style", status: "success" },
      { title: "Geo-Clustering", detail: "K-means spatial route optimization with GeoPy", status: "active" },
      { title: "Itinerary Synthesis", detail: "Generative daily activity plan generation", status: "success" },
    ],
    metrics: [
      { label: "Route Speed", value: "1.2s", color: "#00f5ff" },
      { label: "API Engine", value: "FastAPI", color: "#10b981" },
      { label: "Heuristics", value: "GeoClustering", color: "#a855f7" },
    ],
  },
];

export default function GithubActivity() {
  const containerRef = useRef(null);
  const telemetryBarRef = useRef<HTMLDivElement>(null);

  const [selectedRepoId, setSelectedRepoId] = useState<string>("quantum-tumor");
  const [copied, setCopied] = useState(false);
  const [activeCodeLine, setActiveCodeLine] = useState(0);
  const [laserColor, setLaserColor] = useState<string>("#3847ff");
  const [repoViewMode, setRepoViewMode] = useState<"stack" | "grid">("stack");

  const selectedRepo =
    repositories.find((r) => r.id === selectedRepoId) || repositories[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCodeLine((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = (text: string) => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const SelectedIcon = selectedRepo.icon;

  return (
    <section
      id="github"
      className="relative w-full py-28 sm:py-36 md:py-40 scroll-mt-24 sm:scroll-mt-28 overflow-hidden flex justify-center"
    >
      {/* Dynamic Animated Ambient Orbs & Holographic Grid Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-48 w-[350px] h-[350px] sm:w-[550px] sm:h-[550px] bg-cyan-500/10 rounded-full blur-2xl sm:blur-3xl pointer-events-none transform-gpu will-change-transform"
          animate={{ scale: [1, 1.25, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-48 w-[350px] h-[350px] sm:w-[550px] sm:h-[550px] bg-purple-500/10 rounded-full blur-2xl sm:blur-3xl pointer-events-none transform-gpu will-change-transform"
          animate={{ scale: [1.25, 1, 1.25], opacity: [0.12, 0.28, 0.12] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        {/* Futuristic Cyber Circuit Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#00f5ff_1px,transparent_1px)] [background-size:32px_32px] opacity-15" />
      </div>

      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none glass border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-4 shadow-lg shadow-cyan-500/10">
            <FaGithub size={13} className="text-cyan-400" />
            Interactive Codebase Radar
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            GitHub <span className="text-gradient">Activity &amp; Codebases</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Live interactive neural pipeline simulations, repository architecture diagnostics, and production source trees.
          </p>
        </motion.div>

        {/* Flowing Laser Fog HUD Indicator & Color Spectrum Selector */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 px-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-none h-2.5 w-2.5 bg-cyan-500" />
            </span>
            <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
              Corner Liquid Fog Stream Active
            </span>
            <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
              • Inflowing from Right Corner
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span className="text-slate-400 text-[11px] mr-1 hidden sm:inline">Liquid Fog Aura:</span>
            <button
              onClick={() => setLaserColor("#3847ff")}
              className={`px-2.5 py-1 rounded-none text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                laserColor === "#3847ff"
                  ? "bg-blue-600/25 text-blue-300 border border-blue-500/50 shadow-md shadow-blue-500/20 scale-105"
                  : "bg-white/[0.04] text-slate-400 hover:text-white border border-white/10"
              }`}
              title="Cobalt Laser Blue Flow"
            >
              <span className="w-1.5 h-1.5 rounded-none bg-[#3847ff]" />
              <span>Cobalt Blue</span>
            </button>
            <button
              onClick={() => setLaserColor("#00f5ff")}
              className={`px-2.5 py-1 rounded-none text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                laserColor === "#00f5ff"
                  ? "bg-cyan-500/25 text-cyan-300 border border-cyan-400/50 shadow-md shadow-cyan-500/20 scale-105"
                  : "bg-white/[0.04] text-slate-400 hover:text-white border border-white/10"
              }`}
              title="Cyber Neon Cyan Flow"
            >
              <span className="w-1.5 h-1.5 rounded-none bg-[#00f5ff]" />
              <span>Neon Cyan</span>
            </button>
            <button
              onClick={() => setLaserColor("#a855f7")}
              className={`px-2.5 py-1 rounded-none text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                laserColor === "#a855f7"
                  ? "bg-purple-600/25 text-purple-300 border border-purple-500/50 shadow-md shadow-purple-500/20 scale-105"
                  : "bg-white/[0.04] text-slate-400 hover:text-white border border-white/10"
              }`}
              title="Quantum Purple Flow"
            >
              <span className="w-1.5 h-1.5 rounded-none bg-[#a855f7]" />
              <span>Purple</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* FUTURISTIC QUANTUM RADAR HUD TELEMETRY BAR WITH LASER FLOW    */}
        {/* ============================================================== */}
        <div className="relative w-full mb-10">
          {/* Luminous Liquid Fog Laser Canopy flowing from the right corner down onto this section */}
          <div className="absolute -top-32 sm:-top-44 inset-x-0 -bottom-8 pointer-events-none z-20 overflow-hidden">
            <LaserFlow
              surfaceRef={telemetryBarRef}
              beamPosition={0.84}
              color={laserColor}
              intensity={1.8}
              flare={1.6}
              spread={1.8}
              spill={1.3}
              fog={0.4}
              dust={1.8}
              beamWidth={1.5}
              streaks={1.6}
              dots={1.2}
              pulse={1.5}
              speed={1.5}
              seed={3}
              mouseInteraction={true}
              intro={true}
            />
          </div>

          <motion.div
            ref={telemetryBarRef}
            className="rounded-none p-6 sm:p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 bg-[#070818]/90 backdrop-blur-xl relative overflow-hidden z-10"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            {/* Subtle Top Glowing Sweep line */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Left: Animated Holographic Radar Scanner */}
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-none glass border border-cyan-500/40 flex items-center justify-center bg-black/60 shadow-lg shadow-cyan-500/20 shrink-0">
                  {/* Radar Grid Rings */}
                  <div className="absolute inset-1 rounded-none border border-cyan-500/20" />
                  <div className="absolute inset-3 rounded-none border border-purple-500/25" />
                  <div className="w-1.5 h-1.5 rounded-none bg-cyan-400 animate-ping" />
                  {/* 360° Rotating Radar Sweep Line */}
                  <motion.div
                    className="absolute inset-0 rounded-none pointer-events-none"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-1/2 h-0.5 bg-gradient-to-r from-transparent to-cyan-400 absolute top-1/2 left-1/2 -translate-y-1/2 origin-left shadow-[0_0_8px_#00f5ff]" />
                  </motion.div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-cyan-300">
                      Live Telemetry Radar
                    </span>
                    <span className="w-2.5 h-2.5 rounded-none bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono text-emerald-400 uppercase font-semibold">
                      SYS_ACTIVE
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 font-mono mt-1">
                    Simulating active distributed neural clusters &amp; code pipelines
                  </p>
                </div>
              </div>

              {/* Right: Real-time Telemetry Metrics Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 w-full md:w-auto font-mono text-center">
                <div className="px-4.5 py-3 rounded-none bg-white/[0.04] border border-white/10">
                  <span className="text-[11px] text-slate-400 block uppercase font-medium">Cluster Repos</span>
                  <span className="text-sm sm:text-base font-bold text-cyan-300">6 Verified</span>
                </div>
                <div className="px-4.5 py-3 rounded-none bg-white/[0.04] border border-white/10">
                  <span className="text-[11px] text-slate-400 block uppercase font-medium">Pipeline Latency</span>
                  <span className="text-sm sm:text-base font-bold text-emerald-400">&lt; 14ms</span>
                </div>
                <div className="px-4.5 py-3 rounded-none bg-white/[0.04] border border-white/10">
                  <span className="text-[11px] text-slate-400 block uppercase font-medium">CI/CD Uptime</span>
                  <span className="text-sm sm:text-base font-bold text-purple-300">99.98%</span>
                </div>
                <div className="px-4.5 py-3 rounded-none bg-white/[0.04] border border-white/10">
                  <span className="text-[11px] text-slate-400 block uppercase font-medium">Branch Protocol</span>
                  <span className="text-sm sm:text-base font-bold text-amber-300">Main / Prod</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Animated Horizontal Repository Navigation Dock */}
        <div className="mb-10 overflow-x-auto pb-4 scrollbar-none">
          <div className="flex items-center gap-3 min-w-max mx-auto justify-start lg:justify-center px-2">
            {repositories.map((repo) => {
              const isSelected = repo.id === selectedRepoId;
              const Icon = repo.icon;
              return (
                <button
                  key={repo.id}
                  onClick={() => setSelectedRepoId(repo.id)}
                  className={`relative px-4 py-3 rounded-none border transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${
                    isSelected
                      ? "glass border-cyan-500/60 bg-cyan-500/15 text-white shadow-xl shadow-cyan-500/25 scale-105"
                      : "glass border-white/10 text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/[0.03]"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-none flex items-center justify-center transition-transform ${
                      isSelected ? "scale-110 text-cyan-400" : "text-slate-400"
                    }`}
                  >
                    <Icon size={16} />
                  </div>
                  <span className="text-xs font-bold font-mono whitespace-nowrap">
                    {repo.name.length > 20 ? `${repo.name.substring(0, 18)}...` : repo.name}
                  </span>
                  {isSelected && (
                    <motion.div
                      className="absolute -bottom-1 left-3 right-3 h-0.5 rounded-none bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
                      layoutId="active-dock-indicator"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN STAGE: Animated Holographic Project Command Console */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedRepo.id}
            initial={{ opacity: 0, scale: 0.95, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -25 }}
            transition={{ type: "spring", stiffness: 90, damping: 18 }}
            className="rounded-none p-6 sm:p-10 border border-cyan-500/35 shadow-2xl relative overflow-hidden mb-20 bg-[#070716]/95 backdrop-blur-2xl"
          >
            {/* Cyber Corner HUD Crosshairs */}
            <div className="absolute top-3 left-3 font-mono text-cyan-400/40 text-xs pointer-events-none">
              ┌──[SYS.EXEC]
            </div>
            <div className="absolute top-3 right-3 font-mono text-cyan-400/40 text-xs pointer-events-none">
              [HUD.ONLINE]──┐
            </div>
            <div className="absolute bottom-3 left-3 font-mono text-cyan-400/40 text-xs pointer-events-none">
              └──[DIAG.01]
            </div>
            <div className="absolute bottom-3 right-3 font-mono text-cyan-400/40 text-xs pointer-events-none">
              [PORT.3000]──┘
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10 pt-2">
              {/* Left Column: Repository Intelligence & Architecture */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-none text-xs font-bold uppercase tracking-wider bg-purple-500/15 text-purple-300 border border-purple-500/30">
                    {selectedRepo.domain}
                  </span>
                  <span className="px-2.5 py-1 rounded-none text-xs font-mono font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-none bg-cyan-400 animate-ping" />
                    <span>git: {selectedRepo.branch}</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
                    <SelectedIcon size={28} className="text-cyan-400 shrink-0 animate-pulse" />
                    <span>{selectedRepo.title}</span>
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {selectedRepo.description}
                  </p>
                </div>

                {/* Performance & Engineering Metrics Bar */}
                <div className="grid grid-cols-3 gap-3">
                  {selectedRepo.metrics.map((m, idx) => (
                    <motion.div
                      key={idx}
                      className="p-3.5 rounded-none bg-black/50 border border-white/10 text-center hover:border-cyan-500/40 transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider font-mono">
                        {m.label}
                      </span>
                      <span
                        className="text-lg font-mono font-black mt-0.5 block"
                        style={{ color: m.color }}
                      >
                        {m.value}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedRepo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-none text-xs font-mono font-semibold bg-white/[0.04] border border-white/10 text-slate-200 hover:border-cyan-500/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Interactive Copyable Clone Command */}
                <div className="p-3.5 rounded-none bg-black/70 border border-white/15 flex items-center justify-between gap-3 font-mono text-xs shadow-inner">
                  <div className="flex items-center gap-2 text-slate-400 overflow-hidden truncate">
                    <Terminal size={14} className="text-cyan-400 shrink-0" />
                    <span className="text-cyan-300 truncate">{selectedRepo.cloneCmd}</span>
                  </div>

                  <button
                    onClick={() => handleCopy(selectedRepo.cloneCmd)}
                    className="px-3 py-1.5 rounded-none bg-white/10 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer text-[11px]"
                  >
                    {copied ? (
                      <>
                        <Check size={12} className="text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-4 pt-2">
                  <a
                    href={selectedRepo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-none bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 transition-all cursor-pointer hover:scale-105"
                  >
                    <span>View Repository on GitHub</span>
                    <ExternalLink size={14} />
                  </a>

                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Star size={13} className="text-amber-400" />
                      <span className="font-bold text-white">{selectedRepo.stars}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <GitFork size={13} className="text-purple-400" />
                      <span className="font-bold text-white">{selectedRepo.forks}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Animated Neural & Execution Pipeline Visualizer */}
              <div className="lg:col-span-6">
                <div className="glass rounded-none border border-cyan-500/30 p-6 bg-[#080816]/95 relative shadow-2xl overflow-hidden">
                  {/* Chrome top bar */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-none bg-rose-500" />
                      <span className="w-2.5 h-2.5 rounded-none bg-amber-500" />
                      <span className="w-2.5 h-2.5 rounded-none bg-emerald-500" />
                      <span className="ml-2 font-mono text-[11px] text-slate-400">
                        pipeline_diagnostics.py
                      </span>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-none bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-none bg-emerald-400 animate-ping" />
                      <span>LIVE RUNTIME</span>
                    </span>
                  </div>

                  {/* Animated Pipeline Stage Flow with Energy Pulse Conduits */}
                  <div className="space-y-4 mb-6 relative">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                      Execution Stages &amp; Automated Pipeline:
                    </span>

                    {/* Connecting Vertical Energy Beam */}
                    <div className="absolute left-[22px] top-8 bottom-4 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-transparent opacity-30 pointer-events-none" />

                    {selectedRepo.pipelineSteps.map((step, idx) => {
                      const isActive = idx === activeCodeLine % 3;
                      return (
                        <motion.div
                          key={idx}
                          className={`p-3.5 rounded-none border transition-all duration-300 flex items-start gap-3 relative z-10 ${
                            isActive
                              ? "bg-cyan-500/15 border-cyan-500/50 shadow-lg shadow-cyan-500/20 scale-[1.02]"
                              : "bg-white/[0.02] border-white/5"
                          }`}
                        >
                          <div className="mt-0.5">
                            {step.status === "success" ? (
                              <div className="w-5 h-5 rounded-none bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.3)]">
                                <Check size={11} className="stroke-[3]" />
                              </div>
                            ) : (
                              <div className="w-5 h-5 rounded-none bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 animate-spin">
                                <Play size={10} />
                              </div>
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h5 className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                                <span>{step.title}</span>
                                {isActive && (
                                  <span className="text-[9px] px-1.5 py-0.2 rounded-none bg-cyan-400 text-slate-950 font-bold">
                                    PROCESSING
                                  </span>
                                )}
                              </h5>
                              <span className="text-[10px] font-mono uppercase text-slate-400">
                                Step 0{idx + 1}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-300 mt-0.5 font-mono">
                              {step.detail}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Live Streaming Console Logs with Blinking Terminal Cursor */}
                  <div className="p-3.5 rounded-none bg-black/90 border border-white/10 font-mono text-[11px] text-slate-300 space-y-1">
                    <p className="text-slate-500">
                      $ python -m {selectedRepo.name.toLowerCase().replace(/-/g, "_")}.run
                    </p>
                    <p className="text-cyan-400">
                      [INFO] Initializing {selectedRepo.language} runtime environment...
                    </p>
                    <p className="text-emerald-400">
                      [SUCCESS] Loaded model checkpoints &amp; dependencies OK
                    </p>
                    <p className="text-purple-300 flex items-center gap-1">
                      <span>[METRICS] Active cluster connected • Ready for production deployment</span>
                      <span className="w-1.5 h-3 bg-cyan-400 animate-pulse inline-block" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Animated Public Production Repositories with 3D Physics CardSwap */}
        <div className="mt-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none glass border border-purple-500/30 text-xs font-semibold text-purple-300 mb-2 shadow-sm shadow-purple-500/10">
                <Layers size={12} className="text-purple-400" />
                <span>Physics 3D Card Stack Architecture</span>
              </div>
              <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                All Public Production Repositories
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Drag, flick, or click cards to swap layers • Click Inspect Code to view source on GitHub
              </p>
            </div>

            {/* View Mode Switcher: 3D Stack vs Grid Matrix */}
            <div className="flex items-center gap-1.5 p-1 rounded-none glass border border-white/10 shrink-0">
              <button
                onClick={() => setRepoViewMode("stack")}
                className={`px-3.5 py-1.5 rounded-none text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  repoViewMode === "stack"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25 scale-105 border border-cyan-400/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Layers size={13} />
                <span>3D Stack</span>
              </button>
              <button
                onClick={() => setRepoViewMode("grid")}
                className={`px-3.5 py-1.5 rounded-none text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  repoViewMode === "grid"
                    ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md shadow-purple-500/25 scale-105 border border-purple-400/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <FolderGit2 size={13} />
                <span>Grid View</span>
              </button>
            </div>
          </div>

          {repoViewMode === "stack" ? (
            /* 3D Physics Interactive CardSwap Stack View */
            <div className="w-full h-[580px] sm:h-[640px] relative flex items-center justify-center overflow-visible">
              <CardSwap
                width={480}
                height={350}
                cardDistance={55}
                verticalDistance={65}
                depth={85}
                skewAmount={5}
                visibleCards={4}
                cardRadius={0}
                delay={4000}
                speed={1}
                bounce={0.35}
                parallax={0.5}
                hoverSpread={0.12}
                dim={0.5}
                autoplay={true}
                pauseOnHover={true}
                draggable={true}
                theme="cyber"
                onCardClick={(index) => {
                  const target = repositories[index];
                  if (target) setSelectedRepoId(target.id);
                }}
              >
                {repositories.map((repo) => {
                  const Icon = repo.icon;
                  return (
                    <Card key={repo.id}>
                      <div className="p-6 sm:p-7 flex flex-col justify-between h-full bg-[#080a22]/95 border border-cyan-500/30 rounded-none text-white select-none backdrop-blur-xl">
                        <div>
                          {/* Card Top Intelligence Bar */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-none bg-black/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/20">
                                <Icon size={20} />
                              </div>
                              <div>
                                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300 font-bold block">
                                  {repo.domain}
                                </span>
                                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                                  <GitBranch size={11} className="text-cyan-400" />
                                  <span>{repo.branch}</span>
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-xs font-mono">
                              <span className="px-2.5 py-1 rounded-none bg-black/60 border border-white/10 text-amber-300 flex items-center gap-1 shadow-sm">
                                <Star size={11} className="text-amber-400" />
                                <span>{repo.stars}</span>
                              </span>
                              <span className="px-2.5 py-1 rounded-none bg-black/60 border border-white/10 text-purple-300 flex items-center gap-1 shadow-sm">
                                <GitFork size={11} className="text-purple-400" />
                                <span>{repo.forks}</span>
                              </span>
                            </div>
                          </div>

                          {/* Repository Title */}
                          <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2">
                            {repo.title}
                          </h4>

                          {/* Description */}
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3 mb-4">
                            {repo.description}
                          </p>

                          {/* Tech Tags */}
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {repo.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 rounded-none text-[10px] font-mono bg-white/[0.05] border border-white/10 text-slate-200"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Card Bottom Meta & Actions */}
                        <div className="pt-3.5 border-t border-white/10 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5">
                            <span
                              className="w-2.5 h-2.5 rounded-none shadow-sm"
                              style={{ backgroundColor: repo.languageColor }}
                            />
                            <span className="text-slate-200 font-mono text-[11px] font-semibold">
                              {repo.language}
                            </span>
                          </div>

                          <a
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-none bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono text-xs font-bold shadow-md shadow-cyan-500/25 transition-all hover:scale-105 cursor-pointer"
                          >
                            <span>Inspect Code</span>
                            <ExternalLink size={12} />
                          </a>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </CardSwap>
            </div>
          ) : (
            /* Classic 3-Column Bento Grid View */

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {repositories.map((repo, i) => {
              const Icon = repo.icon;
              return (
                <motion.a
                  key={repo.id}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-none p-7 sm:p-8 border border-white/10 hover:border-cyan-400/60 transition-all flex flex-col justify-between group shadow-xl hover:shadow-cyan-500/25 relative overflow-hidden cursor-pointer bg-[#070818]/90 backdrop-blur-xl min-h-[300px]"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {/* Ambient corner glow */}
                  <div
                    className="absolute top-0 right-0 w-36 h-36 rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none"
                    style={{ backgroundColor: repo.languageColor }}
                  />

                  <div>
                    <div className="flex items-center justify-between mb-4.5">
                      <div className="w-12 h-12 rounded-none bg-black/60 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform shadow-lg">
                        <Icon size={22} />
                      </div>
                      <span className="text-xs font-mono px-3 py-1 rounded-none bg-white/[0.04] border border-white/10 text-slate-300 flex items-center gap-1.5">
                        <GitBranch size={12} className="text-purple-400" />
                        {repo.branch}
                      </span>
                    </div>

                    <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block mb-2">
                      {repo.domain}
                    </span>

                    <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug mb-2.5">
                      {repo.name}
                    </h4>

                    <p className="text-sm text-slate-300 leading-relaxed mb-5">
                      {repo.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {repo.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-none text-[10px] font-mono bg-white/[0.03] border border-white/10 text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3.5 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-none"
                        style={{ backgroundColor: repo.languageColor }}
                      />
                      <span className="text-slate-300 font-medium text-[11px]">
                        {repo.language}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-[11px]">
                        <Star size={11} className="text-amber-400" />
                        {repo.stars}
                      </span>
                      <span className="inline-flex items-center gap-1 text-cyan-400 group-hover:translate-x-1 transition-transform text-xs font-semibold">
                        <span>Code</span>
                        <ExternalLink size={12} />
                      </span>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  </section>
);
}
