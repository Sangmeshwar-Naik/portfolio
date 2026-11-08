"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Mail, Search, FileText } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import NotificationBell from "./NotificationBell";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Certifications", href: "#certifications" },
  { name: "GitHub", href: "#github" },
  { name: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 40);

          const sections = navItems.map((item) => item.href.substring(1));
          const reversed = [...sections].reverse();
          for (const section of reversed) {
            const element = document.getElementById(section);
            if (element && window.scrollY >= element.offsetTop - 220) {
              setActiveSection(section);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const id = href.startsWith("#") ? href.substring(1) : href;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 flex justify-center ${
          isScrolled
            ? "glass py-3.5 border-b border-white/[0.08]"
            : "py-6 bg-transparent"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => handleNavClick("#hero")}
            className="flex items-center gap-2.5 select-none focus:outline-none group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Sangmeshwar Anil Naik Portfolio Home"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-amber-500/40 shadow-md shadow-amber-500/20 group-hover:border-amber-400 group-hover:shadow-amber-500/40 transition-all bg-[#0a0a14]">
              <Image
                src="/logo.jpg"
                alt="SAN Logo"
                fill
                sizes="40px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <span className="text-base sm:text-lg font-black tracking-tight text-white group-hover:text-gradient transition-colors">
              Sangmeshwar<span className="text-cyan-400">.</span>
            </span>
          </motion.button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative text-sm font-medium transition-colors duration-200 py-1 ${
                    isActive
                      ? "text-cyan-400"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
                      layoutId="nav-underline"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Desktop Social & Action Links */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Quick Command Palette Button */}
            <motion.button
              onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl glass border border-white/10 hover:border-cyan-400/50 text-xs text-slate-300 hover:text-white transition-all shadow-md group cursor-pointer mr-1"
              title="Search Portfolio (Ctrl+K or ⌘K)"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <Search size={13} className="text-cyan-400 group-hover:rotate-12 transition-transform" />
              <span className="font-mono text-[11px] text-slate-400 group-hover:text-slate-200">Search</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[9px] font-mono text-slate-400 border border-white/10">⌘K</kbd>
            </motion.button>

            {/* In-Browser CV Inspector Trigger */}
            <motion.button
              onClick={() => window.dispatchEvent(new CustomEvent("open-resume-modal"))}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass border border-purple-500/30 hover:border-purple-400 text-xs text-purple-300 hover:text-white transition-all shadow-md group cursor-pointer mr-1"
              title="View Academic CV & Profile"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <FileText size={13} className="text-purple-400" />
              <span className="font-mono text-[11px] font-semibold">CV</span>
            </motion.button>

            <motion.a
              href="https://github.com/Sangmeshwar-Naik"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-xl glass text-slate-300 hover:text-cyan-400 hover:border-cyan-400/40 transition-all"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.94 }}
              aria-label="GitHub"
            >
              <FaGithub size={17} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/sangmeshwar-naik-555828385"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-xl glass text-slate-300 hover:text-[#0a66c2] hover:border-[#0a66c2]/40 transition-all"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.94 }}
              aria-label="LinkedIn"
            >
              <FaLinkedin size={17} />
            </motion.a>
            <motion.a
              href="mailto:sangameshnaik471@gmail.com"
              className="w-9 h-9 flex items-center justify-center rounded-xl glass text-slate-300 hover:text-pink-400 hover:border-pink-400/40 transition-all"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.94 }}
              aria-label="Email"
            >
              <Mail size={17} />
            </motion.a>

            <motion.button
              onClick={() => handleNavClick("#contact")}
              className="ml-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Let&apos;s Talk
            </motion.button>

            {/* Notification Bell right side of Let's Talk */}
            <NotificationBell />
          </div>

          {/* Mobile Right Controls: Notification Bell & Hamburger Menu */}
          <div className="flex items-center gap-2 lg:hidden">
            <NotificationBell />
            <motion.button
              className="w-10 h-10 flex items-center justify-center rounded-xl glass text-white cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.92 }}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] glass p-6 flex flex-col justify-between border-l border-white/10"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-amber-500/40 shadow-sm shadow-amber-500/20 bg-[#0a0a14]">
                      <Image
                        src="/logo.jpg"
                        alt="SAN Logo"
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </div>
                    <span className="text-base font-bold text-white">Sangmeshwar<span className="text-cyan-400">.</span></span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white"
                  >
                    <X size={22} />
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  {/* Mobile Search Button */}
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setTimeout(() => window.dispatchEvent(new CustomEvent("open-command-palette")), 100);
                    }}
                    className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:border-cyan-400/50 mb-2 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Search size={14} className="text-cyan-400" />
                      <span>Search Portfolio...</span>
                    </span>
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-slate-400 border border-white/10">⌘K</kbd>
                  </button>

                  {/* View CV in Mobile */}
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      window.dispatchEvent(new CustomEvent("open-resume-modal"));
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-sm mb-3 cursor-pointer"
                  >
                    <span className="flex items-center gap-2 font-bold">
                      <FileText size={16} className="text-purple-400" />
                      <span>View &amp; Download CV</span>
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-purple-500/20 text-purple-200">PDF</span>
                  </button>

                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.href.substring(1);
                    return (
                      <motion.button
                        key={item.name}
                        onClick={() => handleNavClick(item.href)}
                        className={`text-left px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                          isActive
                            ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"
                            : "text-slate-300 hover:text-white hover:bg-white/5"
                        }`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {item.name}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <p className="text-xs uppercase tracking-wider text-slate-400 mb-3 font-semibold">
                  Connect With Me
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/Sangmeshwar-Naik"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-xl glass text-slate-300 hover:text-cyan-400"
                  >
                    <FaGithub size={18} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/sangmeshwar-naik-555828385"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-xl glass text-slate-300 hover:text-[#0a66c2]"
                  >
                    <FaLinkedin size={18} />
                  </a>
                  <a
                    href="mailto:sangameshnaik471@gmail.com"
                    className="w-10 h-10 flex items-center justify-center rounded-xl glass text-slate-300 hover:text-pink-400"
                  >
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
