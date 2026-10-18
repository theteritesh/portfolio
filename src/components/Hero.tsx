"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export default function Hero() {
  const { personal, metrics, terminal } = portfolioData;
  const shouldReduceMotion = useReducedMotion();

  // Typewriter effect state for hero role headline
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedTerminal, setCopiedTerminal] = useState(false);

  useEffect(() => {
    const roles = personal.roles;
    const fullText = roles[currentRoleIndex];

    const typingSpeed = isDeleting ? 30 : 65;
    const pauseBeforeDelete = 2400;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < fullText.length) {
          setCurrentText(fullText.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(fullText.slice(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, personal.roles]);

  const copyTerminalContent = () => {
    const textToCopy = `git checkout -b feature/launch-2025\nmvn spring-boot:run --quiet & npm run dev\ngit status --short`;
    navigator.clipboard?.writeText(textToCopy);
    setCopiedTerminal(true);
    setTimeout(() => setCopiedTerminal(false), 2000);
  };

  return (
    <section
      id="home"
      className="relative isolate w-full max-w-[1280px] mx-auto px-gutter-mobile sm:px-gutter py-6 sm:py-space-xl overflow-hidden"
    >
      {/* Dedicated Hero Matte Background Layer */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 pointer-events-none overflow-hidden select-none"
      >
        {/* Soft elegant top radial matte vignette */}
        <div
          className="absolute inset-0 opacity-60 dark:opacity-50"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(123, 219, 128, 0.06), transparent 80%)",
          }}
        />

        {/* Primary Ambient Matte Glow Blob (home-desktop.html:113) */}
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, 24, -16, 0],
                  y: [0, -18, 14, 0],
                }
          }
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-32 left-4 sm:left-1/4 w-72 sm:w-[28rem] h-72 sm:h-[28rem] bg-primary/10 rounded-full blur-[80px] sm:blur-[130px]"
        />

        {/* Tertiary Ambient Matte Glow Blob (home-desktop.html:116) */}
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, -20, 15, 0],
                  y: [0, 22, -18, 0],
                }
          }
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 sm:top-1/2 -right-12 sm:-right-24 w-64 sm:w-[24rem] h-64 sm:h-[24rem] bg-tertiary/10 rounded-full blur-[80px] sm:blur-[120px]"
        />

        {/* Subtle bottom secondary accent glow for depth */}
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, 16, -12, 0],
                  y: [0, 14, -16, 0],
                }
          }
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="hidden sm:block absolute -bottom-24 left-1/3 w-64 sm:w-80 h-64 sm:h-80 bg-secondary/6 rounded-full blur-[110px]"
        />
      </div>

      {/* Mobile Top Profile & Status Bar (Matches design/home-mobile.html) */}
      <div className="flex md:hidden items-center justify-between mb-5 pb-3 border-b border-outline-variant/60">
        <div className="flex items-center gap-space-sm">
          <div className="relative w-12 h-12 rounded-full bg-surface-container-high p-0.5 shrink-0 shadow-md border border-outline-variant">
            <Image
              src={personal.avatarUrl}
              alt={personal.name}
              width={48}
              height={48}
              className="w-full h-full object-cover rounded-full"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-primary ring-2 ring-surface animate-pulse" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-headline-sm text-[18px] text-on-surface truncate font-semibold font-mono">
                {personal.name}
              </span>
              <span className="material-symbols-outlined text-primary text-[17px]">
                verified
              </span>
            </div>
            <span className="font-code-inline text-label-sm text-tertiary font-mono">
              {personal.handle}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface border border-outline-variant">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-label-sm text-[11px] font-medium text-primary font-mono">
            Open to work
          </span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-gutter items-center">
        {/* Left Column: Intro & Git Telemetry */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="col-span-12 lg:col-span-6 flex flex-col gap-space-md z-10"
        >
          {/* Branch Chip & Education Status */}
          <div className="flex items-center gap-space-sm flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high border border-outline-variant text-primary font-label-sm text-label-sm shadow-sm font-mono">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span className="material-symbols-outlined text-[14px]">commit</span>
              <span>
                {personal.status.branch} • HEAD @ {personal.status.version}
              </span>
            </div>
            <span className="px-2 py-0.5 rounded text-tertiary bg-surface-container border border-outline-variant font-label-sm text-label-sm font-mono">
              {personal.degreeSpecialization}
            </span>
          </div>

          {/* Typography Heading & Typewriter Subtitle */}
          <div className="flex flex-col gap-2.5">
            <h1 className="font-display-hero text-[34px] sm:text-[48px] sm:leading-[56px] text-on-surface tracking-tight font-bold font-mono">
              {personal.name}
              <span className="text-primary">;</span>
            </h1>

            {/* Dynamic Typewriter Role */}
            <div className="min-h-[58px] sm:min-h-[56px] flex items-center">
              <p className="font-headline-md text-[17px] sm:text-[22px] sm:leading-[28px] text-tertiary tracking-tight font-mono">
                <span>{currentText}</span>
                <span className="inline-block w-2.5 h-5 bg-primary ml-1 align-middle animate-pulse" />
              </p>
            </div>

            <p className="font-body-lg text-[14px] sm:text-[16px] text-on-surface-variant max-w-xl leading-relaxed">
              {personal.bio}
            </p>
          </div>

          {/* Action CTAs: Styled like Git PR / Commit Controls */}
          <div className="pt-2">
            <div className="grid grid-cols-2 sm:flex sm:items-center gap-space-sm flex-wrap">
              <Link
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2.5 rounded bg-primary-container hover:bg-[#2ea043] border border-white/10 text-on-primary-container font-label-md text-[13px] sm:text-label-md font-semibold shadow-md active:scale-95 transition-all font-mono"
              >
                <span className="material-symbols-outlined text-[17px]">merge</span>
                <span>View Projects</span>
                <span className="hidden sm:inline px-1.5 py-0.5 rounded bg-black/25 text-[11px] font-label-sm">
                  6 PRs
                </span>
              </Link>

              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2.5 rounded bg-surface-container-high hover:bg-surface-bright border border-outline-variant text-on-surface font-label-md text-[13px] sm:text-label-md font-medium shadow-sm active:scale-95 transition-all font-mono"
              >
                <span className="material-symbols-outlined text-[17px]">terminal</span>
                <span>Contact Me</span>
              </Link>

              <a
                href={portfolioData.contact.github}
                target="_blank"
                rel="noreferrer"
                className="col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded bg-surface-container border border-outline-variant text-on-surface-variant hover:text-tertiary hover:border-outline font-label-sm text-label-sm transition-all font-mono"
              >
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                <span>{portfolioData.contact.githubUser}</span>
              </a>
            </div>
          </div>

          {/* GitHub Telemetry Metrics Widget (3 cards) */}
          <div className="grid grid-cols-3 gap-space-sm pt-4 max-w-lg">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="p-2.5 sm:p-space-sm rounded bg-surface-container-low border border-outline-variant shadow-sm flex flex-col transition-transform hover:-translate-y-0.5 duration-200"
              >
                <div className="flex items-center justify-between text-outline">
                  <span className="font-label-sm text-[10px] sm:text-label-sm uppercase tracking-wider font-mono">
                    {metric.label}
                  </span>
                  <span
                    className={`material-symbols-outlined text-[15px] sm:text-[16px] ${metric.color || "text-tertiary"}`}
                  >
                    {metric.icon}
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mt-1 font-mono">
                  <span className="font-headline-md text-[18px] sm:text-headline-md text-on-surface font-bold">
                    {metric.value}
                  </span>
                  <span className="font-label-sm text-[10px] sm:text-label-sm text-primary">
                    {metric.subtext}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Interactive Terminal Sandbox & Portrait Badge */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="col-span-12 lg:col-span-6 flex flex-col gap-space-md z-10"
        >
          {/* Floating Terminal Window Frame */}
          <div className="rounded-lg bg-surface-container-lowest border border-outline-variant shadow-2xl overflow-hidden">
            {/* Terminal OS Chrome Bar */}
            <div className="h-9 px-space-md bg-surface-container-high border-b border-outline-variant flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-error inline-block" />
                <span className="w-3 h-3 rounded-full bg-secondary-fixed inline-block" />
                <span className="w-3 h-3 rounded-full bg-primary inline-block" />
              </div>
              <div className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant font-mono">
                <span className="material-symbols-outlined text-[14px]">terminal</span>
                <span className="truncate">bash - alex@workstation: ~/portfolio</span>
              </div>
              <div className="flex items-center gap-2 text-outline">
                <button
                  type="button"
                  onClick={copyTerminalContent}
                  title={copiedTerminal ? "Copied!" : "Copy commands"}
                  className="hover:text-on-surface transition-colors flex items-center"
                >
                  <span className="material-symbols-outlined text-[15px]">
                    {copiedTerminal ? "check" : "content_copy"}
                  </span>
                </button>
                <span className="material-symbols-outlined text-[15px] cursor-pointer hover:text-on-surface">
                  fullscreen
                </span>
              </div>
            </div>

            {/* Terminal Canvas Content */}
            <div className="p-3 sm:p-space-md font-code-block text-[12px] sm:text-[13px] text-on-surface leading-relaxed flex flex-col gap-2 font-mono bg-surface-container-lowest/95">
              {/* Prompt and Branch */}
              <div className="flex items-center gap-2 text-on-surface-variant flex-wrap">
                <span className="text-primary font-bold">
                  {terminal.user}@{terminal.hostname}
                </span>
                <span className="text-tertiary">{terminal.workdir}</span>
                <span className="text-on-surface-variant">({terminal.branch})</span>
              </div>

              {/* Command 1: git checkout */}
              <div className="flex items-center gap-2 text-primary pt-0.5">
                <span className="text-outline">$</span>
                <span className="text-on-surface">git checkout -b feature/launch-2025</span>
              </div>
              <div className="text-tertiary-fixed-dim text-label-sm pl-4 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">call_split</span>
                <span>Switched to a new branch &apos;feature/launch-2025&apos;</span>
              </div>

              {/* Command 2: maven & npm */}
              <div className="flex items-center gap-2 text-primary pt-1">
                <span className="text-outline">$</span>
                <span className="text-on-surface">mvn spring-boot:run --quiet &amp; npm run dev</span>
              </div>
              <div className="text-on-surface-variant text-label-sm pl-4 flex flex-col gap-0.5 border-l-2 border-outline-variant/50 ml-1 py-0.5">
                <span className="text-primary-fixed pl-2">
                  [INFO] Tomcat started on port 8080 (http) with context path &apos;&apos;
                </span>
                <span className="text-tertiary pl-2">
                  [VITE] ready in 241 ms → Local: http://localhost:5173/
                </span>
                <span className="text-outline pl-2">
                  [AUTH] AWS IAM Role: arn:aws:iam::01928491:role/AlexPortfolioApp
                </span>
              </div>

              {/* Command 3: git status */}
              <div className="flex items-center gap-2 text-primary pt-1">
                <span className="text-outline">$</span>
                <span className="text-on-surface">git status --short</span>
              </div>
              <div className="text-label-sm pl-4 flex flex-col gap-0.5">
                <span className="text-primary">
                  M src/main/java/com/alex/service/MicroservicesEngine.java
                </span>
                <span className="text-primary">
                  M frontend/src/components/GitInteractiveGraph.tsx
                </span>
                <span className="text-tertiary">
                  A docs/ARCHITECTURE_DECISION_RECORDS.md
                </span>
                <span className="text-on-surface-variant">
                  ?? tests/e2e/cypress/integration/portfolio.spec.ts
                </span>
              </div>

              {/* Active Prompt Line with pulsing cursor */}
              <div className="flex items-center gap-2 pt-2 text-primary font-bold">
                <span>alex@devbox:~$</span>
                <span className="inline-block w-2.5 h-4 sm:h-5 bg-primary animate-pulse" />
              </div>
            </div>
          </div>

          {/* Profile Metadata & Verification Card */}
          <div className="flex items-center justify-between p-3 sm:p-space-md rounded-lg bg-surface-container border border-outline-variant shadow-md">
            <div className="flex items-center gap- space-sm sm:gap-space-md">
              <div className="relative shrink-0">
                <Image
                  src={personal.avatarUrl}
                  alt={personal.name}
                  width={64}
                  height={64}
                  className="w-13 h-13 sm:w-16 sm:h-16 rounded-full object-cover ring-2 ring-primary"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-primary ring-2 ring-surface-container flex items-center justify-center">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-pulse" />
                </span>
              </div>

              <div className="flex flex-col pl-2 sm:pl-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-headline-sm text-[15px] sm:text-headline-sm text-on-surface font-semibold font-mono">
                    {personal.name}
                  </span>
                  <span
                    className="material-symbols-outlined text-primary text-[17px] sm:text-[18px]"
                    title="Verified Engineer"
                  >
                    verified
                  </span>
                </div>
                <span className="font-label-sm text-[12px] sm:text-label-sm text-tertiary font-mono">
                  {personal.title}
                </span>
                <span className="font-body-sm text-[11px] sm:text-body-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-[13px] sm:text-[14px] text-outline">
                    location_on
                  </span>
                  <span>{personal.location}</span>
                </span>
              </div>
            </div>

            <div className="hidden sm:flex flex-col items-end gap-1">
              <span className="px-2.5 py-1 rounded bg-surface-container-high border border-outline-variant text-primary font-label-sm text-label-sm flex items-center gap-1 font-mono">
                <span className="material-symbols-outlined text-[14px]">
                  workspace_premium
                </span>
                AWS Certified
              </span>
              <span className="font-label-sm text-label-sm text-outline font-mono">
                100% On-Time Delivery
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
