import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const pw = credentials?.password as string | undefined;
        const b64 = process.env.ADMIN_PASSWORD_HASH;

        if (!pw || !b64) return null;

        // Hash stored as base64 to avoid $ expansion in .env.local
        const hash = Buffer.from(b64, "base64").toString("utf8");

        const valid = await compare(pw, hash);
        if (!valid) return null;

        return { id: "admin", name: "Admin" };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
  },
});
