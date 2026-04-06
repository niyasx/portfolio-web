"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export function useGsapReveal(scopeSelector = "body") {
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const splitElements = gsap.utils.toArray<HTMLElement>(".split-text");
      splitElements.forEach((element) => {
        const split = new SplitType(element, { types: "words,chars" });
        gsap.from(split.chars, {
          x: 50,
          opacity: 0,
          duration: 0.9,
          stagger: 0.02,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 86%",
            toggleActions: "play none none reset",
            once: true,
            fastScrollEnd: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 60, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".text-color-change").forEach((element) => {
        const split = new SplitType(element, { types: "chars" });
        gsap.fromTo(
          split.chars,
          { color: "rgba(221,221,221,0.3)" },
          {
            color: "#ffffff",
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              end: "bottom 35%",
              scrub: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".section").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 160, rotateX: -14, transformOrigin: "top center -120", force3D: true },
          {
            y: 0,
            rotateX: 0,
            ease: "power1.out",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "top 45%",
              scrub: 1.35,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".scroll-banners.effect-right").forEach((element) => {
        gsap.to(element, {
          x: "-30%",
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });

      gsap.to(".menu-btn", {
        backgroundColor: "rgba(0,0,0,0.86)",
        borderColor: "rgba(255,255,255,0.25)",
        scrollTrigger: {
          trigger: ".site-main",
          start: "top top",
          end: "bottom bottom",
          toggleActions: "play none none reverse",
        },
      });

      gsap.utils.toArray<HTMLElement>(".glass-card").forEach((element) => {
        gsap.fromTo(
          element,
          { yPercent: 10 },
          {
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      const titleProgress = gsap.utils.toArray<HTMLElement>(".section-title-progress");
      if (titleProgress.length > 0) {
        gsap.fromTo(
          titleProgress,
          { backgroundPositionX: "100%" },
          {
            backgroundPositionX: "0%",
            ease: "none",
            scrollTrigger: {
              trigger: ".site-main",
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          },
        );
      }
    }, document.querySelector(scopeSelector) ?? undefined);

    return () => context.revert();
  }, [scopeSelector]);
}
