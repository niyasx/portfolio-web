"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CSSProperties, FormEvent, useEffect, useRef, useState } from "react";
import { profile, experiences, projects, services } from "@/app/data/resume";
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

export function HeroSection() {
  return (
    <section id="home" className="section section-hero">
      <div className="hero-infor text-body-2 reveal-up">
        {profile.contact.location} | {new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
      </div>
      <div className="main-title">
        <p className="eyebrow reveal-up">Introduction</p>
        <h1 className="hero-title text-display-2 split-text">{profile.name}</h1>
        <h2 className="hero-subtitle split-text">{profile.role}</h2>
        <p className="hero-summary text-body-2 text-color-change reveal-up">{profile.summary}</p>
      </div>
      <div className="indicators reveal-up">
        <ul className="list-tags">
          <li>Flutter</li>
          <li>Next.js APIs</li>
          <li>WebSocket</li>
          <li>PostgreSQL</li>
        </ul>
        <div className="indicators-wrap">
          <article className="indicators-item">
            <p className="indicators-title">Net Worth Gross</p>
            <h3>10M+</h3>
          </article>
          <article className="indicators-item type-1">
            <p className="indicators-title">Success Rate</p>
            <h3>100%</h3>
          </article>
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

export function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <p className="eyebrow reveal-up">Experiences</p>
      <h3 className="section-title split-text">Building products users rely on every day</h3>
      <div className="stack-list">
        {experiences.map((item) => (
          <article key={`${item.company}-${item.period}`} className="stack-card reveal-up">
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

export function WorksSection() {
  return (
    <section id="works" className="section section-selected-works">
      <div className="banner-slider reveal-up">
        <div className="text-container scroll-banners effect-right">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="banner-text-item">
              <span className="text-display-2">Selected Work</span>
              <span className="dot-circle" />
            </div>
          ))}
        </div>
      </div>
      <div className="works-wrap">
        {projects.map((project, index) => (
          <article key={project.name} className="works-item reveal-up">
            <div className="image">
              <Image
                src={`https://wpriverthemes.com/HTML/niyas/asset/images/section/work-${index + 1}.jpg`}
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
                <span className="type-tags">{project.stats}</span>
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

export function ServicesSection() {
  const [activeService, setActiveService] = useState<string | null>(null);

  const serviceIcons = [FiPenTool, FiSmartphone, FiDatabase, FiLayers, FiZap];

  return (
    <section id="services" className="section section-services">
      <div className="section-services-inner reveal-up">
        <p className="eyebrow">My Services</p>
        <div className="services-wrap">
          {services.map((item, index) => {
            const Icon = serviceIcons[index] ?? FiLayers;
            const isActive = activeService === item.id;
            return (
              <article
                key={item.id}
                className={`service-tile ${isActive ? "is-active" : ""}`}
                data-service-index={index + 1}
              >
                <button
                  type="button"
                  className="service-tile-head"
                  onClick={() => setActiveService((current) => (current === item.id ? null : item.id))}
                  aria-expanded={isActive}
                >
                  <span className="service-tile-title-row">
                    <span className="service-icon" aria-hidden="true">
                      <Icon />
                    </span>
                    <span className="service-tile-title">{item.title}</span>
                  </span>
                  <sup className="service-tile-id">{item.id}</sup>
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

export function AboutSection() {
  return (
    <section id="about" className="section">
      <p className="eyebrow reveal-up">About Me</p>
      <h3 className="section-title split-text">Clean architecture with practical product delivery.</h3>
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

export function TechStackSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const swiperRef = useRef<SwiperInstance | null>(null);

  const stackItems = [
    {
      title: "Flutter",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
      text: "Cross-platform apps for Android, iOS, and web",
    },
    {
      title: "Dart",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
      text: "Modern language powering fast UI and app logic",
    },
    {
      title: "Firebase",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
      text: "Authentication, push notifications, and cloud services",
    },
    {
      title: "PostgreSQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      text: "Reliable relational database for enterprise systems",
    },
    {
      title: "Next.js APIs",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      text: "Server routes and integrations for backend workflows",
    },
  ];

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
      <h2 className="text-display-2 heading reveal-up">Tech Stack</h2>
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
        {stackItems.map((item) => (
          <SwiperSlide key={item.title}>
            <article className="tech-stack-item">
              <h3 className="title">{item.title}</h3>
              <div className="image">
                <Image src={item.icon} alt={item.title} width={86} height={86} unoptimized />
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

export function TestimonialSection() {
  const testimonials = [
    "“ A studio with passionate, professional and full creativity. Much more than i’m expect. Great services, high quality products & affordable. ”",
    "“ A little universe of inspiration — where passion meets professionalism and creativity knows no bounds. Exceptional service, stunning products that made me go 'wow' at first glance, and prices that make you smile! ”",
    "“ This studio is on another level! Super creative, totally pro, and packed with good vibes. Loved the service, obsessed with the quality — and the prices? Totally worth it! ”",
  ];
  const customers = [
    {
      name: "Lewis Jones",
      role: "Ceo of Avade Inc",
      image: "https://wpriverthemes.com/HTML/jayden/asset/images/avatar/avatar-2.jpg",
    },
    {
      name: "jayden",
      role: "Ceo of Avade Inc",
      image: "https://wpriverthemes.com/HTML/jayden/asset/images/avatar/avatar-3.jpg",
    },
    {
      name: "Musk",
      role: "Ceo of Avade Inc",
      image: "https://wpriverthemes.com/HTML/jayden/asset/images/avatar/avatar-4.jpg",
    },
  ] as const;
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((v) => (v - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((v) => (v + 1) % testimonials.length);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((v) => (v + 1) % testimonials.length);
    }, 3400);
    return () => window.clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section id="testimonial" className="section section-testimonial">
      <div className="section-testimonial-inner reveal-up">
        <p className="text-body-2 dot-before subtitle">Testimonial</p>
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
              {index + 1} / {testimonials.length}
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

export function PartnersSection() {
  const partners = [
    { src: "/assets/images/partners/logo_zm.svg", alt: "Logo ZM" },
    { src: "/assets/images/partners/Union.svg", alt: "Union" },
    { src: "/assets/images/partners/archin.svg", alt: "Archin" },
    { src: "/assets/images/partners/Symbol.svg", alt: "Symbol" },
    { src: "/assets/images/partners/Github_logo.svg", alt: "Github" },
  ] as const;

  return (
    <section id="partners" className="section section-partners">
      <p className="text-body-2 dot-before subtitle reveal-up">Clients</p>
      <h2 className="desc text-color-change text-tab reveal-up">
        <span aria-hidden />
        Haven offers more than just a place to live it&apos;s a space designed to reflect your unique
        style inspiration
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
        {partners.map((partner) => (
          <SwiperSlide key={partner.src}>
            <div className="partners-item">
              <Image src={partner.src} alt={partner.alt} width={120} height={48} unoptimized />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export function ProcessSection() {
  const steps = [
    {
      step: "Step 1",
      title: "Review The Brief",
      description:
        "Understand project goals, tech stack requirements, and delivery expectations.",
      icon: "gradient-icon-1",
    },
    {
      step: "Step 2",
      title: "Plan Architecture",
      description:
        "Design clean architecture, folder structure, and API contracts.",
      icon: "gradient-icon-2",
    },
    {
      step: "Step 3",
      title: "Development Sprint",
      description:
        "Build iteratively with weekly deliverables and continuous testing.",
      icon: "gradient-icon-3",
    },
    {
      step: "Step 4",
      title: "Deploy & Handover",
      description:
        "CI/CD deployment, documentation, and full post-launch support.",
      icon: "gradient-icon-4",
    },
  ] as const;

  return (
    <section className="section section-process">
      <h2 className="text-display-2 heading reveal-up">Work Process</h2>
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
        {steps.map((item) => (
          <SwiperSlide key={item.step}>
            <article className="process-item">
              <div className="content">
                <p className="step">{item.step}</p>
                <div className="wrap">
                  <h2 className="title">{item.title}</h2>
                  <p className="text">{item.description}</p>
                </div>
              </div>
              <div className="image">
                <div className={`gradient-icon ${item.icon}`} />
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export function AwardsSection() {
  return (
    <section id="awards" className="section">
      <p className="eyebrow reveal-up">My Awards</p>
      <div className="awards reveal-up">
        <article>
          <span>01</span>
          <p>Managed 20,000+ users across 9 schools</p>
        </article>
        <article>
          <span>02</span>
          <p>Production delivery across 10+ applications</p>
        </article>
        <article>
          <span>03</span>
          <p>Optimized apps to consistent 60fps performance</p>
        </article>
      </div>
    </section>
  );
}

export function PricingSection() {
  const [active, setActive] = useState<"standard" | "premium">("standard");
  const plans = {
    standard: { title: "Standard Plan", amount: "$49", support: "Support 6 months" },
    premium: { title: "Premium Plan", amount: "$99", support: "Support 12 months" },
  } as const;
  const currentPlan = plans[active];

  return (
    <section id="pricing" className="section section-pricing">
      <div className="heading reveal-up">
        <h2 className="text-display-2 title">My Pricing</h2>
        <div className="menu-tab style-1">
          <button
            type="button"
            className={`item sub-heading ${active === "standard" ? "active" : ""}`}
            onClick={() => setActive("standard")}
          >
            Standard Plan
          </button>
          <button
            type="button"
            className={`item sub-heading ${active === "premium" ? "active" : ""}`}
            onClick={() => setActive("premium")}
          >
            Premium Plan
          </button>
        </div>
      </div>
      <div className="widget-content-tab reveal-up">
        <div className="widget-content-inner active">
          <article className="pricing-item">
            <div className="top">
              <h6 className="title">{currentPlan.title}</h6>
              <p className="text">Have design ready to build? Or small budget?</p>
              <div className="price">
                <span className="number">{currentPlan.amount}</span>
                <span>/ hours</span>
              </div>
            </div>
            <ul className="list-desc">
              <li className="desc">Need your wireframe</li>
              <li className="desc">Design with Figma, Framer</li>
              <li className="desc">Implement with Webflow, React, WordPress, Laravel/PHP</li>
              <li className="desc">Remote/Online</li>
              <li className="desc">Work in business days, no weekend.</li>
              <li className="desc">{currentPlan.support}</li>
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

export function FaqSection() {
  const faqItems = [
    "What's the niyas's progress like?",
    "Design delivery time estimate?",
    "What services do you offer?",
    "What if I don’t like design?",
    "Are there any refund?",
  ];
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  return (
    <section id="faqs" className="section section-faqs">
      <h2 className="text-display-2 heading reveal-up">FAQs</h2>
      <div className="accordion-wrap reveal-up">
        {faqItems.map((question, idx) => {
          const isActive = activeFaqIndex === idx;
          return (
            <div key={question} className={`item faq-item ${isActive ? "active" : ""}`}>
              <button
                type="button"
                className="faq-trigger"
                aria-expanded={isActive}
                onClick={() => setActiveFaqIndex((prev) => (prev === idx ? null : idx))}
              >
                <h6 className="faq-q">{question}</h6>
                <span className="faq-icon-button" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="16" height="16" focusable="false">
                    <path d="M12 5V19" />
                    <path d="M5 12H19" />
                  </svg>
                </span>
              </button>
              <div className={`faq-body ${isActive ? "open" : ""}`}>
                <div>
                  <p className="faq-a">
                    I specialize in UX/UI design, web development, and branding for individuals and
                    businesses.
                  </p>
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

export function ContactSection() {
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
        <h2 className="contact-heading split-text">Contact For Work</h2>
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

export function FooterSection() {
  const marqueeItems = Array.from({ length: 12 });

  return (
    <footer className="section footer style-1">
      <a href="#contact" className="cta">
        <div className="footer-name-wrap">
          <Image
            src={nameSignature}
            alt={profile.name}
            width={242}
            height={76}
            className="footer-signature"
          />
          <p className="footer-name">niyas</p>
        </div>
        <div className="cta-infiniteslide">
          <div className="infiniteslide-track">
            {marqueeItems.map((_, i) => (
              <div key={`marquee-a-${i}`} className="marquee-child-item">
                <h3 className="marquee-title">Book A Call</h3>
                <span className="dot" />
              </div>
            ))}
            {marqueeItems.map((_, i) => (
              <div key={`marquee-b-${i}`} className="marquee-child-item" aria-hidden="true">
                <h3 className="marquee-title">Book A Call</h3>
                <span className="dot" />
              </div>
            ))}
          </div>
        </div>
      </a>
    </footer>
  );
}
