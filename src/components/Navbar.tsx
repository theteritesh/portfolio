"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { portfolioData } from "@/data/portfolio";

const emptySubscribe = () => () => {};

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [isBranchMenuOpen, setIsBranchMenuOpen] = useState(false);
  const [currentBranch, setCurrentBranch] = useState("main");
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(emptySubscribe, () => true, () => false);

  const isCurrentDark = mounted ? resolvedTheme === "dark" : true;

  const toggleTheme = () => {
    setTheme(isCurrentDark ? "light" : "dark");
  };

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
        setIsDrawerOpen(true);
        setTimeout(() => {
          const searchInput = document.getElementById("drawer-search-input");
          searchInput?.focus();
        }, 100);
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

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-low/95 backdrop-blur-md border-b border-outline-variant transition-colors">
        <div className="h-16 max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-4 w-full">
          {/* Left Brand & Git Branch Chip */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              href="#home"
              className="flex items-center gap-2 group transition-opacity hover:opacity-90 shrink-0"
            >
              <div className="w-8 h-8 rounded bg-surface-container-high border border-outline-variant flex items-center justify-center text-primary group-hover:border-primary transition-colors shrink-0">
                <span className="font-mono font-bold text-sm tracking-tighter">
                  &gt;_
                </span>
              </div>
              <div className="flex flex-col shrink-0">
                <span className="font-headline-sm text-[16px] text-on-surface font-semibold tracking-tight hidden sm:inline-block font-mono whitespace-nowrap">
                  {portfolioData.personal.domain.split(".")[0]}
                  <span className="text-primary">
                    .{portfolioData.personal.domain.split(".")[1] || "dev"}
                  </span>
                </span>
                <span className="text-[12px] text-tertiary font-mono sm:hidden flex items-center gap-0.5 whitespace-nowrap">
                  <span>{portfolioData.personal.domain.split(".")[0]}</span>
                  <span className="text-primary">
                    .{portfolioData.personal.domain.split(".")[1] || "dev"}
                  </span>
                </span>
              </div>
            </Link>

            {/* Branch Switcher Pill (Visible on 2xl+ where room permits) */}
            <div className="relative hidden 2xl:block shrink-0">
              <button
                type="button"
                onClick={() => setIsBranchMenuOpen(!isBranchMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container border border-outline-variant font-label-sm text-[12px] text-tertiary select-none cursor-pointer hover:border-outline hover:text-primary transition-all font-mono max-w-[135px] 2xl:max-w-[150px]"
                title={`Active Git Branch: ${currentBranch} (Click to switch)`}
              >
                <span className="material-symbols-outlined text-[15px] shrink-0">
                  fork_right
                </span>
                <span className="truncate max-w-[75px] 2xl:max-w-[90px]">{currentBranch}</span>
                <span className="text-on-surface-variant text-[10px] shrink-0">▾</span>
              </button>

              {/* Branch Dropdown */}
              {isBranchMenuOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-60 rounded-md bg-surface-container-low border border-outline-variant shadow-2xl py-1.5 z-50 font-mono text-label-sm animate-in fade-in-50 zoom-in-95">
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
                        <span className="text-primary text-[12px] shrink-0 ml-2">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center Navigation Links (Visible on xl and above: 1280px+) */}
          <nav className="hidden xl:flex items-center justify-center flex-1 min-w-0 mx-2 2xl:mx-4 gap-0.5 2xl:gap-1.5 font-mono text-[12px] 2xl:text-[13px]">
            {portfolioData.navigation.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveSection(item.id)}
                  className={`px-1.5 2xl:px-2 py-1 rounded whitespace-nowrap transition-all duration-150 ${
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
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isCurrentDark ? "Switch to light mode" : "Switch to dark mode"}
              className="w-8 h-8 rounded bg-surface-container border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors overflow-hidden shrink-0"
            >
              <span
                className={`material-symbols-outlined text-[17px] transition-transform duration-300 ${
                  isCurrentDark ? "rotate-0 text-tertiary" : "rotate-90 text-amber-500"
                }`}
              >
                {isCurrentDark ? "dark_mode" : "light_mode"}
              </span>
            </button>

            {/* Download Resume Button (Adaptive: icon-only below 2xl, text+icon at 2xl+) */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Resume"
              title="Download Resume"
              className="shrink-0 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded bg-primary-container hover:bg-[#2ea043] border border-white/10 text-on-primary-container text-[12px] font-semibold tracking-tight active:scale-[0.98] transition-all font-mono shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span className="hidden 2xl:inline whitespace-nowrap">Resume</span>
            </a>

            {/* Profile Avatar with Status Pulse (Desktop) */}
            <div className="relative hidden sm:flex items-center justify-center shrink-0">
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

            {/* Mobile/Tablet Drawer Hamburger Button (Visible below xl: < 1280px) */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open navigation menu"
              className="xl:hidden p-1.5 rounded bg-surface-container border border-outline-variant text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors shrink-0"
            >
              <span className="material-symbols-outlined text-[20px]">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sliding Drawer Navigation (Triggered below xl) */}
      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-300 xl:hidden overflow-hidden ${
          isDrawerOpen
            ? "opacity-100 pointer-events-auto visible"
            : "opacity-0 pointer-events-none invisible"
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
            <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant">
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

            {/* Drawer Search Box */}
            <div className="flex items-center gap-2 px-3 py-2 bg-surface-container border border-outline-variant rounded text-on-surface-variant text-[13px] font-mono focus-within:border-tertiary focus-within:text-on-surface my-3 shrink-0">
              <span className="material-symbols-outlined text-[17px]">search</span>
              <input
                id="drawer-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search portfolio..."
                className="bg-transparent border-none outline-none text-on-surface placeholder:text-outline w-full text-[13px] font-mono"
              />
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-1 py-1 font-label-md text-label-md font-mono flex-1 overflow-y-auto">
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
                    className={`flex items-center gap-space-sm px-3 py-2.5 rounded whitespace-nowrap transition-colors ${
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
            <div className="pt-space-md mt-auto flex flex-col gap-space-sm border-t border-outline-variant shrink-0">
              {/* Theme Toggle in Drawer */}
              <div className="flex items-center justify-between p-2 rounded bg-surface-container border border-outline-variant font-mono text-[12px]">
                <span className="text-on-surface">Color Theme</span>
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label={isCurrentDark ? "Switch to light mode" : "Switch to dark mode"}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container-high border border-outline-variant text-on-surface"
                >
                  <span
                    className={`material-symbols-outlined text-[16px] transition-transform duration-300 ${
                      isCurrentDark ? "rotate-0 text-tertiary" : "rotate-90 text-amber-500"
                    }`}
                  >
                    {isCurrentDark ? "dark_mode" : "light_mode"}
                  </span>
                  <span className="text-[11px] font-semibold">
                    {isCurrentDark ? "Dark" : "Light"}
                  </span>
                </button>
              </div>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsDrawerOpen(false)}
                className="w-full h-11 px-space-md rounded bg-primary-container text-on-primary-container font-label-md text-label-md font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all font-mono shadow-md hover:bg-[#2ea043]"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>Download Resume (/resume.pdf)</span>
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
