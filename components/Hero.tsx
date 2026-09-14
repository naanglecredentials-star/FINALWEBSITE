"use client";

import { motion } from "framer-motion";

const MotionDiv = motion.div as any;
const MotionH1 = motion.h1 as any;
const MotionP = motion.p as any;

export function Hero() {
  return (
    <section className="relative min-h-[88vh] w-full overflow-hidden bg-white flex items-center">
      <div className="absolute inset-0 hero-grid opacity-60" />
      <div className="absolute -top-32 right-[-10%] h-[520px] w-[520px] rounded-full bg-indigo-100/70 blur-3xl" />
      <div className="absolute -bottom-48 left-[-10%] h-[420px] w-[420px] rounded-full bg-sky-100/70 blur-3xl" />
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 py-24 text-center lg:py-32">
        <MotionDiv initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 shadow-sm backdrop-blur">Enterprise AI Systems</MotionDiv>
        <MotionH1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="max-w-5xl text-5xl font-bold tracking-[-0.045em] text-slate-950 sm:text-6xl md:text-7xl lg:text-[5.5rem] lg:leading-[0.98]">
          Enterprise AI agents<br /><span className="text-indigo-600">you can trust.</span>
        </MotionH1>
        <MotionP initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }} className="mt-8 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">Secure, tailored AI systems designed around your data, workflows, and business goals. Built to be useful, reliable, and ready for enterprise scale.</MotionP>
        <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }} className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="/contact" className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-indigo-600">Book a Call</a>
          <a href="/services" className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-7 py-4 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50">Explore Services</a>
        </MotionDiv>
        <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.8 }} className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-slate-500">
          <span>Built around your data</span><span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" /><span>Enterprise-ready</span><span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" /><span>Designed for measurable results</span>
        </MotionDiv>
      </div>
    </section>
  );
}
