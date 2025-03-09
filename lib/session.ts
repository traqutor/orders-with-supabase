import 'server-only';
import { JWTPayload, jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const key = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

const cookie = {
  name: 'session',
  options: { httpOnly: true, secure: true, sameSite: true, path: '/' },
  duration: 24 * 60 * 60 * 1000
};

export async function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1day')
    .sign(key);
}

export async function decrypt(session: string) {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256']
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function createSession(userId: string) {

  console.log('createSession userId', userId);

  const expires = new Date(Date.now() + cookie.duration);
  console.log('createSession expires', expires);

  const session = await encrypt({ userId, expires });

  console.log('createSession session', session);

  const cookieStore = await cookies();

  cookieStore.set(cookie.name, session, { ...cookie.options, expires });

  redirect('/orders');
}

export async function verifySession() {
  const cookieStore = await cookies();

  const coo = cookieStore.get(cookie.name)?.value;


  const session = await decrypt(coo || '');


  if (!session?.userId) {
    return redirect('/sign-in');
  }

  return { userId: session.userId };

}

export async function deleteSession() {
  const cookieStore = await cookies();

  cookieStore.delete(cookie.name);
  redirect('/sign-in');
}