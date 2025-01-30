import { Tables } from '@/types_db';
import { createClient } from '@/utils/supabase/client';

const getPositionsForOrderId = async (orderId: string) => {
  const db = createClient();

  return db
    .from('orders_positions')
    .select(`*`)
    .eq('order_id', orderId);
};


const postOrderPosition = async (payload: Tables<'orders_positions'>) => {
  const db = createClient();

  return db
    .from('orders_positions')
    .insert(payload)
    .select();
};

const putOrderPosition = async (payload: Tables<'orders_positions'>) => {
  const db = createClient();

  return db
    .from('orders_positions')
    .update(payload)
    .eq('id', payload.id)
    .select();
};

const deleteOrderPosition = async (payload: Tables<'orders_positions'>) => {
  const db = createClient();

  return db
    .from('orders_positions')
    .delete()
    .eq('id', payload.id)
    .select();
};


export { getPositionsForOrderId, putOrderPosition, postOrderPosition, deleteOrderPosition };