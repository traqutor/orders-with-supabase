import { NewNote, notes } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';
import { eq } from 'drizzle-orm/sql/expressions/conditions';
import { getServerSession } from 'next-auth/next';
import { asc, desc } from 'drizzle-orm/sql/expressions/select';


export async function GET(request: Request,
                          { params }: { params: Promise<{ orderId: string }> }) {
  const orderId = (await params).orderId;
  const data = await sBase
    .select()
    .from(notes)
    .where(eq(notes.order_id, orderId))
    .orderBy(desc(notes.pin), desc(notes.seq));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

export async function POST(request: Request,
                           { params }: { params: Promise<{ orderId: string }> }) {

  const session = await getServerSession(

  );

  if (!session) {
    Response.json({ status: 'error', code: 401, message: 'You must be logged in.' });
    return;
  }

  const orderId = (await params).orderId;
  const note = await request.json() as NewNote;
  const data = await sBase
    .insert(notes)
    .values({ ...note, order_id: orderId, created_by: session.user.id })
    .returning();

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}