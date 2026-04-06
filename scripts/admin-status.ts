/**
 * Compares ADMIN_EMAIL / ADMIN_PASSWORD in env with admin_users in the DB.
 * Run: npm run admin:status  (loads .env via Node --env-file)
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const admins = await prisma.adminUser.findMany({
    select: { email: true, updatedAt: true },
    orderBy: { email: "asc" },
  });

  console.log("Admin users in database:", admins.length || "(none)");
  for (const a of admins) {
    console.log(`  • ${a.email}  (updated ${a.updatedAt.toISOString().slice(0, 10)})`);
  }

  const envEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const envPass = process.env.ADMIN_PASSWORD;
  console.log("");
  console.log("From .env (via npm script):");
  console.log("  ADMIN_EMAIL:   ", envEmail ?? "(unset)");
  console.log("  ADMIN_PASSWORD:", envPass ? `(${envPass.length} characters)` : "(unset)");

  if (admins.length === 0) {
    console.log("\n→ Fix: run  npm run db:seed  or  npm run create-admin");
    return;
  }

  if (envEmail && !admins.some((a) => a.email.toLowerCase() === envEmail)) {
    console.log("\n→ ADMIN_EMAIL does not match any row above.");
    console.log("  Log in using an email from the list, or set ADMIN_EMAIL to match and run  npm run create-admin");
    return;
  }

  if (envEmail) {
    console.log("\n→ Email matches the database. If login still fails, the hash is wrong for your password.");
    console.log("  Run:  npm run create-admin  (re-hashes ADMIN_PASSWORD for that email)");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
