export default function AdminDashboardPage() {
  return (
    <header className="admin-page-head">
      <h1>Dashboard</h1>
      <p className="admin-muted">
        Choose a section in the sidebar to edit site content. Saving a form updates the database and revalidates the public
        homepage automatically.
      </p>
    </header>
  );
}
