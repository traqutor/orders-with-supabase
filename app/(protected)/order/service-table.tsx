'use client';

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ServiceRow } from '@/app/(protected)/order/service-row';

import { Button } from '@/components/ui/button';
import { LucidePlus } from 'lucide-react';
import { NewServicePosition, ServicePosition } from '@/lib/db/schema';
import { useServicesPositions } from '@/lib/client/useServicesPositions';


export function ServiceTable({ serviceId }: { serviceId: string }) {

  const [positions, setPositions] = useState<ServicePosition[]>();
  const {
    fetchServicePositions,
    updateServicePosition,
    deleteServicePosition,
    createServicePosition
  } = useServicesPositions();

  useEffect(() => {
    getServicePositions().then();
  }, []);

  const getServicePositions = async () => {
    const data = await fetchServicePositions(serviceId);
    setPositions(data);
  };

  const handleAddServicePosition = async () => {
    const position: NewServicePosition = {
      service_id: serviceId,
      car_plate: '',
      is_confirmed: false,
      is_done: false,
      serial_no: '',
      technician: '',
      vehicle_vin: '',
      description: ''
    };
    await createServicePosition({ ...position });
    await getServicePositions();

  };

  const handleUpdatePosition = async (position: ServicePosition) => {
    await updateServicePosition({ ...position });
    await getServicePositions();
  };

  const handleDeletePosition = async (position: ServicePosition) => {
    await deleteServicePosition({ ...position });
    await getServicePositions();
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
            <TableHead className="">Nr Rej.</TableHead>
            <TableHead className="">Nr Seryjny</TableHead>
            <TableHead className="">Serwisant</TableHead>
            <TableHead className="">Status</TableHead>
            <TableHead className="w-[90px]">
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
              onDeletePosition={handleDeletePosition}
            />
          )}
        </TableBody>
      </Table>
      <div className="flex justify-between py-5">
        <span className="text-sm text-muted-foreground">Pozycje serwisowe</span>
        <div className="flex gap-2">
          {/*<Button size="sm" variant="outline" className="h-8 gap-1" onClick={() => alert('Not yet')}>
            <File />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Wczytaj z pliku
            </span>
          </Button>*/}
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