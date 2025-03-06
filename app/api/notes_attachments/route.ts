import { notes_attachments, NewNoteAttachment  } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';

/**
 * GET list of NoteAttachment url: /api/notes_attachments
 */

export async function GET() {
  const data = await sBase
    .select()
    .from(notes_attachments);

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

/**
 * POST new NoteAttachment url: /api/notes_attachments, {data: NoteAttachment}
 */

export async function POST(request: Request) {
  const payload = await request.json() as NewNoteAttachment;
  const data = await sBase
    .insert(notes_attachments)
    .values({ ...payload })
    .returning();

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}
