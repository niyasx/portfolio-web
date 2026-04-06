import { prisma } from "@/app/lib/prisma";
import { deleteProjectAction, upsertProjectAction } from "@/app/admin/actions/content";
import { BlobUploadField } from "@/app/admin/components/blob-upload-field";

export default async function AdminProjectsPage() {
  const projects = await prisma.projects.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <>
      <h1>Projects</h1>
      {projects.map((p) => (
        <div key={p.id} className="admin-card">
          <form action={upsertProjectAction}>
            <input type="hidden" name="id" value={p.id} />
            <div className="admin-field">
              <label>Name</label>
              <input name="name" defaultValue={p.name} className="admin-input" required />
            </div>
            <div className="admin-field">
              <label>Category</label>
              <input name="category" defaultValue={p.category} className="admin-input" required />
            </div>
            <div className="admin-field">
              <label>Description</label>
              <textarea name="description" defaultValue={p.description} className="admin-textarea" rows={2} required />
            </div>
            <div className="admin-field">
              <label>Stats line</label>
              <input name="stats" defaultValue={p.stats ?? ""} className="admin-input" />
            </div>
            <BlobUploadField name="imageUrl" label="Project image" initialUrl={p.imageUrl} />
            <div className="admin-field">
              <label>Sort order</label>
              <input name="sortOrder" type="number" defaultValue={p.sortOrder} className="admin-input" />
            </div>
            <div className="admin-row-actions">
              <button type="submit" className="admin-button">
                Save
              </button>
            </div>
          </form>
          <form action={deleteProjectAction}>
            <input type="hidden" name="id" value={p.id} />
            <button type="submit" className="admin-danger">
              Delete
            </button>
          </form>
        </div>
      ))}
      <div className="admin-card">
        <h2 className="admin-section">Add project</h2>
        <form action={upsertProjectAction}>
          <div className="admin-field">
            <label>Name</label>
            <input name="name" className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>Category</label>
            <input name="category" className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>Description</label>
            <textarea name="description" className="admin-textarea" rows={2} required />
          </div>
          <div className="admin-field">
            <label>Stats line</label>
            <input name="stats" className="admin-input" />
          </div>
          <BlobUploadField name="imageUrl" label="Project image" />
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
