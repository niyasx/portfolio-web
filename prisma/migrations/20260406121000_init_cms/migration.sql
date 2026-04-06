-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "public"."admin_users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."site_profile" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "displayName" TEXT NOT NULL,
    "roleTitle" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "linkedinUrl" TEXT NOT NULL,
    "githubUrl" TEXT NOT NULL,
    "twitterUrl" TEXT NOT NULL,
    "dribbbleUrl" TEXT NOT NULL,
    "instagramUrl" TEXT NOT NULL,
    "facebookUrl" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "signatureUrl" TEXT,
    "backgroundVideoUrl" TEXT NOT NULL,
    "availabilityText" TEXT NOT NULL,
    "footerBrandName" TEXT NOT NULL,
    "footerMarqueeText" TEXT NOT NULL,
    "partnersHeadline" TEXT NOT NULL,
    "heroEyebrow" TEXT NOT NULL,
    "experienceEyebrow" TEXT NOT NULL,
    "experienceSectionTitle" TEXT NOT NULL,
    "servicesEyebrow" TEXT NOT NULL,
    "aboutEyebrow" TEXT NOT NULL,
    "aboutSectionTitle" TEXT NOT NULL,
    "testimonialSubtitle" TEXT NOT NULL,
    "techStackHeading" TEXT NOT NULL,
    "processSectionHeading" TEXT NOT NULL,
    "awardsEyebrow" TEXT NOT NULL,
    "pricingTitle" TEXT NOT NULL,
    "pricingTabStandardLabel" TEXT NOT NULL,
    "pricingTabPremiumLabel" TEXT NOT NULL,
    "pricingHelpText" TEXT NOT NULL,
    "faqHeading" TEXT NOT NULL,
    "contactHeading" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."hero_tags" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "hero_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."hero_stats" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "hero_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "role" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."messages" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."projects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "stats" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "imageUrl" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."experience" (
    "id" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "points" TEXT[],
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."services" (
    "id" TEXT NOT NULL,
    "serviceKey" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "points" TEXT[],
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tech_stack_items" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "iconUrl" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "tech_stack_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."testimonials" (
    "id" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorRole" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."partners" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."process_steps" (
    "id" TEXT NOT NULL,
    "stepLabel" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "iconClass" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "process_steps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."awards" (
    "id" TEXT NOT NULL,
    "rankLabel" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "awards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pricing_plans" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "supportText" TEXT NOT NULL,
    "bullets" TEXT[],
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "pricing_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."faq_items" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "faq_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_email_key" ON "public"."admin_users"("email");

-- CreateIndex
CREATE INDEX "hero_tags_sortOrder_idx" ON "public"."hero_tags"("sortOrder");

-- CreateIndex
CREATE INDEX "hero_stats_sortOrder_idx" ON "public"."hero_stats"("sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE INDEX "messages_email_idx" ON "public"."messages"("email");

-- CreateIndex
CREATE INDEX "messages_createdAt_idx" ON "public"."messages"("createdAt");

-- CreateIndex
CREATE INDEX "projects_featured_idx" ON "public"."projects"("featured");

-- CreateIndex
CREATE INDEX "projects_sortOrder_idx" ON "public"."projects"("sortOrder");

-- CreateIndex
CREATE INDEX "experience_order_idx" ON "public"."experience"("order");

-- CreateIndex
CREATE INDEX "services_sortOrder_idx" ON "public"."services"("sortOrder");

-- CreateIndex
CREATE INDEX "tech_stack_items_sortOrder_idx" ON "public"."tech_stack_items"("sortOrder");

-- CreateIndex
CREATE INDEX "testimonials_sortOrder_idx" ON "public"."testimonials"("sortOrder");

-- CreateIndex
CREATE INDEX "partners_sortOrder_idx" ON "public"."partners"("sortOrder");

-- CreateIndex
CREATE INDEX "process_steps_sortOrder_idx" ON "public"."process_steps"("sortOrder");

-- CreateIndex
CREATE INDEX "awards_sortOrder_idx" ON "public"."awards"("sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "pricing_plans_slug_key" ON "public"."pricing_plans"("slug");

-- CreateIndex
CREATE INDEX "faq_items_sortOrder_idx" ON "public"."faq_items"("sortOrder");

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

