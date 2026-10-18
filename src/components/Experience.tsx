"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export default function Experience() {
  const { experience } = portfolioData;
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll-linked timeline line animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end 70%"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="experience"
      className="relative w-full max-w-[1280px] mx-auto px-gutter-mobile sm:px-gutter py-space-lg sm:py-space-xl overflow-hidden"
    >
      {/* Section Header */}
      <div className="flex flex-col gap-2 mb-space-md sm:mb-space-lg">
        <div className="flex items-center gap-2">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-mono">
            GIT_LOG --GRAPH --ONELINE
          </span>
          <span className="material-symbols-outlined text-[16px] text-tertiary">
            alt_route
          </span>
        </div>
        <h2 className="font-headline-lg text-[24px] sm:text-[30px] lg:text-headline-lg text-on-surface font-mono font-bold">
          Experience &amp; Career Commit History
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
          Chronological work history rendered as a continuous Git DAG branch.
        </p>
      </div>

      {/* Timeline Wrapper */}
      <div ref={containerRef} className="relative flex flex-col gap-space-lg pl-9 sm:pl-12">
        {/* Static Base Line */}
        <div className="absolute left-4 sm:left-5 top-4 bottom-4 w-1 bg-surface-container-high rounded-full -z-10" />

        {/* Animated Drawing Git Branch Line */}
        {!shouldReduceMotion ? (
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-4 sm:left-5 top-4 bottom-4 w-1 bg-gradient-to-b from-primary via-tertiary to-secondary rounded-full shadow-[0_0_10px_rgba(123,219,128,0.5)] -z-10"
          />
        ) : (
          <div className="absolute left-4 sm:left-5 top-4 bottom-4 w-1 bg-primary rounded-full -z-10" />
        )}

        {experience.map((item, index) => {
          const isPrimary = item.statusColor === "primary";
          return (
            <div key={item.id} className="relative flex flex-col gap-space-sm min-w-0">
              {/* Commit Node Indicator */}
              <motion.div
                initial={shouldReduceMotion ? false : { scale: 0, opacity: 0 }}
                whileInView={shouldReduceMotion ? undefined : { scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 18,
                  delay: shouldReduceMotion ? 0 : 0.1,
                }}
                className={`absolute -left-9 sm:-left-12 top-1.5 w-6 h-6 rounded-full ring-2 sm:ring-4 ring-surface flex items-center justify-center ${
                  isPrimary
                    ? "bg-primary-container text-on-primary-container shadow-[0_0_12px_rgba(35,134,54,0.4)]"
                    : "bg-surface-container-high text-tertiary"
                }`}
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    isPrimary ? "bg-primary animate-pulse" : "bg-tertiary"
                  }`}
                />
              </motion.div>

              {/* Node Header Bar */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded bg-surface-container-high border border-outline-variant text-tertiary font-label-sm text-label-sm font-mono">
                    {item.commitBadge}
                  </span>
                  <h3 className="font-headline-md text-[17px] sm:text-headline-md text-on-surface font-semibold font-mono">
                    {item.role}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded font-label-sm text-[11px] font-semibold font-mono ${
                      isPrimary
                        ? "bg-primary text-on-primary"
                        : "bg-surface-container border border-outline-variant text-on-surface-variant"
                    }`}
                  >
                    {item.statusBadge}
                  </span>
                </div>
                <span className="font-label-md text-label-md text-on-surface-variant font-mono">
                  {item.period}
                </span>
              </div>

              {/* Card Body */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{
                  duration: 0.45,
                  delay: shouldReduceMotion ? 0 : index * 0.1,
                  ease: "easeOut",
                }}
                className="p-4 sm:p-space-md rounded-lg bg-surface-container border border-outline-variant shadow-md flex flex-col gap-space-sm hover:border-outline transition-all"
              >
                {/* Company & Location */}
                <div className="flex items-center justify-between flex-wrap gap-2 pb-1 border-b border-outline-variant/40">
                  <span className="font-label-md text-label-md text-tertiary flex items-center gap-1 font-mono font-medium">
                    <span className="material-symbols-outlined text-[16px]">
                      business
                    </span>
                    {item.company}
                  </span>
                  <span className="font-label-sm text-label-sm text-outline font-mono flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      location_on
                    </span>
                    {item.location}
                  </span>
                </div>

                {/* 3 Bullets per role (3-column grid on desktop, list on mobile) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm pt-2">
                  {item.bullets.map((bullet, bulletIndex) => (
                    <motion.div
                      key={bullet.title}
                      initial={
                        shouldReduceMotion ? false : { opacity: 0, y: 12 }
                      }
                      whileInView={
                        shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                      }
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.35,
                        delay: shouldReduceMotion ? 0 : bulletIndex * 0.08,
                      }}
                      className="p-3 rounded bg-surface-container-lowest border border-outline-variant/60 flex flex-col gap-1.5 hover:border-outline transition-colors"
                    >
                      <span
                        className={`font-label-sm text-label-sm font-semibold flex items-center gap-1.5 font-mono ${bullet.color || "text-primary"}`}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {bullet.icon}
                        </span>
                        <span>{bullet.title}</span>
                      </span>
                      <p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
                        {bullet.description}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Technology Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-outline-variant/30">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-surface-container-lowest border border-outline-variant/50 text-outline text-[11px] font-mono hover:text-on-surface transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
