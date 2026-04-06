import { prisma } from "@/app/lib/prisma";
import { notFound } from "next/navigation";
import { updateSiteProfileAction } from "@/app/admin/actions/content";
import { BlobUploadField } from "@/app/admin/components/blob-upload-field";

export default async function AdminProfilePage() {
  const profile = await prisma.siteProfile.findUnique({ where: { id: "default" } });
  if (!profile) notFound();

  return (
    <>
      <h1>Profile &amp; media</h1>
      <form action={updateSiteProfileAction} className="admin-section">
        <div className="admin-grid">
          <div className="admin-field">
            <label>Display name</label>
            <input name="displayName" defaultValue={profile.displayName} className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>Role title</label>
            <input name="roleTitle" defaultValue={profile.roleTitle} className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>Summary</label>
            <textarea name="summary" defaultValue={profile.summary} className="admin-textarea" rows={5} required />
          </div>
          <div className="admin-field">
            <label>Contact email</label>
            <input name="contactEmail" type="email" defaultValue={profile.contactEmail} className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>Contact phone</label>
            <input name="contactPhone" defaultValue={profile.contactPhone} className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>Location</label>
            <input name="location" defaultValue={profile.location} className="admin-input" required />
          </div>
          <BlobUploadField name="avatarUrl" label="Avatar image" initialUrl={profile.avatarUrl} />
          <BlobUploadField name="signatureUrl" label="Signature image" initialUrl={profile.signatureUrl} />
          <BlobUploadField
            name="backgroundVideoUrl"
            label="Background video"
            kind="video"
            initialUrl={profile.backgroundVideoUrl}
            required
            description="Paste a video URL or upload MP4 / WebM. The URL is stored on the site profile when you save this form."
          />
          <div className="admin-field">
            <label>LinkedIn URL</label>
            <input name="linkedinUrl" defaultValue={profile.linkedinUrl} className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>GitHub URL</label>
            <input name="githubUrl" defaultValue={profile.githubUrl} className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>Twitter / X URL</label>
            <input name="twitterUrl" defaultValue={profile.twitterUrl} className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>Dribbble URL</label>
            <input name="dribbbleUrl" defaultValue={profile.dribbbleUrl} className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>Instagram URL</label>
            <input name="instagramUrl" defaultValue={profile.instagramUrl} className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>Facebook URL</label>
            <input name="facebookUrl" defaultValue={profile.facebookUrl} className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>Availability line (sidebar)</label>
            <input name="availabilityText" defaultValue={profile.availabilityText} className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>Footer brand name</label>
            <input name="footerBrandName" defaultValue={profile.footerBrandName} className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>Footer marquee text</label>
            <input name="footerMarqueeText" defaultValue={profile.footerMarqueeText} className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>Partners section headline</label>
            <textarea name="partnersHeadline" defaultValue={profile.partnersHeadline} className="admin-textarea" rows={3} required />
          </div>
          <div className="admin-field">
            <label>Hero eyebrow</label>
            <input name="heroEyebrow" defaultValue={profile.heroEyebrow} className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>Experience eyebrow</label>
            <input name="experienceEyebrow" defaultValue={profile.experienceEyebrow} className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>Experience section title</label>
            <textarea name="experienceSectionTitle" defaultValue={profile.experienceSectionTitle} className="admin-textarea" rows={2} required />
          </div>
          <div className="admin-field">
            <label>Services eyebrow</label>
            <input name="servicesEyebrow" defaultValue={profile.servicesEyebrow} className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>About eyebrow</label>
            <input name="aboutEyebrow" defaultValue={profile.aboutEyebrow} className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>About section title</label>
            <textarea name="aboutSectionTitle" defaultValue={profile.aboutSectionTitle} className="admin-textarea" rows={2} required />
          </div>
          <div className="admin-field">
            <label>Testimonial subtitle</label>
            <input name="testimonialSubtitle" defaultValue={profile.testimonialSubtitle} className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>Tech stack heading</label>
            <input name="techStackHeading" defaultValue={profile.techStackHeading} className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>Process section heading</label>
            <input name="processSectionHeading" defaultValue={profile.processSectionHeading} className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>Awards eyebrow</label>
            <input name="awardsEyebrow" defaultValue={profile.awardsEyebrow} className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>Pricing title</label>
            <input name="pricingTitle" defaultValue={profile.pricingTitle} className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>Pricing tab: standard label</label>
            <input name="pricingTabStandardLabel" defaultValue={profile.pricingTabStandardLabel} className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>Pricing tab: premium label</label>
            <input name="pricingTabPremiumLabel" defaultValue={profile.pricingTabPremiumLabel} className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>Pricing help text</label>
            <input name="pricingHelpText" defaultValue={profile.pricingHelpText} className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>FAQ heading</label>
            <input name="faqHeading" defaultValue={profile.faqHeading} className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>Contact heading</label>
            <input name="contactHeading" defaultValue={profile.contactHeading} className="admin-input" required />
          </div>
        </div>
        <button type="submit" className="admin-button">
          Save profile
        </button>
      </form>
    </>
  );
}
