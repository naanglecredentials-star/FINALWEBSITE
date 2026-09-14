"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const MotionDiv = motion.div as any;

function LogoMarquee() {
  const logos = ["OpenAI", "LangChain", "n8n", "Pinecone", "Vercel", "Next.js", "Supabase", "AWS", "Gemini", "Docker", "OpenAI", "LangChain", "n8n", "Pinecone", "Vercel", "Next.js", "Supabase", "AWS", "Gemini", "Docker"];
  return (
    <section className="relative overflow-hidden border-y border-slate-900/10 bg-white py-14">
      <div className="mx-auto max-w-[1380px] px-6 sm:px-8">
        <p className="mb-8 text-center text-[10px] font-bold uppercase tracking-[0.35em] text-slate-500">Built with a modern AI stack</p>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />
          <div className="flex min-w-max animate-marquee">
            {logos.map((logo, i) => <div key={i} className="mx-8 flex h-10 items-center font-fancy text-lg font-semibold tracking-tight text-slate-400 transition hover:text-slate-900">{logo}</div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function AnimatedCounter({ value, duration = 2, suffix = "" }: { value: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const rafRef = useRef<number | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * value));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick); else setCount(value);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [isInView, value, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function StatsSection() {
  const stats = [
    { value: 8, suffix: "X", title: "Productivity", label: "more productive than human agents" },
    { value: 24, suffix: "/7", title: "Availability", label: "uninterrupted availability for customers" },
    { value: 357, suffix: "%", title: "ROI", label: "average return on AI investment" },
    { value: 84, suffix: "%", title: "Resolution", label: "automated resolution rate" },
  ];
  return (
    <section className="bg-[#f4f3ee] py-24 sm:py-32">
      <div className="mx-auto max-w-[1380px] px-6 sm:px-8">
        <div className="mb-16 max-w-4xl">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.35em] text-slate-500">The numbers</p>
          <h2 className="text-4xl font-medium leading-[1.02] tracking-[-0.055em] text-[#111111] sm:text-6xl md:text-7xl">AI agents built to <span className="text-slate-400">move the business forward.</span></h2>
        </div>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[2rem] border border-slate-900/10 bg-slate-900/10 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <MotionDiv key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }} className="bg-white p-8 sm:p-10">
              <div className="mb-16 text-5xl font-medium tracking-[-0.06em] text-[#111111] sm:text-6xl"><AnimatedCounter value={stat.value} suffix={stat.suffix} /></div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">{stat.title}</p>
              <p className="text-base leading-relaxed text-slate-600">{stat.label}</p>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineSection() {
  const steps = [
    { number: "01", title: "We learn your business", description: "We understand your goals, customers, systems, and where growth is being left on the table." },
    { number: "02", title: "We automate the work", description: "From lead capture to follow-up and booking, repetitive work gets handled instantly and consistently." },
    { number: "03", title: "You see real results", description: "More qualified leads, faster responses, and clear reporting that shows exactly what is working." },
  ];
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[1380px] px-6 sm:px-8">
        <div className="mb-16 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl"><p className="mb-5 text-[10px] font-bold uppercase tracking-[0.35em] text-slate-500">How it works</p><h2 className="text-4xl font-medium leading-[1.02] tracking-[-0.055em] text-[#111111] sm:text-6xl">A simple path to <span className="text-slate-400">smarter growth.</span></h2></div>
          <p className="max-w-sm text-sm leading-relaxed text-slate-500">No unnecessary complexity. We connect AI to the parts of your business where speed and consistency matter most.</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {steps.map((step, i) => (
            <MotionDiv key={step.number} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .1 }} className="group rounded-[1.75rem] border border-slate-900/10 bg-[#f4f3ee] p-8 sm:p-10 transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_70px_rgba(15,23,42,.08)]">
              <div className="mb-16 flex items-center justify-between"><span className="text-xs font-bold tracking-[0.25em] text-slate-400">{step.number}</span><span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-900/10 bg-white text-lg transition group-hover:rotate-45">↗</span></div>
              <h3 className="mb-4 text-2xl font-medium tracking-tight text-[#111111]">{step.title}</h3><p className="text-base leading-relaxed text-slate-600">{step.description}</p>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUsSection() {
  const cards = [
    { tag: "Lead generation", headline: "Turn visitors into", italic: "qualified leads", description: "Engage every visitor instantly, qualify intent, and move high-value prospects directly into your pipeline.", bullets: ["24/7 qualification", "CRM integration", "Instant response"] },
    { tag: "Scale smarter", headline: "Grow without", italic: "adding headcount", description: "Automate high-volume interactions across channels so your team can spend more time on work that needs people.", bullets: ["Multi-channel workflows", "Lower operating cost", "Consistent execution"] },
    { tag: "Precision", headline: "Make every interaction", italic: "feel human", description: "Context-aware AI follows your brand voice and business rules while keeping every conversation clear and useful.", bullets: ["Brand voice", "Intent logic", "Human handoff"] },
  ];
  return (
    <section id="why-us" className="bg-[#e9e8e2] py-24 sm:py-32">
      <div className="mx-auto max-w-[1380px] px-6 sm:px-8">
        <div className="mb-16"><p className="mb-5 text-[10px] font-bold uppercase tracking-[0.35em] text-slate-500">Why Naangle</p><h2 className="max-w-4xl text-4xl font-medium leading-[1.02] tracking-[-0.06em] text-[#111111] sm:text-6xl md:text-7xl">Built for <span className="text-slate-500">real-world results.</span></h2></div>
        <div className="space-y-5">
          {cards.map((card, i) => (
            <MotionDiv key={card.tag} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }} className="grid overflow-hidden rounded-[2rem] border border-slate-900/10 bg-white lg:grid-cols-[.75fr_1.25fr_1fr]">
              <div className="flex min-h-[220px] flex-col justify-between bg-[#111111] p-8 text-white sm:p-10"><span className="w-fit rounded-full border border-white/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">{card.tag}</span><span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/35">0{i + 1} / 03</span></div>
              <div className="flex flex-col justify-center border-t border-slate-900/10 p-8 sm:p-10 lg:border-t-0 lg:border-l"><h3 className="text-4xl font-medium leading-[1.03] tracking-[-0.05em] text-[#111111] sm:text-5xl">{card.headline}<br/><span className="text-slate-400">{card.italic}</span></h3></div>
              <div className="flex flex-col justify-between border-t border-slate-900/10 p-8 sm:p-10 lg:border-l lg:border-t-0"><p className="text-base leading-relaxed text-slate-600">{card.description}</p><div className="mt-10 flex flex-wrap gap-2">{card.bullets.map((b) => <span key={b} className="rounded-full bg-[#f4f3ee] px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">{b}</span>)}</div></div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="bg-[#f4f3ee] px-6 py-24 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-[1380px] overflow-hidden rounded-[2.5rem] bg-[#111111] px-6 py-20 text-center text-white sm:px-12 md:py-28">
        <MotionDiv initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-4xl">
          <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.35em] text-white/40">Start a conversation</p>
          <h2 className="text-4xl font-medium leading-[1.02] tracking-[-0.055em] sm:text-6xl md:text-7xl">Ready to build a <span className="text-white/40">smarter operation?</span></h2>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">Let’s find the repetitive work that is slowing your business down and turn it into a reliable AI workflow.</p>
          <a href="/contact" className="mt-10 inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-sm font-bold text-[#111111] transition hover:-translate-y-0.5 hover:bg-slate-100">Book a strategy call <span className="ml-2">↗</span></a>
        </MotionDiv>
      </div>
    </section>
  );
}

export function HomeContent() {
  return <><LogoMarquee /><StatsSection /><TimelineSection /><WhyUsSection /><FinalCTA /></>;
}
