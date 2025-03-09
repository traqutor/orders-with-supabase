'use server';

import { encodedRedirect } from '@/utils/utils';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { sBase } from '@/lib/db/db';
import { User, users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm/sql/expressions/conditions';
import { sql } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { takeOneUniqueOrThrow } from '@/utils/helpers';
import { createSession, deleteSession } from '@/lib/session';

export const signUpAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const origin = (await headers()).get('origin');

  if (!email || !password) {
    return encodedRedirect(
      'error',
      '/sign-up',
      'Email and password are required'
    );
  }

  const existingUser = await sBase
    .select()
    .from(users)
    .where(eq(sql`lower(
    ${users.email}
    )`, `${email.toLowerCase()}`));


  console.log('existingUser', existingUser);


  if (existingUser) {
    return encodedRedirect(
      'error',
      '/sign-up',
      'User already exists'
    );
  }


  const hashedPassword = await bcrypt.hash(password, 10);

  const usr = await sBase
    .insert(users)
    .values({
      email,
      password: hashedPassword
    }).returning()
    .then(takeOneUniqueOrThrow);

  if (!usr.id) {
    return encodedRedirect('error', '/sign-up', '');
  } else {


    return encodedRedirect(
      'success',
      '/sign-up',
      'Thanks for signing up! Please check your email for a verification link.'
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return encodedRedirect(
      'error',
      '/sign-up',
      'Email and password are required'
    );
  }

  const usr: User[] = await sBase
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (usr.length === 1) {
    await createSession(usr[0].id);
  } else {

    return encodedRedirect('error', '/sign-up', '');

  }
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString();
  const origin = (await headers()).get('origin');
  const callbackUrl = formData.get('callbackUrl')?.toString();

  if (!email) {
    return encodedRedirect('error', '/forgot-password', 'Email is required');
  }

  const error = false;
  /**
   *  todo await supabase.auth.resetPasswordForEmail(email, {
   redirectTo: `${origin}/auth/callback?redirect_to=/reset-password`
   });*/

  if (error) {
    return encodedRedirect(
      'error',
      '/forgot-password',
      'Could not reset password'
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    'success',
    '/forgot-password',
    'Check your email for a link to reset your password.'
  );
};

export const resetPasswordAction = async (formData: FormData) => {

  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      'error',
      '/reset-password',
      'Password and confirm password are required'
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      'error',
      '/reset-password',
      'Passwords do not match'
    );
  }


  const error = false;
  /**
   *  todo const { error } = await supabase.auth.updateUser({
   *     password: password
   *   });
   });*/


  if (error) {
    encodedRedirect(
      'error',
      '/reset-password',
      'Password update failed'
    );
  }

  encodedRedirect('success', '/reset-password', 'Password updated');
};

export const signOutAction = async () => {
  await deleteSession();
};
