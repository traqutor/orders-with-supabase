import React from 'react';

import NoteComponent from '@/app/(protected)/order/note';
import { Note, notes } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';
import { eq } from 'drizzle-orm/sql/expressions/conditions';

const getNotes = async (orderId: string) => {
  return sBase.select()
    .from(notes)
    .where(eq(notes.order_id, orderId))
    .orderBy(notes.pin, notes.created_at);
};


const NotesList = async (
  props:
  { orderId: string }) => {

  const { orderId } = props;

  const data = await getNotes(orderId);


  return (
    <div>

      {data?.map((item: Note) => (
        <NoteComponent key={item.id} note={item} />
      ))}
    </div>
  );
};

export default NotesList;
