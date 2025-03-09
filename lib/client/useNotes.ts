import { deleteData, getData, postData, putData } from '@/utils/helpers';
import { NewNote, Note } from '@/lib/db/schema';


export function useNotes() {
  const url = '/api/dashboard/notes';


  const fetchNotes = async (orderId: string): Promise<Note[]> => {
    const response = await getData<Note[]>({ url: `${url}/${orderId}` });

    if (response.error) throw new Error(`Get list of Notes Error: ${JSON.stringify(response)}`);

    return response.data;
  };

  const createNote = async (payload: NewNote) => {
    const response = await postData({
      url: `${url}/${payload.order_id}`,
      data: { ...payload, created_by: '649b8b37-f00b-4e19-a94c-2e29006bd15d' }
    });

    if (response.error) throw new Error(`Create Note: ${payload} Error: ${JSON.stringify(response)}`);

    return response.data;
  };

  const updateNote = async (payload: Note) => {
    const response = await putData({ url: `${url}/${payload.order_id}/${payload.id}`, data: payload });

    if (response.error) throw new Error(`Update Note: ${payload} Error: ${JSON.stringify(response)}`);

    return response.data;
  };

  const deleteNote = async (payload: Note) => {
    const response = await deleteData({ url: `${url}/${payload.order_id}/${payload.id}`, data: payload });

    if (response.error) throw new Error(`Delete Note: ${payload} Error: ${JSON.stringify(response)}`);

    return response.data;
  };


  return {
    createNote,
    deleteNote,
    fetchNotes,
    updateNote
  };

}
