import { createClient } from '@/utils/supabase/client';
import { Profile } from '@/lib/db/schema';

const db = createClient();

const getProfiles = async () => {


  return db
    .from('profiles')
    .select(`*`)
    .eq('is_disabled', false);
};


const postProfile = async (payload: {
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  phone: string
}) => {


  return db.auth.signUp(
    {
      email: payload.email,
      password: payload.password,
      options: {
        data: {
          first_name: payload.first_name,
          last_name: payload.last_name,
          phone_number: payload.phone
        }
      }
    }
  );


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