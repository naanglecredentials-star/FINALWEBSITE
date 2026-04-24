"use client";

import { PageFade } from "@/components/PageFade";
import { motion } from "framer-motion";

const MotionDiv = motion.div as any;

export default function PrivacyPolicy() {
    const lastUpdated = "February 27, 2026";

    const sections = [
        {
            title: "1. Introduction",
            content:
                "Welcome to naangle. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy or our practices with regards to your personal information, please contact us.",
        },
        {
            title: "2. Information We Collect",
            content:
                "We collect personal information that you voluntarily provide to us, specifically your name, phone number, and email address. We do not collect your physical address, passwords, security data, or payment information. This information is only gathered with your explicit consent when you express interest in our services.",
        },
        {
            title: "3. How We Use Your Information",
            content:
                "We use personal information collected via our website to provide and improve our services, communicate with you regarding your inquiries, and fulfill our business obligations to you. We process your information based on your consent and our legitimate business interests.",
        },
        {
            title: "4. Sharing Your Information",
            content:
                "We do not share your personal information with any other companies. Your privacy is our priority, and all client information is securely stored in our internal database and used strictly for the purposes described in this policy.",
        },
        {
            title: "5. Data Security",
            content:
                "We prioritize the safety of your information and implement various measures aimed at protecting your data within our secure databases. While we take proactive steps to ensure your information remains protected, please be aware that no method of electronic storage or transmission over the internet is ever entirely foolproof.",
        },
        {
            title: "6. Your Rights: Opt-Out & Deletion",
            content:
                "You have the right to opt-out of our communications and services at any time. Furthermore, you may request the permanent deletion of all your personal information from our database. To exercise these rights, please book a strategy call with us. We will discuss your request and provide full assurance that your data has been securely deleted.",
        },
        {
            title: "7. Updates to This Policy",
            content:
                "We may update this privacy policy from time to time. The updated version will be indicated by an updated 'Revised' date and will be effective as soon as it is accessible.",
        },
        {
            title: "8. Contact Us",
            content:
                "If you have questions or comments about this policy, please book a call with our team via our contact page. We prioritize direct communication to ensure your privacy concerns are handled with the highest level of care and transparency.",
        },
    ];

    return (
        <PageFade>
            <section className="relative min-h-screen overflow-hidden px-6 py-24 pt-40 md:px-12">
                {/* BACKGROUND AMBIENCE */}
                <div className="absolute inset-0 -z-10 bg-slate-950">
                    <div className="animate-orb absolute -top-24 -left-24 h-96 w-96 rounded-full bg-indigo-500/10 blur-[100px]" />
                    <div className="animate-orb absolute top-1/2 -right-24 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[120px]" />
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                </div>

                <div className="mx-auto max-w-4xl">
                    <MotionDiv
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-16 text-center"
                    >
                        <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
                            Privacy Policy
                        </h1>
                        <p className="mt-4 text-slate-400">
                            Last updated: {lastUpdated}
                        </p>
                    </MotionDiv>

                    <div className="space-y-12">
                        {sections.map((section, index) => (
                            <MotionDiv
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative"
                            >
                                <div className="absolute -left-4 top-0 h-full w-0.5 bg-gradient-to-b from-indigo-500 to-transparent transition-all group-hover:w-1" />
                                <h2 className="text-2xl font-semibold text-white mb-4">
                                    {section.title}
                                </h2>
                                <div className="prose prose-invert max-w-none text-slate-400 leading-relaxed">
                                    {section.content}
                                </div>
                            </MotionDiv>
                        ))}
                    </div>

                    <MotionDiv
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="mt-20 rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm"
                    >
                        <p className="text-slate-300">
                            Have questions about our privacy practices?
                        </p>
                        <a
                            href="/contact"
                            className="mt-4 inline-block font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                            Get in touch with our team →
                        </a>
                    </MotionDiv>
                </div>
            </section>
        </PageFade>
    );
}
