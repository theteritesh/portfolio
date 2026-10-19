"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { portfolioData, ProjectItem } from "@/data/portfolio";

type FilterTab = "All" | "Full Stack" | "SaaS" | "E-commerce" | "Java";

interface ProjectsProps {
  repoStats?: Record<string, { stars: number; forks: number }>;
}

function ProjectCardMedia({ project }: { project: ProjectItem }) {
  const [hasError, setHasError] = useState(false);
  const altText = project.isPlaceholderImage
    ? `Illustrative preview of ${project.title}`
    : project.title;

  return (
    <div className="relative w-full aspect-video bg-surface-container-lowest overflow-hidden border-b border-outline-variant">
      {!hasError ? (
        <Image
          src={project.image}
          alt={altText}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 bg-surface-container-low text-outline p-4 font-mono text-center">
          <span className="material-symbols-outlined text-[30px] text-outline-variant">
            image_not_supported
          </span>
          <span className="text-[12px] text-on-surface-variant font-medium">
            {project.title}
          </span>
          <span className="text-[10px] text-outline">Preview pending</span>
        </div>
      )}

      {/* Subtle vignette gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent opacity-80 pointer-events-none" />

      {/* Unobtrusive corner caption label */}
      {project.isPlaceholderImage && !hasError && (
        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur-sm border border-outline-variant/60 font-mono text-[10px] text-on-surface-variant/90 shadow-sm z-10 pointer-events-none select-none">
          Illustrative preview
        </div>
      )}
    </div>
  );
}

