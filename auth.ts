import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import type { NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth';
import { compare, hash } from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
import { sBase } from '@/lib/db/db';
import { users } from '@/lib/db/schema';

export async function hashPassword(password: string) {
  return hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return compare(password, hashedPassword);
}

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', nullable: false },
        password: { label: 'Password', type: 'password', nullable: false }
      },
      async authorize(credentials) {

        if (!credentials) throw new Error('No credentials!');

        const usersCollection = await sBase
          .select()
          .from(users);

        const idx = usersCollection.findIndex(c =>
          c.email.toLowerCase() === credentials.email.toLowerCase());

        if (idx === -1) throw new Error('User not found');

        const { email, id, password } = usersCollection[idx];

        const isValid = await verifyPassword(credentials?.password, password);

        if (!isValid) {
          throw new Error('Invalid credentials');
        }

        return { id, email };
      }
    })],
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub
      }
    })
  }//  your config
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}