"use client";

import { useEffect, useState } from "react";

type AdminToastProps = {
  type: "success" | "error";
  message: string;
};

export function AdminToast({ type, message }: AdminToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 3500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Best effort: consume one-time flash cookie so it does not show again on next page.
    fetch("/admin/api/flash/consume", { method: "POST" }).catch(() => undefined);
  }, []);

  if (!visible) return null;

  return (
    <div className={type === "error" ? "admin-toast admin-toast-error" : "admin-toast admin-toast-success"} role="status">
      <span>{message}</span>
      <button type="button" className="admin-toast-close" onClick={() => setVisible(false)} aria-label="Dismiss message">
        ×
      </button>
    </div>
  );
}
