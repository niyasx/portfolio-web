"use server";

import { prisma } from "@/app/lib/prisma";
import { requireAdminSession } from "@/app/lib/require-admin";
import { revalidateSiteContent } from "@/app/lib/revalidate-site";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function s(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function opt(formData: FormData, key: string) {
  const v = String(formData.get(key) ?? "").trim();
  return v === "" ? null : v;
}

type AdminFlashType = "success" | "error";

async function setAdminFlash(type: AdminFlashType, message: string) {
  const store = await cookies();
  store.set("admin_flash", `${type}|${message}`, {
    path: "/admin",
    maxAge: 20,
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
}

async function completeAdminAction(path: string, message: string) {
  await setAdminFlash("success", message);
  redirect(path);
}

export async function updateSiteProfileAction(formData: FormData) {
  await requireAdminSession();
  await prisma.siteProfile.update({
    where: { id: "default" },
    data: {
      displayName: s(formData, "displayName"),
      roleTitle: s(formData, "roleTitle"),
      summary: s(formData, "summary"),
      contactEmail: s(formData, "contactEmail"),
      contactPhone: s(formData, "contactPhone"),
      location: s(formData, "location"),
      linkedinUrl: s(formData, "linkedinUrl"),
      githubUrl: s(formData, "githubUrl"),
      twitterUrl: s(formData, "twitterUrl"),
      dribbbleUrl: s(formData, "dribbbleUrl"),
      instagramUrl: s(formData, "instagramUrl"),
      facebookUrl: s(formData, "facebookUrl"),
      avatarUrl: opt(formData, "avatarUrl"),
      signatureUrl: opt(formData, "signatureUrl"),
      backgroundVideoUrl: s(formData, "backgroundVideoUrl"),
      availabilityText: s(formData, "availabilityText"),
      footerBrandName: s(formData, "footerBrandName"),
      footerMarqueeText: s(formData, "footerMarqueeText"),
      partnersHeadline: s(formData, "partnersHeadline"),
      heroEyebrow: s(formData, "heroEyebrow"),
      experienceEyebrow: s(formData, "experienceEyebrow"),
      experienceSectionTitle: s(formData, "experienceSectionTitle"),
      servicesEyebrow: s(formData, "servicesEyebrow"),
      aboutEyebrow: s(formData, "aboutEyebrow"),
      aboutSectionTitle: s(formData, "aboutSectionTitle"),
      testimonialSubtitle: s(formData, "testimonialSubtitle"),
      techStackHeading: s(formData, "techStackHeading"),
      processSectionHeading: s(formData, "processSectionHeading"),
      awardsEyebrow: s(formData, "awardsEyebrow"),
      pricingTitle: s(formData, "pricingTitle"),
      pricingTabStandardLabel: s(formData, "pricingTabStandardLabel"),
      pricingTabPremiumLabel: s(formData, "pricingTabPremiumLabel"),
      pricingHelpText: s(formData, "pricingHelpText"),
      faqHeading: s(formData, "faqHeading"),
      contactHeading: s(formData, "contactHeading"),
    },
  });
  revalidateSiteContent();
  revalidatePath("/admin/profile");
  await completeAdminAction("/admin/profile", "Profile updated.");
}

export async function syncHeroTagsAction(formData: FormData) {
  await requireAdminSession();
  const raw = s(formData, "tags");
  const labels = raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  await prisma.$transaction([prisma.heroTag.deleteMany(), prisma.heroTag.createMany({ data: labels.map((label, i) => ({ label, sortOrder: i })) })]);
  revalidateSiteContent();
  revalidatePath("/admin/hero");
  await completeAdminAction("/admin/hero", "Hero tags updated.");
}

export async function syncHeroStatsAction(formData: FormData) {
  await requireAdminSession();
  const raw = s(formData, "stats");
  const lines = raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const rows = lines.map((line, i) => {
    const [label, value] = line.split("|").map((x) => x.trim());
    return { label: label ?? "", value: value ?? "", sortOrder: i };
  });
  await prisma.$transaction([prisma.heroStat.deleteMany(), prisma.heroStat.createMany({ data: rows })]);
  revalidateSiteContent();
  revalidatePath("/admin/hero");
  await completeAdminAction("/admin/hero", "Hero stats updated.");
}

export async function upsertProjectAction(formData: FormData) {
  await requireAdminSession();
  const id = opt(formData, "id");
  const data = {
    name: s(formData, "name"),
    category: s(formData, "category"),
    description: s(formData, "description"),
    stats: opt(formData, "stats"),
    imageUrl: opt(formData, "imageUrl"),
    sortOrder: Number(s(formData, "sortOrder") || "0"),
  };
  if (id) {
    await prisma.projects.update({ where: { id }, data });
  } else {
    await prisma.projects.create({ data });
  }
  revalidateSiteContent();
  revalidatePath("/admin/projects");
  await completeAdminAction("/admin/projects", "Project saved.");
}

export async function deleteProjectAction(formData: FormData) {
  await requireAdminSession();
  const id = s(formData, "id");
  if (!id) return;
  await prisma.projects.delete({ where: { id } });
  revalidateSiteContent();
  revalidatePath("/admin/projects");
  await completeAdminAction("/admin/projects", "Project deleted.");
}

export async function upsertExperienceAction(formData: FormData) {
  await requireAdminSession();
  const id = opt(formData, "id");
  const pointsRaw = s(formData, "points");
  const points = pointsRaw
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);
  const data = {
    company: s(formData, "company"),
    title: s(formData, "title"),
    period: s(formData, "period"),
    points,
    order: Number(s(formData, "order") || "0"),
  };
  if (id) {
    await prisma.experience.update({ where: { id }, data });
  } else {
    await prisma.experience.create({ data });
  }
  revalidateSiteContent();
  revalidatePath("/admin/experience");
  await completeAdminAction("/admin/experience", "Experience saved.");
}

export async function deleteExperienceAction(formData: FormData) {
  await requireAdminSession();
  const id = s(formData, "id");
  if (!id) return;
  await prisma.experience.delete({ where: { id } });
  revalidateSiteContent();
  revalidatePath("/admin/experience");
  await completeAdminAction("/admin/experience", "Experience deleted.");
}

export async function upsertServiceAction(formData: FormData) {
  await requireAdminSession();
  const id = opt(formData, "id");
  const pointsRaw = s(formData, "points");
  const points = pointsRaw
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);
  const data = {
    serviceKey: s(formData, "serviceKey"),
    title: s(formData, "title"),
    points,
    sortOrder: Number(s(formData, "sortOrder") || "0"),
  };
  if (id) {
    await prisma.service.update({ where: { id }, data });
  } else {
    await prisma.service.create({ data });
  }
  revalidateSiteContent();
  revalidatePath("/admin/services");
  await completeAdminAction("/admin/services", "Service saved.");
}

export async function deleteServiceAction(formData: FormData) {
  await requireAdminSession();
  const id = s(formData, "id");
  if (!id) return;
  await prisma.service.delete({ where: { id } });
  revalidateSiteContent();
  revalidatePath("/admin/services");
  await completeAdminAction("/admin/services", "Service deleted.");
}

export async function upsertTechStackAction(formData: FormData) {
  await requireAdminSession();
  const id = opt(formData, "id");
  const data = {
    title: s(formData, "title"),
    iconUrl: s(formData, "iconUrl"),
    text: s(formData, "text"),
    sortOrder: Number(s(formData, "sortOrder") || "0"),
  };
  if (id) {
    await prisma.techStackItem.update({ where: { id }, data });
  } else {
    await prisma.techStackItem.create({ data });
  }
  revalidateSiteContent();
  revalidatePath("/admin/tech");
  await completeAdminAction("/admin/tech", "Tech stack item saved.");
}

export async function deleteTechStackAction(formData: FormData) {
  await requireAdminSession();
  const id = s(formData, "id");
  if (!id) return;
  await prisma.techStackItem.delete({ where: { id } });
  revalidateSiteContent();
  revalidatePath("/admin/tech");
  await completeAdminAction("/admin/tech", "Tech stack item deleted.");
}

export async function upsertTestimonialAction(formData: FormData) {
  await requireAdminSession();
  const id = opt(formData, "id");
  const data = {
    quote: s(formData, "quote"),
    authorName: s(formData, "authorName"),
    authorRole: s(formData, "authorRole"),
    imageUrl: s(formData, "imageUrl"),
    sortOrder: Number(s(formData, "sortOrder") || "0"),
  };
  if (id) {
    await prisma.testimonial.update({ where: { id }, data });
  } else {
    await prisma.testimonial.create({ data });
  }
  revalidateSiteContent();
  revalidatePath("/admin/testimonials");
  await completeAdminAction("/admin/testimonials", "Testimonial saved.");
}

export async function deleteTestimonialAction(formData: FormData) {
  await requireAdminSession();
  const id = s(formData, "id");
  if (!id) return;
  await prisma.testimonial.delete({ where: { id } });
  revalidateSiteContent();
  revalidatePath("/admin/testimonials");
  await completeAdminAction("/admin/testimonials", "Testimonial deleted.");
}

export async function upsertPartnerAction(formData: FormData) {
  await requireAdminSession();
  const id = opt(formData, "id");
  const data = {
    imageUrl: s(formData, "imageUrl"),
    alt: s(formData, "alt"),
    sortOrder: Number(s(formData, "sortOrder") || "0"),
  };
  if (id) {
    await prisma.partner.update({ where: { id }, data });
  } else {
    await prisma.partner.create({ data });
  }
  revalidateSiteContent();
  revalidatePath("/admin/partners");
  await completeAdminAction("/admin/partners", "Partner saved.");
}

export async function deletePartnerAction(formData: FormData) {
  await requireAdminSession();
  const id = s(formData, "id");
  if (!id) return;
  await prisma.partner.delete({ where: { id } });
  revalidateSiteContent();
  revalidatePath("/admin/partners");
  await completeAdminAction("/admin/partners", "Partner deleted.");
}

export async function upsertProcessStepAction(formData: FormData) {
  await requireAdminSession();
  const id = opt(formData, "id");
  const data = {
    stepLabel: s(formData, "stepLabel"),
    title: s(formData, "title"),
    description: s(formData, "description"),
    iconClass: s(formData, "iconClass"),
    sortOrder: Number(s(formData, "sortOrder") || "0"),
  };
  if (id) {
    await prisma.processStep.update({ where: { id }, data });
  } else {
    await prisma.processStep.create({ data });
  }
  revalidateSiteContent();
  revalidatePath("/admin/process");
  await completeAdminAction("/admin/process", "Process step saved.");
}

export async function deleteProcessStepAction(formData: FormData) {
  await requireAdminSession();
  const id = s(formData, "id");
  if (!id) return;
  await prisma.processStep.delete({ where: { id } });
  revalidateSiteContent();
  revalidatePath("/admin/process");
  await completeAdminAction("/admin/process", "Process step deleted.");
}

export async function upsertAwardAction(formData: FormData) {
  await requireAdminSession();
  const id = opt(formData, "id");
  const data = {
    rankLabel: s(formData, "rankLabel"),
    text: s(formData, "text"),
    sortOrder: Number(s(formData, "sortOrder") || "0"),
  };
  if (id) {
    await prisma.award.update({ where: { id }, data });
  } else {
    await prisma.award.create({ data });
  }
  revalidateSiteContent();
  revalidatePath("/admin/awards");
  await completeAdminAction("/admin/awards", "Award saved.");
}

export async function deleteAwardAction(formData: FormData) {
  await requireAdminSession();
  const id = s(formData, "id");
  if (!id) return;
  await prisma.award.delete({ where: { id } });
  revalidateSiteContent();
  revalidatePath("/admin/awards");
  await completeAdminAction("/admin/awards", "Award deleted.");
}

export async function upsertPricingPlanAction(formData: FormData) {
  await requireAdminSession();
  const slug = s(formData, "slug");
  const bulletsRaw = s(formData, "bullets");
  const bullets = bulletsRaw
    .split("\n")
    .map((b) => b.trim())
    .filter(Boolean);
  const data = {
    title: s(formData, "title"),
    amount: s(formData, "amount"),
    supportText: s(formData, "supportText"),
    bullets,
    sortOrder: Number(s(formData, "sortOrder") || "0"),
  };
  await prisma.pricingPlan.upsert({
    where: { slug },
    create: { slug, ...data },
    update: data,
  });
  revalidateSiteContent();
  revalidatePath("/admin/pricing");
  await completeAdminAction("/admin/pricing", "Pricing updated.");
}

export async function upsertFaqItemAction(formData: FormData) {
  await requireAdminSession();
  const id = opt(formData, "id");
  const data = {
    question: s(formData, "question"),
    answer: s(formData, "answer"),
    sortOrder: Number(s(formData, "sortOrder") || "0"),
  };
  if (id) {
    await prisma.faqItem.update({ where: { id }, data });
  } else {
    await prisma.faqItem.create({ data });
  }
  revalidateSiteContent();
  revalidatePath("/admin/faq");
  await completeAdminAction("/admin/faq", "FAQ item saved.");
}

export async function deleteFaqItemAction(formData: FormData) {
  await requireAdminSession();
  const id = s(formData, "id");
  if (!id) return;
  await prisma.faqItem.delete({ where: { id } });
  revalidateSiteContent();
  revalidatePath("/admin/faq");
  await completeAdminAction("/admin/faq", "FAQ item deleted.");
}

export async function markMessageReadAction(formData: FormData) {
  await requireAdminSession();
  const id = s(formData, "id");
  if (!id) return;
  await prisma.messages.update({ where: { id }, data: { status: "read" } });
  revalidatePath("/admin/messages");
  await completeAdminAction("/admin/messages", "Message marked as read.");
}
