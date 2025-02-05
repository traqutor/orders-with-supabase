'use client';

import React, { Fragment } from 'react';
import { PinIcon } from 'lucide-react';
import { Tables } from '@/types_db';
import { DateTime } from 'luxon';
import cn from 'clsx';
import { useRouter } from 'next/navigation';
import { NoteMenu } from '@/app/(protected)/order/note-menu';
import { putNote } from '@/lib/db/notes';
import NoteDialog from '@/app/(protected)/order/note-dialog';
import AvatarProfile from '@/components/profile/avatar-profile';

const Note = (
  props:
  { note: Tables<'notes'> }) => {

  const router = useRouter();

  const { note: item } = props;

  const handlePin = async () => {
    const { error } = await putNote({
      ...item,
      pin: !item.pin
    });

    if (error) {
      console.error('error', error);
      return;
    } else {
      router.refresh();
    }
  };

  const classNames = cn('relative group w-full h-min flex flex-col justify-between items-start rounded-lg border mb-6 py-5 px-4',
    { 'bg-blue-200  border-blue-200  dark:bg-blue-100  dark:border-blue-100': !item.pin },
    { 'bg-yellow-200  border-yellow-200  dark:bg-yellow-100 dark:border-yellow-100': item.pin }
  );

  const classNamesPin = cn('absolute end-[-4px] top-[-12px] cursor-pointer',
    { 'text-tomato-900 dark:text-tomato-600 rotate-12': item.pin },
    { 'invisible group-hover:visible ': !item.pin }
  );


  return (
    <Fragment>
      <NoteDialog orderId={item.order_id} note={item} />
      <div
        key={item.id}
        className={classNames}>

        <PinIcon onClick={(e) => {
          e.preventDefault();
          handlePin().then();
        }} className={classNamesPin} />

        <p className="text-gray-800 text-md whitespace-pre-wrap">{item.message}</p>

        <div className="w-full flex flex-col items-end">
          <div className="relative flex items-end justify-between text-gray-800 w-full">
            <div className="flex w-full items-center justify-between pt-5">
              <div className="text-xs text-muted-foreground">
                <div className="flex items-center justify-start gap-2 pb-1">
                <span>Dodał:</span>
                <AvatarProfile profileId={item.created_by} />
                </div>
                <span >{DateTime.fromISO(item.created_at).toFormat('dd-MM-yyyy hh:mm')}</span>
              </div>
              <div>
                {item &&
                  <NoteMenu note={item} />}
              </div>
            </div>

          </div>
        </div>
      </div>
    </Fragment>

  );
};

export default Note;
