import { Note, notes } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';
import { eq } from 'drizzle-orm/sql/expressions/conditions';


export async function PUT(request: Request,
                          { params }: { params: Promise<{ noteId: string }> }) {
  const noteId = (await params).noteId;
  const note = await request.json() as Note;
  const data = await sBase.update(notes).set({ ...note, id: noteId }).where(eq(notes.id, noteId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

export async function DELETE(request: Request,
                             { params }: { params: Promise<{ noteId: string }> }) {
  const noteId = (await params).noteId;
  const data = await sBase.delete(notes).where(eq(notes.id, noteId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}