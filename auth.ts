import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  pages: {
    signIn: "/admin/login",
  },
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email ? String(credentials.email).trim().toLowerCase() : "";
        const password = credentials?.password ? String(credentials.password) : "";
        if (!email || !password) return null;

        let admin = await prisma.adminUser.findUnique({ where: { email } });
        if (!admin) {
          admin = await prisma.adminUser.findFirst({
            where: { email: { equals: email, mode: "insensitive" } },
          });
        }
        if (!admin) return null;

        const ok = await bcrypt.compare(password, admin.passwordHash);
        if (!ok) return null;

        return { id: admin.id, email: admin.email };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user?.email) token.email = user.email;
      if (user?.id) token.sub = user.id;
      return token;
    },
    session({ session, token }) {
      if (session.user && token.sub) session.user.id = token.sub;
      if (session.user && token.email) session.user.email = String(token.email);
      return session;
    },
  },
});
