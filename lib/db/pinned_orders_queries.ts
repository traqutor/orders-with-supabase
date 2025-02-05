import { createClient } from '@/utils/supabase/client';
import { Tables, TablesInsert } from '@/types_db';

const db = createClient();

const pinOrder = async (pin: TablesInsert<'pinned_orders'>) => {

  return db
    .from('pinned_orders')
    .insert(pin)
    .select();
};

const unPinOrder = async (pin: Tables<'pinned_orders'>) => {

  return db
    .from('pinned_orders')
    .delete()
    .eq('id', pin.id)
    .select();
};


export { pinOrder, unPinOrder };