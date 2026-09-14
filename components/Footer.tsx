"use client";

import React from "react";
import { motion } from "framer-motion";

const MotionDiv = motion.div as any;
const MotionP = motion.p as any;

export function Footer() {
  const currentYear = new Date().getFullYear();
  const companyLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
    { name: "About", href: "/about" },
    { name: "Privacy Policy", href: "/privacy" },
  ];

  return (
    <footer className="relative bg-[#111111] text-white pt-24 sm:pt-32 pb-0 px-5 sm:px-8 overflow-hidden">
      <div className="mx-auto flex flex-col lg:flex-row justify-between gap-16 mb-20 w-full max-w-[1380px]">
        <div className="lg:w-1/2 space-y-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20">
              <div className="h-4 w-4 rounded-full border border-white/80" />
            </div>
            <span className="text-lg font-bold tracking-tight">Naangle</span>
          </div>
          <h3 className="max-w-2xl text-4xl sm:text-6xl md:text-7xl font-medium leading-[.98] tracking-[-0.055em]">
            The future is <span className="text-white/45">automated.</span>
          </h3>
          <p className="max-w-xl text-base sm:text-lg leading-relaxed text-white/55">
            AI systems that help ambitious businesses respond faster, operate smarter, and scale without unnecessary complexity.
          </p>
        </div>

        <div className="flex flex-col items-start lg:items-end">
          <div className="space-y-5 lg:text-right">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/40">Explore</p>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-white/65 hover:text-white transition-colors font-medium">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-white/10 pt-8">
        <MotionP
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mb-10 max-w-[1380px] text-[10px] sm:text-xs font-medium uppercase tracking-[0.25em] text-white/35"
        >
          © {currentYear} Naangle — Build. Scale. Automate.
        </MotionP>
        <MotionDiv
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full select-none pointer-events-none flex justify-center items-end overflow-hidden"
        >
          <h1 className="text-[15vw] font-black leading-[.8] tracking-[-0.08em] uppercase whitespace-nowrap text-white">naangle</h1>
        </MotionDiv>
      </div>
    </footer>
  );
}