export default function Projects({ repoStats }: ProjectsProps) {
  const { projects } = portfolioData;
  const shouldReduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");

  const filterTabs: FilterTab[] = [
    "All",
    "Full Stack",
    "SaaS",
    "E-commerce",
    "Java",
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "All") return true;
    return (
      project.categories?.includes(activeFilter) ||
      project.category === activeFilter
    );
  });

  return (
    <section
      id="projects"
      className="relative w-full max-w-[1280px] mx-auto px-gutter-mobile sm:px-gutter py-space-lg sm:py-space-xl overflow-hidden"
    >
      {/* Section Header & Interactive Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg w-full min-w-0">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-2 min-w-0"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-mono flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">
                deployed_code
              </span>
              PRODUCTION PROJECTS • ARCHITECTURE
            </span>
            <span className="px-2 py-0.5 rounded bg-surface-container border border-outline-variant text-tertiary font-mono text-[11px]">
              {projects.length} Featured Projects
            </span>
          </div>
          <h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface font-bold font-mono">
            Featured Engineering Projects
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Production-grade multi-tenant SaaS platforms, ERP systems, B2B marketplaces, and enterprise backend services built with Java, Spring, React, MySQL, and Nginx.
          </p>
        </motion.div>

        {/* Filter Tabs with Framer Motion Sliding Indicator */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-surface-container border border-outline-variant font-label-sm text-label-sm font-mono overflow-x-auto w-full md:w-auto min-w-0 max-w-full scrollbar-thin">
          {filterTabs.map((tab) => {
            const isSelected = activeFilter === tab;
            const count =
              tab === "All"
                ? projects.length
                : projects.filter(
                    (p) =>
                      p.categories?.includes(tab) || p.category === tab
                  ).length;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFilter(tab)}
                className={`relative px-3 py-1.5 rounded-md transition-colors whitespace-nowrap z-10 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
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
            // Check real GitHub stats if fetched from the existing data layer
            const repoName = project.githubUrl
              ? project.githubUrl.split("/").pop()?.toLowerCase()
              : null;
            const liveRepo = repoName && repoStats ? repoStats[repoName] : null;
            const hasRealStats = Boolean(
              liveRepo && (liveRepo.stars > 0 || liveRepo.forks > 0)
            );

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
                <div className="relative">
                  <ProjectCardMedia project={project} />

                  {/* Badges floating on image */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 pointer-events-none z-10">
                    <span
                      className={`px-2 py-0.5 rounded-full font-label-sm text-[11px] font-semibold flex items-center gap-1 shadow-sm font-mono backdrop-blur-sm ${
                        project.status === "Company project"
                          ? "bg-secondary-container/95 text-on-secondary-container border border-secondary/40"
                          : "bg-primary-container/95 text-on-primary-container border border-primary/40"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[13px]">
                        {project.status === "Company project"
                          ? "apartment"
                          : "person"}
                      </span>
                      <span>{project.status}</span>
                    </span>

                    {/* Real Domain if available, or real live GitHub stars/forks if fetched */}
                    {project.domain ? (
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm border border-outline-variant/80 font-label-sm text-[11px] text-tertiary font-mono shadow-sm max-w-[55%]">
                        <span className="material-symbols-outlined text-[12px] shrink-0">
                          public
                        </span>
                        <span className="truncate">{project.domain}</span>
                      </div>
                    ) : hasRealStats && liveRepo ? (
                      <div className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm border border-outline-variant/80 font-label-sm text-[11px] text-on-surface font-mono shadow-sm">
                        <span className="flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[13px] text-tertiary">
                            star
                          </span>
                          {liveRepo.stars}
                        </span>
                        <span className="flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[13px] text-outline">
                            fork_right
                          </span>
                          {liveRepo.forks}
                        </span>
                      </div>
                    ) : null}
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

                  {/* Key Modules Row (replaces old fake code diff block) */}
                  {project.keyModules && (
                    <div className="rounded bg-surface-container-lowest border border-outline-variant/60 p-2.5 font-mono text-[11px] leading-relaxed flex flex-col gap-1">
                      <div className="text-tertiary font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">
                          tune
                        </span>
                        <span>Key modules:</span>
                      </div>
                      <p className="text-on-surface-variant text-[11.5px] leading-normal line-clamp-2">
                        {project.keyModules}
                      </p>
                    </div>
                  )}

                  {/* Optional Metrics Row - only renders entries with real value, hidden if empty/TODO */}
                  {(() => {
                    const validMetrics = project.metrics?.filter(
                      (m) =>
                        m &&
                        m.value &&
                        m.value.trim() !== "" &&
                        !m.value.toUpperCase().includes("TODO")
                    );
                    if (!validMetrics || validMetrics.length === 0) return null;
                    return (
                      <div className="grid grid-cols-2 gap-2 font-mono">
                        {validMetrics.map((metric, idx) => (
                          <div
                            key={idx}
                            className="px-2 py-1 rounded bg-surface-container-lowest border border-outline-variant/40 flex flex-col"
                          >
                            <span className="text-[10px] text-outline uppercase">
                              {metric.label}
                            </span>
                            <span className="text-[12px] font-semibold text-primary">
                              {metric.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    );
                  })()}

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
                      {/* GitHub Button if public repo */}
                      {project.githubUrl ? (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title} on GitHub`}
                          className="px-2.5 py-1 rounded bg-surface-container-high border border-outline-variant text-on-surface font-label-sm text-[12px] font-mono hover:text-primary hover:border-primary transition-all flex items-center gap-1 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            code
                          </span>
                          <span>GitHub</span>
                        </a>
                      ) : project.isPrivateRepo ? (
                        <span
                          className="px-2.5 py-1 rounded bg-surface-container-lowest border border-outline-variant/50 text-outline font-label-sm text-[11px] font-mono flex items-center gap-1 cursor-default select-none"
                          title="Proprietary commercial codebase"
                        >
                          <span className="material-symbols-outlined text-[13px]">
                            lock
                          </span>
                          <span>Private repository</span>
                        </span>
                      ) : null}

                      {/* Live Demo Button if live URL exists */}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit live demo for ${project.title}`}
                          className="px-2.5 py-1 rounded bg-primary-container text-on-primary-container font-label-sm text-[12px] font-mono hover:bg-primary-fixed-dim transition-all flex items-center gap-1 shadow-sm active:scale-95 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
