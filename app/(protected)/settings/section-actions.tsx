'use client';

import React, { useState } from 'react';
import { Plus, SaveIcon } from 'lucide-react';
import { v4 } from 'uuid';

import * as Form from '@radix-ui/react-form';
import { Section } from '@/app/(protected)/settings/section';
import { Pill } from '@/components/ui/pill';
import { Button } from '@/components/ui/button';
import { deleteRowQuery, insertRowQuery, updateRowQuery } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/client';
import { Action, useActions } from '@/hooks/db/useActions';
import { COLOR_OPTIONS } from '@/lib/utils';
import Select from '@/components/ui/Select/select';
import DynamicIcon from '@/components/ui/Icon/icon';


export function SectionActions() {

  const [item, setItem] = useState<Action>();
  const { actions, fetchActions } = useActions();

  console.log(item);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const supabase = createClient();

    if (item)
      if (item.id === '') {
        await insertRowQuery(supabase, 'actions', { ...item, id: v4() });
      } else {
        await updateRowQuery(supabase, 'actions', { ...item });
      }

    await fetchActions();
    setItem(undefined);
  };

  const handleClick = (action: Action) => {
    setItem(action);
  };

  const handleAddNew = () => {
    setItem({ id: '', title: '', color_hex: '', icon_name: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    console.log(e.target.name);
    console.log(e.target.value);
    console.log({ ...item, [e.target.name]: e.target.value });
    if (item) setItem({ ...item, [e.target.name]: e.target.value });
    console.log(item);
  };

  const handleCancel = () => {
    setItem(undefined);
  };

  const handleDelete = async () => {

    const supabase = createClient();
    if (item) {
      await deleteRowQuery(supabase, 'actions', item);
      await fetchActions();
      setItem(undefined);
    }
  };

  return (
    <Section title="Akcje"
             description="Akcje to informacje, które definują co zrobić z Zamówieniem.">

      <div className="flex-col p-2 items-center">
        <div className="flex flex-wrap gap-2">
          {actions.map(b =>
            <Pill
              size="sm"
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
            <Form.Label htmlFor="titleId" className="flex items-baseline justify-between py-1">Title</Form.Label>
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
                {COLOR_OPTIONS.map((color) => <option key={color} value={color}>{color.toLowerCase()}</option>)}

              </select>
            </Form.Control>
          </Form.Field>

          <Select />


          <div className="mt-[25px] flex justify-between gap-2">

            {item.id ? <Button onClick={handleDelete} size="sm" variant="outline" type="submit" className="h-8 gap-1">
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


