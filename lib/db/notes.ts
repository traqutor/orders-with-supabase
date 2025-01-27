import { Tables } from '@/types_db';
import { createClient } from '@/utils/supabase/client';

const postNote = async (payload: Tables<'notes'>) => {
  const db = createClient();

  return db
    .from('notes')
    .insert(payload)
    .select();
};

const putNote = async (payload: Tables<'notes'>) => {
  const db = createClient();

  return db
    .from('notes')
    .update(payload)
    .eq('id', payload.id)
    .select();
};

const deleteNote = async (payload: Tables<'notes'>) => {
  const db = createClient();

  return db
    .from('notes')
    .delete()
    .eq('id', payload.id)
    .select();
};


export { postNote, putNote, deleteNote };