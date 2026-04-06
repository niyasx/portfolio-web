import { prisma } from "@/app/lib/prisma";
import { markMessageReadAction } from "@/app/admin/actions/content";

export default async function AdminMessagesPage() {
  const rows = await prisma.messages.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <>
      <h1>Contact messages</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {rows.map((m) => (
            <tr key={m.id}>
              <td>{m.createdAt.toISOString().slice(0, 16)}</td>
              <td>{m.email}</td>
              <td>{m.phone}</td>
              <td>{m.message}</td>
              <td>{m.status}</td>
              <td>
                {m.status === "new" && (
                  <form action={markMessageReadAction}>
                    <input type="hidden" name="id" value={m.id} />
                    <button type="submit" className="admin-button admin-button-sm">
                      Mark read
                    </button>
                  </form>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && <p className="admin-muted">No messages yet.</p>}
    </>
  );
}
