
import React from 'react';
import { createClient } from '@/utils/supabase/client';
import NoteComponent from '@/app/(protected)/order/note';
import { Note } from '@/lib/db/schema';

const getNotes = async (orderId: string) => {
  const db = createClient();

  return db
    .from('notes')
    .select()
    .eq('order_id', orderId)
    .order('pin', { ascending: false })
    .order('created_at', { ascending: false });
};


const NotesList = async (
  props:
  { orderId: string }) => {

  const { orderId } = props;

  const { data, error } = await getNotes(orderId);


  if (error) throw new Error(`Get list of Notes with order_id: ${orderId}  error:`, error);

  return (
    <div>

      {data?.map((item: Note) => (

        <NoteComponent key={item.id} note={item} />
      ))}
    </div>
  );
};

export default NotesList;
