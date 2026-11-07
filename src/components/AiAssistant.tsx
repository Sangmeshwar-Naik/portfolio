"use client";

import { useState, useRef, useEffect } from "react";
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
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  time: string;
  actions?: { label: string; href?: string; onClick?: () => void }[];
}

const suggestedPrompts = [
  "What is Sangmeshwar's CGPA & degree?",
  "What are his key AI & Machine Learning projects?",
  "Is he available for internships or full-time roles?",
  "What is his core technical stack?",
  "How can I contact him directly?",
];

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Hello! I am Sangmeshwar's virtual AI portfolio guide. Ask me anything about his AI/ML research, engineering projects, CGPA, academic background, or availability!",
      time: "Just now",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const msgIdCounter = useRef(1);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  const getAiResponse = (query: string): { text: string; actions?: Message["actions"] } => {
    const q = query.toLowerCase();

    if (q.includes("cgpa") || q.includes("degree") || q.includes("college") || q.includes("education") || q.includes("vtu")) {
      return {
        text: "Sangmeshwar Anil Naik is pursuing a Bachelor of Engineering in Artificial Intelligence & Machine Learning at Srinivas Institute of Technology, Mangalore (affiliated with VTU). He holds a strong cumulative CGPA of 8.4 / 10 and is part of the graduating batch of 2027.",
        actions: [
          { label: "View Academic Timeline", onClick: () => scrollTo("about") },
          { label: "Download Resume", onClick: () => window.open("/resume.pdf", "_blank") },
        ],
      };
    }

    if (q.includes("project") || q.includes("work") || q.includes("qcnn") || q.includes("tumor") || q.includes("u-net")) {
      return {
        text: "Sangmeshwar has built several high-impact systems, notably:\n1. Hybrid Quantum AI for Brain Tumor Analysis (U-Net MRI segmentation + Quantum-inspired CNN classifier)\n2. Real-time Messaging Platform (Socket.io, React, Node.js, MongoDB, Docker)\n3. CampusConnect Student Collaboration Hub\n4. Coastal Small Vessel Maritime Detection (YOLOv8 & OpenCV)\n5. AI Trip Planner & Itinerary Engine (GenAI APIs).",
        actions: [
          { label: "Explore Projects Section", onClick: () => scrollTo("projects") },
          { label: "GitHub Repositories", onClick: () => scrollTo("github") },
        ],
      };
    }

    if (q.includes("hire") || q.includes("internship") || q.includes("available") || q.includes("opportunity") || q.includes("role")) {
      return {
        text: "Yes! Sangmeshwar is actively open to AI/ML internships, research collaborations, and full-time software engineering roles. He has already completed 2 AICTE virtual internships in SQL/Databases and Java Full-Stack Engineering through EduSkills.",
        actions: [
          { label: "Direct Message Sangmeshwar", onClick: () => scrollTo("contact") },
          { label: "Email Directly", onClick: () => window.open("mailto:sangameshnaik471@gmail.com") },
        ],
      };
    }

    if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("python") || q.includes("language")) {
      return {
        text: "His verified technical competencies span:\n• Programming: Python, C, C++, Java, JavaScript, SQL\n• AI/ML: Deep Learning, Computer Vision, U-Net, Generative AI, Quantum ML (QCNN), PyTorch, TensorFlow\n• Web & DB: React.js, Node.js, Express.js, REST APIs, MySQL, PostgreSQL, MongoDB\n• Tools: Docker, Git/GitHub, AWS Academy, Google Cloud, VS Code.",
        actions: [{ label: "Open Orbital Tech Radar", onClick: () => scrollTo("skills") }],
      };
    }

    if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("linkedin")) {
      return {
        text: "You can reach Sangmeshwar directly via:\n• Email: sangameshnaik471@gmail.com\n• Phone: +91 8080945510\n• LinkedIn: linkedin.com/in/sangmeshwar-naik-555828385\n• Location: Bidar & Mangalore, Karnataka, India (IST / UTC +5:30).",
        actions: [
          { label: "Open Contact Island", onClick: () => scrollTo("contact") },
          { label: "Send Email Now", onClick: () => window.open("mailto:sangameshnaik471@gmail.com") },
        ],
      };
    }

    // Default intelligent response
    return {
      text: "Sangmeshwar is an AI/ML Engineer with a 8.4 CGPA in B.E. AIML at VTU. He specializes in medical image segmentation (U-Net), quantum machine learning (QCNN), and distributed full-stack platforms. Would you like to check his projects, verified certifications, or send him a message?",
      actions: [
        { label: "View Featured Projects", onClick: () => scrollTo("projects") },
        { label: "Contact Sangmeshwar", onClick: () => scrollTo("contact") },
      ],
    };
  };

  const handleSend = (textToSend?: string) => {
    const queryText = textToSend || input;
    if (!queryText.trim() || isTyping) return;

    const userMsg: Message = {
      id: `user-${++msgIdCounter.current}`,
      sender: "user",
      text: queryText,
      time: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getAiResponse(queryText);
      const aiMsg: Message = {
        id: `ai-${++msgIdCounter.current}`,
        sender: "ai",
        text: response.text,
        time: "Just now",
        actions: response.actions,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative group p-3.5 sm:p-4 rounded-2xl glass border border-cyan-500/40 shadow-2xl shadow-cyan-500/30 bg-[#090b1e]/95 text-white flex items-center gap-3 cursor-pointer hover:border-cyan-400 hover:scale-105 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open AI Assistant"
        >
          {/* Beacon pulse */}
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-cyan-400 animate-ping opacity-75" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-[#090b1e]" />

          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white shadow-md">
            <Bot size={18} />
          </div>

          <div className="text-left hidden sm:block pr-1">
            <p className="text-[11px] font-bold text-white font-mono leading-tight flex items-center gap-1.5">
              <span>Ask AI Guide</span>
              <Sparkles size={11} className="text-cyan-400" />
            </p>
            <p className="text-[9px] text-slate-400 font-mono">Portfolio Assistant</p>
          </div>
        </motion.button>
      </div>

      {/* Interactive AI Chat Drawer Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 z-50 flex items-end sm:items-auto justify-center sm:justify-end">
            {/* Mobile backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm sm:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Chat Box */}
            <motion.div
              className="relative w-full sm:w-[420px] max-h-[85vh] sm:max-h-[600px] h-[550px] glass rounded-t-3xl sm:rounded-3xl border border-cyan-500/40 shadow-2xl shadow-cyan-500/25 bg-[#080918]/98 flex flex-col overflow-hidden"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              {/* Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-purple-600 to-pink-500 p-0.5 shadow-md">
                    <div className="w-full h-full rounded-[10px] bg-[#090b1e] flex items-center justify-center text-cyan-300">
                      <Bot size={18} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-1.5 font-mono">
                      <span>Sangmeshwar AI</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </h3>
                    <p className="text-[10px] text-slate-400 font-mono">
                      Neural Intelligence Assistant
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-slate-400 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-line ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-tr-none font-medium shadow-md shadow-cyan-500/20"
                          : "bg-white/[0.04] border border-white/10 text-slate-200 rounded-tl-none font-sans"
                      }`}
                    >
                      {msg.text}

                      {/* Action buttons embedded in AI reply */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap gap-1.5">
                          {msg.actions.map((act, i) => (
                            <button
                              key={i}
                              onClick={act.onClick}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/25 text-[11px] font-mono font-semibold transition-all cursor-pointer"
                            >
                              <span>{act.label}</span>
                              <ArrowRight size={10} />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-[9px] text-slate-500 mt-1 font-mono px-1">
                      {msg.time}
                    </span>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-white/[0.04] border border-white/10 w-20 text-cyan-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts Suggestion Chips */}
              <div className="p-2.5 border-t border-white/10 bg-black/20 overflow-x-auto flex gap-1.5 scrollbar-none">
                {suggestedPrompts.slice(0, 3).map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/10 hover:border-cyan-400/40 text-[10px] text-slate-300 hover:text-white font-mono transition-colors shrink-0 cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Input Bar */}
              <div className="p-3 border-t border-white/10 bg-black/40 flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about AI projects, CGPA, stack..."
                  className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400/50 font-sans"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  className="w-9 h-9 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-white disabled:opacity-40 hover:opacity-90 transition-opacity cursor-pointer shrink-0 shadow-md"
                  aria-label="Send message"
                >
                  <Send size={14} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
