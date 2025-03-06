import React, { useEffect } from 'react';
import * as Select from '@radix-ui/react-select';
import { Check, ChevronDownIcon } from 'lucide-react';
import { useOrdersStatuses } from '@/lib/client/useOrdersStatuses';
import { StatusPill } from '@/components/ui/status_pill';
import { OrderStatus } from '@/lib/db/schema';


interface SelectFieldProps {
  label: string;
  name: string;
  value: string | undefined;
  required?: boolean;
  onChange: (value: string) => void;
}

const SelectStatus: React.FC<SelectFieldProps> = ({ label, name, value, required, onChange }) => {

  const { ordersStatuses, fetchOrdersStatuses } = useOrdersStatuses();
  const [selected, setSelected] = React.useState<OrderStatus>();

  const handleChange = (event: string) => {
    const option = ordersStatuses.find((option) => option.id === event);

    if (!option) return null;

    setSelected(option);
    onChange(option.id);
  };

  useEffect(() => {
    fetchOrdersStatuses().then((response) => {
      const option = response.find((option) => option.id === value);
      setSelected(option || response[0]);
    });

    return () => {
      console.log('OrdersStatuses clean up', ordersStatuses);
    };
  }, []);

  return (

    <Select.Root value={value} onValueChange={handleChange}>

      <div className="flex justify-between align-bottom mb-1 text-muted-foreground">
        <label className="text-xs">{label}</label>
        {required && <span className="text-xs">Pole wymagane</span>}
      </div>
      <Select.Trigger
        className="flex h-10 w-full justify-between items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Select.Value
          aria-label={name || selected?.title || 'No value'}
        >
          <StatusPill
            size="sm"
            variant={selected?.color_hex || 'gray' as any}
            title={selected?.title || 'no selected  '} />
        </Select.Value>
        <Select.Icon><ChevronDownIcon /></Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="bg-card border py-2 border-input rounded-md shadow-lg">
          <Select.Viewport>
            {ordersStatuses.map((orderStatus) => (
              <Select.Item key={orderStatus.id} value={orderStatus.id}
                           className="relative flex h-[32px] hover:bg-green-50 select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none text-muted-foreground data-[disabled]:pointer-events-none data-[disabled]:text-grey-300 data-[highlighted]:text-green-900 data-[highlighted]:outline-none">
                <Select.ItemText>
                  <StatusPill
                    size="sm"
                    variant={orderStatus.color_hex || 'default' as any}
                    title={orderStatus.title || ''} />
                </Select.ItemText>
                <Select.ItemIndicator>
                  <Check />
                </Select.ItemIndicator>
              </Select.Item>
            ))}

          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default SelectStatus;

