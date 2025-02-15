import { Check, ChevronDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Customer, useCustomers } from '@/lib/db/useCustomers';

import * as Popover from '@radix-ui/react-popover';
import CustomerCreateDialog from '@/app/(protected)/customers/customer-create-dialog';

export interface SelectCustomerProps {
  label: string;
  value: string | undefined;
  onChange: (value: string) => void;
  required?: boolean;
}


export const SelectCustomer: React.FC<SelectCustomerProps> = ({ label, value, required, onChange }) => {

  const { customers, fetchCustomers } = useCustomers();
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = React.useState<Customer>();

  const filteredOptions = customers.filter((option) =>
    option.name?.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchCustomers().then();
  }, []);

  useEffect(() => {
    if (value) {
      fetchCustomers().then((response) => {
        if (response) {
          const c = response.find((option) => option.id === value);
          setSelected(c);
        }
      });
    }

  }, [value]);

  const handleChange = (id: string) => {
    const option = customers.find((option) => option.id === id);

    if (!option) return null;

    setSelected(option);
    onChange(option.id);
  };


  const handleOnSubmit = async (customer: Customer) => {
    await fetchCustomers();
  };

  return (

    <Popover.Root open={open} modal={true} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          className="flex w-full items-center h-10 justify-between rounded-md border border-input text-muted-foreground bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => setOpen(true)}
        >
          {selected?.name || label}
          <ChevronDown />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="p-3 max-h-[85vh] w-[80vw] max-w-[600px] border bg-card rounded-md shadow-md overflow-y-visible"
          side="bottom"
          align="start"
        >
          <div className="p-2">
            <input
              type="text"
              placeholder="Wyszukaj..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setOpen(true)} // Keep popover open when input is focused
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

            />
          </div>

          <div className="max-h-48 pt-2 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center justify-between p-2 text-sm cursor-pointer "
                  onClick={() => {
                    handleChange(option.id);
                  }}
                >
                  {option.name}
                  {selected?.name === option?.name && <Check className="w-4 h-4" />}
                </div>
              ))
            ) : (
              <div className=" flex  justify-between items-center ">
                <span className="text-muted-foreground text-sm">Nie ma klienta o takiej nazwie. Czy chesz dodać?</span>

                <CustomerCreateDialog name={search} onSubmit={handleOnSubmit} />
              </div>
            )}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
