import { actions, NewAction } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';

/**
 * GET list of Actions url: /api/dashboard/actions
 */

export async function GET() {
  const data = await sBase
    .select()
    .from(actions);

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

/**
 * POST new Action url: /api/dashboard/actions, {data: Action}
 */

export async function POST(request: Request) {
  const action = await request.json() as NewAction;
  const data = await sBase
    .insert(actions)
    .values({ ...action });

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}
