import { eq } from 'drizzle-orm/sql/expressions/conditions';


import { sBase } from '@/lib/db/db';
import { NewNoteAttachment, NewUpload, NoteAttachmentUploadItem, notes_attachments, uploads } from '@/lib/db/schema';
import { deleteFileFromAppFolder, saveFileToAppFolder } from '@/utils/save_file';
import { v4 } from 'uuid';


/**
 * GET url: /api/dashboard/notes_attachments/:noteId
 */


export async function GET(_: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  try {
    const { slug } = await params;

    if (!slug) {
      return new Response(JSON.stringify({ data: 'Unprocessable Entity' }), { status: 422 });
    }

    const data: NoteAttachmentUploadItem[] = await sBase
      .select()
      .from(notes_attachments)
      .leftJoin(uploads, eq(uploads.id, notes_attachments.upload_id))
      .where(eq(notes_attachments.note_id, slug[0]));

    return new Response(JSON.stringify({ data: data }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ data: `Error on GET request: ${error}` }), { status: 400 });
  }
}


/**
 * POST url: /api/dashboard/notes_attachments/:noteId , body: {formData: [files]}
 */

export async function POST(req: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;

  if (!slug) {
    return new Response(JSON.stringify({ data: 'Unprocessable Entity' }), { status: 422 });
  }

  try {

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const mimetype = formData.get('mimetype') as string;
    const fileName = file.name as string;
    const id = v4();

    const path = await saveFileToAppFolder(file, id);

    const upload = {
      name: fileName,
      id,
      mimetype,
      url: path
    } as NewUpload;

    const upl = await sBase
      .insert(uploads)
      .values({ ...upload })
      .returning();

    const note_attachment = {
      note_id: slug[0],
      upload_id: upl[0].id
    } as NewNoteAttachment;


    const nota = await sBase
      .insert(notes_attachments)
      .values(note_attachment)
      .returning();

    return new Response(JSON.stringify({ data: `Received file ${fileName} saved successfully` }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ data: `Error on POST ${slug} request: ${error}` }), { status: 400 });
  }
}


/**
 * DELETE url: /api/dashboard/notes_attachments/:noteId/:attachmentId
 */

export async function DELETE(_: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  try {
    const { slug } = await params;

    if (!slug || slug[1] === undefined) {
      return new Response(JSON.stringify({ data: 'No processable' }), { status: 422 });
    }

    const path = await sBase
      .select()
      .from(uploads)
      .where(eq(uploads.id, slug[1]));

    if (!path) {
      return new Response(JSON.stringify({ data: 'File not found' }), { status: 404 });
    }

    await deleteFileFromAppFolder(path[0].url);

    await sBase.delete(notes_attachments).where(eq(notes_attachments.upload_id, slug[1]));
    await sBase.delete(uploads).where(eq(uploads.id, slug[1]));

    return new Response(JSON.stringify({ data: 'File deleted successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ data: error }), { status: 422 });
  }
}