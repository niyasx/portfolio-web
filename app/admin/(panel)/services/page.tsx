import { prisma } from "@/app/lib/prisma";
import { deleteServiceAction, upsertServiceAction } from "@/app/admin/actions/content";

export default async function AdminServicesPage() {
  const rows = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <>
      <h1>Services</h1>
      {rows.map((s) => (
        <div key={s.id} className="admin-card">
          <form action={upsertServiceAction}>
            <input type="hidden" name="id" value={s.id} />
            <div className="admin-field">
              <label>Display ID (e.g. 01)</label>
              <input name="serviceKey" defaultValue={s.serviceKey} className="admin-input" required />
            </div>
            <div className="admin-field">
              <label>Title</label>
              <input name="title" defaultValue={s.title} className="admin-input" required />
            </div>
            <div className="admin-field">
              <label>Points (one per line)</label>
              <textarea name="points" className="admin-textarea" rows={4} defaultValue={s.points.join("\n")} />
            </div>
            <div className="admin-field">
              <label>Sort order</label>
              <input name="sortOrder" type="number" defaultValue={s.sortOrder} className="admin-input" />
            </div>
            <button type="submit" className="admin-button">
              Save
            </button>
          </form>
          <form action={deleteServiceAction}>
            <input type="hidden" name="id" value={s.id} />
            <button type="submit" className="admin-danger">
              Delete
            </button>
          </form>
        </div>
      ))}
      <div className="admin-card">
        <h2>Add service</h2>
        <form action={upsertServiceAction}>
          <div className="admin-field">
            <label>Display ID</label>
            <input name="serviceKey" className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>Title</label>
            <input name="title" className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>Points</label>
            <textarea name="points" className="admin-textarea" rows={4} />
          </div>
          <div className="admin-field">
            <label>Sort order</label>
            <input name="sortOrder" type="number" defaultValue={0} className="admin-input" />
          </div>
          <button type="submit" className="admin-button">
            Create
          </button>
        </form>
      </div>
    </>
  );
}
