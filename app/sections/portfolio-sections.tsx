"use client";

import Link from "next/link";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { profile, experiences, projects, services } from "@/app/data/resume";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiPlus } from "react-icons/fi";
import nameSignature from "@/assets/Niyas Name-01.png";

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
  return (
    <section id="services" className="section section-services">
      <div className="section-services-inner reveal-up">
        <p className="eyebrow">My Services</p>
        <div className="services-wrap">
        {services.map((item) => (
          <details key={item.id} className="accordion-item collapsed" open={item.id === "01"}>
            <summary className="heading">
              <span className="icon">{item.id}</span>
              <span className="title text-display-2">
                {item.title} <span className="text-body-1">({item.id})</span>
              </span>
            </summary>
            <ul className="list-text">
              {item.points.map((point) => (
                <li key={point} className="sub-heading">
                  {point}
                </li>
              ))}
            </ul>
          </details>
        ))}
        </div>
        <div className="more-infor">
          <p className="worldwide">Available to Worldwide</p>
          <a href="#contact">Contact me</a>
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
  const stackItems = [
    { title: "Flutter", text: "Cross-platform framework for mobile and web" },
    { title: "Firebase", text: "Auth, notifications, and realtime workflows" },
    { title: "PostgreSQL", text: "Relational data backbone for enterprise apps" },
    { title: "Next.js APIs", text: "Backend routes and server-side integrations" },
    { title: "WebSocket", text: "Low-latency sync for live data experiences" },
  ];
  return (
    <section className="section section-tech-stack">
      <h2 className="text-display-2 heading reveal-up">Tech Stack</h2>
      <div className="tech-stack-grid reveal-up">
        {stackItems.map((item) => (
          <article key={item.title} className="tech-stack-item">
            <h3 className="title">{item.title}</h3>
            <div className="image">
              <span>{item.title.slice(0, 2)}</span>
            </div>
            <p className="text-body-1">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function TestimonialSection() {
  const testimonials = [
    "A studio with passionate, professional and full creativity. Much more than I expected. Great services, high quality products and affordable.",
    "A little universe of inspiration where passion meets professionalism and creativity knows no bounds. Exceptional service and stunning outcomes.",
    "This studio is on another level. Super creative, totally professional, and packed with good vibes. Loved the service and quality.",
  ];
  const people = ["Lewis Jones", "niyas", "Musk"];
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((v) => (v - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((v) => (v + 1) % testimonials.length);

  return (
    <section id="testimonial" className="section section-testimonial">
      <div className="section-testimonial-inner reveal-up">
        <p className="eyebrow">Testimonial</p>
        <div className="testimonial-wrap">
          <h3 className="text">&quot; {testimonials[index]} &quot;</h3>
          <div className="box-nav style-2">
            <button className="nav-sw" type="button" onClick={prev} aria-label="Previous">
              <FiArrowLeft />
            </button>
            <span className="fraction">{String(index + 1).padStart(2, "0")}/{String(testimonials.length).padStart(2, "0")}</span>
            <button className="nav-sw" type="button" onClick={next} aria-label="Next">
              <FiArrowRight />
            </button>
          </div>
        </div>
        <div className="customer-wrap">
          <div className="customer-info">
            <Image
              src="https://wpriverthemes.com/HTML/niyas/asset/images/section/customer-1.jpg"
              alt={people[index]}
              width={280}
              height={370}
              unoptimized
            />
            <div className="content">
              <h6 className="name">{people[index]}</h6>
              <p className="info">Ceo of Avade Inc</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PartnersSection() {
  return (
    <section id="partners" className="section section-partners">
      <p className="eyebrow reveal-up">Clients</p>
      <h2 className="desc text-color-change reveal-up">
        Haven offers more than just a place to live it&apos;s a space designed to reflect your unique
        style inspiration
      </h2>
      <div className="partners-slider reveal-up">
        {["PACE", "RIGVED", "NXT", "EDAPT", "SMARTPACE", "TRUCONNECT"].map((name) => (
          <div key={name} className="partners-item">
            <span>{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className="section section-process">
      <h2 className="text-display-2 heading reveal-up">Work Process</h2>
      <div className="process-track reveal-up">
        {[
          { step: "Step 1", title: "Review The Brief" },
          { step: "Step 2", title: "Sketch the Wireframe" },
          { step: "Step 3", title: "Design Progress" },
          { step: "Step 4", title: "Product Examination" },
        ].map((item, idx) => (
          <article key={item.step} className="process-item">
            <div className="content">
              <p className="step">{item.step}</p>
              <div className="wrap">
                <h3 className="title">{item.title}</h3>
                <p className="text">I created digital products with ideas use Figma</p>
              </div>
            </div>
            <div className="image">
              <div className={`gradient-icon gradient-icon-${idx + 1}`} />
            </div>
          </article>
        ))}
      </div>
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
      <div className="widget-content-inner reveal-up">
        {(active === "standard" ? [
          { title: "Standard Plan", amount: "$49", support: "Support 6 months" },
          { title: "Premium Plan", amount: "$99", support: "Support 12 months" },
        ] : [
          { title: "Premium Plan", amount: "$99", support: "Support 12 months" },
          { title: "Standard Plan", amount: "$49", support: "Support 6 months" },
        ]).map((plan) => (
          <article key={plan.title} className="pricing-item">
            <div className="top">
              <h6 className="title">{plan.title}</h6>
              <p className="text">Have design ready to build? Or small budget?</p>
              <div className="price">
                <span className="number">{plan.amount}</span>
                <span>/ hours</span>
              </div>
            </div>
            <ul className="list-desc">
              <li className="desc">Need your wireframe</li>
              <li className="desc">Design with Figma, Framer</li>
              <li className="desc">Implement with Webflow, React, WordPress, Laravel/PHP</li>
              <li className="desc">Remote/Online</li>
              <li className="desc">Work in business days, no weekend.</li>
              <li className="desc">{plan.support}</li>
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
        ))}
      </div>
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
  return ( 
    <section id="faqs" className="section section-faqs">
      <h2 className="text-display-2 heading reveal-up">FAQs</h2>
      <div className="accordion-wrap reveal-up">
        {faqItems.map((question, idx) => (
          <details key={question} className="item accordion-item" open={idx === 0}>
            <summary className="accordion-head">
              <h6>{question}</h6>
              <span className="icon">
                <FiPlus />
              </span>
            </summary>
            <div className="accordion-collapse">
              <p>
                I specialize in UX/UI design, web development, and branding for individuals and
                businesses.
              </p>
            </div>
          </details>
        ))}
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
