'use client';
import { Plus, SaveIcon } from 'lucide-react';
import { v4 } from 'uuid';
import { Label, useLabels } from '@/lib/db/useLabels';
import { Section } from '@/app/(protected)/settings/section';

import { Pill } from '@/components/ui/pill';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client';
import { COLOR_OPTIONS } from '@/lib/utils';
import * as Form from '@radix-ui/react-form';
import { deleteLabel, postLabel, putLabel } from '@/lib/db/labels';

export function SectionLabels() {

  const [item, setItem] = useState<Label>();
  const { labels, getLabels } = useLabels();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const supabase = createClient();
    event.preventDefault();

    if (item)
      if (item.id === '') {
        await postLabel({ ...item, id: v4() });
      } else {
        await putLabel(item);
      }

    await getLabels();
    setItem(undefined);
  };

  const handleLabelClick = (label: Label) => {
    setItem(label);
  };

  const handleAddNewLabel = () => {
    setItem({ id: '', title: '', color_hex: '', icon_name: '' });
  };

  const handleCancel = () => {
    setItem(undefined);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (item) setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleDelete = async () => {
    if (item) {
      await deleteLabel(item);
      await getLabels();
      setItem(undefined);
    }
  };

  return (
    <Section title="Etykiety"
             description="Ustandaryzowane Etykiety mogą być pomocne jako dodatkowa forma informacji opisująca Zamówienie lub to w jaim etapie się znajduje.">
      <div className="flex-col p-2 items-center">
        <div className="flex flex-wrap gap-2">
          {labels.map(b =>
            <Pill
              onClick={() => handleLabelClick(b)}
              key={b.id}
              variant={b.color_hex || 'default' as any}
              title={b.title || ''} />)}

        </div>
        <div className="flex-1 flex justify-end pt-4">
          <Button onClick={handleAddNewLabel} variant="outline" size="sm">
            <Plus />
          </Button>
        </div>
      </div>
      {item &&
        <Form.Root
          onSubmit={(event) => handleSubmit(event)}
        >
          <Form.Field name="title" className="mb-3">
            <Form.Label htmlFor="title" className="flex items-baseline justify-between py-1">Title</Form.Label>
            <Form.Control asChild>
              <input
                id="title"
                type="text"
                name="title"
                value={item.title || ''}
                onChange={handleChange}
                placeholder="Label"
                required
                className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </Form.Control>
          </Form.Field>

          <Form.Field name="color_hex" className="mb-3">
            <Form.Label htmlFor="colorHexId" className="flex items-baseline justify-between py-1">Color</Form.Label>
            <select
              id="colorHexId"
              name="color_hex"
              value={item.color_hex || ''}
              onChange={handleChange}
              className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {COLOR_OPTIONS.map((color) => <option key={color} value={color}>{color}</option>)}

            </select>

            <select
              name="color_hex"
              value={item.color_hex || ''}
              onChange={handleChange}
              className=" w-min flex rounded-md border border-input bg-background p-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {COLOR_OPTIONS.map((color) => <option key={color} value={color}>{color}</option>)}
            </select>

          </Form.Field>


          <div className="mt-[25px] flex justify-between gap-2">

            {item.id ?
              <Button onClick={handleDelete} size="sm" variant="outline" className="h-8 gap-1">
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