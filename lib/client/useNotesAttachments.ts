import { deleteData, getData, postData, putData } from '@/utils/helpers';
import { NewNoteAttachment, NoteAttachment } from '@/lib/db/schema';


export function useNotesAttachments() {
  const url = '/api/dashboard/notes_attachments';

  const fetchNotesAttachments = async (notesId: string): Promise<NoteAttachment[]> => {
    const response = await getData<NoteAttachment[]>({ url: `${url}/${notesId}` });

    if (response.error) throw new Error(`Get list of NotesAttachments dor NoteId: ${notesId}  Error: ${JSON.stringify(response)}`);


    return response.data;
  };

  const createNoteAttachment = async (payload: NewNoteAttachment) => {
    const response = await postData({ url, data: payload });

    if (response.error) throw new Error(`Create NoteAttachment: ${payload} Error: ${JSON.stringify(response)}`);

    return response.data;
  };

  const updateNoteAttachment = async (payload: NoteAttachment) => {
    const response = await putData({ url: `${url}/${payload.note_id}/${payload.id}`, data: payload });

    if (response.error) throw new Error(`Update NoteAttachment: ${payload} Error: ${JSON.stringify(response)}`);

    return response.data;
  };

  const deleteNoteAttachment = async (payload: NoteAttachment) => {
    const response = await deleteData({ url: `${url}/${payload.note_id}/${payload.id}`, data: payload });

    if (response.error) throw new Error(`Delete NoteAttachment: ${payload} Error: ${JSON.stringify(response)}`);

    return response.data;
  };


  return {
    createNoteAttachment,
    deleteNoteAttachment,
    fetchNotesAttachments,
    updateNoteAttachment
  };

}
