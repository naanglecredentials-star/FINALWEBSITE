"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const MotionDiv = motion.div as any;
const MotionH2 = motion.h2 as any;
const MotionP = motion.p as any;
const MotionSpan = motion.span as any;

/* ============================================================
   SECTION 1: LOGO MARQUEE
   ============================================================ */
function LogoMarquee() {
    const logos = [
        "OpenAI", "LangChain", "n8n", "Pinecone", "Vercel",
        "Next.js", "Supabase", "AWS", "Gemini", "Docker",
        "OpenAI", "LangChain", "n8n", "Pinecone", "Vercel",
        "Next.js", "Supabase", "AWS", "Gemini", "Docker",
    ];

    return (
        <section className="relative py-20 bg-slate-950 overflow-hidden">
            {/* Gradient fade from hero to this section */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0a0f] to-transparent pointer-events-none" />

            <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <p className="text-xs tracking-[0.3em] uppercase text-white/40 font-semibold">
                    Built with the best in class
                </p>
            </MotionDiv>

            <div className="relative">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10" />

                <div className="flex animate-marquee">
                    {logos.map((logo, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 mx-10 flex items-center justify-center h-12 px-4 font-fancy text-lg italic text-white/50 tracking-wide hover:text-white/80 transition-all duration-300"
                        >
                            {logo}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}


/* ============================================================
   SECTION 2: ANIMATED STATS (ADA STYLE)
   ============================================================ */
function AnimatedCounter({ value, duration = 2, suffix = "" }: { value: number; duration?: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const rafRef = useRef<number | null>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;
        const startTime = performance.now();
        const durationMs = duration * 1000;
        const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

        const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / durationMs, 1);
            setCount(Math.floor(easeOutExpo(progress) * value));
            if (progress < 1) {
                rafRef.current = requestAnimationFrame(tick);
            } else {
                setCount(value);
            }
        };

        rafRef.current = requestAnimationFrame(tick);
        return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    }, [isInView, value, duration]);

    return (
        <span ref={ref}>
            {count}{suffix}
        </span>
    );
}

function StatsSection() {
    const stats = [
        { value: 8, suffix: "X", label: "more productive than human agents", color: "emerald", title: "Productivity" },
        { value: 24, suffix: "/7", label: "uninterrupted availability for your customers", color: "pink", title: "Availability" },
        { value: 357, suffix: "%", label: "average ROI on AI investment", color: "blue", title: "ROI" },
        { value: 84, suffix: "%", label: "automated resolution rate", color: "amber", title: "Resolution" },
    ];

    const colorClasses: Record<string, string> = {
        emerald: "border-emerald-400 text-emerald-400",
        pink: "border-pink-400 text-pink-400",
        blue: "border-blue-400 text-blue-400",
        amber: "border-amber-300 text-amber-300"
    };

    const borderClasses: Record<string, string> = {
        emerald: "border-l-emerald-500",
        pink: "border-l-pink-500",
        blue: "border-l-blue-500",
        amber: "border-l-amber-400"
    };

    return (
        <section className="relative py-32 bg-slate-950">
            <div className="max-w-full mx-auto px-10">
                <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24"
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Elevate customer experience with AI agents <br />
                        <span className="text-slate-400">proven to outperform humans</span>
                    </h2>
                </MotionDiv>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {stats.map((stat, i) => (
                        <MotionDiv
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className={`relative p-12 rounded-2xl bg-white/[0.03] border border-white/5 border-l-4 ${borderClasses[stat.color]} hover:bg-white/[0.06] transition-all duration-300 group`}
                        >
                            <div className="mb-10">
                                <span className="text-6xl md:text-8xl font-bold tracking-tighter text-white">
                                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                </span>
                            </div>
                            <div className="space-y-2">
                                <p className={`text-base font-bold uppercase tracking-[0.2em] ${colorClasses[stat.color]} opacity-80 group-hover:opacity-100 transition-opacity`}>
                                    {stat.title}
                                </p>
                                <p className="text-xl text-slate-400 leading-snug">
                                    {stat.label}
                                </p>
                            </div>
                        </MotionDiv>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ============================================================
   SECTION 3: YOUR PATH TO GROWTH — PERSUASIVE STEPS
   ============================================================ */
const InsightIcon = () => (
    <div className="relative w-16 h-16 flex items-center justify-center">
        <MotionDiv
            animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-indigo-500/40 blur-2xl rounded-full"
        />
        <svg className="w-10 h-10 text-indigo-400 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.674M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
    </div>
);

const AutomationIcon = () => (
    <div className="relative w-16 h-16 flex items-center justify-center">
        <MotionDiv
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-dashed border-indigo-500/30 rounded-full"
        />
        <MotionDiv
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-2 bg-indigo-600/10 blur-xl rounded-full"
        />
        <svg className="w-10 h-10 text-indigo-400 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    </div>
);

const ResultsIcon = () => (
    <div className="relative w-16 h-16 flex items-center justify-center overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-indigo-500/5 blur-lg" />
        <div className="flex items-end gap-1 mb-1 relative z-10">
            {[0.4, 0.7, 1].map((h, i) => (
                <MotionDiv
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h * 24}px` }}
                    animate={{ height: [`${h * 24}px`, `${h * 28}px`, `${h * 24}px`] }}
                    transition={{
                        height: { duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 },
                        initial: { duration: 1, delay: 0.5 + i * 0.1 }
                    }}
                    className="w-2 bg-indigo-500 rounded-t-[1px]"
                />
            ))}
        </div>
        <svg className="w-10 h-10 text-indigo-400 absolute opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4" />
        </svg>
    </div>
);

function TimelineStepItem({ step, i, isLast, isFirst }: { step: any, i: number, isLast: boolean, isFirst: boolean }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-45% 0px -45% 0px", once: true });

    return (
        <div
            ref={ref}
            className={`relative flex items-center gap-8 ${isLast ? "mb-0" : "mb-32"} ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
        >
            {/* Timeline dot */}
            <div className="absolute left-8 md:left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 z-10">
                <MotionDiv
                    animate={{
                        backgroundColor: isInView ? "#6366f1" : "rgba(15, 15, 20, 1)",
                        borderColor: isInView ? "#818cf8" : "#312e81",
                        boxShadow: isInView ? "0 0 30px rgba(99, 102, 241, 1)" : "none",
                    }}
                    transition={{ duration: 0.8 }}
                    className="w-10 h-10 rounded-full border-4 border-indigo-900 bg-slate-950"
                />
            </div>

            {/* Line Guards to snap the line to circle centers */}
            {isFirst && (
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 top-0 h-1/2 w-2 bg-slate-950 z-[1]" />
            )}
            {isLast && (
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 top-1/2 bottom-0 w-2 bg-slate-950 z-[1]" />
            )}

            {/* Content card */}
            <MotionDiv
                initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100, filter: "blur(10px)" }}
                animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${i % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}
            >
                <div className="group relative p-10 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/40 hover:bg-white/[0.04] transition-all duration-700 overflow-hidden">
                    {/* Background Sweep on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-6 mb-8">
                            {/* Breathing Icon Area */}
                            <div className="relative scale-110 group-hover:scale-125 transition-transform duration-500">
                                {step.icon}
                            </div>
                            <div className="h-px w-12 bg-indigo-500/20 group-hover:w-20 group-hover:bg-indigo-500/50 transition-all duration-700" />
                            <span className="text-xs font-black tracking-[0.3em] text-indigo-500 uppercase">
                                Step {step.number}
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-indigo-100 transition-colors">{step.title}</h3>
                        <p className="text-lg text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{step.description}</p>
                    </div>
                </div>
            </MotionDiv>
        </div>
    );
}
function TimelineSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    const steps = [
        {
            number: "01",
            title: "We Learn Your Business",
            description: "We take time to understand your goals, your customers, and where growth is being left on the table.",
            icon: <InsightIcon />,
        },
        {
            number: "02",
            title: "We Automate Your Growth",
            description: "From capturing leads to booking calls — every repetitive task is handled instantly, 24/7, without adding headcount.",
            icon: <AutomationIcon />,
        },
        {
            number: "03",
            title: "You See Real Results",
            description: "More qualified leads, faster response times, and higher conversions — with clear reporting so you always know what's working.",
            icon: <ResultsIcon />,
        },
    ];

    return (
        <section className="relative py-32 bg-slate-950 overflow-hidden">
            <div className="max-w-5xl mx-auto px-6 pt-16">
                <MotionDiv
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <p className="text-xs tracking-[0.3em] uppercase text-indigo-500 font-semibold mb-4">
                        How we help you grow
                    </p>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                        Your path to{" "}
                        <span className="animate-gradient-text">effortless growth</span>
                    </h2>
                </MotionDiv>

                <div className="relative" ref={containerRef}>
                    {/* Static Track Line (Optional: very faint or removed) */}
                    {/* Removed bg-white/5 line as per user request */}

                    {/* Animated Vertical Line */}
                    <MotionDiv
                        className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500 via-purple-500 to-indigo-500 -translate-x-1/2 origin-top z-0 shadow-[0_0_15px_rgba(99,90,230,0.5)] rounded-full"
                        style={{ scaleY: scrollYProgress }}
                    />

                    {steps.map((step, i) => (
                        <TimelineStepItem key={i} step={step} i={i} isLast={i === steps.length - 1} isFirst={i === 0} />
                    ))}
                </div>

                {/* Trust line + Soft CTA */}
                <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-center mt-8 space-y-6"
                >
                    <p className="text-sm text-slate-400 tracking-wide">
                        Trusted by forward-thinking businesses ready to scale smarter.
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 text-indigo-400 font-semibold text-sm hover:text-indigo-300 transition-colors group"
                    >
                        See how automation fits your business
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                </MotionDiv>
            </div>
        </section>
    );
}



/* ============================================================
   SECTION 5: WHY US — STACKED SCROLL CARDS
   ============================================================ */
function WhyUsCard({ card, index, total }: { card: any, index: number, total: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "start start"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [0.92 + (index * 0.02), 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [400, 0]);

    return (
        <MotionDiv
            ref={cardRef}
            style={{
                scale,
                opacity,
                y,
                top: "100px",
                zIndex: index + 1
            }}
            className="sticky w-[98%] mx-auto rounded-2xl overflow-hidden bg-[#0f172a] border border-white/10 shadow-[0_60px_120px_rgba(0,0,0,0.9)]"
        >
            <div className="flex flex-col md:flex-row h-full" style={{ minHeight: "80vh" }}>
                {/* Left: Visual panel */}
                <div className="md:w-[30%] relative flex items-end justify-start p-12 bg-black/40">
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="relative z-10 w-full">
                        <span className={`inline-flex items-center px-5 py-2 rounded-full text-sm font-black border ${card.tagColor} mb-8 tracking-[0.3em] uppercase`}>
                            {card.tag}
                        </span>
                        <div className="h-0.5 w-16 bg-white/20 mb-6" />
                        <p className="text-white/60 text-xs font-bold uppercase tracking-[0.4em] leading-loose">{card.stat}</p>
                    </div>
                </div>

                {/* Middle: Main content */}
                <div className="md:w-[40%] flex flex-col justify-center p-12 md:p-20 bg-[#0f172a] border-l border-white/5">
                    <h3 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.05] mb-10 tracking-tighter">
                        {card.headline} <br />
                        <span className="text-indigo-500 italic font-medium">{card.headlineItalic}</span>
                    </h3>
                    <div className={`w-24 h-3 rounded-full ${card.accentColor} shadow-[0_0_30px_rgba(79,70,229,0.5)]`} />
                </div>

                {/* Right: Feature Detail */}
                <div className="md:w-[30%] flex flex-col justify-between p-12 md:p-16 border-l border-white/5 bg-black/20">
                    <div className="flex items-center gap-6 mb-12">
                        <div className={`w-14 h-14 rounded-2xl ${card.accentColor} flex items-center justify-center text-white/90 shadow-2xl flex-shrink-0 animate-pulse-glow`}>
                            {card.icon}
                        </div>
                        <div>
                            <p className="font-black text-white text-lg tracking-tight">{card.featureTitle}</p>
                            <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">{card.featureLabel}</p>
                        </div>
                    </div>
                    <div className="flex-1">
                        <p className="text-slate-300 text-xl leading-relaxed font-medium">
                            {card.description}
                        </p>
                        <div className="mt-8 flex flex-col gap-3">
                            {card.bullets.map((bullet: string, i: number) => (
                                <div key={i} className="flex items-center gap-3 text-xs text-white/40 font-bold uppercase tracking-wider">
                                    <div className={`w-1.5 h-1.5 rounded-full ${card.accentColor}`} />
                                    {bullet}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </MotionDiv>
    );
}

function WhyUsSection() {
    const cards = [
        {
            tag: "Lead Generation",
            headline: "Turn visitors into",
            headlineItalic: "qualified leads",
            stat: "Instant Response Rate",
            featureTitle: "Lead Capture AI",
            featureLabel: "Automated Pipeline",
            icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
            description: "Engage every visitor instantly. Our AI qualifies leads based on your specific criteria and books them directly into your CRM, ensuring your calendar is always full of high-intent prospects.",
            bullets: ["24/7 Instant Qualification", "Direct CRM Integration", "No Lead Left Behind"],
            accentColor: "bg-indigo-600",
            tagColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
        },
        {
            tag: "Scale Smarter",
            headline: "Growth without",
            headlineItalic: "adding headcount",
            stat: "Infinite Scaling",
            featureTitle: "Workflow Engine",
            featureLabel: "Operational Excellence",
            icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
            description: "Break the link between revenue and overhead. Our automation platform manages high-volume interactions across all channels simultaneously, giving you the power of a 50-person team.",
            bullets: ["Multi-Channel Management", "Zero Payroll Overhead", "Predictable Performance"],
            accentColor: "bg-purple-600",
            tagColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
        },
        {
            tag: "Precision",
            headline: "Indistinguishable from",
            headlineItalic: "real people",
            stat: "99.9% Accuracy",
            featureTitle: "Contextual AI",
            featureLabel: "Human-Centric Design",
            icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            description: "Experience AI that mirrors human empathy and nuance. We utilize advanced LLM architectures that understand context and intent, delivering speed with a genuine human touch.",
            bullets: ["Brand Voice Matching", "Intent-Based Logic", "Empathetic Responses"],
            accentColor: "bg-emerald-600",
            tagColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
        },
    ];

    return (
        <section id="why-us" className="relative bg-slate-950 pb-40">
            <div className="max-w-full mx-auto px-6 py-24">
                <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-32"
                >
                    <p className="text-[10px] tracking-[0.5em] uppercase text-indigo-500 font-black mb-6">
                        Why Us
                    </p>
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white">
                        Built for <span className="animate-gradient-text">real results</span>
                    </h2>
                </MotionDiv>

                <div className="space-y-[10vh]">
                    {cards.map((card, i) => (
                        <WhyUsCard key={i} card={card} index={i} total={cards.length} />
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ============================================================
   SECTION 6: FINAL CTA — DARK IMMERSIVE
   ============================================================ */
function FinalCTA() {
    const ctaRef = useRef<HTMLDivElement>(null);
    const vantaEffect = useRef<any>(null);

    useEffect(() => {
        let isMounted = true;

        const loadScript = (src: string): Promise<void> => {
            return new Promise((resolve, reject) => {
                const existing = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement;
                if (existing) {
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
                await loadScript("https://unpkg.com/vanta@0.5.24/dist/vanta.dots.min.js");
                await waitFor(() => !!(window as any).VANTA?.DOTS);

                if (isMounted && ctaRef.current && !vantaEffect.current) {
                    vantaEffect.current = (window as any).VANTA.DOTS({
                        el: ctaRef.current,
                        mouseControls: true,
                        touchControls: true,
                        gyroControls: false,
                        minHeight: 200.0,
                        minWidth: 200.0,
                        scale: 1.0,
                        scaleMobile: 1.0,
                        color: 0x6366f1,
                        color2: 0xa855f7,
                        backgroundColor: 0x0a0a0f,
                        size: 2,
                        spacing: 20,
                        showLines: false,
                    });
                }
            } catch (e) {
                console.warn("Vanta dots failed:", e);
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
        <section ref={ctaRef} className="relative py-40 overflow-hidden">
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <MotionDiv
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-8"
                >
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
                        Ready to build the
                        <br />
                        <span className="animate-gradient-text">future of interaction?</span>
                    </h2>
                    <p className="text-xl text-white/50 max-w-2xl mx-auto">
                        Stop leaving growth on the table. Every minute you wait, your competition is automating. Let’s build your future today.
                    </p>
                    <div className="pt-6 flex flex-wrap justify-center gap-4">
                        <a
                            href="/contact"
                            className="group h-16 px-12 inline-flex items-center justify-center rounded-2xl bg-white text-slate-900 font-bold text-lg shadow-[0_0_40px_rgba(99,102,241,0.3)] transition-all duration-500 hover:scale-105 hover:shadow-[0_0_60px_rgba(99,102,241,0.5)] active:scale-95"
                        >
                            Book a Call
                        </a>
                    </div>
                </MotionDiv>
            </div>
        </section>
    );
}

/* ============================================================
   MAIN EXPORT
   ============================================================ */
export function HomeContent() {
    return (
        <>
            <LogoMarquee />
            <StatsSection />
            <TimelineSection />
            <WhyUsSection />
            <FinalCTA />
        </>
    );
}
