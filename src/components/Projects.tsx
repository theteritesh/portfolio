"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { portfolioData, ProjectItem } from "@/data/portfolio";

type FilterTab = "All" | "Java" | "React" | "Spring Boot" | "Full Stack";

export default function Projects() {
  const { projects } = portfolioData;
  const shouldReduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");

  const filterTabs: FilterTab[] = [
    "All",
    "Java",
    "React",
    "Spring Boot",
    "Full Stack",
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Java") {
      return (
        project.category === "Java" ||
        project.tags.some((t) => t.toLowerCase().includes("java"))
      );
    }
    if (activeFilter === "React") {
      return (
        project.category === "React" ||
        project.tags.some((t) => t.toLowerCase().includes("react"))
      );
    }
    if (activeFilter === "Spring Boot") {
      return (
        project.category === "Spring Boot" ||
        project.tags.some((t) => t.toLowerCase().includes("spring"))
      );
    }
    if (activeFilter === "Full Stack") {
      return (
        project.category === "Full Stack" ||
        project.category === "Java" ||
        project.tags.length >= 4
      );
    }
    return true;
  });

  return (
    <section
      id="projects"
      className="relative w-full max-w-[1280px] mx-auto px-gutter-mobile sm:px-gutter py-space-lg sm:py-space-xl"
    >
      {/* Section Header & Interactive Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-2"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-mono flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">
                call_merge
              </span>
              REPOSITORIES • PULL_REQUESTS
            </span>
            <span className="px-2 py-0.5 rounded bg-surface-container border border-outline-variant text-tertiary font-mono text-[11px]">
              {projects.length} Production Repos
            </span>
          </div>
          <h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface font-bold font-mono">
            Featured Engineering Projects
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Production-grade systems architected with modular Git branches,
            isolated Docker containers, and high-performance backend pipelines.
          </p>
        </motion.div>

        {/* Filter Tabs with Framer Motion Sliding Indicator */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-surface-container border border-outline-variant font-label-sm text-label-sm font-mono overflow-x-auto max-w-full">
          {filterTabs.map((tab) => {
            const isSelected = activeFilter === tab;
            const count =
              tab === "All"
                ? projects.length
                : projects.filter((p) => {
                    if (tab === "Java") {
                      return (
                        p.category === "Java" ||
                        p.tags.some((t) => t.toLowerCase().includes("java"))
                      );
                    }
                    if (tab === "React") {
                      return (
                        p.category === "React" ||
                        p.tags.some((t) => t.toLowerCase().includes("react"))
                      );
                    }
                    if (tab === "Spring Boot") {
                      return (
                        p.category === "Spring Boot" ||
                        p.tags.some((t) => t.toLowerCase().includes("spring"))
                      );
                    }
                    if (tab === "Full Stack") {
                      return (
                        p.category === "Full Stack" ||
                        p.category === "Java" ||
                        p.tags.length >= 4
                      );
                    }
                    return true;
                  }).length;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFilter(tab)}
                className={`relative px-3 py-1.5 rounded-md transition-colors whitespace-nowrap z-10 flex items-center gap-1.5 ${
                  isSelected
                    ? "text-primary font-semibold"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeFilterTab"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                    className="absolute inset-0 rounded-md bg-surface-container-high border border-outline-variant shadow-sm -z-10"
                  />
                )}
                <span>{tab}</span>
                <span className="text-[10px] opacity-75">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3-Column / 2-Column / 1-Column Responsive Cards Grid */}
      <motion.div
        layout={!shouldReduceMotion}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => {
            const isMerged = project.status === "Merged";
            return (
              <motion.article
                key={project.id}
                layout={!shouldReduceMotion}
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, scale: 0.95, y: 16 }
                }
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.35,
                  delay: shouldReduceMotion ? 0 : index * 0.05,
                  ease: "easeOut",
                }}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -6,
                        transition: { duration: 0.2 },
                      }
                }
                className="group rounded-lg bg-surface-container border border-outline-variant shadow-md flex flex-col justify-between overflow-hidden hover:border-primary hover:shadow-[0_8px_24px_rgba(35,134,54,0.25)] transition-colors"
              >
                {/* Screenshot Image Container with Zoom effect */}
                <div className="relative w-full h-44 sm:h-48 bg-surface-container-lowest overflow-hidden border-b border-outline-variant">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  {/* Subtle vignette gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent opacity-80 pointer-events-none" />

                  {/* Badges floating on image */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                    <span
                      className={`px-2 py-0.5 rounded-full font-label-sm text-[11px] font-semibold flex items-center gap-1 shadow-sm font-mono ${
                        isMerged
                          ? "bg-secondary-container/90 text-on-secondary-container border border-secondary/40"
                          : "bg-primary-container/90 text-on-primary-container border border-primary/40"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[13px]">
                        {isMerged ? "merge" : "call_merge"}
                      </span>
                      <span>
                        {project.status} {project.prNumber}
                      </span>
                    </span>

                    <div className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-surface-container-lowest/85 border border-outline-variant font-label-sm text-[11px] text-on-surface font-mono shadow-sm">
                      <span className="flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[13px] text-tertiary">
                          star
                        </span>
                        {project.stars}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[13px] text-outline">
                          fork_right
                        </span>
                        {project.forks}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-4 sm:p-space-md flex flex-col gap-3 flex-1 justify-between">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-headline-sm text-[16px] sm:text-headline-sm text-on-surface group-hover:text-tertiary transition-colors font-mono font-semibold line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Code Diff or Implementation Snippet */}
                  {project.codeSnippet && (
                    <div className="rounded bg-surface-container-lowest border border-outline-variant/60 p-2 font-mono text-[11px] leading-tight flex flex-col gap-0.5">
                      {project.codeSnippet.addition && (
                        <span className="text-primary truncate">
                          {project.codeSnippet.addition}
                        </span>
                      )}
                      {project.codeSnippet.comment && (
                        <span className="text-outline truncate">
                          {project.codeSnippet.comment}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-surface-container-lowest border border-outline-variant/50 text-outline group-hover:text-on-surface text-[11px] font-mono transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer Bar: Language Dot & CTA Buttons */}
                  <div className="flex items-center justify-between pt-3 border-t border-outline-variant/40 mt-1">
                    <span className="font-label-sm text-[12px] text-on-surface-variant flex items-center gap-1.5 font-mono">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: project.languageColor }}
                      />
                      <span>{project.language}</span>
                    </span>

                    <div className="flex items-center gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded bg-surface-container-high border border-outline-variant text-on-surface font-label-sm text-[12px] font-mono hover:text-primary hover:border-primary transition-all flex items-center gap-1 active:scale-95"
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          code
                        </span>
                        <span>GitHub</span>
                      </a>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded bg-primary-container text-on-primary-container font-label-sm text-[12px] font-mono hover:bg-primary-fixed-dim transition-all flex items-center gap-1 shadow-sm active:scale-95 font-semibold"
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            launch
                          </span>
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
