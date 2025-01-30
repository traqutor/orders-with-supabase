import { Hammer, Save } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import React, { useState } from 'react';
import ConfirmDialog from '@/components/ui/Dialog/confirm-dialog';
import { Tables } from '@/types_db';

type ServicePosition = Tables<'services_positions'>


export function ServiceRow(props: {
  position: ServicePosition,
  rowNumber: number,
  onUpdatePosition: (p: ServicePosition) => void,
}) {
  const { position, rowNumber, onUpdatePosition } = props;
  const [formData, setFormData] = useState<ServicePosition>({ ...position });
  const [isChanged, setIsChanged] = useState<boolean>();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setIsChanged(true);
  };

  const handleToggleServiceIsDoneChange = () => {
    setFormData((prev) => ({
      ...prev,
      is_done: !prev.is_done
    }));
    setIsChanged(false);
  };

  const handleEdit = () => {
    onUpdatePosition(formData);
    setIsChanged(false);
  };


  return (
    <TableRow>
      <TableCell className="">
        {rowNumber}
      </TableCell>

      <TableCell className="">
        <input
          type="text"
          name="vehicle_vin"
          value={formData.vehicle_vin || ''}
          onChange={handleChange}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </TableCell>

      <TableCell>
        <input
          type="text"
          name="car_plate"
          value={formData.car_plate || ''}
          onChange={handleChange}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </TableCell>

      <TableCell className="">
        <input
          type="text"
          name="serial_no"
          value={formData.serial_no || ''}
          onChange={handleChange}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </TableCell>

      <TableCell className="">
        <input
          type="text"
          name="technician"
          value={formData.technician || ''}
          onChange={handleChange}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </TableCell>


      <TableCell className="px-2">
        <div className="flex gap-4">
          <button
            className="flex gap-2 h-[35px] font-medium select-none text-green-600 hover:text-green-800 items-center rounded text-[13px] leading-none cursor-pointer outline-none"
            disabled={!isChanged}
            onClick={handleEdit}
          >
            <Hammer  className="rotate-y-180"/>
          </button>
          {isChanged ?
            <button
              className="flex gap-2 h-[35px] font-medium select-none text-green-600 hover:text-green-800 items-center rounded text-[13px] leading-none cursor-pointer outline-none"
              disabled={!isChanged}
              onClick={handleEdit}
            >
              <Save />
            </button> : <div className="w-6"></div>}
          <ConfirmDialog
            triggerLabel=""
            title={position.is_done ? 'Powrót do czynności serwisowej.' : 'Zakończenie czynności serwisowej.'}
            description="Czy potwierdzasz?"
            onClickSubmit={handleToggleServiceIsDoneChange} />
        </div>
      </TableCell>
    </TableRow>
  );
}