import { auth } from "@/auth";
import { unauthorized } from "next/navigation";

export async function requireAdminSession() {
  const session = await auth();
  if (!session?.user?.email) unauthorized();
  return session;
}
