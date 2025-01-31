'use client';
import { Plus, SaveIcon } from 'lucide-react';
import { v4 } from 'uuid';
import { Section } from '@/app/(protected)/settings/section';
import { Pill } from '@/components/ui/pill';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useOrdersStatuses } from '@/lib/db/useOrdersStatuses';
import { COLOR_OPTIONS } from '@/lib/utils';
import * as Form from '@radix-ui/react-form';
import { Tables } from '@/types_db';

import {
  deleteOrderStatus as onDelete,
  postOrderStatus as onPost,
  putOrderStatus as onPut
} from '@/lib/db/orders_statuses';

type LocalItem = Tables<'orders_statuses'>

const EMPTY_ITEM: LocalItem = {
  id: '',
  color_hex: '',
  title: ''
};


export function SectionOrdersStatuses() {

  const { ordersStatuses: items, fetchOrdersStatuses: onFetch } = useOrdersStatuses();
  const [formData, setFormData] = useState<LocalItem>({ ...EMPTY_ITEM });


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const key = name as keyof LocalItem;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value
    }));
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement | HTMLInputElement | HTMLSelectElement>) => {
    event.preventDefault();

    if (formData)
      if (formData.id === 'new') {
        await onPost({ ...formData, id: v4() });
      } else {
        await onPut({ ...formData });
      }

    await onFetch();
    setFormData({ ...EMPTY_ITEM });
  };

  const handleClick = (item: LocalItem) => {
    setFormData(item);
  };

  const handleAddNew = () => {
    setFormData({ ...EMPTY_ITEM, id: 'new' });
  };


  const handleCancel = () => {
    setFormData({ ...EMPTY_ITEM });
  };

  const handleDelete = async () => {
    if (formData.id !== '') {
      await onDelete(formData);
      handleCancel();
    }
  };

  return (
    <Section title="Statusy Zamówień"
             description="Status wskazuje na to na jakim etapie jest Zamówienie">

      <div className="flex-col p-2 items-center">
        <div className="flex flex-wrap gap-2">
          {items.map(b =>
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

      {formData.id !== '' &&
        <Form.Root
          onSubmit={(event) => handleSubmit(event)}
        >
          <label htmlFor="pillSample"
                 className="flex text-sm text-muted-foreground items-baseline justify-between py-1">Przykłąd</label>

          <Pill
            id="pillSample"
            variant={formData.color_hex || 'default' as any}
            title={formData.title || ''}
          />

          <div className="flex w-full justify-start items-end gap-5">


            <Form.Field name="title">
              <Form.Label htmlFor="title"
                          className="flex text-sm text-muted-foreground items-baseline justify-between py-1">Title</Form.Label>
              <Form.Control asChild>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleChange}
                  placeholder="Title"
                  className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </Form.Control>
            </Form.Field>

            <Form.Field name="color_hex">
              <Form.Label htmlFor="color_hex" className="flex items-baseline justify-between py-1">Color</Form.Label>
              <select
                name="color_hex"
                value={formData.color_hex || ''}
                onChange={handleChange}
                className=" w-min flex rounded-md border border-input bg-background p-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {COLOR_OPTIONS.map((color) => <option key={color} value={color}>{color}</option>)}
              </select>

            </Form.Field>
          </div>

          <div className="mt-[25px] flex justify-between gap-2">

            {formData.id ?
              <Button onClick={handleDelete} size="sm" variant="outline" type="submit" className="h-8 gap-1">
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Delete</span>
              </Button> : <div></div>}

            <div className="flex gap-2">
              <Button onClick={handleCancel} size="sm" variant="outline" className="h-8 gap-1" type="submit">

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