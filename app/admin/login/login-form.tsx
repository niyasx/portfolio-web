"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/admin/login/actions";

const initial: LoginState = {};

export function LoginForm({
  callbackUrl,
  urlError,
}: {
  callbackUrl: string;
  urlError?: string;
}) {
  const [state, formAction, pending] = useActionState(loginAction, initial);
  const error = state.error ?? urlError;

  return (
    <form action={formAction} className="admin-login-form">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <h1>Admin login</h1>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required className="admin-input" />
      </label>
      <label>
        Password
        <input name="password" type="password" autoComplete="current-password" required className="admin-input" />
      </label>
      {error && <p className="admin-error">{error}</p>}
      <button type="submit" className="admin-button" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
      <p className="admin-muted admin-login-hint">
        Use the same <code className="admin-code">ADMIN_EMAIL</code> and <code className="admin-code">ADMIN_PASSWORD</code>{" "}
        as in <code className="admin-code">.env</code>. If you changed the password in <code className="admin-code">.env</code>{" "}
        after seeding, run <code className="admin-code">npm run create-admin</code> once, then try again.
      </p>
    </form>
  );
}
