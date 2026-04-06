import { prisma } from "@/app/lib/prisma";
import { deleteProcessStepAction, upsertProcessStepAction } from "@/app/admin/actions/content";

export default async function AdminProcessPage() {
  const rows = await prisma.processStep.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <>
      <h1>Process steps</h1>
      {rows.map((p) => (
        <div key={p.id} className="admin-card">
          <form action={upsertProcessStepAction}>
            <input type="hidden" name="id" value={p.id} />
            <div className="admin-field">
              <label>Step label</label>
              <input name="stepLabel" defaultValue={p.stepLabel} className="admin-input" required />
            </div>
            <div className="admin-field">
              <label>Title</label>
              <input name="title" defaultValue={p.title} className="admin-input" required />
            </div>
            <div className="admin-field">
              <label>Description</label>
              <textarea name="description" defaultValue={p.description} className="admin-textarea" rows={2} required />
            </div>
            <div className="admin-field">
              <label>Icon class (e.g. gradient-icon-1)</label>
              <input name="iconClass" defaultValue={p.iconClass} className="admin-input" required />
            </div>
            <div className="admin-field">
              <label>Sort order</label>
              <input name="sortOrder" type="number" defaultValue={p.sortOrder} className="admin-input" />
            </div>
            <button type="submit" className="admin-button">
              Save
            </button>
          </form>
          <form action={deleteProcessStepAction}>
            <input type="hidden" name="id" value={p.id} />
            <button type="submit" className="admin-danger">
              Delete
            </button>
          </form>
        </div>
      ))}
      <div className="admin-card">
        <h2>Add step</h2>
        <form action={upsertProcessStepAction}>
          <div className="admin-field">
            <label>Step label</label>
            <input name="stepLabel" className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>Title</label>
            <input name="title" className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>Description</label>
            <textarea name="description" className="admin-textarea" rows={2} required />
          </div>
          <div className="admin-field">
            <label>Icon class</label>
            <input name="iconClass" className="admin-input" required />
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
