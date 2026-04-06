import { prisma } from "@/app/lib/prisma";
import { deleteExperienceAction, upsertExperienceAction } from "@/app/admin/actions/content";

export default async function AdminExperiencePage() {
  const rows = await prisma.experience.findMany({ orderBy: { order: "asc" } });

  return (
    <>
      <h1>Experience</h1>
      {rows.map((e) => (
        <div key={e.id} className="admin-card">
          <form action={upsertExperienceAction}>
            <input type="hidden" name="id" value={e.id} />
            <div className="admin-field">
              <label>Company</label>
              <input name="company" defaultValue={e.company} className="admin-input" required />
            </div>
            <div className="admin-field">
              <label>Title</label>
              <input name="title" defaultValue={e.title} className="admin-input" required />
            </div>
            <div className="admin-field">
              <label>Period</label>
              <input name="period" defaultValue={e.period} className="admin-input" required />
            </div>
            <div className="admin-field">
              <label>Bullet points (one per line)</label>
              <textarea name="points" className="admin-textarea" rows={6} defaultValue={e.points.join("\n")} />
            </div>
            <div className="admin-field">
              <label>Order</label>
              <input name="order" type="number" defaultValue={e.order} className="admin-input" />
            </div>
            <button type="submit" className="admin-button">
              Save
            </button>
          </form>
          <form action={deleteExperienceAction}>
            <input type="hidden" name="id" value={e.id} />
            <button type="submit" className="admin-danger">
              Delete
            </button>
          </form>
        </div>
      ))}
      <div className="admin-card">
        <h2>Add experience</h2>
        <form action={upsertExperienceAction}>
          <div className="admin-field">
            <label>Company</label>
            <input name="company" className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>Title</label>
            <input name="title" className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>Period</label>
            <input name="period" className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>Bullet points</label>
            <textarea name="points" className="admin-textarea" rows={4} />
          </div>
          <div className="admin-field">
            <label>Order</label>
            <input name="order" type="number" defaultValue={0} className="admin-input" />
          </div>
          <button type="submit" className="admin-button">
            Create
          </button>
        </form>
      </div>
    </>
  );
}
