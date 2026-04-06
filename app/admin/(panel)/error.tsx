"use client";

export default function AdminPanelError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="admin-card">
      <h1>Action failed</h1>
      <p className="admin-alert admin-alert-error">
        Could not save your changes. Please retry. If the issue continues, refresh and try again.
      </p>
      <p className="admin-muted" style={{ marginBottom: "1rem" }}>
        {error.message}
      </p>
      <button type="button" className="admin-button" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
