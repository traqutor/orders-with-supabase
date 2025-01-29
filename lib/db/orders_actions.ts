import { Tables } from '@/types_db';
import { createClient } from '@/utils/supabase/client';

const getActionsForOrderId = async (orderId: string) => {
  const db = createClient();

  return db
    .from('orders_actions')
    .select(`*, 
    actions(*)`)
    .eq('order_id', orderId);
};


const postOrderAction = async (payload: Tables<'orders_actions'>) => {
  const db = createClient();

  return db
    .from('orders_actions')
    .insert(payload)
    .select();
};


const deleteOrderAction = async (payload: Tables<'orders_actions'>) => {
  const db = createClient();

  return db
    .from('orders_actions')
    .delete()
    .eq('id', payload.id)
    .select();
};


export { getActionsForOrderId, postOrderAction, deleteOrderAction };