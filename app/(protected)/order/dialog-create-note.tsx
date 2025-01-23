'use client';

import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Form from '@radix-ui/react-form';
import { Notebook, SaveIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tables } from '@/types_db';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

const postNote = async (note: Tables<'notes'>) => {
  const db = createClient();

  return db
    .from('notes')
    .insert(note)
    .select();
};

const putNote = async (note: Tables<'notes'>) => {
  const db = createClient();

  return db
    .from('notes')
    .update(note)
    .eq('id', note.id)
    .select();
};


const DialogCreateNote = (
  props:
  { orderId: string, note?: Tables<'notes'> }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const { orderId } = props;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {} as Tables<'notes'>;

    const { error } = await postNote({
      ...payload,
      order_id: orderId,
      message: message
    });


    if (error) {
      console.error('error', error);
      return;
    } else {
      setMessage('');
      setOpen(false);
      router.push(`/order/${orderId}`);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button size="sm" variant="outline" className="h-8 gap-1">
          <Notebook className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Dodaj notatkę
            </span>
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content
          className="bg-card fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-md p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="m-0 text-[17px] font-medium">
            Dodaj Notatkę
          </Dialog.Title>
          <Dialog.Description className="mb-5 mt-2.5 text-[15px] leading-normal text-mauve11 ">
            Wpisz tekst.
          </Dialog.Description>


          <Form.Root onSubmit={handleSubmit}>

            <Form.Field name="question">
                <Form.Label htmlFor="messageId" className="flex items-baseline justify-between py-2">
                  Notatka
                </Form.Label>
              <Form.Control asChild>
				        <textarea
                  id="messageId"
                  name='message'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
              </Form.Control>
            </Form.Field>
            <
              Form.Submit asChild>
              <div className="mt-[25px] flex justify-end gap-2">
                <Dialog.Close asChild>
                  <Button size="sm" variant="outline" className="h-8 gap-1" type="submit">

                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Cancel</span>
                  </Button>
                </Dialog.Close>

                <Button size="sm" className="h-8 gap-1" type="submit">
                  <SaveIcon className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Save</span>
                </Button>
              </div>
            </Form.Submit>
          </Form.Root>


          <Dialog.Close asChild>
            <button
              className="absolute right-4 top-5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
              aria-label="Close"
            >
              <XIcon />
            </button>
          </Dialog.Close>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogCreateNote;
