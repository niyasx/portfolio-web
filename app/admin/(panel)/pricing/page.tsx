import { prisma } from "@/app/lib/prisma";
import { upsertPricingPlanAction } from "@/app/admin/actions/content";

export default async function AdminPricingPage() {
  const plans = await prisma.pricingPlan.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <>
      <h1>Pricing</h1>
      <p className="admin-muted admin-lead">
        Slug must stay <code>standard</code> or <code>premium</code> for the public pricing toggle.
      </p>
      {plans.map((p) => (
        <div key={p.id} className="admin-card">
          <form action={upsertPricingPlanAction}>
            <input type="hidden" name="slug" value={p.slug} />
            <div className="admin-field">
              <label>Title</label>
              <input name="title" defaultValue={p.title} className="admin-input" required />
            </div>
            <div className="admin-field">
              <label>Amount display</label>
              <input name="amount" defaultValue={p.amount} className="admin-input" required />
            </div>
            <div className="admin-field">
              <label>Support line</label>
              <input name="supportText" defaultValue={p.supportText} className="admin-input" required />
            </div>
            <div className="admin-field">
              <label>Bullet lines (one per line)</label>
              <textarea name="bullets" className="admin-textarea" rows={8} defaultValue={p.bullets.join("\n")} required />
            </div>
            <div className="admin-field">
              <label>Sort order</label>
              <input name="sortOrder" type="number" defaultValue={p.sortOrder} className="admin-input" />
            </div>
            <button type="submit" className="admin-button">
              Save {p.slug}
            </button>
          </form>
        </div>
      ))}
    </>
  );
}
