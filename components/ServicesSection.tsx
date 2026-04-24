"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const MotionDiv = motion.div as any;
const MotionH1 = motion.h1 as any;
const MotionH2 = motion.h2 as any;
const MotionP = motion.p as any;
const MotionArticle = motion.article as any;

const Counter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    let totalMiliseconds = duration * 1000;
    let incrementTime = (totalMiliseconds / end);

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}</span>;
}

const BookingAssistantAnimation = () => {
  return (
    <div className="relative group lg:scale-150 transition-transform duration-500">
      <div className="absolute inset-0 bg-indigo-500/10 blur-[100px] -z-10 group-hover:bg-indigo-500/20 transition-all duration-700" />
      <MotionDiv
        animate={{
          y: [0, -20, 0],
          rotate: [0, 1, -1, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <Image
          src="/booking_assistant.png"
          alt="AI Booking Assistant"
          width={800}
          height={600}
          className="w-full h-auto transform transition duration-1000 group-hover:scale-105"
        />
      </MotionDiv>
    </div>
  );
};

const ServiceSection = ({
  title,
  subtitle,
  description,
  sellAngle,
  imagePath,
  reversed = false,
  customElement,
  index
}: {
  title: string;
  subtitle: string;
  description: string;
  sellAngle: string;
  imagePath?: string;
  reversed?: boolean;
  customElement?: React.ReactNode;
  index: number;
}) => {
  return (
    <section className={`relative py-32 overflow-hidden ${index % 2 === 0 ? 'bg-slate-950' : 'bg-slate-900/50'}`}>
      <div className="max-w-[1500px] mx-auto px-6 md:px-12">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-64 items-center`}>

          <MotionDiv
            initial={{ opacity: 0, x: reversed ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`space-y-6 ${reversed ? 'lg:order-2' : ''}`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold tracking-widest uppercase">
              Service 0{index + 1}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.1]">
              {title} <br />
              <span className="text-slate-400">{subtitle}</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
              {description}
            </p>
            <div className="pt-4">
              <div className="inline-block px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/10 shadow-sm">
                <p className="text-sm font-semibold text-indigo-400 italic">
                  &ldquo;{sellAngle}&rdquo;
                </p>
              </div>
            </div>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`relative ${reversed ? 'lg:order-1' : ''}`}
          >
            {customElement ? (
              <div className="flex justify-center items-center h-full min-h-[400px]">
                {customElement}
              </div>
            ) : imagePath ? (
              <div className="relative group">
                <div className="absolute inset-0 bg-blue-500/10 blur-[100px] -z-10 group-hover:bg-blue-500/20 transition-all duration-700" />
                <div className="relative rounded-[2.5rem] overflow-hidden border border-white/40 shadow-2xl backdrop-blur-2xl">
                  <Image
                    src={imagePath}
                    alt={title}
                    width={800}
                    height={600}
                    className="w-full h-auto transform transition duration-1000 group-hover:scale-105"
                  />
                </div>
              </div>
            ) : (
              <div className="h-[400px] w-full rounded-[2.5rem] bg-slate-200/50 animate-pulse" />
            )}
          </MotionDiv>

        </div>
      </div>
    </section>
  );
};

const ChatbotAnimation = () => {
  return (
    <div className="relative group lg:scale-150 transition-transform duration-500">
      <div className="absolute inset-0 bg-indigo-500/10 blur-[100px] -z-10 group-hover:bg-indigo-500/20 transition-all duration-700" />
      <MotionDiv
        animate={{
          y: [0, -15, 0],
          rotate: [0, 0.5, -0.5, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <Image
          src="/chatbot_new.png"
          alt="AI Chatbot Assistant"
          width={800}
          height={600}
          className="w-full h-auto transform transition duration-1000 group-hover:scale-105"
          priority
        />
      </MotionDiv>
    </div>
  );
};

const SocialDMAnimation = () => {
  return (
    <div className="relative group lg:scale-150 transition-transform duration-500">
      <div className="absolute inset-0 bg-indigo-500/10 blur-[100px] -z-10 group-hover:bg-indigo-500/20 transition-all duration-700" />
      <MotionDiv
        animate={{
          y: [0, -15, 0],
          rotate: [0, -0.5, 0.5, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <Image
          src="/social_dm_new.png"
          alt="Social DM Automation"
          width={800}
          height={600}
          className="w-full h-auto transform transition duration-1000 group-hover:scale-105"
        />
      </MotionDiv>
    </div>
  );
};

const EmailAnimation = () => {
  return (
    <div className="relative group lg:scale-150 transition-transform duration-500">
      <div className="absolute inset-0 bg-indigo-500/10 blur-[100px] -z-10 group-hover:bg-indigo-500/20 transition-all duration-700" />
      <MotionDiv
        animate={{
          y: [0, -15, 0],
          rotate: [0, 0.5, -0.5, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <Image
          src="/email_agent_new.png"
          alt="AI Email Agent"
          width={800}
          height={600}
          className="w-full h-auto transform transition duration-1000 group-hover:scale-105"
        />
      </MotionDiv>
    </div>
  );
};

const LeadQualificationAnimation = () => {
  return (
    <div className="relative group lg:scale-150 transition-transform duration-500">
      <div className="absolute inset-0 bg-indigo-500/10 blur-[100px] -z-10 group-hover:bg-indigo-500/20 transition-all duration-700" />
      <MotionDiv
        animate={{
          y: [0, -15, 0],
          rotate: [0, -0.5, 0.5, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <Image
          src="/lead_qualification_new.png"
          alt="AI Lead Qualification"
          width={800}
          height={600}
          className="w-full h-auto transform transition duration-1000 group-hover:scale-105"
        />
      </MotionDiv>
    </div>
  );
};

export function ServicesSection() {
  return (
    <div id="services" className="relative pt-32">


      {/* SERVICES LIST */}
      <div>
        <ServiceSection
          index={0}
          title="Website Chatbots"
          subtitle="Advanced Lead Generation"
          description="Answers questions, qualifies leads, and books calls 24/7. Our bots don't just chat; they sell."
          sellAngle="Your 24/7 sales rep on your site."
          customElement={<ChatbotAnimation />}
        />

        <ServiceSection
          index={1}
          reversed
          title="Social DM Bots"
          subtitle="IG & FB Automation"
          description="Businesses care about DMs more than websites. We automate your social presence from lead capture to booking."
          sellAngle="Never miss a lead in DMs again."
          customElement={<SocialDMAnimation />}
        />

        <ServiceSection
          index={2}
          title="Email Agents"
          subtitle="Lead Nurturing at Scale"
          description="Replies to inquiries, follow-ups, and reminders with human-level context. Built with n8n for pure reliability."
          sellAngle="Instant replies, higher conversion."
          customElement={<EmailAnimation />}
        />

        <ServiceSection
          index={3}
          reversed
          title="AI Lead Qualification"
          subtitle="Stop Wasting Time"
          description="Asks smart questions, filters junk leads, and pushes qualified customers directly into your CRM."
          sellAngle="Focus only on high-value leads."
          customElement={<LeadQualificationAnimation />}
        />

        <ServiceSection
          index={4}
          title="AI Booking Assistant"
          subtitle="Infinite Flexibility"
          description="A minimalist assistant that syncs website, DM, and email activity directly into your calendar."
          sellAngle="Your calendar fills itself."
          customElement={<BookingAssistantAnimation />}
        />
      </div>

      {/* FINAL CTA */}
      <section className="py-40 bg-slate-900 text-white text-center overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-full max-w-4xl bg-blue-500/20 blur-[200px] -z-10" />
        <div className="max-w-4xl mx-auto px-6 space-y-10">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            Ready to build the <br />
            <span className="animate-gradient-text">Future of Interaction?</span>
          </h2>
          <p className="text-xl text-slate-400">
            Lets improve your leads response rate by <span className="text-white font-bold"><Counter value={90} />%+</span>
          </p>
          <div className="pt-8">
            <a href="/contact" className="h-16 px-12 inline-flex items-center justify-center rounded-2xl bg-white text-slate-900 font-bold text-lg shadow-2xl transition hover:scale-105 active:scale-100">
              Book a Strategy Call
            </a>
          </div>
        </div>
      </section>


    </div>
  );
}
