"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { portfolioData, GitHubActivityData, HeatmapDay } from "@/data/portfolio";

export interface GitHubActivityProps {
  data?: GitHubActivityData;
  lastUpdated?: string;
  userUrl?: string;
  isLive?: boolean;
}

export default function GitHubActivity({
  data,
  lastUpdated,
  userUrl,
  isLive,
}: GitHubActivityProps = {}) {
  const github = data || portfolioData.github;
  const profileUrl = userUrl || `https://github.com/${github.username}`;
  const shouldReduceMotion = useReducedMotion();
  const [hoveredDay, setHoveredDay] = useState<{
    day: HeatmapDay;
    x: number;
    y: number;
  } | null>(null);

  // Month names for the 52-week header
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-[#0e4429] border border-[#006e23]/50";
      case 2:
        return "bg-[#006d32] border border-[#238636]/60";
      case 3:
        return "bg-[#26a641] border border-[#7bdb80]/80";
      case 4:
        return "bg-[#39d353] border border-[#97f999] shadow-[0_0_6px_rgba(57,211,83,0.4)]";
      case 0:
      default:
        return "bg-surface-container-high border border-outline-variant/30";
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section
      id="github-activity"
      className="relative w-full max-w-[1280px] mx-auto px-gutter-mobile sm:px-gutter py-space-lg sm:py-space-xl overflow-hidden"
    >
      {/* Target anchor for matching navbar "#github" as well */}
      <div id="github" className="absolute -top-24" />

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="rounded-lg bg-surface-container-low border border-outline-variant shadow-lg p-4 sm:p-space-lg flex flex-col gap-space-md"
      >
        {/* Section Top Bar */}
        <div className="flex items-center justify-between flex-wrap gap-space-sm border-b border-outline-variant/40 pb-space-sm">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="material-symbols-outlined text-primary text-[22px]">
                calendar_month
              </span>
              <h2 className="font-headline-sm text-[18px] sm:text-headline-sm text-on-surface font-semibold font-mono">
                {github.totalContributions.toLocaleString()} contributions in{" "}
                {github.yearRange}
              </h2>
              {isLive ? (
                <span className="px-2 py-0.5 rounded bg-primary/10 border border-primary/30 text-primary text-[10px] font-mono font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Live API
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded bg-surface-container border border-outline-variant text-outline text-[10px] font-mono">
                  Cached Provenance
                </span>
              )}
            </div>
            <p className="font-body-sm text-[13px] text-on-surface-variant">
              Daily engineering cadence across public open-source repositories
              (see notice below regarding private enterprise contributions).
            </p>
          </div>

          <div className="flex items-center gap-2 text-label-sm font-label-sm font-mono flex-wrap">
            {lastUpdated && (
              <span className="px-2.5 py-1 rounded bg-surface-container border border-outline-variant text-outline flex items-center gap-1.5 text-[11px]">
                <span className="material-symbols-outlined text-[13px] text-primary">
                  history
                </span>
                <span>Last updated: {lastUpdated}</span>
              </span>
            )}
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${github.username} on GitHub`}
              className="px-2.5 py-1 rounded bg-surface-container border border-outline-variant text-tertiary hover:text-primary hover:border-primary transition-colors flex items-center gap-1.5 shadow-sm text-[11px]"
            >
              <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              <span>View on GitHub</span>
            </a>
            <span className="px-2.5 py-1 rounded bg-surface-container border border-outline-variant text-primary font-semibold flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Current Streak: {github.currentStreak} days
            </span>
            <span className="px-2.5 py-1 rounded bg-surface-container border border-outline-variant text-tertiary flex items-center gap-1.5 shadow-sm">
              <span className="material-symbols-outlined text-[14px]">
                local_fire_department
              </span>
              Longest: {github.longestStreak} days
            </span>
          </div>
        </div>

        {/* Public Repository Scope Notice for Viewers */}
        <div className="flex items-start gap-2.5 px-3 sm:px-4 py-2.5 rounded-md bg-surface-container/70 border border-outline-variant/60 font-mono text-[12px] text-on-surface-variant leading-relaxed">
          <span className="material-symbols-outlined text-tertiary text-[17px] shrink-0 mt-0.5">
            info
          </span>
          <div>
            <span className="text-on-surface font-semibold">Notice for Viewers:</span>{" "}
            The telemetry, metrics, and contribution calendar displayed here reflect activity across{" "}
            <span className="text-primary font-medium">public repositories</span>. They are not an exact or complete reflection of my total engineering contributions, as a significant portion of my daily enterprise development occurs within private client organizations, enterprise repositories, and non-public codebases.
          </div>
        </div>

        {/* 52-Week Visual Heatmap Grid Simulator (Horizontal Scroll Container on Mobile) */}
        <div className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-outline-variant/60">
          <div className="min-w-[820px] flex flex-col gap-2 p-1">
            {/* Month Labels Bar */}
            <div className="flex justify-between font-label-sm text-[11px] text-outline font-mono pl-7 pr-2">
              {months.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>

            {/* Matrix with Day Labels (Sun-Sat) + 52 Column Grid */}
            <div className="flex gap-2 relative">
              {/* Day Labels on left */}
              <div className="flex flex-col justify-between text-[9px] text-outline font-mono py-0.5 select-none w-5">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>

              {/* 52 Columns Grid */}
              <div className="flex gap-[3px] flex-1">
                {github.weeks.map((week, colIndex) => (
                  <div key={colIndex} className="flex flex-col gap-[3px] flex-1">
                    {week.days.map((day, rowIndex) => {
                      // Diagonal wave stagger delay: (colIndex + rowIndex)
                      const diagonalDelay = shouldReduceMotion
                        ? 0
                        : Math.min((colIndex + rowIndex) * 0.009, 0.65);

                      return (
                        <motion.div
                          key={day.date}
                          initial={
                            shouldReduceMotion
                              ? false
                              : { opacity: 0, scale: 0.3 }
                          }
                          whileInView={
                            shouldReduceMotion
                              ? undefined
                              : { opacity: 1, scale: 1 }
                          }
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.22,
                            delay: diagonalDelay,
                            ease: "easeOut",
                          }}
                          whileHover={{
                            scale: 1.35,
                            zIndex: 20,
                            transition: { duration: 0.1 },
                          }}
                          onMouseEnter={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            setHoveredDay({
                              day,
                              x: rect.left + rect.width / 2,
                              y: rect.top - 8,
                            });
                          }}
                          onMouseLeave={() => setHoveredDay(null)}
                          className={`w-full aspect-square rounded-[2px] transition-colors cursor-pointer ${getLevelColor(
                            day.level
                          )}`}
                          title={`${day.count} ${
                            day.count === 1 ? "contribution" : "contributions"
                          } on ${formatDate(day.date)}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Heatmap Legend */}
            <div className="flex items-center justify-between text-outline text-label-sm font-label-sm font-mono pt-2 border-t border-outline-variant/30 flex-wrap gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <a
                  href={profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-1"
                >
                  <span>Learn how we count contributions</span>
                  <span className="material-symbols-outlined text-[13px]">
                    arrow_forward
                  </span>
                </a>
                <span className="text-outline-variant hidden sm:inline">•</span>
                <span className="text-[11px] text-outline">
                  Public repo activity only
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[11px]">Less</span>
                <span className="w-2.5 h-2.5 rounded-[2px] bg-surface-container-high border border-outline-variant/30" />
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[#0e4429] border border-[#006e23]/50" />
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[#006d32] border border-[#238636]/60" />
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[#26a641] border border-[#7bdb80]/80" />
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[#39d353] border border-[#97f999]" />
                <span className="text-[11px]">More</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Languages Distribution Bar */}
        <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/30">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="font-label-sm text-label-sm text-on-surface font-semibold font-mono flex items-center gap-1.5">
              <span className="material-symbols-outlined text-tertiary text-[16px]">
                data_object
              </span>
              Top Languages Across Repositories
            </span>
            <span className="font-label-sm text-[11px] text-outline font-mono">
              Git Head Provenance
            </span>
          </div>

          {/* Segmented Bar */}
          <div className="w-full h-3 rounded-full overflow-hidden flex bg-surface-container-lowest border border-outline-variant/40 shadow-inner">
            {github.languages.map((lang, index) => (
              <motion.div
                key={lang.name}
                initial={
                  shouldReduceMotion
                    ? { width: `${lang.percentage}%` }
                    : { width: 0 }
                }
                whileInView={{ width: `${lang.percentage}%` }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: shouldReduceMotion ? 0 : index * 0.1,
                  ease: "easeOut",
                }}
                className="h-full relative group"
                style={{ backgroundColor: lang.color }}
                title={`${lang.name} ${lang.percentage.toFixed(1)}%`}
              />
            ))}
          </div>

          {/* Legend Badges */}
          <div className="flex items-center gap-space-md flex-wrap font-label-sm text-label-sm font-mono pt-1">
            {github.languages.map((lang) => (
              <span
                key={lang.name}
                className="flex items-center gap-1.5 text-on-surface hover:text-primary transition-colors cursor-default"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: lang.color }}
                />
                <span>
                  {lang.name}{" "}
                  <span className="text-on-surface-variant">
                    {lang.percentage.toFixed(1)}%
                  </span>
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Pinned Repositories Row (Flexible for 0, 1, 2, or 3+ cards) */}
        <div className="flex flex-col gap-3 pt-3 border-t border-outline-variant/30">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="font-label-sm text-label-sm text-on-surface font-semibold font-mono flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-[16px]">
                push_pin
              </span>
              Pinned Open-Source Repositories
            </span>
            <a
              href={`${profileUrl}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-label-sm text-[12px] text-tertiary hover:underline font-mono flex items-center gap-1"
            >
              <span>View all repositories</span>
              <span className="material-symbols-outlined text-[13px]">
                arrow_outward
              </span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
            {github.pinnedRepos.length > 0 ? (
              github.pinnedRepos.map((repo, idx) => (
                <motion.div
                  key={repo.name}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.35,
                    delay: shouldReduceMotion ? 0 : idx * 0.1,
                    ease: "easeOut",
                  }}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { y: -4, transition: { duration: 0.2 } }
                  }
                  className="p-4 rounded-lg bg-surface-container border border-outline-variant shadow-sm flex flex-col justify-between gap-3 hover:border-primary hover:shadow-md transition-all group"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-headline-sm text-[14px] text-tertiary font-mono font-semibold group-hover:underline truncate flex items-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-[16px] text-outline group-hover:text-tertiary transition-colors">
                          book
                        </span>
                        <span className="truncate">{repo.name}</span>
                      </a>
                      <span className="px-1.5 py-0.5 rounded-full border border-outline-variant text-outline text-[10px] font-mono shrink-0">
                        Public
                      </span>
                    </div>

                    <p className="font-body-sm text-[12px] text-on-surface-variant leading-relaxed line-clamp-3">
                      {repo.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-outline-variant/30 text-[11px] font-mono text-outline">
                    <span className="flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: repo.languageColor }}
                      />
                      <span className="text-on-surface">{repo.language}</span>
                    </span>

                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-0.5 hover:text-tertiary transition-colors">
                        <span className="material-symbols-outlined text-[13px] text-tertiary">
                          star
                        </span>
                        {repo.stars}
                      </span>
                      <span className="flex items-center gap-0.5 hover:text-on-surface transition-colors">
                        <span className="material-symbols-outlined text-[13px]">
                          fork_right
                        </span>
                        {repo.forks}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full p-4 rounded-lg bg-surface-container border border-outline-variant text-center font-mono text-[12px] text-on-surface-variant">
                No pinned repositories displayed.{" "}
                <a
                  href={`${profileUrl}?tab=repositories`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  View all public repositories on GitHub →
                </a>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Floating Interactive Hover Tooltip */}
      {hoveredDay && (
        <div
          style={{
            position: "fixed",
            left: `${hoveredDay.x}px`,
            top: `${hoveredDay.y}px`,
            transform: "translate(-50%, -100%)",
            pointerEvents: "none",
            zIndex: 100,
          }}
          className="px-2.5 py-1.5 rounded-md bg-surface-container-highest border border-outline-variant shadow-xl text-on-surface font-mono text-[11px] whitespace-nowrap flex flex-col items-center gap-0.5"
        >
          <span className="font-semibold text-primary">
            {hoveredDay.day.count === 0
              ? `No contributions on ${formatDate(hoveredDay.day.date)}`
              : `${hoveredDay.day.count} ${
                  hoveredDay.day.count === 1 ? "contribution" : "contributions"
                } on ${formatDate(hoveredDay.day.date)}`}
          </span>
        </div>
      )}
    </section>
  );
}
