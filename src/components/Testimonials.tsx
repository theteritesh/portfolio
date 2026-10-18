"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export default function Testimonials() {
  const { testimonials } = portfolioData;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="testimonials"
      className="relative w-full max-w-[1280px] mx-auto px-gutter-mobile sm:px-gutter py-space-lg sm:py-space-xl"
    >
      {/* Section Header */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-2 mb-space-lg"
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-mono flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">
              rate_review
            </span>
            CODE_REVIEWS • PEER_FEEDBACK
          </span>
          <span className="px-2 py-0.5 rounded bg-surface-container border border-outline-variant text-tertiary font-mono text-[11px]">
            PR Endorsements
          </span>
        </div>
        <h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface font-bold font-mono">
          Pull Request Approvals &amp; Testimonials
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
          Direct feedback and architectural code endorsements from senior
          engineering directors and tech leads on production deliveries.
        </p>
      </motion.div>

      {/* Testimonials Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
        {testimonials.map((item, index) => (
          <motion.div
            key={item.id}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: 0.4,
              delay: shouldReduceMotion ? 0 : index * 0.1,
              ease: "easeOut",
            }}
            whileHover={
              shouldReduceMotion
                ? undefined
                : { y: -5, transition: { duration: 0.2 } }
            }
            className="rounded-lg bg-surface-container-low border border-outline-variant shadow-md overflow-hidden flex flex-col justify-between hover:border-primary hover:shadow-[0_8px_24px_rgba(35,134,54,0.2)] transition-all group"
          >
            {/* Reviewer Header */}
            <div className="p-4 bg-surface-container border-b border-outline-variant flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-primary/50 shadow-sm shrink-0">
                  <Image
                    src={item.avatar}
                    alt={item.author}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-label-md text-label-md text-on-surface font-semibold font-mono">
                      {item.author}
                    </span>
                    <span className="text-[11px] text-outline font-mono">
                      @{item.username}
                    </span>
                  </div>
                  <span className="font-label-sm text-[11px] text-tertiary">
                    {item.role} • {item.company}
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label-sm text-[11px] font-semibold flex items-center gap-1 font-mono shadow-sm shrink-0">
                <span className="material-symbols-outlined text-[14px]">
                  done_all
                </span>
                <span>{item.statusBadge}</span>
              </span>
            </div>

            {/* Comment Body */}
            <div className="p-4 sm:p-5 flex flex-col gap-3 flex-1 justify-between">
              <blockquote className="font-body-md text-[13px] sm:text-body-md text-on-surface-variant italic leading-relaxed">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              {/* Code Diff Quote Box */}
              <div className="rounded bg-surface-container-lowest border border-outline-variant/60 p-2.5 font-mono text-[11px] text-on-surface-variant flex flex-col gap-1 shadow-inner">
                <span className="text-tertiary font-bold truncate">
                  {item.codeSnippet.filename}
                </span>
                <span className="text-primary truncate">
                  {item.codeSnippet.line}
                </span>
              </div>
            </div>

            {/* Footer PR Provenance */}
            <div className="px-4 py-2 bg-surface-container-lowest border-t border-outline-variant/40 flex items-center justify-between text-outline font-label-sm text-[11px] font-mono">
              <span className="flex items-center gap-1 text-on-surface-variant">
                <span className="material-symbols-outlined text-[13px] text-tertiary">
                  merge
                </span>
                Reviewed on {item.prNumber}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-surface-container border border-outline-variant/50">
                commit {item.commitHash}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
