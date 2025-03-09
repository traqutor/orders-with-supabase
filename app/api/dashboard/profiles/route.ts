import { NewProfile, profiles } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';
import { verifySession } from '@/lib/session';


export async function GET() {
  await verifySession();

  const data = await sBase.select().from(profiles);

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}


export async function POST(request: Request) {
  await verifySession();

  const profile = await request.json() as NewProfile;

  const data = await sBase.insert(profiles).values({ ...profile });

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}
