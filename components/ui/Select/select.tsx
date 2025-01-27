import * as React from 'react';
import { useState } from 'react';

import * as  Select from '@radix-ui/react-select';
import { ChevronDownIcon } from 'lucide-react';


const countries = { france: '🇫🇷', 'united-kingdom': '🇬🇧', spain: '🇪🇸' };

export default () => {
  const [value, setValue] = useState('france');
  return (
    <Select.Root value={value} onValueChange={setValue}>
      <Select.Trigger
        className="flex h-10 w-full justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
        <Select.Value
          aria-label={value}
        >
          {JSON.stringify(value)}
        </Select.Value>
        <Select.Icon><ChevronDownIcon /></Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="bg-card border">
          <Select.Viewport>
            <Select.Item value="france"
                         className="relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none text-muted data-[disabled]:pointer-events-none data-[highlighted]:text-muted-foreground  data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 data-[highlighted]:outline-none">
              <Select.ItemText>France</Select.ItemText>
              <Select.ItemIndicator>…</Select.ItemIndicator>
            </Select.Item>
            <Select.Item value="united-kingdom">
              <Select.ItemText>United Kingdom</Select.ItemText>
              <Select.ItemIndicator>…</Select.ItemIndicator>
            </Select.Item>
            <Select.Item value="spain">
              <Select.ItemText>Spain</Select.ItemText>
              <Select.ItemIndicator>…</Select.ItemIndicator>
            </Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

