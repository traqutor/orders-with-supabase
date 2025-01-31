'use client';

import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Edit2, SaveIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as Form from '@/components/ui/form';

import { Tables } from '@/types_db';
import { putService } from '@/lib/db/services_queries';
import { Separator } from '@radix-ui/react-separator';
import { toInputDate } from '@/utils/time';


interface ServiceDialogProps {
  service: Tables<'services'>;
  fetchDataOnSubmit: () => void;
}


const ServiceDialog: React.FC<ServiceDialogProps> = React.memo(({ service, fetchDataOnSubmit }) => {

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Tables<'services'>>(service);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { error } = await putService({
      ...formData,
      id: service.id
    });

    if (error) {
      console.error(`Update Service with payload: ${formData} error`, error);
      return;
    } else {
      fetchDataOnSubmit();
      setOpen(false);
    }
  };


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const key = name as keyof Tables<'services'>;

    if (type === 'datetime-local') {
      const d = toInputDate(value);

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
          <Edit2 className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Edytuj serwis
          </span>
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content
          className="bg-card border shadow-xl fixed left-1/2 top-1/2 overflow-auto max-h-[85vh] w-[90vw] max-w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-md p-[25px] focus:outline-hidden data-[state=open]:animate-contentShow">
          <Dialog.Title className="m-0 text-[17px] font-medium">
            Serwis
          </Dialog.Title>
          <Dialog.Description className="mb-5 mt-2.5 text-[13px] leading-normal text-muted-foreground ">
            Edytujesz dane kontaktowe przypisane do serwisu.
          </Dialog.Description>

          <Form.Root
            onSubmit={handleSubmit}
          >

            <Form.Field>
              <Form.Label htmlFor="contactId" className="text-muted-foreground text-xs">
                Nazwa klienta
              </Form.Label>
              <input
                id="contactId"
                type="text"
                name="contact"
                value={formData.contact || ''}
                onChange={handleChange}
                placeholder="Nazwa"
                className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="addressId" className="text-muted-foreground text-xs">Adres</Form.Label>
              <textarea
                id="addressId"
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                placeholder="Adres"
                rows={3}
                required
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

            <Separator className="border-b mb-3" />

            <Form.Field>
              <Form.Label htmlFor="technicianId" className="text-muted-foreground text-xs">
                Serwisant/ Osoba odpowiedzialna
              </Form.Label>
              <input
                id="technicianId"
                type="text"
                name="technician"
                value={formData.technician || ''}
                onChange={handleChange}
                placeholder="Serwisant"
                className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </Form.Field>


            <div className="flex w-full justify-start items-center gap-2 ">
              <span className="text-sm text-muted-foreground">Planowany czas:</span>
              <Form.Field>
                <Form.Row className="text-xs text-muted-foreground">
                  <Form.Label htmlFor="start_at">Rozpoczęcie</Form.Label>
                </Form.Row>
                <input
                  id="start_at"
                  type="datetime-local"
                  name="start_at"
                  value={formData.start_at ? toInputDate(formData.start_at) : ''}
                  onChange={handleChange}
                  placeholder="Rozpoczęcie"
                  className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </Form.Field>

              <Form.Field>
                <Form.Row className="text-xs text-muted-foreground">
                  <Form.Label htmlFor="end_at">Zakończenie</Form.Label>
                </Form.Row>
                <input
                  id="end_at"
                  type="datetime-local"
                  name="end_at"
                  value={formData.end_at ? toInputDate(formData.end_at) : ''}
                  onChange={handleChange}
                  placeholder="Zakończenie"
                  className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

                />
              </Form.Field>

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


export default ServiceDialog;
