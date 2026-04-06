"use server";

import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";

export type LoginState = { error?: string };

function safeInternalPath(raw: string): string {
  const t = raw.trim();
  if (!t.startsWith("/") || t.startsWith("//")) return "/admin";
  return t;
}

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");
  const callbackUrl = safeInternalPath(String(formData.get("callbackUrl") ?? "/admin"));

  let redirectUrl: string;
  try {
    redirectUrl = await signIn("credentials", {
      email,
      password,
      redirect: false,
      redirectTo: callbackUrl,
    });
  } catch (error) {
    if (error instanceof CredentialsSignin) {
      return { error: "Invalid email or password." };
    }
    throw error;
  }

  const loc = new URL(redirectUrl, "http://localhost");
  const err = loc.searchParams.get("error");
  if (err === "CredentialsSignin") {
    return { error: "Invalid email or password." };
  }
  if (err) {
    return { error: "Could not sign in. Try again." };
  }

  redirect(callbackUrl);
}
