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
    <footer className="relative bg-slate-950 pt-32 pb-0 px-6 overflow-hidden border-t border-white/5">
      {/* Top Section */}
      <div className="mx-auto flex flex-col lg:flex-row justify-between gap-20 mb-20 w-full max-w-[1500px] px-12">

        {/* Left Side: Catchy Phrase & Icon Animation */}
        <div className="lg:w-1/3 space-y-8">
          <div className="relative w-16 h-16">
            {/* Animated Logo/Icon */}
            <MotionDiv
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 180, 270, 360]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full"
            />
            <MotionDiv
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="relative z-10 w-full h-full flex items-center justify-center"
            >
              <div className="w-8 h-8 border-t-2 border-r-2 border-indigo-500 rounded-tr-lg" />
              <div className="absolute w-8 h-8 border-b-2 border-l-2 border-indigo-400 rounded-bl-lg" />
              <div className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
            </MotionDiv>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-white leading-tight">
              The future is <span className="text-indigo-500">automated.</span> <br />
              <span className="text-slate-500 text-xl font-medium mt-2 block italic">Scale without limits.</span>
            </h3>
          </div>
        </div>

        {/* Right Side: Links (Company Only) - Vertical & Aligned Right */}
        <div className="flex flex-col items-end">
          <div className="space-y-6 text-right">
            <h4 className="text-indigo-400 text-sm font-black uppercase tracking-[0.2em]">Company</h4>
            <ul className="flex flex-col gap-4">
              {companyLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-slate-400 hover:text-white transition-colors duration-300 font-medium whitespace-nowrap block">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* THE BIG TEXT - Perfectly Centered & Edge-to-Edge */}
      <div className="w-full mt-24 flex flex-col items-center justify-end overflow-hidden border-t border-white/5 pt-16">

        {/* Repositioned Copyright - Moved above the big text to allow big text to hit the bottom */}
        <MotionP
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-slate-600 text-[10px] md:text-sm font-bold uppercase tracking-[0.5em] mb-12"
        >
          © {currentYear} naangle — Build. Scale. Automate.
        </MotionP>

        <MotionDiv
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full select-none pointer-events-none flex justify-center items-end"
        >
          <h1 className="text-[21.7vw] font-black text-white leading-none tracking-[-0.08em] uppercase whitespace-nowrap mb-[-2vw]">
            naangl<span className="ml-[1px]">e</span>
          </h1>
        </MotionDiv>
      </div>

      {/* Background Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-indigo-500/5 to-transparent pointer-events-none" />
    </footer>
  );
}

