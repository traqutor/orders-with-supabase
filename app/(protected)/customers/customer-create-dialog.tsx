'use client';

import React, { useState } from 'react';
import { v4 } from 'uuid';
import * as Dialog from '@radix-ui/react-dialog';
import { Edit2, PlusCircle, SaveIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as Form from '@/components/ui/form';
import { Tables } from '@/types_db';
import { useRouter } from 'next/navigation';
import { postCustomer, putCustomer } from '@/lib/db/customers';
import * as RadioGroup from '@radix-ui/react-radio-group';


interface CustomerCreateDialogProps {
  customer?: Tables<'customers'>;
}

const emptyCustomer: Tables<'customers'> = {
  id: '',
  name: '',
  description: '',
  customer_type_id: 1,
  email: '',
  address: '',
  nip: '',
  regon: '',
  phone: ''
};

const CustomerCreateDialog: React.FC<CustomerCreateDialogProps> = React.memo(({ customer }) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);


  const [formData, setFormData] = useState<Tables<'customers'>>(customer ? customer : { ...Object.assign({}, emptyCustomer) });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const key = name as keyof Tables<'customers'>;


    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value
    }));
  };


  const handleCustomerTypeChange = (value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      customer_type_id: Number(value)
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (customer?.id) {
      const { error } = await putCustomer({
        ...formData,
        id: customer.id
      });

      if (error) {
        console.error(`Update customer with payload: ${formData} error`, error);
        return;
      } else {
        setOpen(false);
        router.push(`/customer/${customer.id}`);
      }
    } else {
      const { error } = await postCustomer({
        ...formData,
        id: v4()
      });

      if (error) {
        console.error(`Create customer with payload: ${formData} error`, error);
        return;
      } else {
        setOpen(false);
        router.push('/customers');
      }
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        {customer?.id ? <Button size="sm" className="h-8 gap-1">
          <Edit2 className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Edutuj Kontrahenta
            </span>
        </Button> : <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Dodaj Kontrahenta
            </span>
        </Button>}

      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content
          className="bg-card border shadow-xl fixed left-1/2 top-1/2 overflow-auto max-h-[85vh] w-[90vw] max-w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-md p-[25px] focus:outline-hidden data-[state=open]:animate-contentShow">
          <Dialog.Title className="m-0 text-[17px] font-medium">
            Dodaj Kontrahenta
          </Dialog.Title>
          <Dialog.Description className="mb-5 mt-2.5 text-[15px] leading-normal text-mauve11 ">
          </Dialog.Description>

          <Form.Root
            onSubmit={handleSubmit}
          >

            <RadioGroup.Root
              className="flex mt-3 mb-5 gap-5"
              defaultValue={`${formData?.customer_type_id || 1}`}
              aria-label="Rodzaj klienta"
              onValueChange={handleCustomerTypeChange}
            >
              <div className="flex items-center">
                <RadioGroup.Item
                  className="size-[14px] cursor-default rounded-full shadow-[0_2px_10px] shadow-black outline-none hover:bg-violet-50 focus:shadow-[0_0_0_2px] focus:shadow-black"
                  value="1"
                  id="r1"
                >
                  <RadioGroup.Indicator
                    className="relative flex size-full items-center justify-center after:block after:size-[11px] after:rounded-full after:bg-violet11" />
                </RadioGroup.Item>
                <label
                  className="pl-[15px] text-[15px] leading-none "
                  htmlFor="r1"
                >
                  Firma
                </label>
              </div>
              <div className="flex items-center">
                <RadioGroup.Item
                  className="size-[14px] cursor-default rounded-full bg-white shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
                  value="2"
                  id="r2"
                >
                  <RadioGroup.Indicator
                    className="relative flex size-full items-center justify-center after:block after:size-[11px] after:rounded-full after:bg-violet11" />
                </RadioGroup.Item>
                <label
                  className="pl-[15px] text-[15px] leading-none"
                  htmlFor="r2"
                >
                  Osoba fizyczna
                </label>
              </div>

            </RadioGroup.Root>


            <Form.Field>
              <Form.Label htmlFor="nameId">Nazwa</Form.Label>
              <input
                id="nameId"
                type="text"
                name="name"
                value={formData?.name || ''}
                onChange={handleChange}
                placeholder="Nazwa"
                required
                className="flex whitespace-pre-wrap min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </Form.Field>

            <div className="flex w-full items-center justify-evenly gap-2 ">
              <Form.Field className="flex w-full">
                <Form.Label htmlFor="phoneId">Telefon</Form.Label>
                <input
                  id="phoneId"
                  type="text"
                  name="phone"
                  value={formData?.phone || ''}
                  onChange={handleChange}
                  placeholder="Telefon"
                  className="flex whitespace-pre-wrap min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </Form.Field>

              <Form.Field className="flex w-full">
                <Form.Label htmlFor="emailId">Email</Form.Label>
                <input
                  id="emailId"
                  type="text"
                  name="email"
                  value={formData?.email || ''}
                  onChange={handleChange}
                  placeholder="Email"
                  className="flex whitespace-pre-wrap min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </Form.Field>
            </div>

            <Form.Field>
              <Form.Label htmlFor="addressId">Adres</Form.Label>
              <input
                id="addressId"
                type="text"
                name="address"
                value={formData?.address || ''}
                onChange={handleChange}
                placeholder="Adres"
                className="flex whitespace-pre-wrap min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </Form.Field>

            <div className="flex w-full items-center justify-evenly gap-2 ">
              <Form.Field className="flex w-full">
                <Form.Label htmlFor="nipId">NIP</Form.Label>
                <input
                  id="nipId"
                  type="text"
                  name="nip"
                  value={formData?.nip || ''}
                  onChange={handleChange}
                  placeholder="NIP"
                  className="flex whitespace-pre-wrap min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </Form.Field>

              {formData?.customer_type_id === 1 &&
                <Form.Field className="flex w-full">
                  <Form.Label htmlFor="regonId">Regon</Form.Label>
                  <input
                    id="regonId"
                    type="text"
                    name="regon"
                    value={formData?.regon || ''}
                    onChange={handleChange}
                    placeholder="Regon"
                    className="flex whitespace-pre-wrap min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </Form.Field>}
            </div>

            <Form.Field>
              <Form.Label htmlFor="descriptionId">Opis</Form.Label>
              <input
                id="descriptionId"
                type="text"
                name="description"
                value={formData?.description || ''}
                onChange={handleChange}
                placeholder="Opis"
                className="flex whitespace-pre-wrap min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </Form.Field>

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

export default CustomerCreateDialog;
