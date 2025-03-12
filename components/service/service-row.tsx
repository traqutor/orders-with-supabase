import { CheckIcon, Hammer, Save } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import React, { useState } from 'react';
import ConfirmDialog from '@/components/ui/Dialog/confirm-dialog';
import { ServicePosition } from '@/lib/db/schema';

export function ServiceRow(props: {
  position: ServicePosition,
  rowNumber: number,
  onUpdatePosition: (p: ServicePosition) => void,
  onDeletePosition: (p: ServicePosition) => void,
}) {
  const { position, rowNumber, onUpdatePosition, onDeletePosition } = props;
  const [formData, setFormData] = useState<ServicePosition>({ ...position });
  const [isChanged, setIsChanged] = useState<boolean>();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: ServicePosition) => ({
      ...prev,
      [name]: value
    }));
    setIsChanged(true);
  };

  const handleToggleServiceIsDoneChange = (is_done: boolean) => {
    onUpdatePosition({ ...formData, is_done });
    setIsChanged(false);
  };

  const handleEdit = () => {
    onUpdatePosition(formData);
    setIsChanged(false);
  };

  const handleDelete = () => {
    onDeletePosition(formData);
    setIsChanged(false);
  };

  return (
    <TableRow>
      <TableCell>
        {rowNumber}
      </TableCell>

      <TableCell>
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


      <TableCell className="w-[90px] px-2">
        <div className="flex gap-4">
          <ConfirmDialog
            triggerLabel=""
            triggerIcon={position.is_done ?
              <CheckIcon
                className={'text-green-600 hover:text-green-800  '}
              /> : <Hammer
                className={'text-gray-600 hover:text-gray-800 rotate-y-180 '}
              />}
            title={position.is_done ? 'Powrót do czynności serwisowej.' : 'Zakończenie czynności serwisowej.'}
            description="Czy potwierdzasz?"
            onClickSubmit={() => handleToggleServiceIsDoneChange(!position.is_done)} />

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
            title="Kasujesz pozycję serwisową."
            description="Czy potwierdzasz?"
            onClickSubmit={handleDelete} />
        </div>
      </TableCell>
    </TableRow>
  );
}