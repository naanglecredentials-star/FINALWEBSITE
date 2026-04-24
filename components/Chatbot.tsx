"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, MotionProps } from "framer-motion";

/* ──────────────────────────────────────────────
   Typed motion wrappers (framer-motion 11 + @types/react 19)
────────────────────────────────────────────── */
type MotionDivProps = React.HTMLAttributes<HTMLDivElement> & MotionProps & { key?: React.Key };
type MotionSpanProps = React.HTMLAttributes<HTMLSpanElement> & MotionProps & { key?: React.Key };
type MotionButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & MotionProps & { key?: React.Key };

const MotionDiv = motion.div as React.ComponentType<MotionDivProps>;
const MotionSpan = motion.span as React.ComponentType<MotionSpanProps>;
const MotionButton = motion.button as React.ComponentType<MotionButtonProps>;

/* ──────────────────────────────────────────────
   Types
────────────────────────────────────────────── */
interface Message {
    id: number;
    role: "user" | "bot";
    text: string;
    timestamp: Date;
}

/* ──────────────────────────────────────────────
   API call to Google Gemini RAG backend
────────────────────────────────────────────── */
async function getAIReply(conversationHistory: Message[]): Promise<string> {
    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                messages: conversationHistory.map((msg) => ({
                    role: msg.role === "bot" ? "model" : "user",
                    text: msg.text,
                })),
            }),
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        return data.reply || "I'm having trouble right now. Please try again!";
    } catch (error) {
        console.error("Chat API error:", error);
        return "Sorry, I'm experiencing a connection issue. Please try again in a moment, or reach out to us directly through our Contact page! 🚀";
    }
}

