import { deleteData, getData } from '@/utils/helpers';
import { NoteAttachment, NoteAttachmentUploadItem } from '@/lib/db/schema';


export type UploadNoteAttachment = {
  noteId: string,
  formData: FormData;
}

export function useNotesAttachments() {
  const url = '/api/dashboard/notes_attachments';

  const fetchNotesAttachments = async (notesId: string) => {
    const response = await getData<NoteAttachmentUploadItem[]>({ url: `${url}/${notesId}` });

    if (response.error) throw new Error(`Get list of NotesAttachments dor NoteId: ${notesId}  Error: ${JSON.stringify(response)}`);

    return response.data;
  };

  const uploadNoteAttachment = async (noteId: string, formData: FormData) => {
    const response = await fetch(`${url}/${noteId}`, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (data.error) throw new Error(`Create NoteAttachment: ${noteId} Error: ${JSON.stringify(data)}`);

    return data;
  };

  const deleteNoteAttachment = async (payload: NoteAttachment) => {
    const response = await deleteData({ url: `${url}/${payload.note_id}/${payload.upload_id}`, data: payload });

    if (response.error) throw new Error(`Delete NoteAttachment: ${payload} Error: ${JSON.stringify(response)}`);

    return response.data;
  };


  return {
    deleteNoteAttachment,
    fetchNotesAttachments,
    uploadNoteAttachment
  };

}
