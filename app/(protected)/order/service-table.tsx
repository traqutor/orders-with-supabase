'use client';

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ServiceRow } from '@/app/(protected)/order/service-row';
import { Tables } from '@/types_db';
import { v4 } from 'uuid';
import {
  getServicePositionsForServiceId,
  postServicePosition,
  putServicePosition
} from '@/lib/db/services_positions_queries';
import { Button } from '@/components/ui/button';
import { File, LucidePlus } from 'lucide-react';

type ServicePosition = Tables<'services_positions'>

export function ServiceTable({ serviceId }: { serviceId: string }) {

  const [positions, setPositions] = useState<ServicePosition[]>();

  useEffect(() => {
    getServicePositions().then();
  }, []);

  const getServicePositions = async () => {
    const { data, error } = await getServicePositionsForServiceId(serviceId);
    if (error) throw new Error(`Get list of Service Positions for Service Id ${serviceId} error:`, error);

    setPositions(data);
  };

  const handleAddServicePosition = async () => {
    const position: ServicePosition = {
      id: v4(),
      service_id: serviceId,
      car_plate: '',
      is_confirmed: false,
      is_done: false,
      serial_no: '',
      technician: '',
      vehicle_vin: '',
      description: ''
    };
    await postServicePosition({ ...position });
    await getServicePositions();

  };

  const handleUpdatePosition = async (position: ServicePosition) => {
    await putServicePosition({ ...position });
  };

  return (
    <div className="flex flex-col w-full h-full overflow-scroll">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10px]">
              <span className="sr-only">Image</span>
            </TableHead>
            <TableHead>VIN</TableHead>
            <TableHead className="hidden md:table-cell">Nr Rej.</TableHead>
            <TableHead className="hidden md:table-cell">Nr Seryjny</TableHead>
            <TableHead className="hidden md:table-cell">Serwisant</TableHead>
            <TableHead className="hidden md:table-cell">Status</TableHead>
            <TableHead>
              <span className="sr-only">Menu</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {positions?.map((position, idx) =>

            <ServiceRow
              key={position.id}
              position={position}
              rowNumber={idx + 1}
              onUpdatePosition={handleUpdatePosition}
            />
          )}
        </TableBody>
      </Table>
      <div className="flex justify-between py-5">
        <span className="text-sm text-muted-foreground">Pozycje serwisowe</span>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1" onClick={() => alert('Not yet')}>
            <File />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Wczytaj z pliku
            </span>
          </Button>
          <Button size="sm" variant="outline" className="h-8 gap-1" onClick={handleAddServicePosition}>
            <LucidePlus />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Dodaj pozycję
            </span>
          </Button>
        </div>
      </div>
    </div>


  );
}