/* ──────────────────────────────────────────────
   Animated Bot Icon
────────────────────────────────────────────── */
function BotIcon({ isHovered }: { isHovered: boolean }) {
    return (
        <div className="relative flex items-center justify-center w-full h-full">
            <AnimatePresence>
                {isHovered && (
                    <>
                        <MotionSpan
                            key="ring1"
                            className="absolute inset-0 rounded-full border-2 border-indigo-400/60"
                            initial={{ scale: 1, opacity: 0.8 }}
                            animate={{ scale: 1.6, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.9, repeat: Infinity, ease: "easeOut" }}
                        />
                        <MotionSpan
                            key="ring2"
                            className="absolute inset-0 rounded-full border-2 border-purple-400/40"
                            initial={{ scale: 1, opacity: 0.6 }}
                            animate={{ scale: 2, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.9, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
                        />
                    </>
                )}
            </AnimatePresence>

            <MotionDiv
                animate={
                    isHovered
                        ? { rotate: [0, -8, 8, -4, 4, 0], scale: [1, 1.08, 1.08, 1.04, 1] }
                        : { rotate: 0, scale: 1 }
                }
                transition={isHovered ? { duration: 0.6, ease: "easeInOut" } : { duration: 0.3 }}
                className="relative z-10"
            >
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" y="10" width="20" height="16" rx="5" fill="white" fillOpacity="0.95" />
                    <rect x="14.5" y="4" width="3" height="7" rx="1.5" fill="white" fillOpacity="0.9" />
                    <circle cx="16" cy="3.5" r="2" fill="white" />
                    <circle cx="11.5" cy="17" r="2" fill="#6366f1" />
                    <circle cx="20.5" cy="17" r="2" fill="#6366f1" />
                    <circle cx="12.2" cy="16.3" r="0.6" fill="white" />
                    <circle cx="21.2" cy="16.3" r="0.6" fill="white" />
                    <rect x="11" y="21" width="10" height="2.5" rx="1.25" fill="#6366f1" fillOpacity="0.7" />
                </svg>
            </MotionDiv>
        </div>
    );
}

/* ──────────────────────────────────────────────
   Typing dots indicator
────────────────────────────────────────────── */
function TypingDots() {
    return (
        <div className="flex items-center gap-1 px-4 py-3">
            {[0, 1, 2].map((i) => (
                <MotionSpan
                    key={i}
                    className="block w-2 h-2 rounded-full bg-indigo-400"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                />
            ))}
        </div>
    );
}

/* ──────────────────────────────────────────────
   Chat Message Bubble
────────────────────────────────────────────── */
function MessageBubble({ msg }: { msg: Message }) {
    const isBot = msg.role === "bot";

    const renderText = (text: string) => {
        // Handle **bold**, *italic*, and bullet points
        const lines = text.split("\n");
        return lines.map((line, lineIdx) => {
            // Process inline formatting
            const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
            const formattedParts = parts.map((part, i) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                    return <strong key={i}>{part.slice(2, -2)}</strong>;
                }
                if (part.startsWith("*") && part.endsWith("*") && !part.startsWith("**")) {
                    return <em key={i}>{part.slice(1, -1)}</em>;
                }
                return <span key={i}>{part}</span>;
            });

            return (
                <span key={lineIdx}>
                    {formattedParts}
                    {lineIdx < lines.length - 1 && <br />}
                </span>
            );
        });
    };

    return (
        <MotionDiv
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className={`flex ${isBot ? "justify-start" : "justify-end"} mb-3`}
        >
            {isBot && (
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mr-2 mt-1 shadow-md">
                    <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
                        <rect x="6" y="10" width="20" height="16" rx="5" fill="white" />
                        <circle cx="11.5" cy="17" r="2" fill="#6366f1" />
                        <circle cx="20.5" cy="17" r="2" fill="#6366f1" />
                    </svg>
                </div>
            )}
            <div
                className={`relative max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-md
          ${isBot
                        ? "bg-white/10 border border-white/10 text-white/90 rounded-tl-sm"
                        : "bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-tr-sm"
                    }`}
            >
                {renderText(msg.text)}
                <span className={`block text-[10px] mt-1 ${isBot ? "text-white/30" : "text-white/50"} text-right`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
            </div>
        </MotionDiv>
    );
}

/* ──────────────────────────────────────────────
   Main Chatbot Component
────────────────────────────────────────────── */
export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 0,
            role: "bot",
            text: "👋 Hi! I'm Naangle's AI assistant. Ask me anything about our services, pricing, or how we can help your business!",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    useEffect(() => {
        if (isOpen) setTimeout(() => inputRef.current?.focus(), 350);
    }, [isOpen]);

    const sendMessage = async () => {
        const trimmed = input.trim();
        if (!trimmed || isTyping) return;

        const userMsg: Message = { id: Date.now(), role: "user", text: trimmed, timestamp: new Date() };
        const updatedMessages = [...messages, userMsg];
        setMessages(updatedMessages);
        setInput("");
        setIsTyping(true);

        // Call the real AI API
        const reply = await getAIReply(updatedMessages);

        const botMsg: Message = { id: Date.now() + 1, role: "bot", text: reply, timestamp: new Date() };
        setIsTyping(false);
        setMessages((prev) => [...prev, botMsg]);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    };

    const handleChipClick = async (chip: string) => {
        if (isTyping) return;

        const userMsg: Message = { id: Date.now(), role: "user", text: chip, timestamp: new Date() };
        const updatedMessages = [...messages, userMsg];
        setMessages(updatedMessages);
        setIsTyping(true);

        const reply = await getAIReply(updatedMessages);

        setIsTyping(false);
        setMessages((prev) => [
            ...prev,
            { id: Date.now() + 1, role: "bot", text: reply, timestamp: new Date() },
        ]);
    };

    return (
        <>
            {/* ── Chat Panel ── */}
            <AnimatePresence>
                {isOpen && (
                    <MotionDiv
                        key="chat-panel"
                        initial={{ opacity: 0, y: 40, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.92 }}
                        transition={{ type: "spring", stiffness: 300, damping: 28 }}
                        className="fixed bottom-28 right-6 z-[9999] w-[360px] max-w-[calc(100vw-2rem)] flex flex-col rounded-3xl overflow-hidden shadow-[0_20px_80px_rgba(99,102,241,0.28)] border border-white/10"
                        style={{
                            background: "linear-gradient(145deg, rgba(15,15,35,0.97) 0%, rgba(20,16,48,0.97) 100%)",
                            backdropFilter: "blur(20px)",
                            WebkitBackdropFilter: "blur(20px)",
                        }}
                    >
                        {/* Header */}
                        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-gradient-to-r from-indigo-600/30 to-purple-600/20">
                            <div className="relative flex-shrink-0">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                                    <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
                                        <rect x="6" y="10" width="20" height="16" rx="5" fill="white" />
                                        <rect x="14.5" y="4" width="3" height="7" rx="1.5" fill="white" />
                                        <circle cx="16" cy="3.5" r="2" fill="white" />
                                        <circle cx="11.5" cy="17" r="2" fill="#6366f1" />
                                        <circle cx="20.5" cy="17" r="2" fill="#6366f1" />
                                        <circle cx="12.2" cy="16.3" r="0.6" fill="white" />
                                        <circle cx="21.2" cy="16.3" r="0.6" fill="white" />
                                        <rect x="11" y="21" width="10" height="2.5" rx="1.25" fill="#6366f1" fillOpacity="0.7" />
                                    </svg>
                                </div>
                                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-white truncate">Naangle AI</p>
                                <p className="text-xs text-emerald-400 font-medium">Online</p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
                                aria-label="Close chat"
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1" style={{ maxHeight: "340px", minHeight: "200px" }}>
                            {messages.map((msg) => (
                                <MessageBubble key={msg.id} msg={msg} />
                            ))}
                            {isTyping && (
                                <MotionDiv
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex justify-start mb-3"
                                >
                                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mr-2 mt-1">
                                        <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
                                            <rect x="6" y="10" width="20" height="16" rx="5" fill="white" />
                                            <circle cx="11.5" cy="17" r="2" fill="#6366f1" />
                                            <circle cx="20.5" cy="17" r="2" fill="#6366f1" />
                                        </svg>
                                    </div>
                                    <div className="bg-white/10 border border-white/10 rounded-2xl rounded-tl-sm shadow-md">
                                        <TypingDots />
                                    </div>
                                </MotionDiv>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick reply chips */}
                        <div className="flex gap-2 px-4 pb-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                            {["Services", "Pricing", "Contact"].map((chip) => (
                                <button
                                    key={chip}
                                    onClick={() => handleChipClick(chip)}
                                    disabled={isTyping}
                                    className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-400 transition-all duration-200 whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    {chip}
                                </button>
                            ))}
                        </div>

                        {/* Input bar */}
                        <div className="px-4 pb-4 pt-1">
                            <div className="flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-4 py-2.5 focus-within:border-indigo-500/60 transition-all duration-200">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ask me anything..."
                                    className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={!input.trim() || isTyping}
                                    className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                                    aria-label="Send message"
                                >
                                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                        <path d="M2 8L14 2L9 14L7.5 9L2 8Z" fill="white" />
                                    </svg>
                                </button>
                            </div>
                            <p className="text-center text-[10px] text-white/20 mt-2">Powered by Naangle AI</p>
                        </div>
                    </MotionDiv>
                )}
            </AnimatePresence>

            {/* ── Floating Trigger Button ── */}
            <div className="fixed bottom-6 right-6 z-[9999]">
                {/* Tooltip */}
                <AnimatePresence>
                    {isHovered && !isOpen && (
                        <MotionDiv
                            key="tooltip"
                            initial={{ opacity: 0, x: 8, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 8, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-800 border border-white/10 text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg"
                        >
                            Chat with AI
                            <span className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-slate-800" />
                        </MotionDiv>
                    )}
                </AnimatePresence>

                <MotionButton
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    onClick={() => setIsOpen((prev) => !prev)}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Open chat"
                    className="relative w-14 h-14 rounded-full shadow-[0_8px_32px_rgba(99,102,241,0.45)] focus:outline-none cursor-pointer"
                    style={{ background: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)" }}
                >
                    {/* Spinning gradient border glow */}
                    <MotionSpan
                        className="absolute inset-[-3px] rounded-full -z-10"
                        style={{ background: "conic-gradient(from 0deg, #6366f1, #a855f7, #ec4899, #6366f1)" }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Icon — bot or close */}
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <MotionSpan
                                key="close"
                                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.22 }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
                                    <path d="M1 1l12 12M13 1L1 13" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                                </svg>
                            </MotionSpan>
                        ) : (
                            <MotionSpan
                                key="bot"
                                initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.22 }}
                                className="absolute inset-0"
                            >
                                <BotIcon isHovered={isHovered} />
                            </MotionSpan>
                        )}
                    </AnimatePresence>

                    {/* Notification badge */}
                    {!isOpen && (
                        <MotionSpan
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-950 flex items-center justify-center"
                        >
                            <span className="text-[8px] font-bold text-slate-900">1</span>
                        </MotionSpan>
                    )}
                </MotionButton>
            </div>
        </>
    );
}
