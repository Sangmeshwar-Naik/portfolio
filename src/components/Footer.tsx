"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUp, Heart, Mail, Sparkles, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "hero" },
  { name: "About", href: "about" },
  { name: "Skills", href: "skills" },
  { name: "Projects", href: "projects" },
  { name: "Experience", href: "experience" },
  { name: "Certifications", href: "certifications" },
  { name: "GitHub", href: "github" },
  { name: "Contact", href: "contact" },
];

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full pt-20 pb-10 border-t border-slate-200 overflow-hidden bg-slate-50 flex justify-center text-slate-800">
      {/* Background Glow */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-60 bg-gradient-to-t from-cyan-500/5 via-purple-500/5 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-slate-200">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-3 focus:outline-none group text-left cursor-pointer"
            >
              <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-amber-500/40 shadow-sm group-hover:border-amber-400 transition-all bg-slate-100">
                <Image
                  src="/logo.jpg"
                  alt="SAN Logo"
                  fill
                  sizes="44px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-2xl font-black text-slate-950 group-hover:text-cyan-600 transition-colors">
                Sangmeshwar<span className="text-cyan-600">.</span>
              </span>
            </button>
            <p className="text-sm text-slate-600 max-w-md leading-relaxed">
              Sangmeshwar Anil Naik — AI/ML Engineer, Data Scientist, and GenAI developer specializing in deep neural architectures, medical imaging AI, and modern full-stack platforms.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <MapPin size={14} className="text-cyan-600" />
              <span>Karnataka, India</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-slate-500 mb-4">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {navLinks.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollTo(item.href)}
                  className="text-left text-slate-600 hover:text-cyan-600 transition-colors py-1 text-xs sm:text-sm cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Social & Contact */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-widest text-slate-500 mb-4">
              Connect With Sangmeshwar
            </h4>
            <div className="flex gap-3">
              <a
                href="https://github.com/Sangmeshwar-Naik"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10.5 h-10.5 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-slate-950 hover:border-cyan-400/50 transition-all shadow-sm"
                aria-label="GitHub Profile"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/sangmeshwar-naik-555828385"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10.5 h-10.5 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-[#0a66c2] hover:border-[#0a66c2]/50 transition-all shadow-sm"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href="mailto:sangameshnaik471@gmail.com"
                className="w-10.5 h-10.5 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-pink-600 hover:border-pink-400/50 transition-all shadow-sm"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>

            <p className="text-xs text-slate-500 pt-2">
              Email: <span className="text-slate-900 font-medium">sangameshnaik471@gmail.com</span>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="flex items-center gap-1.5">
            Designed &amp; Developed with{" "}
            <Heart size={14} className="text-pink-500 fill-pink-500" /> by Sangmeshwar Naik
          </p>

          <p>© {new Date().getFullYear()} Sangmeshwar Anil Naik. All rights reserved.</p>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-cyan-600 hover:border-cyan-400 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
