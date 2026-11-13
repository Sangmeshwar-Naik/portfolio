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
            ? "glass py-3.5 border-b border-slate-200/80 bg-white/85 shadow-sm"
            : "py-6 bg-transparent"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => handleNavClick("#hero")}
            className="flex items-center gap-2.5 select-none focus:outline-none group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Sangmeshwar Anil Naik Portfolio Home"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-amber-500/50 shadow-md shadow-amber-500/20 group-hover:border-amber-400 group-hover:shadow-amber-500/40 transition-all bg-slate-900">
              <Image
                src="/logo.jpg"
                alt="SAN Logo"
                fill
                sizes="40px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <span className="text-base sm:text-lg font-black tracking-tight text-slate-950 group-hover:text-gradient transition-colors">
              Sangmeshwar<span className="text-cyan-600">.</span>
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
                  className={`relative text-sm font-semibold transition-colors duration-200 py-1 ${
                    isActive
                      ? "text-cyan-600 font-bold"
                      : "text-slate-600 hover:text-slate-950"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-md bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500"
                      layoutId="nav-underline"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Desktop Social & Action Links - Spacious Rounded Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Quick Command Palette Button */}
            <motion.button
              onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl glass border border-slate-200/90 bg-white/80 hover:border-cyan-400 text-xs text-slate-700 hover:text-slate-950 transition-all shadow-sm group cursor-pointer mr-1"
              title="Search Portfolio (Ctrl+K or ⌘K)"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <Search size={13} className="text-cyan-600 group-hover:rotate-12 transition-transform" />
              <span className="font-mono text-[11px] text-slate-500 group-hover:text-slate-800">Search</span>
              <kbd className="px-1.5 py-0.5 rounded-lg bg-slate-100 text-[9px] font-mono text-slate-500 border border-slate-200">⌘K</kbd>
            </motion.button>

            {/* In-Browser CV & Resume Inspector Trigger */}
            <motion.button
              onClick={() => window.dispatchEvent(new CustomEvent("open-resume-modal"))}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-purple-500/30 bg-purple-50 text-xs text-purple-700 hover:bg-purple-100 transition-all shadow-sm group cursor-pointer mr-1"
              title="View Official PDF Resume & CV"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText size={13} className="text-purple-600 group-hover:scale-110 transition-transform" />
              <span className="font-mono text-[11px] font-bold">Resume</span>
            </motion.button>

            <motion.a
              href="https://github.com/Sangmeshwar-Naik"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9.5 h-9.5 flex items-center justify-center rounded-xl glass border border-slate-200 bg-white/80 text-slate-600 hover:text-slate-950 hover:border-cyan-400 transition-all shadow-sm"
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
              className="w-9.5 h-9.5 flex items-center justify-center rounded-xl glass border border-slate-200 bg-white/80 text-slate-600 hover:text-[#0a66c2] hover:border-[#0a66c2]/40 transition-all shadow-sm"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.94 }}
              aria-label="LinkedIn"
            >
              <FaLinkedin size={17} />
            </motion.a>
            <motion.a
              href="mailto:sangameshnaik471@gmail.com"
              className="w-9.5 h-9.5 flex items-center justify-center rounded-xl glass border border-slate-200 bg-white/80 text-slate-600 hover:text-pink-600 hover:border-pink-400/40 transition-all shadow-sm"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.94 }}
              aria-label="Email"
            >
              <Mail size={17} />
            </motion.a>

            <motion.button
              onClick={() => handleNavClick("#contact")}
              className="ml-2 px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
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
              className="w-10 h-10 flex items-center justify-center rounded-xl glass border border-slate-200 bg-white/90 text-slate-800 cursor-pointer shadow-sm"
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
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] glass bg-white/98 p-6 flex flex-col justify-between border-l border-slate-200 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-slate-200 mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-8 h-8 rounded-xl overflow-hidden border border-amber-500/50 shadow-sm bg-slate-900">
                      <Image
                        src="/logo.jpg"
                        alt="SAN Logo"
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </div>
                    <span className="text-base font-bold text-slate-950">Sangmeshwar<span className="text-cyan-600">.</span></span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900"
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
                    className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 hover:text-slate-950 hover:border-cyan-500 mb-2 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Search size={14} className="text-cyan-600" />
                      <span>Search Portfolio...</span>
                    </span>
                    <kbd className="px-1.5 py-0.5 rounded-lg bg-white text-[10px] text-slate-600 border border-slate-200">⌘K</kbd>
                  </button>

                  {/* View CV in Mobile */}
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      window.dispatchEvent(new CustomEvent("open-resume-modal"));
                    }}
                    className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-purple-50 border border-purple-500/30 text-purple-700 font-mono text-sm mb-3 cursor-pointer"
                  >
                    <span className="flex items-center gap-2 font-bold">
                      <FileText size={16} className="text-purple-600" />
                      <span>View &amp; Download CV</span>
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-700">PDF</span>
                  </button>

                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.href.substring(1);
                    return (
                      <motion.button
                        key={item.name}
                        onClick={() => handleNavClick(item.href)}
                        className={`text-left px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                          isActive
                            ? "bg-cyan-50 text-cyan-700 border border-cyan-300 font-bold"
                            : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
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

              <div className="pt-6 border-t border-slate-200">
                <p className="text-xs uppercase tracking-wider text-slate-500 mb-3 font-semibold">
                  Connect With Me
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/Sangmeshwar-Naik"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-xl glass border border-slate-200 bg-white text-slate-700 hover:text-slate-950 hover:border-cyan-400"
                  >
                    <FaGithub size={18} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/sangmeshwar-naik-555828385"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-xl glass border border-slate-200 bg-white text-slate-700 hover:text-[#0a66c2]"
                  >
                    <FaLinkedin size={18} />
                  </a>
                  <a
                    href="mailto:sangameshnaik471@gmail.com"
                    className="w-10 h-10 flex items-center justify-center rounded-xl glass border border-slate-200 bg-white text-slate-700 hover:text-pink-600"
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
