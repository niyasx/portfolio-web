import { PortfolioPage } from "@/app/components/portfolio-page";
import { getSiteContent } from "@/app/lib/site-content";
import type { SiteContentBundle } from "@/app/lib/site-content-types";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Home() {
  const site = await getSiteContent();
  if (!site) notFound();

  const serialized = JSON.parse(JSON.stringify(site)) as SiteContentBundle;

  return <PortfolioPage site={serialized} />;
}
