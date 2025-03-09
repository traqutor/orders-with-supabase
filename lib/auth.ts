import CredentialsProvider from 'next-auth/providers/credentials';
import { eq } from 'drizzle-orm';
import NextAuth from 'next-auth';
import bcrypt from 'bcrypt';

import { takeOneUniqueOrThrow } from '@/utils/helpers';
import { sBase } from '@/lib/db/db';
import { users } from '@/lib/db/schema';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {


        const user = await sBase
          .select()
          .from(users)
          .where(eq(users.email, credentials?.email || ''))
          .then(takeOneUniqueOrThrow);

        if (!user) throw new Error('User not found');


        const isValid = await bcrypt.compare(credentials?.password || '', user.password);

        if (!isValid) {
          throw new Error('Invalid password');
        }

        return { id: user.id, email: user.email };
      }
    })
  ]
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };



