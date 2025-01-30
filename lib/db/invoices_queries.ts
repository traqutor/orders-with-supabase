import { Tables } from '@/types_db';
import { createClient } from '@/utils/supabase/client';

const getInvoiceByInvoiceId = async (invoiceId: string) => {
  const db = createClient();

  return db
    .from('invoices')
    .select(`*`)
    .eq('id', invoiceId)
    .single();
};


const postInvoice = async (payload: Tables<'invoices'>) => {
  const db = createClient();

  return db
    .from('invoices')
    .insert(payload)
    .select()
    .single();
};

const putInvoice = async (payload: Tables<'invoices'>) => {
  const db = createClient();

  return db
    .from('invoices')
    .update(payload)
    .eq('id', payload.id)
    .select();
};


export { getInvoiceByInvoiceId, postInvoice, putInvoice };