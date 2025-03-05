import { Profile, profiles } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';
import { eq } from 'drizzle-orm/sql/expressions/conditions';


export async function GET(request: Request,
                          { params }: { params: Promise<{ profileId: string }> }) {
  const profileId = (await params).profileId;

  const data = await sBase
    .select()
    .from(profiles)
    .where(eq(profiles.id, profileId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}


export async function PUT(request: Request, { params }: { params: Promise<{ profileId: string }> }) {
  const profileId = (await params).profileId;
  const profile = await request.json() as Profile;

  const data = await sBase.update(profiles).set(profile).where(eq(profiles.id, profileId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ profileId: string }> }) {
  const profileId = (await params).profileId;

  const data = await sBase.delete(profiles).where(eq(profiles.id, profileId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}