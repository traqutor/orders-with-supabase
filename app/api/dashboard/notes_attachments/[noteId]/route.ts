import { eq } from 'drizzle-orm/sql/expressions/conditions';
import { sBase } from '@/lib/db/db';
import { notes_attachments } from '@/lib/db/schema';


/**
 * GET url: /api/dashboard/notes_attachments/:noteId
 */

export async function GET(_: Request,
                          { params }: { params: Promise<{ noteId: string }> }) {
  const noteId = (await params).noteId;
  const data = await sBase
    .select()
    .from(notes_attachments)
    .where(eq(notes_attachments.note_id, noteId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}



/**
 * DELETE url: /api/dashboard/notes_attachments/:noteId
 */

export async function DELETE(_: Request,
                             { params }: { params: Promise<{ noteId: string }> }) {
  const noteId = (await params).noteId;
  const data = await sBase
    .delete(notes_attachments)
    .where(eq(notes_attachments.note_id, noteId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}