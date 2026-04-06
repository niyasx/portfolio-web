import { prisma } from "@/app/lib/prisma";
import { deleteFaqItemAction, upsertFaqItemAction } from "@/app/admin/actions/content";

export default async function AdminFaqPage() {
  const rows = await prisma.faqItem.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <>
      <h1>FAQ</h1>
      {rows.map((f) => (
        <div key={f.id} className="admin-card">
          <form action={upsertFaqItemAction}>
            <input type="hidden" name="id" value={f.id} />
            <div className="admin-field">
              <label>Question</label>
              <input name="question" defaultValue={f.question} className="admin-input" required />
            </div>
            <div className="admin-field">
              <label>Answer</label>
              <textarea name="answer" defaultValue={f.answer} className="admin-textarea" rows={3} required />
            </div>
            <div className="admin-field">
              <label>Sort order</label>
              <input name="sortOrder" type="number" defaultValue={f.sortOrder} className="admin-input" />
            </div>
            <button type="submit" className="admin-button">
              Save
            </button>
          </form>
          <form action={deleteFaqItemAction}>
            <input type="hidden" name="id" value={f.id} />
            <button type="submit" className="admin-danger">
              Delete
            </button>
          </form>
        </div>
      ))}
      <div className="admin-card">
        <h2>Add FAQ</h2>
        <form action={upsertFaqItemAction}>
          <div className="admin-field">
            <label>Question</label>
            <input name="question" className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>Answer</label>
            <textarea name="answer" className="admin-textarea" rows={3} required />
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
