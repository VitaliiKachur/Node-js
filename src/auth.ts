import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { authConfig } from "./auth.config";
import { prisma } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Google({
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    }),
    GitHub({
      authorization: {
        params: {
          scope: "read:user user:email",
        },
      },
    }),
    Credentials({
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email ?? "")
          .trim()
          .toLowerCase();
        const password = String(credentials?.password ?? "");

        if (!email || password.length < 6) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user?.passwordHash) {
          return null;
        }

        const passwordMatches = await bcrypt.compare(
          password,
          user.passwordHash,
        );

        if (!passwordMatches) {
          return null;
        }

        return {
          id: String(user.id),
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account?.provider === "google" || account?.provider === "github") {
        const email = (token.email ?? user?.email ?? profile?.email)
          ?.toLowerCase()
          .trim();
        const provider = account.provider;

        if (email) {
          try {
            await prisma.user.upsert({
              where: { email },
              update: {
                name: token.name ?? user?.name ?? profile?.name,
                image: token.picture ?? user?.image ?? profile?.picture,
                provider,
              },
              create: {
                email,
                name: token.name ?? user?.name ?? profile?.name,
                image: token.picture ?? user?.image ?? profile?.picture,
                provider,
              },
            });
          } catch {
            console.warn(`Failed to save ${provider} user.`);
          }
        }
      }

      if (token.email) {
        try {
          const savedUser = await prisma.user.findUnique({
            where: { email: token.email.toLowerCase() },
          });

          if (savedUser) {
            token.name = savedUser.name ?? token.name;
            token.picture = savedUser.image ?? token.picture;
          }
        } catch {
          console.warn("Failed to load session user.");
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name;
        session.user.image = token.picture;
      }

      return session;
    },
  },
});
