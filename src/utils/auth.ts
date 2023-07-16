import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import { Account, User } from '@prisma/client';

const THIRTY_DAYS = 30 * 24 * 60 * 60; // 30 days in seconds for session max age
const THIRTY_MINUTES = 30 * 60; // 30 minutes in seconds for session update interval

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
        },
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
    //   CredentialsProvider({
    //     name: 'as Guest',
    //     credentials: {},
    //     async authorize(credentials) {
    //       const user = {
    //         id: Math.random().toString(),
    //         name: 'Guest',
    //         email: 'guest@example.com',
    //       };
    //       return user;
    //     },
    //   }),
    // ],
    // callbacks: {
    //   async signIn({ user }) {
    //     // block signin if necessary
    //     return true;
    //   }
    // },
  ],
  session: {
    strategy: 'jwt', // Use JWT (JSON Web Token) as session strategy
    maxAge: THIRTY_DAYS, // Set session max age to 30 days
    updateAge: THIRTY_MINUTES, // Update session age every 30 minutes
  },
  callbacks: {
    async signIn(params) {
      console.log('signIn', JSON.stringify(params, null, 2));
      return true;
    },
    async jwt({ token, user, account }) {
      if (account?.access_token && user) {
        await updateAccount(account as Account, user as User);
        token.access_token = account.access_token;
        token.token_type = account.token_type;
      }
      const mappedUser = user ?? token?.user;

      //trying to pass user information and token to the session
      return {
        token: token?.token ?? token,
        user: mappedUser,
      };
    },
    async session({ token, session }) {
      const mappedToken = token?.token ?? token;
      const mappedUser = token?.user ?? session.user;

      return { ...session, token: mappedToken, user: mappedUser };
    },
  },
  pages: {
    signIn: '/auth/login', // Set custom URL for sign-in page
  },
};

const updateAccount = async (account: Account, user: User) => {
  const dbAccount = await prisma.account.findFirst({ where: { userId: user.id } });
  if (!dbAccount) return;

  await prisma.account.update({
    where: {
      id: dbAccount.id,
    },
    data: {
      ...account,
    },
  });
};
