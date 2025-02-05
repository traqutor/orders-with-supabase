'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { v4 } from 'uuid';
import * as Dialog from '@radix-ui/react-dialog';
import { SaveIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as Form from '@radix-ui/react-form';
import { Tables } from '@/types_db';
import { useRouter } from 'next/navigation';
import { useCustomers } from '@/lib/db/useCustomers';
import { postOrder, putOrder } from '@/lib/db/orders_queries';
import SelectField from '@/components/ui/Form/select-field';
import { CustomerContentTab } from '@/app/(protected)/customer/customer-content-tab';
import { useOrdersStatuses } from '@/lib/db/useOrdersStatuses';
import SelectStatus from '@/components/ui/Form/select-status';


interface OrderCreateDialogProps {
  triggerButton: React.ReactNode;
  order?: Tables<'orders'>;
  selectedCustomer?: Tables<'customers'>;
}

export const mapOrderToFormData = (order: Tables<'orders'>): Tables<'orders'> => {
  return {
    id: order.id,
    customer_id: order.customer_id,
    status_id: order.status_id,
    title: order.title,
    name: order.name,
    phone: order.phone,
    email: order.email,
    address: order.address,
    nip: order.nip,
    regon: order.regon,
    description: order.description,
    created_by: order.created_by,
    created_at: order.created_at,
    reference_number: order.reference_number,
    due_at: order.due_at,
    shipment_id: order.shipment_id,
    assigned_to: order.assigned_to,
    invoice_id: order.invoice_id,
    service_id: order.service_id
  };
};


const OrderDialog: React.FC<OrderCreateDialogProps> = React.memo((
  { triggerButton: TriggerButton, order, selectedCustomer }) => {

  const [open, setOpen] = useState(false);

  const router = useRouter();

  const { customers, fetchCustomers } = useCustomers();
  const { ordersStatuses, fetchOrdersStatuses } = useOrdersStatuses();
  const [formData, setFormData] = useState<Tables<'orders'>>(mapOrderToFormData(order || {} as Tables<'orders'>));

  const computedIsEdit = useMemo(() => {
    return !!order?.customer_id;
  }, [order]);

  useEffect(() => {
    fetchCustomers().then();
    fetchOrdersStatuses().then();
  }, []);

  useEffect(() => {
    if (!computedIsEdit && ordersStatuses.length > 0) {
      formData.status_id = ordersStatuses[0].id;
    }
  }, [ordersStatuses]);

  useEffect(() => {
    if (selectedCustomer) {
      handleCustomerIdChange(selectedCustomer.id);
    }
  }, [selectedCustomer, customers]);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (order?.id) {
      const { error } = await putOrder({
        ...formData,
        id: order.id
      });

      if (error) {
        console.error(`Update order with payload: ${formData} error`, error);
        return;
      } else {
        setOpen(false);
        router.refresh();
      }
    } else {

      const { error } = await postOrder({
        ...formData,
        id: v4()
      });

      if (error) {
        console.error(`Create order with payload: ${formData} error`, error);
        return;
      } else {
        setOpen(false);
        router.push('/orders');
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const key = name as keyof Tables<'orders'>;


    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value
    }));
  };

  const handleCustomerIdChange = (value: string) => {
    const customer = customers.find((c) => c.id === value);

    if (!customer) {
      return;
    }

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
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <div>
          {TriggerButton}
        </div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content
          className="bg-card border shadow-xl fixed left-1/2 top-1/2 overflow-auto max-h-[85vh] w-[90vw] max-w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-md p-[25px] focus:outline-hidden data-[state=open]:animate-contentShow">
          <Dialog.Title className="m-0 text-[17px] font-medium">
            Zamówienie
          </Dialog.Title>
          <Dialog.Description className="mb-5 mt-2.5 text-[13px] leading-normal text-muted-foreground ">
            {computedIsEdit ? 'Edytujesz dane klienta przypisane do do zamówienia. Nie możesz zmienić klienta ale możesz edytować jego dane w zamówieniu' : 'Dodajesz nowe Zamówienie, wypełnij wymagane pola.'}
          </Dialog.Description>

          <Form.Root
            onSubmit={handleSubmit}
          >

            <div className="mb-4">
              <SelectStatus
                label="Status zamówienia"
                name=""
                value={formData.status_id}
                required
                onChange={handleStatusChange}
              />
            </div>

            <Form.Field name={'title'} className="mb-5">
              <div className="flex justify-between align-middle mb-1 text-muted-foreground text-xs">
                <label htmlFor="customerId">Tytuł lub nazwa zamówienia</label>
                <span>Pole wymagane</span>
              </div>
              <Form.Control asChild>
                <input
                  id="titleId"
                  type="text"
                  name="title"
                  value={formData?.title || ''}
                  onChange={handleChange}
                  placeholder="Tytuł"
                  className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required />
              </Form.Control>
            </Form.Field>

            {computedIsEdit ? <div>
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
              </div> :

              <div className="pt-4">
                <div className="mb-5">
                  <SelectField
                    label="Wybierz klienta"
                    name={formData.name || ''}
                    value={formData.customer_id || ''}
                    onChange={handleCustomerIdChange}
                    required
                    options={customers.map((c) => {
                      return { value: c.id, label: c.name || '' };
                    })}
                  />
                </div>

                <CustomerContentTab customer={formData} />
              </div>
            }

            <div className="mt-[25px] flex justify-end gap-2">
              <Dialog.Close asChild>
                <Button size="sm" variant="outline" className="h-8 gap-1" type="submit">

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


export default OrderDialog;
