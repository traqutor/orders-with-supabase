'use client';

import { CheckIcon, Save } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import React, { useState } from 'react';
import { Tables } from '@/types_db';
import ConfirmDialog from '@/components/ui/Dialog/confirm-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';

type OrderPosition = Tables<'orders_positions'>

export function PositionRow(props: {
                              position: OrderPosition,
                              rowNumber: number,
                              asInvoice: boolean
                              onUpdatePosition: (p: OrderPosition) => void,
                              onDeletePosition: (p: OrderPosition) => void,
                            }
) {

  const { asInvoice, position, rowNumber, onUpdatePosition, onDeletePosition } = props;

  const [formData, setFormData] = useState<OrderPosition>({ ...position });
  const [isChanged, setIsChanged] = useState<boolean>();

  const handleEdit = () => {
    onUpdatePosition(formData);
    setIsChanged(false);
  };
  const handleDelete = () => {
    onDeletePosition(position);
  };


  const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setIsChanged(true);
    onUpdatePosition(formData);
  };

  const handleOptimaChange = (value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      is_optima: value
    }));
    setIsChanged(true);
  };

  return (
    <TableRow>
      <TableCell >
        {rowNumber}
      </TableCell>

      <TableCell>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </TableCell>

      <TableCell className="w-[140px]">
        <select
          name="position_type"
          value={formData.position_type || 'sell'}
          onChange={handleChange}
          className="flex rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

        >
          <option value="sell">Sprzedaż</option>
          <option value="rent">Wynajem</option>
        </select>
      </TableCell>

      <TableCell className="w-[90px]">
        <select
          name="unit"
          value={formData.unit || 'szt'}
          onChange={handleChange}
          className="flex rounded-md border border-input bg-background px-1 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="szt">Szt.</option>
          <option value="hour">Godz.</option>
          <option value="day">Dni</option>
        </select>
      </TableCell>

      <TableCell className="w-[90px]">
        <input
          type="number"
          name="quantity"
          value={formData.quantity || 0}
          onChange={handleChange}
          className="flex text-right rounded-md border border-input bg-background px-1 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </TableCell>

      <TableCell className="w-[140px]">
        <input
          type="number"
          name="price"
          value={formData.price || 0}
          onChange={handleChange}
          className=" text-right flex rounded-md border border-input bg-background px-1 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </TableCell>

      <TableCell className="pr-2 w-[90px]">
        <select
          name="price_type"
          value={formData.price_type || 'nett'}
          onChange={handleChange}
          className="text-right flex rounded-md border border-input bg-background px-1 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="nett">Netto</option>
          <option value="gross">Brutto</option>
        </select>
      </TableCell>

      {asInvoice && <TableCell className="w-[90px] pr-2">
        <div className="flex justify-center items-center">
          <Checkbox.Root onCheckedChange={handleOptimaChange}
                         className="flex size-[18px] appearance-none items-center justify-center rounded bg-white shadow-[0_2px_10px]  outline-none hover:bg-green-50 focus:shadow-[0_0_0_2px_black]"
                         defaultChecked={false}
                         checked={formData.is_optima}
          >
            <Checkbox.Indicator className="CheckboxIndicator">
              <CheckIcon className="h-4" />
            </Checkbox.Indicator>
          </Checkbox.Root>
        </div>
      </TableCell>}

      <TableCell className="w-[90px] px-2">
        <div className="flex gap-4">
          {isChanged ?
            <button
              className="flex gap-2 h-[35px] font-medium select-none text-green-800 hover:text-green-600 items-center rounded text-[13px] leading-none cursor-pointer outline-none"
              disabled={!isChanged}
              onClick={handleEdit}
            >
              <Save />
            </button> : <div className="w-6"></div>}
          <ConfirmDialog
            triggerLabel=""
            title="Usuwasz pozycję zamówienia."
            description="Czy potwierdzasz?"
            onClickSubmit={handleDelete} />
        </div>

      </TableCell>
    </TableRow>
  );
}