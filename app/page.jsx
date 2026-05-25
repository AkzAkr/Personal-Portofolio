"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  CodeXml,
  Database,
  ExternalLink,
  Gamepad2,
  Globe,
  LoaderCircle,
  Menu,
  Moon,
  ReceiptText,
  Server,
  Sun,
  X,
} from "lucide-react";
import GameChamber from "./components/GameChamber";
import SpecimenSelect from "./components/SpecimenSelect";
import { projects } from "./lib/projects";
import { robloxGames } from "./lib/robloxGames";

const iconMap = {
  arrow_forward: ArrowRight,
  auto_stories: BookOpen,
  close: X,
  database: Database,
  dns: Server,
  joystick: Gamepad2,
  menu: Menu,
  neurology: BrainCircuit,
  open_in_new: ExternalLink,
  point_of_sale: ReceiptText,
  progress_activity: LoaderCircle,
  web: Globe,
};

const archiveProjectCount = projects.length + robloxGames.length;

function MaterialIcon({ name, className = "", ...props }) {
  if (name === "dark_mode") {
    const { id, ...rest } = props;

    return (
      <span id={id} className={className} {...rest}>
        <Moon className="lucide-icon theme-dark-icon" aria-hidden="true" />
        <Sun className="lucide-icon theme-light-icon" aria-hidden="true" />
      </span>
    );
  }

  const Icon = iconMap[name] || CodeXml;

  return <Icon className={`lucide-icon ${className}`.trim()} {...props} />;
}

