'use client';

import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { CheckIcon, Edit2, SaveIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as Form from '@/components/ui/form';

import { Tables } from '@/types_db';
import { toInputDateTime } from '@/utils/time';
import { putInvoice } from '@/lib/db/invoices_queries';
import * as Checkbox from '@radix-ui/react-checkbox';


interface InvoiceDialogProps {
  invoice: Tables<'invoices'>;
  fetchDataOnSubmit: () => void;
}


const InvoiceDialog: React.FC<InvoiceDialogProps> = React.memo(({ invoice, fetchDataOnSubmit }) => {

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Tables<'invoices'>>(invoice);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { error } = await putInvoice({
      ...formData,
      id: invoice.id
    });

    if (error) {
      console.error(`Update Invoice with payload: ${formData} error`, error);
      return;
    } else {
      fetchDataOnSubmit();
      setOpen(false);
    }
  };


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const key = name as keyof Tables<'invoices'>;

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

  const handleOptimaChange = (value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      is_invoice_group: value
    }));
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Edit2 className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Edytuj fakturę
          </span>
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content
          className="bg-card border shadow-xl fixed left-1/2 top-1/2 overflow-auto max-h-[85vh] w-[90vw] max-w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-md p-[25px] focus:outline-hidden data-[state=open]:animate-contentShow">
          <Dialog.Title className="m-0 text-[17px] font-medium">
            Faktura
          </Dialog.Title>
          <Dialog.Description className="mb-5 mt-2.5 text-[13px] leading-normal text-muted-foreground ">
            Edytujesz dane faktury.
          </Dialog.Description>

          <Form.Root
            onSubmit={handleSubmit}
          >

            <Form.Field>
              <Form.Label htmlFor="invoice_number" className="text-muted-foreground text-xs">
                Numer faktury
              </Form.Label>
              <input
                id="invoice_number"
                type="text"
                name="invoice_number"
                value={formData.invoice_number || ''}
                onChange={handleChange}
                placeholder="Numer faktury"
                className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="contact" className="text-muted-foreground text-xs">
                Kontrachent
              </Form.Label>
              <input
                id="contact"
                type="text"
                name="contact"
                value={formData.contact || ''}
                onChange={handleChange}
                placeholder="Kontrachent"
                className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </Form.Field>
            <div className="flex w-full items-center justify-evenly gap-2 pb-2">

              <Form.Field className="flex flex-col w-full">
                <Form.Label htmlFor="nip" className="text-muted-foreground text-xs mb-0.5">NIP</Form.Label>
                <input
                  id="nip"
                  type="text"
                  name="nip"
                  value={formData?.nip || ''}
                  onChange={handleChange}
                  placeholder="NIP"
                  className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </Form.Field>

              <Form.Field className="flex flex-col w-full">
                <Form.Label htmlFor="regon" className="text-muted-foreground text-xs mb-0.5">Regon</Form.Label>
                <input
                  id="regon"
                  type="text"
                  name="regon"
                  value={formData?.regon || ''}
                  onChange={handleChange}
                  placeholder="Regon"
                  className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </Form.Field>

            </div>

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
            <div className="flex w-full items-center justify-start gap-2 mb-6">
              <div className="">
                <label htmlFor="payment_type" className="text-muted-foreground text-xs mb-0.5">Płatność</label>
                <select
                  name="payment_type"
                  value={formData.payment_type || 'cash'}
                  onChange={handleChange}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="cash">Gotówka</option>
                  <option value="transfer">Przelew</option>
                </select>
              </div>

              <div>
                <label htmlFor="payment_at" className="text-muted-foreground text-xs mb-0.5">do dnia</label>
                <input
                  id="payment_at"
                  type="date"
                  name="payment_at"
                  value={formData.payment_at ? toInputDateTime(formData.payment_at) : ''}
                  onChange={handleChange}
                  placeholder="Płatnosć"
                  className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>
            <div className="flex w-full items-center justify-start gap-2 ">
              <Form.Field className="flex flex-col pr-2 w-[190px]">
                <div className="flex justify-start items-center gap-2 mt-3">
                  <Checkbox.Root onCheckedChange={handleOptimaChange}
                                 className="flex size-[18px] appearance-none items-center justify-center rounded bg-white shadow-[0_2px_10px]  outline-none hover:bg-green-50 focus:shadow-[0_0_0_2px_black]"
                                 defaultChecked={false}
                                 checked={formData.is_invoice_group || false}
                                 id="is_invoice_group"
                  >
                    <Checkbox.Indicator>
                      <CheckIcon className="h-4 w-4" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <label className="text-muted-foreground text-xs mb-0.5" htmlFor="is_invoice_group">Grupa
                    fakturowa</label>
                </div>
              </Form.Field>
              <Form.Field className="flex flex-col w-[180px]">
                <Form.Label htmlFor="group_cost" className="text-muted-foreground text-xs mb-0.5">Koszt</Form.Label>
                <input
                  id="group_cost"
                  type="number"
                  name="group_cost"
                  value={formData.group_cost || ''}
                  onChange={handleChange}
                  placeholder="Koszt"
                  className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </Form.Field>
              <Form.Field className="flex flex-col w-full">
                <Form.Label htmlFor="group_cost" className="text-muted-foreground text-xs mb-0.5">Opis</Form.Label>
                <input
                  id="group_description"
                  type="text"
                  name="group_description"
                  value={formData.group_description || ''}
                  onChange={handleChange}
                  placeholder="Opis"
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


export default InvoiceDialog;
