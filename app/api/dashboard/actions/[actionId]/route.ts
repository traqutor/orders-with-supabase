import { Action, actions } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';
import { eq } from 'drizzle-orm/sql/expressions/conditions';


/**
 * GET url: /api/dashboard/actions/:actionId
 */

export async function GET(_: Request,
                          { params }: { params: Promise<{ actionId: string }> }) {
  const actionId = (await params).actionId;
  const data = await sBase
    .select()
    .from(actions)
    .where(eq(actions.id, actionId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}


/**
 * PUT url: /api/dashboard/actions/:actionId, {data: Action}
 */

export async function PUT(request: Request,
                          { params }: { params: Promise<{ actionId: string }> }) {
  const actionId = (await params).actionId;
  const action = await request.json() as Action;
  const data = await sBase
    .update(actions)
    .set({ ...action, id: actionId })
    .where(eq(actions.id, action.id));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}


/**
 * DELETE url: /api/dashboard/actions/:actionId
 */

export async function DELETE(_: Request,
                             { params }: { params: Promise<{ actionId: string }> }) {
  const actionId = (await params).actionId;
  const data = await sBase.delete(actions).where(eq(actions.id, actionId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}