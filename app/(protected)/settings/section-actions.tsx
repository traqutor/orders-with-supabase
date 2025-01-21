'use client';
import { Plus, SaveIcon } from 'lucide-react';
import { v4 } from 'uuid';
import { Section } from '@/app/(protected)/settings/section';

import { Pill } from '@/components/ui/pill';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { deleteRowQuery, insertRowQuery, updateRowQuery } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/client';
import * as Form from '@/components/ui/form';
import { Action, useActions } from '@/hooks/db/useActions';
import { COLOR_OPTIONS } from '@/lib/utils';


export function SectionActions() {

  const [item, setItem] = useState<Action>();
  const { actions, fetchActions } = useActions();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    const supabase = createClient();
    event.preventDefault();

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

  const handleCancel = () => {
    setItem(undefined);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (item) setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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

          <Form.Field>

            <Form.Label htmlFor="titleId">Title</Form.Label>
            <Form.Input
              id="titleId"
              type="text"
              name="title"
              value={item.title || ''}
              onChange={handleChange}
              placeholder="Action"
              required />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="colorHex">Color</Form.Label>
            <Form.Select
              id="colorHexId"
              type="text"
              name="color_hex"
              value={item.color_hex || ''}
              onChange={handleChange}
              placeholder="Color"
            >
              {COLOR_OPTIONS.map((color) => <option key={color} value={color}>{color}</option>)}

            </Form.Select>
          </Form.Field>


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


