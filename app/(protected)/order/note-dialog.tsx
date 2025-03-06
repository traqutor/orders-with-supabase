'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import * as Dialog from '@radix-ui/react-dialog';
import * as Form from '@radix-ui/react-form';
import { SaveIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Note } from '@/lib/db/schema';
import { useNotes } from '@/lib/client/useNotes';

type ButtonProps = React.HTMLProps<HTMLButtonElement>

const NoteDialog = React.forwardRef<HTMLButtonElement, ButtonProps &
  { orderId: string, note?: Note }>(
  (props, ref) => {
    const { orderId, note } = props;

    const [open, setOpen] = useState(false);
    const { createNote } = useNotes();

    const [message, setMessage] = useState(Object.assign({}, note).message || '');
    const router = useRouter();


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.preventDefault();

      const payload = { ...note } as Note;


      await createNote({
        ...payload,
        order_id: orderId,
        message,
        pin: false
      });


      router.push(`/order/${orderId}`);

    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.stopPropagation();
      const { value } = e.target;

      setMessage(value);
    };

    return (
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          {props.children}
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content
            className="bg-card border fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-md p-[25px] shadow-xl focus:outline-hidden data-[state=open]:animate-contentShow">
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
                  name="message"
                  value={message}
                  onChange={handleChange}
                  rows={5}
                  className="flex whitespace-pre-wrap min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                </Form.Control>
              </Form.Field>
              <
                Form.Submit asChild>
                <div className="mt-[25px] flex justify-end gap-2">
                  <Dialog.Close asChild>
                    <Button size="sm" variant="outline" className="h-8 gap-1 text-xs" type="submit">

                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Cancel</span>
                    </Button>
                  </Dialog.Close>

                  <Button size="sm"
                          className="inline-flex h-8 items-center justify-center rounded leading-none outline-none outline-offset-1 hover:bg-green-200 focus-visible:outline-2 focus-visible:outline-green-300 select-none bg-green-100 text-green-800 border-green-600 text-xs font-medium me-2 px-2.5 py-0.5 dark:bg-green-900 dark:text-green-300"
                          type="submit"
                  >
                    <SaveIcon className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Save</span>
                  </Button>


                </div>
              </Form.Submit>
            </Form.Root>


            <Dialog.Close asChild>
              <button
                className="absolute right-4 top-5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-hidden"
                aria-label="Close"
              >
                <XIcon />
              </button>
            </Dialog.Close>

          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  })
;

export default NoteDialog;
