'use client';

import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import * as Dialog from '@radix-ui/react-dialog';
import { SaveIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as Form from '@radix-ui/react-form';

import { useRouter } from 'next/navigation';
import SelectStatus from '@/components/ui/Form/select-status';
import { Customer, Order } from '@/lib/db/schema';
import { postData } from '@/utils/helpers';
import { useOrdersStatuses } from '@/lib/client/useOrdersStatuses';


interface CustomerOrderCreateDialogProps {
  isOpen: boolean;
  customer: Customer;
  onToggleOpen: (customer: Customer) => void;
}


const ClientOrderDialog: React.FC<CustomerOrderCreateDialogProps> = React.memo((
  { isOpen, customer, onToggleOpen }) => {

  const router = useRouter();
  const [formData, setFormData] = useState<Order>({} as Order);
  const { ordersStatuses, fetchOrdersStatuses } = useOrdersStatuses();

  useEffect(() => {
    if (customer) {
      handleCustomerChange(customer);
    }
  }, [customer]);


  useEffect(() => {
    fetchOrdersStatuses();
  }, []);

  useEffect(() => {
    if (ordersStatuses.length > 0) {
      formData.status_id = ordersStatuses[0].id;
    }
  }, [ordersStatuses]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const response = await postData<Order>({
      url: `/api/dashboard/orders`, data: {
        ...formData,
        id: v4()
      }
    });

    if (response.error) {
      throw new Error(`Create order with payload: ${JSON.stringify(formData)} error ${JSON.stringify(response)}`);
    }

    onToggleOpen(customer);
    router.refresh();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const key = name as keyof Order;


    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value
    }));
  };

  const handleCustomerChange = (customer: Customer) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      customer_id: customer.id,
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
      nip: customer.nip,
      regon: customer.regon,
      description: customer.description
    }));
  };

  const handleStatusChange = (value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      status_id: value
    }));
  };

  return (
    <Dialog.Root
      open={isOpen}
      modal={true}
    >
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content
          className="bg-card border shadow-xl fixed left-1/2 top-1/2 overflow-auto max-h-[85vh] w-[90vw] max-w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-md p-[25px] focus:outline-hidden data-[state=open]:animate-contentShow">
          <Dialog.Title className="m-0 text-[17px] font-medium">
            Zamówienie
          </Dialog.Title>
          <Dialog.Description className="mb-5 mt-2.5 text-[13px] leading-normal text-muted-foreground ">
            Dodajesz nowe Zamówienie, wypełnij wymagane pola.
          </Dialog.Description>

          <Form.Root
            onSubmit={handleSubmit}
          >

            <div className="mb-4">
              <SelectStatus
                label="Status zamówienia"
                name=""
                value={formData.status_id || undefined}
                required
                onChange={handleStatusChange}
              />
            </div>

            <Form.Field name={'title'} className="mb-5">
              <div className="flex justify-between align-middle mb-1 text-muted-foreground text-xs">
                <label htmlFor="title">Tytuł lub nazwa zamówienia</label>
                <span>Pole wymagane</span>
              </div>
              <Form.Control asChild>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={formData?.title || ''}
                  onChange={handleChange}
                  placeholder="Tytuł"
                  className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required />
              </Form.Control>
            </Form.Field>

            <div>

              <Form.Field name="name" className="pb-2">
                <Form.Label htmlFor="nameId" className="text-muted-foreground text-xs">
                  Nazwa klienta
                </Form.Label>
                <input
                  id="nameId"
                  type="text"
                  name="name"
                  value={formData?.name || ''}
                  onChange={handleChange}
                  placeholder="Nazwa"
                  required
                  className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </Form.Field>

              <div className="flex w-full items-center justify-evenly gap-2 pb-2">

                <Form.Field name="nip" className="flex flex-col w-full">
                  <Form.Label htmlFor="nipId" className="text-muted-foreground text-xs mb-0.5">NIP</Form.Label>
                  <input
                    id="nipId"
                    type="text"
                    name="nip"
                    value={formData?.nip || ''}
                    onChange={handleChange}
                    placeholder="NIP"
                    className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </Form.Field>

                <Form.Field name="regon" className="flex flex-col w-full">
                  <Form.Label htmlFor="regonId" className="text-muted-foreground text-xs mb-0.5">Regon</Form.Label>
                  <input
                    id="regonId"
                    type="text"
                    name="regon"
                    value={formData?.regon || ''}
                    onChange={handleChange}
                    placeholder="Regon"
                    className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </Form.Field>

              </div>

              <div className="flex w-full items-center justify-evenly gap-2 ">

                <Form.Field name="phone" className="flex flex-col w-full">
                  <Form.Label htmlFor="phoneId" className="text-muted-foreground text-xs mb-0.5">Telefon</Form.Label>
                  <input
                    id="phoneId"
                    type="text"
                    name="phone"
                    value={formData?.phone || ''}
                    onChange={handleChange}
                    placeholder="Telefon"
                    className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </Form.Field>


                <Form.Field name="email" className="flex flex-col w-full">
                  <Form.Label htmlFor="emailId" className="text-muted-foreground text-xs mb-0.5">Email</Form.Label>
                  <input
                    id="emailId"
                    type="text"
                    name="email"
                    value={formData?.email || ''}
                    onChange={handleChange}
                    placeholder="Email"
                    className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </Form.Field>
              </div>

              <Form.Field name="address">
                <Form.Label htmlFor="addressId" className="text-muted-foreground text-xs">Adres</Form.Label>
                <textarea
                  id="addressId"
                  name="address"
                  value={formData?.address || ''}
                  onChange={handleChange}
                  placeholder="Adres"
                  rows={3}
                  className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </Form.Field>

              <Form.Field name="description">
                <Form.Label htmlFor="descriptionId" className="text-muted-foreground text-xs">Opis</Form.Label>
                <textarea
                  id="descriptionId"
                  name="description"
                  value={formData?.description || ''}
                  onChange={handleChange}
                  placeholder="Opis"
                  rows={5}
                  className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </Form.Field>
            </div>

            <div className="mt-[25px] flex justify-end gap-2">
              <Dialog.Close asChild>
                <Button onClick={() => onToggleOpen(customer)} size="sm" variant="outline" className="h-8 gap-1">
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Cancel</span>
                </Button>
              </Dialog.Close>

              <Button size="sm" className="h-8 gap-1" type="submit"
                      disabled={!formData.name || !formData.customer_id || !formData.status_id}>
                <SaveIcon className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Save</span>
              </Button>
            </div>

            <Dialog.Close asChild>
              <button
                onClick={() => onToggleOpen(customer)}
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


export default ClientOrderDialog;
