"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Sparkles,
  X,
  Send,
  User,
  ArrowRight,
  ExternalLink,
  Brain,
  GraduationCap,
  Briefcase,
  Terminal,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  Copy,
  Check,
  Code2,
  FileText,
  Phone,
  Mail,
  Zap,
  Search,
} from "lucide-react";
import { FaWhatsapp, FaGithub, FaLinkedin } from "react-icons/fa";

interface ActionItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  time: string;
  actions?: ActionItem[];
  isStreaming?: boolean;
}

interface KnowledgeCategory {
  title: string;
  icon: string;
  prompts: string[];
}

const KNOWLEDGE_CATEGORIES: KnowledgeCategory[] = [
  {
    title: "Key Projects",
    icon: "🚀",
    prompts: [
      "Tell me about the Brain Tumor AI & QCNN",
      "What is CampusConnect?",
      "How does the Coastal Ship Detection work?",
    ],
  },
  {
    title: "Academics",
    icon: "🎓",
    prompts: [
      "What is his B.E. CGPA & college?",
      "What are his 10th and 12th scores?",
      "When is his graduation date?",
    ],
  },
  {
    title: "Skills & Stack",
    icon: "🛠️",
    prompts: [
      "What programming languages does he know?",
      "What AI / Deep Learning frameworks does he use?",
      "Does he have full-stack and database experience?",
    ],
  },
  {
    title: "Certifications",
    icon: "📜",
    prompts: [
      "Tell me about his AWS Data Engineering credential",
      "What was his score in Pearson Certiport?",
      "What was his rank in the National C++ Challenge?",
    ],
  },
  {
    title: "Hiring & Contact",
    icon: "💼",
    prompts: [
      "Is he available for AI/ML internships?",
      "How can I contact Sangmeshwar directly?",
      "Can I view or download his resume?",
    ],
  },
];

