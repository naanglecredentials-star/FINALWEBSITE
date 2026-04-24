"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { PageFade } from "@/components/PageFade";

const MotionDiv = motion.div as any;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 },
  }),
};

const fadeDown = {
  hidden: { opacity: 0, y: -40 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

// ── Animation components ──────────────────────────────
const FloatingImage = ({ src, alt }: { src: string; alt: string }) => (
  <MotionDiv
    animate={{ y: [0, -14, 0] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    className="relative w-full"
  >
    <div className="absolute inset-0 bg-indigo-500/15 blur-[80px] rounded-full -z-10" />
    <Image src={src} alt={alt} width={800} height={600} className="w-full h-auto drop-shadow-2xl" />
  </MotionDiv>
);

// ── Service data ──────────────────────────────────────
const services = [
  {
    id: "01",
    title: "Website Chatbots",
    subtitle: "Advanced Lead Generation",
    description:
      "Convert visitors into booked calls, 24/7. Our bots don't just chat — they sell, qualifying every prospect while you sleep.",
    sellAngle: "Your 24/7 sales rep on your site.",
    image: "/chatbot_new.png",
    accent: "from-indigo-500 to-blue-500",
    tag: "Always On",
    bullets: ["24/7 qualification", "Direct CRM integration", "Custom brand voice"],
  },
  {
    id: "02",
    title: "Social DM Bots",
    subtitle: "IG & FB Automation",
    description:
      "Automate your entire social presence. From the first reply to the final booking, never miss a lead in your DMs again.",
    sellAngle: "Never miss a lead in DMs again.",
    image: "/social_dm_new.png",
    accent: "from-pink-500 to-purple-500",
    tag: "Multi-Channel",
    bullets: ["Instagram & Facebook", "Lead capture to booking", "Seamless handoff"],
  },
  {
    id: "03",
    title: "Email Agents",
    subtitle: "Lead Nurturing at Scale",
    description:
      "Human-level context with n8n reliability. Turn your inbox into an automated revenue machine with instant, intelligent replies.",
    sellAngle: "Instant replies, higher conversion.",
    image: "/email_agent_new.png",
    accent: "from-emerald-500 to-teal-500",
    tag: "High Reliability",
    bullets: ["Smart follow-ups", "n8n powered workflows", "Intelligent context"],
  },
  {
    id: "04",
    title: "AI Lead Qualification",
    subtitle: "Stop Wasting Time",
    description:
      "Push qualified prospects directly to your CRM. Ensure your sales team only ever touches leads that are ready to buy.",
    sellAngle: "Focus only on high-value leads.",
    image: "/lead_qualification_new.png",
    accent: "from-amber-500 to-orange-500",
    tag: "Precision Filtering",
    bullets: ["Smart questioning", "CRM direct push", "Zero wasted effort"],
  },
  {
    id: "05",
    title: "AI Booking Assistant",
    subtitle: "Infinite Flexibility",
    description:
      "Sync website, DM, and email activity directly into your calendar. Stop chasing appointments and let your calendar fill itself.",
    sellAngle: "Your calendar fills itself.",
    image: "/booking_assistant.png",
    accent: "from-violet-500 to-indigo-500",
    tag: "Calendar Sync",
    bullets: ["Multi-platform sync", "Automatic scheduling", "Zero back-and-forth"],
  },
];

// ── Service Card (left-right layout) ─────────────────
function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const isReversed = index % 2 !== 0;

  return (
    <section
      id={`service-${service.id}`}
      className="relative py-24 md:py-36 border-t border-white/5 overflow-hidden"
    >
      {/* Section accent glow */}
      <div
        className={`absolute opacity-[0.07] pointer-events-none w-[600px] h-[600px] rounded-full blur-[130px] bg-gradient-to-br ${service.accent} ${isReversed ? "right-[-100px] top-1/2 -translate-y-1/2" : "left-[-100px] top-1/2 -translate-y-1/2"}`}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center ${isReversed ? "lg:grid-flow-dense" : ""}`}
        >
          {/* Text */}
          <MotionDiv
            initial={{ opacity: 0, x: isReversed ? 60 : -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className={`space-y-7 ${isReversed ? "lg:col-start-2" : ""}`}
          >
            {/* Top row */}
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">{service.id}</span>
              <div className="h-px flex-1 bg-white/10" />
              <span
                className={`text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full bg-gradient-to-r ${service.accent} text-white`}
              >
                {service.tag}
              </span>
            </div>

            <div>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white leading-[1.0] mb-3">
                {service.title}
              </h2>
              <p className="text-lg font-semibold text-white/40 tracking-tight">{service.subtitle}</p>
            </div>

            <p className="text-lg text-slate-400 leading-relaxed">{service.description}</p>

            {/* Bullets */}
            <ul className="space-y-3">
              {service.bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-300 font-medium">
                  <span
                    className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.accent} flex-shrink-0`}
                  />
                  {b}
                </li>
              ))}
            </ul>

            {/* Quote */}
            <div className="inline-block px-5 py-3 rounded-xl bg-white/[0.04] border border-white/10">
              <p className={`text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r ${service.accent} italic`}>
                &ldquo;{service.sellAngle}&rdquo;
              </p>
            </div>
          </MotionDiv>

          {/* Image */}
          <MotionDiv
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className={`flex justify-center ${isReversed ? "lg:col-start-1 lg:row-start-1" : ""}`}
          >
            <div className="w-full max-w-lg">
              <FloatingImage src={service.image} alt={service.title} />
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}

// ── Main export ──────────────────────────────────────
export default function ServicesPage() {
  return (
    <PageFade>
      <div className="relative bg-slate-950 text-white min-h-screen overflow-hidden">

        {/* Ambient top glow */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-indigo-500/15 blur-[160px] rounded-full" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* ── HERO ── */}
        <section className="relative z-10 pt-48 pb-20 px-6 text-center">
          <MotionDiv
            variants={fadeDown}
            initial="hidden"
            animate="show"
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.5em]"
          >
            What We Do
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[1.0] mb-6">
              AI Built for<br />
              <span className="animate-gradient-text">Real Impact.</span>
            </h1>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25 }}
          >
            <p className="max-w-2xl mx-auto text-xl text-slate-400 leading-relaxed">
              Precision-built systems designed to eliminate bottlenecks and power always-on growth.
            </p>
          </MotionDiv>

          {/* Quick nav pills */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 mt-12"
          >
            {services.map((s) => (
              <a
                key={s.id}
                href={`#service-${s.id}`}
                className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all duration-300"
              >
                {s.title}
              </a>
            ))}
          </MotionDiv>
        </section>

        {/* ── SERVICE SECTIONS ── */}
        <div id="services">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* ── FINAL CTA ── */}
        <section className="relative py-40 border-t border-white/5 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-500/20 blur-[150px] rounded-full" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <MotionDiv
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
                Ready to build the <br />
                <span className="animate-gradient-text">future of interaction?</span>
              </h2>
              <p className="text-xl text-slate-400 max-w-xl mx-auto">
                We'll map the right AI systems to your exact workflow and deliver a plan in 48 hours.
              </p>
              <div className="pt-4">
                <a
                  href="/contact"
                  className="h-16 px-14 inline-flex items-center justify-center rounded-2xl bg-white text-slate-900 font-bold text-lg shadow-[0_0_50px_rgba(99,102,241,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_70px_rgba(99,102,241,0.5)] active:scale-95"
                >
                  Book a Strategy Call
                </a>
              </div>
            </MotionDiv>
          </div>
        </section>

      </div>
    </PageFade>
  );
}
