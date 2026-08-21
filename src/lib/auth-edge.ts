import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';

// Edge-safe NextAuth config — deliberately has NO Credentials provider / no
// Mongoose import, because middleware.ts runs on the Edge runtime and
// Mongoose is Node-only. Role is embedded in the JWT at sign-in time (see
// src/lib/auth.ts), so reading it here in middleware never needs a DB call.
export const authConfig: NextAuthConfig = {
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'bharosa-shop-production-secret-auth-key-2026',
  providers: [],
  session: { strategy: 'jwt' },
  pages: { signIn: '/auth/sign-in' },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as 'customer' | 'vendor' | 'admin';
      }
      return session;
    },
  },
};

export const { auth: edgeAuth } = NextAuth(authConfig);
