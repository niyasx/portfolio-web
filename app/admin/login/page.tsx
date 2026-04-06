import { LoginForm } from "@/app/admin/login/login-form";

export const dynamic = "force-dynamic";

function safeCallbackUrl(raw: string | string[] | undefined): string {
  const v = Array.isArray(raw) ? raw[0] : raw;
  if (typeof v !== "string" || !v.startsWith("/") || v.startsWith("//")) return "/admin";
  return v;
}

function urlErrorMessage(error: string | string[] | undefined): string | undefined {
  const v = Array.isArray(error) ? error[0] : error;
  if (v === "CredentialsSignin") return "Invalid email or password.";
  if (v) return "Could not sign in. Try again.";
  return undefined;
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string | string[]; error?: string | string[] }>;
}) {
  const sp = await searchParams;
  const callbackUrl = safeCallbackUrl(sp.callbackUrl);
  const urlError = urlErrorMessage(sp.error);

  return (
    <div className="admin-login-wrap">
      <LoginForm callbackUrl={callbackUrl} urlError={urlError} />
    </div>
  );
}
