"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Send,
  Mail,
  MapPin,
  Phone,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

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
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!formState.name.trim()) {
      errs.name = "Please enter your full name.";
    }
    if (!formState.email.trim()) {
      errs.email = "Please provide an email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formState.subject.trim()) {
      errs.subject = "Please enter a message subject.";
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

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (res.ok) {
        setStatusMessage({
          type: "success",
          text: "Message sent successfully! Thank you for reaching out, Sangmeshwar will reply soon.",
        });
        setFormState({ name: "", email: "", subject: "", message: "" });
      } else {
        // Fallback to mailto link
        window.location.href = `mailto:sangameshnaik471@gmail.com?subject=${encodeURIComponent(
          formState.subject
        )}&body=${encodeURIComponent(
          `Hi Sangmeshwar,\n\nName: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
        )}`;
        setStatusMessage({
          type: "success",
          text: "Your email client was opened to complete sending your message directly.",
        });
      }
    } catch {
      // Direct mailto fallback on any network error
      window.location.href = `mailto:sangameshnaik471@gmail.com?subject=${encodeURIComponent(
        formState.subject
      )}&body=${encodeURIComponent(
        `Hi Sangmeshwar,\n\nName: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
      )}`;
      setStatusMessage({
        type: "success",
        text: "Your default email application was opened with your message ready to send.",
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
      {/* Background radial glows */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 -left-48 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-1/4 -right-48 w-[550px] h-[550px] bg-purple-500/10 rounded-full blur-[130px]" />
      </div>

      <div ref={containerRef} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-4 shadow-lg shadow-cyan-500/10">
            <Sparkles size={13} className="text-cyan-400" />
            Direct Communication
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Let&apos;s Build Something{" "}
            <span className="text-gradient">Amazing Together</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Interested in collaborating on AI projects, internships, research, or software development? Let&apos;s connect!
          </p>
        </motion.div>

        {/* Elevated Standalone Communication Island */}
        <div className="relative glass rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 lg:p-12 border border-white/10 shadow-2xl shadow-cyan-500/5 bg-[#070816]/95 backdrop-blur-xl">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Contact Details Left Panel */}
            <motion.div
              className="lg:col-span-5 space-y-6"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Available for Full-Time Roles &amp; Internships</span>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight mb-2">
                  Contact Channels
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6 font-mono">
                  Reach out directly via email, phone, or connected developer platforms.
                </p>

                <div className="space-y-4">
                  {/* Email */}
                  <a
                    href="mailto:sangameshnaik471@gmail.com"
                    className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.025] border border-white/5 hover:border-cyan-500/40 hover:bg-cyan-500/[0.05] transition-all group shadow-sm"
                  >
                    <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0 group-hover:scale-105 transition-transform shadow-md">
                      <Mail size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono">Direct Email</p>
                      <p className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                        sangameshnaik471@gmail.com
                      </p>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+918080945510"
                    className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.025] border border-white/5 hover:border-purple-500/40 hover:bg-purple-500/[0.05] transition-all group shadow-sm"
                  >
                    <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0 group-hover:scale-105 transition-transform shadow-md">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono">Phone</p>
                      <p className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                        +91 8080945510
                      </p>
                    </div>
                  </a>

                  {/* Location */}
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.025] border border-white/5 shadow-sm">
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0 shadow-md">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono">Location &amp; Time Zone</p>
                      <p className="text-sm font-bold text-white">
                        Bidar &amp; Mangalore, Karnataka, India
                      </p>
                      <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                        Standard Time: IST (UTC +5:30)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Social Profiles */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-3 font-mono">
                    Professional Networks
                  </p>
                  <div className="flex gap-3">
                    <a
                      href="https://github.com/Sangmeshwar-Naik"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 px-4 rounded-xl glass border border-white/10 text-slate-200 hover:text-white hover:border-cyan-500/50 flex items-center justify-center gap-2 text-xs font-semibold transition-all group"
                    >
                      <FaGithub size={16} className="text-slate-300 group-hover:text-white" />
                      <span>GitHub</span>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/sangmeshwar-naik-555828385"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 px-4 rounded-xl glass border border-white/10 text-slate-200 hover:text-[#0a66c2] hover:border-[#0a66c2]/50 flex items-center justify-center gap-2 text-xs font-semibold transition-all group"
                    >
                      <FaLinkedin size={16} className="text-[#0a66c2]" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Interactive Contact Form */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="p-6 sm:p-8 rounded-3xl bg-black/40 border border-white/10 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-1.5">Send a Direct Message</h3>
                <p className="text-xs text-slate-400 mb-6 font-mono">
                  Fill in your details below and I&apos;ll get back to you promptly.
                </p>

              {/* Status Alert Banner */}
              <AnimatePresence>
                {statusMessage && (
                  <motion.div
                    className={`mb-6 p-4 rounded-2xl flex items-center gap-3 text-xs sm:text-sm font-semibold border ${
                      statusMessage.type === "success"
                        ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                        : "bg-red-500/15 border-red-500/30 text-red-300"
                    }`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {statusMessage.type === "success" ? (
                      <CheckCircle2 size={18} className="flex-shrink-0" />
                    ) : (
                      <AlertCircle size={18} className="flex-shrink-0" />
                    )}
                    <span>{statusMessage.text}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                        errors.name
                          ? "border-red-500/60 focus:border-red-500"
                          : "border-white/10 focus:border-cyan-400/60 focus:bg-white/[0.07]"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Your Email <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                        errors.email
                          ? "border-red-500/60 focus:border-red-500"
                          : "border-white/10 focus:border-cyan-400/60 focus:bg-white/[0.07]"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Subject <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    placeholder="e.g. AI Internship Opportunity / Collaboration"
                    className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                      errors.subject
                        ? "border-red-500/60 focus:border-red-500"
                        : "border-white/10 focus:border-cyan-400/60 focus:bg-white/[0.07]"
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle size={11} /> {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Message <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    rows={5}
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Describe your project, question, or opportunity..."
                    className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-sm text-white placeholder-slate-500 focus:outline-none resize-none transition-all ${
                      errors.message
                        ? "border-red-500/60 focus:border-red-500"
                        : "border-white/10 focus:border-cyan-400/60 focus:bg-white/[0.07]"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle size={11} /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 hover:from-cyan-400 hover:to-pink-400 flex items-center justify-center gap-2.5 shadow-xl shadow-cyan-500/25 transition-all disabled:opacity-50"
                  whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Transmitting Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={16} />
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
