'use client';

import React, { Fragment, useEffect, useState } from 'react';
import { DeleteIcon, File, PinIcon } from 'lucide-react';
import { Tables } from '@/types_db';
import { DateTime } from 'luxon';
import cn from 'clsx';
import { useRouter } from 'next/navigation';
import { NoteMenu } from '@/app/(protected)/order/note-menu';
import { putNote } from '@/lib/db/notes';
import NoteDialog from '@/app/(protected)/order/note-dialog';
import AvatarProfile from '@/components/profile/avatar-profile';
import { createClient } from '@/utils/supabase/client';
import ConfirmDialog from '@/components/ui/Dialog/confirm-dialog';


type Attachment = { id: string, name: string, mimetype: string };

const Note = (
  props:
  { note: Tables<'notes'> }) => {
  const supabase = createClient();
  const { note: item } = props;
  const router = useRouter();
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  useEffect(() => {
    getNoteAttachments().then();
  }, [item]);

  const handlePin = async () => {
    const { error } = await putNote({
      ...item,
      pin: !item.pin
    });

    if (error) {
      throw new Error(`Pin note error ${JSON.stringify(error)}`);
    }

    router.refresh();
  };

  const getNoteAttachments = async () => {

    const { data, error } = await supabase
      .storage
      .from('attachments')
      .list(`private/${item.id}/`);

    if (error) {
      throw new Error(`Getting note attachments error ${JSON.stringify(error)}`);
    }

    if (data.length > 0) {
      setAttachments(data?.map(attachment => {
        return {
          id: attachment.id,
          name: attachment.name,
          mimetype: attachment.metadata.mimetype
        };
      }));
    }
  };

  const handleDownloadFile = async (attachment: Attachment) => {
    const { data, error } = await supabase
      .storage
      .from('attachments')
      .download(`private/${item.id}/${attachment.name}`);

    if (error) {
      throw new Error(`Getting note attachments error ${JSON.stringify(error)}`);
    }

    const url = URL.createObjectURL(data);

    // Create an anchor element and trigger a download
    const a = document.createElement('a');
    a.href = url;
    a.download = attachment.name; // Set the filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Revoke the URL to free up memory
    URL.revokeObjectURL(url);

  };

  const handleDeleteNotesAttachments = async (attachments: Attachment[]) => {
    await supabase.storage.from('attachments').remove([...attachments.map(a => `private/${item.id}/${a.name}`)]);
    await getNoteAttachments();
  };


  const classNames = cn('relative w-full h-min flex flex-col justify-between items-start rounded-lg border mb-6 py-5 px-4',
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

        <div className="group w-full flex flex-col items-end">
          <div className="relative flex items-end justify-between text-gray-800 w-full">
            <div className="flex w-full items-center justify-between pt-5">
              <div className="text-xs text-muted-foreground">
                <div className="flex items-center justify-start gap-2 pb-1">
                  <span>Dodał:</span>
                  <AvatarProfile profileId={item.created_by} />
                </div>
                <span>{DateTime.fromISO(item.created_at).toFormat('dd-MM-yyyy hh:mm')}</span>
              </div>
              <div>
                {item &&
                  <NoteMenu
                    note={item}
                    onAttachmentChange={getNoteAttachments} />
                }
              </div>
            </div>

          </div>
        </div>

        {attachments.length > 0 && (
          <ul className={'flex flex-col w-full mt-7'}>
            {attachments.map(attachment => (
              <li
                key={attachment.id}
                className="group flex w-full gap-2 justify-start items-center text-xs cursor-pointer text-muted hover:text-green-800 text-nowrap text-ellipsis">

                <span
                  onClick={() => handleDownloadFile(attachment)}
                  className="flex justify-start items-center  w-[200px] gap-2">
                  <span className="w-[24px]">
                  {attachment.mimetype.includes('image') ?
                    <img
                      className={'h-5 w-5 rounded-sm inline-flex'}
                      src={`https://grokxcrznknfvpnzpmuk.supabase.co/storage/v1/object/public/attachments/private/${item.id}/${attachment.name}`}
                      alt="img" />
                    : <File className={'h-[14px] inline-flex'} />}
                  </span>
                  <span className="truncate">{attachment.name} </span>
                </span>

                <div className=" inline-flex ms-auto">
                  <ConfirmDialog
                    triggerIcon={<DeleteIcon
                      className={'invisible group-hover:visible h-5 w-5 '}
                    />}
                    triggerLabel=""
                    title="Kasujesz załącznik"
                    description="Czy potwierdzasz?"
                    onClickSubmit={() => handleDeleteNotesAttachments([attachment])}
                  />
                </div>

              </li>
            ))}
          </ul>
        )}
      </div>
    </Fragment>

  );
};

export default Note;
