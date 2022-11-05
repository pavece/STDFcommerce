import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { checkUser, createOauthUser } from "../../../db/functions/usersDb";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await checkUser(
          credentials?.email || "",
          credentials?.password || ""
        );

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
  },

  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        if (account?.type === "oauth") {
          const oauthUser = await createOauthUser(token?.email || "");
          token.user = oauthUser;
        } else {
          token.user = user;
        }
      }
      return token;
    },

    async session({ session, token, user }: any) {
      session.accessToken = token.accessToken;
      session.user = token.user as any;

      return session;
    },
  },
};

export default NextAuth(authOptions);
