'use client';

import * as Menubar from '@radix-ui/react-menubar';
import { EditIcon, MoreVertical, PinIcon } from 'lucide-react';
import React from 'react';
import { Tables } from '@/types_db';
import { deleteNote, putNote } from '@/lib/db/notes';
import { useRouter } from 'next/navigation';
import ConfirmDialog from '@/components/ui/Dialog/confirm-dialog';
import NoteCreateDialog from '@/app/(protected)/order/note-create-dialog';

export const NoteMenu = (
  props:
  { note: Tables<'notes'> }) => {

  const router = useRouter();

  const { note } = props;

  const handlePin = async (event: Event) => {

    event.preventDefault();

    const { error } = await putNote({
      ...note,
      pin: !note.pin
    });

    if (error) {
      console.error('error', error);
      return;
    } else {
      router.refresh();
    }
  };


  const handleEdit = async (event: Event) => {
    event.preventDefault();


    const { error } = await putNote({
      ...note
    });


    if (error) {
      console.error('error', error);
      return;
    } else {
      router.refresh();
    }
  };


  const handleDelete = async () => {

    const { error } = await deleteNote({
      ...note
    });

    if (error) {
      console.error('error', error);
      return;
    } else {
      router.refresh();
    }
  };

  return (
    <Menubar.Root>
      <Menubar.Menu>
        <Menubar.Trigger
          className="invisible group-hover:visible absolute bottom-[-12px] right-[-12px] flex select-none items-center justify-between gap-0.5 rounded py-2 text-[13px] font-medium leading-none outline-none">

          <MoreVertical className="text-sm text-gray-400" />
        </Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content
            className="min-w-min bg-card border rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]"
            align="end"
            sideOffset={5}
            alignOffset={5}
          >

            {note.pin ?

              <Menubar.Item
                onSelect={handlePin}
                className="group relative flex gap-2 h-[35px] hover:text-green-800  font-medium select-none items-center rounded p-1 text-[13px] leading-none  outline-none ">
                <PinIcon className="rotate-12" />
                Odepnij
              </Menubar.Item> :

              <Menubar.Item
                onSelect={handlePin}
                className="group relative flex gap-2 h-[35px] hover:text-green-800  font-medium select-none items-center rounded p-1 text-[13px] leading-none  outline-none ">
                <PinIcon className="text-tomato-900 dark:text-tomato-600" />
                Przypnij
              </Menubar.Item>
            }

            <Menubar.Item
              onSelect={handleEdit}
              className="group relative flex h-[35px] font-medium  hover:text-green-800 select-none items-center rounded p-1 text-[13px] leading-none  outline-none "
            >
              <NoteCreateDialog orderId={note.order_id} note={note}>
                <div
                  className="group relative flex gap-2 h-[35px] hover:text-green-800  font-medium select-none items-center rounded p-1 text-[13px] leading-none  outline-none "
                >
                  <EditIcon /> Edytuj
                </div>
              </NoteCreateDialog>
            </Menubar.Item>

            <Menubar.Separator className="m-[5px] h-px bg-neutral-100" />
            <div
              className="group relative flex h-[35px] font-medium select-none items-center rounded p-1 text-[13px] leading-none  outline-none ">
              <ConfirmDialog
                triggerLabel="Skasuj notatkę"
                title="Kasujesz notatkę"
                description="Czy potwierdzasz?"
                onClickSubmit={handleDelete}
              />
            </div>

          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>
    </Menubar.Root>
  );
};
