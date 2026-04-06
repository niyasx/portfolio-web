import { PrismaClient } from "../generated/prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction([
    prisma.faqItem.deleteMany(),
    prisma.pricingPlan.deleteMany(),
    prisma.award.deleteMany(),
    prisma.processStep.deleteMany(),
    prisma.partner.deleteMany(),
    prisma.testimonial.deleteMany(),
    prisma.techStackItem.deleteMany(),
    prisma.service.deleteMany(),
    prisma.experience.deleteMany(),
    prisma.projects.deleteMany(),
    prisma.heroStat.deleteMany(),
    prisma.heroTag.deleteMany(),
  ]);

  await prisma.siteProfile.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      displayName: "NIYAS ABDUL BASHEER",
      roleTitle: "SOFTWARE DEVELOPER",
      summary:
        "Results-driven Flutter Developer with 2+ years of experience building scalable cross-platform mobile and web applications using Flutter, Dart, Firebase, and REST APIs. Delivered multiple production-ready enterprise applications across e-commerce, logistics, and construction sectors serving 10,000+ users. Expert in Clean Architecture, MVVM, state management (GetX, Provider), WebSocket real-time sync, and OAuth/SSO authentication. Proven track record in performance optimization, payment gateway integration, and responsive UI/UX design.",
      contactEmail: "niyasx0011@gmail.com",
      contactPhone: "+971 567948233",
      location: "Dubai, UAE",
      linkedinUrl: "https://www.linkedin.com/in/niyas01",
      githubUrl: "https://github.com/niyasx",
      twitterUrl: "https://x.com",
      dribbbleUrl: "https://dribbble.com",
      instagramUrl: "https://instagram.com",
      facebookUrl: "https://facebook.com",
      avatarUrl: null,
      signatureUrl: null,
      backgroundVideoUrl: "https://wpriverthemes.com/HTML/jayden/asset/images/bg-3d/video4.mp4",
      availabilityText: "Available for 3 projects",
      footerBrandName: "niyas",
      footerMarqueeText: "Book A Call",
      partnersHeadline:
        "Haven offers more than just a place to live it's a space designed to reflect your unique style inspiration",
      heroEyebrow: "Introduction",
      experienceEyebrow: "Experiences",
      experienceSectionTitle: "Building products users rely on every day",
      servicesEyebrow: "My Services",
      aboutEyebrow: "About Me",
      aboutSectionTitle: "Clean architecture with practical product delivery.",
      testimonialSubtitle: "Testimonial",
      techStackHeading: "Tech Stack",
      processSectionHeading: "Work Process",
      awardsEyebrow: "My Awards",
      pricingTitle: "My Pricing",
      pricingTabStandardLabel: "Standard Plan",
      pricingTabPremiumLabel: "Premium Plan",
      pricingHelpText: "Have design ready to build? Or small budget?",
      faqHeading: "FAQs",
      contactHeading: "Contact For Work",
    },
    update: {},
  });

  await prisma.heroTag.createMany({
    data: [
      { label: "Flutter", sortOrder: 0 },
      { label: "Next.js APIs", sortOrder: 1 },
      { label: "WebSocket", sortOrder: 2 },
      { label: "PostgreSQL", sortOrder: 3 },
    ],
  });

  await prisma.heroStat.createMany({
    data: [
      { label: "Net Worth Gross", value: "10M+", sortOrder: 0 },
      { label: "Success Rate", value: "100%", sortOrder: 1 },
    ],
  });

  const projectRows = [
    {
      name: "ShreeSahyog",
      category: "Enterprise bidding platform",
      description: "SSO authentication, RBAC, WebSockets",
      stats: "500+ concurrent users",
      imageUrl: "https://wpriverthemes.com/HTML/niyas/asset/images/section/work-1.jpg",
      sortOrder: 0,
    },
    {
      name: "HerNeeds",
      category: "Charity + education platform",
      description: "Payment gateway integration",
      stats: "Firebase auth + notifications",
      imageUrl: "https://wpriverthemes.com/HTML/niyas/asset/images/section/work-2.jpg",
      sortOrder: 1,
    },
    {
      name: "TruConnect",
      category: "E-commerce platform (5000+ products)",
      description: "Real-time tracking, chat, filters",
      stats: "Performance optimized by 50%",
      imageUrl: "https://wpriverthemes.com/HTML/niyas/asset/images/section/work-3.jpg",
      sortOrder: 2,
    },
  ];
  for (const p of projectRows) {
    await prisma.projects.create({ data: p });
  }

  const expRows = [
    {
      company: "PACE Group (UAE)",
      title: "Flutter Developer (Full Stack)",
      period: "Dec 2025 - Present",
      points: [
        "Sole developer handling 10+ applications across Android, iOS, Web, Linux servers",
        "Managed ecosystem of 20,000+ users across 9 schools",
        "Built SmartPACE system (student, parent, staff apps + admin panel)",
        "Implemented PostgreSQL + Next.js backend APIs",
        "Built real-time transport tracking using MQTT + Google Maps",
        "Developed attendance system with ZKTeco + cron sync",
        "Integrated Firebase notifications, payment systems, ERP sync",
        "Managed full CI/CD and deployments",
      ],
      order: 0,
    },
    {
      company: "Rigved Infotech",
      title: "Frontend Developer",
      period: "Apr 2024 - Aug 2025",
      points: [
        "Delivered 5+ enterprise Flutter apps (10,000+ users)",
        "Built ShreeSahyog platform with SSO, RBAC, WebSockets",
        "Improved performance by 30% (60fps optimization)",
        "Mentored 3 developers",
      ],
      order: 1,
    },
    {
      company: "New Xtended Technology",
      title: "Flutter Developer",
      period: "Dec 2023 - Mar 2024",
      points: [],
      order: 2,
    },
    {
      company: "Edapt",
      title: "Flutter Intern",
      period: "May 2023 - Dec 2023",
      points: [],
      order: 3,
    },
  ];
  for (const e of expRows) {
    await prisma.experience.create({ data: e });
  }

  const serviceRows = [
    {
      serviceKey: "01",
      title: "Cross-Platform Application Development",
      points: ["Flutter architecture", "Responsive UI systems", "Scalable app modules"],
      sortOrder: 0,
    },
    {
      serviceKey: "02",
      title: "Backend API Integration",
      points: ["REST APIs", "WebSocket sync", "OAuth and JWT security"],
      sortOrder: 1,
    },
    {
      serviceKey: "03",
      title: "Enterprise Solution Engineering",
      points: ["RBAC and SSO", "PostgreSQL systems", "Deployment and CI/CD"],
      sortOrder: 2,
    },
    {
      serviceKey: "04",
      title: "Performance Optimization",
      points: ["60fps rendering", "App profiling", "Caching and reliability"],
      sortOrder: 3,
    },
  ];
  for (const s of serviceRows) {
    await prisma.service.create({ data: s });
  }

  const techRows = [
    {
      title: "Flutter",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
      text: "Cross-platform apps for Android, iOS, and web",
      sortOrder: 0,
    },
    {
      title: "Dart",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
      text: "Modern language powering fast UI and app logic",
      sortOrder: 1,
    },
    {
      title: "Firebase",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
      text: "Authentication, push notifications, and cloud services",
      sortOrder: 2,
    },
    {
      title: "PostgreSQL",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      text: "Reliable relational database for enterprise systems",
      sortOrder: 3,
    },
    {
      title: "Next.js APIs",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      text: "Server routes and integrations for backend workflows",
      sortOrder: 4,
    },
  ];
  for (const t of techRows) {
    await prisma.techStackItem.create({ data: t });
  }

  const testimonialRows = [
    {
      quote:
        "“ A studio with passionate, professional and full creativity. Much more than i'm expect. Great services, high quality products & affordable. ”",
      authorName: "Lewis Jones",
      authorRole: "Ceo of Avade Inc",
      imageUrl: "https://wpriverthemes.com/HTML/jayden/asset/images/avatar/avatar-2.jpg",
      sortOrder: 0,
    },
    {
      quote:
        "“ A little universe of inspiration — where passion meets professionalism and creativity knows no bounds. Exceptional service, stunning products that made me go 'wow' at first glance, and prices that make you smile! ”",
      authorName: "jayden",
      authorRole: "Ceo of Avade Inc",
      imageUrl: "https://wpriverthemes.com/HTML/jayden/asset/images/avatar/avatar-3.jpg",
      sortOrder: 1,
    },
    {
      quote:
        "“ This studio is on another level! Super creative, totally pro, and packed with good vibes. Loved the service, obsessed with the quality — and the prices? Totally worth it! ”",
      authorName: "Musk",
      authorRole: "Ceo of Avade Inc",
      imageUrl: "https://wpriverthemes.com/HTML/jayden/asset/images/avatar/avatar-4.jpg",
      sortOrder: 2,
    },
  ];
  for (const tm of testimonialRows) {
    await prisma.testimonial.create({ data: tm });
  }

  const partnerRows = [
    { imageUrl: "/assets/images/partners/logo_zm.svg", alt: "Logo ZM", sortOrder: 0 },
    { imageUrl: "/assets/images/partners/Union.svg", alt: "Union", sortOrder: 1 },
    { imageUrl: "/assets/images/partners/archin.svg", alt: "Archin", sortOrder: 2 },
    { imageUrl: "/assets/images/partners/Symbol.svg", alt: "Symbol", sortOrder: 3 },
    { imageUrl: "/assets/images/partners/Github_logo.svg", alt: "Github", sortOrder: 4 },
  ];
  for (const p of partnerRows) {
    await prisma.partner.create({ data: p });
  }

  const processRows = [
    {
      stepLabel: "Step 1",
      title: "Review The Brief",
      description: "Understand project goals, tech stack requirements, and delivery expectations.",
      iconClass: "gradient-icon-1",
      sortOrder: 0,
    },
    {
      stepLabel: "Step 2",
      title: "Plan Architecture",
      description: "Design clean architecture, folder structure, and API contracts.",
      iconClass: "gradient-icon-2",
      sortOrder: 1,
    },
    {
      stepLabel: "Step 3",
      title: "Development Sprint",
      description: "Build iteratively with weekly deliverables and continuous testing.",
      iconClass: "gradient-icon-3",
      sortOrder: 2,
    },
    {
      stepLabel: "Step 4",
      title: "Deploy & Handover",
      description: "CI/CD deployment, documentation, and full post-launch support.",
      iconClass: "gradient-icon-4",
      sortOrder: 3,
    },
  ];
  for (const p of processRows) {
    await prisma.processStep.create({ data: p });
  }

  await prisma.award.createMany({
    data: [
      { rankLabel: "01", text: "Managed 20,000+ users across 9 schools", sortOrder: 0 },
      { rankLabel: "02", text: "Production delivery across 10+ applications", sortOrder: 1 },
      { rankLabel: "03", text: "Optimized apps to consistent 60fps performance", sortOrder: 2 },
    ],
  });

  const faqAnswer =
    "I specialize in UX/UI design, web development, and branding for individuals and businesses.";
  await prisma.faqItem.createMany({
    data: [
      { question: "What's the niyas's progress like?", answer: faqAnswer, sortOrder: 0 },
      { question: "Design delivery time estimate?", answer: faqAnswer, sortOrder: 1 },
      { question: "What services do you offer?", answer: faqAnswer, sortOrder: 2 },
      { question: "What if I don’t like design?", answer: faqAnswer, sortOrder: 3 },
      { question: "Are there any refund?", answer: faqAnswer, sortOrder: 4 },
    ],
  });

  const sharedBullets = [
    "Need your wireframe",
    "Design with Figma, Framer",
    "Implement with Webflow, React, WordPress, Laravel/PHP",
    "Remote/Online",
    "Work in business days, no weekend.",
  ];

  await prisma.pricingPlan.createMany({
    data: [
      {
        slug: "standard",
        title: "Standard Plan",
        amount: "$49",
        supportText: "Support 6 months",
        bullets: [...sharedBullets, "Support 6 months"],
        sortOrder: 0,
      },
      {
        slug: "premium",
        title: "Premium Plan",
        amount: "$99",
        supportText: "Support 12 months",
        bullets: [...sharedBullets, "Support 12 months"],
        sortOrder: 1,
      },
    ],
  });

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await prisma.adminUser.upsert({
      where: { email: adminEmail },
      create: { email: adminEmail, passwordHash },
      update: { email: adminEmail, passwordHash },
    });
    console.log("Admin user upserted:", adminEmail);
  } else {
    console.log("Skip admin user (set ADMIN_EMAIL and ADMIN_PASSWORD to seed admin).");
  }

  console.log("Seed completed.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
