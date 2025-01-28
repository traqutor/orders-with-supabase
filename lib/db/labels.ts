import { Tables } from '@/types_db';
import { createClient } from '@/utils/supabase/client';

const getLabels = async () => {
  const db = createClient();

  return db
    .from('labels')
    .select('*');
};

const postLabel = async (payload: Tables<'labels'>) => {
  const db = createClient();

  return db
    .from('labels')
    .insert(payload)
    .select();
};

const putLabel = async (payload: Tables<'labels'>) => {
  const db = createClient();

  return db
    .from('labels')
    .update(payload)
    .eq('id', payload.id)
    .select();
};

const deleteLabel = async (payload: Tables<'labels'>) => {
  const db = createClient();

  return db
    .from('labels')
    .delete()
    .eq('id', payload.id)
    .select();
};


export { getLabels, postLabel, putLabel, deleteLabel };