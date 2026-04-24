"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

const MotionHeader = motion.header as React.ComponentType<
  React.HTMLAttributes<HTMLElement> & any
>;

const links = [
  { href: "/", label: "Home" },
  { href: "/contact", label: "Contact" }
];

export function Navbar() {

  return (
    <MotionHeader
      // Smooth Opening Animation
      initial={{ y: -100, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.2
      }}
      className="fixed top-0 left-0 right-0 z-50 px-6 pt-8"
    >
      <div className="mx-auto flex w-[100%] max-w-[1500px] items-center justify-between rounded-full px-12 py-4 backdrop-blur-xl transition-all duration-500 border border-white/15 bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">

        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border shadow-sm transition-all duration-500 border-white/20 bg-white/10">
            <div className="h-5 w-5 rounded-full bg-[conic-gradient(at_top,_#fb7185,_#ec4899,_#6366f1,_#22d3ee,_#fb7185)]" />
          </div>
          <Link href="/" className="text-xl font-semibold tracking-tight lowercase hover:opacity-80 transition-all duration-500 text-white">
            Naangle
          </Link>
        </div>

        {/* Links Section */}
        <nav className="flex items-center gap-12">
          <Link
            href="/about"
            className="group relative text-sm font-medium transition-all duration-500 text-white/80"
          >
            <span className="relative z-10 transition-colors group-hover:text-white">
              About
            </span>
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300 group-hover:w-full" />
          </Link>

          <Link
            href="/services"
            className="group relative text-sm font-medium transition-all duration-500 text-white/80"
          >
            <span className="relative z-10 transition-colors group-hover:text-white">
              Services
            </span>
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300 group-hover:w-full" />
          </Link>

          <Link
            href="/contact"
            className="group relative text-sm font-medium transition-all duration-500 text-white/80"
          >
            <span className="relative z-10 transition-colors group-hover:text-white">
              Contact
            </span>

            {/* underline glow animation */}
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300 group-hover:w-full" />
          </Link>
        </nav>
      </div>
    </MotionHeader>
  );
}