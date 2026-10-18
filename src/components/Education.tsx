"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export default function Education() {
  const { education } = portfolioData;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="education"
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
              school
            </span>
            ACADEMIC_FOUNDATION • CLOUD_CERTIFICATIONS
          </span>
          <span className="px-2 py-0.5 rounded bg-surface-container border border-outline-variant text-tertiary font-mono text-[11px]">
            Verified Provenance
          </span>
        </div>
        <h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface font-bold font-mono">
          Education &amp; Industry Credentials
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
          Formal academic training in computer applications, distributed computing
          architectures, and industry-standard cloud practitioner credentials.
        </p>
      </motion.div>

      {/* 3 Education & Certification Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
        {education.map((item, index) => {
          const isCertification = item.type === "certification";

          return (
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
              className={`rounded-lg bg-surface-container border shadow-md p-5 flex flex-col justify-between gap-4 transition-all group ${
                isCertification
                  ? "border-primary/40 hover:border-primary hover:shadow-[0_8px_24px_rgba(35,134,54,0.25)]"
                  : "border-outline-variant hover:border-outline hover:shadow-lg"
              }`}
            >
              {/* Card Top Meta */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`px-2.5 py-1 rounded font-label-sm text-[11px] font-semibold flex items-center gap-1.5 font-mono ${
                      isCertification
                        ? "bg-primary-container text-on-primary-container border border-primary/50"
                        : "bg-surface-container-high text-tertiary border border-outline-variant"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[15px]">
                      {item.icon}
                    </span>
                    <span>{item.badge}</span>
                  </span>

                  {item.verified ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-container/80 text-primary border border-primary/40 font-mono text-[11px] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      Verified
                    </span>
                  ) : (
                    <span className="font-label-sm text-[11px] text-outline font-mono">
                      {item.years}
                    </span>
                  )}
                </div>

                {/* Degree & Institution */}
                <div className="flex flex-col gap-1">
                  <h3 className="font-headline-sm text-[16px] sm:text-[18px] text-on-surface font-semibold font-mono group-hover:text-tertiary transition-colors">
                    {item.degree}
                  </h3>
                  <p className="font-label-sm text-[12px] text-tertiary font-mono flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      account_balance
                    </span>
                    {item.institution}
                  </p>
                  {isCertification && (
                    <span className="text-[11px] text-outline font-mono">
                      Validity: {item.years}
                    </span>
                  )}
                </div>

                {/* Description Note */}
                <p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
                  {item.description}
                </p>

                {/* Highlights List */}
                <div className="flex flex-col gap-1.5 pt-2 border-t border-outline-variant/40">
                  {item.highlights.map((highlight, hIdx) => (
                    <div
                      key={hIdx}
                      className="flex items-start gap-1.5 text-[12px] text-on-surface"
                    >
                      <span className="material-symbols-outlined text-primary text-[15px] shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Verification Bar */}
              <div className="pt-3 border-t border-outline-variant/40 flex items-center justify-between text-outline text-[11px] font-mono">
                <span className="truncate">{item.verificationLabel}</span>
                {item.verificationLink && (
                  <a
                    href={item.verificationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1 font-semibold shrink-0 ml-2"
                  >
                    <span>Credly</span>
                    <span className="material-symbols-outlined text-[13px]">
                      open_in_new
                    </span>
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
