import { Action, actions, NewAction } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';
import { eq } from 'drizzle-orm/sql/expressions/conditions';


export async function GET() {
  const data = await sBase.select().from(actions);

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}


export async function POST(request: Request) {
  const action = await request.json() as NewAction;
  const data = await sBase.insert(actions).values({ ...action });

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

export async function PUT(request: Request) {
  const action = await request.json() as Action;
  const data = await sBase.update(actions).set(action).where(eq(actions.id, action.id));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

export async function DELETE(request: Request) {
  const action = await request.json() as Action;
  const data = await sBase.delete(actions).where(eq(actions.id, action.id));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}