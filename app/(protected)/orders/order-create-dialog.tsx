'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { PlusCircle, SaveIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const wait = () => new Promise((resolve) => setTimeout(resolve, 5000));

const DialogDemo = () => {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log('submit', event);
    wait().then(() => setOpen(false));
    event.preventDefault();
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Order
            </span>
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="m-0 text-[17px] font-medium text-mauve12">
            Add order
          </Dialog.Title>
          <Dialog.Description className="mb-5 mt-2.5 text-[15px] leading-normal text-mauve11">
            Put title and customer
          </Dialog.Description>
          <form onSubmit={(event) => handleSubmit(event)}>
            <fieldset className="mb-[15px] flex items-center gap-5">
              <Label htmlFor="title">Order title</Label>
              <Input
                type="text"
                name="title"
                placeholder="Order title"
                required
              />

            </fieldset>
            <fieldset className="mb-[15px] flex items-center gap-5">

              <Label htmlFor="customer">Customer</Label>
              <Input
                type="password"
                name="customer"
                placeholder="Customer"
                required
              />

            </fieldset>

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
                className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
                aria-label="Close"
              >
                <XIcon />
              </button>
            </Dialog.Close>

          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogDemo;
