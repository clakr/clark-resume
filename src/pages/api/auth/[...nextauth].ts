import NextAuth, { type NextAuthOptions } from "next-auth";
// Prisma adapter for NextAuth, optional and can be removed
import GithubProvider from "next-auth/providers/github";

const { GITHUB_ID = "", GITHUB_SECRET = "" } = process.env;

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    signIn({ account }) {
      if (account?.providerAccountId !== "103111910") {
        throw new Error("NOT_CLARK");
      }

      return true;
    },
  },
  providers: [
    GithubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
