"use client";

import { useLenis } from "@/app/hooks/use-lenis";
import { useGsapReveal } from "@/app/animations/use-gsap-reveal";
import { SiteChrome } from "@/app/components/site-chrome";
import {
  AboutSection,
  AwardsSection,
  ContactSection,
  ExperienceSection,
  FaqSection,
  FooterSection,
  HeroSection,
  PartnersSection,
  PricingSection,
  ProcessSection,
  ServicesSection,
  TechStackSection,
  TestimonialSection,
  WorksSection,
} from "@/app/sections/portfolio-sections";
import type { SiteContentBundle } from "@/app/lib/site-content-types";
import { motion } from "framer-motion";

export function PortfolioPage({ site }: { site: SiteContentBundle }) {
  useLenis();
  useGsapReveal();

  return (
    <div className="portfolio-root bg-variant-v1">
      <SiteChrome site={site} />
      <div className="background-video-wrap" aria-hidden>
        <video
          className="background-video body-overlay"
          src={site.profile.backgroundVideoUrl}
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      <motion.main
        className="site-main"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.2, 0.65, 0.2, 1] }}
      >
        <div className="content-column">
          <HeroSection site={site} />
          <ExperienceSection site={site} />
          <WorksSection site={site} />
          <ServicesSection site={site} />
          <AboutSection site={site} />
          <TechStackSection site={site} />
          <TestimonialSection site={site} />
          <PartnersSection site={site} />
          <ProcessSection site={site} />
          <AwardsSection site={site} />
          <PricingSection site={site} />
          <FaqSection site={site} />
          <ContactSection site={site} />
        </div>
        <FooterSection site={site} />
      </motion.main>

      <div className="box-gradient1 img_bg-1" aria-hidden />
      <div className="box-gradient1 img_bg-2" aria-hidden />
    </div>
  );
}
