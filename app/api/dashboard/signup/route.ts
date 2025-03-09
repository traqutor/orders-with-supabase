import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { sBase } from '@/lib/db/db';
import { users } from '@/lib/db/schema';


export async function POST(req: Request) {
  const { email, password } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await sBase.insert(users).values({ email, password: hashedPassword });
    return NextResponse.json({ message: 'User created' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }
}
