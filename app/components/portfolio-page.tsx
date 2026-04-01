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
import { motion } from "framer-motion";

export function PortfolioPage() {
  useLenis();
  useGsapReveal();

  return (
    <div className="portfolio-root bg-variant-v1">
      <SiteChrome />
      <div className="background-video-wrap" aria-hidden>
        <video
          className="background-video"
          src="https://wpriverthemes.com/HTML/jayden/asset/images/bg-3d/video4.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="background-noise" />
      </div>

      <motion.main
        className="site-main"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.2, 0.65, 0.2, 1] }}
      >
        <div className="content-column">
          <HeroSection />
          <ExperienceSection />
          <WorksSection />
          <ServicesSection />
          <AboutSection />
          <TechStackSection />
          <TestimonialSection />
          <PartnersSection />
          <ProcessSection />
          <AwardsSection />
          <PricingSection />
          <FaqSection />
          <ContactSection />
        </div>
        <FooterSection />
      </motion.main>
    </div>
  );
}
