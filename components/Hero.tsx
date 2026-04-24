"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const MotionDiv = motion.div as any;
const MotionH1 = motion.h1 as any;
const MotionP = motion.p as any;
const MotionSpan = motion.span as any;

export function Hero() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);
  const [typedText, setTypedText] = useState("");
  const fullText = "Secure, Tailored AI systems designed around your data and workflows";

  // Typing effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 35);
    return () => clearInterval(interval);
  }, []);

  // Vanta.js TOPOLOGY
  useEffect(() => {
    let isMounted = true;

    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement;
        if (existing) {
          // Script tag exists but might still be loading
          if (existing.dataset.loaded === "true") {
            resolve();
          } else {
            existing.addEventListener("load", () => resolve());
            existing.addEventListener("error", () => reject());
          }
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.dataset.loaded = "false";
        script.onload = () => {
          script.dataset.loaded = "true";
          resolve();
        };
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const waitFor = (check: () => boolean, timeout = 5000): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (check()) { resolve(); return; }
        const start = Date.now();
        const interval = setInterval(() => {
          if (check()) { clearInterval(interval); resolve(); }
          else if (Date.now() - start > timeout) { clearInterval(interval); reject(new Error("Timeout")); }
        }, 50);
      });
    };

    const loadVanta = async () => {
      try {
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js");
        await waitFor(() => !!(window as any).THREE);
        await loadScript("https://unpkg.com/vanta@0.5.24/dist/vanta.net.min.js");
        await waitFor(() => !!(window as any).VANTA?.NET);

        if (isMounted && vantaRef.current && !vantaEffect.current) {
          vantaEffect.current = (window as any).VANTA.NET({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0x6366f1,
            backgroundColor: 0x0a0a0f,
            points: 10,
            maxDistance: 22,
            spacing: 18,
          });
        }
      } catch (e) {
        console.warn("Vanta.js failed to load:", e);
      }
    };

    loadVanta();

    return () => {
      isMounted = false;
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Vanta.js Canvas */}
      <div ref={vantaRef} className="absolute inset-0 z-0" />

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-black/60" />

      {/* Floating particles */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-indigo-400/20 animate-float"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${Math.random() * 4 + 4}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center px-6 text-center max-w-5xl mx-auto">


        {/* Main Heading */}
        <MotionH1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-8xl font-bold text-white tracking-tight leading-[0.95]"
        >
          Enterprise AI agents
          <br />
          <span className="animate-gradient-text">you can Trust</span>
        </MotionH1>

        {/* Typing subtitle */}
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 text-lg md:text-xl text-white/60 max-w-2xl font-medium h-[60px]"
        >
          <span>{typedText}</span>
          <span className="inline-block w-[2px] h-5 bg-white/60 ml-1 animate-pulse" />
        </MotionDiv>

        {/* CTA Buttons */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <a
            href="/contact"
            className="group relative h-14 px-10 flex items-center justify-center rounded-2xl bg-white text-slate-900 font-bold text-sm shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(99,102,241,0.5)] active:scale-95"
          >
            Book a Call
          </a>
          <a
            href="/services"
            className="h-14 px-10 flex items-center justify-center rounded-2xl glass text-white/90 font-semibold text-sm transition-all duration-500 hover:scale-105 hover:bg-white/10"
          >
            Explore Services
          </a>
        </MotionDiv>


      </div>
    </section>
  );
}