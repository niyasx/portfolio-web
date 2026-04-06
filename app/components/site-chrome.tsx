"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { SiteContentBundle } from "@/app/lib/site-content-types";
import { toUiProfile, toUiSocial } from "@/app/lib/site-content-types";
import nameSignature from "@/assets/Niyas Name-01.png";
import profileImage from "@/assets/niyas_image1.jpeg";
import {
  FiArrowUpRight,
  FiBookOpen,
  FiGrid,
  FiDribbble,
  FiFacebook,
  FiHome,
  FiInstagram,
  FiLinkedin,
  FiList,
  FiMail,
  FiMessageCircle,
  FiTag,
  FiTwitter,
  FiUser,
  FiX,
  FiLayers,
} from "react-icons/fi";
import { BiMessageRounded } from "react-icons/bi";
import { RiServiceLine } from "react-icons/ri";

type LenisLike = {
  scroll: number;
  isScrolling: boolean | "native" | "smooth";
  scrollTo: (
    target: string | number | HTMLElement,
    options?: {
      offset?: number;
      duration?: number;
      immediate?: boolean;
      onComplete?: (lenis: LenisLike) => void;
    },
  ) => void;
  on?: (event: "scroll", callback: (...args: unknown[]) => void) => void;
  off?: (event: "scroll", callback: (...args: unknown[]) => void) => void;
};

const sectionAnchors = [
  { id: "home", label: "Home", icon: FiHome },
  { id: "works", label: "Works", icon: FiLayers },
  { id: "services", label: "Services", icon: RiServiceLine },
  { id: "about", label: "About", icon: FiUser },
  { id: "testimonial", label: "Testimonial", icon: BiMessageRounded },
  { id: "pricing", label: "Pricing", icon: FiTag },
  { id: "faqs", label: "FAQs", icon: FiMessageCircle },
  { id: "contact", label: "Contact", icon: FiMail },
];

const drawerAnchors = [
  { id: "home", label: "Home", icon: FiHome },
  { id: "experience", label: "Experience", icon: FiList },
  { id: "works", label: "Selected Works", icon: FiLayers },
  { id: "services", label: "Services", icon: RiServiceLine },
  { id: "about", label: "About", icon: FiUser },
  { id: "testimonial", label: "Testimonial", icon: BiMessageRounded },
  { id: "partners", label: "Partners", icon: FiMessageCircle },
  { id: "awards", label: "Awards", icon: FiTag },
  { id: "pricing", label: "Pricing", icon: FiTag },
  { id: "faqs", label: "FAQs", icon: FiMessageCircle },
  { id: "contact", label: "Contact", icon: FiMail },
];

const SECTION_SCROLL_OFFSET_PX = 20;

function getLenis(): LenisLike | undefined {
  return (typeof window !== "undefined" ? (window as Window & { __lenis?: LenisLike }).__lenis : undefined);
}

