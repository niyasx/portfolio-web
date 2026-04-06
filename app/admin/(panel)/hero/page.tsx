import { prisma } from "@/app/lib/prisma";
import { syncHeroStatsAction, syncHeroTagsAction } from "@/app/admin/actions/content";

export default async function AdminHeroPage() {
  const [tags, stats] = await Promise.all([
    prisma.heroTag.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.heroStat.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  const tagsValue = tags.map((t) => t.label).join("\n");
  const statsValue = stats.map((s) => `${s.label}|${s.value}`).join("\n");

  return (
    <>
      <h1>Hero</h1>
      <section className="admin-section">
        <h2>Tags (one per line)</h2>
        <form action={syncHeroTagsAction}>
          <textarea name="tags" className="admin-textarea" rows={6} defaultValue={tagsValue} />
          <button type="submit" className="admin-button">
            Save tags
          </button>
        </form>
      </section>
      <section className="admin-section">
        <h2>Stats (one per line: Label|Value)</h2>
        <form action={syncHeroStatsAction}>
          <textarea name="stats" className="admin-textarea" rows={6} defaultValue={statsValue} />
          <button type="submit" className="admin-button">
            Save stats
          </button>
        </form>
      </section>
    </>
  );
}
