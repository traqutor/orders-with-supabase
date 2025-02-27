import { NewProfile, Profile, profiles } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';
import { eq } from 'drizzle-orm/sql/expressions/conditions';


export async function GET() {
  const data = await sBase.select().from(profiles);

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}


export async function POST(request: Request) {
  const profile = await request.json() as NewProfile;

  const data = await sBase.insert(profiles).values({ ...profile });

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

export async function PUT(request: Request) {
  const profile = await request.json() as Profile;

  const data = await sBase.update(profiles).set(profile).where(eq(profiles.id, profile.id));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

export async function DELETE(request: Request) {
  const profile = await request.json() as Profile;

  const data = await sBase.delete(profiles).where(eq(profiles.id, profile.id));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}