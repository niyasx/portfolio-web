import { requireAdminSession } from "@/app/lib/require-admin";
import { AdminNav } from "./admin-nav";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdminSession();
  const store = await cookies();
  const flashRaw = store.get("admin_flash")?.value;
  const [flashType, ...parts] = (flashRaw ?? "").split("|");
  const flashMessage = parts.join("|").trim();
  const hasFlash = (flashType === "success" || flashType === "error") && flashMessage.length > 0;

  return (
    <div className="admin-shell">
      <AdminNav />
      <main className="admin-main">
        <div className="admin-main-inner">
          {hasFlash ? (
            <p className={flashType === "error" ? "admin-alert admin-alert-error" : "admin-alert admin-alert-success"}>
              {flashMessage}
            </p>
          ) : null}
          {children}
        </div>
      </main>
    </div>
  );
}
