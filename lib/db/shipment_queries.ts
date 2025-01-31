import { Tables } from '@/types_db';
import { createClient } from '@/utils/supabase/client';

const getShipmentByShipmentId = async (shipmentId: string) => {
  const db = createClient();

  return db
    .from('shipments')
    .select(`*`)
    .eq('id', shipmentId)
    .single();
};


const postShipment = async (payload: Tables<'shipments'>) => {
  const db = createClient();

  return db
    .from('shipments')
    .insert(payload)
    .select()
    .single();
};

const putShipment = async (payload: Tables<'shipments'>) => {
  const db = createClient();

  return db
    .from('shipments')
    .update(payload)
    .eq('id', payload.id)
    .select();
};

const deleteShipment = async (payload: Tables<'shipments'>) => {
  const db = createClient();

  return db
    .from('shipments')
    .delete()
    .eq('id', payload.id);
};

export { getShipmentByShipmentId, postShipment, putShipment, deleteShipment };