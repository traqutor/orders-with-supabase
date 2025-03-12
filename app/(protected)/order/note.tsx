'use client';

import React, { Fragment, useEffect, useState } from 'react';
import { DeleteIcon, File, PinIcon } from 'lucide-react';
import cn from 'clsx';
import { useRouter } from 'next/navigation';
import { NoteMenu } from '@/app/(protected)/order/note-menu';
import NoteDialog from '@/app/(protected)/order/note-dialog';
import AvatarProfile from '@/components/profile/avatar-profile';
import ConfirmDialog from '@/components/ui/Dialog/confirm-dialog';
import { Note, NoteAttachmentUploadItem } from '@/lib/db/schema';
import { useNotes } from '@/lib/client/useNotes';
import { useNotesAttachments } from '@/lib/client/useNotesAttachments';
import { getFormatedDateTime } from '@/utils/time';

const NoteComponent = (
  props:
  { note: Note }) => {
  const { note } = props;
  const [attachments, setAttachments] = useState<NoteAttachmentUploadItem[]>();
  const router = useRouter();
  const { updateNote } = useNotes();
  const {
    deleteNoteAttachment,
    fetchNotesAttachments
  } = useNotesAttachments();

  useEffect(() => {
    getNoteAttachments();
  }, []);


  const handlePin = async () => {

    await updateNote({
      ...note,
      pin: !note.pin
    });

    router.refresh();
  };

  const getNoteAttachments = () => {
    fetchNotesAttachments(note.id).then(response => {
      setAttachments(response);
    });
  };

  const handleDownloadFile = async (attachment: NoteAttachmentUploadItem | null) => {
    console.log('download it:', attachment);
  };

  const handleDeleteNotesAttachments = async (attachments: NoteAttachmentUploadItem) => {
    await deleteNoteAttachment(attachments.notes_attachments);
    getNoteAttachments();
  };

  const classNames = cn('relative w-full h-min flex flex-col justify-between items-start rounded-lg border mb-6 py-5 px-4',
    { 'bg-blue-200  border-blue-200  dark:bg-blue-100  dark:border-blue-100': !note.pin },
    { 'bg-yellow-200  border-yellow-200  dark:bg-yellow-100 dark:border-yellow-100': note.pin }
  );

  const classNamesPin = cn('absolute end-[-4px] top-[-12px] cursor-pointer text-muted-foreground',
    { 'text-tomato-900 dark:text-tomato-600 rotate-12': note.pin }
  );


  return (
    <Fragment>
      <NoteDialog orderId={note.order_id} note={note} />
      <div
        key={note.id}
        className={classNames}>

        <PinIcon onClick={handlePin} className={classNamesPin} />

        <p className="text-gray-800 text-md whitespace-pre-wrap">{note.message}</p>

        <div className="group w-full flex flex-col items-end">
          <div className="relative flex items-end justify-between text-gray-800 w-full">
            <div className="flex w-full items-center justify-between pt-5">
              <div className="text-xs text-muted-foreground">
                <div className="flex items-center justify-start gap-2 pb-1">
                  <span>Dodał:</span>
                  <AvatarProfile profileId={note.created_by} />
                </div>
                <span>{getFormatedDateTime(note.created_at)}</span>
              </div>
              <div>
                {note &&
                  <NoteMenu
                    note={note}
                    onAttachmentChange={getNoteAttachments} />
                }
              </div>
            </div>

          </div>
        </div>

        {attachments && (
          <ul className={'flex flex-col w-full mt-7'}>
            {attachments.map(attachment => (
              <li
                key={attachment.notes_attachments.id}
                className="group flex w-full gap-2 justify-start items-center text-xs cursor-pointer text-muted-foreground hover:text-green-800 text-nowrap text-ellipsis">

                {attachment.uploads ?
                  <span
                    onClick={() => handleDownloadFile(attachment)}
                    className="flex justify-start items-center  w-[200px] gap-2">
                  <span className="w-[24px]">
                  {attachment.uploads.mimetype?.includes('image') ?
                    <img
                      className={'h-5 w-5 rounded-sm inline-flex'}
                      src={attachment.uploads.url}
                      alt={attachment.uploads.name} />
                    : <File className={'h-[14px] inline-flex'} />}
                  </span>
                  <span className="truncate">{attachment.uploads.name} </span>
                </span> : <span> Brak pliku </span>}

                <div className=" inline-flex ms-auto">
                  <ConfirmDialog
                    triggerIcon={<DeleteIcon
                      className={'invisible group-hover:visible h-5 w-5 '}
                    />}
                    triggerLabel=""
                    title="Kasujesz załącznik"
                    description="Czy potwierdzasz?"
                    onClickSubmit={() => handleDeleteNotesAttachments(attachment)}
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

export default NoteComponent;
