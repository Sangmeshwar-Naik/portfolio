"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, useInView, AnimatePresence } from "framer-motion";

const TechText = dynamic(() => import("./TechText"), { ssr: false });
import {
  Send,
  Mail,
  MapPin,
  Phone,
  PhoneCall,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  MessageSquare,
  User,
  Copy,
  Check,
  ExternalLink,
  Clock,
  ArrowRight,
  Zap,
  Brain,
  Briefcase,
  Code2,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const QUICK_SUBJECTS = [
  {
    id: "ai-ml",
    title: "AI / ML Collaboration",
    subject: "🚀 AI / ML Project Collaboration & Research",
    icon: Brain,
    color: "#00f5ff",
  },
  {
    id: "internship",
    title: "Internship Opportunity",
    subject: "💼 Internship Opportunity for Sangmeshwar",
    icon: Briefcase,
    color: "#bf00ff",
  },
  {
    id: "fullstack",
    title: "Full-Stack Project",
    subject: "💻 Full-Stack Web / Mobile Development",
    icon: Code2,
    color: "#10b981",
  },
  {
    id: "general",
    title: "General Inquiry",
    subject: "💬 General Engineering Inquiry",
    icon: Sparkles,
    color: "#ec4899",
  },
];

export default function Contact() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [submittedData, setSubmittedData] = useState<FormState | null>(null);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Live IST Clock (UTC +5:30)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-IN", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (text: string, type: "email" | "phone") => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      if (type === "email") {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      }
    }
  };

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!formState.name.trim()) {
      errs.name = "Please enter your name.";
    }
    if (!formState.email.trim()) {
      errs.email = "Please provide an email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formState.subject.trim()) {
      errs.subject = "Please select or type a subject.";
    }
    if (!formState.message.trim()) {
      errs.message = "Please write a message.";
    } else if (formState.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setStatusMessage(null);

    const snapshot = { ...formState };

    const newNotification = {
      id: "msg-" + Date.now(),
      timestamp: new Date().toISOString(),
      name: snapshot.name.trim(),
      email: snapshot.email.trim(),
      subject: snapshot.subject.trim(),
      message: snapshot.message.trim(),
      read: false,
    };

    // Instant real-time broadcast to Notification Bell
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("portfolio-new-message", { detail: newNotification })
      );
      try {
        const stored = JSON.parse(localStorage.getItem("portfolio_notifications") || "[]");
        const list = Array.isArray(stored) ? stored : [];
        localStorage.setItem(
          "portfolio_notifications",
          JSON.stringify([newNotification, ...list])
        );
      } catch {
        // Safe fallback
      }
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(snapshot),
      });

      if (res.ok) {
        setSubmittedData(snapshot);
        setStatusMessage({
          type: "success",
          text: "Message successfully transmitted to Sangmeshwar! A confirmation has been logged.",
        });
        setFormState({ name: "", email: "", subject: "", message: "" });
      } else {
        // Fallback: open mail client with message pre-filled
        window.location.href = `mailto:sangameshnaik471@gmail.com?subject=${encodeURIComponent(
          snapshot.subject
        )}&body=${encodeURIComponent(
          `Hi Sangmeshwar,\n\nName: ${snapshot.name}\nEmail: ${snapshot.email}\n\nMessage:\n${snapshot.message}`
        )}`;
        setSubmittedData(snapshot);
        setStatusMessage({
          type: "success",
          text: "Your message has been prepared in your email client for direct delivery.",
        });
      }
    } catch {
      window.location.href = `mailto:sangameshnaik471@gmail.com?subject=${encodeURIComponent(
        snapshot.subject
      )}&body=${encodeURIComponent(
        `Hi Sangmeshwar,\n\nName: ${snapshot.name}\nEmail: ${snapshot.email}\n\nMessage:\n${snapshot.message}`
      )}`;
      setSubmittedData(snapshot);
      setStatusMessage({
        type: "success",
        text: "Your message has been prepared for transmission directly via your email client.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full pt-32 pb-32 sm:pt-40 sm:pb-40 md:pt-48 md:pb-48 scroll-mt-32 overflow-hidden flex justify-center"
    >
      {/* Background radial ambient lights */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 -left-48 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-1/4 -right-48 w-[550px] h-[550px] bg-purple-500/10 rounded-full blur-[130px]" />
      </div>

      <div ref={containerRef} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="w-full flex flex-col items-center justify-center text-center mx-auto mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Centered Symmetrical Direct Communication Pill - Crisp Square */}
          <div className="inline-flex items-center justify-center gap-2.5 px-5 py-2 rounded-none glass border border-cyan-500/30 text-xs sm:text-sm font-semibold text-cyan-300 mb-4 shadow-lg shadow-cyan-500/10 mx-auto">
            <Sparkles size={14} className="text-cyan-400 shrink-0" />
            <div className="w-[195px] h-[22px] relative flex items-center justify-center mx-auto">
              <TechText
                text="Direct Communication"
                gradient={true}
                fontWeight={700}
                fontSize={15}
                color="#00f5ff"
                accentColor="#a855f7"
                dashLength={2}
                dashGap={1}
                specks={6}
                reveal="letter"
                speed={2.2}
                clickKick
                sweep
                draggable
                selection={false}
                labels={false}
                guides={false}
                align="center"
              />
            </div>
            <Sparkles size={14} className="text-cyan-400 shrink-0" />
          </div>

          <h2 className="sr-only">Let&apos;s Build Something Amazing Together</h2>
          <div className="w-full max-w-5xl mx-auto h-[80px] sm:h-[105px] md:h-[125px] relative flex items-center justify-center text-center">
            <TechText
              text="Let's Build Something Amazing Together"
              highlightText="Amazing Together"
              fontWeight={900}
              fontSize={68}
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
          <p className="mt-5 text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-center">
            Interested in collaborating on AI projects, internships, research, or scalable engineering? Let&apos;s connect!
          </p>
        </motion.div>

        {/* Elevated Standalone Communication Island - Crisp Square Cyber Box */}
        <div className="relative glass rounded-none p-7 sm:p-11 lg:p-14 border border-white/10 shadow-2xl shadow-cyan-500/5 bg-[#070816]/95 backdrop-blur-xl">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Contact Channels Left Panel */}
            <motion.div
              className="lg:col-span-5 space-y-6 sm:space-y-7"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-4 shadow-sm">
                  <span className="w-2 h-2 rounded-none bg-emerald-400 animate-pulse" />
                  <span>Available for Full-Time Roles &amp; Internships</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                  Contact Channels
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 font-mono">
                  Reach out directly via email, phone, WhatsApp, or developer platforms.
                </p>

                <div className="space-y-4">
                  {/* Direct Email Card with One-Click Actions */}
                  <div className="p-5 sm:p-6 rounded-none bg-white/[0.03] border border-white/5 hover:border-cyan-500/40 hover:bg-cyan-500/[0.04] transition-all group shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-none bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 group-hover:scale-105 transition-transform shadow-md">
                          <Mail size={22} />
                        </div>
                        <div>
                          <p className="text-xs uppercase font-bold tracking-wider text-slate-400 font-mono">
                            Direct Email
                          </p>
                          <a
                            href="mailto:sangameshnaik471@gmail.com"
                            className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors block mt-0.5 break-all"
                          >
                            sangameshnaik471@gmail.com
                          </a>
                        </div>
                      </div>

                      {/* Copy Email Button */}
                      <button
                        onClick={() => handleCopy("sangameshnaik471@gmail.com", "email")}
                        className="px-3 py-1.5 rounded-none glass border border-white/10 hover:border-cyan-400 text-slate-300 hover:text-white text-xs font-mono font-semibold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
                        title="Copy email address"
                      >
                        {copiedEmail ? (
                          <>
                            <Check size={13} className="text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="mt-3.5 pt-3 border-t border-white/5 flex items-center gap-3 text-xs font-mono">
                      <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=sangameshnaik471@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:underline flex items-center gap-1"
                      >
                        <span>Open in Gmail</span>
                        <ExternalLink size={11} />
                      </a>
                      <span className="text-slate-600">•</span>
                      <a
                        href="mailto:sangameshnaik471@gmail.com"
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        Default Client
                      </a>
                    </div>
                  </div>

                  {/* Phone & WhatsApp Card - Crisp Square */}
                  <div className="p-5 sm:p-6 rounded-none bg-white/[0.03] border border-white/5 hover:border-emerald-500/40 hover:bg-emerald-500/[0.04] transition-all group shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-none bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform shadow-md">
                          <Phone size={22} />
                        </div>
                        <div>
                          <p className="text-xs uppercase font-bold tracking-wider text-slate-400 font-mono">
                            Phone &amp; WhatsApp
                          </p>
                          <a
                            href="tel:+918080945510"
                            className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors block mt-0.5"
                          >
                            +91 8080945510
                          </a>
                        </div>
                      </div>

                      {/* Copy Phone Button */}
                      <button
                        onClick={() => handleCopy("+918080945510", "phone")}
                        className="px-3 py-1.5 rounded-none glass border border-white/10 hover:border-emerald-400 text-slate-300 hover:text-white text-xs font-mono font-semibold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
                        title="Copy phone number"
                      >
                        {copiedPhone ? (
                          <>
                            <Check size={13} className="text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="mt-3.5 pt-3 border-t border-white/5 flex items-center gap-3 text-xs font-mono">
                      <a
                        href="https://wa.me/918080945510?text=Hi%20Sangmeshwar,%20I%20am%20reaching%20out%20from%20your%20portfolio!"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <FaWhatsapp size={13} />
                        <span>Chat on WhatsApp</span>
                      </a>
                      <span className="text-slate-600">•</span>
                      <a
                        href="tel:+918080945510"
                        className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                      >
                        <PhoneCall size={11} />
                        <span>Direct Call</span>
                      </a>
                    </div>
                  </div>

                  {/* Location & Live Clock Card - Crisp Square */}
                  <div className="p-5 sm:p-6 rounded-none bg-white/[0.03] border border-white/5 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-none bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 shadow-md">
                        <MapPin size={22} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs uppercase font-bold tracking-wider text-slate-400 font-mono">
                          Location &amp; Local Time
                        </p>
                        <p className="text-sm sm:text-base font-bold text-white mt-0.5">
                          Bidar &amp; Mangalore, Karnataka, India
                        </p>
                        <div className="flex items-center gap-2 mt-2 font-mono text-xs text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-none w-fit">
                          <Clock size={12} className="animate-spin text-cyan-400" style={{ animationDuration: "12s" }} />
                          <span>{currentTime ? `${currentTime} IST` : "IST (UTC +5:30)"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Profiles */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-3.5 font-mono">
                    Professional Networks
                  </p>
                  <div className="grid grid-cols-2 gap-3.5">
                    <a
                      href="https://github.com/Sangmeshwar-Naik"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-4 rounded-none glass border border-white/10 text-slate-200 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 flex items-center justify-center gap-2.5 text-xs sm:text-sm font-semibold transition-all group shadow-sm"
                    >
                      <FaGithub size={18} className="text-slate-300 group-hover:text-white transition-colors" />
                      <span>GitHub</span>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/sangmeshwar-naik-555828385"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-4 rounded-none glass border border-white/10 text-slate-200 hover:text-[#0a66c2] hover:border-[#0a66c2]/50 hover:bg-[#0a66c2]/10 flex items-center justify-center gap-2.5 text-xs sm:text-sm font-semibold transition-all group shadow-sm"
                    >
                      <FaLinkedin size={18} className="text-[#0a66c2]" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Interactive Contact Form Right Panel - Crisp Square Box */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="p-7 sm:p-10 lg:p-11 rounded-none bg-[#04050e]/95 border border-white/10 shadow-2xl backdrop-blur-xl relative">
                {/* Header Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-5 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-none bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-md shrink-0">
                      <Zap size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        Send a Direct Message
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 font-mono mt-0.5">
                        Transmitted directly to Sangmeshwar with instant delivery.
                      </p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-semibold shrink-0 w-fit self-start sm:self-auto">
                    <span className="w-2 h-2 rounded-none bg-emerald-400 animate-pulse" />
                    <span>Live Channel Active</span>
                  </div>
                </div>

                {/* Status Alert Banner */}
                <AnimatePresence>
                  {statusMessage && (
                    <motion.div
                      className={`mb-6 p-4 rounded-none flex flex-col gap-2.5 text-xs sm:text-sm font-semibold border ${
                        statusMessage.type === "success"
                          ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                          : "bg-red-500/15 border-red-500/30 text-red-300"
                      }`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="flex items-center gap-3">
                        {statusMessage.type === "success" ? (
                          <CheckCircle2 size={20} className="shrink-0 text-emerald-400" />
                        ) : (
                          <AlertCircle size={20} className="shrink-0 text-red-400" />
                        )}
                        <span>{statusMessage.text}</span>
                      </div>

                      {/* Quick Multi-Channel Action Buttons After Sending */}
                      {statusMessage.type === "success" && submittedData && (
                        <div className="pt-2 border-t border-emerald-500/20 flex flex-wrap items-center gap-2 mt-1">
                          <span className="text-xs text-slate-300 font-mono mr-1">Instant delivery options:</span>
                          <a
                            href={`https://wa.me/918080945510?text=${encodeURIComponent(
                              `Hi Sangmeshwar,\n\nName: ${submittedData.name}\nEmail: ${submittedData.email}\nSubject: ${submittedData.subject}\n\nMessage:\n${submittedData.message}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-none bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-500/40 text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm"
                          >
                            <FaWhatsapp size={14} />
                            <span>Forward on WhatsApp</span>
                          </a>
                          <a
                            href={`https://mail.google.com/mail/?view=cm&fs=1&to=sangameshnaik471@gmail.com&su=${encodeURIComponent(
                              submittedData.subject
                            )}&body=${encodeURIComponent(
                              `Hi Sangmeshwar,\n\nName: ${submittedData.name}\nEmail: ${submittedData.email}\n\nMessage:\n${submittedData.message}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-none bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-500/40 text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm"
                          >
                            <Mail size={13} />
                            <span>Open in Gmail</span>
                          </a>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Row 1: Name and Email with Dedicated Addon Icon Boxes */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Name Input */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                        Your Name <span className="text-cyan-400">*</span>
                      </label>
                      <div
                        className={`flex items-center rounded-none bg-white/[0.04] border transition-all ${
                          errors.name
                            ? "border-red-500/60 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20"
                            : "border-white/10 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20 focus-within:bg-white/[0.07] focus-within:shadow-[0_0_25px_rgba(0,245,255,0.15)]"
                        }`}
                      >
                        <div className="px-4 py-3.5 bg-white/[0.03] border-r border-white/10 flex items-center justify-center text-cyan-400 shrink-0">
                          <User size={18} />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          placeholder="e.g. John Doe"
                          className="w-full px-4 py-3.5 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-sans"
                        />
                      </div>
                      {errors.name && (
                        <p className="text-[11px] text-red-400 mt-1.5 flex items-center gap-1 font-mono">
                          <AlertCircle size={12} /> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Input */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                        Your Email <span className="text-purple-400">*</span>
                      </label>
                      <div
                        className={`flex items-center rounded-none bg-white/[0.04] border transition-all ${
                          errors.email
                            ? "border-red-500/60 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20"
                            : "border-white/10 focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-400/20 focus-within:bg-white/[0.07] focus-within:shadow-[0_0_25px_rgba(191,0,255,0.15)]"
                        }`}
                      >
                        <div className="px-4 py-3.5 bg-white/[0.03] border-r border-white/10 flex items-center justify-center text-purple-400 shrink-0">
                          <Mail size={18} />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="e.g. john@example.com"
                          className="w-full px-4 py-3.5 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-sans"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-[11px] text-red-400 mt-1.5 flex items-center gap-1 font-mono">
                          <AlertCircle size={12} /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Subject Input with Dedicated Icon and Preset Selector */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                        Subject / Inquiry Topic <span className="text-pink-400">*</span>
                      </label>
                      <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                        Click a topic below or type your own
                      </span>
                    </div>

                    <div
                      className={`flex items-center rounded-none bg-white/[0.04] border transition-all ${
                        errors.subject
                          ? "border-red-500/60 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20"
                          : "border-white/10 focus-within:border-pink-400 focus-within:ring-2 focus-within:ring-pink-400/20 focus-within:bg-white/[0.07] focus-within:shadow-[0_0_25px_rgba(236,72,153,0.15)]"
                      }`}
                    >
                      <div className="px-4 py-3.5 bg-white/[0.03] border-r border-white/10 flex items-center justify-center text-pink-400 shrink-0">
                        <Sparkles size={18} />
                      </div>
                      <input
                        type="text"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        placeholder="e.g. AI / ML Internship or Engineering Opportunity"
                        className="w-full px-4 py-3.5 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-sans"
                      />
                    </div>
                    {errors.subject && (
                      <p className="text-[11px] text-red-400 mt-1.5 flex items-center gap-1 font-mono">
                        <AlertCircle size={12} /> {errors.subject}
                      </p>
                    )}

                    {/* Spacious Quick Topic Selection Cards - Crisp Squares */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3">
                      {QUICK_SUBJECTS.map((sub) => {
                        const SubIcon = sub.icon;
                        const isSelected = formState.subject === sub.subject;
                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => setFormState((prev) => ({ ...prev, subject: sub.subject }))}
                            className={`p-3 rounded-none border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                              isSelected
                                ? "bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-500/20 scale-[1.02]"
                                : "bg-white/[0.03] border-white/10 text-slate-300 hover:border-cyan-500/40 hover:bg-white/[0.06] hover:text-white"
                            }`}
                          >
                            <div
                              className="w-7 h-7 rounded-none flex items-center justify-center shrink-0 shadow-sm"
                              style={{ backgroundColor: `${sub.color}20`, color: sub.color }}
                            >
                              <SubIcon size={14} />
                            </div>
                            <span className="text-xs font-mono font-medium leading-tight truncate">
                              {sub.title}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Row 3: Message Textarea with Terminal Header & Live Character Count */}
                  <div>
                    <div
                      className={`rounded-none bg-white/[0.04] border transition-all ${
                        errors.message
                          ? "border-red-500/60 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20"
                          : "border-white/10 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20 focus-within:bg-white/[0.07] focus-within:shadow-[0_0_25px_rgba(0,245,255,0.15)]"
                      }`}
                    >
                      {/* Textarea Header Bar */}
                      <div className="px-4 py-2.5 bg-white/[0.03] border-b border-white/10 flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center gap-2 text-cyan-400">
                          <MessageSquare size={15} />
                          <span className="font-bold uppercase tracking-wider text-slate-200">
                            Message Content <span className="text-cyan-400">*</span>
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400">
                          {formState.message.length} chars
                        </span>
                      </div>
                      <textarea
                        rows={6}
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        placeholder="Describe your project, role, research collaboration, or technical inquiry..."
                        className="w-full p-4 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none resize-none leading-relaxed font-sans"
                      />
                    </div>
                    {errors.message && (
                      <p className="text-[11px] text-red-400 mt-1.5 flex items-center gap-1 font-mono">
                        <AlertCircle size={12} /> {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button - Crisp Square */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-none font-bold text-sm sm:text-base text-white bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 hover:from-cyan-400 hover:to-pink-400 flex items-center justify-center gap-2.5 shadow-xl shadow-cyan-500/25 transition-all disabled:opacity-50 cursor-pointer group"
                    whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Transmitting Message to Sangmeshwar...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
