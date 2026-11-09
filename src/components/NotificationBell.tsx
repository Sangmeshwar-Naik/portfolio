"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  Mail,
  User,
  Clock,
  Sparkles,
  ExternalLink,
  X,
  Inbox,
  AlertCircle,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export interface ContactNotification {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
}

const STORAGE_KEY = "portfolio_notifications";

// Initial sample notification so the user immediately sees the notification system in action!
const INITIAL_DEMO_NOTIFICATIONS: ContactNotification[] = [
  {
    id: "demo-welcome",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
    name: "Alex Vance (Tech Lead)",
    email: "alex.vance@ai-innovations.io",
    subject: "🚀 AI / ML Project Collaboration & Research",
    message:
      "Hi Sangmeshwar! I reviewed your Hybrid Quantum Brain Tumor segmentation architecture on GitHub. Your 0.94 Dice score on U-Net is very impressive. We'd love to schedule a quick technical chat regarding an AI Engineering role.",
    read: false,
  },
];

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<ContactNotification[]>([]);
  const [hasNewAlert, setHasNewAlert] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Load notifications from localStorage & backend on mount
  useEffect(() => {
    let initialList: ContactNotification[] = [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          initialList = parsed;
        }
      }
    } catch {
      // Fallback
    }

    if (initialList.length === 0) {
      initialList = INITIAL_DEMO_NOTIFICATIONS;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_NOTIFICATIONS));
      } catch {
        // Safe
      }
    }

    setNotifications(initialList);

    // Sync from server if available
    fetch("/api/contact")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.success && Array.isArray(data.messages) && data.messages.length > 0) {
          setNotifications((prev) => {
            const combinedMap = new Map<string, ContactNotification>();
            prev.forEach((item) => combinedMap.set(item.id, item));
            data.messages.forEach((item: ContactNotification) => {
              if (!combinedMap.has(item.id)) {
                combinedMap.set(item.id, { ...item, read: item.read ?? false });
              }
            });
            const merged = Array.from(combinedMap.values()).sort(
              (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            );
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
            } catch {
              // Ignore
            }
            return merged;
          });
        }
      })
      .catch(() => {
        // Safe offline fallback
      });
  }, []);

  // Listen for real-time messages dispatched from Contact.tsx
  useEffect(() => {
    const handleNewMessage = (e: CustomEvent<ContactNotification>) => {
      const incoming = e.detail;
      if (!incoming) return;

      setNotifications((prev) => {
        const filtered = prev.filter((item) => item.id !== incoming.id);
        const updated = [incoming, ...filtered];
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // Ignore
        }
        return updated;
      });

      // Trigger bell vibration / alert
      setHasNewAlert(true);
      setTimeout(() => setHasNewAlert(false), 3000);
    };

    window.addEventListener(
      "portfolio-new-message",
      handleNewMessage as EventListener
    );

    return () => {
      window.removeEventListener(
        "portfolio-new-message",
        handleNewMessage as EventListener
      );
    };
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const saveToStorageAndState = useCallback((newList: ContactNotification[]) => {
    setNotifications(newList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    } catch {
      // Safe
    }
  }, []);

  // 1. Mark as Read / Unread option
  const handleToggleRead = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const updated = notifications.map((item) =>
      item.id === id ? { ...item, read: !item.read } : item
    );
    saveToStorageAndState(updated);

    // Sync with backend
    const target = updated.find((item) => item.id === id);
    if (target) {
      fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, read: target.read }),
      }).catch(() => {});
    }
  };

  // Mark all as read
  const handleMarkAllAsRead = () => {
    const updated = notifications.map((item) => ({ ...item, read: true }));
    saveToStorageAndState(updated);
    fetch("/api/contact", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ markAllAsRead: true }),
    }).catch(() => {});
  };

  // 2. Delete option
  const handleDelete = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const updated = notifications.filter((item) => item.id !== id);
    saveToStorageAndState(updated);
    fetch(`/api/contact?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    }).catch(() => {});
  };

  // Clear all
  const handleClearAll = () => {
    saveToStorageAndState([]);
    fetch("/api/contact?clearAll=true", { method: "DELETE" }).catch(() => {});
  };

  // Quick test notification trigger
  const handleAddTestNotification = () => {
    const testItem: ContactNotification = {
      id: "test-" + Date.now(),
      timestamp: new Date().toISOString(),
      name: "Dr. Ramesh Sharma (Research AI)",
      email: "r.sharma@vtu.ac.in",
      subject: "💡 Quantum ML Research & QCNN Collaboration",
      message:
        "Hello Sangmeshwar, I would like to invite you to present your hybrid QCNN medical imaging research at the upcoming VTU Computing Symposium. Please confirm your availability.",
      read: false,
    };

    saveToStorageAndState([testItem, ...notifications]);
    setHasNewAlert(true);
    setTimeout(() => setHasNewAlert(false), 3000);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const formatRelativeTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffSecs = Math.floor(diffMs / 1000);
      const diffMins = Math.floor(diffSecs / 60);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffSecs < 60) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays === 1) return "Yesterday";
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } catch {
      return "Recent";
    }
  };

  return (
    <div className="relative inline-block" ref={popoverRef}>
      {/* ============================================================== */}
      {/* THE NOTIFICATION BELL ICON (Beside "Let's Talk")               */}
      {/* ============================================================== */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`relative w-9.5 h-9.5 sm:w-10 sm:h-10 rounded-xl glass border flex items-center justify-center transition-all cursor-pointer shadow-md ${
          isOpen
            ? "border-cyan-400 bg-cyan-500/20 text-cyan-300 shadow-cyan-500/30 scale-105"
            : unreadCount > 0
            ? "border-cyan-500/40 text-cyan-300 hover:border-cyan-400 hover:text-white"
            : "border-white/10 text-slate-300 hover:text-white hover:border-white/30"
        }`}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        animate={hasNewAlert ? { rotate: [0, -15, 15, -10, 10, 0] } : {}}
        transition={{ duration: 0.6 }}
        title={`Notifications (${unreadCount} unread)`}
        aria-label="View Inquiries & Notifications"
      >
        <Bell size={18} className={unreadCount > 0 ? "text-cyan-400" : ""} />

        {/* Unread Counter Badge with Pulsing Beacon */}
        {unreadCount > 0 && (
          <>
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 animate-ping opacity-75 pointer-events-none" />
            <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] px-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-[10px] font-mono font-black text-white flex items-center justify-center border-2 border-[#050508] shadow-md shadow-rose-500/50">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          </>
        )}
      </motion.button>

      {/* ============================================================== */}
      {/* NOTIFICATIONS POPOVER DIALOG                                   */}
      {/* ============================================================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="absolute right-0 top-12 sm:top-14 w-[92vw] sm:w-[420px] max-w-[440px] rounded-3xl glass border border-cyan-500/40 shadow-2xl shadow-cyan-500/25 bg-[#070818]/98 backdrop-blur-2xl z-50 overflow-hidden flex flex-col"
            style={{ maxHeight: "calc(100vh - 100px)" }}
          >
            {/* Popover Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Inbox size={17} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white font-mono">
                      Inquiries &amp; Messages
                    </h3>
                    {unreadCount > 0 && (
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono font-bold">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                    Live channel connected to Send a Direct Message
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="p-2 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-white/[0.06] transition-colors cursor-pointer text-xs font-mono flex items-center gap-1"
                    title="Mark all as read"
                  >
                    <CheckCheck size={14} />
                    <span className="text-[10px] hidden sm:inline">All Read</span>
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                  title="Close notifications"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Notification Messages List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 max-h-[460px] text-xs">
              {notifications.length === 0 ? (
                /* Empty State */
                <div className="py-12 px-6 text-center flex flex-col items-center justify-center">
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-500 mb-3.5 shadow-inner">
                    <Bell size={24} className="opacity-60" />
                  </div>
                  <h4 className="text-sm font-bold text-white font-mono">No New Inquiries</h4>
                  <p className="text-xs text-slate-400 mt-2 max-w-xs leading-relaxed font-sans">
                    When anyone fills out the <strong className="text-cyan-300 font-medium">Send a Direct Message</strong> form in the contact section, their message will appear here with instant alerts.
                  </p>
                  <button
                    onClick={handleAddTestNotification}
                    className="mt-4 px-4 py-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/25 text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                  >
                    <Sparkles size={13} />
                    <span>Send Test Notification</span>
                  </button>
                </div>
              ) : (
                /* Cards List */
                notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-2xl border transition-all relative overflow-hidden ${
                      item.read
                        ? "bg-white/[0.02] border-white/5 text-slate-300"
                        : "bg-cyan-500/[0.06] border-cyan-500/35 text-white shadow-md shadow-cyan-500/10"
                    }`}
                  >
                    {/* Unread Indicator Bar */}
                    {!item.read && (
                      <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-sm shadow-cyan-400" />
                    )}

                    {/* Sender Info Row */}
                    <div className="flex items-start gap-3 mb-2.5">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs uppercase shrink-0 shadow-sm ${
                          item.read
                            ? "bg-white/10 text-slate-300"
                            : "bg-gradient-to-tr from-cyan-500 to-purple-600 text-white"
                        }`}
                      >
                        {item.name.charAt(0) || "U"}
                      </div>
                      <div className="flex-1 min-w-0 pr-4">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                            {item.name}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1 shrink-0">
                            <Clock size={10} />
                            <span>{formatRelativeTime(item.timestamp)}</span>
                          </span>
                        </div>
                        <a
                          href={`mailto:${item.email}`}
                          className="text-[11px] text-cyan-400 hover:underline truncate block font-mono"
                        >
                          {item.email}
                        </a>
                      </div>
                    </div>

                    {/* Subject Pill */}
                    <div className="mb-2.5">
                      <span className="inline-block text-[11px] font-mono px-3 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-slate-200">
                        {item.subject}
                      </span>
                    </div>

                    {/* Message Body */}
                    <div className="p-3 rounded-xl bg-black/30 border border-white/5 text-slate-200 text-xs leading-relaxed font-sans whitespace-pre-wrap mb-3.5">
                      {item.message}
                    </div>

                    {/* ============================================================== */}
                    {/* THE 2 REQUESTED OPTIONS: "Mark as Read" & "Delete"            */}
                    {/* ============================================================== */}
                    <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-white/10">
                      {/* Option 1: Mark as Read / Unread */}
                      <button
                        onClick={(e) => handleToggleRead(item.id, e)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[11px] font-mono font-semibold transition-all cursor-pointer ${
                          item.read
                            ? "bg-white/[0.04] text-slate-400 hover:text-cyan-300 hover:bg-white/[0.08] border border-white/10"
                            : "bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 shadow-sm"
                        }`}
                        title={item.read ? "Mark as unread" : "Mark as read"}
                      >
                        <Check size={12} className={item.read ? "text-slate-400" : "text-cyan-400"} />
                        <span>{item.read ? "Mark as Unread" : "Mark as Read"}</span>
                      </button>

                      {/* Option 2: Delete */}
                      <div className="flex items-center gap-1.5">
                        {/* Direct Email Reply Shortcut */}
                        <a
                          href={`mailto:${item.email}?subject=${encodeURIComponent(
                            "Re: " + item.subject
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-white/[0.06] transition-colors"
                          title="Reply via Email"
                        >
                          <Mail size={13} />
                        </a>

                        <button
                          onClick={(e) => handleDelete(item.id, e)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/25 border border-rose-500/25 text-rose-300 text-[11px] font-mono font-semibold transition-all cursor-pointer"
                          title="Delete message permanently"
                        >
                          <Trash2 size={12} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Popover Footer Strip */}
            {notifications.length > 0 && (
              <div className="p-3.5 border-t border-white/10 bg-black/40 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Total: {notifications.length} message{notifications.length > 1 ? "s" : ""}</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleAddTestNotification}
                    className="text-cyan-400 hover:underline cursor-pointer"
                  >
                    + Test Message
                  </button>
                  <span>•</span>
                  <button
                    onClick={handleClearAll}
                    className="text-rose-400 hover:underline cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

