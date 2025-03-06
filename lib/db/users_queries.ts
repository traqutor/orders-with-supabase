import { createClient } from '@/utils/supabase/client';
import { NewProfile, Profile } from '@/lib/db/schema';

const db = createClient();

const getProfiles = async () => {


  return db
    .from('profiles')
    .select(`*`)
    .eq('is_disabled', false);
};


const postProfile = async (payload: NewProfile) => {


  console.log('postProfile', payload);


};

const putProfile = async (payload: Profile) => {

  return db
    .from('profiles')
    .update(payload)
    .eq('id', payload.id)
    .select();
};

const deleteProfile = async (payload: Profile) => {

  return db
    .from('profiles')
    .update({ ...payload, is_disabled: true })
    .eq('id', payload.id)
    .select();
};

export { getProfiles, postProfile, putProfile, deleteProfile };