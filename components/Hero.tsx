"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCallback } from "react";

const MotionDiv = motion.div as any;
const MotionH1 = motion.h1 as any;
const MotionP = motion.p as any;

export function Hero() {
  const rotateX = useSpring(useMotionValue(0), { stiffness: 120, damping: 18, mass: 0.7 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 120, damping: 18, mass: 0.7 });
  const sphereRotateX = rotateX;
  const sphereRotateY = rotateY;

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    sphereRotateX.set((0.5 - y) * 18);
    sphereRotateY.set((x - 0.5) * 24);
  }, [sphereRotateX, sphereRotateY]);

  const handleMouseLeave = useCallback(() => {
    sphereRotateX.set(0);
    sphereRotateY.set(0);
  }, [sphereRotateX, sphereRotateY]);

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] w-full overflow-hidden bg-[#f4f3ee] flex items-center"
    >
      <div className="absolute inset-0 hero-grid opacity-70" />
      <div className="absolute -top-32 right-[-8%] h-[560px] w-[560px] rounded-full bg-indigo-100/70 blur-3xl animate-pulse-soft" />
      <div className="absolute -bottom-48 left-[-8%] h-[460px] w-[460px] rounded-full bg-sky-100/80 blur-3xl animate-pulse-soft" />

      {/* Interactive 3D sphere */}
      <MotionDiv
        aria-hidden="true"
        className="absolute right-[7%] top-[16%] hidden xl:block h-80 w-80 [perspective:1100px]"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <MotionDiv
          className="relative h-full w-full [transform-style:preserve-3d]"
          style={{ rotateX: sphereRotateX, rotateY: sphereRotateY }}
        >
          {/* Orbit rings */}
          <div className="absolute inset-2 rounded-full border border-slate-900/10 [transform:rotateX(70deg) translateZ(2px)]" />
          <div className="absolute inset-0 rounded-full border border-slate-900/10 [transform:rotateY(62deg)]" />
          <div className="absolute inset-5 rounded-full border border-indigo-300/30 [transform:rotateX(18deg) rotateY(62deg) translateZ(8px)]" />

          {/* Main premium sphere */}
          <div className="absolute inset-12 overflow-hidden rounded-full bg-[radial-gradient(circle_at_30%_22%,#f8fafc_0%,#cbd5e1_8%,#64748b_35%,#26364f_67%,#101827_100%)] shadow-[inset_-35px_-25px_70px_rgba(15,23,42,.55),inset_20px_18px_35px_rgba(255,255,255,.22),0_45px_90px_rgba(15,23,42,.20)] [transform:translateZ(45px)]">
            <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-white/50 blur-2xl" />
            <div className="absolute bottom-0 right-0 h-28 w-28 rounded-full bg-indigo-400/25 blur-2xl" />
            <div className="absolute inset-0 bg-[linear-gradient(125deg,transparent_35%,rgba(255,255,255,.16)_47%,transparent_58%)] animate-shimmer" />
          </div>

          {/* Floating 3D satellite nodes */}
          <div className="absolute left-[12%] top-[42%] h-3 w-3 rounded-full bg-slate-950 shadow-[0_0_25px_rgba(79,70,229,.35)] [transform:translateZ(85px)]" />
          <div className="absolute right-[8%] top-[28%] h-2.5 w-2.5 rounded-full bg-indigo-500 [transform:translateZ(100px)]" />
          <div className="absolute bottom-[16%] left-[25%] h-2 w-2 rounded-full bg-slate-400 [transform:translateZ(75px)]" />
        </MotionDiv>
      </MotionDiv>

      {/* Floating AI metric card */}
      <MotionDiv
        aria-hidden="true"
        animate={{ y: [0, -10, 0], rotate: [0, 1.5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[4%] bottom-[18%] hidden xl:block w-52 rounded-2xl border border-white/80 bg-white/75 p-5 shadow-[0_25px_70px_rgba(15,23,42,.12)] backdrop-blur-xl"
      >
        <p className="text-[9px] font-bold uppercase tracking-[.25em] text-slate-400">AI Response</p>
        <div className="mt-2 flex items-end justify-between"><span className="text-3xl font-bold tracking-tight text-slate-950">0.4s</span><span className="text-xs font-semibold text-slate-500">avg.</span></div>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-[82%] rounded-full bg-slate-900 animate-progress" /></div>
      </MotionDiv>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 py-24 text-center lg:py-32">
        <MotionDiv initial={{ opacity: 0, y: 16, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .7 }} className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 shadow-sm backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-900 animate-ping" /> Enterprise AI Systems
        </MotionDiv>
        <MotionH1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .1, ease: [0.16, 1, .3, 1] }} className="max-w-5xl text-5xl font-bold tracking-[-0.055em] text-slate-950 sm:text-6xl md:text-7xl lg:text-[5.8rem] lg:leading-[.95]">
          Enterprise AI agents<br /><span className="relative inline-block text-slate-500">you can trust.<span className="absolute -bottom-2 left-0 h-px w-full bg-gradient-to-r from-transparent via-slate-400 to-transparent" /></span>
        </MotionH1>
        <MotionP initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .35 }} className="mt-8 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">Secure, tailored AI systems designed around your data, workflows, and business goals. Built to be useful, reliable, and ready for enterprise scale.</MotionP>
        <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .5 }} className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="/contact" className="group inline-flex items-center justify-center gap-3 rounded-full bg-slate-950 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-1 hover:bg-slate-800">Book a Call <span className="transition-transform group-hover:translate-x-1">↗</span></a>
          <a href="/services" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-4 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-1 hover:border-slate-400 hover:bg-slate-50">Explore Services</a>
        </MotionDiv>
        <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .8, delay: .8 }} className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-slate-500">
          <span>Built around your data</span><span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" /><span>Enterprise-ready</span><span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" /><span>Designed for measurable results</span>
        </MotionDiv>
      </div>
    </section>
  );
}