export function SiteChrome({ site }: { site: SiteContentBundle }) {
  const profile = toUiProfile(site.profile);
  const social = toUiSocial(site.profile);
  const avatarSrc = site.profile.avatarUrl ?? profileImage;
  const signatureSrc = site.profile.signatureUrl ?? nameSignature;

  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState("home");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [showMenuBtn, setShowMenuBtn] = useState(true);
  const pendingIdRef = useRef<string | null>(null);

  useEffect(() => {
    pendingIdRef.current = pendingId;
  }, [pendingId]);

  const computeScrollYForElement = (el: HTMLElement) => {
    const lenis = getLenis();
    const baseScroll = lenis?.scroll ?? window.scrollY;
    const rectTop = el.getBoundingClientRect().top;
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const y = baseScroll + rectTop - SECTION_SCROLL_OFFSET_PX;
    return Math.max(0, Math.min(maxScroll, y));
  };

  const resolveActiveSectionId = () => {
    const marker = window.innerHeight * 0.35;
    const isNearBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
    if (isNearBottom) {
      return sectionAnchors[sectionAnchors.length - 1].id;
    }

    const sections = sectionAnchors
      .map((section) => {
        const node = document.getElementById(section.id);
        if (!node) return null;
        return { id: section.id, top: node.getBoundingClientRect().top };
      })
      .filter((section): section is { id: string; top: number } => section !== null);

    if (sections.length === 0) return sectionAnchors[0].id;

    const crossedSections = sections.filter((section) => section.top <= marker);
    if (crossedSections.length > 0) {
      return crossedSections.reduce((closest, section) =>
        section.top > closest.top ? section : closest,
      ).id;
    }
    return sections[0].id;
  };

  const scrollToSection = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    pendingIdRef.current = id;
    setPendingId(id);

    const y = computeScrollYForElement(target);
    window.history.replaceState(null, "", `#${id}`);

    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(y, {
        duration: 0.55,
        onComplete: () => {
          requestAnimationFrame(() => {
            if (pendingIdRef.current !== id) return;
            setActiveId(id);
            setPendingId(null);
          });
        },
      });
    } else {
      window.scrollTo({ top: y, behavior: "smooth" });
      let settled = false;
      const commit = () => {
        if (settled) return;
        settled = true;
        if (pendingIdRef.current !== id) return;
        setActiveId(id);
        setPendingId(null);
      };
      window.addEventListener("scrollend", commit, { once: true });
      window.setTimeout(commit, 900);
    }
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 1300);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const value = max > 0 ? (window.scrollY / max) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, value)));
    };

    const updateActiveState = () => {
      const homeSection = document.getElementById("home");
      if (homeSection) {
        setShowMenuBtn(homeSection.getBoundingClientRect().bottom > 40);
      }

      const currentId = resolveActiveSectionId();
      const pending = pendingIdRef.current;

      if (pending) {
        const isNearBottom =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
        if (currentId === pending || (pending === "contact" && isNearBottom)) {
          setActiveId(pending);
          setPendingId(null);
        }
        return;
      }

      setActiveId((prev) => (prev === currentId ? prev : currentId));
    };

    const onWindowScroll = () => {
      onScroll();
      updateActiveState();
    };
    const onWindowResize = () => {
      onScroll();
      updateActiveState();
    };

    const onLenisScroll = () => {
      onScroll();
      updateActiveState();
    };

    const clearPendingOnUserScroll = () => {
      const l = getLenis();
      if (l && l.isScrolling === "smooth") return;
      if (pendingIdRef.current) setPendingId(null);
    };

    window.addEventListener("scroll", onWindowScroll, { passive: true });
    window.addEventListener("resize", onWindowResize, { passive: true });
    window.addEventListener("wheel", clearPendingOnUserScroll, { passive: true });
    window.addEventListener("touchmove", clearPendingOnUserScroll, { passive: true });

    let attachedLenis: LenisLike | undefined;
    const attachLenisIfNeeded = () => {
      const l = getLenis();
      if (!l || attachedLenis === l) return;
      attachedLenis?.off?.("scroll", onLenisScroll);
      l.on?.("scroll", onLenisScroll);
      attachedLenis = l;
      onScroll();
      updateActiveState();
    };
    attachLenisIfNeeded();
    const poll = window.setInterval(() => {
      attachLenisIfNeeded();
      if (getLenis()) window.clearInterval(poll);
    }, 80);
    const stopPoll = window.setTimeout(() => window.clearInterval(poll), 4000);

    onScroll();
    updateActiveState();

    return () => {
      window.removeEventListener("scroll", onWindowScroll);
      window.removeEventListener("resize", onWindowResize);
      window.removeEventListener("wheel", clearPendingOnUserScroll);
      window.removeEventListener("touchmove", clearPendingOnUserScroll);
      window.clearInterval(poll);
      window.clearTimeout(stopPoll);
      attachedLenis?.off?.("scroll", onLenisScroll);
    };
  }, []);

  return (
    <>
      <div className="scroll-progress">
        <span style={{ transform: `scaleY(${progress / 100})` }} />
      </div>

      <aside className="left-sidebar">
        <div className="heading">
          <button className="settings-dot" aria-label="Settings">
            <FiBookOpen />
          </button>
          <p className="availability">
            <span />
            {site.profile.availabilityText}
          </p>
        </div>
        <div className="image">
          <Image
            className="avatar"
            src={avatarSrc}
            alt={profile.name}
            width={357}
            height={352}
            priority
            unoptimized={typeof avatarSrc === "string"}
          />

          <Image
            src={signatureSrc}
            alt={profile.name}
            className="signature"
            width={560}
            height={170}
            unoptimized={typeof signatureSrc === "string"}
          />
        </div>
        <div className="infor">
          <p className="mail">{profile.contact.email}</p>
          <p className="address">{profile.contact.location}</p>
        </div>
        <div className="social-links">
          <Link href={social.twitter} target="_blank" aria-label="Twitter">
            <FiTwitter />
          </Link>
          <Link href={social.dribbble} target="_blank" aria-label="Dribbble">
            <FiDribbble />
          </Link>
          <Link href={social.instagram} target="_blank" aria-label="Instagram">
            <FiInstagram />
          </Link>
          <Link href={profile.contact.linkedin} target="_blank" aria-label="LinkedIn">
            <FiLinkedin />
          </Link>
          <Link href={social.facebook} target="_blank" aria-label="Facebook">
            <FiFacebook />
          </Link>
        </div>
        <a href="#contact" className="bot-button">
          <span className="text">Get Started</span>
          <span className="icon">
            <FiArrowUpRight />
          </span>
        </a>
      </aside>

      <button
        className={`menu-btn ${showMenuBtn ? "is-visible" : "is-hidden"}`}
        aria-label="Open menu"
        onClick={() => setMenuOpen(true)}
      >
        <FiGrid />
      </button>

      <aside
        className={`side-menu ${menuOpen ? "is-open" : ""}`}
        onClick={(event) => {
          if (event.target === event.currentTarget) setMenuOpen(false);
        }}
      >
        <div className="side-menu-panel">
          <div className="side-menu-head">
            <p className="dot-title">Menu</p>
            <button aria-label="Close menu" onClick={() => setMenuOpen(false)}>
              <FiX />
            </button>
          </div>
          <nav>
            <ul>
              {drawerAnchors.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToSection(item.id);
                      setMenuOpen(false);
                    }}
                  >
                    <item.icon />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="drawer-social">
            <p className="dot-title">Social Network</p>
            <div className="social-links">
              <Link href={social.twitter} target="_blank" aria-label="Twitter">
                X
              </Link>
              <Link href={social.dribbble} target="_blank" aria-label="Dribbble">
                <FiDribbble />
              </Link>
              <Link href={social.instagram} target="_blank" aria-label="Instagram">
                <FiInstagram />
              </Link>
              <Link href={social.facebook} target="_blank" aria-label="Facebook">
                <FiFacebook />
              </Link>
            </div>
          </div>
        </div>
      </aside>

      <div className={`menu-backdrop ${menuOpen ? "is-open" : ""}`} onClick={() => setMenuOpen(false)} />

      <div className="right-rail">
        {sectionAnchors.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={[
              !pendingId && activeId === item.id ? "active" : "",
              pendingId === item.id ? "pending" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={(event) => {
              event.preventDefault();
              scrollToSection(item.id);
            }}
          >
            <item.icon />
            <span className="tooltip">{item.label}</span>
          </a>
        ))}
      </div>

      <div className={`preloader ${loading ? "is-active" : ""}`}>
        <div className="preloader-inner">
          <span />
          <span />
          <span />
        </div>
      </div>
    </>
  );
}
