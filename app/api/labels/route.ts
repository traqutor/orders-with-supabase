import { Label, labels, NewLabel } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';
import { eq } from 'drizzle-orm/sql/expressions/conditions';


export async function GET() {
  const data = await sBase.select().from(labels);

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}


export async function POST(request: Request) {
  const label = await request.json() as NewLabel;
  const data = await sBase.insert(labels).values({ ...label });

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

export async function PUT(request: Request) {
  const label = await request.json() as Label;
  const data = await sBase.update(labels).set(label).where(eq(labels.id, label.id));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

export async function DELETE(request: Request) {
  const label = await request.json() as Label;
  const data = await sBase.delete(labels).where(eq(labels.id, label.id));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}