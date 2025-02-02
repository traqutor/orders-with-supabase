import { Tables } from '@/types_db';
import { createClient } from '@/utils/supabase/client';

const getProfiles = async () => {
  const db = createClient();

  return db
    .from('profiles')
    .select(`*`)
    .eq('is_disabled', false)
};

const putProfil = async (payload: Tables<'profiles'>) => {
  const db = createClient();

  return db
    .from('profiles')
    .update(payload)
    .eq('id', payload.id)
    .select();
};

const deleteProfil = async (payload: Tables<'profiles'>) => {
  const db = createClient();

  return db
    .from('profiles')
    .update({ ...payload, is_disabled: true })
    .eq('id', payload.id)
    .select();
};

export { getProfiles, putProfil, deleteProfil };