'use client';

import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Package, SaveIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as Form from '@/components/ui/form';
import { Shipment } from '@/lib/db/schema';
import { useShipments } from '@/lib/client/useShipments';
import { toInputDate, toInputDateTime } from '@/utils/time';


interface ShipmentDialogProps {
  shipment: Shipment;
  fetchDataOnSubmit: () => void;
}

const ShipmentDialog: React.FC<ShipmentDialogProps> = React.memo(({ shipment, fetchDataOnSubmit }) => {

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Shipment>(shipment);
  const { updateShipment } = useShipments();


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await updateShipment({
      ...formData,
      id: shipment.id
    });


    fetchDataOnSubmit();
    setOpen(false);
  };


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const key = name as keyof Shipment;

    if (type === 'date') {
      const d = toInputDateTime(value);

      setFormData((prevFormData) => ({
        ...prevFormData,
        [key]: d
      }));
    } else {

      setFormData((prevFormData) => ({
        ...prevFormData,
        [key]: value
      }));
    }
  };


  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Package className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Edytuj wysyłkę
          </span>
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content
          className="bg-card border shadow-xl fixed left-1/2 top-1/2 overflow-auto max-h-[85vh] w-[90vw] max-w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-md p-[25px] focus:outline-hidden data-[state=open]:animate-contentShow">
          <Dialog.Title className="m-0 text-[17px] font-medium">
            Wysyłka
          </Dialog.Title>
          <Dialog.Description className="mb-5 mt-2.5 text-[13px] leading-normal text-muted-foreground ">
            Edytujesz dane do wysyłki.
          </Dialog.Description>

          <Form.Root
            onSubmit={handleSubmit}
          >

            <Form.Field>
              <Form.Label htmlFor="contact" className="text-muted-foreground text-xs">
                Nazwa
              </Form.Label>
              <input
                id="contact"
                type="text"
                name="contact"
                value={formData.contact || ''}
                onChange={handleChange}
                placeholder="Nazwa"
                className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="address" className="text-muted-foreground text-xs">Adres</Form.Label>
              <textarea
                id="address"
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                placeholder="Adres"
                rows={3}
                className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </Form.Field>

            <div className="flex w-full items-center justify-evenly gap-2">

              <Form.Field className="flex flex-col w-full">
                <Form.Label htmlFor="phoneId" className="text-muted-foreground text-xs mb-0.5">Telefon</Form.Label>
                <input
                  id="phoneId"
                  type="text"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  placeholder="Telefon"
                  className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </Form.Field>


              <Form.Field className="flex flex-col w-full">
                <Form.Label htmlFor="emailId" className="text-muted-foreground text-xs mb-0.5">Email</Form.Label>
                <input
                  id="emailId"
                  type="text"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  placeholder="Email"
                  className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </Form.Field>
            </div>

            <div>
              <label htmlFor="due_at" className="text-muted-foreground text-xs mb-0.5">Wysłać do dnia</label>
              <input
                id="due_at"
                type="date"
                name="due_at"
                value={formData.due_at ? toInputDate(formData.due_at) : ''}
                onChange={handleChange}
                placeholder="Płatnosć"
                className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>


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
});


export default ShipmentDialog;
