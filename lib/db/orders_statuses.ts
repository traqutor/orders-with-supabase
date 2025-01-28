import { Tables } from '@/types_db';
import { createClient } from '@/utils/supabase/client';

const getOrdersStatuses = async () => {
  const db = createClient();

  return db
    .from('orders_statuses')
    .select('*');
};

const postOrderStatus = async (payload: Tables<'orders_statuses'>) => {
  const db = createClient();

  return db
    .from('orders_statuses')
    .insert(payload)
    .select();
};

const putOrderStatus = async (payload: Tables<'orders_statuses'>) => {
  const db = createClient();

  return db
    .from('orders_statuses')
    .update(payload)
    .eq('id', payload.id)
    .select();
};

const deleteOrderStatus = async (payload: Tables<'orders_statuses'>) => {
  const db = createClient();

  return db
    .from('orders_statuses')
    .delete()
    .eq('id', payload.id)
    .select();
};


export { getOrdersStatuses, postOrderStatus, putOrderStatus, deleteOrderStatus };