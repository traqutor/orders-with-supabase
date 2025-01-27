'use client';

import React from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ServiceRow } from '@/app/(protected)/order/service-row';


export function ServiceTable({
                               positions,
                               totalPositions,
                               totalPriceNett,
                               totalPriceGross
                             }: {
  positions: any[],
  totalPositions: number,
  totalPriceNett: number,
  totalPriceGross: number
}) {

  return (

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
          <TableHead className="hidden md:table-cell">Załączniki</TableHead>
          <TableHead>
            <span className="sr-only">Menu</span>
          </TableHead>

        </TableRow>
      </TableHeader>
      <TableBody>
        {positions.map((position) =>
          <ServiceRow key={position.id} {...position} />
        )}
      </TableBody>
    </Table>

  );
}