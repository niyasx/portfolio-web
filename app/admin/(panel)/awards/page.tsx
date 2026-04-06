import { prisma } from "@/app/lib/prisma";
import { deleteAwardAction, upsertAwardAction } from "@/app/admin/actions/content";

export default async function AdminAwardsPage() {
  const rows = await prisma.award.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <>
      <h1>Awards</h1>
      {rows.map((a) => (
        <div key={a.id} className="admin-card">
          <form action={upsertAwardAction}>
            <input type="hidden" name="id" value={a.id} />
            <div className="admin-field">
              <label>Rank label (e.g. 01)</label>
              <input name="rankLabel" defaultValue={a.rankLabel} className="admin-input" required />
            </div>
            <div className="admin-field">
              <label>Text</label>
              <textarea name="text" defaultValue={a.text} className="admin-textarea" rows={2} required />
            </div>
            <div className="admin-field">
              <label>Sort order</label>
              <input name="sortOrder" type="number" defaultValue={a.sortOrder} className="admin-input" />
            </div>
            <button type="submit" className="admin-button">
              Save
            </button>
          </form>
          <form action={deleteAwardAction}>
            <input type="hidden" name="id" value={a.id} />
            <button type="submit" className="admin-danger">
              Delete
            </button>
          </form>
        </div>
      ))}
      <div className="admin-card">
        <h2>Add award</h2>
        <form action={upsertAwardAction}>
          <div className="admin-field">
            <label>Rank label</label>
            <input name="rankLabel" className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>Text</label>
            <textarea name="text" className="admin-textarea" rows={2} required />
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
