import { unstable_cache } from "next/cache";
import { prisma } from "@/app/lib/prisma";
import type { SiteContentBundle, SiteProfileDTO } from "@/app/lib/site-content-types";

function mapProfile(row: {
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
  createdAt?: Date;
  updatedAt?: Date;
}): SiteProfileDTO {
  const {
    id,
    displayName,
    roleTitle,
    summary,
    contactEmail,
    contactPhone,
    location,
    linkedinUrl,
    githubUrl,
    twitterUrl,
    dribbbleUrl,
    instagramUrl,
    facebookUrl,
    avatarUrl,
    signatureUrl,
    backgroundVideoUrl,
    availabilityText,
    footerBrandName,
    footerMarqueeText,
    partnersHeadline,
    heroEyebrow,
    experienceEyebrow,
    experienceSectionTitle,
    servicesEyebrow,
    aboutEyebrow,
    aboutSectionTitle,
    testimonialSubtitle,
    techStackHeading,
    processSectionHeading,
    awardsEyebrow,
    pricingTitle,
    pricingTabStandardLabel,
    pricingTabPremiumLabel,
    pricingHelpText,
    faqHeading,
    contactHeading,
  } = row;
  return {
    id,
    displayName,
    roleTitle,
    summary,
    contactEmail,
    contactPhone,
    location,
    linkedinUrl,
    githubUrl,
    twitterUrl,
    dribbbleUrl,
    instagramUrl,
    facebookUrl,
    avatarUrl,
    signatureUrl,
    backgroundVideoUrl,
    availabilityText,
    footerBrandName,
    footerMarqueeText,
    partnersHeadline,
    heroEyebrow,
    experienceEyebrow,
    experienceSectionTitle,
    servicesEyebrow,
    aboutEyebrow,
    aboutSectionTitle,
    testimonialSubtitle,
    techStackHeading,
    processSectionHeading,
    awardsEyebrow,
    pricingTitle,
    pricingTabStandardLabel,
    pricingTabPremiumLabel,
    pricingHelpText,
    faqHeading,
    contactHeading,
  };
}

async function loadSiteContent(): Promise<SiteContentBundle | null> {
  const profileRow = await prisma.siteProfile.findUnique({ where: { id: "default" } });
  if (!profileRow) return null;

  const [
    heroTags,
    heroStats,
    projects,
    experiences,
    services,
    techStack,
    testimonials,
    partners,
    processSteps,
    awards,
    pricingPlans,
    faqItems,
  ] = await Promise.all([
    prisma.heroTag.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.heroStat.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.projects.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.experience.findMany({ orderBy: { order: "asc" } }),
    prisma.service.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.techStackItem.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.partner.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.processStep.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.award.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.pricingPlan.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.faqItem.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  return {
    profile: mapProfile(profileRow),
    heroTags,
    heroStats,
    projects,
    experiences,
    services,
    techStack,
    testimonials,
    partners,
    processSteps,
    awards,
    pricingPlans,
    faqItems,
  };
}

export const getSiteContent = unstable_cache(loadSiteContent, ["site-content"], {
  tags: ["site-content"],
  revalidate: false,
});
