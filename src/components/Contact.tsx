"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { portfolioData } from "@/data/portfolio";
import { SiGithub, SiX, SiInstagram, SiWhatsapp } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";

interface FormData {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  honeypot: string; // Anti-spam hidden field
}

interface FormErrors {
  from_name?: string;
  from_email?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const { contact } = portfolioData;
  const shouldReduceMotion = useReducedMotion();

  const [formData, setFormData] = useState<FormData>({
    from_name: "",
    from_email: "",
    subject: "",
    message: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
    logs?: string[];
  }>({
    type: "idle",
    message: "Ready to push message payload via git protocol.",
  });

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.from_name.trim()) {
      errs.from_name = "Recruiter / Sender name is required.";
    } else if (formData.from_name.trim().length < 2) {
      errs.from_name = "Name must be at least 2 characters.";
    }

    if (!formData.from_email.trim()) {
      errs.from_email = "Return email address is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.from_email.trim())
    ) {
      errs.from_email = "Please enter a valid email address.";
    }

    if (!formData.subject.trim()) {
      errs.subject = "Subject line / topic is required.";
    }

    if (!formData.message.trim()) {
      errs.message = "Message payload cannot be empty.";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Message should be at least 10 characters.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot spam trap check: if filled, abort silently
    if (formData.honeypot) {
      return;
    }

    if (!validate()) {
      setTerminalOutput({
        type: "error",
        message: "fatal: git pre-commit hook rejected empty or invalid fields.",
        logs: ["Check inline validation errors in form buffer."],
      });
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setTerminalOutput({
        type: "error",
        message: "fatal: remote origin unreachable (EmailJS environment keys not configured).",
        logs: [
          "Please verify NEXT_PUBLIC_EMAILJS_SERVICE_ID in .env.local",
          "Ensure NEXT_PUBLIC_EMAILJS_TEMPLATE_ID and PUBLIC_KEY are set.",
        ],
      });
      return;
    }

    setIsSubmitting(true);
    setTerminalOutput({
      type: "loading",
      message: "git push origin contact:ritesh --progress",
      logs: [
        "Compressing objects: 100% (4/4), done.",
        "Writing objects: 100% (4/4), establishing TLS handshake...",
      ],
    });

    try {
      const templateParams = {
        from_name: formData.from_name.trim(),
        from_email: formData.from_email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setTerminalOutput({
        type: "success",
        message: "✔ pushed to origin/main [commit hash 8a4f02]",
        logs: [
          "To github.com/theteritesh/contact-stream.git",
          "* [new branch]      contact-inbox -> origin/main",
          "Transmission status: 200 OK. Ritesh will review and respond within 24 hours.",
        ],
      });

      // Reset form on success
      setFormData({
        from_name: "",
        from_email: "",
        subject: "",
        message: "",
        honeypot: "",
      });
      setErrors({});
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to dispatch email transmission.";
      setTerminalOutput({
        type: "error",
        message: "error: failed to push some refs to remote 'contact:ritesh'",
        logs: [
          `Reason: ${errorMsg}`,
          `Please try again or email directly to ${contact.email}`,
        ],
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full max-w-[1280px] mx-auto px-gutter-mobile sm:px-gutter py-space-lg sm:py-space-xl overflow-hidden"
    >
      {/* Section Header */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col gap-2 mb-space-lg"
      >
        <div className="flex items-center gap-2">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-mono flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">
              alternate_email
            </span>
            REMOTE_DISPATCH • RPC_INVOCATION
          </span>
          <span className="px-2 py-0.5 rounded bg-surface-container border border-outline-variant text-tertiary font-mono text-[11px]">
            Direct Transmission
          </span>
        </div>
        <h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface font-bold font-mono">
          Contact &amp; Proposal Gateway
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl font-mono text-[13px]">
          Initiate direct communication for full-stack engineering opportunities, distributed cloud architectures, or consulting.
        </p>
      </motion.div>

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="rounded-lg bg-surface-container-low border border-outline-variant shadow-2xl overflow-hidden w-full"
      >
        {/* Terminal OS Window Header */}
        <div className="h-11 px-3 sm:px-space-md bg-surface-container-high border-b border-outline-variant flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-error inline-block shrink-0" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-secondary-fixed inline-block shrink-0" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary inline-block shrink-0" />
            <span className="font-label-sm text-label-sm text-on-surface-variant ml-1.5 sm:ml-2 font-mono truncate text-[11px] sm:text-label-sm">
              git push --set-upstream ritesh contact-inbox
            </span>
          </div>
          <div className="flex items-center gap-2 text-outline font-label-sm text-label-sm font-mono shrink-0">
            <span className="material-symbols-outlined text-[16px] text-primary">
              lock
            </span>
            <span className="hidden sm:inline">TLS / SSH: id_ed25519</span>
          </div>
        </div>

        {/* Content Grid: Form (Left) & Metadata + Map (Right) */}
        <div className="grid grid-cols-12 gap-gutter p-4 sm:p-space-lg">
          {/* Left: Terminal Contact Form */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-space-md">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-mono">
                  DISPATCH_STREAM • RPC_INVOCATION
                </span>
              </div>
              <h3 className="font-headline-md text-[20px] sm:text-headline-md text-on-surface font-bold font-mono">
                Dispatch a Message / Propose a Role
              </h3>
              <p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
                Send your opportunity directly to my priority inbox. Responses
                are dispatched within 24 business hours.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-space-sm"
            >
              {/* Anti-spam hidden honeypot field */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              {/* Name Field */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="from_name"
                  className="font-label-sm text-[12px] text-on-surface flex items-center gap-1 font-mono"
                >
                  <span className="text-primary font-bold">ritesh@visitor:~$</span>
                  <span>export RECRUITER_NAME=</span>
                </label>
                <input
                  id="from_name"
                  name="from_name"
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins (CTO / Engineering Lead)"
                  value={formData.from_name}
                  onChange={handleChange}
                  aria-invalid={!!errors.from_name}
                  aria-describedby={errors.from_name ? "name-error" : undefined}
                  className={`w-full min-h-[44px] px-3 py-2.5 rounded bg-surface-container-lowest border text-on-surface font-mono text-[13px] focus:outline-none focus:ring-2 focus:ring-primary shadow-inner transition-colors ${
                    errors.from_name
                      ? "border-error focus:ring-error"
                      : "border-outline-variant focus:border-primary"
                  }`}
                />
                {errors.from_name && (
                  <span
                    id="name-error"
                    role="alert"
                    className="font-mono text-[11px] text-error flex items-center gap-1 pt-0.5"
                  >
                    <span className="material-symbols-outlined text-[13px]">
                      error
                    </span>
                    {errors.from_name}
                  </span>
                )}
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="from_email"
                  className="font-label-sm text-[12px] text-on-surface flex items-center gap-1 font-mono"
                >
                  <span className="text-primary font-bold">ritesh@visitor:~$</span>
                  <span>export RETURN_EMAIL=</span>
                </label>
                <input
                  id="from_email"
                  name="from_email"
                  type="email"
                  required
                  placeholder="e.g. sjenkins@enterprise.com"
                  value={formData.from_email}
                  onChange={handleChange}
                  aria-invalid={!!errors.from_email}
                  aria-describedby={
                    errors.from_email ? "email-error" : undefined
                  }
                  className={`w-full min-h-[44px] px-3 py-2.5 rounded bg-surface-container-lowest border text-on-surface font-mono text-[13px] focus:outline-none focus:ring-2 focus:ring-primary shadow-inner transition-colors ${
                    errors.from_email
                      ? "border-error focus:ring-error"
                      : "border-outline-variant focus:border-primary"
                  }`}
                />
                {errors.from_email && (
                  <span
                    id="email-error"
                    role="alert"
                    className="font-mono text-[11px] text-error flex items-center gap-1 pt-0.5"
                  >
                    <span className="material-symbols-outlined text-[13px]">
                      error
                    </span>
                    {errors.from_email}
                  </span>
                )}
              </div>

              {/* Subject Field */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="subject"
                  className="font-label-sm text-[12px] text-on-surface flex items-center gap-1 font-mono"
                >
                  <span className="text-primary font-bold">ritesh@visitor:~$</span>
                  <span>export TOPIC_SUBJECT=</span>
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="e.g. Full Stack Role • Java / React Architectural Opening"
                  value={formData.subject}
                  onChange={handleChange}
                  aria-invalid={!!errors.subject}
                  aria-describedby={
                    errors.subject ? "subject-error" : undefined
                  }
                  className={`w-full min-h-[44px] px-3 py-2.5 rounded bg-surface-container-lowest border text-on-surface font-mono text-[13px] focus:outline-none focus:ring-2 focus:ring-primary shadow-inner transition-colors ${
                    errors.subject
                      ? "border-error focus:ring-error"
                      : "border-outline-variant focus:border-primary"
                  }`}
                />
                {errors.subject && (
                  <span
                    id="subject-error"
                    role="alert"
                    className="font-mono text-[11px] text-error flex items-center gap-1 pt-0.5"
                  >
                    <span className="material-symbols-outlined text-[13px]">
                      error
                    </span>
                    {errors.subject}
                  </span>
                )}
              </div>

              {/* Message Payload Field */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="message"
                  className="font-label-sm text-[12px] text-on-surface flex items-center gap-1 font-mono"
                >
                  <span className="text-primary font-bold">ritesh@visitor:~$</span>
                  <span>git commit -m &quot;payload&quot;</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Share role specifics, compensation parameters, tech stack requirements, or collaboration scope..."
                  value={formData.message}
                  onChange={handleChange}
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                  className={`w-full px-3 py-2.5 rounded bg-surface-container-lowest border text-on-surface font-mono text-[13px] focus:outline-none focus:ring-2 focus:ring-primary shadow-inner resize-y transition-colors min-h-[100px] ${
                    errors.message
                      ? "border-error focus:ring-error"
                      : "border-outline-variant focus:border-primary"
                  }`}
                />
                {errors.message && (
                  <span
                    id="message-error"
                    role="alert"
                    className="font-mono text-[11px] text-error flex items-center gap-1 pt-0.5"
                  >
                    <span className="material-symbols-outlined text-[13px]">
                      error
                    </span>
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Submit Button ("git push" style) */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-label-md text-label-md font-semibold tracking-wide shadow-md active:scale-98 transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2 cursor-pointer font-mono"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-on-primary-container border-t-transparent rounded-full animate-spin" />
                    <span>Pushing payload...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">
                      send
                    </span>
                    <span>git push origin contact:ritesh</span>
                  </>
                )}
              </button>

              {/* Terminal Feedback Output Area */}
              <div
                className={`mt-2 p-3 rounded font-mono text-[11px] leading-relaxed border flex flex-col gap-1 transition-all ${
                  terminalOutput.type === "success"
                    ? "bg-[#0e4429]/40 border-primary text-primary"
                    : terminalOutput.type === "error"
                    ? "bg-error-container/30 border-error text-error"
                    : terminalOutput.type === "loading"
                    ? "bg-surface-container border-tertiary text-tertiary"
                    : "bg-surface-container-lowest border-outline-variant/60 text-on-surface-variant"
                }`}
              >
                <div className="flex items-center gap-1.5 font-semibold">
                  <span className="text-[13px]">
                    {terminalOutput.type === "success"
                      ? "✔"
                      : terminalOutput.type === "error"
                      ? "✖"
                      : "➜"}
                  </span>
                  <span>{terminalOutput.message}</span>
                </div>
                {terminalOutput.logs && (
                  <div className="pl-4 flex flex-col gap-0.5 opacity-90 text-[10px]">
                    {terminalOutput.logs.map((log, idx) => (
                      <span key={idx}>$ {log}</span>
                    ))}
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Right: Direct Coordinates & Location Map Placeholder */}
          <div className="col-span-12 lg:col-span-5 flex flex-col justify-between gap-space-md border-t lg:border-t-0 lg:border-l border-outline-variant/40 pt-space-md lg:pt-0 lg:pl-gutter">
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-sm text-label-sm text-tertiary uppercase font-mono tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">
                  dns
                </span>
                ENDPOINT METADATA &amp; CHANNELS
              </span>

              <div className="flex flex-col gap-2">
                {/* Email Item */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-container border border-outline-variant hover:border-primary transition-colors">
                  <span className="material-symbols-outlined text-primary text-[22px] shrink-0">
                    alternate_email
                  </span>
                  <div className="flex flex-col truncate">
                    <span className="font-label-sm text-[11px] text-outline font-mono">
                      Primary Email
                    </span>
                    <a
                      href={`mailto:${contact.email}`}
                      className="font-label-md text-[13px] text-on-surface hover:text-primary transition-colors font-mono truncate"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>

                {/* Phone Item */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-container border border-outline-variant hover:border-tertiary transition-colors">
                  <span className="material-symbols-outlined text-tertiary text-[22px] shrink-0">
                    call
                  </span>
                  <div className="flex flex-col truncate">
                    <span className="font-label-sm text-[11px] text-outline font-mono">
                      Direct Line / WhatsApp
                    </span>
                    <a
                      href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                      className="font-label-md text-[13px] text-on-surface hover:text-tertiary transition-colors font-mono truncate"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>

                {/* Location Item */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-container border border-outline-variant">
                  <span className="material-symbols-outlined text-secondary text-[22px] shrink-0">
                    location_on
                  </span>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-[11px] text-outline font-mono">
                      Workstation Base
                    </span>
                    <span className="font-label-md text-[13px] text-on-surface font-mono">
                      {contact.location}
                    </span>
                  </div>
                  <span className="ml-auto px-2 py-0.5 rounded bg-surface-container-high text-tertiary font-mono text-[11px]">
                    {contact.timezone}
                  </span>
                </div>
              </div>

              {/* Social Channels Row */}
              <div className="flex flex-col gap-2 pt-2">
                <span className="font-label-sm text-[11px] text-outline font-mono">
                  Developer Profiles &amp; Social Links
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  <motion.a
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
                    className="min-h-[44px] px-3.5 py-2 rounded-md bg-surface-container border border-outline-variant text-on-surface hover:text-primary hover:border-primary transition-all flex items-center gap-2 font-mono text-[12px] shadow-sm"
                  >
                    <SiGithub className="w-4 h-4 text-primary" />
                    <span>GitHub</span>
                  </motion.a>

                  <motion.a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
                    className="min-h-[44px] px-3.5 py-2 rounded-md bg-surface-container border border-outline-variant text-on-surface hover:text-tertiary hover:border-tertiary transition-all flex items-center gap-2 font-mono text-[12px] shadow-sm"
                  >
                    <FaLinkedin className="w-4 h-4 text-[#0a66c2]" />
                    <span>LinkedIn</span>
                  </motion.a>

                  <motion.a
                    href={contact.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
                    className="min-h-[44px] px-3.5 py-2 rounded-md bg-surface-container border border-outline-variant text-on-surface hover:text-on-surface hover:border-outline transition-all flex items-center gap-2 font-mono text-[12px] shadow-sm"
                  >
                    <SiX className="w-3.5 h-3.5" />
                    <span>Twitter</span>
                  </motion.a>

                  <motion.a
                    href={contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
                    className="min-h-[44px] px-3.5 py-2 rounded-md bg-surface-container border border-outline-variant text-on-surface hover:text-[#e4405f] hover:border-[#e4405f] transition-all flex items-center gap-2 font-mono text-[12px] shadow-sm"
                  >
                    <SiInstagram className="w-4 h-4 text-[#e4405f]" />
                    <span>Instagram</span>
                  </motion.a>

                  {contact.whatsapp && (
                    <motion.a
                      href={contact.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                      whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
                      className="min-h-[44px] px-3.5 py-2 rounded-md bg-surface-container border border-outline-variant text-on-surface hover:text-[#25d366] hover:border-[#25d366] transition-all flex items-center gap-2 font-mono text-[12px] shadow-sm"
                    >
                      <SiWhatsapp className="w-4 h-4 text-[#25d366]" />
                      <span>WhatsApp</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </div>

            {/* Location Map Placeholder Card as in the design */}
            <div className="flex flex-col gap-1.5 pt-2">
              <div className="flex items-center justify-between text-label-sm font-label-sm text-outline font-mono">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-primary">
                    location_on
                  </span>
                  <span>Interactive Map Location</span>
                </span>
                <span className="text-tertiary text-[11px]">18.5204° N, 73.8567° E</span>
              </div>
              <div className="relative w-full h-36 rounded-md overflow-hidden border border-outline-variant shadow-inner group">
                <Image
                  src={contact.mapImage}
                  alt="Pune, India Location"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-surface-container-lowest/30 pointer-events-none" />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-surface-container-high/90 border border-outline-variant text-[10px] font-mono text-primary flex items-center gap-1 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                  <span>Pune, MH, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
