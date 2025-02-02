import { Tables, TablesInsert } from '@/types_db';
import { createClient } from '@/utils/supabase/client';

const getActionsForOrderId = async (orderId: string) => {
  const db = createClient();

  return db
    .from('orders_actions')
    .select(`*, 
    actions(*)`)
    .eq('order_id', orderId);
};


const postOrderAction = async (payload: TablesInsert<'orders_actions'>) => {
  const db = createClient();
  return db
    .from('orders_actions')
    .insert(payload)
    .select();
};

const putOrderAction = async (payload: Tables<'orders_actions'>) => {
  const db = createClient();
  const { data: { user } } = await db.auth.getUser();

  if (!user) {
    throw new Error('User not found');
  }

  return db
    .from('orders_actions')
    .update({ ...payload, performed_at: new Date().toISOString(), performed_by: user.id })
    .eq('id', payload.id);
};


const deleteOrderAction = async (payload: Tables<'orders_actions'>) => {
  const db = createClient();

  return db
    .from('orders_actions')
    .delete()
    .eq('action_id', payload.action_id);
};


export { getActionsForOrderId, postOrderAction, deleteOrderAction, putOrderAction };