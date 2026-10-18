"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { SiGithub, SiX, SiInstagram } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";

export default function Footer() {
  const { footer, contact } = portfolioData;
  const shouldReduceMotion = useReducedMotion();
  const currentYear = footer.copyrightYear;

  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant mt-space-xl">
      {/* Upper Footer: Navigation, Bio Summary & Socials */}
      <div className="max-w-[1280px] mx-auto px-gutter-mobile sm:px-gutter py-space-lg flex flex-col md:flex-row items-start justify-between gap-space-lg">
        {/* Brand & Mission */}
        <div className="flex flex-col gap-2 max-w-sm">
          <div className="flex items-center gap-2">
            <span className="font-headline-sm text-headline-sm text-primary font-mono font-bold">
              alexmorgan<span className="text-tertiary">.dev</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-surface-container border border-outline-variant text-[11px] font-mono text-primary">
              {footer.version}
            </span>
          </div>
          <p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
            Full Stack Software Developer specializing in Java, Spring Boot,
            distributed microservices, and modern reactive React/TypeScript
            frontends.
          </p>
          <span className="font-mono text-[12px] text-tertiary">
            {footer.builtWith}
          </span>
        </div>

        {/* Quick Links Column */}
        <div className="flex flex-col gap-2">
          <span className="font-label-sm text-label-sm text-on-surface font-semibold font-mono uppercase tracking-wider">
            Repository Index
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-1.5 font-label-sm text-[12px] font-mono">
            {footer.quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-on-surface-variant hover:text-primary transition-colors py-1 flex items-center gap-1"
              >
                <span className="text-outline text-[10px]">#</span>
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Social Icons with Hover Bounce */}
        <div className="flex flex-col gap-2">
          <span className="font-label-sm text-label-sm text-on-surface font-semibold font-mono uppercase tracking-wider">
            Social Provenance
          </span>
          <div className="flex items-center gap-2">
            <motion.a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.1 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
              className="w-10 h-10 rounded-md bg-surface-container border border-outline-variant flex items-center justify-center text-on-surface hover:text-primary hover:border-primary transition-colors shadow-sm"
            >
              <SiGithub className="w-4 h-4" />
            </motion.a>

            <motion.a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.1 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
              className="w-10 h-10 rounded-md bg-surface-container border border-outline-variant flex items-center justify-center text-on-surface hover:text-tertiary hover:border-tertiary transition-colors shadow-sm"
            >
              <FaLinkedin className="w-4 h-4" />
            </motion.a>

            <motion.a
              href={contact.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter Profile"
              whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.1 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
              className="w-10 h-10 rounded-md bg-surface-container border border-outline-variant flex items-center justify-center text-on-surface hover:text-on-surface hover:border-outline transition-colors shadow-sm"
            >
              <SiX className="w-3.5 h-3.5" />
            </motion.a>

            <motion.a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.1 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
              className="w-10 h-10 rounded-md bg-surface-container border border-outline-variant flex items-center justify-center text-on-surface hover:text-[#e4405f] hover:border-[#e4405f] transition-colors shadow-sm"
            >
              <SiInstagram className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Terminal Provenance Status Bar (Exact Bottom) */}
      <div className="border-t border-outline-variant/60 bg-surface-container-low">
        <div className="max-w-[1280px] mx-auto px-gutter-mobile sm:px-gutter py-2.5 flex items-center justify-between font-mono text-[11px] text-on-surface-variant flex-wrap gap-2">
          {/* Git Branch & Commit Stats */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 text-on-surface">
              <span className="material-symbols-outlined text-[15px] text-tertiary">
                account_tree
              </span>
              <span>{footer.branch}</span>
              <span className="text-outline">@</span>
              <span className="text-tertiary hover:underline cursor-pointer">
                {footer.commitHash}
              </span>
            </div>
            <span className="text-outline-variant hidden sm:inline">|</span>
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">
                history
              </span>
              <span>{footer.commitCount}</span>
            </div>
            <span className="text-outline-variant hidden sm:inline">|</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-on-surface">{footer.systemStatus}</span>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-2 text-outline">
            <span>© {currentYear} {portfolioData.personal.name}. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
