/** Plain shapes passed from the server to client components (no Prisma imports). */

export type SiteProfileDTO = {
  id: string;
  displayName: string;
  roleTitle: string;
  summary: string;
  contactEmail: string;
  contactPhone: string;
  location: string;
  linkedinUrl: string;
  githubUrl: string;
  twitterUrl: string;
  dribbbleUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  avatarUrl: string | null;
  signatureUrl: string | null;
  backgroundVideoUrl: string;
  availabilityText: string;
  footerBrandName: string;
  footerMarqueeText: string;
  partnersHeadline: string;
  heroEyebrow: string;
  experienceEyebrow: string;
  experienceSectionTitle: string;
  servicesEyebrow: string;
  aboutEyebrow: string;
  aboutSectionTitle: string;
  testimonialSubtitle: string;
  techStackHeading: string;
  processSectionHeading: string;
  awardsEyebrow: string;
  pricingTitle: string;
  pricingTabStandardLabel: string;
  pricingTabPremiumLabel: string;
  pricingHelpText: string;
  faqHeading: string;
  contactHeading: string;
};

export type SiteContentBundle = {
  profile: SiteProfileDTO;
  heroTags: { id: string; label: string; sortOrder: number }[];
  heroStats: { id: string; label: string; value: string; sortOrder: number }[];
  projects: {
    id: string;
    name: string;
    category: string;
    description: string;
    stats: string | null;
    imageUrl: string | null;
    sortOrder: number;
  }[];
  experiences: {
    id: string;
    company: string;
    title: string;
    period: string;
    points: string[];
    order: number;
  }[];
  services: {
    id: string;
    serviceKey: string;
    title: string;
    points: string[];
    sortOrder: number;
  }[];
  techStack: {
    id: string;
    title: string;
    iconUrl: string;
    text: string;
    sortOrder: number;
  }[];
  testimonials: {
    id: string;
    quote: string;
    authorName: string;
    authorRole: string;
    imageUrl: string;
    sortOrder: number;
  }[];
  partners: { id: string; imageUrl: string; alt: string; sortOrder: number }[];
  processSteps: {
    id: string;
    stepLabel: string;
    title: string;
    description: string;
    iconClass: string;
    sortOrder: number;
  }[];
  awards: { id: string; rankLabel: string; text: string; sortOrder: number }[];
  pricingPlans: {
    id: string;
    slug: string;
    title: string;
    amount: string;
    supportText: string;
    bullets: string[];
    sortOrder: number;
  }[];
  faqItems: { id: string; question: string; answer: string; sortOrder: number }[];
};

export type UiProfile = {
  name: string;
  role: string;
  summary: string;
  contact: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
  };
};

export type UiSocial = {
  twitter: string;
  dribbble: string;
  instagram: string;
  facebook: string;
};

export function toUiProfile(profile: SiteProfileDTO): UiProfile {
  return {
    name: profile.displayName,
    role: profile.roleTitle,
    summary: profile.summary,
    contact: {
      email: profile.contactEmail,
      phone: profile.contactPhone,
      location: profile.location,
      linkedin: profile.linkedinUrl,
      github: profile.githubUrl,
    },
  };
}

export function toUiSocial(profile: SiteProfileDTO): UiSocial {
  return {
    twitter: profile.twitterUrl,
    dribbble: profile.dribbbleUrl,
    instagram: profile.instagramUrl,
    facebook: profile.facebookUrl,
  };
}
