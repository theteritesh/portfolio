"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { portfolioData, SkillCategory } from "@/data/portfolio";
import {
  SiOpenjdk,
  SiSpringboot,
  SiHibernate,
  SiApachekafka,
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiVite,
  SiRedux,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiDocker,
  SiGithubactions,
  SiLinux,
  SiKubernetes,
  SiNginx,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { TbCode } from "react-icons/tb";

const renderSkillIcon = (key: string) => {
  switch (key) {
    case "SiOpenjdk":
      return <SiOpenjdk className="w-3.5 h-3.5 text-[#b07219] shrink-0" />;
    case "SiSpringboot":
      return <SiSpringboot className="w-3.5 h-3.5 text-[#6db33f] shrink-0" />;
    case "SiHibernate":
      return <SiHibernate className="w-3.5 h-3.5 text-[#59666c] shrink-0" />;
    case "SiApachekafka":
      return <SiApachekafka className="w-3.5 h-3.5 text-primary shrink-0" />;
    case "SiReact":
      return <SiReact className="w-3.5 h-3.5 text-[#61dafb] shrink-0" />;
    case "SiTypescript":
      return <SiTypescript className="w-3.5 h-3.5 text-[#3178c6] shrink-0" />;
    case "SiNextdotjs":
      return <SiNextdotjs className="w-3.5 h-3.5 text-on-surface shrink-0" />;
    case "SiTailwindcss":
      return <SiTailwindcss className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />;
    case "SiVite":
      return <SiVite className="w-3.5 h-3.5 text-[#646cff] shrink-0" />;
    case "SiRedux":
      return <SiRedux className="w-3.5 h-3.5 text-[#764abc] shrink-0" />;
    case "SiPostgresql":
      return <SiPostgresql className="w-3.5 h-3.5 text-[#336791] shrink-0" />;
    case "SiMysql":
      return <SiMysql className="w-3.5 h-3.5 text-[#00758f] shrink-0" />;
    case "SiRedis":
      return <SiRedis className="w-3.5 h-3.5 text-[#dc382d] shrink-0" />;
    case "SiDocker":
      return <SiDocker className="w-3.5 h-3.5 text-[#2496ed] shrink-0" />;
    case "FaAws":
      return <FaAws className="w-3.5 h-3.5 text-[#ff9900] shrink-0" />;
    case "SiGithubactions":
      return <SiGithubactions className="w-3.5 h-3.5 text-[#2088ff] shrink-0" />;
    case "SiLinux":
      return <SiLinux className="w-3.5 h-3.5 text-[#fcc624] shrink-0" />;
    case "SiKubernetes":
      return <SiKubernetes className="w-3.5 h-3.5 text-[#326ce5] shrink-0" />;
    case "SiNginx":
      return <SiNginx className="w-3.5 h-3.5 text-[#009639] shrink-0" />;
    default:
      return <TbCode className="w-3.5 h-3.5 text-primary shrink-0" />;
  }
};

const getCategoryColor = (id: string) => {
  switch (id) {
    case "backend":
      return {
        text: "text-primary",
        border: "border-primary/40",
        bar: "bg-primary",
        icon: "dns",
      };
    case "frontend":
      return {
        text: "text-tertiary",
        border: "border-tertiary/40",
        bar: "bg-tertiary",
        icon: "devices",
      };
    case "database":
      return {
        text: "text-secondary",
        border: "border-secondary/40",
        bar: "bg-secondary",
        icon: "database",
      };
    case "devops":
      return {
        text: "text-primary-fixed",
        border: "border-primary-fixed/40",
        bar: "bg-primary-fixed",
        icon: "deployed_code",
      };
    default:
      return {
        text: "text-primary",
        border: "border-primary/40",
        bar: "bg-primary",
        icon: "folder",
      };
  }
};

export default function Skills() {
  const { skills } = portfolioData;
  const shouldReduceMotion = useReducedMotion();
  const [activeFolder, setActiveFolder] = useState<string>("all");

  const filteredCategories =
    activeFolder === "all"
      ? skills
      : skills.filter((cat) => cat.id === activeFolder);

  return (
    <section
      id="skills"
      className="relative w-full max-w-[1280px] mx-auto px-gutter-mobile sm:px-gutter py-space-lg sm:py-space-xl"
    >
      {/* Section Header */}
      <div className="flex flex-col gap-2 mb-space-md sm:mb-space-lg">
        <div className="flex items-center gap-2">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-mono">
            TREE_VIEW /src/core/capabilities
          </span>
          <span className="px-2 py-0.5 rounded bg-surface-container border border-outline-variant text-tertiary font-mono text-[11px]">
            4 Packages
          </span>
        </div>
        <h2 className="font-headline-lg text-[24px] sm:text-[30px] lg:text-headline-lg text-on-surface font-mono font-bold">
          Technical Skills &amp; Stack Hierarchy
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
          Production-tested toolchain organized by architectural domain. Hover chips
          to inspect stack components and competence levels.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-gutter">
        {/* Left Column: Workspace Explorer Sidebar (Desktop) */}
        <div className="col-span-12 lg:col-span-4 p-space-md rounded-lg bg-surface-container-low border border-outline-variant shadow-md flex flex-col gap-space-sm h-fit">
          <div className="flex items-center justify-between pb-2 border-b border-outline-variant">
            <span className="font-label-sm text-label-sm text-on-surface uppercase font-bold tracking-wider flex items-center gap-1.5 font-mono">
              <span className="material-symbols-outlined text-[16px] text-tertiary">
                folder_open
              </span>
              WORKSPACE EXPLORER
            </span>
            <button
              type="button"
              onClick={() => setActiveFolder("all")}
              title="Reset folder filter"
              className="text-outline hover:text-on-surface transition-colors flex items-center text-[12px] font-mono gap-1"
            >
              <span className="material-symbols-outlined text-[15px]">sync</span>
              <span>All</span>
            </button>
          </div>

          {/* Folder Tree Nodes */}
          <div className="flex flex-col gap-1.5 font-label-md text-label-md text-on-surface-variant font-mono">
            {skills.map((cat) => {
              const isSelected = activeFolder === cat.id;
              const colorInfo = getCategoryColor(cat.id);
              return (
                <div key={cat.id} className="flex flex-col">
                  {/* Folder Line */}
                  <button
                    type="button"
                    onClick={() =>
                      setActiveFolder(activeFolder === cat.id ? "all" : cat.id)
                    }
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded transition-all text-left ${
                      isSelected
                        ? "bg-surface-container border border-outline-variant " +
                          colorInfo.text
                        : "hover:bg-surface-container hover:text-on-surface"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {isSelected ? "folder_open" : "folder"}
                    </span>
                    <span className="font-semibold">{cat.folderName}</span>
                    <span className="ml-auto font-label-sm text-[11px] text-outline">
                      {cat.fileCount} files
                    </span>
                  </button>

                  {/* Child file previews */}
                  <div className="pl-6 pt-1 pb-1 flex flex-col gap-0.5 text-on-surface-variant text-[12px] border-l border-outline-variant/50 ml-4">
                    {cat.files.map((file) => (
                      <span
                        key={file}
                        className="hover:text-primary transition-colors cursor-default py-0.5 truncate"
                      >
                        • {file}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Tech Cards & Progress Bars */}
        <div className="col-span-12 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-space-md">
          {filteredCategories.map((category, index) => {
            const colorInfo = getCategoryColor(category.id);
            return (
              <motion.div
                key={category.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{
                  duration: 0.4,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                  ease: "easeOut",
                }}
                className="p-4 sm:p-space-md rounded-lg bg-surface-container border border-outline-variant shadow-md flex flex-col justify-between group hover:border-outline hover:bg-surface-container-high transition-all"
              >
                {/* Card Header & Description */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`font-headline-sm text-[17px] font-semibold flex items-center gap-1.5 font-mono ${colorInfo.text}`}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {colorInfo.icon}
                      </span>
                      {category.title}
                    </span>
                    <span className="font-label-sm text-[11px] text-outline font-mono px-1.5 py-0.5 rounded bg-surface-container-lowest border border-outline-variant">
                      {category.badge}
                    </span>
                  </div>
                  <p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
                    {category.description}
                  </p>
                </div>

                {/* Progress Bars & Skill Chips with react-icons */}
                <div className="flex flex-col gap-3 pt-4 border-t border-outline-variant/40 mt-3">
                  {/* Competency percentage bars */}
                  <div className="flex flex-col gap-2">
                    {category.competencies.map((comp) => (
                      <div key={comp.name} className="flex flex-col gap-1 font-mono">
                        <div className="flex justify-between text-[12px] text-on-surface">
                          <span>{comp.name}</span>
                          <span className={`font-semibold ${colorInfo.text}`}>
                            {comp.level}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-surface-container-lowest rounded-full overflow-hidden border border-outline-variant/30">
                          <motion.div
                            initial={
                              shouldReduceMotion
                                ? { width: `${comp.level}%` }
                                : { width: 0 }
                            }
                            whileInView={{ width: `${comp.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={`h-full rounded-full ${colorInfo.bar}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Skill Chips with React Icons (Staggered Animation) */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {category.chips.map((chip, chipIndex) => (
                      <motion.div
                        key={chip.name}
                        initial={
                          shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }
                        }
                        whileInView={
                          shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }
                        }
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.25,
                          delay: shouldReduceMotion ? 0 : chipIndex * 0.05,
                        }}
                        whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container-lowest border border-outline-variant text-on-surface hover:text-primary hover:border-primary font-mono text-[11px] sm:text-[12px] shadow-sm transition-all cursor-default select-none"
                      >
                        {renderSkillIcon(chip.iconKey)}
                        <span>{chip.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
