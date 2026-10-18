"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [isBranchMenuOpen, setIsBranchMenuOpen] = useState(false);
  const [currentBranch, setCurrentBranch] = useState("main");
  const [isDark, setIsDark] = useState(true);

  const branches = ["main", "feature/launch-2025", "feat/virtual-threads", "release/v2.4.0"];

  // Prevent body scroll when mobile drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  // Keyboard shortcut '/' to focus search & Esc to close menus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        const searchInput = document.getElementById("nav-search-input");
        searchInput?.focus();
      } else if (e.key === "Escape") {
        setIsDrawerOpen(false);
        setIsBranchMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = portfolioData.navigation.map((item) => item.id);
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark");
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-low/95 backdrop-blur-md border-b border-outline-variant transition-colors">
        <div className="h-16 max-w-[1440px] mx-auto px-gutter flex items-center justify-between gap-space-sm sm:gap-space-md">
          {/* Left Brand & Git Branch Chip */}
          <div className="flex items-center gap-space-sm sm:gap-space-md shrink-0">
            <Link
              href="#home"
              className="flex items-center gap-2 group transition-opacity hover:opacity-90"
            >
              <div className="w-8 h-8 rounded bg-surface-container-high border border-outline-variant flex items-center justify-center text-primary group-hover:border-primary transition-colors">
                <span className="font-mono font-bold text-sm tracking-tighter">
                  &gt;_
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-[17px] text-on-surface font-semibold tracking-tight hidden sm:inline-block font-mono">
                  alexmorgan<span className="text-primary">.dev</span>
                </span>
                <span className="text-[12px] text-tertiary font-mono sm:hidden flex items-center gap-0.5">
                  <span>alexmorgan</span>
                  <span className="text-primary">.dev</span>
                </span>
              </div>
            </Link>

            {/* Branch Switcher Pill */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsBranchMenuOpen(!isBranchMenuOpen)}
                className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded bg-surface-container border border-outline-variant font-label-sm text-label-sm text-tertiary select-none cursor-pointer hover:border-outline hover:text-primary transition-all font-mono"
                title="Switch branch"
              >
                <span className="material-symbols-outlined text-[15px]">
                  fork_right
                </span>
                <span>{currentBranch}</span>
                <span className="text-on-surface-variant text-[10px]">▾</span>
              </button>

              {/* Branch Dropdown */}
              {isBranchMenuOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-56 rounded-md bg-surface-container-low border border-outline-variant shadow-2xl py-1.5 z-50 font-mono text-label-sm animate-in fade-in-50 zoom-in-95">
                  <div className="px-3 py-1 text-[10px] text-outline uppercase tracking-wider border-b border-outline-variant/50">
                    Switch Active Git Branch
                  </div>
                  {branches.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => {
                        setCurrentBranch(b);
                        setIsBranchMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-surface-container transition-colors ${
                        currentBranch === b
                          ? "text-primary bg-surface-container/60 font-semibold"
                          : "text-on-surface-variant hover:text-on-surface"
                      }`}
                    >
                      <span className="truncate">{b}</span>
                      {currentBranch === b && (
                        <span className="text-primary text-[12px]">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center Navigation Links (Desktop: visible on lg+) */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 font-mono text-[12px] xl:text-label-md">
            {portfolioData.navigation.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveSection(item.id)}
                  className={`px-2 xl:px-2.5 py-1.5 rounded transition-all duration-150 ${
                    isActive
                      ? "bg-surface-container-highest text-primary border border-outline-variant shadow-sm font-semibold"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-1.5 sm:gap-space-sm shrink-0">
            {/* Search Bar Input (Desktop) */}
            <div className="hidden xl:flex items-center gap-2 px-space-sm py-1 bg-surface-container-lowest border border-outline-variant rounded text-on-surface-variant text-label-sm font-label-sm focus-within:border-tertiary focus-within:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-[16px]">search</span>
              <input
                id="nav-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type to search..."
                className="bg-transparent border-none outline-none text-on-surface placeholder:text-outline w-28 2xl:w-36 font-code-inline text-code-inline font-mono"
              />
              <kbd className="px-1.5 py-0.5 rounded bg-surface-container border border-outline-variant text-[10px] text-on-surface-variant font-label-sm font-mono">
                /
              </kbd>
            </div>

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle color mode"
              className="p-1.5 rounded bg-surface-container border border-outline-variant text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isDark ? "dark_mode" : "light_mode"}
              </span>
            </button>

            {/* Download Resume Button (Desktop) */}
            <a
              href="#resume"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-primary-container hover:bg-[#2ea043] border border-white/10 text-on-primary-container font-label-md text-label-md tracking-tight active:scale-[0.98] transition-all font-mono shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">commit</span>
              <span>Download Resume</span>
            </a>

            {/* Profile Avatar with Status Pulse */}
            <div className="relative flex items-center justify-center pl-0.5">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-outline-variant ring-1 ring-outline-variant/40">
                <Image
                  src={portfolioData.personal.avatarUrl}
                  alt={portfolioData.personal.name}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-surface-container-low animate-pulse"
                title="Open to work / Online"
              />
            </div>

            {/* Mobile/Tablet Drawer Hamburger Button (Visible below lg) */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open navigation menu"
              className="lg:hidden p-1.5 rounded bg-surface-container border border-outline-variant text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sliding Drawer Navigation */}
      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-300 lg:hidden ${
          isDrawerOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Fullscreen Backdrop overlay */}
        <div
          onClick={() => setIsDrawerOpen(false)}
          className="fixed inset-0 bg-surface-container-lowest/80 backdrop-blur-sm transition-opacity"
        />

        {/* Fullscreen height Aside Panel */}
        <aside
          className={`fixed top-0 right-0 h-screen h-[100dvh] w-[85%] max-w-[340px] bg-surface-container-low border-l border-outline-variant shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out z-10 ${
            isDrawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full overflow-y-auto px-gutter-mobile py-space-md">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-space-md border-b border-outline-variant">
              <div className="flex items-center gap-space-xs font-mono">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  terminal
                </span>
                <span className="font-label-md text-label-md text-on-surface tracking-wider uppercase">
                  git log --graph
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                aria-label="Close navigation"
                className="w-9 h-9 flex items-center justify-center rounded bg-surface-container border border-outline-variant text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-1 py-space-sm font-label-md text-label-md font-mono">
              {portfolioData.navigation.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsDrawerOpen(false);
                    }}
                    className={`flex items-center gap-space-sm px-3 py-2.5 rounded transition-colors ${
                      isActive
                        ? "bg-surface-container-highest text-primary border border-outline-variant font-semibold"
                        : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px] text-primary">
                      {item.icon || "commit"}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-space-md mt-auto flex flex-col gap-space-sm border-t border-outline-variant">
              <a
                href="#resume"
                onClick={() => setIsDrawerOpen(false)}
                className="w-full h-11 px-space-md rounded bg-primary-container text-on-primary-container font-label-md text-label-md font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all font-mono shadow-md hover:bg-[#2ea043]"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>git clone resume.pdf</span>
              </a>

              <div className="p-space-sm rounded bg-surface-container border border-outline-variant flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span>status: cleanly merged</span>
                </div>
                <span className="text-tertiary">
                  {portfolioData.personal.status.version}
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
