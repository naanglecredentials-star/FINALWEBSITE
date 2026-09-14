"use client";

import { motion } from "framer-motion";

const MotionDiv = motion.div as any;
const MotionH1 = motion.h1 as any;
const MotionP = motion.p as any;

export function Hero() {
  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden bg-[#f4f3ee] flex items-center">
      <div className="absolute inset-0 hero-grid opacity-70" />
      <div className="absolute -top-32 right-[-8%] h-[560px] w-[560px] rounded-full bg-indigo-100/70 blur-3xl animate-pulse-soft" />
      <div className="absolute -bottom-48 left-[-8%] h-[460px] w-[460px] rounded-full bg-sky-100/80 blur-3xl animate-pulse-soft" />

      {/* Floating 3D orb */}
      <MotionDiv
        aria-hidden="true"
        className="absolute right-[7%] top-[19%] hidden xl:block h-72 w-72 [perspective:1000px]"
        animate={{ y: [0, -18, 0], rotateZ: [0, 3, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative h-full w-full [transform-style:preserve-3d] animate-orbit">
          <div className="absolute inset-8 rounded-full bg-gradient-to-br from-slate-950 via-slate-700 to-indigo-300 shadow-[0_35px_80px_rgba(15,23,42,.22)] [transform:translateZ(40px)]" />
          <div className="absolute inset-0 rounded-full border border-slate-900/15 [transform:rotateX(70deg) translateZ(8px)]" />
          <div className="absolute inset-7 rounded-full border border-white/60 [transform:rotateY(55deg) translateZ(35px)]" />
          <div className="absolute left-20 top-16 h-10 w-10 rounded-full bg-white/45 blur-md [transform:translateZ(75px)]" />
          <div className="absolute left-0 top-1/2 h-px w-full bg-white/40 [transform:rotateY(20deg) translateZ(58px)]" />
        </div>
      </MotionDiv>

      {/* Floating metric cards */}
      <MotionDiv aria-hidden="true" animate={{ y: [0, -10, 0], rotate: [0, 1.5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute right-[4%] bottom-[18%] hidden xl:block w-52 rounded-2xl border border-white/80 bg-white/75 p-5 shadow-[0_25px_70px_rgba(15,23,42,.12)] backdrop-blur-xl">
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
