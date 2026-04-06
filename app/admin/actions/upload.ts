"use server";

import { put } from "@vercel/blob";
import { auth } from "@/auth";

export type UploadResult = { ok: true; url: string } | { ok: false; error: string };

export async function uploadAdminAsset(formData: FormData): Promise<UploadResult> {
  const session = await auth();
  if (!session?.user?.email) return { ok: false, error: "Unauthorized" };

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return { ok: false, error: "BLOB_READ_WRITE_TOKEN is not configured." };

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "No file provided." };
  }

  try {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const blob = await put(`admin/${Date.now()}-${safeName}`, file, {
      access: "public",
      token,
    });
    return { ok: true, url: blob.url };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}
