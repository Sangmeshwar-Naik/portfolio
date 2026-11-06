"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

export default function CustomCursor() {
  const isMounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        setIsVisible(true);
        ringX = mouseX;
        ringY = mouseY;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const animate = () => {
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    const checkHover = () => {
      const interactive = document.querySelectorAll(
        "a, button, input, textarea, select, [role='button'], .clickable"
      );
      interactive.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovered(true));
        el.addEventListener("mouseleave", () => setIsHovered(false));
      });
    };

    checkHover();
    const observer = new MutationObserver(checkHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (!isMounted) return null;

  return (
    <>
      {/* High-visibility glowing neon core dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[999999999] transition-opacity duration-200"
        style={{
          width: isHovered ? "10px" : "8px",
          height: isHovered ? "10px" : "8px",
          borderRadius: "50%",
          backgroundColor: "#00f5ff",
          boxShadow: "0 0 12px #00f5ff, 0 0 24px #00f5ff, 0 0 36px #bf00ff",
          opacity: isVisible ? 1 : 0,
          transform: "translate3d(-100px, -100px, 0)",
          transition: "width 0.15s ease, height 0.15s ease, opacity 0.2s ease",
        }}
      />

      {/* Trailing ambient electric plasma halo */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[999999998] transition-opacity duration-200"
        style={{
          width: isHovered ? "52px" : isClicked ? "30px" : "40px",
          height: isHovered ? "52px" : isClicked ? "30px" : "40px",
          borderRadius: "50%",
          border: isHovered
            ? "2px solid rgba(191, 0, 255, 0.95)"
            : "1.5px solid rgba(0, 245, 255, 0.8)",
          boxShadow: isHovered
            ? "0 0 25px rgba(191, 0, 255, 0.6), inset 0 0 12px rgba(191, 0, 255, 0.3)"
            : "0 0 15px rgba(0, 245, 255, 0.4), inset 0 0 8px rgba(0, 245, 255, 0.15)",
          backgroundColor: isHovered
            ? "rgba(191, 0, 255, 0.1)"
            : "rgba(0, 245, 255, 0.04)",
          opacity: isVisible ? 1 : 0,
          transform: "translate3d(-100px, -100px, 0)",
          transition:
            "width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease",
        }}
      />
    </>
  );
}
