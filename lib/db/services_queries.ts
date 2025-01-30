import { Tables } from '@/types_db';
import { createClient } from '@/utils/supabase/client';



const getServicesForServiceId = async (serviceId: string) => {
  const db = createClient();

  return db
    .from('services')
    .select(`*`)
    .eq('id', serviceId)
    .single();
};


const postService = async (payload: Tables<'services'>) => {
  const db = createClient();

  return db
    .from('services')
    .insert(payload)
    .select()
    .single();
};

const putService = async (payload: Tables<'services'>) => {
  const db = createClient();

  return db
    .from('services')
    .update(payload)
    .eq('id', payload.id)
    .select();
};


export { getServicesForServiceId, postService, putService };