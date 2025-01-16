'use client';
import { Plus } from 'lucide-react';
import { v4 } from 'uuid';
import { Label, useLabels } from '@/hooks/db/useLabels';
import { SettingsSection } from '@/app/(protected)/settings/section';

import { Pill } from '@/components/ui/pill';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { insertRowQuery, updateRowQuery } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/client';

export function LabelsForm() {

  const [label, setLabel] = useState<Label>();
  const { labels, getLabels } = useLabels();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const supabase = createClient();
    event.preventDefault();

    if (label)
      if (label.id === '') {
        await insertRowQuery(supabase, 'labels', { ...label, id: v4() });
      } else {
        await updateRowQuery(supabase, 'labels', label);
      }
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

  return (
    <SettingsSection title="Labels" description="Manage your system Labels.">
      <div className="flex-col p-2 items-center">
        <div className="flex-wrap gap-2 h-4">
          {labels.map(b =>
            <Pill
              onClick={() => handleLabelClick(b)}
              key={b.id}
              variant={b.color_hex || 'default' as any}
              title={b.title || ''} />)}

        </div>
        <div>
          <Button onClick={handleAddNewLabel} variant="outline" size="sm">
            <Plus />
          </Button>
        </div>
      </div>
      {label &&
        <form className="max-w-md mx-auto">
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                required
                id="title"
                placeholder="Title"
                type="text"
                name="title"
                value={label.title || ''}
                onChange={(e) => setLabel({ ...label, title: e.target.value })}
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label htmlFor="title"
                     className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First
                name</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input id="color"
                     placeholder="Color"
                     type="text"
                     name="color_hex"
                     value={label.color_hex || ''}
                     onChange={(e) => setLabel({ ...label, color_hex: e.target.value })}
                     autoCapitalize="none"
                     autoComplete="off"
                     autoCorrect="off"
                     className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label htmlFor="color"
                     className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last
                name</label>
            </div>
          </div>

          <div className=" flex gap-2">
          <button type="button"
                  onClick={handleCancel}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Cancel
          </button>
          <button type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Submit
          </button>
          </div>
        </form>
      }

    </SettingsSection>
  );
}