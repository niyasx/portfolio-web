import { prisma } from "@/app/lib/prisma";
import { deleteTestimonialAction, upsertTestimonialAction } from "@/app/admin/actions/content";
import { BlobUploadField } from "@/app/admin/components/blob-upload-field";

export default async function AdminTestimonialsPage() {
  const rows = await prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <>
      <h1>Testimonials</h1>
      {rows.map((t) => (
        <div key={t.id} className="admin-card">
          <form action={upsertTestimonialAction}>
            <input type="hidden" name="id" value={t.id} />
            <div className="admin-field">
              <label>Quote</label>
              <textarea name="quote" defaultValue={t.quote} className="admin-textarea" rows={3} required />
            </div>
            <div className="admin-field">
              <label>Author name</label>
              <input name="authorName" defaultValue={t.authorName} className="admin-input" required />
            </div>
            <div className="admin-field">
              <label>Author role</label>
              <input name="authorRole" defaultValue={t.authorRole} className="admin-input" required />
            </div>
            <BlobUploadField name="imageUrl" label="Author photo" initialUrl={t.imageUrl} />
            <div className="admin-field">
              <label>Sort order</label>
              <input name="sortOrder" type="number" defaultValue={t.sortOrder} className="admin-input" />
            </div>
            <button type="submit" className="admin-button">
              Save
            </button>
          </form>
          <form action={deleteTestimonialAction}>
            <input type="hidden" name="id" value={t.id} />
            <button type="submit" className="admin-danger">
              Delete
            </button>
          </form>
        </div>
      ))}
      <div className="admin-card">
        <h2>Add testimonial</h2>
        <form action={upsertTestimonialAction}>
          <div className="admin-field">
            <label>Quote</label>
            <textarea name="quote" className="admin-textarea" rows={3} required />
          </div>
          <div className="admin-field">
            <label>Author name</label>
            <input name="authorName" className="admin-input" required />
          </div>
          <div className="admin-field">
            <label>Author role</label>
            <input name="authorRole" className="admin-input" required />
          </div>
          <BlobUploadField name="imageUrl" label="Author photo" />
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
