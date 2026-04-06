"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CSSProperties, FormEvent, useEffect, useRef, useState } from "react";
import type { SiteContentBundle } from "@/app/lib/site-content-types";
import { toUiProfile } from "@/app/lib/site-content-types";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiDatabase,
  FiLayers,
  FiPenTool,
  FiSmartphone,
  FiZap,
} from "react-icons/fi";
import nameSignature from "@/assets/Niyas Name-01.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";

type SiteProps = { site: SiteContentBundle };

export function HeroSection({ site }: SiteProps) {
  const profile = toUiProfile(site.profile);
  return (
    <section id="home" className="section section-hero">
      <div className="hero-infor text-body-2 reveal-up">
        {profile.contact.location} | {new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
      </div>
      <div className="main-title">
        <p className="eyebrow reveal-up">{site.profile.heroEyebrow}</p>
        <h1 className="hero-title text-display-2 split-text">{profile.name}</h1>
        <h2 className="hero-subtitle split-text">{profile.role}</h2>
        <p className="hero-summary text-body-2 text-color-change reveal-up">{profile.summary}</p>
      </div>
      <div className="indicators reveal-up">
        <ul className="list-tags">
          {site.heroTags.map((t) => (
            <li key={t.id}>{t.label}</li>
          ))}
        </ul>
        <div className="indicators-wrap">
          {site.heroStats.map((s, i) => (
            <article key={s.id} className={`indicators-item${i === 1 ? " type-1" : ""}`}>
              <p className="indicators-title">{s.label}</p>
              <h3>{s.value}</h3>
            </article>
          ))}
        </div>
      </div>
      <ul className="hero-meta reveal-up">
        <li>{profile.contact.location}</li>
        <li>{profile.contact.email}</li>
        <li>{profile.contact.phone}</li>
      </ul>
    </section>
  );
}

export function ExperienceSection({ site }: SiteProps) {
  return (
    <section id="experience" className="section">
      <p className="eyebrow reveal-up">{site.profile.experienceEyebrow}</p>
      <h3 className="section-title split-text">{site.profile.experienceSectionTitle}</h3>
      <div className="stack-list">
        {site.experiences.map((item) => (
          <article key={item.id} className="stack-card reveal-up">
            <div>
              <h4>{item.company}</h4>
              <p>{item.title}</p>
            </div>
            <span>{item.period}</span>
            {item.points.length > 0 && (
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export function WorksSection({ site }: SiteProps) {
  const bannerCount = Math.max(6, site.projects.length);
  return (
    <section id="works" className="section section-selected-works">
      <div className="banner-slider reveal-up">
        <div className="text-container scroll-banners effect-right">
          {Array.from({ length: bannerCount }).map((_, idx) => (
            <div key={idx} className="banner-text-item">
              <span className="text-display-2">Selected Work</span>
              <span className="dot-circle" />
            </div>
          ))}
        </div>
      </div>
      <div className="works-wrap">
        {site.projects.map((project, index) => (
          <article key={project.id} className="works-item reveal-up">
            <div className="image">
              <Image
                src={
                  project.imageUrl ??
                  `https://wpriverthemes.com/HTML/niyas/asset/images/section/work-${index + 1}.jpg`
                }
                alt={project.name}
                width={1300}
                height={740}
                sizes="(max-width: 767px) 100vw, 70vw"
                className="work-image"
                loading="lazy"
                unoptimized
              />
            </div>
            <div className="content">
              <div className="infor">
                <p className="sub">{project.category}</p>
                <h3 className="title">{project.name}</h3>
                <span className="type-tags">{project.stats ?? ""}</span>
              </div>
              <a href="#contact" className="btn-links" aria-label="Open project">
                <FiArrowUpRight />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ServicesSection({ site }: SiteProps) {
  const [activeService, setActiveService] = useState<string | null>(null);

  const serviceIcons = [FiPenTool, FiSmartphone, FiDatabase, FiLayers, FiZap];

  return (
    <section id="services" className="section section-services">
      <div className="section-services-inner reveal-up">
        <p className="eyebrow">{site.profile.servicesEyebrow}</p>
        <div className="services-wrap">
          {site.services.map((item, index) => {
            const Icon = serviceIcons[index] ?? FiLayers;
            const isActive = activeService === item.serviceKey;
            return (
              <article
                key={item.id}
                className={`service-tile ${isActive ? "is-active" : ""}`}
                data-service-index={index + 1}
              >
                <button
                  type="button"
                  className="service-tile-head"
                  onClick={() =>
                    setActiveService((current) => (current === item.serviceKey ? null : item.serviceKey))
                  }
                  aria-expanded={isActive}
                >
                  <span className="service-tile-title-row">
                    <span className="service-icon" aria-hidden="true">
                      <Icon />
                    </span>
                    <span className="service-tile-title">{item.title}</span>
                  </span>
                  <sup className="service-tile-id">{item.serviceKey}</sup>
                </button>

                <div className={`service-tile-body ${isActive ? "open" : ""}`}>
                  <div className="service-tile-body-inner">
                    <ul className="list-text">
                      {item.points.map((point, pointIndex) => (
                        <li
                          key={point}
                          className="sub-heading service-point"
                          style={{ "--service-stagger": `${pointIndex * 60}ms` } as CSSProperties}
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function AboutSection({ site }: SiteProps) {
  const profile = toUiProfile(site.profile);
  return (
    <section id="about" className="section">
      <p className="eyebrow reveal-up">{site.profile.aboutEyebrow}</p>
      <h3 className="section-title split-text">{site.profile.aboutSectionTitle}</h3>
      <p className="reveal-up">{profile.summary}</p>
      <div className="link-row reveal-up">
        <Link href={profile.contact.linkedin} target="_blank">
          LinkedIn
        </Link>
        <Link href={profile.contact.github} target="_blank">
          GitHub
        </Link>
      </div>
    </section>
  );
}

export function TechStackSection({ site }: SiteProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const swiperRef = useRef<SwiperInstance | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !swiperRef.current) return;
    const swiper = swiperRef.current;
    swiper.autoplay?.stop();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            swiper.autoplay?.start();
            return;
          }
          swiper.autoplay?.stop();
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section section-tech-stack">
      <h2 className="text-display-2 heading reveal-up">{site.profile.techStackHeading}</h2>
      <Swiper
        className="slider-tech-stack reveal-up"
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        spaceBetween={10}
        loop
        speed={1200}
        autoplay={{
          delay: 700,
          disableOnInteraction: false,
        }}
        pagination={{
          el: ".pagination-tech-stack",
          type: "progressbar",
        }}
        breakpoints={{
          768: { slidesPerView: 1.5, spaceBetween: 0 },
          991: { slidesPerView: 1.775, spaceBetween: 0 },
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
        onMouseLeave={() => swiperRef.current?.autoplay?.start()}
      >
        {site.techStack.map((item) => (
          <SwiperSlide key={item.id}>
            <article className="tech-stack-item">
              <h3 className="title">{item.title}</h3>
              <div className="image">
                <Image src={item.iconUrl} alt={item.title} width={86} height={86} unoptimized />
              </div>
              <p className="text-body-1">{item.text}</p>
            </article>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination pagination-tech-stack" />
      </Swiper>
    </section>
  );
}

export function TestimonialSection({ site }: SiteProps) {
  const testimonials = site.testimonials.map((t) => t.quote);
  const customers = site.testimonials.map((t) => ({
    name: t.authorName,
    role: t.authorRole,
    image: t.imageUrl,
  }));
  const [index, setIndex] = useState(0);

  const len = site.testimonials.length;
  const prev = () => setIndex((v) => (v - 1 + len) % len);
  const next = () => setIndex((v) => (v + 1) % len);

  useEffect(() => {
    if (len === 0) return;
    const timer = window.setInterval(() => {
      setIndex((v) => (v + 1) % len);
    }, 3400);
    return () => window.clearInterval(timer);
  }, [len]);

  if (len === 0) {
    return null;
  }

  return (
    <section id="testimonial" className="section section-testimonial">
      <div className="section-testimonial-inner reveal-up">
        <p className="text-body-2 dot-before subtitle">{site.profile.testimonialSubtitle}</p>
        <div className="testimonial-wrap">
          <AnimatePresence mode="wait">
            <motion.h3
              key={`testimonial-${index}`}
              className="text"
              initial={{ opacity: 0, x: 34 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -34 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              {testimonials[index]}
            </motion.h3>
          </AnimatePresence>
          <div className="box-nav style-2">
            <button className="nav-sw" type="button" onClick={prev} aria-label="Previous">
              <FiArrowLeft />
            </button>
            <span className="fraction">
              {index + 1} / {len}
            </span>
            <button className="nav-sw" type="button" onClick={next} aria-label="Next">
              <FiArrowRight />
            </button>
          </div>
        </div>
        <div className="customer-wrap">
          <AnimatePresence mode="wait">
            <motion.div
              key={`customer-${index}`}
              className="customer-info"
              initial={{ opacity: 0, x: 34 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -34 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <Image
                src={customers[index].image}
                alt={customers[index].name}
                width={280}
                height={370}
                unoptimized
              />
              <div className="content">
                <h6 className="name">{customers[index].name}</h6>
                <p className="info">{customers[index].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export function PartnersSection({ site }: SiteProps) {
  return (
    <section id="partners" className="section section-partners">
      <p className="text-body-2 dot-before subtitle reveal-up">Clients</p>
      <h2 className="desc text-color-change text-tab reveal-up">
        <span aria-hidden />
        {site.profile.partnersHeadline}
      </h2>
      <Swiper
        className="slider-partners swiper-auto reveal-up"
        modules={[Autoplay]}
        loop
        speed={4200}
        spaceBetween={20}
        slidesPerView="auto"
        grabCursor
        allowTouchMove
        autoplay={{
          delay: 1,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          reverseDirection: false,
        }}
      >
        {site.partners.map((partner) => (
          <SwiperSlide key={partner.id}>
            <div className="partners-item">
              <Image src={partner.imageUrl} alt={partner.alt} width={120} height={48} unoptimized />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export function ProcessSection({ site }: SiteProps) {
  return (
    <section className="section section-process">
      <h2 className="text-display-2 heading reveal-up">{site.profile.processSectionHeading}</h2>
      <Swiper
        className="slider-process swiper-auto reveal-up"
        modules={[Autoplay]}
        loop
        speed={4300}
        spaceBetween={20}
        slidesPerView="auto"
        centeredSlides
        grabCursor
        allowTouchMove
        autoplay={{
          delay: 1,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          reverseDirection: false,
        }}
      >
        {site.processSteps.map((item) => (
          <SwiperSlide key={item.id}>
            <article className="process-item">
              <div className="content">
                <p className="step">{item.stepLabel}</p>
                <div className="wrap">
                  <h2 className="title">{item.title}</h2>
                  <p className="text">{item.description}</p>
                </div>
              </div>
              <div className="image">
                <div className={`gradient-icon ${item.iconClass}`} />
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export function AwardsSection({ site }: SiteProps) {
  return (
    <section id="awards" className="section">
      <p className="eyebrow reveal-up">{site.profile.awardsEyebrow}</p>
      <div className="awards reveal-up">
        {site.awards.map((a) => (
          <article key={a.id}>
            <span>{a.rankLabel}</span>
            <p>{a.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function PricingSection({ site }: SiteProps) {
  const standard = site.pricingPlans.find((p) => p.slug === "standard");
  const premium = site.pricingPlans.find((p) => p.slug === "premium");
  const [active, setActive] = useState<"standard" | "premium">("standard");

  const currentPlan = active === "standard" ? standard : premium;
  if (!currentPlan) {
    return null;
  }

  return (
    <section id="pricing" className="section section-pricing">
      <div className="heading reveal-up">
        <h2 className="text-display-2 title">{site.profile.pricingTitle}</h2>
        <div className="menu-tab style-1">
          <button
            type="button"
            className={`item sub-heading ${active === "standard" ? "active" : ""}`}
            onClick={() => setActive("standard")}
          >
            {site.profile.pricingTabStandardLabel}
          </button>
          <button
            type="button"
            className={`item sub-heading ${active === "premium" ? "active" : ""}`}
            onClick={() => setActive("premium")}
          >
            {site.profile.pricingTabPremiumLabel}
          </button>
        </div>
      </div>
      <div className="widget-content-tab reveal-up">
        <div className="widget-content-inner active">
          <article className="pricing-item">
            <div className="top">
              <h6 className="title">{currentPlan.title}</h6>
              <p className="text">{site.profile.pricingHelpText}</p>
              <div className="price">
                <span className="number">{currentPlan.amount}</span>
                <span>/ hours</span>
              </div>
            </div>
            <ul className="list-desc">
              {currentPlan.bullets.map((line) => (
                <li key={line} className="desc">
                  {line}
                </li>
              ))}
            </ul>
            <div className="bot-btn">
              <a href="#contact">
                <span>Get Started</span>
                <span className="icon">
                  <FiArrowUpRight />
                </span>
              </a>
            </div>
          </article>
        </div>
      </div>
      <a href="#contact" className="custom-quote">
        <span>Custom Quote</span>
        <span className="icon">
          <FiArrowUpRight />
        </span>
      </a>
    </section>
  );
}

export function FaqSection({ site }: SiteProps) {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  return (
    <section id="faqs" className="section section-faqs">
      <h2 className="text-display-2 heading reveal-up">{site.profile.faqHeading}</h2>
      <div className="accordion-wrap reveal-up">
        {site.faqItems.map((item, idx) => {
          const isActive = activeFaqIndex === idx;
          return (
            <div key={item.id} className={`item faq-item ${isActive ? "active" : ""}`}>
              <button
                type="button"
                className="faq-trigger"
                aria-expanded={isActive}
                onClick={() => setActiveFaqIndex((prev) => (prev === idx ? null : idx))}
              >
                <h6 className="faq-q">{item.question}</h6>
                <span className="faq-icon-button" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="16" height="16" focusable="false">
                    <path d="M12 5V19" />
                    <path d="M5 12H19" />
                  </svg>
                </span>
              </button>
              <div className={`faq-body ${isActive ? "open" : ""}`}>
                <div>
                  <p className="faq-a">{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="ask-me reveal-up">
        <p className="text">Do you have any other questions?</p>
        <a href="#contact" className="link">
          Ask me directly
        </a>
      </div>
    </section>
  );
}

export function ContactSection({ site }: SiteProps) {
  const [status, setStatus] = useState<string>("");
  const [budget, setBudget] = useState("< $1,000");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("Sending...");
    const formData = new FormData(event.currentTarget);
    const payload = {
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setStatus("Unable to submit right now.");
      return;
    }

    event.currentTarget.reset();
    setStatus("Message sent successfully.");
  };

  return (
    <section id="contact" className="section section-contact">
      <div className="section-contact-inner reveal-up">
        <h2 className="contact-heading split-text">{site.profile.contactHeading}</h2>
        <form className="form-contact" onSubmit={onSubmit}>
          <fieldset className="fiel-mail">
            <label>Your Email</label>
            <input name="email" type="email" placeholder="Your Email" required />
          </fieldset>
          <fieldset className="fiel-phone">
            <label>Your Phone</label>
            <input name="phone" type="text" placeholder="Your Phone" required />
          </fieldset>
          <fieldset className="fiel-text">
            <label>Messenger</label>
            <textarea name="message" rows={4} placeholder="Tell me about your project" required />
          </fieldset>
          <input type="hidden" name="budget" value={budget} />
          <div className="pricing-list">
            {["< $1,000", "$1,000 - $5,000", "$5,000 - $10,000", "$10,000 - $20,000", "> $20,000"].map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  className={`choose-item ${budget === item ? "active" : ""}`}
                  onClick={() => setBudget(item)}
                >
                  {item}
                </button>
              ),
            )}
          </div>
          <button type="submit" className="bot-btn">
            <span>Get Started</span>
            <span className="icon">
              <FiArrowUpRight />
            </span>
          </button>
          {status && <p>{status}</p>}
        </form>
      </div>
    </section>
  );
}

export function FooterSection({ site }: SiteProps) {
  const marqueeItems = Array.from({ length: 12 });
  const profile = toUiProfile(site.profile);
  const signatureSrc = site.profile.signatureUrl ?? nameSignature;

  return (
    <footer className="section footer style-1">
      <a href="#contact" className="cta">
        <div className="footer-name-wrap">
          <Image
            src={signatureSrc}
            alt={profile.name}
            width={242}
            height={76}
            className="footer-signature"
            unoptimized={typeof signatureSrc === "string"}
          />
          <p className="footer-name">{site.profile.footerBrandName}</p>
        </div>
        <div className="cta-infiniteslide">
          <div className="infiniteslide-track">
            {marqueeItems.map((_, i) => (
              <div key={`marquee-a-${i}`} className="marquee-child-item">
                <h3 className="marquee-title">{site.profile.footerMarqueeText}</h3>
                <span className="dot" />
              </div>
            ))}
            {marqueeItems.map((_, i) => (
              <div key={`marquee-b-${i}`} className="marquee-child-item" aria-hidden="true">
                <h3 className="marquee-title">{site.profile.footerMarqueeText}</h3>
                <span className="dot" />
              </div>
            ))}
          </div>
        </div>
      </a>
    </footer>
  );
}
