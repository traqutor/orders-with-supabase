import { Tables } from '@/types_db';
import { createClient } from '@/utils/supabase/client';

const getServicePositionsForOrderId = async (orderId: string) => {
  const db = createClient();

  return db
    .from('services_positions')
    .select(`*`)
    .eq('order_id', orderId);
};


const postServicePosition = async (payload: Tables<'services_positions'>) => {
  const db = createClient();

  return db
    .from('services_positions')
    .insert(payload)
    .select();
};

const putServicePosition = async (payload: Tables<'services_positions'>) => {
  const db = createClient();

  return db
    .from('services_positions')
    .update(payload)
    .eq('id', payload.id)
    .select();
};

const deleteServicePosition = async (payload: Tables<'services_positions'>) => {
  const db = createClient();

  return db
    .from('services_positions')
    .delete()
    .eq('id', payload.id)
    .select();
};


export { getServicePositionsForOrderId, postServicePosition, putServicePosition, deleteServicePosition };