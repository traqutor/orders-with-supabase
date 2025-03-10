import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import { config } from '@/auth';

export const authOptions: NextAuthOptions = {
  ...config,
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };




