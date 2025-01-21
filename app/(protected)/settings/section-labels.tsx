'use client';
import { Plus, SaveIcon } from 'lucide-react';
import { v4 } from 'uuid';
import { Label, useLabels } from '@/hooks/db/useLabels';
import { Section } from '@/app/(protected)/settings/section';

import { Pill } from '@/components/ui/pill';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { insertRowQuery, updateRowQuery, deleteRowQuery } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/client';
import * as Form from '@/components/ui/form';
import { COLOR_OPTIONS } from '@/lib/utils';

export function SectionLabels() {

  const [label, setLabel] = useState<Label>();
  const { labels, getLabels } = useLabels();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log('handleSubmit', event);
    const supabase = createClient();
    event.preventDefault();

    console.log('handleSubmit label', label);
    if (label)
      if (label.id === '') {
        await insertRowQuery(supabase, 'labels', { ...label, id: v4() });
      } else {
        await updateRowQuery(supabase, 'labels', label);
      }

    await getLabels();
    setLabel(undefined);
  };

  const handleLabelClick = (label: Label) => {
    setLabel(label);
  };

  const handleAddNewLabel = () => {
    setLabel({ id: '', title: '', color_hex: '', icon_name: '' });
  };

  const handleCancel = () => {
    setLabel(undefined);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (label) setLabel({ ...label, [e.target.name]: e.target.value });
  };

  const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const supabase = createClient();
    if (label) {
      await deleteRowQuery(supabase, 'labels', label)
      await getLabels();
      setLabel(undefined);
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
      {label &&
        <Form.Root
          onSubmit={(event) => handleSubmit(event)}
        >

          <Form.Field>

            <Form.Label htmlFor="labelId">Label</Form.Label>
            <Form.Input
              id="labelId"
              type="text"
              name="title"
              value={label.title || ''}
              onChange={handleChange}
              placeholder="Label"
              required />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="colorHex">Color</Form.Label>
            <Form.Select
              id="colorHexId"
              type="text"
              name="color_hex"
              value={label.color_hex || ''}
              onChange={handleChange}
              placeholder="Color"
            >
              {COLOR_OPTIONS.map((color) => <option key={color} value={color}>{color}</option>)}

            </Form.Select>
          </Form.Field>


          <div className="mt-[25px] flex justify-between gap-2">

            {label.id ? <Button onClick={handleDelete} size="sm" variant="outline" type="submit" className="h-8 gap-1">
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