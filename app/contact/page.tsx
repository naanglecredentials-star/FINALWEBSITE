"use client";

import { useState } from "react";
import { PageFade } from "@/components/PageFade";
import Image from "next/image";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Generate time slots from 9 AM to 10 PM (1-hour intervals)
  const timeSlots = [];
  for (let hour = 9; hour <= 22; hour++) {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
    timeSlots.push(`${displayHour}:00 ${period}`);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Simulate API call
    console.log("Form Submission JSON:", JSON.stringify(data, null, 2));
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <PageFade>
      <section className="relative min-h-[90vh] overflow-hidden px-10 py-16 pt-40">
        {/* BACKGROUND AMBIENCE */}
        <div className="absolute inset-0 -z-10 bg-slate-950">
          {/* Animated Orbs */}
          <div
            className="animate-orb absolute -top-24 -left-24 h-96 w-96 rounded-full bg-indigo-500/10 blur-[100px]"
            style={{ animationDelay: '0s' }}
          />
          <div
            className="animate-orb absolute top-1/2 -right-24 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[120px]"
            style={{ animationDelay: '-4s' }}
          />
          <div
            className="animate-orb absolute -bottom-24 left-1/3 h-80 w-80 rounded-full bg-blue-500/10 blur-[80px]"
            style={{ animationDelay: '-7s' }}
          />

          {/* Noise Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 md:grid-cols-2">

          {/* LEFT SIDE – COPY */}
          <div className="relative z-10 md:sticky md:top-40">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[1.1]">
              See measurable impact with naangle AI agents
            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-400 leading-relaxed">
              Book a strategy call to explore how custom AI agents can reduce support load,
              improve conversions, and automate workflows across your business.
            </p>

            <ul className="mt-8 space-y-4 text-slate-300">
              <li className="flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-[10px] text-indigo-400 ring-1 ring-indigo-500/30">✓</span>
                Review of your current workflows
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-[10px] text-indigo-400 ring-1 ring-indigo-500/30">✓</span>
                AI opportunities mapped to ROI
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-[10px] text-indigo-400 ring-1 ring-indigo-500/30">✓</span>
                Custom agent architecture plan
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-[10px] text-indigo-400 ring-1 ring-indigo-500/30">✓</span>
                Real-world deployment examples
              </li>
            </ul>
          </div>

          {/* RIGHT SIDE – FORM/SUCCESS TOGGLE */}
          <div className="relative min-h-[600px] w-full">
            {/* Form Container */}
            <div className={`relative w-full rounded-[2.5rem] bg-white/[0.02] p-1 shadow-2xl ring-1 ring-white/10 backdrop-blur-2xl transition-all duration-700 ${isSuccess ? 'scale-95 opacity-0 pointer-events-none absolute h-0' : 'scale-100 opacity-100'}`}>
              <div className="rounded-[2.2rem] bg-white/[0.02] px-8 py-10 shadow-inner">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-white">
                      Book a free consultation
                    </h2>
                    <p className="mt-1 text-sm text-slate-400">Fast-track your AI transformation.</p>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-1.5 text-sm font-medium">
                      <label className="text-slate-300 ml-1">Name</label>
                      <input
                        name="name"
                        required
                        placeholder="Jane Doe"
                        className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-white placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                      />
                    </div>

                    <div className="space-y-1.5 text-sm font-medium">
                      <label className="text-slate-300 ml-1">Email</label>
                      <input
                        name="email"
                        required
                        type="email"
                        placeholder="jane@company.com"
                        className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-white placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 text-sm font-medium">
                    <label className="text-slate-300 ml-1">Phone Number</label>
                    <input
                      name="phone"
                      required
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-white placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-1.5 text-sm font-medium">
                      <label className="text-slate-300 ml-1">Preferred Date</label>
                      <input
                        name="date"
                        required
                        type="date"
                        className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-white placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 [color-scheme:dark]"
                      />
                    </div>

                    <div className="space-y-1.5 text-sm font-medium">
                      <label className="text-slate-300 ml-1">Preferred Time</label>
                      <select
                        name="time"
                        required
                        className="h-12 w-full appearance-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-white outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                      >
                        <option value="" disabled selected className="text-slate-900">Select a time</option>
                        {timeSlots.map(slot => (
                          <option key={slot} value={slot} className="text-slate-900">{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-sm font-medium">
                    <label className="text-slate-300 ml-1">What would a win look like?</label>
                    <textarea
                      name="goals"
                      required
                      placeholder="Tell us about your goals..."
                      className="min-h-[100px] w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 flex h-14 w-full items-center justify-center rounded-2xl bg-indigo-500 text-base font-semibold text-white shadow-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-2xl active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Scheduling...
                      </div>
                    ) : 'Schedule Consultation'}
                  </button>
                </form>
              </div>
            </div>

            {/* Success State Container */}
            <div className={`relative flex w-full flex-col items-center justify-center rounded-[2.5rem] bg-white/[0.02] p-12 text-center shadow-2xl ring-1 ring-white/10 backdrop-blur-2xl transition-all duration-700 ${isSuccess ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none absolute h-0'}`}>
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 text-3xl text-green-400 ring-4 ring-green-500/30">
                ✓
              </div>
              <h2 className="mt-8 text-3xl font-bold text-white tracking-tight">
                Consultation Scheduled
              </h2>
              <p className="mt-4 text-lg text-slate-400 max-w-sm">
                Thanks for reaching out! We've received your details and will get back to you shortly with a plan to accelerate your AI journey.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="mt-10 font-medium text-slate-400 hover:text-white transition"
              >
                ← Book another call
              </button>
            </div>
          </div>
        </div>
      </section>
    </PageFade>
  );
}