// Lightweight synthesized Web Audio sound effects (zero network dependencies)
function playSynthesizedSound(type: "pop" | "send" | "reply") {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === "pop") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.1);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.13);
    } else if (type === "send") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(540, now + 0.08);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === "reply") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.setValueAtTime(850, now + 0.06);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.16);
    }
  } catch {
    // Audio context not allowed without user interaction or not supported
  }
}

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "👋 **Hello! I am SAN-AI**, Sangmeshwar's virtual neural portfolio guide.\n\nI can answer **any technical, academic, architectural, or career question** about his AI/ML research, CGPA, projects, certifications, or hiring availability.\n\nWhat would you like to explore?",
      time: "Just now",
      actions: [
        { label: "🚀 Top AI Projects", onClick: () => scrollToSection("projects") },
        { label: "🎓 CGPA & VTU Degree", onClick: () => scrollToSection("about") },
        { label: "📜 Verified Certifications", onClick: () => scrollToSection("certifications") },
        { label: "💼 Hire Sangmeshwar", onClick: () => scrollToSection("contact") },
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const msgIdCounter = useRef(1);

  const scrollToSection = useCallback((id: string) => {
    if (typeof document !== "undefined") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const openResumeModal = useCallback(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-resume-modal"));
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping]);

  const handleCopyMessage = (id: string, text: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleSpeak = (id: string, text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean markdown before speaking
    const cleanText = text
      .replace(/[*#_`~]/g, "")
      .replace(/\[.*?\]/g, "")
      .replace(/\n+/g, " ");

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  // Comprehensive Knowledge Query Engine (Zero hallucinations, 100% precision)
  const resolveKnowledge = useCallback(
    (query: string): { text: string; actions?: ActionItem[] } => {
      const q = query.toLowerCase().trim();

      // 1. Brain Tumor, Medical AI, QCNN, U-Net
      if (
        q.includes("tumor") ||
        q.includes("brain") ||
        q.includes("qcnn") ||
        q.includes("u-net") ||
        q.includes("unet") ||
        q.includes("mri") ||
        q.includes("lesion") ||
        q.includes("quantum")
      ) {
        return {
          text: `🧠 **Hybrid Quantum AI for Brain Tumor Analysis**\n\n• **Core Objective**: Early clinical detection and segmentation of brain lesions from high-resolution MRI scans.\n• **Architecture & Pipelines**:\n  1. **Preprocessing**: Adaptive CLAHE contrast enhancement & skull stripping.\n  2. **U-Net Segmentation**: Custom encoder-decoder architecture with skip connections achieving an outstanding **0.94 Dice coefficient**.\n  3. **Quantum-Inspired CNN (QCNN)**: Parameterized quantum circuit implemented in **PyTorch** for elevated tumor multi-class classification accuracy.\n• **Features**: Interactive confidence heatmap, dual clinician/patient diagnosis interface.\n• **Tech**: Python, PyTorch, U-Net, QCNN, OpenCV, Deep Learning.`,
          actions: [
            { label: "View in Projects", onClick: () => scrollToSection("projects") },
            { label: "Inspect Codebase", href: "https://github.com/Sangmeshwar-Naik", icon: FaGithub },
          ],
        };
      }

      // 2. CampusConnect Project
      if (
        q.includes("campus") ||
        q.includes("campusconnect") ||
        q.includes("mobile") ||
        q.includes("react native") ||
        q.includes("expo") ||
        q.includes("ticket")
      ) {
        return {
          text: `📱 **CampusConnect – Smart Service Platform**\n\n• **Purpose**: Solves administrative and logistical fragmentation across university campuses.\n• **Architecture**:\n  - Cross-platform mobile client built with **React Native & Expo**.\n  - RESTful backend powered by **Node.js, Express.js**, and an enterprise **PostgreSQL** relational database.\n  - Fully containerized in **Docker** for resilient deployment.\n• **Key Features**: Multi-tenant RBAC (Student / Staff / Admin), real-time ticket dispatching with geo-tagging and image attachments, administrative SLA progression dashboards.`,
          actions: [
            { label: "Jump to Projects", onClick: () => scrollToSection("projects") },
            { label: "GitHub Profile", href: "https://github.com/Sangmeshwar-Naik", icon: FaGithub },
          ],
        };
      }

      // 3. Maritime / Boat / Vessel / YOLO Project
      if (
        q.includes("boat") ||
        q.includes("ship") ||
        q.includes("vessel") ||
        q.includes("coastal") ||
        q.includes("yolo") ||
        q.includes("maritime") ||
        q.includes("satellite")
      ) {
        return {
          text: `🚢 **Boat & Ship Detection in Coastal Areas**\n\n• **Objective**: Automated surveillance intelligence to classify and track maritime vessels across diverse sea conditions.\n• **Model Stack**: **YOLOv8** and custom CNN pipelines coupled with **OpenCV** image processing in Python.\n• **Key Innovations**: High-speed multi-class bounding box localization, real-time confidence thresholding, robust data augmentation handling dense fog, turbulent wave spray, and variable sunlight angles from ground camera feeds and satellite footage.`,
          actions: [
            { label: "See Computer Vision Work", onClick: () => scrollToSection("projects") },
          ],
        };
      }

      // 4. Real-time Chat / Trip Planner / Other Projects
      if (
        q.includes("chat") ||
        q.includes("socket") ||
        q.includes("realtime") ||
        q.includes("trip") ||
        q.includes("travel") ||
        q.includes("mental health") ||
        q.includes("all projects") ||
        q.includes("other projects")
      ) {
        return {
          text: `🚀 **Sangmeshwar's Additional Flagship Projects**:\n\n1. **Real-time Messaging Engine**: Full-stack WebSocket platform built with Socket.io, React.js, Node.js, MongoDB, and Docker featuring instant room multiplexing and online presence.\n2. **AI Trip Planner & Itinerary Engine**: Next.js GenAI application generating personalized daily travel routes, budgetary estimates, and points of interest.\n3. **Mental Health AI Assistant**: Empathetic conversational agent integrating NLP sentiment tracking and cognitive wellness suggestions.`,
          actions: [
            { label: "Explore All Projects", onClick: () => scrollToSection("projects") },
            { label: "View GitHub Activity", onClick: () => scrollToSection("github") },
          ],
        };
      }

      // 5. Academics, CGPA, Degree, College, Scores (10th, 12th, VTU)
      if (
        q.includes("cgpa") ||
        q.includes("gpa") ||
        q.includes("degree") ||
        q.includes("college") ||
        q.includes("education") ||
        q.includes("vtu") ||
        q.includes("srinivas") ||
        q.includes("10th") ||
        q.includes("12th") ||
        q.includes("pu") ||
        q.includes("school") ||
        q.includes("kseeb") ||
        q.includes("marks") ||
        q.includes("percentage")
      ) {
        return {
          text: `🎓 **Academic Credentials & Scores**:\n\n1. **Bachelor of Engineering (B.E.) in AIML** (2023 – 2027)\n   • **Institution**: Srinivas Institute of Technology, Mangalore\n   • **University**: Visvesvaraya Technological University (VTU)\n   • **Current CGPA**: **8.4 / 10.0** (Top Academic Bracket)\n   • **Status**: Class of 2027 (Currently Pursuing)\n\n2. **12th Pre-University (DPUC) - Science** (Completed 2022)\n   • **Institution**: Moulana Azad Independent P.U College, Bidar\n   • **Score**: **64.33%**\n\n3. **10th Secondary School (KSEEB)** (Completed 2020)\n   • **Institution**: Government High School Hokarna, Hokarna\n   • **Score**: **79.04%**`,
          actions: [
            { label: "View Academic Journey", onClick: () => scrollToSection("about") },
            { label: "Open Resume Modal", onClick: openResumeModal, icon: FileText },
          ],
        };
      }

      // 6. Certifications & Accreditations (AWS, Certiport, ISRO, C++ Challenge)
      if (
        q.includes("certif") ||
        q.includes("aws") ||
        q.includes("certiport") ||
        q.includes("isro") ||
        q.includes("pearson") ||
        q.includes("credly") ||
        q.includes("c++ mastery") ||
        q.includes("challenge") ||
        q.includes("data analytics") ||
        q.includes("distinction")
      ) {
        return {
          text: `📜 **Verified Accreditations & Honors**:\n\n• **AWS Academy Graduate – Data Engineering** (Feb 2026, Credly Badge): Enterprise data lakes, Redshift, Glue ETL, and EMR big data pipelines.\n• **IT Specialist – Data Analytics (Certiport / Pearson VUE)**: Proctored international exam distinction with a score of **929 / 1000 (93%)**.\n• **National C++ Mastery Challenge (2024)**: High percentile distinction scoring **93%** in competitive algorithmic memory management.\n• **AI/ML for Geodata Analytics (ISRO - IIRS Dehradun, 2026)**: Space research remote sensing intelligence.\n• **2x AICTE EduSkills Internships**: Java Full Stack (10 weeks) & SQL/DBMS (8 weeks).\n• **Google for Developers AI-ML Internship** (2024).`,
          actions: [
            { label: "Credentials Conduit", onClick: () => scrollToSection("certifications") },
            { label: "View Journey", onClick: () => scrollToSection("experience") },
          ],
        };
      }

      // 7. Tech Stack & Skills
      if (
        q.includes("skill") ||
        q.includes("stack") ||
        q.includes("tech") ||
        q.includes("python") ||
        q.includes("c++") ||
        q.includes("java") ||
        q.includes("sql") ||
        q.includes("pytorch") ||
        q.includes("tensorflow") ||
        q.includes("docker") ||
        q.includes("database") ||
        q.includes("tools")
      ) {
        return {
          text: `🛠️ **Verified Technical Competency Stack**:\n\n• **Languages**: Python (AI/ML Core), C, C++ (93% Challenge), Java, JavaScript (ES6+), SQL.\n• **AI & Deep Learning**: PyTorch, TensorFlow, OpenCV, U-Net, YOLOv8, QCNN, Scikit-learn, NumPy, Pandas, Generative AI & Prompt Engineering.\n• **Full-Stack & Web**: React.js, Next.js (App Router), Node.js, Express.js, React Native, Expo, REST APIs, WebSockets (Socket.io).\n• **Databases**: PostgreSQL, MySQL, MongoDB, Relational Schema Modeling & Query Optimization.\n• **DevOps & Cloud**: AWS (Glue, Redshift, EMR), Docker, Git, GitHub, Google Cloud, VS Code, Linux.`,
          actions: [
            { label: "Open Orbital Tech Radar", onClick: () => scrollToSection("skills") },
            { label: "View GitHub Repositories", onClick: () => scrollToSection("github") },
          ],
        };
      }

      // 8. Experience, Internships, Hackathons
      if (
        q.includes("experience") ||
        q.includes("intern") ||
        q.includes("eduskills") ||
        q.includes("aicte") ||
        q.includes("hackathon") ||
        q.includes("srinathon") ||
        q.includes("bootcamp") ||
        q.includes("journey")
      ) {
        return {
          text: `💼 **Practical Experience & Hackathons**:\n\n1. **SQL & DBMS Virtual Internship** (AICTE / EduSkills, Aug – Oct 2026): Hands-on enterprise relational modeling and performance queries.\n2. **Java Full Stack Internship** (AICTE / EduSkills, July – Sept 2025): Responsive user interfaces, server endpoints, and persistent API tiers.\n3. **AI-ML Virtual Internship** (Google for Developers, 2024): Regression, clustering, and predictive data pipelines.\n4. **React Bootcamp** (Let's Upgrade, 2025): Hooks, component lifecycle, virtual DOM architecture.\n5. **Srinathon 2.0 Hackathon** (2025): Rapid prototyping and sprint team execution under tight deadlines.`,
          actions: [
            { label: "View Timeline", onClick: () => scrollToSection("experience") },
          ],
        };
      }

      // 9. Availability, Hiring, Relocation, Full-time
      if (
        q.includes("hire") ||
        q.includes("available") ||
        q.includes("opportunity") ||
        q.includes("role") ||
        q.includes("job") ||
        q.includes("relocate") ||
        q.includes("join") ||
        q.includes("work with")
      ) {
        return {
          text: `✨ **Availability & Career Mission**:\n\n• **Status**: **Actively Available** for AI/ML Engineering roles, research internships, and software development positions.\n• **Preferred Roles**: AI/ML Engineer, Data Scientist, Computer Vision Specialist, Full-Stack Developer.\n• **Locations**: Open to on-site, hybrid, or remote positions across India and globally. Based in Karnataka (Bidar & Mangalore).\n• **Why Hire Sangmeshwar?**: Strong academic foundation (8.4 CGPA), proven medical & computer vision deployments (U-Net + QCNN), certified cloud/database skills (AWS + Pearson), and passion for scalable engineering.`,
          actions: [
            { label: "Contact Sangmeshwar", onClick: () => scrollToSection("contact") },
            { label: "Chat on WhatsApp", href: "https://wa.me/918080945510?text=Hi%20Sangmeshwar,%20I%20reviewed%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20opportunity!", icon: FaWhatsapp },
            { label: "Send Direct Email", href: "mailto:sangameshnaik471@gmail.com", icon: Mail },
          ],
        };
      }

      // 10. Contact, Email, Phone, WhatsApp, Socials
      if (
        q.includes("contact") ||
        q.includes("email") ||
        q.includes("phone") ||
        q.includes("whatsapp") ||
        q.includes("number") ||
        q.includes("call") ||
        q.includes("linkedin") ||
        q.includes("github") ||
        q.includes("reach") ||
        q.includes("address") ||
        q.includes("location")
      ) {
        return {
          text: `📬 **Direct Communication Channels**:\n\n• **Email**: [sangameshnaik471@gmail.com](mailto:sangameshnaik471@gmail.com)\n• **Phone & WhatsApp**: [+91 8080945510](tel:+918080945510)\n• **LinkedIn**: [linkedin.com/in/sangmeshwar-naik-555828385](https://www.linkedin.com/in/sangmeshwar-naik-555828385)\n• **GitHub**: [github.com/Sangmeshwar-Naik](https://github.com/Sangmeshwar-Naik)\n• **Location**: Bidar & Mangalore, Karnataka, India (IST / UTC +5:30).`,
          actions: [
            { label: "Open Contact Island", onClick: () => scrollToSection("contact") },
            { label: "Chat on WhatsApp", href: "https://wa.me/918080945510", icon: FaWhatsapp },
          ],
        };
      }

      // 11. Resume / CV
      if (
        q.includes("resume") ||
        q.includes("cv") ||
        q.includes("pdf") ||
        q.includes("curriculum")
      ) {
        return {
          text: `📄 **Sangmeshwar's Official Curriculum Vitae**\n\nHis comprehensive resume contains complete details on his:\n• **B.E. AIML Degree** (8.4 CGPA at Srinivas Institute of Technology)\n• **Deep Learning & Quantum ML Projects**\n• **AWS, Pearson Certiport, and AICTE Certifications**\n• **Core Technical Stack & Tools**\n\nYou can view it directly in our interactive modal or download a copy.`,
          actions: [
            { label: "Open Resume Viewer", onClick: openResumeModal, icon: FileText },
            { label: "Download Resume PDF", href: "/resume.pdf", icon: ArrowRight },
          ],
        };
      }

      // 12. Biography & Executive Overview
      if (
        q.includes("who is") ||
        q.includes("about") ||
        q.includes("intro") ||
        q.includes("bio") ||
        q.includes("sangmeshwar") ||
        q.includes("profile")
      ) {
        return {
          text: `🌟 **About Sangmeshwar Anil Naik**\n\nSangmeshwar is an AI/ML Engineer and undergraduate researcher in **Artificial Intelligence and Machine Learning** at Srinivas Institute of Technology, Mangalore (VTU Class of 2027) with an **8.4 CGPA**.\n\nHis research bridges theoretical Machine Learning with scalable software systems, specializing in:\n• **Medical Computer Vision & Lesion Segmentation** (U-Net)\n• **Hybrid Quantum Neural Networks** (QCNN in PyTorch)\n• **Full-Stack Enterprise Applications** (React Native, Node.js, PostgreSQL, Docker)\n\nHe is dedicated to deploying practical intelligence that drives measurable real-world impact.`,
          actions: [
            { label: "Read Biography", onClick: () => scrollToSection("about") },
            { label: "Explore Projects", onClick: () => scrollToSection("projects") },
          ],
        };
      }

      // 13. Friendly / Greetings / Fun
      if (
        q === "hi" ||
        q === "hello" ||
        q === "hey" ||
        q.includes("how are you") ||
        q.includes("good morning") ||
        q.includes("good evening")
      ) {
        return {
          text: `👋 **Greetings! Welcome to Sangmeshwar's Portfolio.**\n\nI am his AI guide, loaded with his complete verified engineering credentials. Ask me about:\n\n• His **8.4 CGPA** and academic roadmap\n• The **Hybrid Quantum Brain Tumor AI**\n• His **AWS & Pearson Certiport** distinctions\n• How to **hire or collaborate** with him!`,
          actions: [
            { label: "View Featured Projects", onClick: () => scrollToSection("projects") },
            { label: "Check Contact Details", onClick: () => scrollToSection("contact") },
          ],
        };
      }

      // 14. ML Joke / Easter Egg
      if (q.includes("joke") || q.includes("funny")) {
        return {
          text: `🤖 **Neural Network Humor**:\n\nWhy did the neural network break up with the data scientist?\n\n*Because it felt overfitted and had zero room for generalization!* 😄\n\nOn a serious note, Sangmeshwar regularizes his models with Dropout, BatchNorm, and data augmentation for maximum clinical generalization!`,
          actions: [
            { label: "See Medical AI Model", onClick: () => scrollToSection("projects") },
          ],
        };
      }

      // Default Intelligent Response with Structured Pathways
      return {
        text: `💡 **Here is what you should know about Sangmeshwar Anil Naik**:\n\n• **Specialization**: B.E. in Artificial Intelligence & Machine Learning (VTU, CGPA: **8.4 / 10**).\n• **Flagship Innovations**: Hybrid Quantum AI for Brain Tumor Analysis (U-Net + QCNN), CampusConnect mobile service ecosystem, and Coastal Maritime Ship Detection (YOLOv8).\n• **Credentials**: AWS Academy Data Engineering, Pearson Certiport Data Analytics (929/1000), 93% National C++ Challenge distinction.\n• **Status**: Open for AI/ML engineering roles, internships, and software development.\n\nSelect a topic below or ask any specific question!`,
        actions: [
          { label: "🎓 Academic Roadmap", onClick: () => scrollToSection("about") },
          { label: "🚀 Projects Radar", onClick: () => scrollToSection("projects") },
          { label: "🛠️ Technical Skills", onClick: () => scrollToSection("skills") },
          { label: "📬 Contact Sangmeshwar", onClick: () => scrollToSection("contact") },
        ],
      };
    },
    [scrollToSection, openResumeModal]
  );

  // Send Handler with hybrid server-side LLM check + on-device instant fallback
  const handleSend = async (textToSend?: string) => {
    const queryText = (textToSend || input).trim();
    if (!queryText || isTyping) return;

    if (soundEnabled) playSynthesizedSound("send");

    const userMsg: Message = {
      id: `user-${++msgIdCounter.current}`,
      sender: "user",
      text: queryText,
      time: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    let replyText = "";
    let replyActions: ActionItem[] | undefined;

    try {
      // First attempt backend API (supports dynamic Gemini / OpenAI if keys provided)
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: queryText }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.reply && !data?.fallback) {
          replyText = data.reply;
        }
      }
    } catch {
      // Seamlessly proceed to local knowledge engine
    }

    // If server had no LLM keys or fallback needed, use ultra-accurate local engine
    if (!replyText) {
      const localResult = resolveKnowledge(queryText);
      replyText = localResult.text;
      replyActions = localResult.actions;
    }

    // Simulate natural neural typing cadence
    setTimeout(() => {
      if (soundEnabled) playSynthesizedSound("reply");

      const aiMsg: Message = {
        id: `ai-${++msgIdCounter.current}`,
        sender: "ai",
        text: replyText,
        time: "Just now",
        actions: replyActions,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "welcome-reset",
        sender: "ai",
        text: "🔄 Chat reset. Hello again! How can I assist you with Sangmeshwar's portfolio today?",
        time: "Just now",
        actions: [
          { label: "🚀 Top Projects", onClick: () => scrollToSection("projects") },
          { label: "🎓 CGPA & Degree", onClick: () => scrollToSection("about") },
          { label: "📬 Contact Details", onClick: () => scrollToSection("contact") },
        ],
      },
    ]);
  };

  return (
    <>
      {/* ============================================================== */}
      {/* FLOATING TRIGGER BADGE & CYBERNETIC AVATAR                     */}
      {/* ============================================================== */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={() => {
            if (soundEnabled) playSynthesizedSound("pop");
            setIsOpen((prev) => !prev);
          }}
          className="relative group p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-slate-200 shadow-xl text-slate-800 flex items-center gap-3 cursor-pointer hover:border-cyan-400 hover:shadow-cyan-400/20 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open Professional AI Assistant"
        >
          {/* Luminous Pulsing Beacon */}
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-cyan-400 animate-ping opacity-75" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-cyan-500 border-2 border-white" />

          {/* Holographic Glowing Avatar */}
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-purple-600 to-pink-500 p-0.5 shadow-md flex items-center justify-center shrink-0">
            <div className="w-full h-full rounded-xl bg-white flex items-center justify-center text-cyan-600 group-hover:scale-105 transition-transform">
              <Bot size={20} className="text-cyan-600 group-hover:text-cyan-700 transition-colors" />
            </div>
          </div>

          {/* Text Labels */}
          <div className="text-left hidden sm:block pr-1">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-900 font-mono tracking-tight">SAN-AI</span>
              <span className="px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 text-[9px] font-mono font-semibold border border-cyan-200">
                ACTIVE
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
              <Sparkles size={10} className="text-cyan-600" />
              <span>Ask AI Assistant</span>
            </p>
          </div>
        </motion.button>
      </div>

      {/* ============================================================== */}
      {/* INTERACTIVE AI CHAT CONSOLE DRAWER                             */}
      {/* ============================================================== */}
      <AnimatePresence>
        {isOpen && (
          <div
            className={`fixed z-50 flex items-end sm:items-auto justify-center sm:justify-end ${
              isFullscreen
                ? "inset-4 sm:inset-10"
                : "inset-0 sm:inset-auto sm:bottom-24 sm:right-6"
            }`}
          >
            {/* Backdrop for Mobile or Fullscreen */}
            <motion.div
              className={`fixed inset-0 bg-slate-900/60 backdrop-blur-md ${
                !isFullscreen ? "sm:hidden" : ""
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Chat Box Container */}
            <motion.div
              className={`relative border border-slate-200 shadow-2xl bg-white/98 text-slate-900 flex flex-col overflow-hidden ${
                isFullscreen
                  ? "w-full h-full rounded-2xl"
                  : "w-full sm:w-[440px] max-h-[85vh] sm:max-h-[640px] h-[580px] rounded-3xl"
              }`}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {/* Header Bar */}
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-purple-600 to-pink-500 p-0.5 shadow-md shrink-0">
                    <div className="w-full h-full rounded-xl bg-white flex items-center justify-center text-cyan-600">
                      <Bot size={18} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-950 font-mono flex items-center gap-1.5">
                        <span>Sangmeshwar AI</span>
                      </h3>
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[9px] font-mono text-emerald-700 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Online</span>
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-mono">
                      VTU AIML • Medical Vision • Quantum ML
                    </p>
                  </div>
                </div>

                {/* Control Action Icons */}
                <div className="flex items-center gap-1 text-slate-500">
                  {/* Sound Toggle */}
                  <button
                    onClick={() => setSoundEnabled((prev) => !prev)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-950 transition-colors cursor-pointer"
                    title={soundEnabled ? "Mute audio cues" : "Enable audio cues"}
                  >
                    {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
                  </button>

                  {/* Reset Chat */}
                  <button
                    onClick={handleResetChat}
                    className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-950 transition-colors cursor-pointer"
                    title="Reset conversation"
                  >
                    <RotateCcw size={15} />
                  </button>

                  {/* Fullscreen Toggle (Desktop) */}
                  <button
                    onClick={() => setIsFullscreen((prev) => !prev)}
                    className="hidden sm:inline-flex p-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-950 transition-colors cursor-pointer"
                    title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  >
                    {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
                  </button>

                  {/* Close */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-950 transition-colors cursor-pointer ml-1"
                    title="Close Assistant"
                  >
                    <X size={17} />
                  </button>
                </div>
              </div>

              {/* Chat Messages Feed */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs bg-slate-50/50">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-[88%] p-3.5 sm:p-4 rounded-2xl leading-relaxed whitespace-pre-line shadow-sm ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium shadow-md shadow-cyan-500/20"
                          : "bg-white border border-slate-200 text-slate-800 font-sans"
                      }`}
                    >
                      {/* Formatted Text Content */}
                      <div>{msg.text}</div>

                      {/* Interactive Action Chips inside AI message */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                          {msg.actions.map((act, i) => {
                            const ActIcon = act.icon || ArrowRight;
                            if (act.href) {
                              return (
                                <a
                                  key={i}
                                  href={act.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-800 hover:bg-cyan-100 hover:border-cyan-400 text-[11px] font-mono font-semibold transition-all shadow-sm"
                                >
                                  <span>{act.label}</span>
                                  <ActIcon size={11} />
                                </a>
                              );
                            }
                            return (
                              <button
                                key={i}
                                onClick={act.onClick}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-800 hover:bg-cyan-100 hover:border-cyan-400 text-[11px] font-mono font-semibold transition-all cursor-pointer shadow-sm"
                              >
                                <span>{act.label}</span>
                                <ActIcon size={11} />
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Metadata strip (time, copy, speak) */}
                    <div className="flex items-center gap-2 text-[9px] text-slate-400 mt-1 font-mono px-1">
                      <span>{msg.time}</span>
                      {msg.sender === "ai" && (
                        <>
                          <span>•</span>
                          <button
                            onClick={() => handleCopyMessage(msg.id, msg.text)}
                            className="hover:text-cyan-600 transition-colors flex items-center gap-0.5 cursor-pointer"
                            title="Copy response"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check size={10} className="text-emerald-600" />
                                <span className="text-emerald-600">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy size={10} />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                          <span>•</span>
                          <button
                            onClick={() => handleSpeak(msg.id, msg.text)}
                            className="hover:text-cyan-600 transition-colors flex items-center gap-0.5 cursor-pointer"
                            title={speakingId === msg.id ? "Stop voice" : "Read aloud"}
                          >
                            <Volume2 size={10} className={speakingId === msg.id ? "text-cyan-600 animate-pulse" : ""} />
                            <span>{speakingId === msg.id ? "Stop" : "Listen"}</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}

                {/* Live Neural Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-white border border-cyan-300 w-fit text-cyan-600 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-pink-500 animate-bounce [animation-delay:0.4s]" />
                    <span className="text-[10px] font-mono text-slate-500 ml-1">
                      Analyzing portfolio neural graph...
                    </span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Topic Categories & Suggestions Strip */}
              <div className="border-t border-slate-200 bg-slate-50 p-2.5">
                {/* Category Pills */}
                <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                  {KNOWLEDGE_CATEGORIES.map((cat, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedCategory(idx)}
                      className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-[10px] font-mono font-semibold transition-all shrink-0 cursor-pointer flex items-center gap-1 ${
                        selectedCategory === idx
                          ? "bg-cyan-100 border border-cyan-300 text-cyan-800 shadow-sm"
                          : "bg-white border border-slate-200 text-slate-600 hover:text-slate-950"
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.title}</span>
                    </button>
                  ))}
                </div>

                {/* Specific Prompt Chips for Selected Category */}
                <div className="flex gap-1.5 overflow-x-auto scrollbar-none pt-0.5">
                  {KNOWLEDGE_CATEGORIES[selectedCategory].prompts.map(
                    (prompt, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => handleSend(prompt)}
                        className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-cyan-400 hover:bg-cyan-50 text-[10px] text-slate-700 hover:text-slate-950 font-mono transition-all shrink-0 cursor-pointer flex items-center gap-1 shadow-sm"
                      >
                        <Zap size={10} className="text-cyan-600 shrink-0" />
                        <span>{prompt}</span>
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Input Command Bar */}
              <div className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about AI models, CGPA, stack, certifications..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-sans transition-all"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 flex items-center justify-center text-white disabled:opacity-40 hover:opacity-95 hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0 shadow-md shadow-cyan-500/20"
                  aria-label="Send query"
                >
                  <Send size={15} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
