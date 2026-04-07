"use client";

import { motion, useInView, useMotionValueEvent, useScroll } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const DESIGNER_NAME = "Findlay Jameson";

const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const sectionReveal = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, margin: "-60px", amount: 0.2 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const line1Words = ["building websites", "that", "sell"];
const line2Words = ["for businesses", "that", "grow."];

function IconSparkle({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M12 2L13.09 8.26L19 9L13.09 9.74L12 16L10.91 9.74L5 9L10.91 8.26L12 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M19 14L19.5 16.5L22 17L19.5 17.5L19 20L18.5 17.5L16 17L18.5 16.5L19 14Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconClock({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 7V12L15 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconChat({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M8 10H16M8 14H12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M6 18L7.5 15H18C18.5523 15 19 14.5523 19 14V7C19 6.44772 18.5523 6 18 6H6C5.44772 6 5 6.44772 5 7V17C5 17.5523 5.44772 18 6 18Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [scrollHintVisible, setScrollHintVisible] = useState(true);
  const { scrollY } = useScroll();
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroSectionRef, { once: false, amount: 0.38 });

  useMotionValueEvent(scrollY, "change", (y) => {
    setNavScrolled(y > 24);
    setScrollHintVisible(y < 56);
  });

  useEffect(() => {
    setScrollHintVisible(window.scrollY < 56);
  }, []);

  const onFormSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-[background-color,backdrop-filter,box-shadow,border-color] duration-300 ${
          navScrolled
            ? "border-b border-white/5 bg-[#0a0a0a]/75 shadow-lg shadow-black/20 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a
            href="#"
            className="text-base font-semibold tracking-tight text-white sm:text-lg"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            {DESIGNER_NAME}
          </a>
          <motion.button
            type="button"
            onClick={() => scrollToId("contact")}
            className="rounded-full bg-[#7B2FFF] px-4 py-2 text-sm font-semibold text-white shadow-[0_0_24px_rgba(123,47,255,0.45)] transition-shadow hover:shadow-[0_0_32px_rgba(123,47,255,0.6)] sm:px-5"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Get In Touch
          </motion.button>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section
          ref={heroSectionRef}
          className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 pt-16 pb-28 sm:px-6 lg:px-8"
        >
          <div
            className="pointer-events-none absolute top-1/4 left-1/2 h-[min(70vw,420px)] w-[min(90vw,520px)] -translate-x-1/2 rounded-full opacity-40 blur-[100px]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(123, 47, 255, 0.55) 0%, transparent 70%)",
            }}
            aria-hidden
          />

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <motion.div
              className="flex flex-col items-center gap-2 sm:gap-3"
              variants={staggerContainer}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
            >
              <h1 className="text-4xl font-bold leading-[1.25] tracking-tight sm:text-5xl sm:leading-[1.22] md:text-6xl md:leading-[1.2] lg:text-7xl lg:leading-[1.18]">
                <span className="flex flex-wrap justify-center gap-x-3 gap-y-1">
                  {line1Words.map((word) => (
                    <motion.span key={word} variants={staggerItem} className="inline-block text-white">
                      {word}
                    </motion.span>
                  ))}
                </span>
                <span className="mt-1 flex flex-wrap justify-center gap-x-3 gap-y-1 pb-1.5 sm:mt-2 sm:pb-2">
                  {line2Words.map((word) => (
                    <motion.span
                      key={word}
                      variants={staggerItem}
                      className="hero-shifting-gradient inline-block pb-1"
                      style={{ color: "transparent", WebkitTextFillColor: "transparent" }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              </h1>
            </motion.div>

            <motion.p
              className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#888888] sm:text-xl"
              initial={{ opacity: 0, y: 16 }}
              animate={
                heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
              }
              transition={{
                delay: heroInView ? 0.55 : 0,
                duration: 0.5,
              }}
            >
              Freelance web designer helping new brands launch with clarity, speed, and a polished
              presence on the web.
            </motion.p>

            <motion.div
              className="mt-10 flex justify-center"
              initial={{ opacity: 0, y: 16 }}
              animate={
                heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
              }
              transition={{
                delay: heroInView ? 0.7 : 0,
                duration: 0.5,
              }}
            >
              <motion.button
                type="button"
                onClick={() => scrollToId("services")}
                className="rounded-full bg-[#7B2FFF] px-8 py-3.5 text-base font-semibold text-white shadow-[0_0_28px_rgba(123,47,255,0.35)] transition-shadow hover:shadow-[0_0_40px_rgba(123,47,255,0.5)]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                See What I Offer
              </motion.button>
            </motion.div>
          </div>

          <motion.div
            className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-[#888888]"
            initial={false}
            animate={{
              opacity: scrollHintVisible ? 1 : 0,
              y: scrollHintVisible ? 0 : 10,
            }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <motion.div
              animate={
                scrollHintVisible
                  ? { y: [0, 8, 0] }
                  : { y: 0 }
              }
              transition={{
                duration: 1.6,
                repeat: scrollHintVisible ? Infinity : 0,
                ease: "easeInOut",
              }}
              className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 pt-2"
            >
              <motion.div
                className="h-2 w-1 rounded-full bg-[#7B2FFF]"
                animate={
                  scrollHintVisible
                    ? { opacity: [0.4, 1, 0.4] }
                    : { opacity: 0.4 }
                }
                transition={{
                  duration: 1.6,
                  repeat: scrollHintVisible ? Infinity : 0,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        </section>

        {/* Services */}
        <motion.section
          id="services"
          className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
          {...sectionReveal}
        >
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Services
          </h2>
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            <motion.article
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111111] p-8 sm:p-10"
              whileHover={{
                y: -6,
                boxShadow:
                  "0 24px 48px rgba(0,0,0,0.45), 0 0 32px rgba(123,47,255,0.12), 0 0 0 1px rgba(255,255,255,0.08)",
              }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 0%, rgba(123,47,255,0.12), transparent 55%)",
                }}
              />
              <h3 className="relative text-2xl font-bold text-white">Starter Websites</h3>
              <p className="relative mt-4 leading-relaxed text-[#888888]">
                Clean, simple sites for individuals and small businesses—clear structure, strong
                typography, and a layout that gets your message across without fuss.
              </p>
            </motion.article>

            <motion.article
              className="group relative overflow-hidden rounded-2xl border border-[#7B2FFF]/40 bg-[#111111] p-8 shadow-[0_0_40px_rgba(123,47,255,0.12)] sm:p-10"
              whileHover={{
                y: -6,
                boxShadow:
                  "0 24px 48px rgba(0,0,0,0.45), 0 0 48px rgba(123,47,255,0.28), 0 0 0 1px rgba(123,47,255,0.35)",
              }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                  background:
                    "radial-gradient(ellipse at top right, rgba(123,47,255,0.15), transparent 55%)",
                }}
              />
              <h3 className="relative text-2xl font-bold text-white">Advanced Websites</h3>
              <p className="relative mt-4 leading-relaxed text-[#888888]">
                Custom animations, multiple pages, and tailored design—built to feel premium and
                memorable while staying fast and easy to maintain.
              </p>
            </motion.article>
          </div>
        </motion.section>

        {/* Why work with me */}
        <motion.section
          className="border-t border-white/5 bg-[#080808] px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
          {...sectionReveal}
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-14 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Why work with me
            </h2>
            <motion.div
              className="grid gap-10 sm:grid-cols-3 sm:gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-60px", amount: 0.2 }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.12, delayChildren: 0.08 },
                },
              }}
            >
              {[
                {
                  icon: IconSparkle,
                  title: "Detail-Focused",
                  desc: "Pixel-level polish, spacing, and hierarchy so every page feels intentional.",
                },
                {
                  icon: IconClock,
                  title: "Fast Turnaround",
                  desc: "Clear milestones and efficient delivery without sacrificing quality.",
                },
                {
                  icon: IconChat,
                  title: "Direct Communication",
                  desc: "You work with me directly—no layers, no confusion, just straight answers.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <motion.div
                  key={title}
                  variants={{
                    hidden: { opacity: 0, y: 28 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
                    },
                  }}
                  className="text-center sm:text-left"
                >
                  <div className="mb-4 inline-flex rounded-xl bg-[#7B2FFF]/15 p-3 text-[#7B2FFF]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{title}</h3>
                  <p className="mt-2 text-[#888888]">{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Contact */}
        <motion.section
          id="contact"
          className="mx-auto max-w-2xl px-4 py-24 sm:px-6 lg:py-32"
          {...sectionReveal}
        >
          <h2 className="text-center text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="bg-gradient-to-r from-[#7B2FFF] via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Let&apos;s build something great
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-center text-[#888888]">
            Tell me about your project, timeline, and goals. I&apos;ll reply within one business day.
          </p>

          <form
            onSubmit={onFormSubmit}
            className="mt-12 space-y-5 rounded-2xl border border-white/10 bg-[#111111] p-6 sm:p-8"
          >
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-white">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                className="w-full rounded-xl border border-white/10 bg-[#0a0a0a] px-4 py-3 text-white outline-none transition-[border-color,box-shadow] placeholder:text-[#555] focus:border-[#7B2FFF]/50 focus:ring-2 focus:ring-[#7B2FFF]/40"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-white">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="w-full rounded-xl border border-white/10 bg-[#0a0a0a] px-4 py-3 text-white outline-none transition-[border-color,box-shadow] placeholder:text-[#555] focus:border-[#7B2FFF]/50 focus:ring-2 focus:ring-[#7B2FFF]/40"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-white">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full resize-y rounded-xl border border-white/10 bg-[#0a0a0a] px-4 py-3 text-white outline-none transition-[border-color,box-shadow] placeholder:text-[#555] focus:border-[#7B2FFF]/50 focus:ring-2 focus:ring-[#7B2FFF]/40"
                placeholder="What are you looking to create?"
              />
            </div>
            <motion.button
              type="submit"
              className="w-full rounded-xl bg-[#7B2FFF] py-3.5 text-base font-semibold text-white shadow-[0_0_28px_rgba(123,47,255,0.3)]"
              whileHover={{
                scale: 1.01,
                boxShadow: "0 0 40px rgba(123,47,255,0.45)",
              }}
              whileTap={{ scale: 0.99 }}
            >
              Send message
            </motion.button>
          </form>
        </motion.section>

        {/* Footer */}
        <motion.footer
          className="border-t border-white/5 px-4 py-10 sm:px-6 lg:px-8"
          {...sectionReveal}
        >
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row sm:items-center">
            <span className="text-sm font-semibold text-white">{DESIGNER_NAME}</span>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#888888] transition-colors hover:text-white"
                aria-label="GitHub"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#888888] transition-colors hover:text-white"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#888888] transition-colors hover:text-white"
                aria-label="X"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
          <p className="mx-auto mt-8 max-w-6xl text-center text-sm text-[#888888] sm:mt-6 sm:text-left">
            © {new Date().getFullYear()} {DESIGNER_NAME}. All rights reserved.
          </p>
        </motion.footer>
      </main>
    </div>
  );
}
