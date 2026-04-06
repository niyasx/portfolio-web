"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOutAdmin } from "@/app/admin/actions/auth";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/profile", label: "Profile & media" },
  { href: "/admin/hero", label: "Hero" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/tech", label: "Tech stack" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/partners", label: "Partners" },
  { href: "/admin/process", label: "Process" },
  { href: "/admin/awards", label: "Awards" },
  { href: "/admin/pricing", label: "Pricing" },
  { href: "/admin/faq", label: "FAQ" },
  { href: "/admin/messages", label: "Messages" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="admin-nav" aria-label="Admin sections">
      <div className="admin-nav-brand">
        <span className="admin-nav-brand-title">Site admin</span>
        <span className="admin-nav-brand-sub">Content &amp; settings</span>
      </div>
      <div className="admin-nav-links">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <Link key={l.href} href={l.href} className={active ? "admin-nav-link is-active" : "admin-nav-link"}>
              {l.label}
            </Link>
          );
        })}
      </div>
      <form action={signOutAdmin} className="admin-nav-signout">
        <button type="submit" className="admin-button admin-button-outline">
          Sign out
        </button>
      </form>
    </nav>
  );
}