export default function PortfolioPage() {
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    const profileImage = new Image();
    const done = () => setProfileLoaded(true);
    const fallbackTimer = window.setTimeout(done, 1600);

    profileImage.onload = done;
    profileImage.onerror = done;
    profileImage.src = "/asset/profile.jpeg";

    if (profileImage.complete) {
      done();
    }

    return () => {
      window.clearTimeout(fallbackTimer);
      profileImage.onload = null;
      profileImage.onerror = null;
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const html = document.documentElement;
    const savedTheme = localStorage.getItem("theme") || "light";

    function applyTheme(theme) {
      html.classList.remove("dark", "light");
      html.classList.add(theme);
      localStorage.setItem("theme", theme);
    }

    applyTheme(savedTheme);

    const themeToggle = document.getElementById("theme-toggle");
    themeToggle?.addEventListener(
      "click",
      () => {
        applyTheme(html.classList.contains("dark") ? "light" : "dark");
      },
      { signal },
    );

    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenuClose = document.getElementById("mobile-menu-close");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileOverlay = document.getElementById("mobile-overlay");
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

    function openMobileMenu() {
      mobileMenu?.classList.add("open");
      mobileOverlay?.classList.remove("hidden");
      mobileMenuBtn?.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }

    function closeMobileMenu() {
      mobileMenu?.classList.remove("open");
      mobileOverlay?.classList.add("hidden");
      mobileMenuBtn?.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }

    mobileMenuBtn?.addEventListener("click", openMobileMenu, { signal });
    mobileMenuClose?.addEventListener("click", closeMobileMenu, { signal });
    mobileOverlay?.addEventListener("click", closeMobileMenu, { signal });
    mobileNavLinks.forEach((link) =>
      link.addEventListener("click", closeMobileMenu, { signal }),
    );

    document.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Escape" && mobileMenu?.classList.contains("open")) {
          closeMobileMenu();
        }
      },
      { signal },
    );

    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");

    navLinks.forEach((link) => {
      link.addEventListener(
        "click",
        (event) => {
          const href = link.getAttribute("href");

          if (href && href.startsWith("#") && href.length > 1) {
            event.preventDefault();
            const target = document.querySelector(href);

            if (target) {
              window.scrollTo({
                top:
                  target.getBoundingClientRect().top + window.pageYOffset - 80,
                behavior: "smooth",
              });
            }
          }
        },
        { signal },
      );
    });

    function updateActiveNav() {
      const scrollPos = window.scrollY + 120;
      let current = "";

      sections.forEach((section) => {
        if (scrollPos >= section.offsetTop) {
          current = section.getAttribute("id") || "";
        }
      });

      navLinks.forEach((link) => {
        const active = link.getAttribute("data-section") === current;
        link.classList.toggle("text-primary", active);
        link.classList.toggle("font-bold", active);
        link.classList.toggle("border-b-2", active);
        link.classList.toggle("border-primary", active);
        link.classList.toggle("text-slate-500", !active);
      });
    }

    window.addEventListener("scroll", updateActiveNav, {
      passive: true,
      signal,
    });
    updateActiveNav();

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    document
      .querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale")
      .forEach((element) => revealObserver.observe(element));

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target;
            const target = parseInt(
              element.getAttribute("data-target") || "0",
              10,
            );
            const step = target / (2000 / 16);
            let current = 0;

            const tick = () => {
              current += step;

              if (current < target) {
                element.textContent = Math.floor(current).toString();
                requestAnimationFrame(tick);
              } else {
                element.textContent = target.toString();
              }
            };

            tick();
            counterObserver.unobserve(element);
          }
        });
      },
      { threshold: 0.5 },
    );

    document.querySelectorAll(".counter").forEach((counter) => {
      counterObserver.observe(counter);
    });

    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const width = entry.target.getAttribute("data-width");
            if (width) {
              entry.target.style.width = width;
            }
            barObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );

    document.querySelectorAll(".stat-bar-fill[data-width]").forEach((bar) => {
      barObserver.observe(bar);
    });

    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");
    const activeClasses = ["text-primary", "border-primary", "font-bold"];
    const inactiveClasses = [
      "text-outline",
      "border-transparent",
      "font-medium",
    ];

    filterBtns.forEach((btn) => {
      btn.addEventListener(
        "click",
        () => {
          const filter = btn.getAttribute("data-filter");

          filterBtns.forEach((button) => {
            button.classList.remove(...activeClasses);
            button.classList.add(...inactiveClasses);
            button.setAttribute("aria-pressed", "false");
          });

          btn.classList.remove(...inactiveClasses);
          btn.classList.add(...activeClasses);
          btn.setAttribute("aria-pressed", "true");

          projectCards.forEach((card) => {
            const visible =
              filter === "all" || card.getAttribute("data-category") === filter;

            if (visible) {
              card.classList.remove("hidden", "filtered-out");
              card.style.display = "";
            } else {
              card.classList.add("filtered-out");
              setTimeout(() => {
                if (card.classList.contains("filtered-out")) {
                  card.classList.add("hidden");
                }
              }, 500);
            }
          });
        },
        { signal },
      );
    });

    const experimentTitles = {
      game: "Game Mechanics Engine",
      server: "React Components Lab",
      neural: "ML / Data Models",
      vector: "Python Scripts",
    };

    function showToast(message, type = "info") {
      const container = document.getElementById("toast-container");
      if (!container) return;

      const toast = document.createElement("div");
      const colors = {
        success: "bg-green-500",
        error: "bg-red-600",
        info: "bg-primary",
      };

      toast.className = `toast ${colors[type] || colors.info} text-white px-6 py-3 shadow-lg text-sm font-medium pointer-events-auto`;
      toast.style.fontFamily = "'Press Start 2P',monospace";
      toast.style.fontSize = "7px";
      toast.style.lineHeight = "2";
      toast.textContent = message;
      container.appendChild(toast);
      requestAnimationFrame(() => toast.classList.add("show"));

      setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 400);
      }, 4000);
    }

    document.querySelectorAll(".experiment-card").forEach((card) => {
      card.addEventListener(
        "click",
        () => {
          const key = card.getAttribute("data-experiment");
          showToast(
            `Opening ${experimentTitles[key] || "Experiment"}... (Demo mode)`,
          );
        },
        { signal },
      );
    });

    const contactForm = document.getElementById("contact-form");
    const emailInput = document.getElementById("email-input");
    const submitBtn = document.getElementById("submit-btn");
    const btnText = document.getElementById("btn-text");
    const btnSpinner = document.getElementById("btn-spinner");

    function isValidEmail(email) {
      const parts = email.split("@");
      return (
        parts.length === 2 &&
        Boolean(parts[0]) &&
        Boolean(parts[1]) &&
        parts[1].includes(".")
      );
    }

    function simulateSubmit() {
      return new Promise((resolve) => setTimeout(resolve, 1500));
    }

    contactForm?.addEventListener(
      "submit",
      async (event) => {
        event.preventDefault();

        const email = emailInput?.value.trim() || "";
        if (!email || !isValidEmail(email)) {
          showToast("Please enter a valid email address", "error");
          emailInput?.focus();
          return;
        }

        if (submitBtn) submitBtn.disabled = true;
        if (btnText) btnText.textContent = "...";
        btnSpinner?.classList.remove("hidden");

        try {
          await simulateSubmit();
          showToast("Message sent! I'll respond within 24h.", "success");
          if (emailInput) emailInput.value = "";
        } catch {
          showToast("Failed to send. Please email directly.", "error");
        } finally {
          if (submitBtn) submitBtn.disabled = false;
          if (btnText) btnText.textContent = "SEND";
          btnSpinner?.classList.add("hidden");
        }
      },
      { signal },
    );

    document.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "/" && document.activeElement?.tagName !== "INPUT") {
          event.preventDefault();
          emailInput?.focus();
        }
      },
      { signal },
    );

    const header = document.querySelector("header");
    function updateHeaderShadow() {
      header?.classList.toggle("shadow-md", window.pageYOffset > 100);
    }

    window.addEventListener("scroll", updateHeaderShadow, {
      passive: true,
      signal,
    });
    updateHeaderShadow();

    return () => {
      controller.abort();
      revealObserver.disconnect();
      counterObserver.disconnect();
      barObserver.disconnect();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold"
      >
        Skip to main content
      </a>

      <div
        className="fixed inset-0 blueprint-grid pointer-events-none z-0"
        aria-hidden="true"
      ></div>
      <div
        className="fixed inset-0 pixel-grid pointer-events-none z-0"
        aria-hidden="true"
      ></div>

      <div
        id="toast-container"
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] pointer-events-none"
      ></div>

      {/* ===================== NAVIGATION ===================== */}
      <header
        className="fixed top-0 w-full z-50 bg-[#fcf9f8]/90 backdrop-blur-xl border-b border-slate-200/10 transition-colors duration-300"
        role="banner"
      >
        <nav
          className="flex justify-between items-center w-full px-6 py-4 max-w-[1440px] mx-auto"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="flex items-center gap-8">
            <a
              href="#hero"
              className="flex items-center gap-3 group"
              aria-label="The Clinical Curator - Home"
            >
              <span className="pixel-text text-[7px] text-primary leading-tight hidden sm:block neon-text">
                ██████
                <br />█ LAB █<br />
                ██████
              </span>
              <span className="brand-font text-xl font-bold tracking-tight text-primary hover:opacity-80 transition-opacity">
                THE EXPERIMENTAL LAB
              </span>
            </a>
            <div className="hidden md:flex gap-6 items-center" id="desktop-nav">
              <a
                className="text-primary font-bold border-b-2 border-primary pb-1 font-body text-sm nav-link"
                href="#hero"
                data-section="hero"
              >
                Home
              </a>
              <a
                className="text-slate-500 font-medium hover:text-primary transition-colors font-body text-sm nav-link"
                href="#projects"
                data-section="projects"
              >
                Specimens
              </a>
              <a
                className="text-slate-500 font-medium hover:text-primary transition-colors font-body text-sm nav-link"
                href="#roblox"
                data-section="roblox"
              >
                Games
              </a>
              <a
                className="text-slate-500 font-medium hover:text-primary transition-colors font-body text-sm nav-link"
                href="#experiments"
                data-section="experiments"
              >
                Experiments
              </a>
              <a
                className="text-slate-500 font-medium hover:text-primary transition-colors font-body text-sm nav-link"
                href="#log"
                data-section="log"
              >
                Lab Log
              </a>
              <a
                className="text-slate-500 font-medium hover:text-primary transition-colors font-body text-sm nav-link"
                href="#about"
                data-section="about"
              >
                About
              </a>
              <a
                className="text-slate-500 font-medium hover:text-primary transition-colors font-body text-sm nav-link"
                href="#contact"
                data-section="contact"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              id="theme-toggle"
              className="p-2 rounded-lg hover:bg-surface-container transition-colors"
              aria-label="Toggle dark mode"
              type="button"
            >
              <MaterialIcon
                name="dark_mode"
                className="text-on-surface"
                id="theme-icon"
              />
            </button>
            <button
              id="mobile-menu-btn"
              className="md:hidden p-2 rounded-lg hover:bg-surface-container transition-colors"
              aria-label="Open menu"
              aria-expanded="false"
              aria-controls="mobile-menu"
              type="button"
            >
              <MaterialIcon name="menu" className="text-on-surface" />
            </button>
            <a
              href="#contact"
              className="hidden md:block pixel-btn bg-primary text-on-primary px-5 py-2 text-sm font-semibold transition-all"
              style={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize: "7px",
                padding: "10px 16px",
              }}
            >
              CONNECT
            </a>
          </div>
        </nav>

        <div
          id="mobile-menu"
          className="mobile-menu fixed top-0 right-0 h-full w-80 bg-surface-container-lowest shadow-2xl z-50 md:hidden"
          role="dialog"
          aria-label="Mobile menu"
          aria-modal="true"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <span className="pixel-text text-[8px] text-primary neon-text">
                MENU
              </span>
              <button
                id="mobile-menu-close"
                className="p-2 rounded-lg hover:bg-surface-container transition-colors"
                aria-label="Close menu"
                type="button"
              >
                <MaterialIcon name="close" />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <a
                className="mobile-nav-link text-lg font-medium py-3 border-b border-outline-variant/20 hover:text-primary transition-colors"
                href="#hero"
              >
                Home
              </a>
              <a
                className="mobile-nav-link text-lg font-medium py-3 border-b border-outline-variant/20 hover:text-primary transition-colors"
                href="#projects"
              >
                Specimens
              </a>
              <a
                className="mobile-nav-link text-lg font-medium py-3 border-b border-outline-variant/20 hover:text-primary transition-colors"
                href="#roblox"
              >
                Games
              </a>
              <a
                className="mobile-nav-link text-lg font-medium py-3 border-b border-outline-variant/20 hover:text-primary transition-colors"
                href="#experiments"
              >
                Experiments
              </a>
              <a
                className="mobile-nav-link text-lg font-medium py-3 border-b border-outline-variant/20 hover:text-primary transition-colors"
                href="#log"
              >
                Lab Log
              </a>
              <a
                className="mobile-nav-link text-lg font-medium py-3 border-b border-outline-variant/20 hover:text-primary transition-colors"
                href="#about"
              >
                About
              </a>
              <a
                className="mobile-nav-link text-lg font-medium py-3 border-b border-outline-variant/20 hover:text-primary transition-colors"
                href="#contact"
              >
                Contact
              </a>
            </div>
            <div className="mt-8">
              <a
                href="#contact"
                className="block w-full bg-primary text-on-primary px-5 py-3 text-center font-semibold hover:bg-primary-container transition-all pixel-text text-[7px]"
              >
                CONNECT
              </a>
            </div>
          </div>
        </div>
        <div
          id="mobile-overlay"
          className="fixed inset-0 bg-black/50 z-40 hidden md:hidden"
          aria-hidden="true"
        ></div>
      </header>

      <main
        id="main-content"
        className="relative z-10 pt-24 px-6 md:px-12 max-w-[1440px] mx-auto"
        role="main"
      >
        {/* ===================== HERO ===================== */}
        <section
          id="hero"
          className="min-h-[819px] flex flex-col md:grid md:grid-cols-12 gap-12 items-center py-20"
        >
          <div className="md:col-span-7 space-y-8 reveal-left">
            <div className="flex items-center gap-4">
              <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse pixel-blink"
                  aria-hidden="true"
                ></span>
                <span className="text-[10px] font-bold uppercase tracking-[0.1em] font-label">
                  DIGITAL LABORATORY
                </span>
              </div>
              <span className="pixel-badge outline">ONLINE</span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-[2px] w-8 bg-primary"></div>
                <span className="pixel-text text-[6px] text-primary neon-text tracking-widest">
                  PLAYER_001
                </span>
                <div className="h-[2px] flex-1 bg-primary/20"></div>
              </div>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.9] text-on-surface">
                Hello, I'm
                <span
                  className="text-primary glitch-text"
                  style={{ display: "inline-block" }}
                >
                  Anang Ismail
                </span>
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-on-surface-variant max-w-xl font-light leading-relaxed">
              Informatics Engineering student building interactive frontends,
              crafting Roblox game systems, and exploring the world of Data
              Science.
            </p>

            {/* ✅ UPDATED: Hero Skill Stats — sesuai skill nyata */}
            <div
              className="space-y-3 max-w-sm p-4 bg-surface-container-low border border-outline-variant/15"
              style={{ fontFamily: '"VT323", monospace' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="pixel-text text-[6px] text-primary neon-text">
                  SKILL STATS
                </span>
              </div>
              <div className="skill-row">
                <div className="skill-label">
                  <span className="vt-text text-base text-on-surface-variant">
                    Front-End Dev
                  </span>
                  <span className="pixel-text text-[6px] text-primary">
                    LV.7
                  </span>
                </div>
                <div className="stat-bar-track">
                  <div
                    className="stat-bar-fill cyan"
                    style={{ width: "0%" }}
                    data-width="63%"
                  ></div>
                </div>
              </div>
              <div className="skill-row">
                <div className="skill-label">
                  <span className="vt-text text-base text-on-surface-variant">
                    Game Dev (Roblox)
                  </span>
                  <span className="pixel-text text-[6px] text-primary">
                    LV.9
                  </span>
                </div>
                <div className="stat-bar-track">
                  <div
                    className="stat-bar-fill yellow"
                    style={{ width: "0%" }}
                    data-width="85%"
                  ></div>
                </div>
              </div>
              <div className="skill-row">
                <div className="skill-label">
                  <span className="vt-text text-base text-on-surface-variant">
                    Data Science / ML
                  </span>
                  <span className="pixel-text text-[6px] text-primary">
                    LV.5
                  </span>
                </div>
                <div className="stat-bar-track">
                  <div
                    className="stat-bar-fill green"
                    style={{ width: "0%" }}
                    data-width="52%"
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                className="pixel-btn bg-primary text-on-primary px-8 py-4 font-bold hover:shadow-lg transition-all flex items-center gap-2"
                href="#projects"
              >
                View Projects
                <MaterialIcon name="arrow_forward" aria-hidden="true" />
              </a>
              <a
                className="px-8 py-4 font-bold text-on-surface border border-outline-variant/30 hover:border-primary/50 transition-all flex items-center gap-2"
                href="#experiments"
              >
                Explore Experiments
              </a>
            </div>
          </div>

          {/* Status Card */}
          <div className="md:col-span-5 w-full reveal-right">
            <div className="bg-surface-container-lowest p-8 relative shadow-[0_20px_40px_rgba(28,27,27,0.04)] border border-outline-variant/15 pixel-corner scanlines group overflow-hidden">
              <div className="absolute top-2 right-2 pixel-text text-[6px] text-primary opacity-40 neon-text">
                ████
              </div>
              <div className="absolute bottom-2 left-2 pixel-text text-[6px] text-primary opacity-40 neon-text">
                ████
              </div>

              <div className="flex justify-between items-center mb-6">
                <h3 className="pixel-text text-[8px] text-primary neon-text">
                  SYS_STATUS
                </h3>
                <span className="pixel-badge">v2.6.0</span>
              </div>

              <div className="flex items-center gap-4 mb-8 p-3 bg-surface-container-low border border-outline-variant/10">
                <div className="w-12 h-12 bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="pixel-text text-[9px] text-white">AI</span>
                </div>
                <div>
                  <p className="font-bold text-on-surface text-sm">
                    Anang Ismail
                  </p>
                  <p className="vt-text text-lg text-on-surface-variant">
                    INFORMATICS ENG.
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="pixel-text text-[6px] text-primary neon-text">
                      LVL 3
                    </span>
                    <div className="flex-1 h-1 bg-surface-container-high">
                      <div
                        className="h-full bg-primary"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                    <span className="pixel-text text-[6px] text-outline">
                      EXP
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-outline-variant/10 pb-4">
                  <div>
                    <p className="pixel-text text-[6px] text-outline mb-2">
                      ARCHIVE VOL.
                    </p>
                    <p
                      className="text-4xl font-headline font-bold counter"
                      data-target={archiveProjectCount}
                    >
                      0
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-on-surface-variant font-medium">
                      PROJECTS
                    </p>
                    <span
                      className="pixel-badge outline"
                      style={{ fontSize: "5px" }}
                    >
                      COMPLETED
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-end border-b border-outline-variant/10 pb-4">
                  <div>
                    <p className="pixel-text text-[6px] text-outline mb-2">
                      ACTIVE RUNS
                    </p>
                    <p
                      className="text-4xl font-headline font-bold counter"
                      data-target="24"
                    >
                      0
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-on-surface-variant font-medium">
                      EXPERIMENTS
                    </p>
                    <span
                      className="pixel-badge outline"
                      style={{ fontSize: "5px" }}
                    >
                      LIVE
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="pixel-text text-[6px] text-outline mb-2">
                      SYNTAX STACK
                    </p>
                    <p
                      className="text-4xl font-headline font-bold counter"
                      data-target="8"
                    >
                      0
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-on-surface-variant font-medium">
                      TECH
                    </p>
                    <span
                      className="pixel-badge outline"
                      style={{ fontSize: "5px" }}
                    >
                      VERTICALS
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-surface-container-low p-3 flex items-center gap-4">
                <span className="pixel-text text-[5px] text-primary pixel-blink neon-text">
                  ▶
                </span>
                <span className="vt-text text-lg text-on-surface-variant tracking-wider">
                  LAB CURRENTLY OPERATIONAL
                </span>
                <span className="ml-auto pixel-text text-[5px] text-outline">
                  00:00
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== ABOUT ===================== */}
        <section
          className="py-32 border-t border-outline-variant/15"
          id="about"
        >
          <div className="grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-6 reveal-left space-y-6">
              <div className="pixel-panel scanlines bg-surface-container-lowest border border-outline-variant/15 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="pixel-text text-[7px] text-primary neon-text">
                  LAB_DIR.LOG
                </div>
                <div className="h-[1px] flex-1 bg-outline-variant/30"></div>
                <span className="pixel-badge" style={{ fontSize: "5px" }}>
                  README.TXT
                </span>
              </div>
              <p className="text-3xl font-headline leading-tight font-medium mb-8">
                Building interfaces, crafting game worlds, and exploring data.
              </p>

              {/* ✅ TODO: Ganti teks di bawah ini dengan bio Anda sendiri di VSCode */}
              <p className="text-on-surface-variant leading-relaxed text-lg mb-8 border-l-2 border-primary/30 pl-4 italic opacity-60">
                I focus on designing intuitive and expressive user interfaces
                that turn ideas into interactive digital experiences, with a
                strong emphasis on clarity, emotion, and usability.
              </p>

              <p className="text-on-surface-variant leading-relaxed text-lg">
                My work spans across front-end development, Roblox game system
                design using Luau, and exploratory projects in Data Science. I
                enjoy building systems that are not only functional, but also
                engaging and meaningful to interact with, blending technical
                logic with creative storytelling.
              </p>
              </div>

              <div className="pixel-panel scanlines bg-surface-container-lowest border border-outline-variant/15 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="pixel-text text-[7px] text-primary neon-text">
                    PLAYER_PROFILE
                  </div>
                  <div className="h-[1px] flex-1 bg-outline-variant/30"></div>
                  <span className="pixel-badge" style={{ fontSize: "5px" }}>
                    STATUS.SYS
                  </span>
                </div>

              <div className="bg-surface-container-high h-[360px] overflow-hidden relative group border border-outline-variant/15 mb-8">
                {!profileLoaded && <div className="image-skeleton absolute inset-0"></div>}
                <img
                  className={`w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 group-hover:opacity-100 transition-all duration-700 ${
                    profileLoaded ? "opacity-90" : "opacity-0"
                  }`}
                  alt="Portrait of Anang Ismail"
                  src="/asset/profile.jpeg"
                  loading="eager"
                  fetchPriority="high"
                  onLoad={() => setProfileLoaded(true)}
                  onError={() => setProfileLoaded(true)}
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
              </div>

              {/* ✅ UPDATED: Character Skills — sesuai skill nyata */}
              <div className="space-y-4 p-5 bg-surface-container-low border border-outline-variant/10 mb-8">
                <div className="pixel-text text-[6px] text-primary neon-text mb-3">
                  CHARACTER SKILLS
                </div>
                <div className="space-y-3">
                  <div className="skill-row">
                    <div className="skill-label mb-1">
                      <span className="text-sm text-on-surface-variant font-medium">
                        HTML / CSS
                      </span>
                      <span className="pixel-text text-[5px] text-outline">
                        INTER
                      </span>
                    </div>
                    <div className="stat-bar-track">
                      <div
                        className="stat-bar-fill cyan"
                        style={{ width: "0%" }}
                        data-width="65%"
                      ></div>
                    </div>
                  </div>
                  <div className="skill-row">
                    <div className="skill-label mb-1">
                      <span className="text-sm text-on-surface-variant font-medium">
                        JavaScript
                      </span>
                      <span className="pixel-text text-[5px] text-outline">
                        INTER
                      </span>
                    </div>
                    <div className="stat-bar-track">
                      <div
                        className="stat-bar-fill"
                        style={{ width: "0%" }}
                        data-width="50%"
                      ></div>
                    </div>
                  </div>
                  <div className="skill-row">
                    <div className="skill-label mb-1">
                      <span className="text-sm text-on-surface-variant font-medium">
                        React JS
                      </span>
                      <span className="pixel-text text-[5px] text-outline">
                        INTER
                      </span>
                    </div>
                    <div className="stat-bar-track">
                      <div
                        className="stat-bar-fill cyan"
                        style={{ width: "0%" }}
                        data-width="52%"
                      ></div>
                    </div>
                  </div>
                  <div className="skill-row">
                    <div className="skill-label mb-1">
                      <span className="text-sm text-on-surface-variant font-medium">
                        Luau / Roblox
                      </span>
                      <span className="pixel-text text-[5px] text-outline">
                        ADVANCED
                      </span>
                    </div>
                    <div className="stat-bar-track">
                      <div
                        className="stat-bar-fill yellow"
                        style={{ width: "0%" }}
                        data-width="85%"
                      ></div>
                    </div>
                  </div>
                  <div className="skill-row">
                    <div className="skill-label mb-1">
                      <span className="text-sm text-on-surface-variant font-medium">
                        Python
                      </span>
                      <span className="pixel-text text-[5px] text-outline">
                        SENIOR
                      </span>
                    </div>
                    <div className="stat-bar-track">
                      <div
                        className="stat-bar-fill green"
                        style={{ width: "0%" }}
                        data-width="80%"
                      ></div>
                    </div>
                  </div>
                  <div className="skill-row">
                    <div className="skill-label mb-1">
                      <span className="text-sm text-on-surface-variant font-medium">
                        Backend (Node.js / Express)
                      </span>
                      <span className="pixel-text text-[5px] text-outline">
                        BASIC
                      </span>
                    </div>
                    <div className="stat-bar-track">
                      <div
                        className="stat-bar-fill purple"
                        style={{ width: "0%" }}
                        data-width="42%"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>

            <div className="md:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              <div className="about-module-card bg-surface-container-low p-8 space-y-6 reveal-scale border border-outline-variant/10 hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between">
                  <MaterialIcon
                    name="web"
                    className="text-primary text-4xl"
                    aria-hidden="true"
                  />
                  <span className="pixel-badge" style={{ fontSize: "5px" }}>
                    SPEC_001
                  </span>
                </div>
                <h4 className="text-xl font-bold font-headline">
                  Front-End Dev
                </h4>
                <p className="text-on-surface-variant text-sm leading-relaxed italic">
                  "Interfaces that feel alive and intentional."
                </p>
                <p className="text-sm text-on-surface-variant">
                  Building responsive, interactive web experiences using HTML,
                  CSS, JavaScript, and React JS — from component architecture to
                  polished UI/UX.
                </p>
              </div>
              <div className="about-module-card bg-surface-container-lowest border border-outline-variant/15 p-8 space-y-6 reveal-scale hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between">
                  <MaterialIcon
                    name="joystick"
                    className="text-primary text-4xl"
                    aria-hidden="true"
                  />
                  <span className="pixel-badge" style={{ fontSize: "5px" }}>
                    SPEC_002
                  </span>
                </div>
                <h4 className="text-xl font-bold font-headline">
                  Game Dev (Roblox)
                </h4>
                <p className="text-on-surface-variant text-sm leading-relaxed italic">
                  "Game worlds engineered from scratch."
                </p>
                <p className="text-sm text-on-surface-variant">
                  Designing modular game systems in Roblox Studio using Luau —
                  from gameplay mechanics and UI systems to DataStore
                  persistence and OOP architecture.
                </p>
              </div>
              <div className="about-module-card bg-surface-container-low p-8 space-y-6 md:col-span-2 reveal-scale border border-outline-variant/10 hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between">
                  <MaterialIcon
                    name="neurology"
                    className="text-primary text-4xl"
                    aria-hidden="true"
                  />
                  <span className="pixel-badge" style={{ fontSize: "5px" }}>
                    SPEC_003
                  </span>
                </div>
                <h4 className="text-xl font-bold font-headline">
                  Data Science / ML
                </h4>
                <p className="text-on-surface-variant text-sm leading-relaxed italic">
                  "Turning raw data into meaningful patterns."
                </p>
                <p className="text-sm text-on-surface-variant">
                  Exploring data analysis, visualization, and machine learning
                  concepts using Python — currently learning and applying
                  through personal experiments and projects.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== SPECIMEN SELECT ===================== */}
        <SpecimenSelect />

        {/* ===================== GAME CHAMBER ===================== */}
        <GameChamber />

        {/* ===================== EXPERIMENTS ===================== */}
        <section
          className="py-32 border-t border-outline-variant/15"
          id="experiments"
        >
          <div className="flex items-center justify-center gap-4 mb-16 reveal">
            <div className="h-[1px] w-12 bg-outline-variant/30"></div>
            <span className="pixel-text text-[7px] text-primary neon-text">
              ACTIVE_EXPERIMENTS
            </span>
            <div className="h-[1px] w-12 bg-outline-variant/30"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              className="aspect-square bg-surface-container-low p-6 flex flex-col justify-between border border-transparent hover:border-outline-variant/30 transition-all reveal-scale experiment-card cursor-pointer relative scanlines"
              data-experiment="game"
            >
              <div className="absolute top-1 left-1 pixel-text text-[5px] text-primary/30">
                ■
              </div>
              <MaterialIcon
                name="joystick"
                className="text-outline"
                aria-hidden="true"
              />
              <div>
                <p className="pixel-text text-[5px] text-outline mb-2">
                  RUN_042
                </p>
                <h5 className="font-headline font-bold text-sm">
                  Game Mechanics
                </h5>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 bg-primary pixel-blink"
                  aria-hidden="true"
                ></span>
                <span className="pixel-text text-[5px] text-primary">
                  IN_PROGRESS
                </span>
              </div>
            </div>
            <div
              className="aspect-square bg-surface-container-lowest border border-outline-variant/15 p-6 flex flex-col justify-between hover:bg-surface-container-low transition-all reveal-scale experiment-card cursor-pointer relative scanlines"
              data-experiment="server"
            >
              <div className="absolute top-1 left-1 pixel-text text-[5px] text-primary/30">
                ■
              </div>
              <MaterialIcon
                name="dns"
                className="text-outline"
                aria-hidden="true"
              />
              <div>
                <p className="pixel-text text-[5px] text-outline mb-2">
                  RUN_089
                </p>
                <h5 className="font-headline font-bold text-sm">
                  React Components
                </h5>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 bg-green-500"
                  aria-hidden="true"
                ></span>
                <span className="pixel-text text-[5px] text-green-500">
                  STABLE
                </span>
              </div>
            </div>
            <div
              className="aspect-square bg-surface-container-low p-6 flex flex-col justify-between border border-transparent hover:border-outline-variant/30 transition-all reveal-scale experiment-card cursor-pointer relative scanlines"
              data-experiment="neural"
            >
              <div className="absolute top-1 left-1 pixel-text text-[5px] text-primary/30">
                ■
              </div>
              <MaterialIcon
                name="neurology"
                className="text-outline"
                aria-hidden="true"
              />
              <div>
                <p className="pixel-text text-[5px] text-outline mb-2">
                  RUN_112
                </p>
                <h5 className="font-headline font-bold text-sm">
                  ML / Data Models
                </h5>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 bg-orange-500"
                  aria-hidden="true"
                ></span>
                <span className="pixel-text text-[5px] text-orange-500">
                  TESTING
                </span>
              </div>
            </div>
            <div
              className="aspect-square bg-surface-container-lowest border border-outline-variant/15 p-6 flex flex-col justify-between hover:bg-surface-container-low transition-all reveal-scale experiment-card cursor-pointer relative scanlines"
              data-experiment="vector"
            >
              <div className="absolute top-1 left-1 pixel-text text-[5px] text-primary/30">
                ■
              </div>
              <MaterialIcon
                name="database"
                className="text-outline"
                aria-hidden="true"
              />
              <div>
                <p className="pixel-text text-[5px] text-outline mb-2">
                  RUN_021
                </p>
                <h5 className="font-headline font-bold text-sm">
                  Python Scripts
                </h5>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 bg-primary pixel-blink"
                  aria-hidden="true"
                ></span>
                <span className="pixel-text text-[5px] text-primary">
                  LIVE_DATA
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== TECH STACK ===================== */}
        {/* ✅ UPDATED: Tech Stack — sesuai skill nyata */}
        <section className="py-32 grid md:grid-cols-3 gap-16 border-t border-outline-variant/15">
          <div className="reveal">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-2 h-8 bg-primary"></div>
              <h3 className="pixel-text text-[7px] text-primary neon-text">
                LANGUAGES
              </h3>
            </div>
            <ul className="space-y-4 text-on-surface-variant">
              <li className="flex justify-between items-center group">
                <span className="font-medium group-hover:text-primary transition-colors">
                  JavaScript
                </span>
                <span className="pixel-text text-[5px] text-outline opacity-0 group-hover:opacity-100 uppercase">
                  Inter.
                </span>
              </li>
              <li className="flex justify-between items-center group">
                <span className="font-medium group-hover:text-primary transition-colors">
                  HTML / CSS
                </span>
                <span className="pixel-text text-[5px] text-outline opacity-0 group-hover:opacity-100 uppercase">
                  Inter.
                </span>
              </li>
              <li className="flex justify-between items-center group">
                <span className="font-medium group-hover:text-primary transition-colors">
                  Python
                </span>
                <span className="pixel-text text-[5px] text-outline opacity-0 group-hover:opacity-100 uppercase">
                  Inter.
                </span>
              </li>
              <li className="flex justify-between items-center group">
                <span className="font-medium group-hover:text-primary transition-colors">
                  Luau (Roblox)
                </span>
                <span className="pixel-text text-[5px] text-outline opacity-0 group-hover:opacity-100 uppercase">
                  Advanced
                </span>
              </li>
              <li className="flex justify-between items-center group">
                <span className="font-medium group-hover:text-primary transition-colors">
                  Node.js / Express
                </span>
                <span className="pixel-text text-[5px] text-outline opacity-0 group-hover:opacity-100 uppercase">
                  Basic
                </span>
              </li>
            </ul>
          </div>
          <div className="reveal">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-2 h-8 bg-primary"></div>
              <h3 className="pixel-text text-[7px] text-primary neon-text">
                TOOLS & FRAMEWORKS
              </h3>
            </div>
            <ul className="space-y-4 text-on-surface-variant">
              <li className="flex justify-between items-center group">
                <span className="font-medium group-hover:text-primary transition-colors">
                  React JS
                </span>
                <span className="pixel-text text-[5px] text-outline opacity-0 group-hover:opacity-100 uppercase">
                  Framework
                </span>
              </li>
              <li className="flex justify-between items-center group">
                <span className="font-medium group-hover:text-primary transition-colors">
                  Tailwind CSS
                </span>
                <span className="pixel-text text-[5px] text-outline opacity-0 group-hover:opacity-100 uppercase">
                  Styling
                </span>
              </li>
              <li className="flex justify-between items-center group">
                <span className="font-medium group-hover:text-primary transition-colors">
                  Pandas / NumPy
                </span>
                <span className="pixel-text text-[5px] text-outline opacity-0 group-hover:opacity-100 uppercase">
                  Data
                </span>
              </li>
              <li className="flex justify-between items-center group">
                <span className="font-medium group-hover:text-primary transition-colors">
                  Roblox Studio
                </span>
                <span className="pixel-text text-[5px] text-outline opacity-0 group-hover:opacity-100 uppercase">
                  Game IDE
                </span>
              </li>
              <li className="flex justify-between items-center group">
                <span className="font-medium group-hover:text-primary transition-colors">
                  Git / GitHub
                </span>
                <span className="pixel-text text-[5px] text-outline opacity-0 group-hover:opacity-100 uppercase">
                  Version Control
                </span>
              </li>
            </ul>
          </div>
          <div className="reveal">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-2 h-8 bg-primary"></div>
              <h3 className="pixel-text text-[7px] text-primary neon-text">
                FIELDS OF STUDY
              </h3>
            </div>
            <ul className="space-y-4 text-on-surface-variant">
              <li className="flex justify-between items-center group">
                <span className="font-medium group-hover:text-primary transition-colors">
                  Front-End Development
                </span>
              </li>
              <li className="flex justify-between items-center group">
                <span className="font-medium group-hover:text-primary transition-colors">
                  Game Systems Design
                </span>
              </li>
              <li className="flex justify-between items-center group">
                <span className="font-medium group-hover:text-primary transition-colors">
                  Data Science / ML
                </span>
              </li>
              <li className="flex justify-between items-center group">
                <span className="font-medium group-hover:text-primary transition-colors">
                  UI / UX Design
                </span>
              </li>
              <li className="flex justify-between items-center group">
                <span className="font-medium group-hover:text-primary transition-colors">
                  Cyber Security (Inspired)
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ===================== LAB LOG TIMELINE ===================== */}
        <section className="py-32 border-t border-outline-variant/15" id="log">
          <div className="flex items-center justify-center gap-4 mb-20 reveal">
            <div className="h-[1px] w-8 bg-outline-variant/30"></div>
            <span className="pixel-text text-[7px] text-primary neon-text">
              LAB_LOG_TIMELINE
            </span>
            <div className="h-[1px] w-8 bg-outline-variant/30"></div>
          </div>
          <div className="relative max-w-4xl mx-auto space-y-16">
            <div
              className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-outline-variant/30 -translate-x-1/2 hidden md:block"
              aria-hidden="true"
            ></div>

            <div className="relative flex flex-col md:flex-row items-center gap-8 group reveal">
              <div className="md:w-1/2 md:text-right pr-12 hidden md:block">
                <p className="text-4xl font-headline font-bold text-on-surface opacity-20 group-hover:opacity-100 transition-opacity">
                  2026
                </p>
              </div>
              <div
                className="w-4 h-4 border-2 border-primary bg-background z-10 hidden md:block"
                aria-hidden="true"
              ></div>
              <div className="md:w-1/2 md:pl-12">
                <div className="bg-surface-container-low p-8 border border-outline-variant/10 hover:border-primary/30 transition-colors relative">
                  <div
                    className="absolute top-2 right-2 pixel-badge"
                    style={{ fontSize: "5px" }}
                  >
                    LATEST
                  </div>
                  <span className="pixel-text text-[5px] text-primary mb-2 block neon-text md:hidden">
                    2026
                  </span>
                  <h4 className="text-lg font-bold font-headline mb-3">
                    Roblox Games & Interactive Web Projects
                  </h4>

                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Published multiple Roblox games while continuing to develop
                    modern interactive websites with futuristic UI concepts,
                    animation systems, and experimental user experiences.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative flex flex-col md:flex-row-reverse items-center gap-8 group reveal">
              <div className="md:w-1/2 md:text-left pl-12 hidden md:block">
                <p className="text-4xl font-headline font-bold text-on-surface opacity-20 group-hover:opacity-100 transition-opacity">
                  2025
                </p>
              </div>
              <div
                className="w-4 h-4 border-2 border-primary bg-background z-10 hidden md:block"
                aria-hidden="true"
              ></div>
              <div className="md:w-1/2 md:pr-12">
                <div className="bg-surface-container-lowest border border-outline-variant/15 p-8 hover:border-primary/30 transition-colors">
                  <span className="pixel-text text-[5px] text-primary mb-2 block neon-text md:hidden">
                    2025
                  </span>
                  <h4 className="text-lg font-bold font-headline mb-3">
                    AI Analysis Project & First Websites
                  </h4>

                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Started building Python-based AI projects focused on athlete
                    running analysis. Developed early websites including
                    educational projects about sunflower plants and interactive
                    web layouts.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative flex flex-col md:flex-row items-center gap-8 group reveal">
              <div className="md:w-1/2 md:text-right pr-12 hidden md:block">
                <p className="text-4xl font-headline font-bold text-on-surface opacity-20 group-hover:opacity-100 transition-opacity">
                  2024
                </p>
              </div>
              <div
                className="w-4 h-4 border-2 border-primary bg-background z-10 hidden md:block"
                aria-hidden="true"
              ></div>
              <div className="md:w-1/2 md:pl-12">
                <div className="bg-surface-container-low p-8 border border-outline-variant/10 hover:border-primary/30 transition-colors">
                  <span className="pixel-text text-[5px] text-primary mb-2 block neon-text md:hidden">
                    2024
                  </span>
                  <h4 className="text-lg font-bold font-headline mb-3">
                    IoT Fish Feeding Automation System
                  </h4>

                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Developed an automated fish feeding system using MQTT-based
                    IoT communication, integrating sensors, scheduling logic,
                    and real-time device monitoring for academic research.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== CONTACT ===================== */}
        <section className="py-40" id="contact">
          <div className="bg-primary p-12 md:p-24 text-on-primary relative overflow-hidden flex flex-col items-center text-center reveal-scale">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-3 left-3 pixel-text text-[10px] text-white/10">
                ▛▛▛▛▛▛▛▛
              </div>
              <div className="absolute top-3 right-3 pixel-text text-[10px] text-white/10">
                ▜▜▜▜▜▜▜▜
              </div>
              <div className="absolute bottom-3 left-3 pixel-text text-[10px] text-white/10">
                ▙▙▙▙▙▙▙▙
              </div>
              <div className="absolute bottom-3 right-3 pixel-text text-[10px] text-white/10">
                ▟▟▟▟▟▟▟▟
              </div>
            </div>
            <div className="absolute inset-0 scanlines pointer-events-none opacity-30"></div>
            <div
              className="pixel-text text-[7px] mb-12 opacity-80 neon-text"
              style={{ color: "rgba(255, 255, 255, 0.8)" }}
            >
              INITIATE_CONTACT
            </div>
            <h3 className="text-5xl md:text-7xl font-headline font-bold mb-8">
              Ready to start a new{" "}
              <span className="opacity-50">experiment?</span>
            </h3>
            <p className="max-w-xl text-lg text-primary-fixed mb-12 font-light">
              I am currently accepting select inquiries for internship
              opportunities, front-end collaborations, game development
              projects, and data science experiments.
            </p>
            <form
              id="contact-form"
              className="flex flex-col md:flex-row gap-6 w-full max-w-md"
              noValidate
            >
              <input
                type="email"
                id="email-input"
                name="email"
                className="flex-1 bg-white/10 border border-white/20 px-6 py-4 placeholder:text-white/40 text-sm focus:bg-white/20 focus:outline-none focus:border-white/50 transition-all"
                placeholder="YOUR_EMAIL_ADDRESS"
                required
                aria-required="true"
                aria-label="Email address"
              />
              <button
                type="submit"
                id="submit-btn"
                className="pixel-btn bg-surface-container-lowest text-primary px-8 py-4 font-bold uppercase flex items-center justify-center gap-2 min-w-[120px] hover:bg-primary-container hover:text-white transition-all"
                style={{
                  fontFamily: '"Press Start 2P", monospace',
                  fontSize: "7px",
                }}
              >
                <span id="btn-text">SEND</span>
                <MaterialIcon
                  name="progress_activity"
                  className="spinner hidden"
                  id="btn-spinner"
                  aria-hidden="true"
                />
              </button>
            </form>
            <p className="mt-12 pixel-text text-[5px] opacity-60">
              AVG RESPONSE: &lt; 24H
            </p>
          </div>
        </section>
      </main>

      {/* ===================== FOOTER ===================== */}
      <footer
        className="w-full py-12 mt-20 border-t border-slate-100 bg-[#fcf9f8]"
        role="contentinfo"
      >
        <div className="flex flex-col md:flex-row justify-between items-center px-8 w-full max-w-[1440px] mx-auto gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="pixel-text text-[5px] text-primary neon-text">
              THE EXPERIMENTAL LAB
            </span>
            <div className="text-[10px] tracking-widest uppercase text-slate-400 font-body">
              © 2026 RESEARCH PORTFOLIO
            </div>
          </div>
          <div className="hidden md:block pixel-text text-[8px] text-primary/20 select-none">
            ■ □ ■ □ ■ □ ■
          </div>
          <div className="flex gap-8">
            <a
              href="https://github.com/AkzAkr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-primary transition-colors text-[10px] tracking-widest uppercase font-body hover:underline decoration-primary underline-offset-4"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/anang-ismail-2b326a409"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-primary transition-colors text-[10px] tracking-widest uppercase font-body hover:underline decoration-primary underline-offset-4"
            >
              LinkedIn
            </a>
            <a
              href="https://www.roblox.com/users/9690392018/profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-primary transition-colors text-[10px] tracking-widest uppercase font-body hover:underline decoration-primary underline-offset-4"
            >
              Roblox
            </a>
            <a
              href="mailto:anangismail57@gmail.com"
              className="text-slate-400 hover:text-primary transition-colors text-[10px] tracking-widest uppercase font-body hover:underline decoration-primary underline-offset-4"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
