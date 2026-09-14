"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";

const MotionHeader = motion.header as React.ComponentType<React.HTMLAttributes<HTMLElement> & any>;

export function Navbar() {
  return (
    <MotionHeader
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-5 sm:pt-7"
    >
      <div className="mx-auto flex w-full max-w-[1380px] items-center justify-between rounded-full border border-slate-900/10 bg-white/85 px-5 sm:px-8 py-3 backdrop-blur-xl shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111111] transition-transform duration-300 group-hover:rotate-12">
            <div className="h-3.5 w-3.5 rounded-full border border-white/80" />
          </div>
          <span className="text-lg font-bold tracking-[-0.03em] text-[#111111]">Naangle</span>
        </Link>

        <nav className="hidden sm:flex items-center gap-1 rounded-full border border-slate-900/10 bg-[#f4f3ee] p-1">
          <Link href="/" className="rounded-full px-5 py-2 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-slate-950">Home</Link>
          <Link href="/about" className="rounded-full px-5 py-2 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-slate-950">About</Link>
          <Link href="/services" className="rounded-full px-5 py-2 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-slate-950">Services</Link>
        </nav>

        <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-[#111111] px-5 sm:px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 hover:-translate-y-0.5">
          <span>Contact</span>
          <span className="transition-transform group-hover:translate-x-0.5">↗</span>
        </Link>
      </div>
    </MotionHeader>
  );
}
