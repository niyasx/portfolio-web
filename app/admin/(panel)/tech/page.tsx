import { prisma } from "@/app/lib/prisma";
import { deleteTechStackAction, upsertTechStackAction } from "@/app/admin/actions/content";
import { BlobUploadField } from "@/app/admin/components/blob-upload-field";

export default async function AdminTechPage() {
  const rows = await prisma.techStackItem.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <>
      <h1>Tech stack</h1>
      {rows.map((t) => (
        <div key={t.id} className="admin-card">
          <form action={upsertTechStackAction}>
            <input type="hidden" name="id" value={t.id} />
            <div className="admin-field">
              <label>Title</label>
              <input name="title" defaultValue={t.title} className="admin-input" required />
            </div>
            <BlobUploadField name="iconUrl" label="Tech icon" initialUrl={t.iconUrl} />
            <div className="admin-field">
              <label>Description</label>
              <textarea name="text" defaultValue={t.text} className="admin-textarea" rows={2} required />
            </div>
            <div className="admin-field">
              <label>Sort order</label>
              <input name="sortOrder" type="number" defaultValue={t.sortOrder} className="admin-input" />
            </div>
            <button type="submit" className="admin-button">
              Save
            </button>
          </form>
          <form action={deleteTechStackAction}>
            <input type="hidden" name="id" value={t.id} />
            <button type="submit" className="admin-danger">
              Delete
            </button>
          </form>
        </div>
      ))}
      <div className="admin-card">
        <h2>Add item</h2>
        <form action={upsertTechStackAction}>
          <div className="admin-field">
            <label>Title</label>
            <input name="title" className="admin-input" required />
          </div>
          <BlobUploadField name="iconUrl" label="Tech icon" />
          <div className="admin-field">
            <label>Description</label>
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
