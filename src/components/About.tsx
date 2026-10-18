"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export default function About() {
  const { about, personal } = portfolioData;
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<"code" | "blame" | "history" | "raw">("code");
  const [copiedRaw, setCopiedRaw] = useState(false);

  const rawMarkdown = `# ${about.heading}

${about.bioParagraph}

> **${about.philosophy.title}**
> ${about.philosophy.quote}

### ${about.academic.title}
- **Degree:** ${about.academic.degree}
- **Details:** ${about.academic.details}

### ${about.cloudCertification.title}
- **Certification:** ${about.cloudCertification.badge} (Verified)
- **Details:** ${about.cloudCertification.details}

**Location:** ${about.location}
`;

  const handleCopyRaw = () => {
    navigator.clipboard?.writeText(rawMarkdown);
    setCopiedRaw(true);
    setTimeout(() => setCopiedRaw(false), 2000);
  };

  return (
    <section
      id="about"
      className="relative w-full max-w-[1280px] mx-auto px-gutter-mobile sm:px-gutter py-space-lg sm:py-space-xl"
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="rounded-lg bg-surface-container-low border border-outline-variant shadow-lg overflow-hidden"
      >
        {/* File Navigation Tabs & Branch Header */}
        <div className="bg-surface-container-high px-space-sm sm:px-space-md py-2.5 flex items-center justify-between flex-wrap gap-2 border-b border-outline-variant">
          <div className="flex items-center gap-space-sm">
            <div className="flex items-center gap-1.5 text-on-surface font-label-md text-label-md font-mono">
              <span className="material-symbols-outlined text-primary text-[18px]">
                article
              </span>
              <span className="font-bold">{about.filename}</span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-surface-container border border-outline-variant text-outline font-label-sm text-label-sm font-mono">
              {about.fileSize}
            </span>
            <span className="hidden sm:inline font-code-inline text-[11px] text-on-surface-variant font-mono">
              {about.sloc}
            </span>
          </div>

          <div className="flex items-center gap-1 font-label-sm text-label-sm font-mono">
            <button
              type="button"
              onClick={() => setActiveTab("code")}
              className={`px-2.5 sm:px-3 py-1 rounded flex items-center gap-1 transition-colors ${
                activeTab === "code"
                  ? "bg-surface-container text-primary font-semibold border border-outline-variant"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">code</span>
              <span>Code</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("blame")}
              className={`px-2.5 sm:px-3 py-1 rounded flex items-center gap-1 transition-colors ${
                activeTab === "blame"
                  ? "bg-surface-container text-primary font-semibold border border-outline-variant"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">history</span>
              <span className="hidden sm:inline">Blame</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("history")}
              className={`px-2.5 sm:px-3 py-1 rounded flex items-center gap-1 transition-colors ${
                activeTab === "history"
                  ? "bg-surface-container text-primary font-semibold border border-outline-variant"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">update</span>
              <span className="hidden sm:inline">History</span>
            </button>
            <button
              type="button"
              onClick={handleCopyRaw}
              title="Copy raw markdown to clipboard"
              className="px-2 py-1 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">
                {copiedRaw ? "check" : "content_copy"}
              </span>
              <span>{copiedRaw ? "Copied" : "Raw"}</span>
            </button>
          </div>
        </div>

        {/* Commit breadcrumb info bar */}
        <div className="bg-surface-container px-space-sm sm:px-space-md py-2 flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant flex-wrap gap-2 border-b border-outline-variant/60">
          <div className="flex items-center gap-2 min-w-0">
            <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0 ring-1 ring-outline-variant">
              <Image
                src={personal.avatarUrl}
                alt="Alex"
                width={20}
                height={20}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-on-surface font-semibold font-mono text-[13px]">
              alexmorgan
            </span>
            <span className="text-outline truncate text-[12px] sm:text-[13px]">
              {about.latestCommit.message}
            </span>
          </div>
          <div className="flex items-center gap-2 font-label-sm text-label-sm text-outline font-mono">
            <span className="hidden md:inline">Latest commit</span>
            <span className="px-1.5 py-0.5 rounded bg-surface-container-high border border-outline-variant text-tertiary">
              {about.latestCommit.hash}
            </span>
            <span className="text-[11px]">{about.latestCommit.timeAgo}</span>
          </div>
        </div>

        {/* Rendered Markdown Body */}
        <div className="p-4 sm:p-space-lg lg:p-space-xl bg-surface-container-lowest/95 flex flex-col gap-space-md">
          {/* Markdown H1/H2 Title Bar */}
          <div className="flex items-center justify-between flex-wrap gap-2 pb-1 border-b border-outline-variant/40">
            <h2 className="font-headline-lg text-[22px] sm:text-[28px] lg:text-headline-lg text-on-surface flex items-center gap-2 font-mono font-bold">
              <span>{about.heading}</span>
              <span className="text-primary text-[24px] sm:text-[28px] animate-bounce">
                ↓
              </span>
            </h2>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container border border-outline-variant text-tertiary font-label-sm text-label-sm font-mono">
                <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
                {about.availability}
              </span>
            </div>
          </div>

          {/* Narrative Bio */}
          <p className="font-body-lg text-[15px] sm:text-body-lg text-on-surface-variant leading-relaxed">
            Full Stack Software Developer holding a{" "}
            <strong className="text-on-surface font-semibold">
              Master of Computer Applications (MCA)
            </strong>{" "}
            degree with deep domain expertise in distributed enterprise architectures
            using <strong className="text-on-surface font-semibold">Java 17/21</strong>,{" "}
            <strong className="text-on-surface font-semibold">Spring Boot</strong>, and
            reactive modern frontends with{" "}
            <strong className="text-on-surface font-semibold">React</strong> &amp;{" "}
            <strong className="text-on-surface font-semibold">TypeScript</strong>.
          </p>

          {/* Markdown GitHub Blockquote */}
          <div className="p-space-md rounded bg-surface-container-high border-l-4 border-tertiary text-on-surface shadow-sm">
            <div className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-tertiary text-[20px] shrink-0 mt-0.5">
                info
              </span>
              <div className="flex flex-col gap-0.5">
                <p className="font-semibold text-tertiary font-mono text-[13px] sm:text-[14px]">
                  {about.philosophy.title}
                </p>
                <p className="font-body-md text-[13px] sm:text-body-md text-on-surface-variant italic leading-relaxed">
                  {about.philosophy.quote}
                </p>
              </div>
            </div>
          </div>

          {/* Academic Foundation & Cloud Specialization Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-1">
            {/* Academic Foundation Card */}
            <div className="flex flex-col gap-2 p-4 sm:p-space-md rounded bg-surface-container border border-outline-variant shadow-sm transition-transform hover:-translate-y-0.5 duration-200">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md text-primary uppercase tracking-wide flex items-center gap-1.5 font-mono font-semibold">
                  <span className="material-symbols-outlined text-[18px]">school</span>
                  {about.academic.title}
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container-high text-primary font-mono text-[10px]">
                  Honors
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface font-semibold font-mono">
                {about.academic.degree}
              </p>
              <p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
                {about.academic.details}
              </p>
            </div>

            {/* Cloud Specialization & AWS Badge Card */}
            <div className="flex flex-col gap-2 p-4 sm:p-space-md rounded bg-surface-container border border-outline-variant shadow-sm transition-transform hover:-translate-y-0.5 duration-200">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md text-tertiary uppercase tracking-wide flex items-center gap-1.5 font-mono font-semibold">
                  <span className="material-symbols-outlined text-[18px]">cloud_done</span>
                  {about.cloudCertification.title}
                </span>
                <span className="px-2 py-0.5 rounded bg-primary/20 border border-primary/30 text-primary font-mono text-[10px] font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">verified</span>
                  Verified
                </span>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-body-md text-body-md text-on-surface font-semibold font-mono">
                  {about.cloudCertification.badge}
                </p>
              </div>
              <p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
                {about.cloudCertification.details}
              </p>
            </div>
          </div>

          {/* Location & Quick Terminal Look */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 text-on-surface-variant font-mono text-label-sm">
              <span className="material-symbols-outlined text-outline text-[16px]">
                location_on
              </span>
              <span>{about.location}</span>
            </div>

            <div className="p-2 sm:px-3 sm:py-1.5 rounded bg-surface-container border border-outline-variant font-code-block text-[12px] text-on-surface-variant font-mono flex items-center gap-2 flex-wrap">
              <span className="text-primary font-bold">alex.morgan:~$</span>
              <span className="text-on-surface">{about.currentlyLearning.command}</span>
              <span className="text-tertiary hidden md:inline">
                {about.currentlyLearning.output}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
