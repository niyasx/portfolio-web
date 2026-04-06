import { prisma } from "@/app/lib/prisma";
import { deletePartnerAction, upsertPartnerAction } from "@/app/admin/actions/content";
import { BlobUploadField } from "@/app/admin/components/blob-upload-field";

export default async function AdminPartnersPage() {
  const rows = await prisma.partner.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <>
      <h1>Partners</h1>
      {rows.map((p) => (
        <div key={p.id} className="admin-card">
          <form action={upsertPartnerAction}>
            <input type="hidden" name="id" value={p.id} />
            <BlobUploadField name="imageUrl" label="Partner logo" initialUrl={p.imageUrl} />
            <div className="admin-field">
              <label>Alt text</label>
              <input name="alt" defaultValue={p.alt} className="admin-input" required />
            </div>
            <div className="admin-field">
              <label>Sort order</label>
              <input name="sortOrder" type="number" defaultValue={p.sortOrder} className="admin-input" />
            </div>
            <button type="submit" className="admin-button">
              Save
            </button>
          </form>
          <form action={deletePartnerAction}>
            <input type="hidden" name="id" value={p.id} />
            <button type="submit" className="admin-danger">
              Delete
            </button>
          </form>
        </div>
      ))}
      <div className="admin-card">
        <h2>Add partner</h2>
        <form action={upsertPartnerAction}>
          <BlobUploadField name="imageUrl" label="Partner logo" />
          <div className="admin-field">
            <label>Alt text</label>
            <input name="alt" className="admin-input" required />
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
