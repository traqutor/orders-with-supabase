'use client';
import { Plus, SaveIcon } from 'lucide-react';
import { v4 } from 'uuid';
import { Section } from '@/app/(protected)/settings/section';

import { Pill } from '@/components/ui/pill';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { OrderStatus, useOrdersStatuses } from '@/lib/db/useOrdersStatuses';
import { COLOR_OPTIONS } from '@/lib/utils';
import * as Form from '@radix-ui/react-form';
import { deleteOrderStatus, postOrderStatus, putOrderStatus } from '@/lib/db/orders_statuses';

export function SectionOrdersStatuses() {

  const [item, setItem] = useState<OrderStatus>();
  const { ordersStatuses, fetchOrdersStatuses } = useOrdersStatuses();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (item)
      if (item.id === '') {
        await postOrderStatus({ ...item, id: v4() });
      } else {
        await putOrderStatus({ ...item });
      }

    await fetchOrdersStatuses();
    setItem(undefined);
  };

  const handleClick = (item: OrderStatus) => {
    setItem(item);
  };

  const handleAddNew = () => {
    setItem({ id: '', title: '', color_hex: '' });
  };

  const handleCancel = () => {
    setItem(undefined);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    console.log(e);
    if (item) setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleDelete = async () => {
    if (item) {
      await deleteOrderStatus(item);
      await fetchOrdersStatuses();
      setItem(undefined);
    }
  };

  return (
    <Section title="Statusy Zamówień"
             description="Status wskazuje na to na jakim etapie jest Zamówienie">

      <div className="flex-col p-2 items-center">
        <div className="flex flex-wrap gap-2">
          {ordersStatuses.map(b =>
            <Pill
              onClick={() => handleClick(b)}
              key={b.id}
              variant={b.color_hex || 'default' as any}
              title={b.title || ''} />)}

        </div>
        <div className="flex-1 flex justify-end pt-4">
          <Button onClick={handleAddNew} variant="outline" size="sm">
            <Plus />
          </Button>
        </div>
      </div>

      {item &&
        <Form.Root
          onSubmit={(event) => handleSubmit(event)}
        >
          <Form.Field name="title" className="mb-3">
            <Form.Label htmlFor="titleId" className="flex items-baseline justify-between py-2">Title</Form.Label>
            <Form.Control asChild>
              <input
                id="titleId"
                type="text"
                name="title"
                value={item.title || ''}
                onChange={handleChange}
                placeholder="Action"
                required
                className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </Form.Control>
          </Form.Field>

          <Form.Field name="color_hex" className="mb-3">
            <Form.Label htmlFor="colorHexId" className="flex items-baseline justify-between py-1">Color</Form.Label>
            <Form.Control asChild>
              <select
                id="colorHexId"
                name="color_hex"
                value={item.color_hex || ''}
                onChange={handleChange}
                className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {COLOR_OPTIONS.map((color) => <option key={color} value={color}>{color}</option>)}
              </select>
            </Form.Control>
          </Form.Field>


          <div className="mt-[25px] flex justify-between gap-2">

            {item.id ? <Button onClick={handleDelete} size="sm" variant="outline" className="h-8 gap-1">
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Delete</span>
            </Button> : <div></div>}

            <div className="flex gap-2">
              <Button onClick={handleCancel} size="sm" variant="outline" className="h-8 gap-1">

                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Cancel</span>
              </Button>


              <Button size="sm" className="h-8 gap-1" type="submit" variant="secondary">
                <SaveIcon className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Save</span>
              </Button>
            </div>
          </div>


        </Form.Root>
      }

    </Section>
  );

}