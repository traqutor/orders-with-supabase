import React from 'react';
import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon } from 'lucide-react';

interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps {
  label: string;
  name: string;
  value: string | undefined;
  required?: boolean;
  options: Option[];
  onChange: (value: string) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, name, value, required, options, onChange }) => {
  const option = options.find((option) => option.value === value);
  const [selected, setSelected] = React.useState<Option>(option || options[0]);

  const handleChange = (event: string) => {
    const option = options.find((option) => option.value === event);
    console.log('selected option:', option);

    if (!option) return null;

    setSelected(option);
    onChange(option.value);
  };

  return (


    <Select.Root value={value} onValueChange={handleChange}>

      <div className="flex justify-between align-bottom mb-1 text-muted-foreground">
        <label className="text-xs">{label}</label>
        {required && <span className="text-xs">Pole wymagane</span>}
      </div>
      <Select.Trigger
        className="flex h-10 w-full justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Select.Value
          aria-label={name ? name : selected?.label}
        >
          {selected?.label}
        </Select.Value>
        <Select.Icon><ChevronDownIcon /></Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="bg-card border py-2 border-input rounded-md shadow-lg">
          <Select.Viewport>
            {options.map((option) => (
              <Select.Item key={option.value} value={option.value}
                           className="relative flex h-[32px] hover:bg-green-50 select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none text-muted-foreground data-[disabled]:pointer-events-none data-[disabled]:text-grey-300 data-[highlighted]:text-green-900 data-[highlighted]:outline-none">
                <Select.ItemText>{option.label}</Select.ItemText>
                <Select.ItemIndicator>…</Select.ItemIndicator>
              </Select.Item>

            ))}

          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default SelectField;

