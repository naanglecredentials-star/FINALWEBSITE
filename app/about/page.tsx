"use client";

import { PageFade } from "@/components/PageFade";
import { motion } from "framer-motion";
import React from "react";

const MotionDiv = motion.div as any;
const MotionH1 = motion.h1 as any;
const MotionH2 = motion.h2 as any;
const MotionP = motion.p as any;

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

const fadeDown = {
    hidden: { opacity: 0, y: -60 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
};

export default function AboutPage() {
    return (
        <PageFade>
            <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden">

                {/* Ambient Lighting */}
                <div className="pointer-events-none absolute inset-0 z-0">
                    <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-indigo-600/20 blur-[160px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/15 blur-[140px]" />
                    <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                </div>

                {/* ── HERO ── */}
                <section className="relative z-10 flex flex-col items-center justify-center pt-48 pb-24 px-6 text-center">
                    <MotionDiv
                        variants={fadeDown}
                        initial="hidden"
                        animate="show"
                        className="mb-2"
                    >
                        <span className="inline-block text-[10px] font-black uppercase tracking-[0.5em] text-indigo-400 mb-6">
                            About Naangle
                        </span>
                    </MotionDiv>

                    <MotionH1
                        variants={fadeDown}
                        initial="hidden"
                        animate="show"
                        className="text-[18vw] md:text-[16vw] font-black tracking-tighter leading-none uppercase select-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30"
                    >
                        US
                    </MotionH1>

                    <MotionP
                        variants={fadeDown}
                        initial="hidden"
                        animate="show"
                        transition={{ delay: 0.3 }}
                        className="mt-10 max-w-2xl text-lg md:text-xl text-slate-400 leading-relaxed font-medium"
                    >
                        We are a next-generation AI agency that builds intelligent systems to power serious, scalable business growth. Every line of code. Every deployed agent. Built with purpose.
                    </MotionP>
                </section>

                {/* ── DIVIDER ── */}
                <div className="relative z-10 flex items-center gap-6 max-w-6xl mx-auto px-8 mb-32">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">Our Story</span>
                    <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* ── MISSION ── */}
                <section className="relative z-10 max-w-6xl mx-auto px-8 mb-40">
                    <MotionDiv
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start"
                    >
                        {/* Left label */}
                        <MotionDiv variants={fadeUp} className="lg:pt-3">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-0.5 bg-indigo-500" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">01</span>
                            </div>
                            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white leading-tight">
                                Our<br />Mission.
                            </h2>
                        </MotionDiv>

                        {/* Right content */}
                        <MotionDiv variants={fadeUp} className="space-y-6">
                            <p className="text-2xl md:text-3xl text-white font-semibold leading-snug tracking-tight">
                                To turn automation into a competitive advantage — not a buzzword.
                            </p>
                            <p className="text-lg text-slate-400 leading-relaxed">
                                At Naangle, we deploy sophisticated AI agents designed around your specific business outcomes. We don't believe in generic tools. We believe in precision-built systems that integrate into your operations and generate measurable impact from day one.
                            </p>
                            <p className="text-lg text-slate-400 leading-relaxed">
                                Our mission is to eliminate the repetitive, the costly, and the slow — so you can focus on what requires genuine human expertise: strategy, relationships, and growth.
                            </p>
                            <div className="pt-4 grid grid-cols-2 gap-6">
                                {[
                                    { metric: "85%", desc: "Average efficiency gain" },
                                    { metric: "60%", desc: "Reduction in operational cost" },
                                    { metric: "< 1s", desc: "Agent response time" },
                                    { metric: "24/7", desc: "Uninterrupted availability" },
                                ].map((item, i) => (
                                    <MotionDiv
                                        key={i}
                                        variants={fadeUp}
                                        className="border-l-2 border-indigo-500/40 pl-4 py-1"
                                    >
                                        <div className="text-2xl font-black text-white">{item.metric}</div>
                                        <div className="text-xs uppercase tracking-widest font-bold text-slate-500 mt-1">{item.desc}</div>
                                    </MotionDiv>
                                ))}
                            </div>
                        </MotionDiv>
                    </MotionDiv>
                </section>

                {/* ── DIVIDER ── */}
                <div className="relative z-10 flex items-center gap-6 max-w-6xl mx-auto px-8 mb-32">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">Looking Ahead</span>
                    <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* ── VISION ── */}
                <section className="relative z-10 max-w-6xl mx-auto px-8 mb-40">
                    <MotionDiv
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start"
                    >
                        {/* Left label */}
                        <MotionDiv variants={fadeUp} className="lg:pt-3">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-0.5 bg-purple-500" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-400">02</span>
                            </div>
                            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white leading-tight">
                                Our<br />Vision.
                            </h2>
                        </MotionDiv>

                        {/* Right content */}
                        <MotionDiv variants={fadeUp} className="space-y-6">
                            <p className="text-2xl md:text-3xl text-white font-semibold leading-snug tracking-tight">
                                A world where every business operates at the speed of AI — without losing its human soul.
                            </p>
                            <p className="text-lg text-slate-400 leading-relaxed">
                                We're building toward a future where intelligent automation isn't a luxury reserved for large enterprises. Every business, regardless of size, deserves infrastructure that scales intelligently — responding to customers, closing pipelines, and resolving issues before humans even need to intervene.
                            </p>
                            <p className="text-lg text-slate-400 leading-relaxed">
                                Our vision is to become the operational backbone of tomorrow's most ambitious companies — the invisible engine beneath a brand's most critical customer interactions.
                            </p>

                            {/* Highlight quote */}
                            <MotionDiv
                                variants={fadeUp}
                                className="mt-8 p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm"
                            >
                                <p className="text-xl text-white font-medium leading-relaxed italic">
                                    "We don't build chatbots. We build systems that think, respond, and execute — so your business never stops working."
                                </p>
                                <div className="mt-4 text-sm font-bold text-indigo-400 uppercase tracking-widest">— The Naangle Team</div>
                            </MotionDiv>
                        </MotionDiv>
                    </MotionDiv>
                </section>

                {/* ── CTA ── */}
                <section className="relative z-10 max-w-6xl mx-auto px-8 pb-40">
                    <MotionDiv
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row items-center justify-between gap-8 p-10 md:p-14 rounded-3xl bg-gradient-to-br from-indigo-500/15 to-purple-500/10 border border-white/10 backdrop-blur-md"
                    >
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.4em] font-black text-indigo-400 mb-3">Work With Us</p>
                            <h3 className="text-3xl md:text-4xl font-black tracking-tight text-white">Ready to build something serious?</h3>
                        </div>
                        <a
                            href="/contact"
                            className="flex-shrink-0 h-14 px-10 inline-flex items-center justify-center rounded-2xl bg-indigo-500 text-white font-bold text-base shadow-xl transition-all duration-300 hover:bg-indigo-400 hover:scale-105 hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] active:scale-95"
                        >
                            Book a Strategy Call →
                        </a>
                    </MotionDiv>
                </section>

            </div>
        </PageFade>
    );
}
