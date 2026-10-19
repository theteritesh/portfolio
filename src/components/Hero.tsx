"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  portfolioData,
  getExperienceYears,
  getHeroExperienceBadge,
  getHeroBio,
} from "@/data/portfolio";

export interface HeroStats {
  repositories: number | string;
  contributions: number | string;
  followers: number | string;
}

export interface HeroProps {
  stats?: HeroStats;
  experienceYears?: number;
}

export default function Hero({ stats, experienceYears = 1 }: HeroProps = {}) {
  const { personal, metrics, terminal } = portfolioData;
  const shouldReduceMotion = useReducedMotion();
  const [computedYears, setComputedYears] = useState(experienceYears);

  useEffect(() => {
    const timer = setTimeout(() => {
      setComputedYears(getExperienceYears(personal.startDate));
    }, 0);
    return () => clearTimeout(timer);
  }, [personal.startDate]);

  // Stats row: 3 cards (Experience, Repositories, Contributions)
  const displayMetrics = React.useMemo(() => {
    const experienceCard = {
      label: "EXPERIENCE",
      value: `${computedYears}+ yrs`,
      subtext: "full stack, Java and React",
      icon: "work_history",
      color: "text-primary",
    };

    if (!stats) {
      return [
        experienceCard,
        ...metrics.filter(
          (m) =>
            m.label.toUpperCase() !== "EXPERIENCE" &&
            m.label.toUpperCase() !== "NETWORK"
        ),
      ];
    }

    return [
      experienceCard,
      {
        label: "Repositories",
        value: String(stats.repositories),
        subtext: "public repos",
        icon: "inventory_2",
        color: "text-tertiary",
      },
      {
        label: "Contributions",
        value:
          typeof stats.contributions === "number"
            ? stats.contributions.toLocaleString()
            : String(stats.contributions),
        subtext: "past year",
        icon: "grain",
        color: "text-primary",
      },
    ];
  }, [stats, metrics, computedYears]);

  // Typewriter effect: 3-phase state machine with guaranteed cleanup
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");
  const [copiedTerminal, setCopiedTerminal] = useState(false);

  useEffect(() => {
    const roles = personal.roles;
    if (!roles || roles.length === 0) return;

    const fullText = roles[currentRoleIndex] || "";

    if (phase === "typing") {
      if (currentText.length < fullText.length) {
        const timer = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length + 1));
        }, 55);
        return () => clearTimeout(timer);
      } else {
        // Entire phrase is typed. Hold before deleting so reader comfortably completes it
        const timer = setTimeout(() => {
          setPhase("deleting");
        }, 2200);
        return () => clearTimeout(timer);
      }
    }

    if (phase === "deleting") {
      if (currentText.length > 0) {
        const timer = setTimeout(() => {
          setCurrentText((prev) => prev.slice(0, -1));
        }, 25);
        return () => clearTimeout(timer);
      } else {
        // Entire phrase deleted. Pause briefly, advance index and start next phrase
        const timer = setTimeout(() => {
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          setPhase("typing");
        }, 250);
        return () => clearTimeout(timer);
      }
    }
  }, [currentText, phase, currentRoleIndex, personal.roles]);

  const copyTerminalContent = () => {
    const textToCopy = terminal.commands.map((c) => c.command).join("\n");
    navigator.clipboard?.writeText(textToCopy);
    setCopiedTerminal(true);
    setTimeout(() => setCopiedTerminal(false), 2000);
  };

  return (
    <section
      id="home"
      className="relative isolate w-full overflow-hidden"
    >
      {/* Dedicated Hero Full-Bleed Background Layer */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 pointer-events-none overflow-hidden select-none"
      >
        {/* Soft elegant top radial matte vignette */}
        <div
          className="absolute inset-0 opacity-60 dark:opacity-50"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(123, 219, 128, 0.08), transparent 75%)",
          }}
        />

        {/* Ambient Matte Glow Blobs with radial fade ensuring no clipped box edges */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            maskImage:
              "radial-gradient(ellipse 90% 80% at 50% 45%, black 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 80% at 50% 45%, black 40%, transparent 100%)",
          }}
        >
          {/* Primary Ambient Matte Glow Blob */}
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
            className="absolute -top-24 left-4 sm:left-[15%] w-72 sm:w-[28rem] h-72 sm:h-[28rem] bg-primary/10 rounded-full blur-[100px]"
          />

          {/* Tertiary Ambient Matte Glow Blob */}
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
            className="absolute top-1/4 right-[5%] sm:right-[10%] w-64 sm:w-[26rem] h-64 sm:h-[26rem] bg-tertiary/10 rounded-full blur-[100px]"
          />

          {/* Subtle bottom secondary accent glow */}
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
            className="hidden sm:block absolute bottom-8 left-1/3 w-64 sm:w-80 h-64 sm:h-80 bg-secondary/6 rounded-full blur-[90px]"
          />
        </div>

        {/* Seamless bottom fade from transparent to page background (surface) */}
        <div
          className="absolute inset-x-0 bottom-0 h-36 sm:h-48 bg-gradient-to-b from-transparent via-surface/60 to-surface pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Hero Content Container */}
      <div className="w-full max-w-[1280px] mx-auto px-gutter-mobile sm:px-gutter py-6 sm:py-space-xl">

      {/* Mobile Top Profile & Status Bar */}
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
            {personal.opportunityStatus}
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
          {/* Branch Chip & Professional Experience Badge */}
          <div className="flex items-center gap-space-sm flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high border border-outline-variant text-primary font-label-sm text-label-sm shadow-sm font-mono">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span className="material-symbols-outlined text-[14px]">commit</span>
              <span>
                {personal.status.branch} • HEAD @ {personal.status.version}
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded text-tertiary bg-surface-container border border-outline-variant font-label-sm text-label-sm font-mono font-medium">
              {getHeroExperienceBadge(computedYears)}
            </span>
          </div>

          {/* Typography Heading & Typewriter Subtitle */}
          <div className="flex flex-col gap-2.5">
            <h1 className="font-display-hero text-[34px] sm:text-[48px] sm:leading-[56px] text-on-surface tracking-tight font-bold font-mono">
              {personal.name}
              <span className="text-primary">;</span>
            </h1>

            {/* Dynamic Typewriter Role */}
            <div className="min-h-[58px] sm:min-h-[64px] flex items-center">
              <p className="font-headline-md text-[17px] sm:text-[22px] sm:leading-[30px] text-tertiary tracking-tight font-mono break-words">
                <span>{currentText}</span>
                <span className="inline-block w-2.5 h-5 bg-primary ml-1 align-middle animate-pulse" />
              </p>
            </div>

            <p className="font-body-lg text-[14px] sm:text-[16px] text-on-surface-variant max-w-xl leading-relaxed">
              {getHeroBio(computedYears)}
            </p>
          </div>

          {/* Action CTAs: Styled like Git PR / Commit Controls */}
          <div className="pt-2">
            <div className="flex flex-wrap items-center gap-2 sm:gap-space-sm">
              <Link
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2.5 rounded bg-primary-container hover:bg-[#2ea043] border border-white/10 text-on-primary-container font-label-md text-[13px] sm:text-label-md font-semibold shadow-md active:scale-95 transition-all font-mono"
              >
                <span className="material-symbols-outlined text-[17px]">deployed_code</span>
                <span>View Projects</span>
                <span className="hidden sm:inline px-1.5 py-0.5 rounded bg-black/25 text-[11px] font-label-sm">
                  {portfolioData.projects.length} Projects
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
                href={personal.resumeUrl}
                download="Ritesh_Thete_Resume.pdf"
                className="inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2.5 rounded bg-surface-container-high hover:bg-surface-bright border border-outline-variant text-on-surface font-label-md text-[13px] sm:text-label-md font-medium shadow-sm active:scale-95 transition-all font-mono"
              >
                <span className="material-symbols-outlined text-[17px]">download</span>
                <span>Download Resume</span>
              </a>
            </div>
          </div>

          {/* Telemetry & Experience Metrics Widget (3 cards) */}
          <div className="grid grid-cols-3 gap-2 sm:gap-space-sm pt-4 max-w-lg">
            {displayMetrics.map((metric) => (
              <div
                key={metric.label}
                className="p-2 sm:p-space-sm rounded bg-surface-container-low border border-outline-variant shadow-sm flex flex-col transition-transform hover:-translate-y-0.5 duration-200 overflow-hidden"
              >
                <div className="flex items-center justify-between text-outline gap-1">
                  <span className="font-label-sm text-[10px] sm:text-[11px] uppercase tracking-tight sm:tracking-wider font-mono truncate">
                    {metric.label}
                  </span>
                  <span
                    className={`material-symbols-outlined text-[15px] sm:text-[16px] shrink-0 ${metric.color || "text-tertiary"}`}
                  >
                    {metric.icon}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-0 sm:gap-1 mt-1 font-mono">
                  <span className="font-headline-md text-[15px] sm:text-headline-md text-on-surface font-bold leading-none">
                    {metric.value}
                  </span>
                  <span
                    title={metric.subtext}
                    className="font-label-sm text-[9px] sm:text-[10px] text-primary leading-tight truncate"
                  >
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
          className="col-span-12 lg:col-span-6 flex flex-col gap-space-md z-10 w-full min-w-0"
        >
          {/* Floating Terminal Window Frame */}
          <div className="rounded-lg bg-surface-container-lowest border border-outline-variant shadow-2xl overflow-hidden w-full">
            {/* Terminal OS Chrome Bar */}
            <div className="h-9 px-3 sm:px-space-md bg-surface-container-high border-b border-outline-variant flex items-center justify-between select-none gap-2">
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-error inline-block" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-secondary-fixed inline-block" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary inline-block" />
              </div>
              <div className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant font-mono min-w-0 flex-1 justify-center px-1">
                <span className="material-symbols-outlined text-[14px] shrink-0">terminal</span>
                <span className="truncate text-[11px] sm:text-label-sm">
                  bash - {terminal.user}@{terminal.hostname}: {terminal.workdir}
                </span>
              </div>
              <div className="flex items-center gap-2 text-outline shrink-0">
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
            <div className="p-3 sm:p-space-md font-code-block text-[12px] sm:text-[13px] text-on-surface leading-relaxed flex flex-col gap-2.5 font-mono bg-surface-container-lowest/95 overflow-x-auto scrollbar-thin">
              {/* Prompt and Branch */}
              <div className="flex items-center gap-2 text-on-surface-variant flex-wrap">
                <span className="text-primary font-bold">
                  {terminal.user}@{terminal.hostname}
                </span>
                <span className="text-tertiary">{terminal.workdir}</span>
                <span className="text-on-surface-variant">({terminal.branch})</span>
              </div>

              {/* Command 1: git log --oneline -3 */}
              <div className="flex items-center gap-2 text-primary pt-0.5 break-all sm:break-normal">
                <span className="text-outline shrink-0">$</span>
                <span className="text-on-surface">{terminal.commands[0]?.command}</span>
              </div>
              <div className="text-label-sm pl-3 sm:pl-4 flex flex-col gap-1 border-l-2 border-outline-variant/50 ml-1 py-0.5">
                {terminal.commands[0]?.output?.map((line, idx) => {
                  const parts = line.split(" ");
                  const hash = parts[0];
                  const msg = parts.slice(1).join(" ");
                  return (
                    <div key={idx} className="flex items-center gap-2 text-tertiary font-mono">
                      <span className="text-primary-fixed font-bold">{hash}</span>
                      <span className="text-on-surface">{msg}</span>
                    </div>
                  );
                })}
              </div>

              {/* Command 2: git status --short */}
              <div className="flex items-center gap-2 text-primary pt-1">
                <span className="text-outline shrink-0">$</span>
                <span className="text-on-surface">{terminal.commands[1]?.command}</span>
              </div>
              <div className="text-label-sm pl-2 sm:pl-4 flex flex-col gap-0.5 break-all sm:break-normal">
                {terminal.commands[1]?.output?.map((line, idx) => (
                  <span
                    key={idx}
                    className={
                      idx === 2 ? "text-tertiary" : "text-primary"
                    }
                  >
                    {line}
                  </span>
                ))}
              </div>

              {/* Active Prompt Line with pulsing cursor */}
              <div className="flex items-center gap-2 pt-2 text-primary font-bold">
                <span>
                  {terminal.user}@{terminal.hostname}:{terminal.workdir}$
                </span>
                <span className="inline-block w-2.5 h-4 sm:h-5 bg-primary animate-pulse" />
              </div>
            </div>
          </div>

          {/* Profile Metadata & Verification Card */}
          <div className="flex items-center justify-between p-3 sm:p-space-md rounded-lg bg-surface-container border border-outline-variant shadow-md">
            <div className="flex items-center gap-space-sm sm:gap-space-md min-w-0">
              <div className="relative shrink-0">
                <Image
                  src={personal.avatarUrl}
                  alt={personal.name}
                  width={64}
                  height={64}
                  priority
                  className="w-13 h-13 sm:w-16 sm:h-16 rounded-full object-cover ring-2 ring-primary"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-primary ring-2 ring-surface-container flex items-center justify-center">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-pulse" />
                </span>
              </div>

              <div className="flex flex-col pl-2 sm:pl-0 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-headline-sm text-[15px] sm:text-headline-sm text-on-surface font-semibold font-mono truncate">
                    {personal.name}
                  </span>
                  <span
                    className="material-symbols-outlined text-primary text-[17px] sm:text-[18px] shrink-0"
                    title="Verified Engineer"
                  >
                    verified
                  </span>
                </div>
                <span className="font-label-sm text-[12px] sm:text-label-sm text-tertiary font-mono truncate">
                  {personal.title}
                </span>
                <span className="font-label-sm text-[11px] sm:text-[12px] text-on-surface-variant font-mono truncate">
                  {personal.companyRoleLine}
                </span>
                <span className="font-body-sm text-[11px] sm:text-body-sm text-on-surface-variant flex items-center gap-1 mt-0.5 truncate">
                  <span className="material-symbols-outlined text-[13px] sm:text-[14px] text-outline shrink-0">
                    location_on
                  </span>
                  <span className="truncate">{personal.location}</span>
                </span>
              </div>
            </div>

            <div className="hidden sm:flex flex-col items-end gap-1.5 shrink-0 pl-2">
              <span className="px-2.5 py-1 rounded bg-surface-container-high border border-outline-variant text-primary font-label-sm text-label-sm flex items-center gap-1 font-mono">
                <span className="material-symbols-outlined text-[14px]">
                  workspace_premium
                </span>
                AWS Certified
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-mono flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                {personal.opportunityStatus}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
