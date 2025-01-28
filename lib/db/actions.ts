import { Tables } from '@/types_db';
import { createClient } from '@/utils/supabase/client';

const getActions = async () => {
  const db = createClient();

  return db
    .from('actions')
    .select('*');
};

const postAction = async (payload: Tables<'actions'>) => {
  const db = createClient();

  return db
    .from('actions')
    .insert(payload)
    .select();
};

const putAction = async (payload: Tables<'actions'>) => {
  const db = createClient();

  return db
    .from('actions')
    .update(payload)
    .eq('id', payload.id)
    .select();
};

const deleteAction = async (payload: Tables<'actions'>) => {
  const db = createClient();

  return db
    .from('actions')
    .delete()
    .eq('id', payload.id)
    .select();
};


export { getActions, postAction, putAction, deleteAction };