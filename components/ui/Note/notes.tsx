import React from 'react';
import { PinIcon, MoreVertical } from 'lucide-react';
import { Tables } from '@/types_db';
import { DateTime } from 'luxon';


const Note = async (
  props:
  { note: Tables<'notes'> }) => {

  const { note: item } = props;
//w-full h-min flex flex-col justify-between items-start bg-blue-300 rounded-lg border border-blue-300 mb-6 py-5 px-4
  return (
    <div
      key={item.id}
      className="relative group w-full h-min flex flex-col justify-between items-start bg-yellow-200 rounded-lg border border-yellow-200 mb-6 py-5 px-4">

      <PinIcon className="absolute end-[-4px] top-[-12px] text-tomato-900 dark:text-tomato-800 rotate-12" />

      <p className="text-gray-800 text-md">{item.message}</p>

      <div className="w-full flex flex-col items-end">
        <div className="flex items-end justify-between text-gray-800 w-full relative">
          <p className="text-[10px]">{DateTime.fromISO(item.created_at).toFormat('dd-MM-yyyy hh:mm')}</p>
          <button
            className="absolute bottom-[-10px] end-[-12px] w-8 h-8 hidden group-hover:block"
            aria-label="edit note" role="button">
            <MoreVertical />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Note;
