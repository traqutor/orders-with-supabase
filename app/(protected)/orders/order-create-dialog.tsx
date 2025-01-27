'use client';

import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { PlusCircle, SaveIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as Form from '@/components/ui/form';
import { createClient } from '@/utils/supabase/client';
import { Tables } from '@/types_db';
import { useRouter } from 'next/navigation';

const postOrder = async (order: any) => {
  const db = createClient();

  return db
    .from('orders')
    .insert(order)
    .select();
};

const OrderCreateDialog = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {} as Tables<'orders'>;

    const values = Object.fromEntries(new FormData(event.currentTarget));

    const { error } = await postOrder({
      ...payload,
      customer_id: values.customer,
      title: values.title,
      status_id: '14b47017-86ca-40e6-8b6f-f4ba78f2d4c0'
    });

    if (error) {
      console.error('error', error);
      return;
    } else {
      setOpen(false);
      router.push('/orders');
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Dodaj Zamówienie
            </span>
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content
          className="bg-card border shadow-xl fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-md p-[25px] focus:outline-hidden data-[state=open]:animate-contentShow">
          <Dialog.Title className="m-0 text-[17px] font-medium">
            Dodaj Zamówienie
          </Dialog.Title>
          <Dialog.Description className="mb-5 mt-2.5 text-[15px] leading-normal text-mauve11 ">
            Wybierz klienta i wprowadź tytuł zamówienia
          </Dialog.Description>

          <Form.Root
            onSubmit={(event) => handleSubmit(event)}
          >
            <Form.Field>
              <Form.Row>
                <Form.Label htmlFor="customerId">Klient</Form.Label>
                <Form.Message>
                  Nazwa klienta
                </Form.Message>
              </Form.Row>
              <Form.Input
                id="customerId"
                type="text"
                name="customer"
                placeholder="Klient"
                required />
            </Form.Field>


            <Form.Field>
              <Form.Row>
                <Form.Label htmlFor="customerId">Tytuł</Form.Label>
                <Form.Message>
                  Tytuł zamówienia
                </Form.Message>
              </Form.Row>
              <Form.Input
                id="titleId"
                type="text"
                name="title"
                placeholder="Tytuł"
                required />
            </Form.Field>

            <Form.Message>
              Wpisz nazwę klienta
            </Form.Message>

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

            <Dialog.Close asChild>
              <button
                className="absolute right-4 top-5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-hidden"
                aria-label="Close"
              >
                <XIcon />
              </button>
            </Dialog.Close>

          </Form.Root>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default OrderCreateDialog;
