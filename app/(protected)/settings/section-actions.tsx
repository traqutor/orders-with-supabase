'use client';

import React, { useState } from 'react';
import { Plus, SaveIcon } from 'lucide-react';
import { v4 } from 'uuid';

import * as Form from '@radix-ui/react-form';
import { Section } from '@/app/(protected)/settings/section';
import { Button } from '@/components/ui/button';
import { COLOR_OPTIONS } from '@/lib/utils';
import { ActionPill } from '@/components/ui/action_pill';
import { useActions } from '@/lib/client/useActions';
import { Action, NewAction } from '@/lib/db/schema';


const EMPTY_ACTION: Action | NewAction = {
  id: '',
  color_hex: '',
  title: '',
  icon_name: '',
  note_info: ''
};

export function SectionActions() {

  const { actions, createAction, updateAction, deleteAction, fetchActions } = useActions();
  const [formData, setFormData] = useState<Action | NewAction>({ ...EMPTY_ACTION });


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const key = name as keyof Action;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value
    }));
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement | HTMLInputElement | HTMLSelectElement>) => {
      event.preventDefault();

      if (formData)
        if (formData.id === 'new') {
          await createAction({ ...formData, id: v4() });
        } else {
          await updateAction({ ...formData } as Action);
        }

      await fetchActions();
      setFormData({ ...EMPTY_ACTION });
    }
  ;

  const handleClick = (action: Action) => {
    setFormData(action);
  };

  const handleAddNew = () => {
    setFormData({ ...EMPTY_ACTION, id: 'new' });
  };


  const handleCancel = () => {
    setFormData({ ...EMPTY_ACTION });
  };

  const handleDelete = async () => {
    if (formData.id !== '') {
      await deleteAction({ ...formData } as Action);
      handleCancel();
    }
  };

  return (
    <Section title="Akcje"
             description="Akcje to informacje, które definują co zrobić z Zamówieniem.">

      <div className="flex-col p-2 items-center">
        <div className="flex flex-wrap gap-2">
          {actions.map(b =>
            <ActionPill
              onClick={() => handleClick(b)}
              key={b.id}
              variant={b.color_hex || 'default' as any}
              iconName={b.icon_name || ''}
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

          <div className="w-min">
            <ActionPill
              id="pillSample"
              variant={formData.color_hex || 'default' as any}
              title={formData.title || ''}
              iconName={formData.icon_name || ''}
              className="mb-1"
            />

          </div>

          <div className="flex justify-start items-end gap-5">

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
                  placeholder="Action title"
                  className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </Form.Control>
            </Form.Field>

            <Form.Field name="icon_name">
              <Form.Label htmlFor="icon_name"
                          className="flex text-sm text-muted-foreground items-baseline justify-between py-1">Ikona</Form.Label>
              <Form.Control asChild>
                <input
                  id="icon_name"
                  type="text"
                  name="icon_name"
                  value={formData.icon_name || ''}
                  onChange={handleChange}
                  placeholder="Action Icon"
                  className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </Form.Control>
              <Form.Message>
                MailIcon, PenIcon, FileIcon, PhoneIcon, PackageIcon, IdCardIcon, AtSignIcon, BellRingIcon, BellIcon,
                BeerIcon, BanIcon
              </Form.Message>
            </Form.Field>

            <Form.Field name="color_hex">
              <Form.Label htmlFor="color_hex"
                          className="flex text-sm text-muted-foreground items-baseline justify-between py-1">Color</Form.Label>
              <select
                name="color_hex"
                value={formData.color_hex || ''}
                onChange={handleChange}
                className=" w-min flex rounded-md border border-input bg-background p-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {COLOR_OPTIONS.map((color) => <option key={color} value={color}>{color}</option>)}
              </select>

            </Form.Field>

            <Form.Field name="note_info">
              <Form.Label htmlFor="color_hex"
                          className="flex text-sm text-muted-foreground items-baseline justify-between py-1">Informacja
                widoczna w notatkach po wykonanoi akcji</Form.Label>

              <Form.Control asChild>
                <textarea
                  id="note_info"
                  name="note_info"
                  value={formData.note_info || ''}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Action Note Information"
                  className="flex min-h-min w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </Form.Control>
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

};


