"use client";

import { useEffect, useState, useRef } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const startTime = useRef(Date.now());
  const dismissed = useRef(false);

  useEffect(() => {
    const MIN_MS = 1500;
    const MAX_MS = 5000;

    function dismiss() {
      if (dismissed.current) return;
      dismissed.current = true;

      const elapsed = Date.now() - startTime.current;
      const remaining = Math.max(0, MIN_MS - elapsed);

      // Wait out whatever remains of the minimum, then fade
      setTimeout(() => {
        setFading(true);
        // Remove from DOM after CSS transition completes (650ms)
        setTimeout(() => setVisible(false), 650);
      }, remaining);
    }

    // Primary signal: all resources (images, fonts) are loaded
    if (document.readyState === "complete") {
      dismiss();
    } else {
      window.addEventListener("load", dismiss, { once: true });
    }

    // Hard cap — never block longer than MAX_MS
    const cap = setTimeout(dismiss, MAX_MS);

    return () => {
      window.removeEventListener("load", dismiss);
      clearTimeout(cap);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-label="Loading"
      role="status"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
        opacity: fading ? 0 : 1,
        transition: "opacity 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: fading ? "none" : "all",
      }}
    >
      {/* ── Logo + spinner ring ── */}
      <div
        style={{
          position: "relative",
          width: 110,
          height: 110,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Thin rotating ring */}
        <svg
          viewBox="0 0 110 110"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            animation: "luvera-spin 2.2s linear infinite",
          }}
        >
          <circle
            cx="55"
            cy="55"
            r="50"
            fill="none"
            stroke="#c9a97a"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeDasharray="220"
            strokeDashoffset="160"
            opacity="0.85"
          />
        </svg>

        {/* Brand wordmark — swap with <Image> if you have an SVG logo */}
        <span
          style={{
            position: "relative",
            zIndex: 1,
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 200,
            fontSize: "0.78rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#f0ece4",
            animation: "luvera-breathe 2.2s ease-in-out infinite",
          }}
        >
          Luvera
        </span>
      </div>

      {/* Tagline */}
      <span
        style={{
          marginTop: 22,
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "0.72rem",
          letterSpacing: "0.18em",
          color: "#6b5e4e",
          textTransform: "lowercase",
          animation: "luvera-fadeup 1s ease 0.4s both",
        }}
      >
        skin, elevated
      </span>

      {/* Keyframes injected once via a style tag */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,300&family=Raleway:wght@200&display=swap');

        @keyframes luvera-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes luvera-breathe {
          0%, 100% { opacity: 0.75; }
          50%       { opacity: 1; }
        }
        @keyframes luvera-fadeup {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}