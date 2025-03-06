import { eq } from 'drizzle-orm/sql/expressions/conditions';
import { sBase } from '@/lib/db/db';
import { NoteAttachment, notes_attachments } from '@/lib/db/schema';


/**
 * GET url: /api/notes_attachments/:attachmentId
 */

export async function GET(_: Request,
                          { params }: { params: Promise<{ attachmentId: string }> }) {
  const attachmentId = (await params).attachmentId;
  const data = await sBase
    .select()
    .from(notes_attachments)
    .where(eq(notes_attachments.id, attachmentId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}


/**
 * PUT url: /api/notes_attachments/:attachmentId, {data: NoteAttachment}
 */

export async function PUT(request: Request,
                          { params }: { params: Promise<{ attachmentId: string }> }) {
  const attachmentId = (await params).attachmentId;
  const attachment = await request.json() as NoteAttachment;
  const data = await sBase
    .update(notes_attachments)
    .set({ ...attachment, id: attachmentId })
    .where(eq(notes_attachments.id, attachment.id));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}


/**
 * DELETE url: /api/notes_attachments/:attachmentId
 */

export async function DELETE(_: Request,
                             { params }: { params: Promise<{ attachmentId: string }> }) {
  const attachmentId = (await params).attachmentId;
  const data = await sBase.delete(notes_attachments).where(eq(notes_attachments.id, attachmentId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}