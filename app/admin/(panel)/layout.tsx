import { requireAdminSession } from "@/app/lib/require-admin";
import { AdminNav } from "./admin-nav";

export const dynamic = "force-dynamic";

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdminSession();

  return (
    <div className="admin-shell">
      <AdminNav />
      <main className="admin-main">
        <div className="admin-main-inner">{children}</div>
      </main>
    </div>
  );
}
