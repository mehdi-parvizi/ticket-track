import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { prisma } from "../../prisma/client";

export const config: NextAuthConfig = {
  providers: [GitHub, Google],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
};

export const { handlers, auth } = NextAuth(config);
